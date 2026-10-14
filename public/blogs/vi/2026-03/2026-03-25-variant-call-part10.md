---
slug: structural-variant-calling-short-reads-challenges
title: "Gọi biến thể (Phần 10): Những thách thức khi gọi biến thể cấu trúc với short read"
description: "Benchmark năm công cụ gọi SV từ short read (Manta, TIDDIT, Delly, Smoove, CNVnator) trên truth set GIAB HG002 với Truvari, và cách phương pháp đánh giá làm thay đổi precision được báo cáo."
series: Variant Calling from Bash to Production
seriesOrder: 10
authors: [vieomics]
tags: [nextflow, variant-calling, structural-variants, short-reads, truvari, manta]
image: ./imgs/structural-variant-calling-short-reads-challenges.png
---

Biến thể cấu trúc (SV) là những biến đổi hệ gen quy mô lớn (≥50 bp) gồm mất đoạn, nhân đoạn, đảo đoạn và chuyển đoạn. Trong khi giải trình tự short read đã đưa việc phát hiện SNP và indel nhỏ vào quy trình thường lệ, **gọi biến thể cấu trúc vẫn là một thách thức lớn**. Bài này tìm hiểu các công cụ gọi SV cho mẫu germline với short read 30X, benchmark năm công cụ thường dùng (Manta, TIDDIT, Delly, Smoove, CNVnator), và mô tả những hạn chế ở cả công cụ phát hiện lẫn phương pháp đánh giá. Trong benchmark của chúng tôi, công cụ đạt kết quả tốt nhất (Manta) chỉ đạt precision 36,8% khi đánh giá bằng Truvari, trong khi một nghiên cứu benchmark năm 2019 dùng phương pháp đánh giá khác báo cáo precision trên 80% cho các công cụ tương tự — khác biệt này cho thấy độ phức tạp và tính mơ hồ vốn có của phân tích SV.

<!--truncate-->

:::tip

- Subworkflow gọi biến thể cấu trúc và script benchmark có tại [**nf-germline-short-read-variant-calling**](https://github.com/nttg8100/nf-germline-short-read-variant-calling)
- Clone repository với tag **0.8.0** để tái lập nội dung bài viết này
- Kết quả benchmark nằm trong `benchmark/structural/`
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
- **Phần 10 (bài này)**: Những thách thức khi gọi biến thể cấu trúc với short read
- **[Phần 11](/blogs/gvcf-population-scale-genotyping)**: Genotyping quy mô quần thể với gVCF

Clone repository:

```bash
# clone and run the structural variant calling workflow
git clone git@github.com:nttg8100/nf-germline-short-read-variant-calling.git -b 0.8.0
cd nf-germline-short-read-variant-calling
```

## 1. Giới thiệu về biến thể cấu trúc

### 1.1. Biến thể cấu trúc là gì?

![sv_types](https://raw.githubusercontent.com/eldariont/svim/master/docs/SVclasses.png)

Biến thể cấu trúc là những biến đổi hệ gen tác động lên các đoạn DNA dài hơn 50 base pair. Khác với SNP (thay đổi một nucleotide) hay indel nhỏ (thêm/mất đoạn \<50 bp), SV có thể trải dài từ hàng nghìn đến hàng triệu base và ảnh hưởng đáng kể đến chức năng gene.

**Các loại SV chính:**

| Loại SV                             | Mô tả                                  | Ví dụ tham chiếu                              | Ví dụ trên reads                              | Tác động ví dụ                 |
| ----------------------------------- | -------------------------------------- | --------------------------------------------- | --------------------------------------------- | ------------------------------ |
| **Deletion (DEL)**                  | Mất trình tự hệ gen                    | ATCG **GGGTTT** AACC                          | ATCG AACC                                     | Mất gene ức chế khối u         |
| **Duplication (DUP)**               | Sao chép một vùng hệ gen               | ATCG **GGGTTT** AACC                          | ATCG GGGTTT **GGGTTT** AACC                   | Mất cân bằng liều lượng gene   |
| **Insertion (INS)**                 | Thêm trình tự mới                      | ATCG AACC                                     | ATCG **GGGTTT** AACC                          | Chèn mobile element            |
| **Inversion (INV)**                 | Đảo hướng trình tự                     | ATCG **GGGTTT** AACC                          | ATCG **TTTGGG** AACC                          | Phá vỡ cấu trúc gene           |
| **Tandem Duplication (TDUP)**       | Nhân đoạn liền kề của một vùng         | ATCG **GGGTTT** AACC                          | ATCG **GGGTTT GGGTTT** AACC                   | Khuếch đại gene                |
| **Interspersed Duplication (IDUP)** | Trình tự nhân đoạn chèn ở nơi khác     | ATCG **GGGTTT** AACC ... TTTAAA               | ATCG GGGTTT AACC ... **GGGTTT** TTTAAA        | Tái sắp xếp phức tạp            |
| **Translocation (TRA)**             | Trình tự chuyển giữa các chromosome    | chr1: ATCG **GGGTTT** AACC \<br> chr2: TTTAAA | chr1: ATCG AACC \<br> chr2: TTTAAA **GGGTTT** | Dung hợp gene gây ung thư       |

**Ý nghĩa lâm sàng:**

- **Ung thư:** dung hợp BCR-ABL1 trong bạch cầu tủy mạn
- **Rối loạn thần kinh:** mất đoạn lớn trong gene DMD gây loạn dưỡng cơ Duchenne
- **Biến thể số lượng bản sao:** nhân đoạn gene APP trong Alzheimer khởi phát sớm
- **Đa dạng quần thể:** khoảng 0,5% hệ gen khác nhau giữa các cá thể do SV

### 1.2. Vì sao short read gặp khó với SV

Giải trình tự short read (thường 150 bp từ Illumina) có những hạn chế cố hữu với phát hiện SV:

**Thách thức 1: Độ trải hạn chế**
Một mất đoạn có thể dài hơn độ dài của một read, nên không read đơn lẻ nào bao phủ toàn bộ sự kiện, và các breakpoint phải được suy ra từ các cặp read thay vì quan sát trực tiếp.

**Thách thức 2: Vùng lặp lại**
Phần lớn SV xảy ra ở vùng hệ gen lặp lại, nơi short read không thể map duy nhất:

- **Segmental duplication:** độ tương đồng trình tự >90% trên đoạn >1kb
- **Tandem repeat:** các vùng VNTR, STR
- **Mobile element:** các phần tử Alu, LINE chiếm ~45% hệ gen người

Chi tiết hơn:

| Loại vùng lặp lại                        | Mô tả                                                        | Ví dụ tham chiếu                                                  | Ví dụ trên reads                              | Tác động ví dụ                                 |
| ---------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| **Segmental Duplication**                | Vùng nhân đoạn lớn (>1kb, >90% tương đồng) trong hệ gen      | chr1: ATCG **GGGTTTAAA** AACC \<br> chr9: TTAA **GGGTTTAAA** GGCC | ATCG **GGGTTTAAA**                            | Read multi-mapping, breakpoint SV mơ hồ        |
| **Short Tandem Repeat (STR)**            | Motif ngắn (1–6 bp) lặp liên tiếp                            | ATCG **CACACACA** AACC                                            | ATCG **CACACACACACA** AACC                    | Mở rộng lặp gây gọi indel mơ hồ                |
| **STR Contraction**                      | Giảm số lần lặp trong vùng tandem repeat                     | ATCG **CACACACA** AACC                                            | ATCG **CACA** AACC                            | Phát hiện mất đoạn không chính xác             |
| **Variable Number Tandem Repeat (VNTR)** | Motif dài hơn lặp nhiều lần (10–100 bp)                      | ATCG **ATCGTGA ATCGTGA ATCGTGA** AACC                             | ATCG **ATCGTGA ATCGTGA ATCGTGA ATCGTGA** AACC | Ước lượng sai biến thể số lượng bản sao        |
| **VNTR Contraction**                     | Giảm số lần lặp VNTR                                         | ATCG **ATCGTGA ATCGTGA ATCGTGA** AACC                             | ATCG **ATCGTGA** AACC                         | Phát hiện breakpoint không chính xác           |
| **Alu Insertion (Mobile Element)**       | Mobile element chèn ngắn (~300 bp)                           | ATCG AACC                                                         | ATCG **ALU_ELEMENT** AACC                     | Thêm đoạn giả hoặc bỏ sót phát hiện            |
| **LINE-1 Insertion**                     | Phần tử chèn dài (~6kb) được chèn vào hệ gen                 | ATCG AACC                                                         | ATCG **LINE1_INSERTION** AACC                 | Đoạn thêm lớn bị short read bỏ sót             |
| **Repeat-Rich Region**                   | Trình tự lặp cao gây mapping mơ hồ                           | ATCG **ATATATATATAT** AACC                                        | ATCG **ATATATATATATATAT** AACC                | Alignment mơ hồ                                |
| **Low Complexity Region**                | Homopolymer hoặc repeat đơn giản                             | ATCG **AAAAAAAAAA** AACC                                          | ATCG **AAAAAAAAAAAAAA** AACC                  | Indel giả                                      |
| **Microsatellite Instability Region**    | Vùng STR rất không ổn định                                   | ATCG **TATATATA** AACC                                            | ATCG **TATATATATATATA** AACC                  | Nhiều false positive khi gọi SV                |

**Thách thức 3: Align mơ hồ**
Một read 150 bp trải qua một tái sắp xếp phức tạp có thể có nhiều alignment hợp lệ như nhau, khiến việc phát hiện SV trở nên không chắc chắn.

### 1.3. Các loại bằng chứng mà công cụ gọi SV sử dụng

#### 1.3.1. Cặp read bất thường (discordant read pairs): kích thước chèn hoặc hướng bất thường

:::info

- Insert size là khoảng cách giữa hai read paired-end trong một fragment giải trình tự.

- Trong giải trình tự paired-end (như giải trình tự Illumina), DNA trước tiên được cắt thành các fragment, sau đó hai đầu của mỗi fragment được giải trình tự:
  :::

Công cụ gọi biến thể cấu trúc (SV) dùng cặp read bất thường bằng cách nhận diện các read paired-end align với hệ gen tham chiếu ở khoảng cách hoặc hướng không như mong đợi. Trong giải trình tự bình thường, các read trong cặp align hướng vào nhau (→ ←) trong khoảng insert size dự kiến.

- Khi mẫu có một **mất đoạn (deletion)**, các read map **xa nhau hơn** dự kiến vì một đoạn bị thiếu trong mẫu so với tham chiếu.

- Với một **nhân đoạn (duplication)**, các read map **gần nhau hơn** vì có thêm trình tự trong mẫu.

- Trong một **đảo đoạn (inversion)**, các cặp read align **cùng hướng (→ → hoặc ← ←) thay vì hướng vào nhau**, cho thấy đoạn DNA bị đảo.

- Với **chuyển đoạn (translocation)**, các cặp read map sang chromosome khác hoặc vùng hệ gen xa. Các công cụ gọi SV như Manta, DELLY, LUMPY và GRIDSS nhóm nhiều cặp read bất thường cùng ủng hộ một mẫu bất thường để suy ra breakpoint của biến thể cấu trúc và phân loại SV.

  ![discordant reads](./imgs/discordant_reads.png)

#### 1.3.2. Split read: read được align thành hai phần (điểm nối breakpoint)

Split read là những read align với hai vị trí hệ gen khác nhau, cho thấy chúng trải qua một breakpoint biến thể cấu trúc. Ví dụ, một phần của read map trước một mất đoạn và phần còn lại map sau nó, nên aligner (như BWA-MEM hoặc minimap2) tách read thành hai alignment. Điều này giúp các công cụ gọi SV như Manta hoặc DELLY xác định breakpoint chính xác cho mất đoạn, thêm đoạn, đảo đoạn và chuyển đoạn.

Trong file alignment, split read có thể được nhận diện nhanh qua các alignment soft-clip hoặc hard-clip. Những read này align một phần với một vùng hệ gen, còn phần còn lại bị clip thay vì bị tính là mismatch, cho thấy read có thể trải qua một breakpoint biến thể cấu trúc.

#### 1.3.3. Độ sâu đọc (read depth): thay đổi độ phủ chỉ ra thay đổi số lượng bản sao

Read depth đơn giản cho thấy nhiều read align với một vùng cụ thể hơn. Tuy nhiên, điều này cũng có thể do thiên lệch từ quy trình khuếch đại DNA dùng trong chuẩn bị mẫu.

#### 1.3.4. De novo assembly: tái lắp ráp cục bộ read thành contig

Trong những trường hợp như vậy, tái lắp ráp các read ở vùng đó có thể giúp làm rõ tín hiệu. Bằng cách tái lắp ráp cục bộ, các read được tái tạo thành những trình tự liền mạch dài hơn, giúp giảm artifact alignment, giải quyết mapping mơ hồ và cải thiện phát hiện biến thể. Quá trình này giúp phân biệt liệu độ sâu đọc tăng phản ánh tín hiệu sinh học thật hay chỉ là thiên lệch kỹ thuật từ khuếch đại.

## 2. Pipeline nf-core/sarek và TIDDIT

### 2.1. Hỗ trợ biến thể cấu trúc của nf-core/sarek

[Pipeline nf-core/sarek](https://nf-co.re/sarek) (phiên bản 3.7.1) là một workflow Nextflow được dùng rộng rãi cho gọi biến thể germline và somatic. Trong khi sarek làm tốt việc gọi SNP/indel với GATK HaplotypeCaller và DeepVariant, hỗ trợ biến thể cấu trúc của nó còn hạn chế:

**Công cụ gọi SV trong sarek:**

- **Manta** (Illumina) - công cụ gọi SV chính, dùng bằng chứng paired-end và split-read
- **TIDDIT** - được thêm ở các phiên bản gần đây cho phát hiện SV toàn diện
- **CNVkit/ASCAT** - công cụ biến thể số lượng bản sao (chủ yếu cho phân tích somatic)

Động lực ban đầu cho công việc này đến từ việc tìm hiểu hiệu năng của TIDDIT sau khi thấy nó được tích hợp vào sarek. Bài báo của TIDDIT mô tả một thuật toán kết hợp:

- Cặp read bất thường
- Split read (supplementary alignment)
- Tái lắp ráp de novo cục bộ bằng fermi2
- Phân cụm DBSCAN để tổng hợp tín hiệu

### 2.2. Tổng quan thuật toán TIDDIT

Dựa trên [repository TIDDIT](https://github.com/SciLifeLab/TIDDIT), thuật toán hoạt động như sau:

```bash
TIDDIT Algorithm Pipeline:
1. Extract signals from BAM:
   ├── Discordant pairs (abnormal insert size/orientation)
   ├── Split reads (supplementary alignments)
   └── Coverage depth analysis

2. Local assembly (optional):
   └── Assemble reads with supplementary alignments using fermi2

3. DBSCAN clustering:
   └── Group signals within distance threshold (-e parameter)
       Default: sqrt(insert_size * 2) * 12

4. Filter and annotate clusters:
   ├── Minimum support (-p: pairs, -r: split reads)
   ├── Quality scoring via non-parametric sampling
   └── Coverage-based filters

5. Output VCF with SV calls
```

**Tham số TIDDIT để tinh chỉnh độ nhạy/precision:**

- `-p`: số cặp ủng hộ tối thiểu (mặc định: 3)
- `-r`: số split read ủng hộ tối thiểu (mặc định: 3)
- `-q`: chất lượng mapping tối thiểu (mặc định: 5)
- `-e`: ngưỡng khoảng cách phân cụm
- `--p_ratio`: tỉ lệ cặp bất thường tại breakpoint (mặc định: 0.1)
- `--r_ratio`: tỉ lệ split read tại breakpoint (mặc định: 0.1)

Thuật toán hợp lý về mặt lý thuyết, nhưng như kết quả benchmark dưới đây cho thấy, hạn chế của short read ảnh hưởng đến hiệu năng thực tế.

## 3. Mở rộng bộ công cụ gọi SV

### 3.1. Năm công cụ gọi SV được triển khai

Để đánh giá gọi SV từ short read, pipeline **nf-germline-short-read-variant-calling** được mở rộng với năm công cụ gọi SV:

| Công cụ     | Thuật toán                     | Loại bằng chứng                   | Điểm mạnh                      |
| ------------ | ------------------------------ | --------------------------------- | ------------------------------ |
| **Manta**    | Công cụ production của Illumina| Paired-end, split read            | Nhanh, được kiểm chứng rộng rãi |
| **TIDDIT**   | Phân cụm DBSCAN + assembly     | Paired-end, split read, assembly  | Tái lắp ráp cục bộ cho SV phức tạp |
| **Delly**    | Phân tích paired-end tích hợp  | Paired-end, split read            | Xác định breakpoint chính xác  |
| **Smoove**   | Wrapper Lumpy có genotyping    | Paired-end, split read            | Chấm điểm xác suất             |
| **CNVnator** | Dựa trên read-depth            | Độ phủ                            | Tốt nhất cho CNV lớn (>1kb)    |

**Triển khai trong nf-germline-short-read-variant-calling:**

Cấu trúc pipeline cho gọi biến thể cấu trúc:

```groovy
subworkflows/local/structural_variant_calling.nf:
├── MANTA          // Illumina Manta (paired-end + split reads)
├── TIDDIT         // SciLifeLab TIDDIT (assembly + clustering)
├── DELLY          // Delly2 (integrated PE analysis)
├── SMOOVE         // Smoove/Lumpy wrapper
└── CNVNATOR       // Read-depth CNV caller
```

Mỗi công cụ chạy độc lập trên cùng một file BAM đầu vào (mẫu HG002, độ phủ 30X, GRCh38), tạo ra các file VCF chứa các gọi biến thể cấu trúc.

### 3.2. Chạy pipeline gọi biến thể cấu trúc

```bash
cd nf-germline-short-read-variant-calling

# Input: Aligned BAM file from alignment workflow
# Configuration in: conf/customized_labels.config

# Run the pipeline with SV callers enabled
nextflow run main.nf \
  -profile docker \
  -c benchmark/structural/variant_calling/nf-germline-short-read-variant-calling/customized_labels.config \
  --input benchmark/structural/variant_calling/nf-germline-short-read-variant-calling/input.csv \
  --outdir results/structural_variants \
  --sv_callers "manta,tiddit,delly,smoove,cnvnator"
```

Pipeline xuất file VCF cho từng công cụ:

```
results/structural_variants/
├── manta/HG002.manta.vcf.gz
├── tiddit/HG002.tiddit.vcf.gz
├── delly/HG002.delly.vcf.gz
├── smoove/HG002-smoove.vcf.gz
└── cnvnator/HG002.cnvnator.vcf.gz
```

## 4. Phương pháp benchmark

### 4.1. Truth set và chuyển đổi hệ gen tham chiếu

**Truth set:** biến thể cấu trúc GIAB HG002 Tier 1 v0.6

- **Mẫu:** con trong bộ ba Ashkenazi (HG002/NA24385)
- **Truth set:** ~14K SV độ tin cậy cao (mất đoạn, thêm đoạn, nhân đoạn)
- **Vùng tin cậy:** ~2,66 Gb hệ gen với các gọi SV tin cậy
- **Tham chiếu:** tọa độ hg19/GRCh37

**Thách thức:** Pipeline của chúng tôi gọi biến thể theo GRCh38, nhưng truth set của GIAB ở tọa độ hg19.

**Giải pháp:** Dùng CrossMap để lift over các biến thể đã gọi từ hg38 sang hg19:

```bash
# Benchmark script: benchmark/structural/benchmark/benchmark_and_summary.sh

# 1. Normalize VCF (split multi-allelic sites)
bcftools norm -m -any -o normalized.vcf sample.vcf.gz

# 2. Convert hg38 → hg19 using CrossMap
CrossMap vcf \
  hg38ToHg19.over.chain.gz \
  normalized.vcf \
  human_g1k_v37_decoy.fasta \
  output_hg19.vcf

# 3. Remove 'chr' prefix and sort
sed -e 's/chr//g' output_hg19.vcf | bcftools sort > final.vcf
bgzip final.vcf && tabix final.vcf.gz
```

### 4.2. Benchmark bằng Truvari

[Truvari](https://github.com/ACEnglish/truvari) là công cụ tiêu chuẩn hiện nay cho benchmark SV. Công cụ so sánh VCF "baseline" (truth set) với VCF "comparison" (biến thể đã gọi):

```bash
# Run Truvari benchmark for each tool
truvari bench \
  -b HG002_SVs_Tier1_v0.6.vcf.gz \  # Truth set (baseline)
  -c tool_calls_hg19.vcf.gz \        # Tool calls (comparison)
  -o output.truvari \                 # Output directory
  -f human_g1k_v37_decoy.fasta \      # Reference genome
  --includebed HG002_SVs_Tier1_v0.6.bed  # Confident regions
```

**Chiến lược khớp của Truvari:**

1. **Chồng lấn tương hỗ:** biến thể phải chồng lấn ≥50% (mặc định)
2. **Tương đồng kích thước:** trong khoảng 50% chênh lệch kích thước tương đối
3. **Tương đồng trình tự:** align trình tự biến thể, yêu cầu ≥70% tương đồng
4. **Gần breakpoint:** cho phép dịch chuyển breakpoint nhỏ

**Các chỉ số Truvari:**

- **TP-base:** true positive trong truth set (các gọi baseline được khớp)
- **FP:** false positive (các gọi comparison không có trong truth set)
- **FN:** false negative (các gọi trong truth set không được công cụ tìm thấy)
- **Precision:** TP / (TP + FP) - tỉ lệ các gọi đúng?
- **Recall:** TP / (TP + FN) - tỉ lệ SV thực được tìm thấy?
- **F1 score:** trung bình điều hòa của precision và recall

## 5. Kết quả benchmark

### 5.1. So sánh hiệu năng giữa năm công cụ

Benchmark cho thấy khác biệt lớn về hiệu năng, với **Manta đạt kết quả tốt nhất** trong số các công cụ được thử:

| Công cụ      | TP    | FP    | FN     | Precision (%) | Recall (%) | F1 Score | Tổng số gọi |
| ------------ | ----- | ----- | ------ | ------------- | ---------- | -------- | ----------- |
| **Manta**    | 1,082 | 1,862 | 12,650 | **36.8%**     | **7.9%**   | 0.130    | 2,944       |
| **Delly**    | 123   | 4,722 | 13,609 | **2.5%**      | **0.9%**   | 0.013    | 4,845       |
| **TIDDIT**   | 13    | 9,497 | 13,719 | **0.14%**     | **0.09%**  | 0.001    | 9,510       |
| **Smoove**   | 6     | 3,137 | 13,726 | **0.19%**     | **0.04%**  | 0.001    | 3,143       |
| **CNVnator** | 3     | 248   | 13,729 | **1.2%**      | **0.02%**  | 0.0004   | 251         |

**Truth set:** 13.732 biến thể cấu trúc độ tin cậy cao (HG002 Tier 1 v0.6)

**Các quan sát chính:**

1. **Manta đạt kết quả tốt nhất:**
   - Tìm được 1.082 SV thực (gấp 10 lần công cụ tốt thứ hai)
   - Đạt precision 36,8% (nhưng vẫn \<40%)
   - Recall vẫn thấp ở 7,9% (chỉ ~8% SV thực được phát hiện)

2. **TIDDIT kém trong lần chạy này:**
   - Dù thuật toán tinh vi (assembly + DBSCAN), precision chỉ 0,14%
   - Gọi 9.510 biến thể, nhưng 9.497 là false positive (tỉ lệ FP 99,86%)
   - Vấn đề có thể là: tham số mặc định quá nhạy với dữ liệu WGS 30X

3. **Công cụ dựa trên read-depth (CNVnator) rất thận trọng:**
   - Chỉ 251 gọi tổng cộng, nhưng precision cao hơn (1,2%) so với phần lớn công cụ
   - Bỏ sót 99,98% SV thực (recall 0,02%)
   - Phù hợp với CNV lớn (>50kb), gặp khó với SV nhỏ hơn

4. **Recall nhìn chung thấp:**
   - Ngay cả Manta cũng chỉ tìm được \<8% SV thực
   - Phần lớn SV xảy ra ở vùng lặp lại nơi short read không map duy nhất

### 5.2. Phân tích hiệu năng của Manta

Dù Manta đạt kết quả tốt nhất, cần xem "precision 36,8%" thực sự nghĩa là gì:

**Phân tích kết quả của Manta:**

```
True Positives:  1,082 SVs correctly identified
False Positives: 1,862 SVs incorrectly called
False Negatives: 12,650 SVs missed

Precision: 1,082 / (1,082 + 1,862) = 36.8%
Recall:    1,082 / (1,082 + 12,650) = 7.9%
```

**Diễn giải:**

- Cứ 3 SV Manta gọi thì chỉ khoảng 1 là thực (64% là false positive)
- Manta bỏ sót >92% biến thể cấu trúc thực trong hệ gen
- Đây là mức hiện tại của phát hiện SV từ short read

**Vì sao Manta tốt hơn?**

- Lọc thận trọng: yêu cầu cả bằng chứng paired-end VÀ split-read
- Chấm điểm xác suất: mô hình Bayes tính đến độ bất định của mapping
- Được kiểm chứng công nghiệp: dùng trong Illumina DRAGEN và các pipeline lâm sàng
- Phát triển liên tục: được Illumina cải tiến cho mục đích production

### 5.3. Điều gì xảy ra với TIDDIT?

Precision thấp của TIDDIT (0,14%) khá bất ngờ với một thuật toán tinh vi. Một số lý do tiềm năng:

**1. Tinh chỉnh tham số cho dữ liệu WGS:**
Giá trị mặc định của TIDDIT có thể được tối ưu cho giải trình tự targeted hoặc thư viện mate-pair:

- `-p 3` (tối thiểu 3 cặp ủng hộ) có thể quá thấp với WGS 30X
- `-q 5` (ngưỡng MAPQ) thấp và bao gồm nhiều alignment mơ hồ
- `--p_ratio 0.1` và `--r_ratio 0.1` có thể quá dễ dãi

**2. False positive do assembly:**
Tái lắp ráp cục bộ với fermi2 có thể tạo SV nhân tạo:

- Contig lắp ráp sai ở vùng lặp lại
- Artifact assembly từ PCR duplicate hoặc lỗi giải trình tự
- Việc align contig trở lại tham chiếu tạo ra mơ hồ

**3. Phân cụm DBSCAN quá nhạy:**
Tham số khoảng cách phân cụm (`-e = sqrt(insert_size*2)*12`) có thể quá lớn:

- Nhóm các cặp bất thường không liên quan thành cụm SV giả
- Với insert size 350bp: `e = sqrt(700)*12 ≈ 318bp` bán kính phân cụm

**Khuyến nghị cho người dùng TIDDIT:**

- Tăng `-p` lên 10-20 cho dữ liệu WGS
- Tăng `-q` lên 20 (ngưỡng chất lượng mapping cao hơn)
- Cân nhắc `--skip_assembly` để tránh artifact assembly
- Dùng `--p_ratio 0.3` và `--r_ratio 0.3` để lọc chặt hơn

## 6. Vấn đề đánh giá: Truvari so với các phương pháp khác

### 6.1. Tiêu chí khớp của Truvari

Khớp mặc định của Truvari yêu cầu:

1. **Chồng lấn tương hỗ ≥50%** giữa tọa độ biến thể
2. **Kích thước trong khoảng 50% chênh lệch tương đối**
3. **Tương đồng trình tự ≥70%** sau khi align

**Vì sao điều này khắt khe với SV:**

- Bất định breakpoint: short read cho vị trí breakpoint không chính xác
- Mơ hồ cách biểu diễn: cùng một SV có thể được biểu diễn theo nhiều cách trong VCF
- Thiên lệch tham chiếu: artifact alignment gần các vùng hệ gen phức tạp

**Ví dụ: Mất đoạn mơ hồ**

```
Truth set:  DEL chr1:1000-1500 (500bp deletion)
Manta call: DEL chr1:1005-1505 (500bp deletion, shifted 5bp)

Truvari evaluation:
- Overlap: 495bp / 500bp = 99%
- Size match: 500bp vs 500bp
- Breakpoint shift: 5bp (acceptable)
→ MATCH (True Positive)

Alternative caller:
DEL chr1:995-1490 (495bp deletion, shifted -5bp, 1% size diff)

Truvari evaluation:
- Overlap: 490bp / 495bp = 98.9%
- Size match: 495bp vs 500bp (1% diff)
→ MATCH (True Positive)

But a deletion called as:
DEL chr1:1020-1480 (460bp deletion, breakpoint shift >10bp)

Truvari evaluation:
- Overlap: 460bp / 500bp = 92%
- Size match: 460bp vs 500bp (8% diff)
- But: Breakpoint shift >10bp may fail matching
→ Potential MISMATCH (False Positive/False Negative)
```

Sự khắt khe này dẫn đến **điểm precision/recall thấp hơn** ngay cả khi các gọi đúng về mặt sinh học.

### 6.2. Cách tiếp cận của nghiên cứu benchmark năm 2019

[Nghiên cứu benchmark biến thể cấu trúc năm 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6642177/) của Cameron et al. dùng phương pháp đánh giá khác và báo cáo **precision cao hơn nhiều** cho các công cụ gọi SV, bao gồm Manta (>80% precision).

**Khác biệt chính trong đánh giá:**

| Khía cạnh               | Truvari                               | Phương pháp nghiên cứu 2019                  |
| ----------------------- | ------------------------------------- | -------------------------------------------- |
| **Dung sai khớp**       | Chồng lấn 50%, tương đồng kích thước 50% | Dung sai breakpoint rộng hơn (±100-500bp) |
| **Xử lý SV phức tạp**   | Khớp từng bản ghi VCF độc lập         | Hợp nhất các gọi chồng lấn dựa trên đồ thị   |
| **Biểu diễn**           | Yêu cầu biểu diễn VCF tương tự        | Chuẩn hóa biểu diễn trước khi so sánh        |
| **Truth set**           | Một tập gọi độ tin cậy cao            | Ensemble nhiều công cụ trực giao             |
| **Phương pháp đánh giá**| So sánh VCF trực tiếp                 | Chồng lấn BEDPE + kiểm định thống kê         |

**Vì sao phương pháp 2019 cho precision cao hơn:**

1. **Dung sai breakpoint rộng hơn:**
   - Cho phép dịch chuyển breakpoint ±100-500bp (so với Truvari khắt khe hơn)
   - Tính đến mơ hồ alignment ở vùng lặp lại

2. **Truth set dạng ensemble:**
   - Các gọi truth được kiểm chứng bằng ≥2 phương pháp trực giao (ví dụ: long-read + short-read)
   - Giảm false negative do hạn chế của một phương pháp đơn lẻ

3. **Hợp nhất dựa trên đồ thị:**
   - Nhiều gọi chồng lấn được hợp nhất thành một sự kiện SV
   - Giảm "đếm trùng" các SV phức tạp

4. **Đánh giá theo ngữ cảnh:**
   - Xét ngữ cảnh hệ gen (vùng lặp lại, segmental duplication)
   - Điều chỉnh kỳ vọng cho các vùng khó gọi

**Ví dụ so sánh:**

```
Scenario: Manta calls a 5kb deletion

Truvari evaluation:
- Truth set breakpoint: chr1:100,000-105,000
- Manta call: chr1:100,050-105,100 (50bp shift at both ends)
- Overlap: 4,900bp / 5,000bp = 98%
- But: 50bp breakpoint shift may trigger mismatch
→ Classified as FP (precision decreases)

2019 Paper evaluation:
- ±500bp breakpoint tolerance
- 50bp shift is within tolerance
- Same SV class (deletion)
- Size within 10%
→ Classified as TP (precision higher)
```

Điều này giải thích vì sao **Manta cho precision 36,8% (Truvari) so với >80% (nghiên cứu 2019)** dù hiệu năng nền tảng tương tự.

### 6.3. Phương pháp đánh giá nào "đúng"?

**Cả hai phương pháp đều hợp lý nhưng phục vụ mục đích khác nhau:**

**Truvari (khớp khắt khe):**

- **Mục tiêu:** precision mức lâm sàng - độ tin cậy cao với các gọi biến thể chính xác
- **Ứng dụng:** chẩn đoán, nơi false positive tốn kém
- **Triết lý:** khớp thận trọng đảm bảo biến thể thực sự tồn tại
- **Đánh đổi:** có thể phạt các gọi đúng sinh học nhưng định nghĩa không chính xác

**Phương pháp nghiên cứu 2019 (khớp rộng hơn):**

- **Mục tiêu:** khám phá sinh học - bắt được sự kiện SV ngay cả khi breakpoint bất định
- **Ứng dụng:** nghiên cứu, nghiên cứu quần thể, phát triển phương pháp SV
- **Triết lý:** tập trung vào việc sự kiện SV có thật hay không, không phải tọa độ chính xác
- **Đánh đổi:** có thể làm precision cao giả tạo bằng cách chấp nhận các khớp mơ hồ

**Vấn đề cơ bản:**
Gọi SV từ short read có **tính mơ hồ cố hữu** do:

- Độ trải read hạn chế (150 bp so với SV cỡ kb)
- Vùng hệ gen lặp lại (~45% hệ gen người)
- Nhiều alignment hợp lệ cho cùng một read
- Hạn chế của hệ gen tham chiếu (không nắm bắt hết biến thể người)

**Hàm ý cho người dùng:**

- Với **chẩn đoán lâm sàng:** dùng benchmark khắt khe kiểu Truvari (thận trọng)
- Với **khám phá nghiên cứu:** dùng benchmark rộng hơn (nhạy)
- Với **phát triển pipeline:** báo cáo cả hai chỉ số để thể hiện đầy đủ phổ hiệu năng

## 7. Tóm tắt

Bài này tìm hiểu những thách thức khi gọi biến thể cấu trúc bằng giải trình tự short read:

**Các phát hiện chính:**

1. **Manta vượt trội so với các công cụ gọi SV short read khác được thử** (precision 36,8%, recall 7,9%)
2. **TIDDIT kém với tham số mặc định** (precision 0,14%) dù thuật toán tinh vi
3. **Recall thấp là phổ biến** - ngay cả công cụ tốt nhất cũng bỏ sót >92% SV thực
4. **Phương pháp đánh giá ảnh hưởng mạnh đến hiệu năng báo cáo** (36,8% so với >80% precision)
5. **Vấn đề gọi SV gắn với hạn chế của short read**, không chỉ ở phần mềm

**Khuyến nghị thực tế:**

- Dùng **Manta** cho gọi SV từ short read (lựa chọn tốt nhất trong benchmark này)
- Áp dụng **lọc chặt** (chỉ PASS, GQ cao, nhiều loại bằng chứng)
- Cân nhắc **phương pháp ensemble** (Manta + Delly) để cải thiện độ nhạy
- **Kiểm chứng SV liên quan lâm sàng** bằng phương pháp trực giao (PCR, long read)
- Chuyển sang **giải trình tự long read** khi ngân sách cho phép (PacBio HiFi, ONT)

**Điểm mấu chốt:**
Gọi biến thể cấu trúc từ short read vẫn là một bài toán khó trong genomics. Trong khi các công cụ như Manta cho kết quả hữu ích cho lâm sàng, ngành đang dần chuyển sang giải trình tự long read để phát hiện SV toàn diện. Hiện tại, người dùng nên hiểu rõ các hạn chế, áp dụng bộ lọc chất lượng phù hợp và kiểm chứng những phát hiện quan trọng.

## Tài liệu tham khảo

- [SV types](https://github.com/eldariont/svim-asm): các loại biến thể, hình minh họa bởi svim-asm
- [Pipeline nf-germline-short-read-variant-calling](https://github.com/nttg8100/nf-germline-short-read-variant-calling) - subworkflow gọi biến thể cấu trúc
- [Bài báo Manta](https://doi.org/10.1093/bioinformatics/btv710) - Chen et al. 2016, Bioinformatics
- [TIDDIT GitHub](https://github.com/SciLifeLab/TIDDIT) - công cụ gọi biến thể cấu trúc của SciLifeLab
- [Truvari GitHub](https://github.com/ACEnglish/truvari) - bộ công cụ benchmark SV
- [Bài báo benchmark SV 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6642177/) - Cameron et al. 2019, Nature Communications
- [Truth set GIAB HG002](https://ftp-trace.ncbi.nlm.nih.gov/ReferenceSamples/giab/release/) - biến thể cấu trúc Genome in a Bottle
- [nf-core/sarek](https://nf-co.re/sarek) - pipeline gọi biến thể germline/somatic bằng Nextflow
- [Bài báo Delly](https://doi.org/10.1093/bioinformatics/bts378) - Rausch et al. 2012, Bioinformatics
- [Bài báo CNVnator](https://doi.org/10.1101/gr.114876.110) - Abyzov et al. 2011, Genome Research
- [sv_benchmark](https://github.com/PapenfussLab/sv_benchmark): đánh giá và mô tả toàn diện phần mềm gọi biến thể cấu trúc short read đa dụng
