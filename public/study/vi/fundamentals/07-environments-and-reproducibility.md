---
slug: environments-and-reproducibility
title: "Vì sao kết quả cần tái lập: Git, môi trường và container"
description: "Ba công cụ giải quyết ba vấn đề khác nhau: Git lưu lịch sử thay đổi, trình quản lý môi trường ghim phiên bản, container đóng gói cả hệ điều hành. Cùng nhau, chúng làm kết quả tái lập được."
order: 7
module: "Đứng sau kết quả"
duration: "25 phút"
related:
  - how-to-version-control-git-bioinformatics-part-1
  - pixi-is-new-conda-based-era
  - bioinformatics-containers-build-efficient-docker
---

Một kết quả chỉ đáng tin nếu người khác chạy lại và nhận được điều tương tự. Điều này không tự có: công cụ đổi phiên bản, môi trường khác nhau, một tham số bị sửa. Ba công cụ dưới đây giải quyết ba phần của vấn đề.

## Git: nhớ ai đã đổi gì

**Git** lưu lịch sử thay đổi của mã và cấu hình. Mỗi lần thay đổi được ghi lại kèm người thực hiện và lý do, nên có thể xem lại, so sánh và khôi phục. Với một phân tích, Git giữ lại *cách* phân tích được mô tả, không chỉ kết quả cuối.

## Trình quản lý môi trường: ghim phiên bản

Cùng một công cụ, phiên bản khác nhau có thể cho kết quả khác nhau. Trình quản lý môi trường như **Pixi** hoặc conda ghi lại chính xác phiên bản của từng công cụ, để lần sau cài đúng phiên bản đó — thay vì "phiên bản mới nhất" có thể đã đổi.

## Container: đóng gói cả hệ điều hành

Cài đặt còn phụ thuộc vào thư viện và hệ điều hành của máy. **Container** gói công cụ cùng mọi thứ nó cần vào một gói duy nhất, chạy giống nhau trên mọi máy. Đây là lý do các pipeline như bacass chạy mỗi bước trong một container.

![Ba lớp giúp kết quả tái lập: lịch sử, phiên bản, môi trường đóng gói](./imgs/reproducibility-layers.svg "Hình 1. Git, môi trường và container giải quyết ba phần khác nhau của tái lập.")

:::tip
Tái lập là một thói quen, không phải một công cụ: ghim phiên bản, ghi lại tham số, và chạy thử lại trên dữ liệu nhỏ trước khi tin một kết quả.
:::

## Kết thúc bài

Bạn đã biết vì sao Git, môi trường và container đi cùng nhau. Bài cuối nói về tình huống khó hơn: khi pipeline có sẵn không có bước bạn cần.
