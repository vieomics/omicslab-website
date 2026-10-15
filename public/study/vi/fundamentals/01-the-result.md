---
slug: the-result
title: "Kết quả bạn vừa có"
description: "Điểm khởi đầu của khóa học: nhìn lại kết quả từ khóa lắp ráp — một bộ hệ gen đã chú giải cùng các gene kháng thuốc — rồi đặt câu hỏi điều gì đã tạo ra nó."
order: 1
module: "Bắt đầu từ kết quả"
duration: "15 phút"
related:
  - bacterial-genome-assembly-without-coding
---

Nếu bạn đã hoàn thành khóa lắp ráp, bạn đang có một kết quả trong tay. Khóa này không thêm kết quả mới, mà quay lại và trả lời một câu hỏi đơn giản: *chuyện gì đã thực sự xảy ra để tạo ra nó?* Ta bắt đầu từ kết quả, rồi đi ngược lại.

## Kết quả bạn đã có

Một lần chạy lắp ráp thường để lại vài thứ cụ thể:

- **Các contig** — những đoạn hệ gen đã lắp ráp, ở dạng tệp FASTA.
- **Báo cáo đánh giá** — số contig, N50, tổng độ dài, để biết bộ lắp ráp hoàn chỉnh đến đâu.
- **Kết quả chú giải** — gene được tìm thấy và chức năng dự đoán cho chúng.
- **Danh sách gene kháng thuốc** — nếu bạn chạy thêm bước tìm gene kháng thuốc.

![Các sản phẩm của một lần chạy lắp ráp và chú giải](./imgs/result-artifacts.svg "Hình 1. Kết quả của khóa trước: contig, báo cáo, chú giải và gene kháng thuốc.")

## Ba câu hỏi đi ngược

Từ kết quả đó, khóa học lần lượt hỏi ba câu:

1. **Nó được tạo ra như thế nào?** Kết quả không xuất hiện cùng lúc — nó đi qua một chuỗi bước.
2. **Mỗi bước làm gì?** Mỗi bước là một công cụ, và công cụ là một thuật toán với giả định riêng.
3. **Vì sao nó đáng tin và lặp lại được?** Điều đó phụ thuộc vào dữ liệu đầu vào, vào con người, và vào cách ghi lại phiên bản.

## Khóa học sẽ trả lời thế nào

Ba câu hỏi trên tương ứng với ba phần của khóa:

- **Kết quả được tạo ra như thế nào** — một phân tích là chuỗi bước; đọc pipeline đã tạo ra kết quả; và mở một bước ra để xem một thuật toán như BLAST nghĩ gì.
- **Đứng sau kết quả** — dữ liệu, con người, và vì sao kết quả có thể tái lập.
- **Và khi cần một bước mới** — cách tự tìm và kiểm chứng một bước mà chưa pipeline nào có sẵn.

:::note
Bạn chưa chạy khóa lắp ráp cũng không sao. Mỗi ý tưởng ở đây đứng độc lập; kết quả chỉ là điểm tựa để bắt đầu. Nếu muốn, bạn có thể đọc khóa lắp ráp trước rồi quay lại.
:::

## Kết thúc bài

Bạn đã nhìn lại kết quả và ba câu hỏi dẫn đường. Bài tiếp theo mở câu hỏi đầu tiên: kết quả được tạo ra qua những bước nào.
