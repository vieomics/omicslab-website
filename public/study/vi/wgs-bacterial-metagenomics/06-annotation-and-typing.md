---
slug: annotation-and-typing
title: "Chú giải và định type genome vi khuẩn"
description: "Gán gene và chức năng cho bộ lắp ráp, rồi dùng đặc điểm ổn định như MLST và plasmid để nhận diện chủng."
order: 6
module: "Chú giải và diễn giải"
duration: "30 phút"
related:
  - bacterial-genome-assembly-without-coding
---

Một bộ lắp ráp chỉ là chuỗi ký tự cho đến khi ta gán cho nó các gene và chức năng. **Chú giải** (annotation) biến chuỗi đó thành mô tả có thể đọc được, còn **định type** (typing) giúp so sánh chủng này với chủng khác.

## Chú giải gene và chức năng

Công cụ chú giải như Prokka hoặc Bakta dò các khung đọc mở (ORF), dự đoán gene, rồi đối chiếu với cơ sở dữ liệu để gán chức năng. Kết quả thường gồm:

- **CDS** (coding sequence) — vùng mã hoá protein, cùng sản phẩm dự đoán.
- **RNA** — gene tRNA và rRNA.
- **Chú thích chức năng** — tên gene hoặc họ protein suy ra từ cơ sở dữ liệu.
- **Tệp đầu ra** ở các định dạng như GFF3 và GenBank để dùng ở bước sau.

![Bản đồ gene trên genome vi khuẩn sau chú giải](./imgs/annotation-map.svg "Hình 1. Sơ đồ các gene và vùng chức năng được gán trên genome.")

Chất lượng chú giải phụ thuộc vào cơ sở dữ liệu tham chiếu. Khi một gene không khớp, kết quả thường ghi là "hypothetical protein" — điều này phản ánh giới hạn kiến thức hiện có, không nhất thiết là gene không tồn tại.

## Định type

Định type dựa trên những locus ổn định hơn giữa các chủng:

- **MLST (multilocus sequence typing).** Giải trình tự một số gene "housekeeping" và tổ hợp thành một **sequence type**. Cách này cho phép so sánh chủng này với cơ sở dữ liệu MLST toàn cầu.
- **rgMLST hoặc định type theo toàn hệ gen.** Dùng nhiều locus hơn để có độ phân giải cao hơn MLST truyền thống.
- **Đặc điểm plasmid.** Xác định nhóm plasmid (ví dụ qua MOB-suite) quan trọng vì plasmid thường mang gene kháng thuốc và có thể truyền giữa các chủng.

:::tip
Định type chỉ có ý nghĩa khi so với một bộ tham chiếu. Hãy ghi lại cơ sở dữ liệu và phiên bản dùng để tra cứu, vì sequence type được gán có thể thay đổi khi cơ sở dữ liệu cập nhật.
:::

## Kết thúc bài

Bạn đã có genome với gene và chức năng, cùng thông tin định type. Bài cuối đi vào một ứng dụng cụ thể: tìm gene kháng thuốc và diễn giải kết quả.
