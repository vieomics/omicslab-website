import type { GuideVideoSeries } from "../types";

export const videosVi: GuideVideoSeries = {
  kicker: "Video hướng dẫn",
  title: "Video hướng dẫn sử dụng nền tảng Omicslab",
  description:
    "Bảy video ghi lại các thao tác trên Nền tảng Omicslab, theo thứ tự từ đăng ký tài khoản đến workspace, LIMS/Cohorts, samplesheet, trình xem và Studio.",
  meta: "07 video · 01:24:32 · Giọng đọc tiếng Việt",
  aboutLabel: "Về chuỗi video",
  intro:
    "Video đầu tiên là phần tổng quan về một lượt phân tích từ đầu đến cuối. Sáu video tiếp theo đi vào từng nhóm chức năng, theo thứ tự thường dùng khi bắt đầu với nền tảng.",
  languageNote: "Giọng đọc và nội dung trên màn hình bằng tiếng Việt.",
  listLabel: "Danh sách video",
  playLabel: "Phát video",
  selectedLabel: "Đang chọn",
  watchOnYouTube: "Xem trên YouTube",
  openPlaylist: "Mở danh sách phát trên YouTube",
  writtenGuideLabel: "Tài liệu hướng dẫn",
  writtenGuideText:
    "Các chương bằng văn bản trình bày cùng quy trình, kèm ảnh chụp và ghi chú về phạm vi áp dụng.",
  writtenGuideCta: "Đọc hướng dẫn sử dụng",
  docsLabel: "Tài liệu kỹ thuật",
  docsText: "Tham chiếu cấu hình, giới hạn và chi tiết kỹ thuật của nền tảng.",
  docsCta: "Mở tài liệu kỹ thuật",
  noteTitle: "Lưu ý",
  note: "Các video được ghi lại tại thời điểm công bố. Nhãn, vị trí nút và gói dịch vụ có thể thay đổi sau khi nền tảng cập nhật; tài liệu kỹ thuật là nguồn tham chiếu hiện hành.",
  videos: [
    {
      id: "j6f85vfLEIs",
      number: "00",
      title: "Omicslab – Nền tảng phân tích Tin sinh học toàn diện",
      duration: "03:55",
      description:
        "Một lượt phân tích từ đầu đến cuối: quản lý dữ liệu, chọn pipeline, cấu hình tài nguyên tính toán, khởi chạy và theo dõi kết quả trên nền tảng.",
      thumbnail: "/guides/video/tutorials/overview.jpg",
    },
    {
      id: "5KPPVZdvGcU",
      number: "01",
      title: "Đăng ký sử dụng nền tảng Omicslab",
      duration: "04:43",
      description:
        "Đăng ký bằng tài khoản Google, tạo tổ chức và cấu hình các thiết lập ban đầu.",
      thumbnail: "/guides/video/tutorials/01-account-organization.jpg",
    },
    {
      id: "k2lJ5Hs0hs0",
      number: "02",
      title:
        "Tạo workspace và phân tích với cấu hình lưu trữ, tính toán cloud tích hợp sẵn",
      duration: "17:28",
      description:
        "Tạo workspace, tải dữ liệu lên hoặc dùng workspace công khai, chọn cấu hình lưu trữ và tính toán, chạy phân tích và xem kết quả.",
      thumbnail: "/guides/video/tutorials/02-workspace-analysis.jpg",
    },
    {
      id: "RrdDsb6D9C0",
      number: "03",
      title: "Sử dụng LIMS/Cohorts để tự động hóa và quản lý phân tích",
      duration: "22:04",
      description:
        "Tự động hóa phân tích cho nhiều mẫu: giữ nguyên các tham số cố định và thay dữ liệu thô của từng mẫu.",
      thumbnail: "/guides/video/tutorials/03-lims-cohorts.jpg",
    },
    {
      id: "khINX3Is6F8",
      number: "04",
      title: "Tự động hóa tạo samplesheet cho phân tích và LIMS/cohort",
      duration: "12:07",
      description:
        "Tải dữ liệu theo cấu trúc yêu cầu, tạo samplesheet tự động, rồi chọn pipeline nf-core có sẵn hoặc pipeline riêng.",
      thumbnail: "/guides/video/tutorials/04-samplesheets.jpg",
    },
    {
      id: "bVGXvA1RJpo",
      number: "05",
      title: "Sử dụng trình xem (Viewer) để tương tác với tệp",
      duration: "09:28",
      description:
        "Xem trực tiếp BAM, CRAM, FASTA và BED trong IGV; cấu trúc protein trong Mol*; dữ liệu dạng bảng trong ECharts và Graphic Walker.",
      thumbnail: "/guides/video/tutorials/05-viewer.jpg",
    },
    {
      id: "wgR8yl-6o9g",
      number: "06",
      title:
        "Sử dụng Studio với VS Code, JupyterLab, RStudio và coding agent sandbox",
      duration: "14:47",
      description:
        "Mở VS Code, JupyterLab hoặc RStudio trong Studio; cấu hình GitHub và mô hình LLM; dùng coding agent OpenCode trong VS Code.",
      thumbnail: "/guides/video/tutorials/06-studio.jpg",
    },
  ],
};
