---
slug: finding-the-next-step
title: "Khi pipeline có sẵn không đủ: tự tìm một bước"
description: "Cách biến một câu hỏi chưa ai làm thành một bước phân tích: gọi tên bước, tìm công cụ có sẵn, thử trên dữ liệu nhỏ, đóng gói, rồi kiểm chứng."
order: 7
module: "Công cụ, tái lập và cách tự học"
duration: "25 phút"
related:
  - customize-nf-core-modules-gianglabs
  - test-type-in-bioinformatics
  - bioinformatics-containers-build-efficient-docker
---

Sẽ có lúc câu hỏi của bạn cần một bước mà không pipeline đóng gói nào có. Đây là lúc kỹ năng quan trọng nhất là *biết tìm ở đâu*, chứ không phải nhớ sẵn câu trả lời.

## Năm bước để thêm một bước phân tích

1. **Gọi tên bước bằng đầu vào và đầu ra.** Ví dụ: "nhận một tệp FASTA contig, trả về danh sách gene". Khi mô tả được như vậy, bạn đã có thể đi tìm.
2. **Tìm công cụ có sẵn.** Trước khi tự viết, hãy tìm trong thư viện module của nf-core, trong bioconda, và trong tài liệu hoặc bài báo của công cụ. Ưu tiên công cụ còn được bảo trì.
3. **Thử trên dữ liệu nhỏ đã biết.** Chạy công cụ trên một mẫu nhỏ mà bạn biết kết quả mong đợi. Nếu đầu ra khớp, bạn hiểu công cụ đúng; nếu không, đó là dấu hiệu cần đọc kỹ hơn.
4. **Đóng gói.** Nếu bước này sẽ dùng lại, hãy bọc nó trong một container và ghim phiên bản, để lần sau chạy giống hệt.
5. **Ghép vào và kiểm chứng.** Nối bước mới vào phân tích, và kiểm tra rằng kết quả tổng thể vẫn đúng — bằng một phép so sánh hoặc một kiểm thử nhỏ.

![Từ câu hỏi đến một bước đã được kiểm chứng](./imgs/next-step.svg "Hình 1. Một bước mới được thêm vào theo năm bước, luôn kết thúc bằng kiểm chứng.")

## Cách tự học hiệu quả

Ba thói quen giúp học nhanh mà không phải ghi nhớ:

- **Đọc tài liệu của công cụ, đúng phiên bản.** Tham số và hành vi thay đổi theo phiên bản.
- **Đọc phần Methods của bài báo công cụ.** Ở đó nói rõ giả định và đánh đổi — những thứ tài liệu ngắn gọn thường bỏ qua.
- **Thay đổi một thứ mỗi lần.** Khi kết quả lạ, sửa một tham số rồi chạy lại, để biết cái gì gây ra khác biệt.

:::tip
Mục tiêu không phải nhớ mọi công cụ, mà là biết cách tìm, cách thử và cách kiểm chứng. Kỹ năng này giữ nguyên giá trị khi công cụ thay đổi.
:::

## Kết thúc khóa học

Bạn đã có bức tranh nền: dữ liệu sinh học là gì, một thuật toán như BLAST nghĩ ra sao, một phân tích gồm những bước nào, ai làm gì, vì sao kết quả cần tái lập, và cách tự tìm bước tiếp theo. Khóa tiếp theo — lắp ráp hệ gen vi khuẩn — sẽ áp dụng những ý tưởng này vào một quy trình cụ thể.
