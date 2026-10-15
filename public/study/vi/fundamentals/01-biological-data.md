---
slug: biological-data
title: "Dữ liệu sinh học là gì"
description: "DNA, RNA và protein là chuỗi; nhưng dữ liệu sinh học còn có chất lượng, độ phủ và thông tin mẫu — và mỗi loại dữ liệu được lưu bằng một định dạng riêng."
order: 1
module: "Dữ liệu và cách máy tính xử lý"
duration: "20 phút"
related:
  - unix-pipes-bioinformatics-streaming-data
---

Tin sinh học bắt đầu từ một ý tưởng đơn giản: nhiều thứ trong sinh học có thể viết thành chuỗi ký tự. Hiểu dữ liệu được viết bằng gì giúp bạn biết máy tính có thể làm gì với nó.

## Sinh học viết thành chuỗi

- **DNA** là chuỗi dài của bốn chữ cái A, T, G, C.
- **RNA** giống DNA nhưng dùng U thay cho T.
- **Protein** là chuỗi của 20 loại axit amin, mỗi loại ký hiệu bằng một chữ cái.

Trình tự này mang thông tin: bộ ba chữ cái trên DNA quy định một axit amin trong protein. Vì vậy nhiều câu hỏi sinh học — gene này là gì, hai sinh vật có họ hàng không, đột biến ở đâu — trở thành câu hỏi *so sánh chuỗi*.

## Dữ liệu không chỉ là chuỗi

Một chuỗi thô chưa đủ để phân tích. Dữ liệu sinh học thực tế còn mang theo:

- **Chất lượng.** Máy giải trình tự không đọc hoàn hảo; mỗi chữ cái đi kèm một điểm tin cậy.
- **Số lần đọc (độ phủ).** Cùng một vị trí được đọc lại nhiều lần; nhiều lần đọc hơn thường đáng tin hơn.
- **Thông tin mẫu.** Mẫu từ đâu, xử lý thế nào, ngày nào. Không có phần này, kết quả khó diễn giải và khó tái lập.

## Vì sao có nhiều định dạng tệp

Mỗi định dạng lưu dữ liệu ở một *giai đoạn* khác nhau của phân tích:

- **FASTA** — chỉ có chuỗi.
- **FASTQ** — chuỗi kèm điểm chất lượng, đúng như khi máy vừa đọc.
- **BAM/SAM/CRAM** — chuỗi đã được gắn vào hệ gen tham chiếu.
- **VCF** — các vị trí khác biệt so với hệ gen tham chiếu.
- **GFF/GTF** — chú giải: gene và vùng chức năng nằm ở đâu.

![Dữ liệu thay đổi định dạng qua từng giai đoạn của phân tích](./imgs/data-formats.svg "Hình 1. Cùng một dữ liệu mang hình thức khác nhau ở mỗi giai đoạn.")

:::tip
Trước khi phân tích, hãy hỏi hai câu: dữ liệu đang ở giai đoạn nào, và nó đi kèm thông tin mẫu gì. Hai câu trả lời đó thường quyết định dùng công cụ nào.
:::

## Kết thúc bài

Bạn đã biết dữ liệu sinh học được viết bằng chuỗi và mang theo chất lượng cùng thông tin mẫu. Bài tiếp theo xem máy tính so sánh chuỗi như thế nào, qua một ví dụ cụ thể.
