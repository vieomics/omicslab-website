---
slug: assembly-with-nf-core-bacass
title: "Lắp ráp hệ gen vi khuẩn với nf-core/bacass"
description: "Lắp ráp là gì, vì sao pipeline đọc ngắn và đọc dài dùng công cụ khác nhau, và cách chạy nf-core/bacass trên nền tảng."
order: 4
module: "Lắp ráp hệ gen"
duration: "35 phút"
related:
  - bacterial-genome-assembly-without-coding
---

Lắp ráp (assembly) là ghép các read ngắn trở lại thành những đoạn dài liên tục (**contig**). Với vi khuẩn, mục tiêu thường là một nhiễm sắc thể hoàn chỉnh cùng các plasmid nếu có. Trong thực tế, kết quả thường là một tập contig, và chất lượng phụ thuộc vào công nghệ giải trình tự cùng độ phủ.

## Vì sao công cụ khác nhau cho đọc ngắn và đọc dài

- **Đọc ngắn (Illumina).** Độ chính xác cao nhưng read ngắn, nên các vùng lặp dễ gây nhập nhằng. Các assembler như Unicycler dựng đồ thị từ các đoạn chồng lấn (de Bruijn graph) để giải quyết.
- **Đọc dài (PacBio, Nanopore).** Read dài giúp bắc qua vùng lặp, nhưng độ chính xác từng base thấp hơn, nên cần bước hiệu chỉnh (polishing). Công cụ như Flye thường được dùng cho nhánh này.

Vì hai nhánh dùng công cụ khác nhau, pipeline sẽ chọn nhánh dựa trên loại dữ liệu bạn khai báo. Một số thiết lập còn kết hợp cả hai (hybrid).

![Các bước chính trong pipeline lắp ráp](./imgs/assembly-workflow.svg "Hình 1. Kiểm tra chất lượng, lắp ráp, hiệu chỉnh và đánh giá trong một pipeline lắp ráp vi khuẩn.")

## Chạy nf-core/bacass

`nf-core/bacass` gói sẵn các bước thường dùng: cắt tỉa read, lắp ráp, hiệu chỉnh và chú giải. Trên nền tảng, các bước này được thực hiện bên trong container, nên bạn chủ yếu cần khai báo ba thứ:

- **Đầu vào** — samplesheet từ [bài 3](/study/wgs-bacterial-metagenomics/samplesheet-and-input-qc).
- **Tham số** — loại read, công cụ lắp ráp, và các lựa chọn chú giải.
- **Tài nguyên** — số CPU và bộ nhớ cho mỗi bước.

Với mẫu vi khuẩn cỡ nhỏ, một lần chạy thử trên một mẫu là cách hợp lý để xác nhận cấu hình trước khi chạy nhiều mẫu. Tập công cụ cụ thể phụ thuộc phiên bản pipeline bạn chọn; xem tài liệu của chính phiên bản đó nếu cần chi tiết.

![Màn hình cấu hình job lắp ráp trên nền tảng](./imgs/platform-run-parameters.svg "Hình 2. Khai báo tham số và tài nguyên cho một job lắp ráp.")

## Kết quả trả về

Sau khi hoàn tất, kết quả thường gồm:

- **Contig** ở định dạng FASTA (tệp `.fasta`).
- Báo cáo chất lượng của bộ lắp ráp.
- Kết quả chú giải gene (tuỳ cấu hình).
- Log của từng bước và báo cáo tổng hợp.

## Kết thúc bài

Bạn đã có một bộ lắp ráp từ dữ liệu thô. Trước khi dùng nó cho phân tích tiếp theo, cần kiểm tra độ hoàn thiện — nội dung của bài 5.

> Đọc hướng dẫn đầy đủ: [Hướng dẫn xây dựng bộ genome vi khuẩn không cần lập trình](/blogs/bacterial-genome-assembly-without-coding).
