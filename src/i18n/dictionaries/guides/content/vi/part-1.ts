import type { GuideChapter } from "../../types";

export const chaptersPart1: GuideChapter[] = [
  {
    slug: "bat-dau",
    number: "01",
    kicker: "Chương 01 · Bắt đầu",
    title: "Tài khoản, tổ chức và thông tin ban đầu",
    navTitle: "Bắt đầu",
    description:
      "Đăng nhập, chọn ngôn ngữ, tạo tổ chức và kiểm tra thông tin dùng cho hoá đơn và hỗ trợ.",
    summary:
      "Từ lần đăng nhập đầu tiên đến một tổ chức sẵn sàng nhận workspace: tài khoản, ngôn ngữ, thông tin tổ chức và vai trò.",
    sections: [
      {
        id: "dang-nhap",
        title: "Đăng nhập",
        blocks: [
          {
            type: "p",
            text: "Nền tảng web nằm tại [platform.omicslab.io](https://platform.omicslab.io). Có hai cách đăng nhập: Google OAuth2 hoặc email và mật khẩu. Với tài khoản Google, chọn **Continue with ...**; với email, điền email và mật khẩu rồi bấm **Đăng nhập**.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/01-dang-nhap-google.webp",
            alt: "Trang đăng nhập Omicslab với lựa chọn tài khoản Google và biểu mẫu email, mật khẩu",
            caption:
              "Đăng nhập bằng Google OAuth2 hoặc email và mật khẩu. Ảnh chụp giao diện tiếng Việt.",
          },
          {
            type: "p",
            text: "Sau khi đăng nhập, nền tảng mở danh sách tổ chức mà tài khoản là thành viên. Tài khoản mới chưa có tổ chức sẽ thấy danh sách trống và nút tạo tổ chức.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/02-danh-sach-to-chuc.webp",
            alt: "Danh sách tổ chức sau khi đăng nhập",
            caption:
              "Danh sách tổ chức là điểm vào mặc định sau khi đăng nhập.",
          },
          {
            type: "p",
            text: "Nếu chưa có tài khoản, dùng liên kết **Đăng ký** dưới biểu mẫu đăng nhập. Tài liệu kỹ thuật: [Xác thực](https://docs.omicslab.io/authentication).",
          },
        ],
      },
      {
        id: "ngon-ngu",
        title: "Chọn ngôn ngữ giao diện",
        blocks: [
          {
            type: "p",
            text: "Bộ chuyển ngôn ngữ nằm ở góc trên bên phải, cạnh biểu tượng giao diện. Giao diện nền tảng và tài liệu kỹ thuật được chuyển ngôn ngữ độc lập; đổi ngôn ngữ ở đây không thay đổi ngôn ngữ của trang omicslab.io.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/03-doi-ngon-ngu.webp",
            alt: "Bộ chuyển ngôn ngữ ở góc trên bên phải giao diện nền tảng",
            caption:
              "Chọn ngôn ngữ giao diện ở góc trên bên phải. Lựa chọn này chỉ áp dụng cho nền tảng.",
          },
          {
            type: "note",
            title: "Về ảnh chụp trong tài liệu",
            text: "Ảnh trong hướng dẫn này được chụp trên giao diện tiếng Việt. Khi đọc bản tiếng Anh, tên trường và nút có thể xuất hiện bằng tiếng Anh nhưng giữ cùng vị trí.",
          },
        ],
      },
      {
        id: "tao-to-chuc",
        title: "Tạo tổ chức",
        blocks: [
          {
            type: "p",
            text: "Tổ chức là vùng chứa cấp cao nhất: thành viên, thông tin xác thực dùng chung, workspace và hoá đơn đều thuộc một tổ chức. Chọn **Tổ chức → Thêm**, sau đó điền tên, mô tả, mã số thuế, địa chỉ, email nhận hoá đơn và số điện thoại.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/04-tao-to-chuc.webp",
            alt: "Biểu mẫu tạo tổ chức với tên, mô tả, mã số thuế, địa chỉ, email, số điện thoại, loại dữ liệu và khu vực",
            caption:
              "Biểu mẫu tạo tổ chức. Thông tin pháp lý và email nhận hoá đơn được dùng cho hoá đơn và hỗ trợ.",
          },
          {
            type: "p",
            text: "Hai trường cuối cần cân nhắc trước khi tạo: **Loại tổ chức** và **Khu vực**. Loại tổ chức khai báo nhóm dữ liệu dự kiến xử lý; khu vực quyết định nơi lưu dữ liệu. Trong ví dụ ở đây, tổ chức được khai báo dùng dữ liệu công khai hoặc mở và khu vực toàn cầu (không giới hạn).",
          },
          {
            type: "note",
            title: "Phạm vi dữ liệu của nền tảng công khai",
            text: "Nền tảng công khai (Marketplace) được thiết kế cho dữ liệu không phải của người, dữ liệu mô phỏng hoặc benchmark, và dữ liệu đã công bố hợp pháp hoặc đã ẩn danh đúng cách. Dữ liệu hệ gen và sức khoẻ của cá nhân tại Việt Nam không được tải lên nền tảng công khai; nhóm dữ liệu này được xử lý qua một triển khai tự vận hành (self-hosted) theo hợp đồng riêng. Xem [Chính sách bảo mật](/privacy) và [Chính sách cung cấp dịch vụ](/policies/service-provision).",
          },
          {
            type: "p",
            text: "Sau khi bấm **Tạo**, tổ chức xuất hiện trong danh sách và tài khoản tạo là admin của tổ chức đó.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/05-to-chuc-da-tao.webp",
            alt: "Danh sách tổ chức có một tổ chức mới vừa tạo",
            caption:
              "Tổ chức mới xuất hiện trong danh sách; tài khoản tạo trở thành admin.",
          },
        ],
      },
      {
        id: "mo-to-chuc",
        title: "Mở, sửa và lưu trữ tổ chức",
        blocks: [
          {
            type: "p",
            text: "Menu ba chấm ở cuối mỗi dòng cho phép **chỉnh sửa** hoặc **lưu trữ** tổ chức. Nhấp đúp vào dòng để mở tổ chức và xem các tab bên trong.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/06-thao-tac-to-chuc.webp",
            alt: "Menu ba chấm trên dòng tổ chức với lựa chọn chỉnh sửa và xoá",
            caption: "Thao tác trên một dòng tổ chức: chỉnh sửa hoặc lưu trữ.",
          },
          {
            type: "figure",
            src: "/guides/bat-dau/07-mo-cai-dat-to-chuc.webp",
            alt: "Trang cài đặt tổ chức sau khi nhấp đúp vào dòng tổ chức",
            caption:
              "Nhấp đúp để mở tổ chức và truy cập các tab thành viên, tính toán, lưu trữ, tác vụ, ngân sách và thanh toán.",
          },
          {
            type: "p",
            text: "Lưu trữ là thao tác không thể hoàn tác. Trước khi lưu trữ, kiểm tra workspace, dữ liệu và hoá đơn còn gắn với tổ chức.",
          },
          {
            type: "p",
            text: "Các tab trong tổ chức gồm **Thành viên**, **Tính toán**, **Lưu trữ**, **Quản lý phiên bản**, **Tác vụ**, **Ngân sách** và **Thanh toán**. Quyền truy cập từng tab phụ thuộc vai trò:",
          },
          {
            type: "table",
            head: ["Vai trò", "Có thể làm gì"],
            rows: [
              [
                "**Admin**",
                "Quản lý cài đặt, mời hoặc xoá thành viên, xoá tổ chức",
              ],
              [
                "**Contributor**",
                "Tạo workspace, dùng thông tin xác thực dùng chung",
              ],
              ["**Viewer**", "Xem thông tin tổ chức và danh sách thành viên"],
            ],
          },
          {
            type: "p",
            text: "Ma trận phân quyền đầy đủ nằm trong [RBAC](https://docs.omicslab.io/permission).",
          },
        ],
      },
      {
        id: "dieu-kien",
        title: "Điều kiện để tiếp tục",
        blocks: [
          {
            type: "p",
            text: "Tổ chức chưa có thuê bao hiện hành không tạo được workspace hoặc chạy job. Sau khi tạo tổ chức, bước tiếp theo thường là đăng ký gói trong tab **Thanh toán**, nội dung của chương 2.",
          },
          {
            type: "note",
            title: "Giới hạn theo gói",
            text: "Số workspace, thành viên và job chạy đồng thời bị giới hạn theo gói. Kiểm tra bảng gói trước khi mời thành viên hoặc tạo workspace.",
          },
        ],
      },
    ],
  },
  {
    slug: "thanh-toan",
    number: "02",
    kicker: "Chương 02 · Thanh toán",
    title: "Gói thuê bao, thanh toán và hoá đơn",
    navTitle: "Thanh toán",
    description:
      "Đăng ký gói, xác nhận thông tin, trả bằng QR, nạp số dư và tra cứu hoá đơn điện tử.",
    summary:
      "Các giao dịch của tổ chức: chọn gói, kiểm tra người mua, thanh toán QR, nạp số dư và lấy hoá đơn.",
    sections: [
      {
        id: "chon-goi",
        title: "Chọn gói thuê bao",
        blocks: [
          {
            type: "p",
            text: "Mở **Tổ chức → Thanh toán → Thuê bao**. Chỉ admin tổ chức đăng ký, nạp tiền, huỷ gói và xem hoá đơn; thành viên khác chỉ thấy trạng thái gói. Bảng dưới tóm tắt giới hạn của bốn gói tại thời điểm biên soạn:",
          },
          {
            type: "table",
            head: [
              "Gói",
              "Workspace",
              "Thành viên tổ chức",
              "Thành viên mỗi workspace",
              "Studio đồng thời",
              "Phân tích đồng thời",
              "LIMS",
            ],
            rows: [
              ["**Individual**", "1", "1", "1", "1", "1", "—"],
              ["**Lite**", "2", "1", "3", "5", "5", "✓"],
              ["**Pro**", "20", "10", "30", "50", "50", "✓"],
              [
                "**Business**",
                "Theo hợp đồng",
                "Theo hợp đồng",
                "Theo hợp đồng",
                "Theo hợp đồng",
                "Theo hợp đồng",
                "✓",
              ],
            ],
          },
          {
            type: "p",
            text: "**Business** là gói theo hợp đồng, không tự đăng ký; dùng **Liên hệ kinh doanh**. Giá hiển thị trên thẻ gói tại thời điểm thanh toán, không cố định trong tài liệu này.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/01-chon-goi.webp",
            alt: "Tab thanh toán và thuê bao với bốn thẻ gói Individual, Lite, Pro và Business",
            caption:
              "Chọn gói trong tab Thanh toán. Giới hạn và giá có thể thay đổi theo thời điểm.",
          },
        ],
      },
      {
        id: "xac-nhan",
        title: "Xác nhận điều khoản và thời hạn",
        blocks: [
          {
            type: "p",
            text: "Hộp thoại đăng ký cho chọn số tháng trả trước, áp mã khuyến mãi và xác nhận đã đọc điều khoản. Gói hiện tại tiếp tục hoạt động cho đến khi hoá đơn mới được thanh toán; bỏ dở thanh toán không làm mất gói đang dùng.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/02-xac-nhan-dieu-khoan.webp",
            alt: "Hộp thoại đăng ký gói Individual với số tháng, mã khuyến mãi, thông tin thanh toán và ô đồng ý điều khoản",
            caption:
              "Hộp thoại đăng ký: số tháng trả trước, mã khuyến mãi và xác nhận điều khoản.",
          },
          {
            type: "p",
            text: "Giá thuê bao được giữ đến ngày điều chỉnh giá do quản trị nền tảng đặt. Kỳ trả cuối có thể kết thúc muộn hơn tối đa một tháng; hộp thoại chỉ cho chọn số tháng nằm trong giới hạn đó.",
          },
          {
            type: "note",
            title: "Khung giờ thanh toán",
            text: "Nền tảng chỉ nhận thanh toán mới trong khung **00:00–22:00** hằng ngày (giờ Việt Nam). Sau 22:00, nút đăng ký, nạp tiền và thanh toán hoá đơn tạm đóng; hoá đơn đã tạo và số dư đã nạp không bị ảnh hưởng. Khung 22:00–24:00 dành cho đối soát và phát hành hoá đơn điện tử.",
          },
        ],
      },
      {
        id: "thong-tin",
        title: "Kiểm tra thông tin người mua",
        blocks: [
          {
            type: "p",
            text: "Trước khi trả tiền, kiểm tra tên, mã số thuế, địa chỉ và email trên hoá đơn. Với giao dịch cá nhân, nền tảng có thể tự điền thông tin từ tài khoản Google; nếu thiếu hoặc sai, mở thiết lập tài khoản ở góc trái bên dưới, chỉnh sửa hồ sơ và lưu lại.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/03-thong-tin-ca-nhan.webp",
            alt: "Màn hình thiết lập tài khoản và thông tin cá nhân",
            caption:
              "Mở thiết lập tài khoản khi thông tin cá nhân còn thiếu hoặc chưa chính xác.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/04-chinh-sua-thong-tin.webp",
            alt: "Biểu mẫu chỉnh sửa thông tin cá nhân với nút lưu",
            caption: "Chỉnh sửa hồ sơ và lưu lại trước khi tạo hoá đơn.",
          },
          {
            type: "p",
            text: "Với giao dịch của công ty, chuyển sang tab tổ chức và kiểm tra thông tin tổ chức. Nếu phát hiện sai, quay lại danh sách tổ chức để chỉnh sửa trước khi tạo hoá đơn.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/05-kiem-tra-to-chuc.webp",
            alt: "Màn hình kiểm tra thông tin tổ chức dùng cho hoá đơn",
            caption:
              "Kiểm tra thông tin tổ chức trước khi thanh toán cho công ty.",
          },
        ],
      },
      {
        id: "thanh-toan",
        title: "Thanh toán bằng QR",
        blocks: [
          {
            type: "p",
            text: "Bấm **Thanh toán** để tạo hoá đơn chờ. Trang hoá đơn hiển thị mã QR SePay, số tiền, nội dung chuyển khoản và thông tin ngân hàng. Quét mã bằng ứng dụng ngân hàng hoặc chuyển khoản đúng nội dung.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/06-thanh-toan-qr.webp",
            alt: "Hoá đơn chờ thanh toán với mã QR SePay, số tiền và thông tin chuyển khoản ngân hàng",
            caption:
              "Hoá đơn chờ có mã QR và thông tin chuyển khoản. Nội dung chuyển khoản cần được giữ nguyên.",
          },
          {
            type: "p",
            text: "Hoá đơn điện tử được phát hành tự động khi hệ thống ghi nhận thanh toán. Thời gian ghi nhận phụ thuộc ngân hàng và kênh thanh toán, nên không nên tạo hoá đơn trùng trong lúc chờ.",
          },
        ],
      },
      {
        id: "hoa-don",
        title: "Xem và tra cứu hoá đơn",
        blocks: [
          {
            type: "p",
            text: "Sau khi thanh toán, hoá đơn đã trả nằm trong **Thanh toán → Hoá đơn**. Bấm biểu tượng mắt để xem chi tiết, hoặc mở hoá đơn để tải PDF hoặc XML nếu có.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/07-hoa-don.webp",
            alt: "Danh sách hoá đơn của tổ chức với trạng thái và thao tác xem chi tiết",
            caption: "Danh sách hoá đơn của tổ chức sau khi thanh toán.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/08-chi-tiet-hoa-don.webp",
            alt: "Chi tiết một hoá đơn với người mua, mã số thuế, địa chỉ và trạng thái phát hành",
            caption:
              "Chi tiết hoá đơn: người mua, mã số thuế, địa chỉ và trạng thái phát hành hoá đơn điện tử.",
          },
          {
            type: "p",
            text: "Hoá đơn điện tử cũng được gửi qua email đã đăng ký. Có thể tra cứu lại trên cổng SePay bằng mã tra cứu trong email hoặc trên hoá đơn.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/09-tra-cuu-sepay.webp",
            alt: "Cổng tra cứu hoá đơn điện tử SePay với mã tra cứu và bản xem trước hoá đơn",
            caption:
              "Tra cứu hoá đơn điện tử trên SePay bằng mã trong email hoặc trên hoá đơn.",
          },
        ],
      },
      {
        id: "nap-tien",
        title: "Nạp số dư",
        blocks: [
          {
            type: "p",
            text: "Số dư trả cho lưu trữ Marketplace và tính toán của job. Mở **Thanh toán → Nạp tiền**, chọn số tiền (tối thiểu 10.000₫), áp mã nếu có, rồi trả bằng QR. Lịch sử nạp ghi lại từng khoản cộng.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/10-nap-tien.webp",
            alt: "Biểu mẫu nạp tiền với số tiền và mã khuyến mãi",
            caption:
              "Nạp số dư cho lưu trữ và tính toán. Số tiền tối thiểu là 10.000₫ tại thời điểm biên soạn.",
          },
          {
            type: "figure",
            src: "/guides/thanh-toan/11-xac-nhan-nap-tien.webp",
            alt: "Trang xác nhận nạp tiền với số tiền, VAT và thông tin hoá đơn",
            caption:
              "Kiểm tra số tiền, dòng VAT và thông tin hoá đơn trên trang xác nhận trước khi thanh toán.",
          },
          {
            type: "note",
            title: "Số dư gắn với thuê bao",
            text: "Số dư chỉ dùng được khi tổ chức còn thuê bao hiện hành. Khi thuê bao hết hạn hoặc bị huỷ mà không có lần gia hạn nào đang chờ, số dư còn lại được đưa về 0. Gia hạn trước khi thuê bao hết hạn nếu còn số dư.",
          },
          {
            type: "p",
            text: "Thuế VAT và thông tin hoá đơn được hiển thị trên trang xác nhận của từng giao dịch. Giá trị có thể khác nhau tuỳ loại giao dịch và thông tin người mua đã đăng ký; kiểm tra lại trước khi xác nhận.",
          },
        ],
      },
      {
        id: "huy-goi",
        title: "Huỷ hoặc đổi gói",
        blocks: [
          {
            type: "p",
            text: "Huỷ thuê bao kết thúc gói ngay lập tức và chuyển tổ chức về trạng thái không có gói. Các checkout đang chờ cũng hết hiệu lực. Giới hạn workspace và job vẫn được áp dụng cho đến khi đăng ký lại.",
          },
          {
            type: "p",
            text: "Khi nâng cấp hoặc đổi gói, gói hiện tại vẫn hoạt động đến khi hoá đơn mới được thanh toán. Xem thêm [Thanh toán](https://docs.omicslab.io/organizations/billing).",
          },
        ],
      },
    ],
  },
  {
    slug: "marketplace",
    number: "03",
    kicker: "Chương 03 · Marketplace",
    title: "Lưu trữ, tính toán và công cụ dùng chung",
    navTitle: "Marketplace",
    description:
      "Mua hạn mức lưu trữ, kiểm tra tài nguyên tính toán và chọn công cụ phân tích hoặc Studio có sẵn.",
    summary:
      "Cách đọc Marketplace: hạn mức lưu trữ, cấu hình tính toán, pipeline nf-core, Studio và thông tin xác thực Git.",
    sections: [
      {
        id: "mua-luu-tru",
        title: "Mua hạn mức lưu trữ",
        blocks: [
          {
            type: "p",
            text: "Mở **Tổ chức → Lưu trữ → Thêm** (hoặc **Mua hạn mức**). Lưu trữ trả trước được tính theo tỷ lệ đến ngày hết hạn thuê bao và không thể vượt quá một tháng sau ngày giữ giá. Chọn hạn mức phù hợp với dung lượng dự kiến.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/01-mua-luu-tru.webp",
            alt: "Tab lưu trữ của tổ chức với thông tin lưu trữ S3 và nút thêm hạn mức",
            caption:
              "Lưu trữ của tổ chức. Hạn mức trả trước gắn với thời hạn thuê bao.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/02-chon-han-muc.webp",
            alt: "Hộp thoại chọn mua hạn mức lưu trữ",
            caption: "Chọn mua hạn mức lưu trữ từ Marketplace.",
          },
          {
            type: "p",
            text: "Nên chọn thời hạn hạn mức khớp với thời hạn bản quyền phần mềm để tránh mua thừa hoặc hết chỗ giữa kỳ. Trong ví dụ, hạn mức 10 GB được mua cho tổ chức.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/03-thoi-han-han-muc.webp",
            alt: "Biểu mẫu chọn thời hạn hạn mức lưu trữ",
            caption:
              "Chọn thời hạn hạn mức phù hợp với thời hạn sử dụng phần mềm.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/04-han-muc-da-mua.webp",
            alt: "Danh sách lưu trữ hiển thị hạn mức 10 GB đã mua",
            caption: "Hạn mức đã mua hiển thị trong tab Lưu trữ của tổ chức.",
          },
          {
            type: "note",
            title: "Lưu trữ và vòng đời dữ liệu",
            text: "Khi chu kỳ trả trước kết thúc, quyền truy cập bị chặn và dữ liệu được giữ trong **7 ngày**. Hết 7 ngày, workspace được lưu trữ để thanh lý và tiến trình dọn dẹp hằng ngày xoá vĩnh viễn dữ liệu (chỉ giữ thư mục audit). Workspace hoặc tổ chức do khách tự xoá cũng có thể phục hồi trong cùng 7 ngày. Xem [Chính sách giá](/policies/pricing).",
          },
        ],
      },
      {
        id: "marketplace",
        title: "Marketplace dùng chung",
        blocks: [
          {
            type: "p",
            text: "**Marketplace** là danh mục toàn nền tảng: lưu trữ, tính toán, pipeline, ứng dụng Studio và thông tin xác thực quản lý phiên bản. Tổ chức có thể dùng cả mục riêng của tổ chức và mục dùng chung trong Marketplace.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/05-marketplace.webp",
            alt: "Trang Marketplace với danh mục lưu trữ dùng chung",
            caption:
              "Marketplace tập hợp các mục dùng chung toàn nền tảng. Tổ chức có thể dùng song song mục riêng và mục dùng chung.",
          },
        ],
      },
      {
        id: "tinh-toan",
        title: "Kiểm tra tài nguyên tính toán",
        blocks: [
          {
            type: "p",
            text: "Tab **Tính toán** liệt kê runner HPC/SLURM và thông tin xác thực máy ảo cloud. Trong ví dụ, cấu hình có sẵn của nền tảng dùng GreenNode theo mô hình trả theo mức dùng (PAYG). Kiểm tra nhà cung cấp, khu vực và thông tin xác thực trước khi chạy job.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/06-tinh-toan.webp",
            alt: "Tab tính toán của Marketplace với thông tin GreenNode và khu vực Việt Nam",
            caption:
              "Tài nguyên tính toán dùng chung: runner HPC/SLURM hoặc thông tin xác thực máy ảo cloud.",
          },
          {
            type: "p",
            text: "Nếu tổ chức dùng cụm HPC riêng, thêm runner và thông tin xác thực ở cấp tổ chức thay vì mua cấu hình của nền tảng.",
          },
        ],
      },
      {
        id: "cong-cu",
        title: "Công cụ phân tích",
        blocks: [
          {
            type: "p",
            text: "Tab **Phân tích** trong Marketplace liệt kê các pipeline được kiểm tra và tích hợp sẵn, phần lớn đến từ nf-core. Mỗi mục có tên, thẻ mô tả và ngày cập nhật; dùng ô tìm kiếm để lọc theo tên hoặc thẻ.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/07-cong-cu-phan-tich.webp",
            alt: "Danh sách công cụ phân tích nf-core trong Marketplace",
            caption:
              "Pipeline có sẵn trong Marketplace, ví dụ nf-core/bacass cho lắp ráp hệ gen vi khuẩn.",
          },
          {
            type: "p",
            text: "Danh mục thay đổi theo thời gian. Trước khi dùng một pipeline cho dữ liệu thật, nên kiểm tra phiên bản, tham số và giấy phép của công cụ gốc.",
          },
        ],
      },
      {
        id: "studio",
        title: "Studio có sẵn",
        blocks: [
          {
            type: "p",
            text: "Tab **Studio** liệt kê các ứng dụng tương tác nền tảng cung cấp, ví dụ Visual Studio Code Server, JupyterLab và RStudio Server. Ứng dụng chạy trên compute của workspace và được mở qua trình duyệt.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/08-studio.webp",
            alt: "Danh sách ứng dụng Studio có sẵn trong Marketplace",
            caption:
              "Các ứng dụng Studio nền tảng cung cấp sẵn: VS Code Server, JupyterLab và RStudio Server.",
          },
        ],
      },
      {
        id: "phien-ban",
        title: "Quản lý phiên bản và GitHub",
        blocks: [
          {
            type: "p",
            text: "Tab **Quản lý phiên bản** lưu thông tin xác thực Git dùng để truy cập kho công cụ. Token từ kho công khai có thể dùng trực tiếp; kho riêng cần thông tin xác thực do tổ chức cung cấp.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/09-quan-ly-phien-ban.webp",
            alt: "Tab quản lý phiên bản với thông tin xác thực GitHub",
            caption:
              "Thông tin xác thực Git dùng chung cho các công cụ trong Marketplace.",
          },
          {
            type: "note",
            title: "Phạm vi của giải pháp do Vieomics cung cấp",
            text: "Một số token và giải pháp của Vieomics chỉ khả dụng khi chạy trên cloud do Omicslab cung cấp. Khi tự triển khai hoặc dùng hạ tầng riêng, cần cấu hình thông tin xác thực và chịu trách nhiệm về quyền truy cập kho.",
          },
        ],
      },
      {
        id: "tu-cau-hinh",
        title: "Tự cấu hình thay vì mua",
        blocks: [
          {
            type: "p",
            text: "Với lưu trữ và phân tích, khách có thể tự cấu hình thay vì mua cấu hình có sẵn của nền tảng. Cách này phù hợp khi đã có bucket S3, cụm HPC hoặc thông tin xác thực riêng.",
          },
          {
            type: "figure",
            src: "/guides/marketplace/10-tu-cau-hinh.webp",
            alt: "Giao diện cấu hình lưu trữ và tính toán do khách tự cung cấp",
            caption:
              "Tự cấu hình lưu trữ và tính toán bằng tài nguyên của khách.",
          },
          {
            type: "p",
            text: "Trong mô hình tự triển khai, khách vận hành toàn bộ stack trên hạ tầng của mình. Vieomics không tự động nhận dữ liệu từ môi trường đó; việc chia sẻ log hoặc cấp quyền truy cập chỉ diễn ra khi khách yêu cầu và nằm trong phạm vi hỗ trợ đã thoả thuận.",
          },
        ],
      },
      {
        id: "chi-phi",
        title: "Chi phí và thời hạn",
        blocks: [
          {
            type: "p",
            text: "Lưu trữ Marketplace tính theo GB; tính toán tính theo thời gian chạy và cấu hình tài nguyên. Chi phí hiển thị trước khi chạy job và được ghi lại trong lịch sử. Giá và hạn mức có thể thay đổi; xem [Chính sách giá](/policies/pricing) để biết cách tính tại thời điểm hiện tại.",
          },
        ],
      },
    ],
  },
  {
    slug: "workspace",
    number: "04",
    kicker: "Chương 04 · Workspace",
    title: "Thành viên, workspace và dữ liệu",
    navTitle: "Workspace & dữ liệu",
    description:
      "Mời đồng nghiệp, tạo workspace, tải dữ liệu lên bucket và chuẩn bị nhóm mẫu trước khi phân tích.",
    summary:
      "Từ việc mời thành viên và tạo workspace đến tải dữ liệu, duyệt thư mục và khai báo nhóm mẫu.",
    sections: [
      {
        id: "thanh-vien",
        title: "Mời thành viên vào tổ chức",
        blocks: [
          {
            type: "p",
            text: "Mở **Tổ chức → Thành viên → Thêm**, nhập email và chọn vai trò. Thành viên tổ chức dùng chung thông tin xác thực, workspace và hoá đơn của tổ chức; vai trò quyết định quyền thao tác.",
          },
          {
            type: "figure",
            src: "/guides/workspace/01-them-thanh-vien.webp",
            alt: "Tab thành viên của tổ chức với danh sách thành viên và nút thêm",
            caption:
              "Thêm thành viên vào tổ chức và chọn vai trò trước khi gửi lời mời.",
          },
          {
            type: "p",
            text: "Vai trò tổ chức gồm **Admin**, **Contributor** và **Viewer**. Vai trò workspace được đặt riêng cho từng workspace.",
          },
        ],
      },
      {
        id: "tao-workspace",
        title: "Tạo workspace",
        blocks: [
          {
            type: "p",
            text: "Mở **Không gian làm việc → Thêm**, chọn tổ chức sở hữu, đặt tên và mô tả, chọn chế độ hiển thị, storage credential và tên bucket. Tên bucket phải duy nhất trên toàn cầu.",
          },
          {
            type: "figure",
            src: "/guides/workspace/02-tao-workspace.webp",
            alt: "Biểu mẫu tạo workspace với tổ chức, tên, mô tả, chế độ hiển thị, storage credential và tên bucket",
            caption:
              "Biểu mẫu tạo workspace. Tổ chức cần có thuê bao hiện hành và còn chỗ trong giới hạn gói.",
          },
          {
            type: "p",
            text: "Tổ chức cần có thuê bao hiện hành và số workspace không được vượt quá giới hạn của gói. **Private** chỉ cho thành viên workspace và thành viên tổ chức thấy trong danh sách; dữ liệu chỉ đọc được với quyền thành viên. **Public** cho mọi người dùng đã đăng nhập thấy workspace và đọc dữ liệu trong bucket, kể cả khi tổ chức không còn thuê bao.",
          },
          {
            type: "note",
            title: "Chỉ dùng Public cho dữ liệu công khai",
            text: "Workspace Public không phù hợp với dữ liệu hạn chế, dữ liệu cá nhân hoặc dữ liệu chưa công bố. Kiểm tra lại chế độ hiển thị trước khi tải dữ liệu lên.",
          },
        ],
      },
      {
        id: "mo-workspace",
        title: "Mở workspace",
        blocks: [
          {
            type: "p",
            text: "Nhấp đúp vào một dòng trong danh sách workspace để mở. Các tab bên trong gồm **Dữ liệu**, **Nhóm mẫu**, **Phân tích**, **Studio**, **Trình xem**, **Thành viên**, **Ngân sách** và **Hoạt động**.",
          },
          {
            type: "figure",
            src: "/guides/workspace/03-mo-workspace.webp",
            alt: "Danh sách workspace với một workspace được mở",
            caption:
              "Nhấp đúp vào workspace để vào không gian làm việc của dự án.",
          },
        ],
      },
      {
        id: "tai-du-lieu",
        title: "Tải dữ liệu lên",
        blocks: [
          {
            type: "p",
            text: "Mở tab **Dữ liệu**. Nút tạo cho phép tải tệp hoặc thư mục từ máy, tạo tệp mới có nội dung, hoặc tạo thư mục. Với dữ liệu giải trình tự, thường tải FASTQ và samplesheet trước khi chạy pipeline.",
          },
          {
            type: "figure",
            src: "/guides/workspace/04-tai-du-lieu.webp",
            alt: "Tab dữ liệu với nút tải tệp, tạo thư mục và danh sách tệp",
            caption:
              "Tải tệp hoặc thư mục lên bucket của workspace từ tab Dữ liệu.",
          },
          {
            type: "p",
            text: "Với thư mục lớn, nên chia nhỏ hoặc nén trước khi tải, rồi kiểm tra dung lượng và số tệp sau khi hoàn tất. Trình duyệt tệp cũng hỗ trợ tải xuống cả thư mục dưới dạng ZIP.",
          },
        ],
      },
      {
        id: "duyet-du-lieu",
        title: "Duyệt tệp và thư mục",
        blocks: [
          {
            type: "p",
            text: "Nhấp đúp vào thư mục để mở; thanh breadcrumb cho biết vị trí hiện tại. Có thể xem trước HTML, JSON hoặc văn bản, chỉnh sửa tệp nhỏ và tải lại nếu cần.",
          },
          {
            type: "figure",
            src: "/guides/workspace/05-duyet-du-lieu.webp",
            alt: "Trình duyệt tệp trong workspace với breadcrumb và danh sách tệp trong thư mục con",
            caption:
              "Duyệt thư mục con bằng nhấp đúp. Đường dẫn hiện tại nằm trên thanh breadcrumb.",
          },
          {
            type: "p",
            text: "Kết quả phân tích thường nằm trong thư mục **outdir** mà manifest ghi lại. Ghi nhớ đường dẫn này để mở kết quả sau khi job hoàn tất.",
          },
        ],
      },
      {
        id: "nhom-mau",
        title: "Khai báo nhóm mẫu",
        blocks: [
          {
            type: "p",
            text: "**Nhóm mẫu** gom các mẫu dùng chung một lược đồ metadata và cấu hình pipeline. Mở **Nhóm mẫu → Tạo**, chọn mẫu có sẵn nếu phù hợp, rồi điền thông tin chung và samplesheet.",
          },
          {
            type: "figure",
            src: "/guides/workspace/06-nhom-mau.webp",
            alt: "Danh sách nhóm mẫu trong workspace",
            caption:
              "Nhóm mẫu giúp tái sử dụng metadata và cấu hình pipeline cho nhiều lần chạy.",
          },
          {
            type: "p",
            text: "Có thể bắt đầu từ mẫu có sẵn, ví dụ **Lắp ráp hệ gen vi khuẩn (nf-core/bacass)** hoặc cấu hình WGS của nf-core, sau đó sửa tên trường và cột cho khớp dữ liệu.",
          },
          {
            type: "figure",
            src: "/guides/workspace/07-mau-wgs.webp",
            alt: "Biểu mẫu tạo nhóm mẫu từ mẫu WGS có sẵn với các cột samplesheet",
            caption:
              "Tạo nhóm mẫu từ mẫu có sẵn, ví dụ cấu hình WGS của nf-core; các cột samplesheet có thể sửa lại.",
          },
          {
            type: "note",
            title: "Mã mẫu thay vì tên cá nhân",
            text: "Dùng Sample ID hoặc mã mẫu thay cho tên người trong tên tệp, samplesheet và metadata. Việc thay thế tên bằng mã không tự động loại bỏ nghĩa vụ về dữ liệu cá nhân; cần đánh giá theo [Chính sách bảo mật](/privacy) trước khi tải lên.",
          },
        ],
      },
      {
        id: "thanh-vien-workspace",
        title: "Thành viên workspace",
        blocks: [
          {
            type: "p",
            text: "Mở **Workspace → Thành viên** để xem người đang truy cập và vai trò của họ. **Admin** quản lý cài đặt, thành viên, lưu trữ và có thể xoá workspace; **Contributor** chạy tác vụ, tải lên hoặc tải xuống dữ liệu và thêm thành viên; **Viewer** xem nội dung và trạng thái tác vụ.",
          },
          {
            type: "figure",
            src: "/guides/workspace/08-thanh-vien-workspace.webp",
            alt: "Tab thành viên của workspace với danh sách người dùng và vai trò",
            caption:
              "Thành viên workspace và vai trò tương ứng. Quyền admin nên giới hạn cho người quản lý hạ tầng và chi phí.",
          },
          {
            type: "p",
            text: "Nên giới hạn quyền admin cho những người thực sự cần quản lý hạ tầng và chi phí.",
          },
        ],
      },
    ],
  },
];
