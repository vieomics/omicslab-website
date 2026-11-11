import type { GuideContent } from "./types";
import { chaptersPart1 } from "./content/vi/part-1";
import { chaptersPart2 } from "./content/vi/part-2";
import { videosVi } from "./videos/vi";

export const guideVi: GuideContent = {
  shared: {
    lastUpdatedLabel: "Cập nhật",
    lastUpdated: "03/11/2026",
    chaptersLabel: "Các chương",
    tocLabel: "Mục lục",
    previous: "Chương trước",
    next: "Chương sau",
    figureLabel: "Hình",
    openImage: "Mở ảnh đầy đủ",
    backToTop: "Lên đầu trang",
  },
  hub: {
    kicker: "Hướng dẫn sử dụng",
    title: "Hướng dẫn sử dụng nền tảng Omicslab",
    description:
      "Các bước thao tác trên Nền tảng Omicslab, sắp xếp theo công việc thường ngày: từ tài khoản và tổ chức, thanh toán, workspace, chạy phân tích, Studio đến trình xem và hỗ trợ.",
    intro:
      "Tài liệu này được biên soạn từ một chuỗi thao tác thực tế trên Nền tảng Omicslab và đối chiếu với [tài liệu kỹ thuật](https://docs.omicslab.io/intro). Các chương được nhóm theo mục tiêu của người dùng thay vì thứ tự ảnh chụp, để có thể đọc từ đầu hoặc mở trực tiếp phần đang cần. Mỗi chương giữ cùng một cấu trúc: mục tiêu, các bước thao tác và ảnh chụp; phần lưu ý về phạm vi xuất hiện khi cần.",
    note: "Ảnh chụp được thực hiện trên giao diện tiếng Việt tại thời điểm biên soạn. Nhãn, vị trí nút và một số giá trị có thể khác khi nền tảng cập nhật; thông tin về phiên bản và giới hạn gói nên được kiểm tra lại trong tài liệu kỹ thuật hoặc trang thanh toán trước khi thực hiện giao dịch.",
    noteTitle: "Lưu ý",
    chapterLabel: "Chương",
    sectionLabel: "mục",
  },
  videos: videosVi,
  chapters: [...chaptersPart1, ...chaptersPart2],
};
