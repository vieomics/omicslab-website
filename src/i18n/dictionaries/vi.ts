import { TextSegment } from "../types";
import type { Dictionary } from "./en";
import { policiesVi } from "./policies/vi";
import { guideVi } from "./guides/vi";

const subscription = {
  subtitle: "Gói sử dụng",
  title: "Bốn gói, từ cá nhân đến doanh nghiệp",
  paragraph:
    "Giới hạn — workspace, thành viên và số job chạy đồng thời — tăng theo gói, trong khi tính toán và lưu trữ vẫn tính theo mức sử dụng.",
  tiers: [
    {
      name: "Individual",
      highlight: "Cá nhân & người tự học",
      price: "100.000 VND",
      period: "/tháng",
      features: [
        "1 workspace",
        "1 thành viên tổ chức, 1 thành viên mỗi workspace",
        "1 job Studio và 1 job phân tích chạy đồng thời",
        "SLA hỗ trợ: phản hồi trong 7 ngày làm việc",
        "Lưu trữ tính theo dung lượng dùng",
        "Đầy đủ tính năng của nền tảng",
      ],
      cta: "Đăng ký gói Individual",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Lite",
      highlight: "Cá nhân & nhóm nhỏ",
      price: "1.000.000 VND",
      period: "/tháng",
      features: [
        "Tối đa 2 workspace",
        "1 thành viên tổ chức, 3 thành viên mỗi workspace",
        "5 job Studio và 5 job phân tích chạy đồng thời",
        "SLA hỗ trợ: phản hồi trong 24 giờ ngày làm việc",
        "Lưu trữ tính theo dung lượng dùng",
        "Đầy đủ tính năng của nền tảng",
      ],
      cta: "Đăng ký gói Lite",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Pro",
      highlight: "Phổ biến nhất",
      price: "10.000.000 VND",
      period: "/tháng",
      features: [
        "Tối đa 20 workspace",
        "10 thành viên tổ chức, 30 thành viên mỗi workspace",
        "50 job Studio và 50 job phân tích chạy đồng thời",
        "LIMS đi kèm theo mặc định",
        "SLA hỗ trợ: phản hồi trong 24 giờ ngày làm việc",
        "Lưu trữ tính theo dung lượng dùng",
        "Đầy đủ tính năng của nền tảng",
      ],
      cta: "Đăng ký gói Pro",
      ctaHref: "https://platform.omicslab.io",
    },
    {
      name: "Business",
      highlight: "Tùy biến theo yêu cầu",
      price: "Tùy chỉnh",
      period: "theo yêu cầu",
      features: [
        "Giới hạn tùy chỉnh theo quy mô doanh nghiệp",
        "Triển khai tại chỗ hoặc môi trường riêng (air-gapped)",
        "Tích hợp LIMS và plugin theo yêu cầu",
        "Hỗ trợ ưu tiên — hợp đồng và SLA thương lượng riêng",
        "Báo giá riêng cho từng dự án",
      ],
      cta: "Liên hệ tư vấn",
      ctaHref: "/contact",
    },
  ],
};

const topup = {
  subtitle: "Nạp tiền (top-up)",
  title: "Trả phí cho những gì bạn dùng",
  paragraph:
    "Nạp vào ví của tổ chức và dùng cho tính toán, lưu trữ cùng phí nền tảng.",
  lines: [
    [
      { strong: "Nạp tiền:" },
      {
        text: " Nạp vào ví tổ chức qua SePay/VietQR. Số dư dùng cho tính toán, lưu trữ và phí nền tảng — hóa đơn nạp tiền chịu VAT 10%, gói sử dụng 0%.",
      },
    ],
    [
      { strong: "Lưu trữ:" },
      { text: " 500 VND/GB mỗi tháng, trừ hàng tháng vào số dư tổ chức." },
    ],
    [
      { strong: "Điện toán:" },
      {
        text: " 8.868 VND/giờ cho cấu hình 16 CPU / 32 GB RAM trên GreenNode.",
      },
    ],
    [
      { strong: "Phí nền tảng:" },
      {
        text: " 1.000 VND/giờ trong lúc job chạy — áp dụng cả với hạ tầng của riêng bạn, chỉ dùng để vận hành và bảo trì nền tảng.",
      },
    ],
    [
      { strong: "Quy trình:" },
      {
        text: " Quy trình cộng đồng như nf-core và bacass miễn phí — bạn chỉ trả chi phí tính toán và lưu trữ. Quy trình OmicsLab tùy chỉnh được xây theo yêu cầu và tính theo mẫu, từ 100.000 VND/mẫu.",
      },
    ],
  ] as TextSegment[][],
  storage: {
    title: "Lưu trữ đối tượng (Marketplace)",
    specs: [
      { label: "Dung lượng lưu trữ", value: "Không giới hạn" },
      { label: "Tốc độ tải xuống", value: "10 Gbps" },
      { label: "HTTP GET/HEAD", value: "5000 req/s" },
      { label: "Chuyển dữ liệu", value: "Không giới hạn" },
      { label: "Cách tính phí", value: "Pay as you go" },
      { label: "Giá lưu trữ", value: "500 VND/GB mỗi tháng" },
    ],
  },
};

const usageCosts = {
  title: "Chi phí sử dụng nền tảng",
  items: [
    [
      { strong: "Phí duy trì nền tảng:" },
      { text: " 1.000 VND/giờ chạy job." },
    ],
    [
      { strong: "Chi phí compute:" },
      {
        text: " Tùy thuộc vào phân tích và nhà cung cấp hạ tầng. Chi phí được xác định theo bảng giá công khai của nhà cung cấp tương ứng.",
      },
    ],
    [
      { strong: "Chi phí lưu trữ (S3):" },
      {
        text: " Tính theo bảng giá của nhà cung cấp lưu trữ được khách hàng lựa chọn, căn cứ vào dung lượng, thời gian lưu trữ và các khoản phí liên quan (nếu có).",
      },
    ],
  ] as TextSegment[][],
  note:
    "Chi phí compute và lưu trữ không nằm trong phí duy trì nền tảng. Khách hàng có thể xem bảng giá của nhà cung cấp tương ứng trước khi sử dụng. Giá áp dụng và tổng chi phí dự kiến sẽ được xác định theo cấu hình và dịch vụ thực tế được lựa chọn.",
};

export const vi: Dictionary = {
  site: {
    name: "Omicslab",
    tagline: "OMICS x AI",
    legalName: "CÔNG TY TNHH VIEOMICS",
    address:
      "Số 10 Sông Thao, Phường Tân Sơn Hòa, Thành phố Hồ Chí Minh, Việt Nam",
    taxLabel: "Mã số thuế",
    taxId: "0319713358",
    phoneLabel: "Điện thoại",
    phone: "(+84) 364002059",
  },
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    contact: "Liên hệ",
    guide: "Hướng dẫn",
    solutions: "Giải pháp",
    dataPlatform: "Nền tảng Omicslab",
    pipelinesSoftwares: "Giải pháp tùy chỉnh",
    blog: "Blog",
    docs: "Tài liệu",
    mobileMenu: "Menu di động",
    languageSwitcher: "Chuyển ngôn ngữ",
    switchTo: "English",
  },
  footer: {
    copyright: "© 2026 Omicslab. Bảo lưu mọi quyền.",
    platform: "Nền tảng Omicslab",
    productOf: "Sản phẩm của",
    legalLabel: "Pháp lý",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản Dịch vụ",
  },
  policies: policiesVi,
  guide: guideVi,
  cookieConsent: {
    title: "Phân tích lưu lượng truy cập",
    message:
      "Trang web này dùng cookie của Google Analytics để hiểu khách truy cập sử dụng trang như thế nào. Cookie chỉ được bật sau khi bạn bấm Chấp nhận; nếu bạn từ chối, Google Analytics sẽ không được tải và không cookie nào được tạo. Việc từ chối không ảnh hưởng đến khả năng xem trang của bạn.",
    accept: "Chấp nhận",
    decline: "Từ chối",
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
    viewOnGitHub: "Xem trên GitHub",
    contactUs: "Liên hệ với chúng tôi",
    readInOtherLanguage: "Đọc bằng tiếng Anh",
  },
  authors: {
    vieomics: { title: "Founder @ Vieomics" },
  },
  home: {
    hero: {
      title: "Dịch vụ tin sinh học dry-lab toàn diện",
      paragraph:
        "Một nền tảng cho toàn bộ dry-lab của bạn: quản lý người dùng, dữ liệu, công cụ và hạ tầng tính toán trong cùng một nơi. Omicslab chạy trên mọi cloud, tối ưu cho các nhà cung cấp Việt Nam đã được tích hợp sẵn như CloudFly và GreenNode với dịch vụ PAYG. Đồng thời hỗ trợ các cụm máy tính hiệu năng cao SLURM của bạn. Đã có hệ thống sẵn, chúng tôi hỗ trợ tích hợp thay vì thay thế hoàn toàn hệ thống hiện có, giúp mở rộng khả năng tính toán của bạn khi cần.",
      primaryCta: "Bắt đầu trên Omicslab",
      secondaryCta: "Đọc tài liệu",
    },
    services: {
      subtitle: "Nền tảng & Dịch vụ",
      title: "Toàn bộ dry-lab trên một nền tảng",
      paragraph:
        "Quản lý người dùng, dữ liệu, công cụ và hạ tầng tính toán trên một nền tảng tin sinh học, với phương án triển khai phù hợp hạ tầng hiện có và dịch vụ chuyên môn cho yêu cầu riêng.",
      items: [
        {
          title: "Quản lý người dùng, dữ liệu, công cụ và tính toán",
          paragraph:
            "Giám sát toàn diện phân quyền và hoạt động của hệ thống phân tích. Người quản lý tạo tổ chức, không gian làm việc và quản trị người dùng, tài nguyên. Chuyên viên phân tích nhận tài nguyên, tự xây dựng công cụ hoặc dùng công cụ sẵn có (nf-core) để phân tích dữ liệu, trả kết quả và xem kết quả ngay trên nền tảng. Mọi thao tác với dữ liệu đều được ghi lại và kiểm tra, đảm bảo truy xuất và sử dụng dữ liệu an toàn.",
          cta: "Mở nền tảng",
        },
        {
          title: "Tích hợp hạ tầng của bạn",
          paragraph:
            "Tự vận hành nền tảng ngay tại chỗ, kết nối cụm HPC Slurm của riêng bạn và mang các quy trình hiện có vào với công sức tối thiểu. Dữ liệu được lưu trữ theo dung lượng — bạn chỉ trả phí cho gói lưu trữ đã chọn.",
          cta: "Tài liệu triển khai",
        },
        {
          title: "Trả phí và chạy, trọn gói",
          paragraph:
            "Mọi thứ đã sẵn sàng: đăng nhập, chọn một quy trình nf-core như rnaseq hoặc sarek, thiết lập tham số và tài nguyên rồi bấm chạy — tính toán trên CloudFly hoặc GreenNode, lưu trữ, và kết quả trả về ngay trên nền tảng. Hệ thống tối ưu cho Nextflow và nf-core nhưng không giới hạn ở đó; bên cạnh Studio như RStudio, JupyterLab và VS Code, nền tảng còn chạy được mọi ứng dụng web triển khai bằng Docker.",
          cta: "Đọc tài liệu",
        },
        {
          title: "Dịch vụ tin sinh học theo dự án",
          paragraph:
            "Bạn đã có cụm HPC Slurm và hệ thống lưu trữ tương thích S3, muốn mở rộng dịch vụ sản xuất mà không phải gỡ bỏ cụm hiện có — nền tảng tích hợp vào hạ tầng sẵn có, cho phép một phần cụm chuyển sang vai trò phát triển, phần còn lại mở rộng cho sản xuất. Các bộ dữ liệu nhạy cảm như NIPT (dữ liệu bộ gen người) chỉ được xử lý trong mô hình tự vận hành (self-hosted) chạy hoàn toàn trên hạ tầng của chính bạn, nơi dữ liệu ở lại trong môi trường của bạn: nền tảng giúp tải lên, lưu trữ dữ liệu, tạo mẫu kèm quản lý cohort và tự động kích hoạt các quy trình đã cấu hình sẵn ở quy mô lớn (qua tính năng mini LIMS). Kiến trúc plugin cho phép tích hợp toàn bộ chức năng LIMS khi cần xử lý dữ liệu nhạy cảm.",
          cta: "Liên hệ với chúng tôi",
        },
      ],
    },
    howItWorks: {
      subtitle: "Cách hoạt động",
      title: "Quy trình toàn diện trên nền tảng",
      paragraph:
        "Từ khi tạo tổ chức đến khi có kết quả — mọi bước diễn ra trên cùng một nền tảng.",
      steps: [
        {
          title: "Tạo tổ chức",
          paragraph:
            "Thiết lập tổ chức, mời thành viên và kích hoạt giấy phép bằng cách thanh toán phí gói sử dụng.",
        },
        {
          title: "Thêm hạ tầng và lưu trữ",
          paragraph:
            "Cloud và HPC đã được cấu hình sẵn, sẵn sàng để chạy — bạn chỉ cần chọn CloudFly, GreenNode hoặc một cụm Slurm và trả phí theo mức sử dụng, không cần cấu hình gì thêm. Đã có máy tính và lưu trữ tương thích S3 của riêng bạn? Chỉ cần kết nối.",
        },
        {
          title: "Chọn dữ liệu đầu vào",
          paragraph:
            "Chọn các tệp cần phân tích ngay trên trình duyệt dữ liệu — tải lên hoặc lấy từ hạ tầng sẵn có của bạn.",
        },
        {
          title: "Chọn quy trình và chạy",
          paragraph:
            "Chạy Nextflow và nf-core, hoặc bất kỳ quy trình nào có schema được cấu hình sẵn (bash, Snakemake và nhiều hơn nữa) — tham số, tài nguyên, log và kết quả đều được quản lý toàn diện trên nền tảng.",
        },
      ],
      noteLabel: "Lưu ý",
      note:
        "Dùng hạ tầng của riêng bạn? Nền tảng vẫn tính một khoản phí nhỏ theo giờ khi chạy job — chỉ dùng để vận hành và bảo trì nền tảng.",
    },
    platforms: {
      subtitle: "Tương thích với",
      title: "Cloud, quy trình và công cụ bạn đang dùng",
      paragraph:
        "Được thiết kế để hoạt động với mọi cloud và mọi hình thức lưu trữ, Omicslab ưu tiên tối ưu cho các nhà cung cấp Việt Nam — CloudFly và GreenNode — để bạn có thể giữ dữ liệu nghiên cứu trong nước và việc xử lý dữ liệu phù hợp với Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) cùng Nghị định 356/2025/NĐ-CP, văn bản kế thừa Nghị định 13/2023/NĐ-CP.",
      items: [
        { title: "CloudFly", detail: "Cloud Việt Nam — Hà Nội, Đà Nẵng, TP.HCM" },
        { title: "GreenNode", detail: "Greennode (VNG Cloud) - TP.HCM" },
        { title: "Slurm HPC", detail: "Cụm riêng của bạn, kết nối qua SDK" },
        { title: "Nextflow", detail: "Chủ yếu Nextflow & nf-core, nhưng không giới hạn, mở rộng dễ dàng với bash, Snakemake, vv" },
        { title: "Lưu trữ", detail: "Lưu trữ đối tượng tương thích S3 — mua theo gói dung lượng hoặc dùng của riêng bạn" },
        { title: "Studio", detail: "Galaxy, Streamlit, RStudio, vv — hoặc mọi ứng dụng web Docker" },
      ],
    },
    customers: {
      subtitle: "Khách hàng",
      title: "Các nhóm nghiên cứu đang làm việc với Omicslab",
      paragraph:
        "Dưới đây là một số nhóm nghiên cứu đang làm việc với Omicslab. Chúng tôi chỉ nêu tên những nhóm đã đồng ý được giới thiệu.",
      cta: "Xem trang nhóm nghiên cứu",
      members: [
        {
          initials: "NTD",
          name: "Nguyen Thanh Danh Lab",
          affiliation:
            "Nhóm nghiên cứu T.D. Nguyen, Viện Công nghệ Tiên tiến, Viện Hàn lâm Khoa học và Công nghệ Việt Nam (VAST)",
          location: "TP. Hồ Chí Minh, Việt Nam",
          focus:
            "Hướng nghiên cứu của nhóm gồm tổng hợp và đặc trưng vật liệu lai, cảm biến phát hiện hợp chất độc hại và xúc tác dị thể.",
          link: "https://sites.google.com/view/nguyensresearchgroup/thanh-danh-nguyen",
        },
      ],
    },
    about: {
      title: "Dịch vụ tin sinh học dry-lab toàn diện, phát triển tại Việt Nam",
      paragraph1:
        "Omicslab được phát triển bởi Công ty TNHH Vieomics. Chúng tôi cung cấp dịch vụ dry-lab toàn diện: nền tảng tin sinh học cho người dùng, dữ liệu, công cụ và tính toán, cùng các dịch vụ chuyên môn xoay quanh nó.",
      cta: "Khám phá trên GitHub",
      badge: {
        line1: "Omics",
        line2: "Dịch vụ Dry-Lab",
        line3: "Nền tảng & Chuyên môn",
      },
    },
    cta: {
      title: "Sẵn sàng hiện đại hóa dry-lab của bạn?",
      titleAccent: "Bắt đầu trên Omicslab",
      paragraph:
        "Tạo tài khoản và chạy quy trình đầu tiên, hoặc liên hệ để di chuyển quy trình, thiết lập HPC và trao đổi về dịch vụ tin sinh học tùy chỉnh.",
      button: "Liên hệ hợp tác",
    },
    faq: {
      subtitle: "Câu hỏi thường gặp",
      title: "Giải đáp các câu hỏi thường gặp",
      paragraph:
        "Những câu hỏi chúng tôi nhận được nhiều nhất về nền tảng, hạ tầng và chi phí.",
      items: [
        {
          question: "Omicslab là gì?",
          answer:
            "Omicslab là dịch vụ tin sinh học dry-lab toàn diện: nền tảng giúp bạn quản lý người dùng, dữ liệu, công cụ và hạ tầng tính toán, cộng thêm dịch vụ chuyên môn khi cần phân tích theo yêu cầu. Tạo tổ chức, kết nối hạ tầng, chọn quy trình và chạy — mọi thứ cùng một nơi.",
        },
        {
          question: "Omicslab có hoạt động ngoài Việt Nam không?",
          answer:
            "Hiện tại Vieomics **chỉ vận hành Nền tảng Omicslab tại Việt Nam** và làm việc với **người Việt Nam hoặc người sinh sống tại Việt Nam**, cùng các hợp tác đa quốc gia. Dữ liệu và tính toán do Vieomics cung cấp **được đặt tại Việt Nam**; chúng tôi chưa vận hành Nền tảng ở nước ngoài.",
        },
        {
          question: "Tôi đã có quy trình và hạ tầng riêng, có chuyển sang dùng được không?",
          answer:
            "Hoàn toàn được. Bạn vận hành nền tảng tại chỗ hoặc trên cloud riêng, đăng ký cụm HPC Slurm qua SDK, kết nối lưu trữ sẵn có rồi mang quy trình vào dưới dạng kho Git. Không cần viết lại từ đầu — chúng tôi đồng hành cùng bạn ở từng bước.",
        },
        {
          question: "Tôi có thể chạy những quy trình nào?",
          answer:
            "Từ các pipeline nf-core phổ biến như rnaseq, sarek, scrnaseq, chipseq, atacseq, methylseq, ampliseq, mag, taxprofiler và rnafusion, đến quy trình riêng của bạn — chỉ cần repo Git kèm script chạy và schema tham số. Báo cáo MultiQC và Nextflow hiển thị ngay trên trình duyệt, không cần cài thêm công cụ.",
        },
        {
          question: "Nền tảng hỗ trợ những cloud và hạ tầng nào?",
          answer:
            "Omicslab chạy được ở bất cứ đâu bạn cần: mọi cloud, cụm HPC Slurm riêng được đăng ký qua SDK, hoặc triển khai hoàn toàn tại chỗ. Chúng tôi hỗ trợ sẵn CloudFly và GreenNode tại Việt Nam, cùng lưu trữ mua theo gói hoặc mang theo của riêng bạn. Khi bạn chọn hạ tầng đặt tại Việt Nam, việc giữ khối lượng công việc trong nước được thiết kế để hỗ trợ, phù hợp với Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP. Môi trường tự vận hành và biệt lập có thể cung cấp theo yêu cầu.",
        },
        {
          question: "Tôi có cần tự chuẩn bị hạ tầng không?",
          answer:
            "Không. Chỉ cần trả phí, bạn nhận ngay tính toán, lưu trữ và thư viện quy trình sẵn sàng để chạy. Đăng ký tại platform.omicslab.io — không cần thẻ tín dụng.",
        },
        {
          question: "Dữ liệu của tôi được lưu ở đâu?",
          answer:
            "Trong dung lượng lưu trữ bạn chọn. Lưu trữ là dịch vụ lưu trữ đối tượng tương thích S3, nên có thể là CloudFly/VNG, bucket riêng của bạn, hoặc Amazon S3 — AWS Hanoi Local Zone đã hoạt động chính thức từ tháng 6 năm 2026, cho phép dữ liệu S3 được lưu tại Việt Nam. Với lưu trữ và tính toán do Vieomics cung cấp, phiên bản theo khu vực được thiết kế để giữ dữ liệu của khách hàng trong lãnh thổ Việt Nam, không chuyển dữ liệu qua biên giới, phù hợp với Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP về chuyển dữ liệu xuyên biên giới và đánh giá tác động xử lý dữ liệu. Khi bạn kết nối lưu trữ, cloud hoặc máy chủ của riêng mình (BYOC), vị trí dữ liệu phụ thuộc vào hạ tầng do bạn lựa chọn và vận hành — Vieomics không kiểm soát hay bảo đảm vị trí đó.",
        },
        {
          question: "Chi phí như thế nào?",
          answer:
            "Chi phí phụ thuộc gói, dung lượng lưu trữ và mức sử dụng tính toán. Hãy liên hệ để nhận báo giá — chúng tôi có cả gói trả phí theo mức sử dụng và hợp đồng theo dự án.",
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
          designation:
            "Founder @ Vieomics | Ex-DNAnexus | Scaling Multi-Omics Infrastructure & AI",
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
    terminologyNote:
      "Bioinformatics có rất nhiều thuật ngữ chuyên ngành. Các thuật ngữ được giữ nguyên tiếng Anh để bảo toàn trọn vẹn ý nghĩa gốc.",
    guides: {
      title: "Hướng dẫn hạ tầng",
      paragraph:
        "Các hướng dẫn kỹ thuật để thiết lập và quản lý hạ tầng HPC. Mỗi hướng dẫn có thể được tùy chỉnh theo yêu cầu cụ thể của bạn.",
    },
    topics: {
      title: "Chủ đề blog",
      subtitle: "Toàn bộ bài viết, nhóm theo chủ đề",
      description:
        "Tất cả bài viết của Omicslab được gom theo một số chủ đề, để có thể đọc trọn một mảng nội dung hoặc một chuỗi bài.",
      intro:
        "Các bài viết được nhóm theo chủ đề bên dưới. Với chủ đề gồm nhiều bài, thứ tự trong chuỗi được hiển thị để đọc lần lượt.",
      columnPost: "Bài viết",
      columnSeries: "Chuỗi bài",
      columnDate: "Ngày",
      postsSuffix: "bài",
      browseAll: "Xem tất cả bài viết",
      browseTopics: "Xem theo chủ đề",
    },
  },
  solutions: {
    index: {
      title: "Giải pháp",
      subtitle: "Giải pháp tin sinh học cho nghiên cứu đa omics",
      paragraph:
        "Sử dụng menu điều hướng để truy cập: Nền tảng Omicslab và Giải pháp tùy chỉnh.",
      metadataDescription:
        "Giải pháp tin sinh học cho phân tích đa omics, quản lý dữ liệu và thực thi quy trình.",
    },
    dataPlatform: {
      metadataTitle: "Nền tảng Omicslab",
      metadataDescription:
        "Omicslab - Nền tảng nghiên cứu tin sinh học cho quản lý dữ liệu, HPC và thực thi công cụ.",
      title: "Nền tảng Omicslab",
      subtitle: "Omicslab — nền tảng nghiên cứu tin sinh học toàn diện",
      intro:
        "Nghiên cứu tin sinh học thường bị phân mảnh do phải qua nhiều bước rời rạc — từ tải dữ liệu, cài đặt công cụ, chạy tác vụ trên cụm máy đến theo dõi kết quả rải rác ở nhiều nơi, khiến việc tái lập kết quả gặp rất nhiều khó khăn. Omicslab giải quyết triệt để vấn đề này bằng cách gom tất cả về một nền tảng duy nhất, nơi lưu trữ dữ liệu, thư viện công cụ và tài nguyên tính toán vận hành liền mạch cùng nhau.\n\nVới Omicslab, quản trị viên chỉ cần kết nối hệ thống một lần cho toàn tổ chức — bao gồm thông tin xác thực, nhà cung cấp cloud hay cụm máy HPC — rồi phân quyền theo từng vai trò (quản trị, cộng tác hoặc chỉ xem). Chuyên viên phân tích chỉ việc chọn công cụ, điền tham số theo biểu mẫu, bấm chạy và theo dõi log trực tiếp ngay trên giao diện web. Mọi cấu hình lượt chạy, nhật ký hoạt động và chi phí liên quan đều được lưu trữ đầy đủ, giúp bạn dễ dàng tái lập kết quả bất cứ lúc nào.",
      note: [
        { strong: "Lưu ý:" },
        { text: " Dùng thử hoặc cần hỗ trợ, liên hệ " },
        {
          link: { href: "mailto:contact@omicslab.io", text: "contact@omicslab.io" },
        },
        { text: "." },
      ] as TextSegment[],
      promo: {
        eyebrow: "Redeem · Mã khuyến mãi",
        title: "10.000 VND credit cho gói Individual",
        paragraph:
          "Nhập mã ở ô mã khuyến mãi khi đăng ký gói Individual để nhận 10.000 VND credit. Mã được giới hạn cho 100 suất.",
        codeLabel: "Mã khuyến mãi",
        code: "WELCOME2VIEOMICS",
        copyLabel: "Sao chép mã",
        copiedLabel: "Đã sao chép",
        details: [
          { label: "Gói áp dụng", value: "Individual" },
          { label: "Giá trị", value: "10.000 VND credit" },
          { label: "Số lượng", value: "100 suất" },
        ],
        cta: "Đăng ký gói Individual",
        ctaHref: "https://platform.omicslab.io",
        note: [
          {
            text: "Mã được nhập trong hộp thoại đăng ký gói Individual. Xem ",
          },
          { link: { href: "/policies/pricing", text: "Chính sách giá" } },
          { text: " để biết cách áp dụng khuyến mại." },
        ] as TextSegment[],
      },
      pricing: {
        title: "Bảng giá",
        subscription,
        topup,
        usageCosts,
        trialNote: [
          { strong: "Lưu ý:" },
          {
            text: " Các mức giá dành cho hình thức tự phục vụ. Theo tài liệu hướng dẫn của nền tảng, bạn tự tạo và chạy phân tích — Vieomics không nhận dữ liệu của bạn, chạy toàn bộ thay bạn rồi trả lại kết quả. Nếu bạn muốn dịch vụ trọn gói, xem ",
          },
          {
            link: {
              href: "/solutions/custom-solutions",
              text: "Giải pháp tùy chỉnh",
            },
          },
          { text: ". Dùng thử hoặc cần hỗ trợ, liên hệ " },
          {
            link: {
              href: "mailto:contact@omicslab.io",
              text: "contact@omicslab.io",
            },
          },
          { text: "." },
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
                item: "Lắp ráp hệ gen vi khuẩn (quy trình OmicsLab tùy chỉnh)",
                unitPrice: "100.000 VND/mẫu",
                qty: "100",
                subtotal: "10.000.000 VND",
              },
              {
                item: "Điện toán (16 CPU / 32 GB trên GreenNode)",
                unitPrice: "8.868 VND/giờ",
                qty: "~200 giờ",
                subtotal: "~1.773.600 VND",
              },
              {
                item: "Gói sử dụng nền tảng",
                unitPrice: "1.000.000 VND/tháng",
                qty: "1",
                subtotal: "1.000.000 VND",
              },
              {
                item: "Lưu trữ (Object Storage)",
                unitPrice: "500 VND/GB",
                qty: "~5 GB/mẫu × 100 = ~500 GB",
                subtotal: "~250.000 VND",
              },
            ],
            totalLabel: "Tổng ước tính / tháng",
            total: "~13.023.600 VND (~3.023.600 VND nếu dùng nf-core/bacass)",
            footnote: [
              {
                text: "* Ước tính dựa trên khối lượng công việc lắp ráp hệ gen vi khuẩn thông thường. Chi phí thực tế có thể thay đổi. ",
              },
              { link: { href: "/contact", text: "Liên hệ với chúng tôi" } },
              {
                text: " để nhận báo giá chính xác. Mới bắt đầu? Xem hướng dẫn từng bước: ",
              },
              {
                link: {
                  href: "/blogs/how-to-run-nf-core-pipelines-on-omicslab",
                  text: "Cách chạy pipeline nf-core trên nền tảng Omicslab",
                },
              },
              { text: " và " },
              {
                link: {
                  href: "/blogs/bacterial-genome-assembly-without-coding",
                  text: "Xây dựng bộ genome vi khuẩn không cần lập trình",
                },
              },
              { text: "." },
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
                item: "Phân tích 16S rRNA (quy trình OmicsLab tùy chỉnh)",
                unitPrice: "100.000 VND/mẫu",
                qty: "100",
                subtotal: "10.000.000 VND",
              },
              {
                item: "Điện toán (16 CPU / 32 GB trên GreenNode)",
                unitPrice: "8.868 VND/giờ",
                qty: "~50 giờ",
                subtotal: "~443.400 VND",
              },
              {
                item: "Gói sử dụng nền tảng",
                unitPrice: "1.000.000 VND/tháng",
                qty: "1",
                subtotal: "1.000.000 VND",
              },
              {
                item: "Lưu trữ (Object Storage)",
                unitPrice: "500 VND/GB",
                qty: "~100 MB/mẫu × 100 = ~10 GB",
                subtotal: "~5.000 VND",
              },
            ],
            totalLabel: "Tổng ước tính / tháng",
            total: "~11.448.400 VND (~1.448.400 VND nếu dùng nf-core/ampliseq)",
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
            title: "Tổ chức",
            paragraph:
              "Tạo và quản lý tổ chức cùng thành viên, vai trò và thông tin xác thực. Hỗ trợ phân tích độc lập và tái lập giữa các nhóm với tài nguyên tính toán riêng của tổ chức.",
          },
          {
            title: "Tích hợp tính toán",
            paragraph:
              "Kết nối tới cụm HPC Slurm cho các phân tích đòi hỏi tính toán lớn. Tác vụ được khởi chạy và giám sát qua giao diện web thân thiện.",
          },
          {
            title: "Tích hợp công cụ",
            paragraph:
              "Dễ dàng tích hợp và thực thi các quy trình do cộng đồng phát triển (như nf-core) cũng như quy trình tùy chỉnh. Hỗ trợ phân tích dữ liệu đa omics.",
          },
          {
            title: "Lưu trữ dữ liệu",
            paragraph:
              "Lưu trữ an toàn, dễ mở rộng cho các tập dữ liệu. Tổ chức dữ liệu theo dự án, loại và phân tích. Dữ liệu thô hoặc đã xử lý có thể được lưu trữ và chia sẻ bằng phân quyền theo vai trò (RBAC), trong đó nguồn dữ liệu có thể được đăng ký với dịch vụ xác thực lưu trữ đối tượng.",
          },
        ],
      },
      gettingStarted: {
        title: "Bắt đầu nhanh",
        steps: [
          "Tạo tổ chức",
          "Thanh toán gói sử dụng",
          "Nạp tiền vào ví",
          "Tạo workspace",
          "Tải dữ liệu lên",
          "Chọn dữ liệu để chạy quy trình",
          "Chờ quy trình hoàn tất và xem kết quả",
        ],
        notes: [
          "Có thể tự động kích hoạt quy trình cho các cohort.",
          "Dữ liệu có thể được cấu hình đồng bộ từ máy giải trình tự.",
        ],
        videoTitle: "Omicslab Platform - Nền tảng phân tích tin sinh học",
      },
    },
    pipelines: {
      metadataTitle: "Giải pháp tùy chỉnh",
      metadataDescription:
        "Dịch vụ tin sinh học và nền tảng theo yêu cầu: xây dựng HPC và tích hợp với nền tảng, triển khai nền tảng riêng, phát triển và tích hợp quy trình.",
      title: "Giải pháp tùy chỉnh",
      subtitle:
        "Giải pháp Omicslab tùy chỉnh đáp ứng chính xác mọi yêu cầu tin sinh học đặc thù.",
      intro:
        "Bạn chỉ cần mô tả bài toán và mục tiêu, chúng tôi sẽ cùng thiết kế, phát triển và bàn giao hệ thống hoàn chỉnh.",
      searchPlaceholder: "Tìm kiếm giải pháp tùy chỉnh...",
      available: {
        title: "Tùy theo nhu cầu, bạn có thể chọn:",
        categories: [
          {
            title: "Phát triển quy trình (pipeline)",
            paragraph:
              "Lập trình và tích hợp các công cụ phân tích mới vào hệ thống hiện có.",
          },
          {
            title: "Triển khai & Tối ưu hạ tầng",
            paragraph:
              "Dựng cụm HPC, cấu hình lưu trữ đối tượng tương thích S3 chuyên dụng cho dữ liệu Omics, hoặc thiết lập hạ tầng Cloud riêng.",
          },
          {
            title: "Nền tảng riêng",
            paragraph:
              "Triển khai phiên bản Omicslab độc lập dành riêng cho người dùng của bạn.",
          },
        ],
      },
      software: {
        title: "Các khối xây dựng mã nguồn mở",
        paragraph:
          "Công việc tùy chỉnh ở trên được xây trên những công cụ chúng tôi duy trì công khai. Đó là điểm khởi đầu của hầu hết hợp tác thay vì làm từ đầu, và chúng vẫn thuộc về đội của bạn sau bàn giao.",
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
      "Dịch vụ tin sinh học dry-lab toàn diện. Quản lý người dùng, dữ liệu, công cụ và tính toán trên một nền tảng — di chuyển quy trình với công sức tối thiểu hoặc trả phí để có mọi thứ sẵn sàng.",
    home: {
      title: "Omicslab",
      description:
        "Dịch vụ tin sinh học dry-lab toàn diện. Quản lý người dùng, dữ liệu, công cụ và tính toán trên một nền tảng — di chuyển quy trình với công sức tối thiểu hoặc trả phí để có mọi thứ sẵn sàng.",
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
    guide: {
      title: "Hướng dẫn sử dụng",
      description:
        "Hướng dẫn từng bước sử dụng Nền tảng Omicslab: tổ chức, thanh toán, workspace, phân tích, Studio và hỗ trợ.",
    },
    privacy: {
      title: "Chính sách bảo mật",
      description:
        "Cách Omicslab thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân theo quy định của pháp luật Việt Nam và các tiêu chuẩn bảo mật quốc tế.",
    },
    terms: {
      title: "Điều khoản Dịch vụ",
      description: "Các điều khoản điều chỉnh việc bạn sử dụng Nền tảng Omicslab.",
    },
  },
};
