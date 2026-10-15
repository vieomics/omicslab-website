---
slug: roles-in-a-project
title: "Con người đứng sau kết quả"
description: "Một kết quả tin sinh học đi qua nhiều người: phòng thí nghiệm, nhà tin sinh học, kỹ sư phần mềm, kỹ sư hạ tầng, chuyên gia lâm sàng. Hiểu mỗi vai để biết hỏi ai và hỏi gì."
order: 6
module: "Đứng sau kết quả"
duration: "20 phút"
related:
  - how-to-version-control-git-bioinformatics-part-1
---

Không ai làm trọn một phân tích tin sinh học một mình. Kết quả đi qua nhiều người, và mỗi người bàn giao cho người kế tiếp một thứ khác nhau. Biết các vai trò giúp bạn biết tìm ai khi cần, và cần đưa cho họ thông tin gì.

## Các vai trò thường gặp

- **Phòng thí nghiệm (wet-lab).** Chuẩn bị mẫu, tạo thư viện và chạy giải trình tự. Chính họ quyết định dữ liệu có thể trả lời câu hỏi bạn đặt ra hay không.
- **Nhà tin sinh học.** Chọn phương pháp, chạy phân tích và diễn giải kết quả — người "đọc" dữ liệu thành kết luận.
- **Kỹ sư phần mềm.** Xây dựng và bảo trì công cụ, pipeline, viết kiểm thử để chúng chạy đúng.
- **Kỹ sư hạ tầng / DevOps.** Lo máy tính, lưu trữ, điều phối job, tự động hoá và bảo mật. Họ giữ cho phân tích chạy được ở quy mô lớn.
- **Kỹ sư dữ liệu / quản trị dữ liệu.** Tổ chức thông tin mẫu, mã định danh và cách lưu trữ, để dữ liệu tìm lại được và hiểu được.
- **Chuyên gia lâm sàng / chuyên môn.** Đặt câu hỏi và diễn giải kết quả trong bối cảnh thực tế của họ.
- **Trưởng nhóm / quản lý dự án.** Xác định phạm vi, nguồn lực và mốc thời gian.

## Bàn giao quan trọng hơn công cụ

Mỗi lần chuyển giữa hai vai trò là một *bàn giao*, và nó đi kèm một sản phẩm cụ thể:

- Phòng thí nghiệm → tin sinh: mẫu, samplesheet, thông tin mô tả mẫu.
- Tin sinh → người nhận kết quả: kết quả, mô tả phương pháp, phiên bản công cụ và dữ liệu tham chiếu.
- Kỹ sư phần mềm và hạ tầng → tin sinh: môi trường chạy, pipeline và hạ tầng sẵn sàng.
- Kết quả → chuyên gia lâm sàng: phần diễn giải và giới hạn của kết quả.

![Các vai trò và sản phẩm bàn giao giữa họ](./imgs/roles-handoff.svg "Hình 1. Một dự án tin sinh học là chuỗi bàn giao, mỗi mắt nối là một sản phẩm cụ thể.")

:::tip
Phần lớn lỗi trong dự án nằm ở chỗ bàn giao, không phải ở thuật toán: samplesheet sai cột, thiếu phiên bản hệ gen tham chiếu, mô tả mẫu thiếu. Khi kết quả bất thường, hãy kiểm tra các mắt nối trước.
:::

## Kết thúc bài

Bạn đã biết các vai trò và sản phẩm bàn giao. Bài tiếp theo xem vì sao một kết quả như vậy có thể tái lập được.
