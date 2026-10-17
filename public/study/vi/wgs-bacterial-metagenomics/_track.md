---
title: "Lắp ráp và chú giải hệ gen vi khuẩn từ dữ liệu WGS"
description: "Kết quả: một bộ hệ gen vi khuẩn đã lắp ráp, kiểm định và chú giải, kèm các gene kháng thuốc — chạy trên nền tảng Omicslab. Khóa học đi từ dữ liệu FASTQ thô đến kết quả đó, từng bước một."
level: "Cơ bản"
duration: "Khoảng 3 giờ"
order: 2
tag: "Kết quả"
outcomes:
  - "Đọc và đánh giá sơ bộ một tệp FASTQ: số read, độ dài, chất lượng base."
  - "Phân biệt dữ liệu WGS từ khuẩn lạc phân lập với dữ liệu metagenomics, và chọn cách phân tích phù hợp."
  - "Chuẩn bị samplesheet đúng định dạng cho pipeline lắp ráp trên nền tảng."
  - "Chạy nf-core/bacass trên Omicslab, theo dõi log và chi phí, rồi đọc kết quả."
  - "Đánh giá chất lượng bộ lắp ráp bằng các chỉ số như N50 và độ phủ."
  - "Chú giải genome và tìm các gene liên quan đến kháng thuốc."
tools:
  - "nf-core/bacass"
  - "FastQC"
  - "fastp"
  - "QUAST"
  - "Bakta / Prokka"
  - "AMRFinderPlus"
---

Khóa học này đưa người mới đi qua một phân tích vi khuẩn hoàn chỉnh trên nền tảng Omicslab: từ một tệp FASTQ thô đến một bộ genome đã lắp ráp, kiểm định và chú giải. Mỗi bài giới thiệu một khái niệm ngắn, rồi thực hiện bước tương ứng trên nền tảng.
