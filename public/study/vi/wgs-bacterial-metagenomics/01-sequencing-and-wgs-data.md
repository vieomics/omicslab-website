---
slug: sequencing-and-wgs-data
title: "Giải trình tự vi khuẩn và dữ liệu đầu vào WGS"
description: "Read là gì, isolate WGS khác metagenomics ở điểm nào, và dữ liệu FASTQ cần đạt những điều kiện gì trước khi lắp ráp."
order: 1
module: "Nền tảng"
duration: "25 phút"
related:
  - bacterial-genome-assembly-without-coding
---

Máy giải trình tự không đọc trọn một hệ gen theo một mạch liên tục. Nó đọc nhiều đoạn ngắn song song, rồi phần mềm lắp ghép các đoạn đó lại. Vì vậy hiểu dữ liệu đầu vào là gì sẽ quyết định phần lớn kết quả lắp ráp về sau.

## Read: đơn vị dữ liệu cơ bản

Mỗi **read** là một chuỗi nucleotide ngắn (A, T, G, C) đi kèm điểm chất lượng cho từng base. Với công nghệ đọc ngắn (Illumina), một read thường dài vài chục đến vài trăm base; một lần chạy tạo ra hàng triệu read, được lưu trong tệp **FASTQ**. Mỗi read có hai tệp tương ứng — `R1` và `R2` — vì hai đầu của cùng một đoạn DNA được đọc từ hai phía.

Độ phủ (**coverage**) là số lần trung bình mỗi vị trí trong hệ gen được một read đi qua. Với vi khuẩn, độ phủ từ khoảng 30× trở lên thường đủ để lắp ráp, nhưng con số phù hợp còn tuỳ kích thước hệ gen và công cụ sử dụng.

![Luồng dữ liệu từ mẫu sinh học đến tệp FASTQ](./imgs/sequencing-to-fastq.svg "Hình 1. Từ mẫu sinh học đến các read được ghi vào tệp FASTQ.")

## Isolate WGS và metagenomics

Hai loại dữ liệu vi khuẩn thường gặp khác nhau ở nguồn gốc mẫu:

- **WGS từ khuẩn lạc phân lập (isolate).** Mẫu được nuôi cấy để chỉ còn một chủng, nên dữ liệu chủ yếu đến từ một hệ gen. Đây là trường hợp phù hợp với pipeline lắp ráp như `nf-core/bacass`.
- **Metagenomics (shotgun).** Mẫu chứa nhiều loài cùng lúc — ví dụ mẫu môi trường hoặc lâm sàng chưa phân lập. Lắp ráp ở đây hướng tới các **MAG** (metagenome-assembled genome), thường cần thêm bước gom nhóm (binning) và thường dùng pipeline khác, chẳng hạn `nf-core/mag`.

Nếu bạn không chắc dữ liệu của mình thuộc loại nào, một dấu hiệu hữu ích là độ phủ: isolate thường có độ phủ tương đối đồng đều, còn metagenome thường có nhiều mức phủ khác nhau giữa các loài.

:::note
Khóa học này đi theo nhánh isolate WGS, vì đây là trường hợp có pipeline đóng gói sẵn để thực hiện trên nền tảng. Nhánh metagenomics dùng chung nhiều khái niệm ở các bài sau.
:::

## Dữ liệu đầu vào cần đạt gì

Trước khi lắp ráp, một tệp FASTQ "sạch sẽ về mặt kỹ thuật" thường có:

- Đúng cặp `R1`/`R2` cho mỗi mẫu, cùng số read.
- Chất lượng base ở phần lớn read trên ngưỡng chấp nhận (thường Q20–Q30).
- Ít read nhiễm từ adapter hoặc từ mẫu khác.
- Tên mẫu trong tệp khớp với tên dùng trong samplesheet.

Những điểm này sẽ được kiểm tra lại bằng công cụ ở [bài 3](/study/wgs-bacterial-metagenomics/samplesheet-and-input-qc), nên ở bước này bạn chỉ cần nắm chúng là gì.

## Kết thúc bài

Bạn đã có khái niệm read, độ phủ, và sự khác biệt giữa isolate WGS với metagenomics. Bài tiếp theo đưa những dữ liệu này lên nền tảng Omicslab.
