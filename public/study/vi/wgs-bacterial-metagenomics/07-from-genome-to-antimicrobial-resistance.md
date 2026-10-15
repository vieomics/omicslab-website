---
slug: from-genome-to-antimicrobial-resistance
title: "Từ genome đến gene kháng thuốc"
description: "Tìm gene kháng thuốc trong bộ lắp ráp, và vì sao sự hiện diện của một gene chưa đủ để kết luận — minh hoạ bằng một ví dụ blaNDM."
order: 7
module: "Chú giải và diễn giải"
duration: "35 phút"
related:
  - bla-ndm-on-omicslab
  - bacterial-genome-assembly-without-coding
---

Một trong những ứng dụng phổ biến của genome vi khuẩn là tìm gene kháng thuốc (AMR). Kết quả của bước này có thể ảnh hưởng đến quyết định lâm sàng, nên cách diễn giải cần thận trọng.

## Tìm gene kháng thuốc

Các công cụ như AMRFinderPlus hoặc ResFinder đối chiếu bộ lắp ráp với cơ sở dữ liệu gene kháng thuốc đã biết. Đầu ra thường là:

- Tên gene hoặc họ gene kháng thuốc được phát hiện.
- Nhóm thuốc liên quan.
- Vị trí trên contig hoặc plasmid.
- Mức độ trùng khớp với trình tự tham chiếu.

![Kết quả phát hiện gene kháng thuốc trên genome](./imgs/amr-detection.svg "Hình 1. Bảng gene kháng thuốc được phát hiện cùng vị trí và mức trùng khớp.")

## Vì sao "có gene" chưa đủ

Một số câu hỏi thường gặp khi diễn giải:

- **Gene có thực sự được biểu hiện không?** Phát hiện trên DNA không cho biết gene có được phiên mã hoặc dịch mã hay không; cần thêm dữ liệu biểu hiện hoặc thử nghiệm kiểu hình.
- **Gene nằm trên plasmid hay nhiễm sắc thể?** Vị trí ảnh hưởng đến khả năng lan truyền giữa các chủng.
- **Công cụ có bỏ sót biến thể gene không?** Một gene đã biết có thể tồn tại dưới biến thể chưa có trong cơ sở dữ liệu.
- **Mức trùng khớp bao nhiêu?** Trùng khớp một phần có thể là gene tương tự chứ chưa chắc cùng chức năng.

Trong một nghiên cứu chúng tôi tái dựng trên nền tảng, kết quả phát hiện gene `blaNDM` thoạt nhìn có vẻ mâu thuẫn giữa các bộ genome. Kiểm tra lại ở mức **read** — thay vì chỉ dựa vào bộ lắp ráp — cho thấy gene nằm ở một đoạn cấu trúc khó lắp ráp bằng đọc ngắn. Trường hợp này nhắc rằng bộ lắp ráp là một mô hình, không phải bản thân mẫu.

:::warning
Kết quả phát hiện AMR từ dữ liệu đọc ngắn nên được xem là bằng chứng ở mức dữ liệu, không phải kết luận lâm sàng. Nếu cần khẳng định kiểu hình, cần thêm thử nghiệm độc lập.
:::

## Kết thúc khóa học

Đến đây bạn đã đi hết một vòng phân tích: từ FASTQ, qua lắp ráp và kiểm định, đến chú giải và diễn giải. Ba thực hành nên giữ cho mọi phân tích sau:

- Ghi lại phiên bản công cụ và cơ sở dữ liệu cho mỗi bước.
- Chạy thử trên một mẫu nhỏ trước khi mở rộng.
- Kiểm tra lại các kết luận quan trọng ở mức read hoặc bằng dữ liệu độc lập.

> Đọc trường hợp đầy đủ: [Từ dữ liệu giải trình tự đến cơ chế kháng thuốc ở Klebsiella pneumoniae và Pseudomonas aeruginosa](/blogs/bla-ndm-on-omicslab).
