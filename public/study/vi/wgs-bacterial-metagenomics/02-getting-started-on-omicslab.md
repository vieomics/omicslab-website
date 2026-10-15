---
slug: getting-started-on-omicslab
title: "Làm quen nền tảng Omicslab"
description: "Tạo tài khoản, tải dữ liệu lên, chọn pipeline và chạy một phân tích đầu tiên — những thao tác cần biết trước khi bắt đầu khóa học."
order: 2
module: "Nền tảng"
duration: "30 phút"
related:
  - how-to-run-nf-core-pipelines-on-omicslab
---

Trên nền tảng Omicslab, một phân tích thường gồm bốn bước lặp lại: tải dữ liệu lên, chọn pipeline, điền tham số rồi chạy, và đọc kết quả. Bài này điểm qua từng bước để bạn làm quen giao diện; phần hướng dẫn từng thao tác đầy đủ nằm ở bài blog đi kèm.

## Tài khoản, tổ chức và không gian làm việc

Sau khi đăng nhập, bạn thuộc một **tổ chức** (organization) và làm việc trong một hoặc nhiều **không gian làm việc** (workspace). Quyền truy cập theo vai trò: quản trị viên cấu hình hạ tầng và người dùng, còn người phân tích chạy các job được cấp quyền. Nếu đây là lần đầu bạn dùng nền tảng, hãy xác nhận với quản trị viên rằng tổ chức đã có lưu trữ và tài nguyên tính toán sẵn sàng.

## Tải dữ liệu lên

Dữ liệu FASTQ có thể tải lên trực tiếp, hoặc nền tảng có thể đọc từ vùng lưu trữ tương thích S3 mà tổ chức đã kết nối. Với dữ liệu lớn, cách thứ hai thường nhanh hơn và tốn ít thao tác thủ công hơn. Sau khi tải lên, tệp xuất hiện trong mục dữ liệu của workspace và có thể dùng làm đầu vào cho pipeline.

![Màn hình tải dữ liệu lên nền tảng](./imgs/platform-upload.svg "Hình 1. Tải tệp FASTQ lên không gian làm việc.")

## Chọn pipeline và chạy

Các pipeline cộng đồng như `nf-core/bacass` đã được đóng gói sẵn, nên bạn chủ yếu khai báo đầu vào và tài nguyên:

- **Samplesheet** — bảng mô tả mỗi mẫu gồm tệp `R1`, `R2` và tên mẫu.
- **Tham số** — các lựa chọn của pipeline (ví dụ công cụ lắp ráp, chú giải).
- **Tài nguyên** — số CPU, bộ nhớ và loại máy cho job; mức dùng càng cao thì chi phí càng lớn.

Sau khi bấm chạy, nền tảng hiển thị log trực tiếp và ước tính chi phí. Một job lắp ráp vi khuẩn cỡ nhỏ thường hoàn tất trong vài chục phút tuỳ độ phủ và tài nguyên.

:::tip
Hãy chạy thử trên một mẫu nhỏ trước. Một lần chạy nhỏ giúp phát hiện lỗi định dạng samplesheet sớm và tốn ít chi phí hơn một lần chạy toàn bộ.
:::

## Đọc kết quả

Khi job kết thúc, kết quả được lưu trong workspace dưới dạng các tệp và báo cáo tổng hợp (thường qua MultiQC). Kết quả vẫn còn đó để tải về hoặc dùng làm đầu vào cho bước sau.

## Kết thúc bài

Bạn đã biết vòng lặp bốn bước của một phân tích trên nền tảng. Bài tiếp theo chuẩn bị dữ liệu và samplesheet cho lắp ráp.

> Đọc hướng dẫn chi tiết từng bước: [Cách chạy pipeline nf-core trên nền tảng Omicslab](/blogs/how-to-run-nf-core-pipelines-on-omicslab).
