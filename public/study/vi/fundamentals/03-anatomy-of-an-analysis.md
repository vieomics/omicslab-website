---
slug: anatomy-of-an-analysis
title: "Một phân tích tin sinh học gồm những bước nào"
description: "Phân tích là các bước nối tiếp nhau: mỗi bước có đầu vào, một công cụ, và đầu ra. Hiểu khuôn mẫu này giúp đọc bất kỳ pipeline nào."
order: 3
module: "Cách một phân tích được ghép lại"
duration: "20 phút"
related:
  - migrate-bash-nextflow-enterprise-pipeline
---

Một phân tích tin sinh học, dù đơn giản hay phức tạp, thường cùng một khuôn mẫu: một chuỗi bước, đầu ra của bước này là đầu vào của bước kia. Nắm khuôn mẫu này, bạn đọc được mọi pipeline thay vì học thuộc từng cái.

## Mỗi bước có ba phần

Với mỗi bước, hãy hỏi ba câu:

- **Đầu vào là gì?** Ví dụ: các tệp FASTQ.
- **Công cụ làm gì?** Ví dụ: cắt bỏ đoạn mồi và base chất lượng thấp.
- **Đầu ra là gì?** Ví dụ: các tệp FASTQ đã làm sạch.

Ghép các bước lại theo thứ tự, ta được một *sơ đồ có hướng* (đầu ra của bước trước chảy vào bước sau). Một pipeline chỉ là sơ đồ đó được viết ra để máy chạy.

## Dữ liệu tham chiếu cũng là đầu vào

Nhiều bước không chỉ cần dữ liệu của bạn, mà còn cần **dữ liệu tham chiếu**: hệ gen tham chiếu, danh sách gene đã biết, cơ sở dữ liệu chú giải. Đây là đầu vào thầm lặng nhưng quan trọng — dùng phiên bản tham chiếu khác nhau có thể cho kết quả khác nhau. Vì vậy cần ghi lại chính xác phiên bản đã dùng.

## Kiểm tra chất lượng nằm ở các điểm bàn giao

Chất lượng nên được kiểm ở mỗi lần dữ liệu chuyển từ bước này sang bước kia: trước khi phân tích (read có tốt không), sau khi lắp ráp (kết quả có hoàn chỉnh không), và trước khi diễn giải. Kiểm tra sớm thường rẻ hơn sửa về sau.

![Các bước nối tiếp, mỗi bước có đầu vào và đầu ra](./imgs/analysis-steps.svg "Hình 1. Một phân tích là chuỗi bước, mỗi bước có đầu vào, công cụ và đầu ra.")

:::warning
Một pipeline "chạy xong không lỗi" chưa chắc cho kết quả đúng. Máy không sập không có nghĩa là đầu ra hợp lý — đó là lý do cần kiểm tra ở mỗi bước.
:::

## Kết thúc bài

Bạn đã có khuôn mẫu để đọc một phân tích: hỏi đầu vào, công cụ, đầu ra ở từng bước. Bài tiếp theo xem ai là người phụ trách mỗi bước.
