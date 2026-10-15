---
slug: samplesheet-and-input-qc
title: "Chuẩn bị samplesheet và kiểm tra chất lượng đầu vào"
description: "Định dạng samplesheet cho pipeline lắp ráp, và cách đọc các chỉ số chất lượng read trước khi chạy để tránh lãng phí tài nguyên."
order: 3
module: "Chuẩn bị dữ liệu"
duration: "30 phút"
related:
  - how-to-run-nf-core-pipelines-on-omicslab
---

Pipeline lắp ráp cần biết mỗi mẫu gồm những tệp nào. Thông tin đó nằm trong **samplesheet** — một bảng nhỏ nhưng quyết định lần chạy có bắt đầu đúng hay không. Kiểm tra chất lượng read trước khi chạy giúp phát hiện sớm các mẫu có vấn đề.

## Samplesheet cho nf-core/bacass

Với dữ liệu đọc ngắn, mỗi dòng trong samplesheet thường gồm tên mẫu và hai tệp `R1`, `R2`. Tên cột phụ thuộc phiên bản pipeline, nên cách an toàn là lấy mẫu (template) từ chính phiên bản bạn chạy và giữ nguyên tên cột.

Một số điểm cần kiểm tra:

- Mỗi tên mẫu là duy nhất và không chứa khoảng trắng.
- Cặp `R1`/`R2` trỏ đúng tệp, đúng thư mục lưu trữ.
- Đường dẫn dùng dấu phân cách nhất quán.

![Bảng samplesheet với cột mẫu và hai tệp R1, R2](./imgs/platform-samplesheet.svg "Hình 1. Ví dụ samplesheet cho dữ liệu đọc ngắn.")

## Đọc các chỉ số chất lượng

Công cụ kiểm tra chất lượng (FastQC) tạo báo cáo cho mỗi tệp FASTQ. Bốn chỉ số thường được xem nhất:

- **Chất lượng base theo vị trí.** Với dữ liệu Illumina, chất lượng thường giảm dần về cuối read; đây là hành vi đã biết, không nhất thiết là lỗi.
- **Nội dung adapter.** Adapter còn sót lại nên được cắt bỏ trước khi lắp ráp.
- **Thành phần GC.** GC lệch nhiều so với loài dự kiến có thể là dấu hiệu nhiễm mẫu.
- **Chuỗi lặp và overrepresented sequence.** Có thể chỉ ra nhiễm khuẩn hoặc độ phức tạp thấp.

Khi nhiều mẫu được chạy, MultiQC gộp các báo cáo thành một trang để so sánh giữa các mẫu.

![Báo cáo MultiQC tổng hợp cho nhiều mẫu](./imgs/platform-multiqc.svg "Hình 2. Báo cáo tổng hợp giúp so sánh chất lượng giữa các mẫu.")

## Cắt tỉa read

Bước cắt tỉa (trimming) bằng `fastp` loại bỏ adapter và base chất lượng thấp ở hai đầu read. Trong nhiều pipeline, bước này được tự động hoá; khi tự chạy, hãy giữ lại báo cáo trước và sau cắt tỉa để so sánh, vì nó cho biết bao nhiêu dữ liệu bị loại bỏ.

:::note
Cắt tỉa quá mạnh có thể làm giảm độ phủ và ảnh hưởng đến lắp ráp. Tham số mặc định của pipeline là một điểm khởi đầu hợp lý; chỉ thay đổi khi báo cáo chất lượng cho thấy cần thiết.
:::

## Kết thúc bài

Dữ liệu đã có samplesheet hợp lệ và được kiểm tra chất lượng. Bài tiếp theo chạy lắp ráp bằng `nf-core/bacass`.
