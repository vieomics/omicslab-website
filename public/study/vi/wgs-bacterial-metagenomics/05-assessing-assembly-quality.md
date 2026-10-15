---
slug: assessing-assembly-quality
title: "Đánh giá chất lượng bộ lắp ráp"
description: "Đọc các chỉ số N50, số contig, độ phủ và độ hoàn thiện gene để biết bộ lắp ráp đã đủ tốt cho phân tích tiếp theo hay chưa."
order: 5
module: "Lắp ráp hệ gen"
duration: "30 phút"
related:
  - bacterial-genome-assembly-without-coding
---

Một bộ lắp ráp có thể trông "chạy xong" mà vẫn thiếu hoặc lẫn vật liệu di truyền. Vì vậy bước kiểm định là bắt buộc trước khi chú giải hoặc so sánh giữa các mẫu. Công cụ như QUAST tổng hợp các chỉ số dưới đây thành một báo cáo.

## Các chỉ số chính

- **Tổng độ dài bộ lắp ráp.** So với kích thước hệ gen kỳ vọng của loài. Nhỏ hơn nhiều thường là dấu hiệu mất một phần hệ gen.
- **Số contig.** Càng ít và càng dài càng tốt; một hệ gen vi khuẩn lý tưởng có thể nằm gọn trong vài contig, nhưng điều này phụ thuộc mạnh vào dữ liệu.
- **N50.** Độ dài contig mà một nửa tổng số base của bộ lắp ráp nằm trong các contig dài bằng hoặc hơn nó. N50 cao nghĩa là các đoạn nối được ghép dài hơn.
- **Độ phủ.** Mức bao phủ của read trên bộ lắp ráp; độ phủ không đồng đều có thể là dấu hiệu nhiễm plasmid hoặc nhiễm mẫu.
- **Độ hoàn thiện và nhiễm.** Công cụ đánh giá gene (ví dụ BUSCO, hoặc CheckM cho MAG) cho biết bộ lắp ráp chứa bao nhiêu gene được kỳ vọng và có lẫn vật liệu ngoài mong đợi hay không.

![Báo cáo QUAST với các chỉ số của bộ lắp ráp](./imgs/quast-report.svg "Hình 1. Báo cáo kiểm định tổng hợp số contig, N50 và tổng độ dài.")

## Không có một ngưỡng chung

Ngưỡng "đủ tốt" phụ thuộc câu hỏi nghiên cứu. Để định type vi khuẩn, vài contig đôi khi đã đủ. Để nghiên cứu cấu trúc plasmid, bộ lắp ráp phân mảnh nhiều có thể không dùng được. Vì vậy nên ghi lại các chỉ số cùng bộ dữ liệu và phiên bản công cụ, để kết quả có thể tái lập và so sánh.

:::warning
Đừng chỉ nhìn một chỉ số. N50 cao nhưng tổng độ dài thấp thường có nghĩa là một phần hệ gen đã bị mất, chứ không phải lắp ráp tốt hơn.
:::

## Kết thúc bài

Bạn đã biết đọc báo cáo kiểm định. Nếu các chỉ số phù hợp với mục tiêu, bước tiếp theo là chú giải để hiểu bộ gen nói gì.

> Tham khảo thêm cách đọc kết quả trong ví dụ thực tế: [Hướng dẫn xây dựng bộ genome vi khuẩn không cần lập trình](/blogs/bacterial-genome-assembly-without-coding).
