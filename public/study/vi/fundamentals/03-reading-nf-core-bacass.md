---
slug: reading-nf-core-bacass
title: "Đọc pipeline đã tạo ra kết quả: nf-core/bacass"
description: "Kết quả ở khóa trước do một pipeline tạo ra. Bài này mở nó ra: nf-core/bacass gồm những bước nào, và vì sao hiểu từng bước quan trọng hơn chỉ bấm chạy."
order: 3
module: "Kết quả được tạo ra như thế nào"
duration: "25 phút"
related:
  - bacterial-genome-assembly-without-coding
  - how-to-run-nf-core-pipelines-on-omicslab
---

Nếu bạn đã đọc bài về BLAST, bạn đã thấy một công cụ chỉ làm *một* việc. `nf-core/bacass` ngược lại: nó ghép nhiều công cụ thành một pipeline hoàn chỉnh để lắp ráp hệ gen vi khuẩn.

## nf-core và Nextflow, nói ngắn

**nf-core** là một tập hợp pipeline cộng đồng, được đóng gói sẵn cho những phân tích phổ biến. Các pipeline này chạy bằng **Nextflow** — chương trình lo việc nối các bước, chia việc và chạy mỗi bước trong container. Bạn không cần viết pipeline; bạn *dùng* pipeline.

## bacass làm gì, theo ý tưởng

`nf-core/bacass` đi qua bốn nhóm việc, theo đúng khuôn mẫu ở bài trước:

1. **Làm sạch read** — cắt đoạn mồi và base chất lượng thấp.
2. **Lắp ráp** — ghép các read ngắn thành những đoạn dài (contig).
3. **Đánh giá** — kiểm tra bộ lắp ráp hoàn chỉnh đến đâu.
4. **Chú giải** — tìm gene và gán chức năng cho chúng.

Mỗi nhóm là một công cụ nhỏ; pipeline chỉ nối chúng lại và chạy mỗi công cụ trong một container riêng.

![Bốn nhóm bước trong nf-core/bacass](./imgs/bacass-steps.svg "Hình 1. bacass nối các bước làm sạch, lắp ráp, đánh giá và chú giải.")

## Vì sao hiểu bước quan trọng

Khi chỉ bấm chạy, bạn nhận một kết quả mà không biết nó từ đâu ra. Khi hiểu các bước, bạn:

- đoán được một lỗi phát sinh ở bước nào;
- biết mỗi tệp đầu ra nghĩa là gì;
- biết tham số nào ảnh hưởng đến kết quả cuối.

## Trên nền tảng

Trên nền tảng Omicslab, các pipeline như bacass đã được đóng gói sẵn. Bạn chủ yếu khai báo ba thứ: samplesheet (mẫu nào gồm tệp nào), tham số, và tài nguyên cho job. Phần "khó" — cài đặt công cụ và nối bước — đã được pipeline lo.

:::note
Không cần học thuộc tham số. Hãy mở trang tài liệu của đúng phiên bản bạn chạy; ở đó có danh sách tham số và mô tả đầu ra. Đây là cách "tra cứu" thay vì ghi nhớ.
:::

## Kết thúc bài

Bạn đã biết bacass gồm những bước gì và cách đọc tài liệu của nó. Bài tiếp theo mở một bước ra, để xem một thuật toán như BLAST nghĩ gì.
