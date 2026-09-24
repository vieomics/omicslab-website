import { TextSegment } from "../types";
import type { Dictionary } from "./en";

export const vi: Dictionary = {
  site: {
    name: "Omicslab",
    tagline: "Công nghệ Omics",
  },
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    contact: "Liên hệ",
    solutions: "Giải pháp",
    infrastructure: "Hạ tầng dưới dạng dịch vụ",
    dataPlatform: "Nền tảng dữ liệu",
    pipelinesSoftwares: "Quy trình & Phần mềm",
    multiomicsPipeline: "Quy trình đa omics",
    runPipeline: "Chạy quy trình",
    software: "Phần mềm",
    blog: "Blog",
    docs: "Tài liệu",
    mobileMenu: "Menu di động",
    languageSwitcher: "Chuyển ngôn ngữ",
    switchTo: "English",
  },
  footer: {
    copyright: "© 2026 Omicslab. Bảo lưu mọi quyền.",
  },
  common: {
    home: "Trang chủ",
    all: "Tất cả",
    noPosts: "Không tìm thấy bài viết phù hợp với tiêu chí của bạn.",
    noBlogs: "Không tìm thấy bài viết nào.",
    readMore: "Đọc thêm",
    recentArticles: "Bài viết gần đây",
    tableOfContents: "Mục lục",
    copy: "Sao chép",
    copied: "Đã sao chép!",
    noDate: "Không có ngày",
    anonymous: "Ẩn danh",
    scrollToTop: "cuộn lên đầu trang",
    themeToggler: "chuyển đổi giao diện",
    viewOnGitHub: "Xem trên GitHub",
    contactUs: "Liên hệ với chúng tôi",
    readInOtherLanguage: "Đọc bằng tiếng Anh",
  },
  authors: {
    river: { title: "Nhà sáng lập @ Omicslab" },
  },
  home: {
    hero: {
      title: "Dịch vụ Tin sinh học Đổi mới & Công cụ Mã nguồn mở",
      paragraph:
        "Omicslab đồng hành cùng các nhà nghiên cứu với những giải pháp tin sinh học có khả năng mở rộng. Từ các quy trình phát hiện biến thể tiên tiến đến công cụ phân tích đa omics hiện đại, chúng tôi cung cấp quy trình và phần mềm sẵn sàng vận hành cho phân tích dữ liệu sinh học phức tạp.",
      contactCta: "Liên hệ hợp tác",
      githubCta: "Xem trên GitHub",
    },
    services: {
      subtitle: "Dịch vụ của chúng tôi",
      title: "Giải pháp Tin sinh học Toàn diện",
      paragraph:
        "Từ các quy trình phát hiện biến thể chuẩn vận hành đến nền tảng dữ liệu hiện đại, chúng tôi cung cấp đầy đủ công cụ và quy trình cho nhu cầu nghiên cứu tin sinh học của bạn.",
      items: [
        {
          title: "Quy trình Tin sinh học",
          paragraph:
            "Các quy trình sẵn sàng vận hành phục vụ phân tích tin sinh học và xử lý dữ liệu toàn diện.",
        },
        {
          title: "Đa omics",
          paragraph:
            "Tích hợp và chuẩn hóa nâng cao các tập dữ liệu đa omics phức tạp để phân tích toàn diện ở quy mô lớn.",
        },
        {
          title: "Hạ tầng HPC SLURM",
          paragraph:
            "Cấu hình hạ tầng sẵn sàng vận hành để thiết lập và quản lý cụm máy tính hiệu năng cao.",
        },
        {
          title: "Nền tảng dữ liệu (chỉ dành cho khu vực Việt Nam)",
          paragraph:
            "Nền tảng dữ liệu tin sinh học toàn diện phục vụ tích hợp, phân tích và quản lý các tập dữ liệu phức tạp.",
        },
      ],
    },
    about: {
      title: "Nâng tầm Nghiên cứu Tin sinh học",
      paragraph1:
        "Omicslab là một sáng kiến mã nguồn mở thúc đẩy đổi mới trong nghiên cứu tin sinh học và đa omics. Chúng tôi xây dựng các công cụ, quy trình và thư viện có khả năng mở rộng, hỗ trợ những thiết kế thí nghiệm phức tạp trong nhiều ứng dụng tin sinh học.",
      paragraph2:
        "Sứ mệnh của chúng tôi là trao cho các nhà nghiên cứu những giải pháp hiện đại, hiệu năng cao và dễ tiếp cận cho phân tích dữ liệu và đa omics tích hợp. Từ quy trình phát hiện biến thể sẵn sàng vận hành đến nền tảng dữ liệu tiên tiến, chúng tôi cung cấp mọi thứ bạn cần cho nghiên cứu tin sinh học chuyên sâu.",
      cta: "Khám phá trên GitHub",
      badge: {
        line1: "Omics",
        line2: "Mã nguồn mở",
        line3: "Tối ưu hóa",
      },
    },
    cta: {
      title: "Bạn đang tìm kiếm điều gì?",
      titleAccent: "Bắt đầu ngay",
      paragraph:
        "Chúng tôi cung cấp các giải pháp mã nguồn mở. Nếu bạn quan tâm, hãy liên hệ để trao đổi về hợp tác.",
      button: "Liên hệ hợp tác",
    },
    faq: {
      subtitle: "Câu hỏi thường gặp",
      title: "Mọi thắc mắc đều được giải đáp",
      paragraph:
        "Dưới đây là giải đáp cho một số câu hỏi phổ biến nhất mà chúng tôi nhận được.",
      items: [
        {
          question: "Sử dụng các giải pháp của Omicslab có mất phí không?",
          answer:
            "Các giải pháp mã nguồn mở của chúng tôi hoàn toàn miễn phí. Gói thuê bao Nền tảng dữ liệu là 1.000.000 VND/tháng cho 10 người dùng (giá cố định đến hết tháng 7/2026). Lưu trữ (S3) là 1.000 VND/GB/tháng. Điện toán HPC từ 20.000 VND/giờ (tối đa 16 CPU / 32 GB RAM, tỷ lệ 1:2). Các quy trình nf-core miễn phí, quy trình OmicsLab được điều chỉnh, và lắp ráp metagenomics là 100.000 VND/mẫu cho hệ gen hoàn chỉnh. Chúng tôi cũng hỗ trợ triển khai hoàn toàn tại chỗ cho nền tảng và HPC — hãy liên hệ để biết chi tiết.",
        },
        {
          question: "Cách tính giá được cấu trúc như thế nào?",
          answer:
            "Chúng tôi cung cấp báo giá tùy chỉnh dựa trên yêu cầu kỹ thuật và phạm vi dự án của bạn. Thay vì tính phí theo giờ, chúng tôi áp dụng hợp đồng theo dự án, phù hợp với mục tiêu kinh doanh và tiến độ của bạn.",
        },
        {
          question: "Nền tảng dữ liệu của các bạn hiện có sẵn chưa?",
          answer:
            "Nền tảng dữ liệu của chúng tôi hiện đang trong giai đoạn dùng thử tại Việt Nam. Hãy liên hệ để nhận 2 lượt chạy mẫu lắp ráp hệ gen miễn phí trên nền tảng. Hỗ trợ tích hợp đầy đủ khi sử dụng hạ tầng IaaS của chúng tôi cho tính toán hiệu năng cao với cấu hình SLURM.",
        },
      ],
    },
    blog: {
      subtitle: "Blog của chúng tôi",
      title: "Tin tức mới nhất",
      paragraph:
        "Khám phá các bài viết và giải pháp mới nhất từ OmicsLab, với dịch vụ và giải pháp tin sinh học được thiết kế riêng.",
    },
    contact: {
      subtitle: "Liên hệ",
      title: "Hãy cùng nhau giải quyết các bài toán tin sinh học của bạn.",
      locationLabel: "Địa chỉ",
      location: "TP. Hồ Chí Minh, Việt Nam",
      emailLabel: "Email",
      email: "contact@omicslab.io",
    },
  },
  aboutPage: {
    title: "Giới thiệu",
    description: "Tìm hiểu thêm về Omicslab và đội ngũ của chúng tôi.",
    team: {
      title: "Đội ngũ của chúng tôi",
      members: [
        {
          designation: "Nhà sáng lập",
          bio: "Chuyên gia tin sinh học với kinh nghiệm thực chiến từ năm 2019, chuyên về các giải pháp đầu-cuối trong sinh học tính toán, phân tích giải trình tự thế hệ mới (NGS) và hạ tầng có khả năng mở rộng. Công việc của anh trải rộng toàn bộ hệ thống tin sinh học, từ thiết kế các quy trình có thể tái lập với Nextflow, Snakemake và Galaxy đến triển khai các nền tảng chuẩn vận hành với tích hợp CI/CD cho tự động hóa và khả năng mở rộng.\n\nKhi tốc độ đổi mới trong khoa học sự sống ngày càng tăng, anh sáng lập OmicsLab với tầm nhìn rõ ràng: xây dựng một hệ sinh thái nền tảng vững chắc, hỗ trợ toàn bộ hành trình omics — từ hạ tầng cốt lõi và tạo sinh dữ liệu đến phân tích chuyên sâu và các ứng dụng dẫn dắt bởi AI. Điều này bao gồm phát triển môi trường HPC và đám mây mạnh mẽ, quản lý hệ thống tính toán dựa trên Slurm, và thiết kế kiến trúc lưu trữ cùng các giải pháp quy trình có khả năng xử lý dữ liệu hệ gen và đa omics quy mô lớn.\n\nVới nền tảng vững chắc về hệ gen, biểu sinh, phiên mã và học máy, anh tập trung biến dữ liệu sinh học phức tạp thành những hiểu biết có thể hành động. Anh cam kết xây dựng các hệ thống không chỉ có khả năng mở rộng và tái lập, mà còn dễ tiếp cận và tạo tác động cho cả nghiên cứu lẫn công nghiệp. Thông qua OmicsLab, mục tiêu của anh là thu hẹp khoảng cách giữa hạ tầng và đổi mới, mở đường cho thế hệ giải pháp tin sinh học và y học chính xác tiếp theo.",
        },
      ],
    },
  },
  blogPage: {
    title: "Blog",
    description: "Khám phá các bài viết và giải pháp mới nhất từ Omicslab.",
    searchPlaceholder: "Tìm kiếm bài viết...",
    searchPipelines: "Tìm kiếm quy trình...",
    searchInfrastructure: "Tìm kiếm bài viết hạ tầng...",
    guides: {
      title: "Hướng dẫn hạ tầng",
      paragraph:
        "Các hướng dẫn kỹ thuật để thiết lập và quản lý hạ tầng HPC. Mỗi hướng dẫn có thể được tùy chỉnh theo yêu cầu cụ thể của bạn.",
    },
  },
  solutions: {
    index: {
      title: "Giải pháp",
      subtitle: "Giải pháp tin sinh học cho nghiên cứu đa omics",
      paragraph:
        "Sử dụng menu điều hướng để truy cập: Nền tảng dữ liệu, Nền tảng dịch vụ hoặc Nền tảng phần mềm.",
      metadataDescription:
        "Giải pháp tin sinh học cho phân tích đa omics, quản lý dữ liệu và thực thi quy trình.",
    },
    dataPlatform: {
      metadataTitle: "Nền tảng dữ liệu",
      metadataDescription:
        "RIVER - Nền tảng nghiên cứu tin sinh học cho quản lý dữ liệu, HPC và thực thi công cụ.",
      title: "Nền tảng dữ liệu",
      subtitle:
        "Rapid Integration and Visualization for Enhanced Research (RIVER) - Nền tảng có khả năng mở rộng, hợp nhất quản lý dữ liệu, tính toán hiệu năng cao (HPC) và thực thi công cụ.",
      intro:
        "Nghiên cứu tin sinh học thường đòi hỏi thu thập và quản lý dữ liệu, thực thi các công cụ tính toán và quản lý kết quả trên nhiều nguồn tài nguyên phân tán với khả năng tái lập cao. Bên cạnh đó, các thách thức về hiệu quả, khả năng tiếp cận và bảo mật cũng cần được giải quyết. RIVER tích hợp ba thành phần chính: lưu trữ dữ liệu, quản lý phiên bản công cụ và tài nguyên tính toán. Đóng vai trò bộ điều khiển, RIVER cung cấp hệ thống phân quyền theo vai trò, cho phép người dùng tạo và quản lý thông tin xác thực, dự án và công cụ, trong khi các tác vụ phân tích được khởi chạy và giám sát qua giao diện web thân thiện.",
      note: [
        { strong: "Lưu ý:" },
        { text: " Nền tảng dữ liệu hiện đang trong giai đoạn " },
        { strong: "dùng thử" },
        { text: ". Nền tảng " },
        { strong: "không miễn phí" },
        { text: ". " },
        { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
        { text: " để nhận " },
        { strong: "2 lượt chạy mẫu lắp ráp hệ gen miễn phí" },
        { text: " trên nền tảng." },
      ] as TextSegment[],
      pricing: {
        title: "Bảng giá",
        cards: [
          {
            title: "Gói thuê bao nền tảng",
            price: "1.000.000 VND",
            period: "/tháng cho 10 người dùng",
            highlight: "Giá cố định đến hết tháng 7/2026",
            features: [
              "Phân quyền theo vai trò",
              "Quản lý dự án & thông tin xác thực",
              "Giao diện web & giám sát",
            ],
          },
          {
            title: "Lưu trữ (S3)",
            price: "1.000 VND",
            period: "/GB mỗi tháng",
            features: [
              "Lưu trữ đối tượng an toàn, dễ mở rộng",
              "Dữ liệu tổ chức theo dự án",
              "RBAC cho truy cập dữ liệu",
            ],
          },
          {
            title: "Điện toán HPC",
            price: "20.000 VND",
            period: "/giờ (tối đa 16 CPU / 32 GB RAM)",
            note: "Tỷ lệ 1:2 — 1.250 VND/giờ cho mỗi 1 CPU + 2 GB RAM",
            features: [
              "Quy trình nf-core: Miễn phí",
              "Quy trình OmicsLab: Điều chỉnh",
              "Lắp ráp metagenomics: 100.000 VND/mẫu",
              "Truy cập cụm HPC Slurm",
              "Ứng dụng web tương tác (RStudio, Jupyter, VS Code)",
            ],
          },
        ],
        trialNote: [
          { text: "Nền tảng hiện đang trong giai đoạn dùng thử. " },
          { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
          { text: " để nhận " },
          { strong: "2 lượt chạy mẫu lắp ráp hệ gen miễn phí" },
          { text: "." },
        ] as TextSegment[],
        localNote: [
          { strong: "Triển khai hoàn toàn tại chỗ" },
          { text: " cho toàn bộ nền tảng và HPC đã có sẵn. " },
          { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
          { text: " để biết thêm chi tiết." },
        ] as TextSegment[],
        estimates: [
          {
            title: "Ước tính chi phí — 100 mẫu lắp ráp hệ gen vi khuẩn / tháng",
            columns: {
              item: "Hạng mục",
              unitPrice: "Đơn giá",
              qty: "Số lượng",
              subtotal: "Tạm tính",
            },
            rows: [
              {
                item: "Lắp ráp metagenomics",
                unitPrice: "100.000 VND/mẫu",
                qty: "100",
                subtotal: "10.000.000 VND",
              },
              {
                item: "Điện toán HPC (16 CPU / 32 GB)",
                unitPrice: "20.000 VND/giờ",
                qty: "~200 giờ",
                subtotal: "~4.000.000 VND",
              },
              {
                item: "Gói thuê bao nền tảng",
                unitPrice: "1.000.000 VND/tháng",
                qty: "1",
                subtotal: "1.000.000 VND",
              },
              {
                item: "Lưu trữ (S3)",
                unitPrice: "1.000 VND/GB",
                qty: "~50 GB",
                subtotal: "~50.000 VND",
              },
            ],
            totalLabel: "Tổng ước tính / tháng",
            total: "~15.050.000 VND",
            footnote: [
              {
                text: "* Ước tính dựa trên khối lượng công việc lắp ráp hệ gen vi khuẩn thông thường. Chi phí thực tế có thể thay đổi. ",
              },
              { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
              { text: " để nhận báo giá chính xác." },
            ] as TextSegment[],
          },
          {
            title: "Ước tính chi phí — 100 mẫu 16S rRNA / tháng",
            columns: {
              item: "Hạng mục",
              unitPrice: "Đơn giá",
              qty: "Số lượng",
              subtotal: "Tạm tính",
            },
            rows: [
              {
                item: "Phân tích 16S rRNA",
                unitPrice: "100.000 VND/mẫu",
                qty: "100",
                subtotal: "10.000.000 VND",
              },
              {
                item: "Điện toán HPC (16 CPU / 32 GB)",
                unitPrice: "20.000 VND/giờ",
                qty: "~50 giờ",
                subtotal: "~1.000.000 VND",
              },
              {
                item: "Gói thuê bao nền tảng",
                unitPrice: "1.000.000 VND/tháng",
                qty: "1",
                subtotal: "1.000.000 VND",
              },
              {
                item: "Lưu trữ (S3)",
                unitPrice: "1.000 VND/GB",
                qty: "~10 GB",
                subtotal: "~10.000 VND",
              },
            ],
            totalLabel: "Tổng ước tính / tháng",
            total: "~12.010.000 VND",
            footnote: [
              {
                text: "* Ước tính dựa trên khối lượng phân tích 16S rRNA thông thường. Chi phí thực tế có thể thay đổi. ",
              },
              { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
              { text: " để nhận báo giá chính xác." },
            ] as TextSegment[],
          },
        ],
      },
      features: {
        title: "Tính năng chính",
        items: [
          {
            title: "Lưu trữ dữ liệu",
            paragraph:
              "Lưu trữ an toàn, dễ mở rộng cho các tập dữ liệu. Tổ chức dữ liệu theo dự án, loại và phân tích. Dữ liệu thô hoặc đã xử lý có thể được lưu trữ và chia sẻ bằng phân quyền theo vai trò (RBAC), trong đó nguồn dữ liệu có thể được đăng ký với dịch vụ xác thực S3.",
          },
          {
            title: "Tích hợp HPC",
            paragraph:
              "Kết nối tới cụm HPC Slurm cho các phân tích đòi hỏi tính toán lớn. Tác vụ được khởi chạy và giám sát qua giao diện web thân thiện.",
          },
          {
            title: "Tích hợp công cụ",
            paragraph:
              "Dễ dàng tích hợp và thực thi các quy trình do cộng đồng phát triển (như nf-core) cũng như quy trình tùy chỉnh. Hỗ trợ phân tích dữ liệu đa omics.",
          },
          {
            title: "Quản lý dự án",
            paragraph:
              "Tạo và quản lý dự án cùng thông tin xác thực. Hỗ trợ phân tích độc lập và tái lập giữa các nhóm với tài nguyên tính toán riêng của tổ chức.",
          },
        ],
      },
      gettingStarted: {
        title: "Bắt đầu",
        steps: [
          "Tạo dự án và tải lên các tệp dữ liệu thô",
          "Cấu hình thông tin xác thực và quyền truy cập",
          "Chọn dữ liệu để thực thi quy trình",
          "Chạy quy trình trên HPC và theo dõi tiến độ",
          "Xem báo cáo quy trình và tải kết quả đã xử lý",
        ],
        videoTitle: "Omicslab Platform - Nền tảng phân tích tin sinh học",
      },
      useCases: {
        title: "Trường hợp sử dụng",
        items: [
          {
            title: "Phân tích không tương tác",
            paragraph:
              "RIVER cho phép tích hợp và thực thi dễ dàng các quy trình do cộng đồng phát triển cũng như quy trình tùy chỉnh, với khả năng chuyển đổi thuận tiện từ các công cụ hiện có. Nền tảng hỗ trợ tất cả quy trình nf-core (https://nf-co.re/pipelines/) hoặc chỉ cần thêm cấu hình nhỏ cho các quy trình Nextflow, Snakemake và bash script không thuộc nf-core.",
          },
          {
            title: "Ứng dụng web tương tác",
            paragraph:
              "RIVER cung cấp cách an toàn để công bố các ứng dụng web tương tác từ môi trường HPC ra mạng công khai, với xác thực và kiểm soát hệ thống tập trung. Nền tảng bao gồm bộ Studio sẵn sàng sử dụng — RStudio Server, JupyterLab và VS Code Server — đồng thời hỗ trợ truy cập các ứng dụng web khác như dashboard tùy chỉnh.",
          },
          {
            title: "Nghiên cứu cộng tác",
            paragraph:
              "Hỗ trợ phân tích độc lập và tái lập trên nhiều nguồn tài nguyên tính toán (HPC, Cloud), với dữ liệu lưu trên đám mây và tài nguyên tính toán riêng của tổ chức.",
          },
        ],
      },
    },
    infrastructure: {
      metadataTitle: "Hạ tầng dưới dạng dịch vụ",
      metadataDescription:
        "Thiết lập hạ tầng để chạy các quy trình Nextflow trên HPC tại chỗ hoặc đám mây (AWS, GCP).",
      title: "Hạ tầng dưới dạng dịch vụ",
      subtitle:
        "Thiết lập hạ tầng để chạy các quy trình Nextflow tại chỗ hoặc trên đám mây.",
      intro:
        "Chạy các quy trình Nextflow ở quy mô lớn trên hạ tầng bạn lựa chọn. Chúng tôi cung cấp triển khai tự động cho cụm HPC tại chỗ (Slurm) hoặc môi trường đám mây (AWS, GCP). Bạn tập trung vào nghiên cứu, chúng tôi lo phần hạ tầng.",
      searchPlaceholder: "Tìm kiếm bài viết hạ tầng...",
      available: {
        title: "Hạ tầng có sẵn",
        items: [
          {
            title: "HPC tại chỗ",
            paragraph:
              "Triển khai Nextflow trên cụm HPC nội bộ với bộ lập lịch Slurm, PBS hoặc LSF.",
          },
          {
            title: "AWS Cloud",
            paragraph:
              "Chạy Nextflow trên AWS Batch với EC2, Fargate hoặc Spot instances.",
          },
          {
            title: "GCP Cloud",
            paragraph:
              "Triển khai trên Google Cloud Batch với Compute Engine hoặc preemptible VM.",
          },
        ],
      },
      onPrem: {
        title: "HPC tại chỗ",
        paragraph:
          "Triển khai cụm HPC Slurm hoàn chỉnh trên hạ tầng nội bộ của bạn. Chúng tôi cung cấp phần thiết lập và cấu hình, bạn cung cấp phần cứng.",
        plans: [
          {
            badge: "Thiết lập",
            title: "Mini-HPC",
            description:
              "Cụm nhỏ cho nhà nghiên cứu cá nhân hoặc phòng thí nghiệm nhỏ",
            price: "$250",
            priceSuffix: " một lần",
            configTitle: "Cấu hình:",
            config: [
              "1 nút điều khiển/đăng nhập",
              "1 nút tính toán",
              "Bộ lập lịch Slurm",
              "Lưu trữ chia sẻ NFS",
              "Giám sát cơ bản",
            ],
            includesTitle: "Bao gồm:",
            includes: [
              "Thiết lập tự động hóa Ansible",
              "Cấu hình Slurm",
              "Tích hợp Nextflow",
              "Buổi đào tạo cơ bản",
              "Hỗ trợ 30 ngày",
            ],
            note: "* Không bao gồm phần cứng.",
          },
          {
            badge: "Dịch vụ",
            title: "Bảo trì HPC",
            description: "Dịch vụ bảo trì định kỳ cho mọi cụm HPC",
            price: "$100",
            priceSuffix: "/tháng",
            configTitle: "",
            config: [] as string[],
            includesTitle: "Nội dung bao gồm:",
            includes: [
              "Cập nhật và vá hệ thống",
              "Nâng cấp phiên bản Slurm",
              "Cập nhật gói phần mềm",
              "Giám sát 24/7",
              "Hỗ trợ ưu tiên",
            ],
            note: "* Áp dụng cho mọi cụm HPC, kể cả cụm không do chúng tôi thiết lập.",
          },
          {
            badge: "Thiết lập",
            title: "HPC đa nút",
            description:
              "Cụm có khả năng mở rộng cho nhóm nghiên cứu và khối lượng công việc vận hành",
            price: "Liên hệ",
            priceSuffix: "",
            configTitle: "Cấu hình:",
            config: [
              "Nhiều nút điều khiển (HA)",
              "Nhiều nút tính toán",
              "Hỗ trợ GPU (tùy chọn)",
              "Lưu trữ hiệu năng cao",
              "Giám sát nâng cao",
            ],
            includesTitle: "Bao gồm:",
            includes: [
              "Tự động hóa Ansible tùy chỉnh",
              "Thiết lập tính sẵn sàng cao",
              "LDAP/Active Directory | NIS",
              "Các buổi đào tạo đầy đủ",
              "Hỗ trợ 1 năm",
            ],
            note: "* Yêu cầu có thể khác nhau.",
          },
        ],
      },
      cloudFeatures: {
        title: "Tính năng hạ tầng đám mây",
        items: [
          {
            title: "Tự động mở rộng",
            paragraph:
              "Tự động mở rộng tài nguyên tính toán theo khối lượng công việc.",
          },
          {
            title: "Tối ưu chi phí",
            paragraph:
              "Dùng spot/preemptible instances cho tác vụ theo lô. Tiết kiệm đến 90%.",
          },
          {
            title: "Giám sát tác vụ",
            paragraph: "Giám sát thời gian thực quá trình thực thi quy trình.",
          },
          {
            title: "Tích hợp lưu trữ",
            paragraph: "Kết nối tới S3, GCS hoặc lưu trữ NFS nội bộ.",
          },
        ],
      },
    },
    pipelines: {
      metadataTitle: "Quy trình & Phần mềm",
      metadataDescription:
        "Quy trình đa omics và các gói phần mềm phục vụ phân tích.",
      title: "Quy trình & Phần mềm",
      subtitle:
        "Thực thi các quy trình phân tích đa omics từ dữ liệu thô đến khám phá sẵn sàng sử dụng và phân tích AI/ML",
      intro:
        "Pipelines & Software cung cấp các quy trình Nextflow sẵn sàng sử dụng cho phân tích đa omics và các gói mã nguồn mở cho phân tích tùy chỉnh.",
      searchPlaceholder: "Tìm kiếm quy trình...",
      available: {
        title: "Quy trình có sẵn",
        paragraph:
          "Tại OmicsLab, chúng tôi cung cấp giải pháp tin sinh học đầu-cuối trải rộng từ hạ tầng, nền tảng dữ liệu, quy trình đến phần mềm cho quản lý và phân tích dữ liệu đa omics toàn diện. Các dịch vụ của chúng tôi được thiết kế để hỗ trợ dự án ở mọi quy mô, từ nghiên cứu cá nhân đến nhóm thuần tập cấp ngân hàng sinh học. Một phần giải pháp sẽ được công bố qua các bài viết kỹ thuật bên dưới.",
        categories: [
          {
            title: "Hệ gen",
            items: [
              "Phát hiện biến thể dòng mầm từ short-read",
              "Phát hiện biến thể soma từ short-read",
              "Phát hiện biến thể từ long-read",
            ],
          },
          {
            title: "Methyl hóa",
            items: [
              "Phân tích giải trình tự bisulfite",
              "Phát hiện methyl hóa dựa trên TAPS",
              "Phân tích M-bias",
            ],
          },
          {
            title: "Phiên mã",
            items: [
              "Phân tích biểu hiện khác biệt RNA-seq",
              "Phiên mã đơn bào",
              "Phiên mã không gian",
            ],
          },
          {
            title: "Protein",
            items: [
              "Nhận diện protein",
              "Định lượng",
              "Phân tích PTM",
            ],
          },
          {
            title: "Chuyển hóa",
            items: [
              "Phân tích dấu ấn chuyển hóa",
              "Phân tích con đường",
              "Định hướng & không định hướng",
            ],
          },
          {
            title: "Metagenomics",
            items: [
              "Giải trình tự amplicon 16S",
              "Whole-genome shotgun",
              "Lắp ráp de novo",
            ],
          },
        ],
      },
      software: {
        title: "Giải pháp phần mềm có khả năng mở rộng",
        paragraph:
          "Chúng tôi cung cấp các gói phần mềm mã nguồn mở cho chuẩn hóa và phân tích dữ liệu đa omics ở quy mô lớn.",
        packages: [
          {
            name: "omicslab-kit",
            description:
              "Bộ công cụ toàn diện để tích hợp nhiều công cụ tin sinh học nhằm thiết lập các quy trình phân tích có khả năng mở rộng. Bao gồm hướng dẫn thực hành tin sinh học ở quy mô lớn với nhiều cấu hình công cụ khác nhau.",
            linkText: "Xem trên GitHub →",
            href: "https://github.com/vieomics/omicslab-kit",
          },
          {
            name: "pyomicslab",
            description:
              "Gói Python cho chuẩn hóa và phân tích dữ liệu đa omics ở quy mô lớn. Tích hợp với nhiều nguồn dữ liệu bao gồm dữ liệu TCGA (viết lại từ TCGABiolinks) và cung cấp các giải pháp Python gốc cho phân tích và trực quan hóa như heatmap, phân tích sống còn, oncoplot và nhiều hơn nữa.",
            linkText: "Xem trên GitHub →",
            href: "https://github.com/vieomics/pyomicslab",
          },
        ],
      },
    },
  },
  contactPage: {
    title: "Liên hệ",
    description:
      "Kết nối với Omicslab để được tư vấn dịch vụ và giải pháp tin sinh học.",
  },
  pricingPage: {
    title: "Bảng giá",
    description:
      "Bảng giá Omicslab cho nền tảng dữ liệu, lưu trữ và điện toán HPC.",
    section: {
      subtitle: "Bảng giá",
      title: "Liên hệ để nhận báo giá",
      paragraph:
        "Nền tảng dữ liệu hiện đang trong giai đoạn dùng thử. Liên hệ để nhận 2 lượt chạy mẫu lắp ráp hệ gen miễn phí trên nền tảng.",
      lines: [
        [
          { strong: "Gói thuê bao nền tảng:" },
          {
            text: " 1.000.000 VND/tháng cho 10 người dùng — cố định đến hết tháng 7/2026.",
          },
        ],
        [
          { strong: "Lưu trữ (S3):" },
          { text: " 1.000 VND/GB/tháng." },
        ],
        [
          { strong: "Điện toán HPC:" },
          {
            text: " 20.000 VND/giờ (tối đa 16 CPU / 32 GB RAM, tỷ lệ 1:2). Quy trình nf-core miễn phí, quy trình OmicsLab được điều chỉnh, lắp ráp metagenomics 100.000 VND/mẫu.",
          },
        ],
        [
          { strong: "Triển khai hoàn toàn tại chỗ" },
          {
            text: " cho nền tảng & HPC cũng đã có sẵn — liên hệ để biết chi tiết.",
          },
        ],
      ] as TextSegment[][],
    },
  },
  errorPage: {
    title: "Trang 404",
    description: "Trang bạn tìm kiếm không tồn tại.",
  },
  notFound: {
    heading: "Chúng tôi không tìm thấy trang bạn đang tìm.",
    paragraph:
      "Rất tiếc! Trang bạn tìm không tồn tại. Có thể trang đã được di chuyển hoặc xóa.",
    button: "Về trang chủ",
  },
  globalNotFound: {
    heading: "404 - Không tìm thấy trang",
    paragraph: "Trang bạn tìm kiếm không tồn tại.",
    homeVi: "Trang chủ (Tiếng Việt)",
    homeEn: "Home (English)",
  },
  metadata: {
    siteDescription:
      "Giải pháp tin sinh học đổi mới cho nhà nghiên cứu. Quy trình phát hiện biến thể sẵn sàng vận hành, công cụ phân tích đa omics và nền tảng dữ liệu.",
    home: {
      title: "Omicslab - Công nghệ Omics",
      description:
        "Giải pháp tin sinh học đổi mới cho nhà nghiên cứu. Quy trình phát hiện biến thể sẵn sàng vận hành, công cụ phân tích đa omics và nền tảng dữ liệu.",
    },
    about: {
      title: "Giới thiệu",
      description: "Tìm hiểu thêm về Omicslab và đội ngũ của chúng tôi.",
    },
    blog: {
      title: "Blog",
      description: "Khám phá các bài viết và giải pháp mới nhất từ Omicslab.",
    },
    contact: {
      title: "Liên hệ",
      description:
        "Kết nối với Omicslab để được tư vấn dịch vụ và giải pháp tin sinh học.",
    },
    pricing: {
      title: "Bảng giá",
      description:
        "Bảng giá Omicslab cho nền tảng dữ liệu, lưu trữ và điện toán HPC.",
    },
  },
};
