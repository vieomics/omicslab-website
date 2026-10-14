---
slug: giab-pilot-study-benchmark-development
title: "Nghiên cứu thí điểm GIAB: cách xây dựng bộ chuẩn độ tin cậy cao cho NA12878"
description: "Bài điểm lại nghiên cứu thí điểm nền tảng năm 2014 của Zook et al., với 14 bộ dữ liệu từ năm nền tảng giải trình tự, nhằm xác lập bộ chuẩn SNP và indel độ tin cậy cao cho mẫu tham chiếu NA12878."
authors: [vieomics]
tags: [variant-calling, benchmarking, clinical-genomics, quality-control]
image: ./imgs/giab-pilot-study-benchmark-development.png
---

Genome in a Bottle (GIAB) được dùng rộng rãi như một nguồn chuẩn trong genomics lâm sàng và nghiên cứu, nhưng lý do phương pháp luận đằng sau các call set tham chiếu của dự án thường ít được bàn tới hơn chính các call set đó. Bài viết này điểm lại nghiên cứu thí điểm nền tảng năm 2014 của Zook et al., công trình đã thiết lập hạ tầng kỹ thuật và chiến lược tích hợp mà các bản phát hành GIAB sau này tiếp tục kế thừa.

<!--truncate-->

:::warning
**Lưu ý về hình ảnh**: bài báo gốc không phải truy cập mở. Các hình được tái sử dụng ở đây lấy từ những nguồn công khai khác và tài nguyên cộng đồng, dùng cho mục đích giáo dục.
:::

## 1. Động lực và mục tiêu

:::info
**Các nguyên tắc của nghiên cứu thí điểm GIAB:**

- Dùng một dòng tế bào bất tử (NA12878) để có thể tái tạo vật liệu DNA, tạo nguồn đầu vào nhất quán và gần như vô hạn giữa các phòng thí nghiệm và thời điểm
- Giải trình tự cùng một hệ gen bằng các công nghệ trực giao, nhiều giao thức chuẩn bị thư viện khác nhau và các pipeline phân tích độc lập
- Xác định biến thể độ tin cậy cao bằng đồng thuận đa nền tảng, đòi hỏi sự ủng hộ của nhiều hơn một công nghệ độc lập
- Phân loại và loại trừ có hệ thống các vùng có lời gọi mâu thuẫn hoặc không đủ bằng chứng
- Áp dụng phân xử và hiệu chỉnh thủ công để giải quyết mâu thuẫn ở những vùng hệ gen khó
:::

Việc dùng giải trình tự toàn hệ gen trong lâm sàng phụ thuộc vào các khung kiểm soát chất lượng có thể mô tả kiểu gen ở quy mô lớn, từ hàng triệu đến hàng tỷ vị trí. Vào thời điểm công trình được công bố, sự không tương thích giữa các công nghệ giải trình tự và pipeline bioinformatics là một rào cản đối với việc chuyển dịch sang lâm sàng, và lĩnh vực này chưa có một chuẩn tham chiếu đồng thuận để đánh giá hiệu năng một cách hệ thống.

Zook et al. (2014) giải quyết khoảng trống này bằng cách xác lập một trong những bộ chuẩn toàn diện, độ tin cậy cao đầu tiên cho NA12878 — mẫu nữ CEU đã được mô tả kỹ trong HapMap/1000 Genomes, sau đó được chọn làm vật liệu tham chiếu của NIST. Phương pháp tích hợp của nhóm được thiết kế để giảm sai lệch đặc thù nền tảng và sai lệch thuật toán thông qua phân xử đa công nghệ, và cách tiếp cận này vẫn tiếp tục định hướng cho việc phát triển vật liệu tham chiếu.

## 2. Khung phương pháp luận

:::info
**Vì sao chọn NA12878 làm vật liệu tham chiếu:**

- **Loại tế bào**: dòng tế bào lympho B đã biến nạp EBV, dễ bất tử hóa và mở rộng trong nuôi cấy
- **Ổn định sinh học**: tế bào bất tử cung cấp nguồn DNA tái tạo được và giảm biến động giữa các lô
- **Khả năng tái lập**: các thí nghiệm giải trình tự lặp lại dùng cùng nguồn hệ gen, cho phép so sánh giữa các nền tảng và phòng thí nghiệm
:::

Để xây dựng một call set độ tin cậy cao và ít thiên lệch, nghiên cứu dùng khung tích hợp và phân xử dựa trên các công nghệ giải trình tự trực giao và phương pháp bioinformatics độc lập. Cách tiếp cận đồng thuận đa nền tảng nhằm nhận diện và giảm lỗi hệ thống đặc thù công nghệ và sai lệch thuật toán.

### 2.1 Tích hợp dữ liệu đa nền tảng

:::warning
**Bối cảnh lịch sử**: nghiên cứu thí điểm này công bố năm 2014. Một số công nghệ được dùng (ví dụ 454 và SOLiD) hiện không còn được hỗ trợ, nhưng các nguyên tắc tích hợp vẫn còn liên quan cho những nỗ lực benchmark có dùng các nền tảng như PacBio HiFi và Oxford Nanopore.
:::

Chiến lược tích hợp bao trùm **14 bộ dữ liệu độc lập** thuộc nhiều phương pháp hóa học giải trình tự và cách phân tích khác nhau:

- **5 nền tảng giải trình tự**: Illumina (nhiều thế hệ thiết bị), Complete Genomics, Roche 454, Applied Biosystems SOLiD và Ion Torrent
- **7 thuật toán alignment**: BWA, BWA-MEM, Novoalign, SSAHA2, LifeScope, CGTools và CASAVA
- **3 phương pháp gọi biến thể**: GATK UnifiedGenotyper, GATK HaplotypeCaller và Cortex (dựa trên lắp ráp de novo)
- **Độ phủ**: 11 bộ dữ liệu toàn hệ gen (độ phủ 16-190×) và 3 bộ dữ liệu exome (độ phủ 30-80×)

### 2.2 Pipeline tích hợp và phân xử

Nghiên cứu dùng một quy trình nhiều bước để giải quyết mâu thuẫn giữa các bộ dữ liệu:

1. **Phát hiện biến thể**: tập hợp mọi vị trí có bằng chứng SNP hoặc indel trong bất kỳ bộ dữ liệu đầu vào nào, tạo ra tập ứng viên đầy đủ

2. **Gọi kiểu gen bắt buộc tại các vị trí hợp nhất**: sinh lời gọi kiểu gen từ mọi bộ dữ liệu tại tất cả locus ứng viên, để mỗi công nghệ đều được đánh giá ngay cả ở vị trí có bằng chứng yếu

3. **Phát hiện sai lệch bằng học máy**: huấn luyện GATK Variant Quality Score Recalibration (VQSR) trên các lời gọi đồng thuận để xây dựng mô hình hỗn hợp Gaussian nhằm đánh dấu lỗi hệ thống đặc thù công nghệ, dựa trên các annotation như strand bias, mapping quality, allele balance và positional bias

4. **Phân xử tuần tự các mâu thuẫn**: áp dụng lọc theo thứ bậc để giải quyết các lời gọi kiểu gen xung đột và loại trừ những bộ dữ liệu cho thấy:
   - lỗi giải trình tự hệ thống (SSE) đặc trưng cho từng nền tảng
   - mơ hồ alignment cục bộ trong vùng lặp lại hoặc độ phức tạp thấp
   - chất lượng mapping giảm, có thể chỉ ra mapping paralog
   - allele balance bất thường gợi ý artifact kỹ thuật hoặc thể khảm somatic

5. **Xác định vùng không chắc chắn**: loại trừ các khoảng hệ gen không thể gán kiểu gen một cách chắc chắn, bao gồm:
   - vị trí còn mâu thuẫn dai dẳng sau phân xử
   - simple repeat không được bao phủ trọn vẹn bởi độ dài read sẵn có
   - các đoạn nhân bản phân đoạn (segmental duplication) và mở rộng tandem repeat đã biết
   - trình tự paralog với decoy contig GRCh37
   - điểm gãy structural variant và tái sắp xếp phức tạp đã được báo cáo

## 3. Kết quả

Call set tích hợp cuối cùng bao phủ **87,6%** các base không phải N trên nhiễu sắc thể 1-22 và X:

- **2.484.884.293** vị trí reference đồng hợp tử độ tin cậy cao
- **3.137.725** lời gọi SNP
- **201.629** lời gọi indel (chủ yếu \<40 bp)

Việc loại trừ các vùng có structural variant đã báo cáo đưa tập gọi được xuống còn **77% hệ gen tham chiếu**, giữ lại 2.741.014 SNP và 174.718 indel. Như nghiên cứu lưu ý, ngưỡng bảo thủ này ưu tiên tính đặc hiệu hơn độ nhạy, phù hợp với các ứng dụng tập trung vào độ chính xác.

## 4. Kiểm chứng trực giao

Call set tích hợp được đối chiếu với nhiều công nghệ độc lập:

- **Giải trình tự Sanger** (được xem như chuẩn vàng): **đồng thuận 100%** trên 551 SNP và 79 indel (XPrize: 124 SNP, 37 indel; GeT-RM: 427 SNP, 42 indel)
- **Giải trình tự dòng fosmid**: đồng thuận cao trên khoảng 5% hệ gen, với hiệu chỉnh thủ công quy phần lớn mâu thuẫn cho âm tính giả của fosmid trong các ngữ cảnh biến thể phức tạp
- **Genotyping microarray**: so sánh hệ thống cho thấy microarray gọi biến thể kém ở vùng độ phức tạp thấp, nơi lai probe bị hạn chế
- **Gọi biến thể độc lập (FreeBayes trên WES)**: kiểm tra thủ công cho thấy phần lớn lời gọi riêng của WES nhưng vắng mặt trong bộ chuẩn WGS là dương tính giả do thiên lệch capture exome và lỗi mapping hệ thống, điều này củng cố tích hợp WGS

Nghiên cứu cũng báo cáo tỷ lệ chuyển hoán/chuyển vị (Ti/Tv) của biến thể mới cao hơn tỷ lệ của từng bộ dữ liệu riêng lẻ, phù hợp với tỷ lệ dương tính giả thấp hơn. Ti/Tv là một thước đo không hoàn hảo, vì biến thể mới có thể có phổ đột biến khác, nên các tác giả trình bày tỷ lệ cao này như bằng chứng hỗ trợ chứ không phải kết luận.

## 5. Thách thức kỹ thuật và hạn chế

### 5.1 Mơ hồ trong biểu diễn biến thể phức tạp

Một vấn đề lặp lại trong tích hợp biến thể là biểu diễn không duy nhất: indel và biến thể phức tạp (SNP/indel tập trung trong khoảng 20 bp) có thể viết dưới nhiều dạng VCF hợp lệ. Các thuật toán alignment khác nhau tạo ra biểu diễn khác nhau nhưng tương đương cho cùng một biến thể, gây khó khăn khi so sánh giữa các nền tảng.

Để giảm điều này, nghiên cứu dùng các chiến lược chuẩn hóa VCF (vcflib `vcfallelicprimitives` để left-alignment và phân tách allelic) và chuẩn hóa biểu diễn theo định dạng GATK HaplotypeCaller, vốn thực hiện lắp ráp de novo cục bộ để tạo biểu diễn nhất quán. Kiểm tra thủ công các vị trí mâu thuẫn vẫn cần thiết để phân biệt khác biệt biến thể thật với artifact biểu diễn.

![Complex variant representation](./imgs/hap.py.png)
_Hình: minh họa sự mơ hồ trong biểu diễn. Một biến thể sinh học duy nhất có thể được mã hóa dưới nhiều định dạng VCF tương đương, tùy thuộc vào thuật toán alignment và quy ước của công cụ gọi biến thể._

### 5.2 Lỗi hệ thống đặc thù nền tảng

Mỗi công nghệ giải trình tự cho thấy hồ sơ lỗi đặc trưng trong những ngữ cảnh hệ gen nhất định:

- **Illumina**: lỗi thay thế đặc thù mạch lân cận motif GGT, quy cho vấn đề phasing cluster đã biết trong các phương pháp hóa học giải trình tự trước đây
- **Không đồng nhất độ phủ**: thiên lệch GC và khác biệt hiệu quả capture phụ thuộc công nghệ tạo ra các vùng phủ thấp đặc thù nền tảng
- **Mơ hồ mapping**: trình tự lặp lại và paralog khó mapping ở mức độ khác nhau giữa các công nghệ, tương quan với độ dài read và phân bố kích thước insert của paired-end

**Ví dụ**: trong dữ liệu Illumina, nghiên cứu quan sát các lời gọi thiên lệch mạch gần motif trinucleotide GGT. Những biến thể giả định này có allele balance méo lệch hệ thống và strand bias có hướng trong read paired-end — dấu hiệu của artifact giải trình tự hơn là đa hình thật.

Các lời gọi này vắng mặt trên những nền tảng trực giao (454, SOLiD, Complete Genomics), và nghiên cứu trình bày đây là bằng chứng rằng chúng là dương tính giả đặc thù nền tảng. Điều này minh họa giá trị của phân xử đa công nghệ: lỗi hệ thống đặc thù công nghệ được nhận diện và lọc qua kiểm chứng trực giao, trong khi biến thể thật nhận được ủng hộ đa nền tảng.

Nguyên tắc này cũng được dùng trong phát triển benchmark gần đây, khi các nền tảng đọc dài (PacBio HiFi, ONT) cung cấp hồ sơ lỗi trực giao với dữ liệu đọc ngắn Illumina.

### 5.3 Hạn chế của kiểm chứng bằng microarray

Genotyping microarray, từng được dùng phổ biến để kiểm chứng giải trình tự, tỏ ra không đủ cho việc kiểm chứng benchmark toàn diện:

- **Lấy mẫu hệ gen thiên lệch**: chỉ 0,0117% vị trí probe microarray khảo sát vùng độ phức tạp thấp, so với 0,7847% ở các biến thể giải trình tự tích hợp, tạo ra thiên lệch ascertainment
- **Nhiễu probe**: indel và biến thể theo pha ở gần đó ảnh hưởng động học lai probe và có thể tạo lời gọi kiểu gen sai
- **Tỷ lệ dương tính giả cao**: hiệu chỉnh thủ công cho thấy khoảng 50% lời gọi biến thể riêng của microarray thực ra là vị trí reference đồng hợp tử trên mọi bộ dữ liệu giải trình tự

Nghiên cứu kết luận rằng dữ liệu microarray, dù hữu ích cho biến thể phổ biến ở vùng mapping được, không thể làm tập chuẩn toàn diện cho benchmark toàn hệ gen.

### 5.4 Gọi indel

Phát hiện indel khó hơn đáng kể so với gọi SNP trên mọi nền tảng:

- **Độ nhạy homopolymer**: indel trong đoạn homopolymer và trình tự độ phức tạp thấp khó giải quyết chính xác do mơ hồ alignment và lỗi trượt polymerase
- **Độ chính xác giảm**: mọi nền tảng đều có tỷ lệ dương tính giả và âm tính giả cao hơn với indel so với SNP, đòi hỏi ngưỡng lọc nghiêm ngặt hơn
- **Phân xử phức tạp hơn**: giải quyết lời gọi indel mâu thuẫn cần local realignment, lắp ráp de novo và hiệu chỉnh thủ công nhiều

Những khó khăn này vẫn tồn tại trong gọi biến thể hiện đại, dù công nghệ đọc dài như PacBio HiFi đã cải thiện độ chính xác indel trong ngữ cảnh lặp lại.

### 5.5 Hạn chế về độ bao phủ

Bất chấp tích hợp đa nền tảng, khoảng **23% hệ gen tham chiếu** được phân loại là không chắc chắn hoặc bị loại khỏi vùng độ tin cậy cao:

- **Điểm gãy structural variant** (khoảng 10% hệ gen): các vùng có SV báo cáo trong dbVar bị loại trừ một cách bảo thủ
- **Nhân bản phân đoạn**: trình tự paralog có độ tương đồng cao ngăn cản gọi biến thể đáng tin cậy bằng read ngắn
- **Vùng độ phức tạp thấp**: homopolymer, tandem repeat và simple sequence repeat gây khó khăn cho alignment và gọi biến thể
- **Khả năng mapping thấp**: vùng không đủ tính duy nhất để alignment read ngắn rõ ràng
- **Simple tandem repeat**: locus STR cần phương pháp genotyping chuyên biệt

Các lời gọi indel cũng chủ yếu giới hạn ở **\<40 bp**, khiến các insertion, deletion lớn hơn và structural variant phức tạp không được mô tả. Các bản phát hành GIAB sau này đã mở rộng độ bao phủ vào những vùng khó bằng giải trình tự đọc dài và phương pháp gọi SV chuyên dụng.

## 6. Ảnh hưởng và sự liên quan hiện nay

Nghiên cứu thí điểm GIAB đã đặt ra các nguyên tắc phát triển benchmark vẫn còn được dùng. Bằng cách tích hợp 14 bộ dữ liệu thuộc năm nền tảng giải trình tự, bảy thuật toán alignment và ba chiến lược gọi biến thể, consortium tạo ra các lời gọi kiểu gen độ tin cậy cao cho NA12878; nghiên cứu báo cáo rằng chúng có độ nhạy, độ đặc hiệu tốt hơn và ít thiên lệch hơn so với bất kỳ cách tiếp cận đơn nền tảng nào.

### Đóng góp phương pháp luận

- **Phân xử đa công nghệ**: cách có nguyên tắc để nhận diện và giảm lỗi hệ thống đặc thù nền tảng qua kiểm chứng trực giao
- **Độ bao phủ rộng**: lời gọi độ tin cậy cao trên 77-87% hệ gen tham chiếu, với kiểu gen SNP và indel đã kiểm chứng
- **Minh chứng thực nghiệm**: đồng thuận đa nền tảng vượt trội đáng kể so với gọi đơn nền tảng
- **Mô tả vùng khó**: ghi nhận các khoảng hệ gen nơi công nghệ đọc ngắn không thể gọi biến thể đáng tin cậy

### Ảnh hưởng cộng đồng

Nguồn chuẩn, được phân phối công khai qua [genomeinabottle.org](https://www.genomeinabottle.org) và các site FTP của NCBI, đã hỗ trợ:

- **Kiểm chứng pipeline**: đánh giá chuẩn hóa độ nhạy và độ chính xác của gọi biến thể
- **Benchmark công nghệ**: so sánh nền tảng giải trình tự và giao thức chuẩn bị thư viện
- **Kiểm chứng lâm sàng**: vật liệu tham chiếu được FDA công nhận để hỗ trợ kiểm chứng xét nghiệm chẩn đoán
- **Phát triển thuật toán**: tập dữ liệu chuẩn để tối ưu công cụ gọi biến thể và học máy

### Tiến hóa và hướng đi tiếp theo

Khung từ nghiên cứu thí điểm này tiếp tục định hướng cho việc tinh chỉnh GIAB. Các bản phát hành sau đã bổ sung dần:

- giải trình tự đọc dài (PacBio HiFi, Oxford Nanopore), mở rộng mô tả vào những vùng trước đây khó tiếp cận
- các phương pháp gọi structural variant chuyên dụng, mở rộng độ bao phủ ra ngoài indel nhỏ
- thêm hệ gen tham chiếu đại diện cho nhiều quần thể khác nhau
- cải thiện độ bao phủ các gene liên quan y học và vùng hệ gen khó

Nghiên cứu cho thấy vật liệu tham chiếu được mô tả kỹ và không phụ thuộc công nghệ là hạ tầng hữu ích cho genomics lâm sàng, một nguyên tắc vẫn giữ vai trò trung tâm trong kiểm soát chất lượng của y học chính xác.

## 7. Một công cụ thực hành: kiểm tra biến thể đa nền tảng

Vì bài báo gốc không phải truy cập mở, phần điểm lại trên chỉ đi được một phần chặng đường. Để áp dụng cùng cách lập luận vào thực tế, chúng tôi xây dựng một bộ công cụ genomics nhỏ dựa trên `igv-reports` cho việc trực quan hóa tương tác trên trình duyệt các lời gọi biến thể giữa nhiều bộ dữ liệu.

Bộ công cụ tự động hóa việc trích xuất tập con BAM/VCF cho các vùng quan tâm và tạo báo cáo IGV tích hợp, giúp việc hiệu chỉnh thủ công nhanh các lời gọi mâu thuẫn trở nên thực tế hơn. Việc rà soát thủ công như vậy vẫn là bước thường quy trong phát triển benchmark và kiểm chứng biến thể.

### Ví dụ sử dụng

```bash
# Clone the genomics toolkit
git clone git@github.com:gianglabs/gkit.git
cd gkit/igv-report

# Test with example data (1 BAM + 1 VCF)
make test

# For custom analyses: subset BAM/VCF files to regions of interest
bash scripts/remote_subset.sh \
    <region_of_interest> \
    <flanking_size> \
    <input_data_path> \
    <output_directory>

# Generate interactive IGV report
create_report <vcf_file> \
    --genome <reference_genome> \
    --flanking <flanking_size> \
    --track-config ./output/tracks_config.json \
    --output <output.html> \
    --standalone \
    --title "Multi-Platform Variant Review"
```

### Quy trình gợi ý

1. **Nhận diện biến thể mâu thuẫn** giữa pipeline của bạn và bộ chuẩn GIAB
2. **Trích xuất vùng** bằng script subset với kích thước flanking phù hợp (500-1000 bp là điểm khởi đầu thường dùng)
3. **Đưa vào nhiều track BAM** đại diện cho các nền tảng hoặc pipeline khác nhau
4. **Rà soát có hệ thống** để tìm thiên lệch đặc thù nền tảng, artifact mapping và vấn đề biểu diễn

![IGV Report Example](./imgs/giab_ps_igv.png)
_Hình: một báo cáo IGV ví dụ thể hiện các track alignment đa nền tảng để rà soát biến thể có hệ thống. Trực quan hóa trên trình duyệt giúp đánh giá nhanh mức ủng hộ biến thể giữa các công nghệ._

## Tài liệu tham khảo

**Công bố chính:**

Zook, J. M., Chapman, B., Wang, J., Mittelman, D., Hofmann, O., Hide, W., & Salit, M. (2014). Integrating human sequence data sets provides a resource of benchmark SNP and indel genotype calls. _Nature Biotechnology_, 32(3), 246-251. https://doi.org/10.1038/nbt.2835

**Tài nguyên:**

- GIAB Consortium: https://www.genomeinabottle.org
- Kho dữ liệu GIAB: https://ftp.ncbi.nlm.nih.gov/giab/ftp/
- IGV Reports: https://github.com/igvteam/igv-reports
- Bộ công cụ genomics (gkit): https://github.com/gianglabs/gkit
