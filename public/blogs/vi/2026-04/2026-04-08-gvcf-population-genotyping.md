---
slug: gvcf-population-scale-genotyping
title: "Gọi biến thể (Phần 11): Genotyping quy mô quần thể với gVCF và joint variant calling"
description: "Cách các block tham chiếu của gVCF và joint genotyping hỗ trợ phân tích cấp cohort: gộp gVCF đơn mẫu thành VCF nhiều mẫu và tinh chỉnh kiểu gen bằng tín hiệu quần thể, cùng các lựa chọn công cụ mã nguồn mở."
series: Variant Calling from Bash to Production
seriesOrder: 11
authors: [vieomics]
tags: [genomics, variant-calling, genotyping, bioinformatics, scalability, population-genetics, joint-genotyping, deepvariant]
image: ./imgs/gvcf-population-scale-genotyping.png
---

Gọi biến thể quy mô quần thể là một bước quan trọng trong xây dựng các dự án hệ gen quần thể. Gọi biến thể đơn mẫu đã được thiết lập vững chắc, nhưng mở rộng joint genotyping lên hàng nghìn mẫu WGS đặt ra thách thức về hiệu năng, lưu trữ và cập nhật tăng dần. Trong bài này, chúng tôi tìm hiểu các hướng tiếp cận joint variant calling dựa trên gVCF, đánh giá các lựa chọn có khả năng mở rộng bằng công cụ mã nguồn mở hiện đại, và thảo luận những cân nhắc kiến trúc thực tế cho các dự án genomics quy mô quần thể.

<!--truncate-->

Ở các [Phần 1-8](/blogs/gatk-variant-calling-production-slurm-optimization-part8) của chuỗi bài gọi biến thể, chúng tôi đã xây dựng một pipeline gọi biến thể germline short read hoàn chỉnh — từ reads thô đến chú giải biến thể bằng [**nf-germline-short-read-variant-calling**](https://github.com/gianglabs/nf-germline-short-read-variant-calling?tab=readme-ov-file). Ở [Phần 6](/blogs/gatk-variant-calling-production-slurm-optimization-part6), chúng tôi đã cho thấy các công cụ gọi biến thể hiện đại như **DeepVariant** có thể tạo file gVCF trực tiếp — file đầu ra nắm cả thông tin biến thể VÀ độ tin cậy tham chiếu.

Nhưng còn một bước mà nhiều hướng dẫn bỏ qua: **làm thế nào để kết hợp hàng trăm hay hàng nghìn file gVCF này nhằm khám phá và so sánh biến thể giữa nhiều mẫu?** Và quan trọng hơn: **làm thế nào dùng thông tin cấp quần thể để cải thiện độ chính xác biến thể trong cohort?**

Bài viết này tìm hiểu hai khái niệm bổ trợ cho nhau:

1. **Gộp gVCF (gVCF Combination)** → Tổng hợp các file gVCF để khám phá biến thể một cách có hệ thống giữa nhiều mẫu, hỗ trợ phân tích và phát hiện ở cấp quần thể
2. **Joint Variant Calling** → Dùng thông tin quần thể toàn cohort để cải thiện độ chính xác kiểu gen, sửa lỗi của từng mẫu và tinh chỉnh điểm chất lượng biến thể

Chúng tôi trình bày hành trình kỹ thuật từ file gVCF đơn mẫu (do DeepVariant hoặc GATK tạo) đến VCF nhiều mẫu quy mô quần thể bằng **DRAGEN gVCF Genotyper**, và cho thấy joint genotyping dùng tín hiệu quần thể để tinh chỉnh độ chính xác mà không cần gọi lại biến thể. Dữ liệu thực từ dự án 1000 Genomes được dùng cho các ví dụ.

:::info Bối cảnh chuỗi bài
Đây là **Phần 11** của chuỗi bài Gọi biến thể:

- **Phần 1-3**: Xây dựng pipeline gọi biến thể cấp production (bash → Nextflow → HPC)
- **Phần 4-8**: Chất lượng workflow, benchmark, chú giải và biến thể cấu trúc
- **Phần 11 (bài này)**: Joint genotyping quy mô quần thể và tổng hợp cohort

**Điều kiện tiên quyết**: đã quen với định dạng gVCF từ Phần 6 và hiểu cơ bản về pipeline gọi biến thể.
:::

## Tổng quan chuỗi bài

- **[Phần 1](/blogs/gatk-variant-calling-bash-workflow-pixi-part1)**: Pipeline germline bằng bash quản lý với Pixi
- **[Phần 2](/blogs/gatk-variant-calling-bash-to-nextflow-validation-part2)**: Kiểm chứng workflow bash
- **[Phần 3](/blogs/gatk-variant-calling-production-slurm-optimization-part3)**: Từ bash sang Nextflow
- **[Phần 4](/blogs/gatk-variant-calling-production-slurm-optimization-part4)**: Chạy trong container và tái lập kết quả
- **[Phần 5](/blogs/gatk-variant-calling-production-slurm-optimization-part5)**: Benchmark gọi biến thể germline với nf-core/sarek
- **[Phần 6](/blogs/gatk-variant-calling-production-slurm-optimization-part6)**: Có cần một pipeline phức tạp để gọi biến thể chất lượng cao?
- **[Phần 7](/blogs/gatk-variant-calling-production-slurm-optimization-part7)**: Chú giải biến thể với SnpEff và Ensembl VEP
- **[Phần 8](/blogs/gatk-variant-calling-production-slurm-optimization-part8)**: Gọi biến thể cấu trúc — một benchmark với short read
- **[Phần 9](/blogs/storage-cost-optimization-cram-format)**: Tối ưu chi phí lưu trữ với định dạng CRAM
- **[Phần 10](/blogs/structural-variant-calling-short-reads-challenges)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **Phần 11 (bài này)**: Genotyping quy mô quần thể với gVCF

## 1. Hai khái niệm: gộp gVCF và joint variant calling

### 1.1. Phân biệt hai khái niệm

Trước khi đi vào các workflow quy mô quần thể, cần làm rõ hai quá trình riêng biệt (nhưng bổ trợ) thường bị nhầm lẫn:

**Gộp gVCF:**

- **Mục đích**: Tổng hợp thông tin độ tin cậy tham chiếu từ nhiều mẫu để khám phá có hệ thống những biến thể tồn tại trong cohort
- **Quá trình**: Gộp các file gVCF trong khi giữ nguyên genotype likelihood của từng mẫu và độ tin cậy tham chiếu
- **Đầu ra**: Một VCF nhiều mẫu cho thấy mỗi mẫu mang biến thể nào (khám phá kiểu gen)
- **Cải thiện độ chính xác**: Ít — chủ yếu hỗ trợ khám phá và so sánh giữa các mẫu

**Joint Variant Calling:**

- **Mục đích**: Dùng tín hiệu cấp quần thể để cải thiện độ chính xác kiểu gen và tinh chỉnh điểm chất lượng tại mỗi vị trí
- **Quá trình**: Đánh giá lại kiểu gen của từng mẫu theo xác suất, dùng prior tần số allele toàn cohort và mẫu kiểu gen
- **Đầu ra**: Kiểu gen được tinh chỉnh với điểm chất lượng tốt hơn nhờ đồng thuận quần thể
- **Cải thiện độ chính xác**: Đáng kể — đặc biệt với các vị trí độ tin cậy thấp, biến thể hiếm và vùng độ phủ thấp

### 1.2. Điểm dừng trước đó: gVCF từ DeepVariant

Ở Phần 6, pipeline **nf-germline-short-read-variant-calling** của chúng tôi tạo ra:

**Đầu ra từng mẫu:**

- **VCF đơn mẫu**: chỉ biến thể (các vị trí có allele thay thế)
- **gVCF đơn mẫu** (do DeepVariant tạo): biến thể + các block tham chiếu kèm điểm chất lượng

**Cấu trúc file ví dụ:**

```bash
sample-1/
  ├── sample1.vcf.gz          # Hard-filtered variants only
  ├── sample1.vcf.gz.tbi      # Index for VCF
  ├── sample1.gvcf.gz         # gVCF with reference blocks ← KEY FILE
  └── sample1.gvcf.gz.tbi     # Index for gVCF

sample-2/
  ├── sample2.vcf.gz
  ├── sample2.gvcf.gz         # ← combine these to explore variants
  └── ...
```

**Vì sao gVCF hỗ trợ khám phá:** Khác với file VCF tiêu chuẩn, gVCF nắm bắt:

- Các vị trí biến thể (như VCF)
- Các block độ tin cậy tham chiếu (mục `<NON_REF>`) cho biết nơi mẫu có thể không mang biến thể
- Điểm chất lượng cho các vị trí không biến thể
- Genotype likelihood đầy đủ cho từng mẫu

Thông tin phong phú hơn này cho phép **khám phá biến thể một cách có hệ thống giữa các mẫu** — so sánh không chỉ mẫu nào mang biến thể nào, mà cả mức độ tin cậy tại mỗi vị trí hệ gen.

### 1.3. Pipeline hai giai đoạn: gộp rồi tinh chỉnh

![Two-Stage Population Variant Calling Pipeline](./imgs/gvcf-joint-genotyping-pipeline.svg)
_Hình 1: Pipeline gọi biến thể quần thể hai giai đoạn_

Nhiều workflow gộp hai giai đoạn này vào một công cụ (như GATK Joint Genotyping), nhưng về mặt khái niệm chúng là hai thao tác riêng biệt.

---

## 2. Hành trình dữ liệu hệ gen ba giai đoạn: VCF → gVCF → VCF cohort chung

:::warning

- Nhiều mô hình thống kê và học máy có thể được áp dụng để cải thiện gọi biến thể riêng lẻ nhờ thông tin từ nhiều mẫu.
- Mô hình gọi lại biến thể dưới đây chỉ được trình bày cho mục đích proof of concept.
  :::

Phần này lần theo quá trình biến đổi dữ liệu từ các gọi biến thể riêng lẻ đến cohort quy mô quần thể. Mỗi giai đoạn thêm giá trị: VCF chỉ có biến thể hỗ trợ khám phá cơ bản, gVCF hỗ trợ so sánh giữa các mẫu, và VCF cohort chung áp dụng kiến thức quần thể để tinh chỉnh độ chính xác.

**Điều làm workflow này hữu ích:**

1. **gVCF giữ độ tin cậy tham chiếu** → Có thể khám phá không chỉ biến thể mà cả độ tin cậy tại mọi vị trí hệ gen
2. **VCF nhiều mẫu hỗ trợ khám phá** → Thấy được mẫu nào trong cohort mang biến thể nào
3. **Joint genotyping tinh chỉnh độ chính xác** → Đồng thuận quần thể cải thiện điểm chất lượng kiểu gen cho mọi mẫu

---

### 2.1. Giai đoạn 1: VCF đơn mẫu (từ DRAGEN)

**Nội dung:**

- Chỉ các vị trí biến thể (vị trí có allele thay thế)
- Thông tin kiểu gen cho MỘT mẫu
- Không có thông tin về các vị trí không biến thể
- Kích thước file: ~100-500 MB mỗi mẫu

**Lệnh ví dụ (dùng bcftools trên S3):**

:::info

- Illumina, cùng dự án 1000 Genomes, đã công bố gVCF từng mẫu và gVCF cohort có thể dùng để khám phá trong bài này
- Các file được lưu trên bucket S3, nơi bcftools mới nhất dựa trên htslib hỗ trợ đọc ngẫu nhiên. Đọc thêm trong bài về [đọc file từ xa với htslib](/blogs/remote-files-htslib-bcftools-samtools)
  :::

```bash
# View DRAGEN hard-filtered VCF for single sample
bcftools view s3://1000genomes-dragen-v4-2-7/data/individuals/hg38_alt_masked_graph_v3/NA21144/NA21144.final.hard-filtered.vcf.gz \
  | grep -v "contig" \
  | head -n80
```

Kết quả hiển thị header VCF và các bản ghi biến thể:

```bash
##fileformat=VCFv4.2
##FILTER=<ID=PASS,Description="All filters passed">
##FORMAT=<ID=AD,Number=R,Type=Integer,Description="Allelic depths for ref and alt alleles in the order listed">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
##FORMAT=<ID=PL,Number=G,Type=Integer,Description="Normalized, Phred-scaled likelihoods for genotypes">
...
#CHROM  POS     ID      REF     ALT     QUAL    FILTER  INFO    FORMAT  NA21144
chr1    10616   .       CCGCCGTTGCAAAGGCGCGCCG  C       8.83    PASS    AC=2;AF=1;AN=2;DP=15;...  GT:AD:GQ:PL  1/1:2,13:4:38,6,0
chr1    10927   .       A       G       10.2    PASS    AC=2;AF=1;AN=2;DP=2;...  GT:AD:GQ:PL  1/1:0,2:3:45,5,0
chr1    11022   .       G       A       10.54   PASS    AC=2;AF=1;AN=2;DP=4;...  GT:AD:GQ:PL  1/1:1,3:5:47,7,0
```

**Quan sát chính:** Vị trí chr1:15000 KHÔNG có trong file này — không có cách nào biết mẫu có đồng hợp tham chiếu một cách chắc chắn hay đơn giản là chưa được giải trình tự.

---

### 2.2. Giai đoạn 2: gVCF đơn mẫu (đầu ra của DeepVariant ở Phần 6 cũng tương tự)

**Nội dung:**

- Cả vị trí biến thể VÀ các block tham chiếu (vùng đồng hợp tham chiếu)
- Genotype likelihood cho từng vị trí
- Điểm chất lượng cho các vị trí không biến thể
- Kích thước file: ~200-800 MB mỗi mẫu (lớn hơn VCF do có block tham chiếu)

**Lệnh ví dụ:**

```bash
# View gVCF with reference blocks and quality scores from Dragen pipeline
bcftools view s3://1000genomes-dragen-v4-2-7/data/individuals/hg38_alt_masked_graph_v3/NA21144/NA21144.final.hard-filtered.gvcf.gz \
  | grep -v "contig" \
  | head -n100
```

Khác biệt chính so với VCF: các mục `<NON_REF>` và trường `END` đánh dấu các block tham chiếu:

```bash
##fileformat=VCFv4.2
##ALT=<ID=NON_REF,Description="Represents any possible alternative allele at this location">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
##FORMAT=<ID=MIN_DP,Number=1,Type=Integer,Description="Minimum DP observed within the GVCF block">
##GVCFBlock=minGQ=0(inclusive),maxGQ=1(exclusive)
##GVCFBlock=minGQ=1(inclusive),maxGQ=10(exclusive)
##GVCFBlock=minGQ=10(inclusive),maxGQ=20(exclusive)
...
#CHROM  POS     ID      REF     ALT     QUAL    FILTER  INFO    FORMAT  NA21144
chr1    9998    .       N       <NON_REF>       .       LowGQ   END=10003       GT:GQ:MIN_DP  ./.:0:1
chr1    10004   .       C       <NON_REF>       .       PASS    END=10025       GT:GQ:MIN_DP  0/0:3:12
chr1    10026   .       A       <NON_REF>       .       PASS    END=10026       GT:GQ:MIN_DP  0/0:15:32
chr1    10027   .       A       <NON_REF>       .       PASS    END=10044       GT:GQ:MIN_DP  0/0:21:35
chr1    10045   .       A       <NON_REF>       .       PASS    END=10048       GT:GQ:MIN_DP  0/0:21:44
```

**Điểm chính:**

- `<NON_REF>`: ALT tượng trưng nghĩa là "độ tin cậy tham chiếu"
- `END=10025`: Block tham chiếu này trải từ chr1:10004-10025
- `GT:GQ:MIN_DP`: Kiểu gen (0/0 = đồng hợp tham chiếu), chất lượng (GQ=3 = độ tin cậy thấp), độ sâu tối thiểu trong block

**Giờ đã biết:** Mẫu NA21144 đồng hợp tham chiếu một cách chắc chắn tại chr1:10004-10025 với GQ=3 (độ tin cậy thấp) và chr1:10026 với GQ=15 (độ tin cậy cao hơn).

#### 2.2.1. Tìm hiểu cách tính Genotype Quality (GQ)

**GQ là gì?**

Genotype Quality (GQ) là một **xác suất theo thang Phred**, đo độ tin cậy của gọi kiểu gen. Nó được định nghĩa là:

`GQ = -10 × log10(P(kiểu gen bị sai))`

**Diễn giải:**

- **GQ = 3**: xác suất sai = 10^(-3/10) ≈ 50% (gần như tung đồng xu — không tin cậy)
- **GQ = 10**: xác suất sai = 10^(-10/10) = 0.1 = 10% (một trên mười cơ hội sai)
- **GQ = 20**: xác suất sai = 10^(-20/10) = 0.01 = 1% (một trên trăm cơ hội)
- **GQ = 30**: xác suất sai = 10^(-30/10) = 0.001 = 0.1% (một trên nghìn — độ tin cậy cao)
- **GQ ≥ 60**: độ tin cậy gần như chắc chắn về kiểu gen

**Ví dụ thực tế từ gVCF trên:**

```
chr1    10004   .   C   <NON_REF>   .   PASS   END=10025   GT:GQ:MIN_DP   0/0:3:12
                                                            ↑ GQ=3 (LOW confidence)
chr1    10026   .   A   <NON_REF>   .   PASS   END=10026   GT:GQ:MIN_DP   0/0:15:32
                                                            ↑ GQ=15 (HIGHER confidence)
```

**Vì sao khác nhau?**

- Vị trí chr1:10004-10025 có **MIN_DP=12** (độ sâu trung bình, nhưng có thể là vùng độ phức tạp thấp với các read mơ hồ)
- Vị trí chr1:10026 có **MIN_DP=32** (độ sâu cao hơn, gọi tham chiếu rõ ràng hơn)

**Vấn đề với các gọi GQ thấp:**

Khi GQ thấp (≤3), không thể phân biệt giữa:

- "Vị trí này thực sự đồng hợp tham chiếu" (GQ thấp do nhiễu giải trình tự)
- "Vị trí này có thể có biến thể hiếm mà tôi không thấy" (GQ thấp do độ phủ không đủ)

Sự mơ hồ này lan rộng khi xây dựng tập gọi cohort — nếu 1.000 mẫu đều có GQ=3 tại cùng một vị trí, có nên tin vào đồng thuận rằng đó là vị trí không biến thể? Hay nên đánh dấu vùng này là đáng nghi?

#### 2.2.2. Joint genotyping cải thiện gọi biến thể nhờ tín hiệu quần thể như thế nào

**Vấn đề đơn mẫu: quyết định trong cô lập**

Khi gọi biến thể trên một mẫu, các gọi độ tin cậy thấp phải được quyết định chỉ với dữ liệu của mẫu đó:

```
Single Sample 1 at position chr22:10514143:
- Reads support: 95% for genotype 0/0 (ref/ref), 5% for genotype 0/1 (ref/alt)
- Confidence: GQ=10 (1 in 10 chance this call is wrong)
- Decision: Call 0/0, but confidence is LOW

Without population context:
- Is this truly a homozygous reference call?
- Or is this a real but very rare variant being missed?
- I cannot know without additional information
```

**Giải pháp joint genotyping: mượn sức mạnh từ quần thể**

Khi có một cohort, **các mẫu hình quần thể có thể cải thiện độ chính xác**. Joint genotyping dùng tín hiệu toàn cohort để đánh giá lại kiểu gen của từng mẫu:

```
Cohort of 1,000 samples at chr22:10514143:
┌─────────────────────────────────────────────────────┐
│ Sample 1:    0/0 (GQ=10)   ← questionable call      │
│ Sample 2:    0/0 (GQ=50)   ← very confident         │
│ Sample 3:    0/0 (GQ=48)   ← very confident         │
│ Sample 4:    0/0 (GQ=52)   ← very confident         │
│ Samples 5-1000: All 0/0 (GQ>40) ← strong consensus │
└─────────────────────────────────────────────────────┘

Population signal:
- 999 samples independently call 0/0 with high confidence
- Only 1 sample has uncertain confidence
- Statistical analysis: Probability this position is truly 0/0 = 99%+ (allele frequency ≈ 0)
- Conclusion: Sample 1's uncertain call is REINFORCED by population consensus

Result: Sample 1's GQ improved from 10 → 35 (borrowing confidence from the cohort)
```

![How Joint Genotyping Uses Population Signals to Improve Accuracy](./imgs/joint-genotyping-accuracy-improvement.svg)

**Tác động thực tế - ví dụ cụ thể về cải thiện độ chính xác:**

_Ví dụ 1: Vùng độ phủ thấp_

```
Position chr1:45000000 (low sequencing depth in Sample 1):

Before joint genotyping:
Sample_1  0/0:8   (uncertain due to only 3 reads, noisy region)
Sample_2  0/0:60  (30 reads, clear reference)
...
Sample_1000  0/0:58

After joint genotyping:
Sample_1  0/0:38  ← GQ improved 8→38 using 999 samples' consensus
          (Population evidence: 1,000/1,000 samples call 0/0, so position is likely not variant)
```

_Ví dụ 2: Kiểm chứng biến thể hiếm_

```
Position chr5:12000000:

Before joint genotyping:
Sample_1   0/1:20  (one read supports alt, one ref—uncertain heterozygous call)
Sample_2   0/0:55  (confidently reference)
...
Sample_1000  0/0:52

After joint genotyping:
Sample_1   0/1:32  ← GQ improved 20→32 (population consensus confirms this is a real rare variant)
           (Calculation: "This heterozygous call in one sample + homozygous refs in 999 others = likely a real rare variant worth believing")
```

_Ví dụ 3: Sửa false positive_

```
Position chr19:88000000:

Before joint genotyping:
Sample_1   0/1:9   (weak evidence for alt, GQ very low)
Sample_2   0/0:51  (reference)
...
Sample_1000  0/0:49

After joint genotyping:
Sample_1   0/0:28  ← Corrected from 0/1→0/0 (population consensus suggests this was artifact)
           (Rationale: "Only 1 sample heterozygous out of 1,000 with weak signal + 999 homozygous refs = likely sequencing artifact")
```

**Cách tính toán hoạt động - khung xác suất**

Joint genotyping kết hợp ba mảnh thông tin:

1. **Likelihood đơn mẫu**: P(reads | kiểu gen) ← những gì reads trong một mẫu này ủng hộ
2. **Prior quần thể**: P(kiểu gen | tần số allele cohort) ← kỳ vọng dựa trên 999 mẫu khác
3. **Xác suất hậu nghiệm**: P(kiểu gen | reads + cohort) ← ước lượng tinh chỉnh cuối cùng kết hợp cả hai

**Phương trình đơn giản hóa:**

```
Refined GQ = single_sample_confidence
           + population_evidence
           - conflict_penalty
```

**Khi thông tin cấp quần thể có giá trị nhất:**

| Tình huống                        | GQ đơn mẫu | GQ quần thể | Cải thiện | Lý do                                       |
| --------------------------------- | ---------- | ----------- | --------- | ------------------------------------------- |
| **Vùng độ phủ thấp**              | 6          | 35          | +29       | Đồng thuận cohort bù cho độ sâu thấp        |
| **Biến thể hiếm (1/1000 mẫu)**    | 15         | 28          | +13       | Tín hiệu quần thể xác nhận là biến thể thật |
| **Artifact ở một mẫu**            | 8          | 2 (đã lọc)  | -6        | 999 mẫu nói rằng nó sai                     |
| **Biến thể phổ biến**             | 45         | 48          | +3        | Cải thiện ít (vốn đã tin cậy)               |

**Điểm mấu chốt: vì sao điều này quan trọng với cohort của bạn**

Nhận định then chốt là **thông tin cấp quần thể đặc biệt hữu ích với các gọi không chắc chắn**:

- Các gọi đơn mẫu độ tin cậy cao vẫn giữ độ tin cậy cao (không cần thay đổi)
- Các gọi đơn mẫu độ tin cậy thấp được tăng độ tin cậy nhờ đồng thuận cohort
- Các gọi đơn lẻ sai lệch được nhận diện và sửa nhờ mẫu hình quần thể

Đây là lý do joint genotyping có thể đồng thời:

- Cải thiện độ chính xác trên toàn cohort
- Giảm false positive (các gọi artifact được sửa)
- Tăng phát hiện true positive (các gọi thực yếu được tăng cường)

---

### 2.3. Giai đoạn 3: VCF cohort nhiều mẫu (sau DRAGEN gVCF Genotyper)

**Nội dung:**

- Tất cả biến thể phát hiện TRÊN toàn cohort (3.202 mẫu trong 1KGP)
- Kiểu gen của tất cả mẫu tại mỗi vị trí biến thể
- Chỉ số cấp quần thể (số lượng allele, tần số, thống kê Hardy-Weinberg)
- Biểu diễn local allele (trường FORMAT/LPL và FORMAT/LAA tiết kiệm bộ nhớ)

**Lệnh ví dụ:**

```bash
# View the cohort VCF from 3,202 samples on chromosome 22
# Note: showing only the first 12 columns (CHROM to first few samples)
bcftools view s3://1000genomes-dragen-v4-2-7/data/cohorts/gvcf-genotyper-dragen-4.2.7/hg38/3202-samples-cohort/3202_samples_cohort_gg_chr22.vcf.gz \
  | grep -v "contig" \
  | head -n60 \
  | cut -f1-12
```

**Các chỉ số chính do DRAGEN gVCF Genotyper thêm vào:**

```bash
##INFO=<ID=AC,Number=A,Type=Integer,Description="Allele count in genotypes">
##INFO=<ID=AN,Number=1,Type=Integer,Description="Total number of alleles in called genotypes">
##INFO=<ID=NS,Number=1,Type=Integer,Description="Total number of samples">
##INFO=<ID=NS_GT,Number=1,Type=Integer,Description="Total number of samples with called genotypes">
##INFO=<ID=NS_NOGT,Number=1,Type=Integer,Description="Samples with unknown genotypes ./.">
##INFO=<ID=NS_NODATA,Number=1,Type=Integer,Description="Samples with no coverage">
##INFO=<ID=IC,Number=1,Type=Float,Description="The inbreeding coefficient">
##INFO=<ID=HWE,Number=A,Type=Float,Description="Hardy-Weinberg Equilibrium P-value">
##FORMAT=<ID=LPL,Number=.,Type=Integer,Description="Local Phred-scaled likelihoods (memory efficient)">
##FORMAT=<ID=LAA,Number=.,Type=String,Description="Local alternate allele indices">
```

**Ví dụ một biến thể trong cohort:**

```
chr22   10514143   .   G   A   17.92   PASS   AC=16;AN=1452;NS=3202;NS_GT=726;NS_NOGT=33;NS_NODATA=2443;IC=0.75;HWE=2.1e-12
GT:GQ:AD:LPL:LAA  .:.:.:.:.   .:.:.:.:.   ...
```

**Điều này cho biết:**

- **AC=16, AN=1452**: 16 bản sao allele A trên tổng 1.452 allele được genotyping
- **NS=3202**: tất cả 3.202 mẫu trong cohort
- **NS_GT=726**: 726 mẫu có gọi kiểu gen tại vị trí này
- **NS_NODATA=2443**: 2.443 mẫu không có độ phủ tại vị trí này
- **IC=0.75**: hệ số cận huyết cao (thừa đồng hợp tử — có thể có cấu trúc quần thể)
- **HWE=2.1e-12**: sai lệch rất có ý nghĩa so với cân bằng Hardy-Weinberg

## 3. Các giải pháp joint genotyping

:::info
Để triển khai joint genotyping với kết quả thực tế, công cụ lý tưởng cần có:

- **Mã nguồn mở**: có thể triển khai trên mọi nền tảng mà không có rào cản giấy phép
- **Độ chính xác**: sử dụng hiệu quả tín hiệu quần thể để cải thiện chất lượng kiểu gen
- **Khả năng mở rộng**: xử lý hiệu quả kích thước cohort tăng lên bằng tính toán phân tán
  :::

Khi các file gVCF đã được gộp thành VCF nhiều mẫu, bước tiếp theo là áp dụng joint genotyping để cải thiện độ chính xác bằng tín hiệu quần thể. Các công cụ khác nhau có những đánh đổi khác nhau giữa cải thiện độ chính xác, chi phí tính toán, khả năng mở rộng và tính linh hoạt vận hành.

### 3.1. So sánh công cụ toàn diện

| **Công cụ**                       | **Hiệu năng**                        | **Khả năng mở rộng**                             | **Mã nguồn mở** | **Ưu điểm chính**                                               | **Nhược điểm chính**                                                            |
| --------------------------------- | ------------------------------------ | ------------------------------------------------ | --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **GATK Joint Genotyping**         | Chậm (đơn luồng)                     | Kém (phải xử lý lại toàn cohort khi có mẫu mới)  | Có              | Trưởng thành, tài liệu tốt; hiệu chỉnh VQSR vững chắc            | Phải chạy lại toàn pipeline; tinh chỉnh tham số phức tạp; gắn chặt với GATK      |
| **GLnexus**                       | Nhanh (backend C++ chuyên dụng)      | Trung bình (chia theo vùng)                      | Có              | Nhanh hơn GATK; có thể cập nhật tăng dần                         | Gắn chặt với DeepVariant; mở rộng bằng cách chia vùng                            |
| **Genomic Variant Store (Terra)** | Rất nhanh (dựa trên BigQuery)        | Xuất sắc (cloud-native)                          | Không           | Có thể mở rộng đến hàng triệu mẫu; dịch vụ được quản lý          | Khóa vào nền tảng Terra; giấy phép; không kiểm soát cục bộ                       |
| **DRAGEN IGG**                    | Rất nhanh (phần cứng chuyên dụng)    | Xuất sắc (chia theo vùng + lô mẫu)               | Không           | Xử lý tăng dần; hiệu năng cao; hỗ trợ doanh nghiệp               | Giấy phép; phụ thuộc phần cứng; khóa nhà cung cấp                               |
| **DPGT**                          | Rất nhanh (Apache Spark phân tán)    | Xuất sắc (chia theo vùng + lô mẫu)               | Có              | Mã nguồn mở; xử lý tăng dần; hiệu năng cao                       | Ít trưởng thành hơn; tài liệu hạn chế; cần thiết lập                            |

### 3.2. Ma trận quyết định: nên chọn công cụ nào?

| **Tình huống của bạn**                                                                                                    | **Công cụ khuyến nghị**                                    | **Lý do**                                                     |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| **Học thuật/nghiên cứu, cohort nhỏ (\<1K mẫu), khám phá biến thể hiếm và biến thể được gọi bằng GATK HaplotypeCaller**    | GATK Joint Genotyping                                      | Trưởng thành, tài liệu tốt, độ chính xác tốt nhất cho công cụ không phải DRAGEN |
| **Biobank đang mở rộng, cần cập nhật tăng dần, biến thể được gọi bằng DRAGEN**                                           | DRAGEN IGG (nếu đã dùng DRAGEN) hoặc DPGT (mã nguồn mở)    | Xử lý tăng dần rất quan trọng cho hiệu quả vận hành           |
| **Liên minh lớn (100K+ mẫu)**                                                                                             | Genomic Variant Store hoặc DRAGEN IGG                      | Khả năng mở rộng lớn; chi phí chấp nhận được ở quy mô này     |
| **Mã nguồn mở, mở rộng tới hàng triệu mẫu**                                                                               | DPGT                                                       | Lựa chọn mã nguồn mở tốt nhất; mở rộng xuất sắc; không khóa nhà cung cấp |
| **Học thuật/nghiên cứu, cohort nhỏ (\<1K mẫu), biến thể được gọi bằng DeepVariant**                                       | GLnexus                                                    | Cân bằng tốt giữa tốc độ/độ chính xác; thân thiện với cloud   |

---

### 3.3. Triển khai thực tế: joint variant calling mã nguồn mở với GKit

:::info
Phần này minh họa cách triển khai joint variant calling bằng công cụ mã nguồn mở được tích hợp trong repository **GKit** ([github.com/gianglabs/gkit](https://github.com/gianglabs/gkit)). Cả hai triển khai **GLnexus** và **DPGT** được trình bày với workflow thực tế.
:::

#### 3.3.1. GATK Joint Genotyping (đã tích hợp trong nf-germline)

**Lưu ý:** GATK GenomicsDBImport/GenotypeGVCFs đã được triển khai trong pipeline production tại [nf-germline-short-read-variant-calling](https://github.com/gianglabs/nf-germline-short-read-variant-calling). Pipeline bao gồm process `GATK_GENOTYPEGVCFS`, thực hiện:

- Nhận các file gVCF riêng lẻ từ DeepVariant hoặc GATK
- Thực hiện tinh chỉnh kiểu gen có nhận biết quần thể
- Xuất VCF chung với các chỉ số cấp quần thể

Với các dự án nghiên cứu học thuật có cohort nhỏ gọi biến thể bằng GATK HaplotypeCaller, cách tiếp cận tích hợp này là điểm khởi đầu được khuyến nghị.

---

#### 3.3.2. Triển khai GLnexus

**GLnexus làm gì:**

- Joint variant calling hiệu năng cao, tối ưu cho output gVCF của DeepVariant
- Xử lý hiệu quả theo vùng (có thể chia theo vùng hệ gen)
- Tạo VCF cohort với điểm chất lượng kiểu gen được cải thiện

**Bắt đầu nhanh với GKit:**

```bash
cd <repo>/gkit/glnexus

# Install dependencies with Pixi
pixi install

# Run joint genotyping on test data (GIAB + 1KGP samples)
make test
```

**Đầu ra:**

```
cohort_vcf/GIAB/data/GIAB_ALDH2_5kb.vcf.gz
cohort_vcf/1KGP/data/1KGP_ALDH2_5kb.vcf.gz
```

**Chi tiết cấu hình:**

Pipeline tải file gVCF từ lưu trữ đám mây công khai và chạy GLnexus:

```bash
glnexus_cli \
  --config DeepVariant \        # Config optimized for DeepVariant output
  --threads 4 \                 # Parallel processing
  --bed ALDH2_5kb.bed \         # Limit to region of interest
  *.g.vcf.gz > cohort.bcf       # Input gVCF files
```

**Tham số chính:**

- **--config DeepVariant**: dùng cấu hình tối ưu cho DeepVariant
- **--threads**: số nhân CPU cho xử lý song song (điều chỉnh theo tài nguyên có sẵn)
- **--bed**: file vùng để giới hạn phân tích (cho phép xử lý tăng dần trên toàn hệ gen)

**Tùy chỉnh:**

1. Thay đổi vùng phân tích bằng cách sửa file BED
2. Thêm mẫu bằng cách đưa file gVCF của chúng vào
3. Giảm mức dùng bộ nhớ bằng cách hạ số thread

**Tính năng của pipeline:**

- Tự động tải mẫu GIAB và 1000 Genomes Project từ lưu trữ đám mây
- Chuyển output BCF sang định dạng VCF nén gzip
- Môi trường tái lập được nhờ Pixi

---

#### 3.3.3. Triển khai DPGT (Distributed Population Genetics Tool)

**DPGT làm gì:**

- Joint variant calling phân tán mã nguồn mở dùng Apache Spark
- Xử lý song song cả ở cấp mẫu lẫn cấp vùng
- Độ chính xác tương đương GATK với khả năng mở rộng tốt hơn cho cohort lớn (10K+ mẫu)

**Bắt đầu nhanh với GKit:**

```bash
cd <repo>/gkit/dpgt

# Install and build DPGT locally
pixi install
bash scripts/clone_DPGT.sh
bash scripts/build_cpp.sh

# Run joint genotyping
bash run_dpgt.sh
```

**Đầu ra mặc định:**

```
results_verify_1kgp_run_dpgt/result.chr12_111760000_111765000.0.vcf.gz
```

**Cấu hình bằng biến môi trường:**

```bash
INPUT_LIST=inputs/1kgp_3samples.list \
REFERENCE_FASTA=reference/Homo_sapiens_assembly38.fasta \
OUTPUT_DIR=results/my_run \
TARGET_REGION=chr12:111760000-111765000 \
JOBS=4 \
bash run_dpgt.sh
```

**Tham số chính:**

- **INPUT_LIST**: file liệt kê đường dẫn đến các file gVCF đầu vào
- **REFERENCE_FASTA**: hệ gen tham chiếu định dạng FASTA
- **OUTPUT_DIR**: thư mục đầu ra cho kết quả
- **TARGET_REGION**: vùng hệ gen theo định dạng `chr:start-end`
- **JOBS**: số Spark executor cho xử lý song song

**Quy trình pipeline:**

1. Kiểm tra JAR DPGT và việc biên dịch thư viện native
2. Kiểm chứng file đầu vào và tham chiếu
3. Chạy joint genotyping bằng cụm Spark cục bộ
4. Xuất VCF cohort với thống kê quần thể

**Ghi chú về khả năng mở rộng:**

- **Local mode**: phù hợp cho test/kiểm chứng (như ở đây với 3 mẫu)
- **Cluster mode**: DPGT tích hợp với Spark trên SLURM (xem `spark-on-slurm/` trong GKit)
- Có thể mở rộng lên 10K+ mẫu bằng cách phân tán job qua các Spark executor

**Hạn chế đã biết:**

- Input GIAB có thể thất bại do vấn đề tương thích `<NON_REF>`; các mẫu 1KGP đã được kiểm chứng
- Cần thiết lập hạ tầng Apache Spark
- Cần quản lý cụm Spark cho xử lý quy mô lớn

---

#### 3.3.4. Spark trên SLURM cho xử lý DPGT quy mô lớn

Với phân tích quy mô biobank (1K-100K+ mẫu), DPGT có thể chạy trên một **cụm Spark triển khai trong các job SLURM** bằng cấu hình `spark-on-slurm` trong GKit:

```bash
cd <repo>/gkit/spark-on-slurm

# Setup environment
make setup

# Test Spark cluster on SLURM
make example
```

**Điều này cho phép:**

- Cụm Spark standalone khởi chạy bên trong một phân bổ SLURM (không cần Docker)
- Môi trường tái lập được nhờ Pixi
- Driver PySpark có thể gửi job DPGT tới các worker phân tán
- Tự động dọn dẹp sau khi job hoàn tất

**Kiến trúc:**

1. Phân bổ job batch SLURM
2. Spark master khởi động trên node đầu tiên
3. Spark worker khởi động qua `srun` trên các node được phân bổ
4. Driver PySpark kết nối tới master và chạy job genotyping
5. Kết quả được ghi vào hệ thống file chia sẻ

Cách này cho phép **mở rộng theo chiều ngang** cho joint genotyping quy mô quần thể mà không bị khóa nhà cung cấp.

:::warning

- Do hạn chế về giấy phép, độ chính xác của các công cụ này được kỳ vọng là tương tự nhau, nên ưu tiên khả năng mở rộng khi chọn giữa chúng.
  :::

---

## Suy ngẫm

Dựa trên các khảo sát ở trên và các bài trước, việc xây dựng một dự án genomics quần thể với ít hơn 10.000 mẫu WGS có vẻ khả thi với các công nghệ hiện có.

GATK (Genome Analysis Toolkit) có xu hướng hiệu năng chậm hơn cho cả gọi biến thể đơn mẫu lẫn joint genotyping ở quy mô cohort lớn. Ngược lại, DPGT là một lựa chọn mã nguồn mở đầy hứa hẹn, hỗ trợ mở rộng qua chia lô mẫu và chia vùng hệ gen bằng file BED, đồng thời duy trì độ chính xác tương đương GLnexus.

GLnexus hoạt động tốt cho joint genotyping, nhưng một hạn chế là khi thêm mẫu mới, cohort có thể cần được tính lại. Điều này có thể được cải thiện bằng các tính năng hoặc plugin chia mẫu thành lô, giữ lại chỉ số cohort trung gian và tổng hợp tăng dần khi có dữ liệu mới. Cách tiếp cận như vậy sẽ cải thiện khả năng mở rộng và giảm chi phí tính lại. GLnexus có thể được tích hợp vào các hệ thống workflow phổ biến như Nextflow, WDL hoặc Snakemake. Ngoài ra, từng file gVCF có thể được truy cập bằng HTSlib để đọc ngẫu nhiên các vùng hệ gen cụ thể, tránh phải tải toàn bộ file và cải thiện hiệu quả khi làm việc với các vùng được định nghĩa bằng BED.

Nhìn chung, với khoảng hai kỹ sư toàn thời gian, hạ tầng tính toán phù hợp và dữ liệu giải trình tự thô chất lượng cao, một pipeline gọi biến thể WGS quy mô quần thể cho ít hơn 10.000 mẫu có thể được triển khai trong vòng chưa đầy một tháng.

## Tài liệu tham khảo

1. Caetano-Anolles, D. (2022). "Calling variants on cohorts of samples using the HaplotypeCaller in GVCF mode." GATK Documentation. https://gatk.broadinstitute.org/hc/en-us/articles/360035531812-GVCF-Genomic-Variant-Call-Format

2. Lin, M. F. et al. (2018). "GLnexus: joint variant calling for large cohort sequencing." bioRxiv. https://www.biorxiv.org/content/10.1101/343970v1

3. Repository GLnexus. https://github.com/dnanexus-rnd/GLnexus

4. Kousathanas, A. et al. (2022). "Whole-genome sequencing reveals host factors underlying critical COVID-19." Nature, 607, 97–103. https://doi.org/10.1038/s41586-022-04576-6

5. Byrska-Bishop, M. et al. (2022). "High-coverage whole-genome sequencing of the expanded 1000 Genomes Project cohort including 602 trios." Cell, 185. https://doi.org/10.1016/j.cell.2022.08.004

6. Illumina. "DRAGEN Bio-IT Platform: gVCF Genotyper." https://www.illumina.com/science/genomics-research/articles/gVCF-Genotyper.html

7. "Scaling variant discovery to a million genomes with the Genomic Variant Store." Terra. https://terra.bio/scaling-variant-discovery-to-a-million-genomes-with-the-genomic-variant-store/

8. DPGT (Distributed Population Genetics Tool). https://github.com/BGI-flexlab/DPGT
