---
slug: how-an-algorithm-works
title: "Một thuật toán hoạt động như thế nào: ví dụ BLAST"
description: "BLAST tìm một chuỗi giống với chuỗi bạn có trong một cơ sở dữ liệu lớn. Bài này đi qua bốn bước của nó bằng ý tưởng và đoạn mã giả, không cần biết lập trình."
order: 2
module: "Dữ liệu và cách máy tính xử lý"
duration: "30 phút"
related:
  - remote-files-htslib-bcftools-samtools
---

Một câu hỏi rất thường gặp: "chuỗi này giống gì trong cơ sở dữ liệu?" Công cụ trả lời câu hỏi đó là **BLAST**. Hiểu BLAST là một cách tốt để thấy máy tính nghĩ gì, vì nhiều công cụ khác cũng dùng lại cùng những ý tưởng.

## Câu hỏi đặt ra

Bạn có một chuỗi truy vấn (gọi là `Q`) và một cơ sở dữ liệu gồm rất nhiều chuỗi (`D`). Bạn muốn biết trong `D` có chuỗi nào giống `Q` không, giống ở đoạn nào và giống đến mức nào.

## Cách "đúng nhưng chậm"

Cách đơn giản nhất là so mọi cách ghép `Q` với từng chuỗi: chèn, xoá, thay ký tự ở mọi vị trí. Cách này cho kết quả đầy đủ, nhưng số cách ghép tăng rất nhanh theo độ dài chuỗi. Với một cơ sở dữ liệu lớn, nó chậm đến mức không dùng được.

## Cách BLAST làm: bốn bước

BLAST nhanh hơn nhờ chỉ xem xét những chỗ *có khả năng* giống nhau, thay vì mọi khả năng:

1. **Tạo hạt giống (seed).** Cắt `Q` thành những từ ngắn. Tìm những từ xuất hiện ở cả `Q` và chuỗi trong `D`.
2. **Mở rộng (extend).** Từ mỗi hạt giống, nối dài đoạn khớp sang hai bên.
3. **Chấm điểm (score).** Cho điểm đoạn khớp: ký tự trùng thì cộng, khác hoặc có khoảng trống thì trừ.
4. **Đánh giá ý nghĩa.** Không phải điểm cao nào cũng quan trọng. BLAST tính **E-value** — số đoạn khớp có điểm như vậy mà ta *kỳ vọng thấy ngẫu nhiên* trong một cơ sở dữ liệu lớn như thế. E-value nhỏ nghĩa là khó có thể do ngẫu nhiên, tức là đáng chú ý.

```text
đầu vào:  chuỗi truy vấn Q, cơ sở dữ liệu D
đầu ra:   các đoạn khớp, xếp theo E-value

với mỗi chuỗi S trong D:
    tìm các từ ngắn có trong cả Q và S            # 1. hạt giống
    với mỗi từ tìm được:
        nối dài đoạn khớp sang hai bên             # 2. mở rộng
        tính điểm đoạn khớp                        # 3. chấm điểm
lọc các đoạn khớp theo E-value                     # 4. ý nghĩa
trả về danh sách đã xếp hạng
```

## Điều cần nhớ

BLAST không thử mọi khả năng — đó là một **heuristic**: nó nhanh, nhưng có thể bỏ sót những chỗ giống nhau yếu mà cách chậm sẽ tìm thấy. Đây là một đánh đổi có chủ đích giữa tốc độ và độ đầy đủ.

![Hai bước hạt giống và mở rộng của BLAST](./imgs/blast-seed-extend.svg "Hình 1. Tìm một từ ngắn khớp (hạt giống), rồi nối dài đoạn khớp sang hai bên.")

:::note
Phần lớn công cụ tin sinh học đều là một thuật toán kèm giả định và một đánh đổi. Biết đánh đổi đó là biết khi nào nên tin kết quả.
:::

## Kết thúc bài

Bạn đã thấy máy tính so sánh chuỗi bằng hạt giống, mở rộng, chấm điểm và E-value. Các bài sau đặt một thuật toán như vậy vào trong cả một phân tích nhiều bước.
