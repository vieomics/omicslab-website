---
title: "Metagenomics và lắp ráp hệ gen vi khuẩn từ dữ liệu WGS"
description: "Khóa nhập môn cho người mới: đi từ dữ liệu giải trình tự thô đến một bộ genome vi khuẩn đã lắp ráp, kiểm định và chú giải, thực hiện trên nền tảng Omicslab."
level: "Cơ bản"
duration: "Khoảng 3 giờ"
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
