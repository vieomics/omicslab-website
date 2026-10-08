import type { Policies } from "./en";

/**
 * Vietnamese mirror of policies/en.ts. The explicit `Policies` annotation
 * makes the build fail when a key or section is missing or renamed.
 */
export const policiesVi: Policies = {
  shared: {
    lastUpdatedLabel: "Cập nhật lần cuối",
    lastUpdated: "9 tháng 10 năm 2026",
    tocLabel: "Trong trang này",
    policiesLabel: "Chính sách",
  },

  privacy: {
    kicker: "Pháp lý",
    title: "Chính sách Bảo vệ Dữ liệu Cá nhân & Quyền riêng tư",
    navTitle: "Chính sách Quyền riêng tư",
    description:
      "Chào mừng bạn đến với Nền tảng phân tích dữ liệu tin sinh học Omicslab — sản phẩm do CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS vận hành. Chúng tôi cam kết bảo vệ dữ liệu cá nhân và dữ liệu bạn xử lý trên Nền tảng theo quy định của pháp luật Việt Nam (Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Nghị định 356/2025/NĐ-CP, Luật An ninh mạng) và các tiêu chuẩn bảo mật quốc tế.",
    sections: [
      {
        id: "controller",
        title: "1. Định nghĩa, Vai trò Xử lý Dữ liệu và Hạ tầng Lưu trữ",
        blocks: [
          {
            type: "label",
            text: "Định nghĩa Thuật ngữ",
          },
          {
            type: "p",
            text: "**Nền tảng Omicslab (Omicslab Platform):** là sản phẩm phần mềm — nền tảng phân tích dữ liệu tin sinh học — do Vieomics phát triển và vận hành. Trong toàn bộ Chính sách này, các từ “Nền tảng” hoặc “Omicslab Platform” đều chỉ sản phẩm này.",
          },
          {
            type: "p",
            text: "**Vieomics (CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS):** là pháp nhân vận hành Nền tảng Omicslab và chịu trách nhiệm pháp lý về toàn bộ hoạt động thu thập, xử lý, lưu trữ và bảo vệ dữ liệu quy định tại Chính sách này (“chúng tôi”). Mọi cam kết, nghĩa vụ và trách nhiệm đối với dữ liệu cá nhân nêu dưới đây đều thuộc về Vieomics — không phải đối với thương hiệu “Omicslab”.",
          },
          {
            type: "p",
            text: "**Dữ liệu cá nhân:** là thông tin dưới dạng chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể, bao gồm dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm (theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định 356/2025/NĐ-CP).",
          },
          {
            type: "p",
            text: "**Dữ liệu của Người dùng (dữ liệu do Người dùng tải lên):** là toàn bộ tệp, dữ liệu và tài nguyên mà bạn (hoặc đơn vị của bạn) chủ động gửi, kết nối hoặc lưu trữ trên Nền tảng, bao gồm dữ liệu trong bộ nhớ đối tượng (Object Storage) và hạ tầng bạn tự tích hợp. Dữ liệu của Người dùng **không nhất thiết là dữ liệu cá nhân**: đó có thể là dữ liệu nghiên cứu thuần túy (vi sinh vật, thực vật, động vật, mẫu môi trường), hoặc **có chứa dữ liệu cá nhân của người khác**.",
          },
          {
            type: "p",
            text: "**Dữ liệu của Khách hàng:** là dữ liệu mà bạn (hoặc đơn vị của bạn) tải lên, kết nối, tạo ra hoặc xử lý trên Nền tảng. Dữ liệu của Khách hàng thuộc quyền kiểm soát của bạn và **không mặc nhiên được công khai**; đây là nhóm dữ liệu tách biệt với các bộ dữ liệu công khai/đối chuẩn được mô tả tại Mục 3.",
          },
          {
            type: "p",
            text: "**Bộ dữ liệu công khai / đối chuẩn (Public / Benchmark Dataset):** là bộ dữ liệu mà Vieomics có thể cung cấp từ các kho dữ liệu công cộng quốc tế, cơ sở dữ liệu khoa học truy cập mở, các nguồn công khai hợp pháp khác, hoặc dữ liệu mô phỏng hay được chuẩn bị cho mục đích đối chuẩn. Bộ dữ liệu công khai/đối chuẩn **không phải là dữ liệu của Khách hàng** và được quy định riêng tại Mục 3.",
          },
          {
            type: "p",
            text: "**Dữ liệu cá nhân không thuộc về chính Người dùng:** bạn được phép tải lên dữ liệu cá nhân của người khác — ví dụ dữ liệu bệnh nhân mà Phòng lab, Bệnh viện hoặc Viện nghiên cứu của bạn đại diện. Trong trường hợp này, bạn là **Bên Kiểm soát Dữ liệu** đối với dữ liệu đó và chịu trách nhiệm về căn cứ thu thập, việc lấy sự đồng ý, việc giả danh hóa (pseudonymisation) và xử lý hợp pháp; Vieomics chỉ đóng vai trò **Bên Xử lý** theo chỉ dẫn của bạn (chi tiết tại Mục 2).",
          },
          {
            type: "label",
            text: "Phân định Vai trò Pháp lý",
          },
          {
            type: "p",
            text: "**Bên Kiểm soát Dữ liệu Cá nhân:** Nền tảng Omicslab được vận hành bởi CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS (“chúng tôi”). Chúng tôi đóng vai trò là Bên Kiểm soát Dữ liệu Cá nhân đối với các thông tin thu thập nhằm mục đích vận hành, quản lý dịch vụ (bao gồm: dữ liệu tài khoản, dữ liệu sử dụng và dữ liệu kỹ thuật).",
          },
          {
            type: "p",
            text: "**Bên Xử lý Dữ liệu:** Đối với dữ liệu nghiên cứu và dữ liệu sinh học do bạn (hoặc đơn vị của bạn) chủ động tải lên Nền tảng Omicslab, bạn giữ vai trò là Bên Kiểm soát Dữ liệu. Chúng tôi chỉ đóng vai trò là Bên Xử lý Dữ liệu — vận hành Nền tảng và thực hiện các tác vụ tính toán, lưu trữ theo chỉ dẫn, thiết lập và yêu cầu của bạn. Khi đóng vai trò Bên Xử lý, chúng tôi xử lý dữ liệu của Khách hàng theo chỉ dẫn bằng văn bản của bạn và theo thỏa thuận dịch vụ hiện hành, đồng thời vẫn chịu trách nhiệm đối với các nghĩa vụ của chính mình theo pháp luật hiện hành và các cam kết hợp đồng.",
          },
          {
            type: "label",
            text: "Hạ tầng Lưu trữ và Xử lý Dữ liệu Người / Liên quan đến Sức khỏe (Theo từng Dự án)",
          },
          {
            type: "p",
            text: "Trường hợp Khách hàng tải lên hoặc xử lý dữ liệu y sinh thu được từ mẫu người (ví dụ: NIPT, WES, WGS, RNA-Seq người hoặc hồ sơ di truyền), các khối lượng công việc này được xử lý theo **từng dự án / từng khách hàng doanh nghiệp**. Việc xử lý như vậy có thể cần các thỏa thuận riêng, biện pháp kiểm soát kỹ thuật, điều khoản xử lý dữ liệu và việc rà soát tuân thủ trước khi đưa vào vận hành. Với các dự án nhạy cảm, vị trí dữ liệu, hạ tầng, kiểm soát truy cập và phương thức xử lý có thể được thỏa thuận riêng; tùy dự án, các yếu tố này có thể sử dụng hạ tầng do Vieomics quản lý, do Khách hàng quản lý, hoặc do một đối tác được chỉ định quản lý, trong mọi trường hợp đều phải tuân theo các biện pháp bảo vệ và cam kết hợp đồng mà pháp luật hiện hành yêu cầu.",
          },
          {
            type: "label",
            text: "Hạ tầng Do Người dùng Tự Quản lý (Bring Your Own Cloud – BYOC)",
          },
          {
            type: "p",
            text: "Trường hợp bạn chủ động kết nối, tích hợp tài khoản lưu trữ hoặc máy chủ phân tích riêng (API/Credentials cá nhân) vào Nền tảng Omicslab, bạn chịu trách nhiệm về tính bảo mật, quyền truy cập và an toàn dữ liệu trên hạ tầng do bạn tự quản lý đó. Trong giới hạn pháp luật cho phép, chúng tôi không chịu trách nhiệm đối với sự cố phát sinh từ hệ thống do bạn tự quản lý. Điều này không ảnh hưởng đến các nghĩa vụ của chính chúng tôi theo pháp luật hiện hành hoặc theo thỏa thuận riêng với bạn.",
          },
        ],
      },
      {
        id: "collect",
        title: "2. Dữ liệu Thu thập & Quy định Trách nhiệm theo Loại Dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi thu thập và phân loại dữ liệu theo các nhóm sau:",
          },
          {
            type: "ul",
            items: [
              "**Dữ liệu tài khoản:** Họ và tên đại diện, địa chỉ email, số điện thoại, địa chỉ liên hệ/hóa đơn, thông tin xác thực đăng nhập và các thiết lập tùy chỉnh tài khoản.",
              "**Dữ liệu sử dụng dịch vụ:** Nhật ký hoạt động (log files) trên Nền tảng, bao gồm các tiến trình phân tích (jobs), lịch sử lưu trữ, dung lượng sử dụng — phục vụ cho việc đối soát thanh toán, kiểm toán hệ thống và hỗ trợ kỹ thuật.",
              "**Dữ liệu kỹ thuật:** Địa chỉ IP, thông tin trình duyệt, loại thiết bị và thông tin kết nối — nhằm bảo đảm an toàn thông tin, phòng chống tấn công mạng và chẩn đoán lỗi.",
              "**Dữ liệu truy cập Website:** Dữ liệu lưu lượng truy cập tổng hợp thu thập qua Google Analytics trên **trang web này (landing page)** — Nền tảng không sử dụng Google Analytics — nhằm cải thiện trải nghiệm người dùng, được xử lý như mô tả tại Mục 11.",
              {
                text: "**Dữ liệu Phân tích Tin sinh học (tải lên hoặc xử lý trên hệ thống):**",
                children: [
                  "**Dữ liệu Phi người (Vi sinh vật, Thực vật, Động vật, Mẫu môi trường):** nhìn chung được xác định là dữ liệu nghiên cứu khoa học. Trong trường hợp thông thường và với điều kiện dữ liệu không chứa dữ liệu cá nhân, đây không phải là dữ liệu cá nhân theo Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP. Người dùng có thể tải lên, lưu trữ và phân tích dữ liệu này mà không cần áp dụng các thủ tục về dữ liệu cá nhân, trừ khi dữ liệu có chứa dữ liệu cá nhân.",
                  {
                    text: "**Dữ liệu Người / Liên quan đến Sức khỏe (dữ liệu y sinh thu được từ mẫu người):** khi Khách hàng lựa chọn tải lên hoặc xử lý dữ liệu bộ gen hoặc dữ liệu liên quan đến sức khỏe của người — ví dụ kết quả xét nghiệm di truyền trước sinh không xâm lấn (NIPT), giải trình tự toàn bộ vùng mã ngoại (WES), giải trình tự toàn bộ bộ gen (WGS), giải trình tự RNA trên mẫu người (RNA-Seq), hoặc hồ sơ di truyền và dữ liệu bộ gen lâm sàng của bệnh nhân — dữ liệu đó có thể là **dữ liệu cá nhân nhạy cảm** theo Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP. Vieomics không chủ động thu thập loại dữ liệu này từ công chúng, và các khối lượng công việc như vậy được xử lý theo **từng dự án / từng khách hàng doanh nghiệp**, tùy theo các thỏa thuận riêng, biện pháp kiểm soát kỹ thuật và việc rà soát tuân thủ. Chúng tôi không tìm cách định danh cá nhân và không yêu cầu truy cập danh tính thực đằng sau một Sample ID. Khi dữ liệu như vậy được xử lý:",
                    children: [
                      "**Mã định danh giả danh (Pseudonymous identifiers):** Khách hàng được khuyến nghị chỉ gắn một mã định danh kỹ thuật (Sample ID) và tránh đưa các định danh trực tiếp — như họ tên, số CCCD/hộ chiếu, ngày sinh hoặc mã hồ sơ bệnh án — vào tên file, metadata mẫu hoặc tham số phân tích, trừ khi điều đó là cần thiết cho một mục đích hợp pháp.",
                      "**Không mặc nhiên là ẩn danh:** dữ liệu chỉ gắn Sample ID là dữ liệu **đã được giả danh hóa, không nhất thiết đã ẩn danh hoàn toàn**. Một Sample ID kỹ thuật tự nó không làm cho bộ dữ liệu bộ gen trở thành ẩn danh hoàn toàn, vì dữ liệu vẫn có thể liên kết được với một cá nhân — ví dụ thông qua thông tin ánh xạ của Khách hàng hoặc thông qua chính dữ liệu. Chúng tôi không mô tả các bộ dữ liệu này là ẩn danh hoàn toàn.",
                      "**Sự đồng ý và căn cứ pháp lý:** Khách hàng (phòng lab, bệnh viện, viện nghiên cứu hoặc tổ chức khác) chịu trách nhiệm bảo đảm có căn cứ pháp lý hợp lệ và, khi được yêu cầu, có sự đồng ý và chấp thuận đạo đức cần thiết trước khi dữ liệu bộ gen hoặc dữ liệu liên quan đến sức khỏe của người được tải lên hoặc phân tích.",
                      "**Thông tin ánh xạ:** mọi khóa liên kết Sample ID với danh tính thực của một cá nhân, nếu có, nên nằm dưới sự kiểm soát của Khách hàng và không phải là thông tin chúng tôi yêu cầu. Khi việc tách biệt này được cấu hình về mặt kỹ thuật, các khóa ánh xạ của Khách hàng được giữ tách biệt khỏi môi trường phân tích, và chúng tôi không sử dụng chúng để định danh cá nhân. Điều này không giới hạn các nghĩa vụ của chính chúng tôi theo pháp luật hiện hành hoặc theo thỏa thuận riêng.",
                      "**Yêu cầu bổ sung:** các dự án dữ liệu bộ gen hoặc dữ liệu liên quan đến sức khỏe của người mang tính **theo từng dự án** và có thể cần các điều khoản xử lý dữ liệu riêng, biện pháp kiểm soát kỹ thuật, cấu hình theo khu vực và việc rà soát tuân thủ trước khi đưa vào vận hành.",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "public-datasets",
        title: "3. Bộ dữ liệu Công khai và Đối chuẩn",
        blocks: [
          {
            type: "p",
            text: "Ngoài việc xử lý dữ liệu của Khách hàng, Vieomics có thể cung cấp quyền truy cập các bộ dữ liệu công khai, truy cập mở, dữ liệu mô phỏng hoặc dữ liệu đối chuẩn nhằm hỗ trợ trình diễn, giáo dục, nghiên cứu, đối chuẩn, và kiểm thử, xác thực quy trình phân tích cũng như chức năng của nền tảng.",
          },
          {
            type: "ul",
            items: [
              "**Nguồn dữ liệu:** các bộ dữ liệu này có thể được lấy từ các kho dữ liệu công cộng quốc tế, cơ sở dữ liệu khoa học truy cập mở, các nguồn công khai hợp pháp khác, và có thể bao gồm dữ liệu mô phỏng hoặc đối chuẩn.",
              "**Không nhất thiết do Vieomics thu thập:** khi một bộ dữ liệu được lấy từ kho công cộng hoặc nguồn hợp pháp khác, Vieomics không nhất thiết thu thập dữ liệu gốc trực tiếp từ các cá nhân liên quan và cũng không nhất thiết là bên kiểm soát hoặc bên thu thập dữ liệu gốc của bộ dữ liệu đó.",
              "**Nguồn gốc và giấy phép:** việc sử dụng các bộ dữ liệu này phụ thuộc vào giấy phép, yêu cầu ghi nguồn và điều khoản sử dụng của kho hoặc nguồn tương ứng. Khi áp dụng, thông tin về nguồn gốc và giấy phép được cung cấp kèm theo bộ dữ liệu.",
              "**Mục đích sử dụng:** các bộ dữ liệu này dành cho trình diễn, giáo dục, nghiên cứu, đối chuẩn và kiểm thử quy trình hoặc nền tảng. Chúng không được trình bày như dữ liệu của Khách hàng và không được nhầm lẫn với dữ liệu riêng của Khách hàng.",
              "**Không chuyển đổi dữ liệu Khách hàng:** dữ liệu riêng của Khách hàng không bị công khai và không bị chuyển thành bộ dữ liệu công khai hoặc đối chuẩn, trừ khi Khách hàng đã cho phép riêng và việc đó được pháp luật cho phép. Vieomics không công bố, phân phối lại hoặc tái sử dụng dữ liệu của Khách hàng như một bộ dữ liệu công khai nếu không có sự cho phép đó.",
            ],
          },
        ],
      },
      {
        id: "bases",
        title: "4. Căn cứ pháp lý xử lý dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi tiến hành xử lý dữ liệu cá nhân dựa trên các căn cứ pháp lý quy định tại Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP (và các quy định pháp luật liên quan):",
          },
          {
            type: "ul",
            items: [
              "**Thực hiện hợp đồng:** Xử lý dữ liệu tài khoản, thanh toán để cung cấp, vận hành các dịch vụ và tính năng mà bạn đã đăng ký sử dụng.",
              "**Sự đồng ý của chủ thể dữ liệu:** Áp dụng khi bạn đăng ký nhận các thông báo, bản tin chuyên môn hoặc cập nhật tính năng.",
              "**Nghĩa vụ pháp lý:** Thực hiện lưu trữ dữ liệu hoặc cung cấp thông tin theo yêu cầu của cơ quan nhà nước có thẩm quyền theo quy định của pháp luật Việt Nam.",
              "**Bảo vệ an toàn thông tin:** Thực hiện các biện pháp kỹ thuật nhằm phòng chống gian lận, truy cập trái phép và bảo vệ hạ tầng của Omicslab.",
            ],
          },
        ],
      },
      {
        id: "use",
        title: "5. Mục đích sử dụng dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Dữ liệu cá nhân được sử dụng để: khởi tạo và quản lý tài khoản, xác thực người dùng, cung cấp hạ tầng phân tích tin sinh, bảo đảm an ninh mạng, phát hành hóa đơn thanh toán và hỗ trợ kỹ thuật.",
          },
          {
            type: "p",
            text: "Chúng tôi cam kết:",
          },
          {
            type: "ul",
            items: [
              "Không bán, cho thuê hay thương mại hóa dữ liệu cá nhân của người dùng dưới bất kỳ hình thức nào.",
              "Không truy cập, khai thác hay chia sẻ dữ liệu của Khách hàng (bao gồm dữ liệu nghiên cứu và dữ liệu người đã giả danh hóa) cho bất kỳ mục đích nào khác ngoài việc thực hiện dịch vụ phân tích do bạn yêu cầu. Chúng tôi không công bố dữ liệu riêng của Khách hàng trừ khi bạn đã cho phép riêng và việc đó được pháp luật cho phép.",
            ],
          },
        ],
      },
      {
        id: "retention",
        title: "6. Thời gian lưu trữ dữ liệu",
        blocks: [
          {
            type: "ul",
            items: [
              "**Dữ liệu tài khoản:** Được lưu trữ trong suốt thời gian tài khoản hoạt động. Sau khi tài khoản chấm dứt, tài khoản và dữ liệu liên quan chỉ bị **vô hiệu hóa (deactivated)** và được lưu giữ trong thời hạn mà pháp luật yêu cầu (thời hiệu khiếu nại, nghĩa vụ lưu trữ hồ sơ, chứng từ và hóa đơn), để bảo đảm khả năng truy xuất, tra cứu thời điểm phát sinh vấn đề, tranh chấp hoặc sự cố pháp lý khi có yêu cầu của cơ quan có thẩm quyền hoặc của các bên liên quan. Hết thời hạn đó, dữ liệu bị **xóa hoặc ẩn danh hóa** theo ngoại lệ đã nêu tại Mục 9.",
              "**Dữ liệu sử dụng & kiểm toán:** Lưu trữ theo thời hạn quy định của pháp luật về kế toán, thuế và an ninh mạng.",
              "**Dữ liệu nghiên cứu (Object Storage):** được lưu trữ trên dịch vụ lưu trữ đối tượng (Object Storage) của Marketplace theo mô hình **trả theo mức sử dụng, tính theo chu kỳ tháng (pay-as-you-go)** và chỉ có hiệu lực trong chu kỳ bạn đã trả. Nếu bạn không còn đăng ký bất kỳ gói dịch vụ nào hoặc không gia hạn chu kỳ lưu trữ, quyền truy cập workspace sẽ bị khóa, dữ liệu được giữ lại trong thời gian **ân hạn 1 tháng**, sau đó **bị dọn dẹp toàn bộ khỏi workspace** — chỉ nhật ký audit được giữ lại cho mục đích tra cứu. Bạn cũng có thể tự xóa dữ liệu bất cứ lúc nào trên Nền tảng, hoặc việc xóa được thực hiện theo thỏa thuận xử lý dữ liệu (DPA) đã ký kết.",
              "**Số dư Top-up (ví tiền tổ chức):** Số dư tiền nạp (top-up) chỉ có thể sử dụng khi tổ chức của bạn còn gói đăng ký hiệu lực. Khi gói đăng ký hết hạn hoặc bị hủy mà không có gia hạn đang chờ xử lý, **số dư còn lại bị thu hồi và đưa về 0** — số tiền nạp không thể tiếp tục sử dụng khi không còn gói dịch vụ. Tổ chức chưa từng đăng ký gói thì số dư (nếu có) không bị thu hồi. Việc thu hồi được rà soát tự động theo chu kỳ hằng ngày. Điều kiện thanh toán, email cảnh báo trước và các mốc thời hạn được nêu chi tiết tại Mục 13 [Điều khoản Dịch vụ](/terms).",
            ],
          },
        ],
      },
      {
        id: "security",
        title: "7. Biện pháp bảo mật dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi áp dụng các tiêu chuẩn bảo mật kỹ thuật và vận hành chặt chẽ để bảo vệ toàn bộ dữ liệu trên hệ thống:",
          },
          {
            type: "ul",
            items: [
              "Mã hóa toàn bộ dữ liệu trên đường truyền (TLS/SSL) và khi lưu trữ (Encryption at Rest).",
              "Phân quyền truy cập tối thiểu (RBAC), quản lý xác thực đa yếu tố (MFA) và ghi nhật ký hệ thống (Audit Logs).",
              "Cô lập theo từng Workspace, và tách biệt các khóa ánh xạ của Khách hàng khỏi môi trường phân tích khi được cấu hình về mặt kỹ thuật.",
              "Giám sát an ninh và phát hiện sự cố trên các tài nguyên do nền tảng quản lý, cùng với việc rà soát, đánh giá lỗ hổng bảo mật định kỳ.",
              "Chỉ những nhân sự được phân công và chịu cam kết bảo mật nghiêm ngặt mới có quyền truy cập thông tin hỗ trợ kỹ thuật khi có yêu cầu bằng văn bản từ bạn.",
            ],
          },
          {
            type: "p",
            text: "Các biện pháp này được **thiết kế theo hướng** phù hợp với GDPR (EU) và HIPAA (Hoa Kỳ) để nền tảng sẵn sàng cho các yêu cầu nghiêm ngặt hơn trong tương lai; tính đến ngày cập nhật của Chính sách này, Omicslab **chưa được chứng nhận** theo bất kỳ khung nào trong số đó.",
          },
          {
            type: "p",
            text: "Khi phát hiện vi phạm quy định bảo vệ dữ liệu cá nhân (rò rỉ, mất mát hoặc truy cập trái phép dữ liệu cá nhân), chúng tôi lập biên bản xác minh và **thông báo cho cơ quan chuyên trách bảo vệ dữ liệu cá nhân và cho chính chủ thể dữ liệu trong thời hạn 72 giờ kể từ thời điểm phát hiện**, đồng thời kích hoạt quy trình ứng phó sự cố nội bộ. Hồ sơ vụ việc được lưu trữ tối thiểu 5 năm kể từ ngày khắc phục xong sự cố.",
          },
          {
            type: "p",
            text: "Xem chi tiết các tiêu chuẩn tại trang [Bảo mật & Tuân thủ](/security).",
          },
        ],
      },
      {
        id: "sharing",
        title: "8. Chia sẻ và Chuyển giao dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Dữ liệu cá nhân chỉ được chia sẻ trong các trường hợp hạn chế sau:",
          },
          {
            type: "ul",
            items: [
              "**Bên cung cấp dịch vụ hạ tầng (Bên Xử lý):** Các đơn vị cung cấp hạ tầng máy chủ, cổng thanh toán… đã ký thỏa thuận bảo mật và xử lý dữ liệu với chúng tôi.",
              "**Cơ quan nhà nước:** Khi có yêu cầu bằng văn bản đúng thẩm quyền và trình tự pháp lý.",
            ],
          },
          {
            type: "p",
            text: "Dữ liệu của Khách hàng sẽ không bao giờ được chia sẻ cho bên thứ ba ngoại trừ trường hợp có chỉ định trực tiếp từ bạn, hoặc khi pháp luật yêu cầu. Chúng tôi không công bố, phân phối lại hoặc tái sử dụng dữ liệu của Khách hàng như một bộ dữ liệu công khai hoặc đối chuẩn nếu không có sự cho phép riêng và căn cứ pháp lý hợp lệ.",
          },
          {
            type: "p",
            text: "**Nhà cung cấp dịch vụ của trang web này:** (i) **Cloudflare Pages** — phân phối các file tĩnh của trang (chúng tôi không bật dịch vụ phân tích của Cloudflare); (ii) **Google Analytics** — chỉ chạy khi bạn chấp nhận cookie tại Mục 11; (iii) **DMCA.com** — hiển thị huy hiệu bảo vệ. Trong phạm vi Nền tảng, chúng tôi làm việc với đối tác hạ tầng Marketplace và cổng thanh toán, tất cả đều gắn kết bằng thỏa thuận xử lý dữ liệu (DPA).",
          },
        ],
      },
      {
        id: "rights",
        title: "9. Quyền của chủ thể dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Đối với dữ liệu cá nhân (thông tin tài khoản, thanh toán), theo quy định của pháp luật Việt Nam, bạn có đầy đủ các quyền sau:",
          },
          {
            type: "ul",
            items: [
              "Quyền được biết, quyền đồng ý hoặc rút lại sự đồng ý.",
              "Quyền truy cập, xem, chỉnh sửa hoặc yêu cầu hiệu chỉnh dữ liệu.",
              "Quyền yêu cầu xóa dữ liệu, hạn chế hoặc phản đối xử lý dữ liệu — trừ dữ liệu bắt buộc lưu trữ theo pháp luật hoặc cần giữ lại để giải quyết tranh chấp, sự cố pháp lý (xem Mục 6).",
              "Quyền yêu cầu cung cấp bản sao dữ liệu.",
              "Quyền khiếu nại, tố cáo hoặc yêu cầu bồi thường thiệt hại theo quy định của pháp luật.",
            ],
          },
          {
            type: "p",
            text: "Để thực hiện các quyền trên, bạn có thể thao tác trực tiếp tại phần Cài đặt tài khoản hoặc [liên hệ với chúng tôi](/contact). Chúng tôi sẽ phản hồi và xử lý yêu cầu của bạn trong thời hạn không quá 72 giờ làm việc kể từ khi nhận đủ thông tin hợp lệ.",
          },
        ],
      },
      {
        id: "transfers",
        title: "10. Lưu trữ và Chuyển dữ liệu ra nước ngoài",
        blocks: [
          {
            type: "p",
            text: "Dữ liệu có thể được lưu trữ và xử lý tại khu vực địa lý được cấu hình cho tổ chức hoặc dịch vụ tương ứng. Đối với các triển khai tại khu vực Việt Nam, dữ liệu được dự kiến lưu trữ và xử lý trên hạ tầng đặt tại Việt Nam, tùy theo cấu hình dịch vụ và các điều khoản hợp đồng áp dụng.",
          },
          {
            type: "p",
            text: "Khi dịch vụ hoặc đối tác hạ tầng đặt ngoài lãnh thổ Việt Nam, dữ liệu có thể được lưu trữ và xử lý ngoài Việt Nam tùy theo khu vực và cấu hình bạn lựa chọn. Khi dữ liệu cá nhân được chuyển ra nước ngoài và pháp luật Việt Nam yêu cầu, chúng tôi hoàn thành các thủ tục đánh giá tác động và chuyển dữ liệu áp dụng (hoặc dựa trên căn cứ pháp lý khác) và áp dụng các biện pháp bảo vệ mà pháp luật hiện hành và thỏa thuận riêng yêu cầu.",
          },
          {
            type: "p",
            text: "Khách hàng có yêu cầu cụ thể về vị trí dữ liệu, phương án hạ tầng hoặc biện pháp kiểm soát bổ sung cho các dự án nhạy cảm có thể thỏa thuận riêng với chúng tôi; thông tin liên hệ tại Mục 12 được áp dụng.",
          },
          {
            type: "p",
            text: "Trên **trang web này (landing page)** — bản thân Nền tảng không sử dụng Google Analytics — dữ liệu lưu lượng truy cập (bao gồm địa chỉ IP) được xử lý bởi nhà cung cấp phân tích của chúng tôi với tư cách nhà xử lý và không dùng cho mục đích quảng cáo. Dịch vụ này **chỉ chạy sau khi bạn bấm Chấp nhận** tại thông báo cookie (Mục 11); nếu bạn từ chối, không có dữ liệu nào như vậy được chuyển đi.",
          },
        ],
      },
      {
        id: "cookies",
        title: "11. Cookie và Công nghệ định danh",
        blocks: [
          {
            type: "p",
            text: "**Cookie thiết yếu:** dùng để duy trì trạng thái đăng nhập và bảo vệ tài khoản trên Nền tảng — thành phần bắt buộc, không cần đồng ý.",
          },
          {
            type: "p",
            text: "**Cookie phân tích (Google Analytics — trang web này):** dùng để xem lưu lượng truy cập ở mức tổng hợp. **Chỉ được bật sau khi bạn bấm “Chấp nhận”** ở thông báo cookie ở cuối trang; nếu bạn chọn “Từ chối”, Google Analytics không được tải và không cookie nào được tạo. Nền tảng Omicslab không sử dụng Google Analytics.",
          },
          {
            type: "p",
            text: "**Không có cookie quảng cáo:** chúng tôi không dùng cookie theo dõi quảng cáo của bên thứ ba.",
          },
          {
            type: "p",
            text: "**Bạn có thể thay đổi quyết định bất cứ lúc nào:** xóa cookie và dữ liệu trang web trong cài đặt trình duyệt — lần truy cập sau, thông báo sẽ hiện lại để bạn chọn lại.",
          },
        ],
      },
      {
        id: "contact",
        title: "12. Thông tin liên hệ",
        blocks: [
          {
            type: "p",
            text: "Mọi thắc mắc, đóng góp ý kiến hoặc yêu cầu hỗ trợ liên quan đến Quyền riêng tư & Bảo vệ dữ liệu cá nhân, vui lòng liên hệ:",
          },
          {
            type: "ul",
            items: [
              "Đơn vị chịu trách nhiệm pháp lý: **CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS**",
              "Đầu mối về bảo vệ dữ liệu cá nhân (DPO): **Nguyễn Tấn Thanh Giang** — **giangnguyen@omicslab.io**",
              "Trang web: Mục [Liên hệ](/contact)",
              "Email: **contact@omicslab.io** (Tiêu đề email vui lòng ghi rõ: “Yêu cầu về Quyền riêng tư”)",
            ],
          },
        ],
      },
    ],
  },
  terms: {
    kicker: "Pháp lý",
    title: "Điều khoản Dịch vụ",
    navTitle: "Điều khoản Dịch vụ",
    description:
      "Các Điều khoản này điều chỉnh việc bạn sử dụng Nền tảng Omicslab — nền tảng tin sinh học để lưu trữ, phân tích và chia sẻ dữ liệu nghiên cứu sinh học và bộ gen.",
    notice:
      "Khi truy cập hoặc sử dụng Nền tảng Omicslab, bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này. Nếu không đồng ý, vui lòng không sử dụng Nền tảng.",
    sections: [
      {
        id: "acceptance",
        title: "1. Chấp thuận Điều khoản",
        blocks: [
          {
            type: "p",
            text: "Các Điều khoản Dịch vụ này là thỏa thuận có ràng buộc pháp lý giữa bạn (**Người dùng**) và **CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS** (“**Công ty**”, “**chúng tôi**”) — pháp nhân vận hành Nền tảng Omicslab (“**Nền tảng**”). Khi tạo tài khoản, truy cập hoặc sử dụng Nền tảng, bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản này, [Chính sách Quyền riêng tư](/privacy) của chúng tôi và mọi chính sách khác được tham chiếu tại đây.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "2. Điều kiện và giới hạn độ tuổi",
        blocks: [
          {
            type: "p",
            text: "Bạn phải từ **đủ 18 tuổi** trở lên mới được tạo tài khoản hoặc sử dụng Nền tảng. Khi đăng ký, bạn cam kết mình từ 18 tuổi trở lên và có năng lực pháp lý để tham gia thỏa thuận có ràng buộc. Nền tảng không dành cho người chưa đủ 18 tuổi, và chúng tôi không chủ động thu thập dữ liệu cá nhân của người chưa thành niên. Nếu phát hiện người dùng dưới 18 tuổi, chúng tôi sẽ vô hiệu hóa tài khoản và xử lý dữ liệu cá nhân liên quan theo [Chính sách Quyền riêng tư](/privacy) — xóa hoặc ẩn danh hóa theo yêu cầu của pháp luật.",
          },
          {
            type: "p",
            text: "Nếu bạn sử dụng Nền tảng thay cho tổ chức, bạn cam kết có thẩm quyền và tổ chức đó bị ràng buộc bởi các Điều khoản này.",
          },
        ],
      },
      {
        id: "sensitive-data",
        title: "3. Dữ liệu nhạy cảm",
        blocks: [
          {
            type: "p",
            text: "Nền tảng có thể được dùng để lưu trữ, xử lý và phân tích **dữ liệu nhạy cảm**, bao gồm dữ liệu bộ gen, di truyền, liên quan đến sức khỏe và dữ liệu danh mục đặc biệt khác của người theo định nghĩa của pháp luật Việt Nam (tham chiếu thêm GDPR và HIPAA — các khung chuẩn mà Nền tảng đang hướng tới). Vì tính nhạy cảm của dữ liệu này, bạn đồng ý rằng:",
          },
          {
            type: "ul",
            items: [
              "Bạn đã có các chấp thuận đạo đức, sự đồng ý có hiểu biết và ủy quyền cần thiết để xử lý dữ liệu bạn tải lên, theo pháp luật hiện hành và các hội đồng đạo đức của tổ chức bạn.",
              "Bạn không tải lên dữ liệu thu thập từ những người chưa đồng ý xử lý cho nghiên cứu tin sinh học, trừ khi pháp luật cho phép.",
              "Bạn vẫn là người kiểm soát dữ liệu (hoặc người xử lý được ủy quyền theo thỏa thuận của riêng bạn) đối với dữ liệu bạn tải lên, và chịu trách nhiệm bảo đảm việc sử dụng tuân thủ mọi luật bảo vệ dữ liệu hiện hành, gồm Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và, khi áp dụng, GDPR hoặc HIPAA.",
              "Bạn không sử dụng Nền tảng để lưu trữ nội dung trái pháp luật hoặc dữ liệu mà việc xử lý xâm phạm quyền của bất kỳ người nào.",
            ],
          },
        ],
      },
      {
        id: "accounts",
        title: "4. Tài khoản và Bảo mật",
        blocks: [
          {
            type: "p",
            text: "Bạn chịu trách nhiệm bảo mật thông tin xác thực của mình và cho mọi hoạt động diễn ra dưới tài khoản. Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ truy cập trái phép hoặc nghi ngờ bị xâm phạm nào. Chúng tôi áp dụng các biện pháp kiểm soát bảo mật theo chuẩn ngành — gồm mã hóa khi truyền tải và khi lưu trữ, kiểm soát truy cập và ghi nhật ký kiểm toán — nhưng không hệ thống nào là không thể xâm nhập, và bạn phải tự bảo vệ thông tin xác thực của mình. Chi tiết được công bố tại trang [Bảo mật & Tuân thủ](/security).",
          },
        ],
      },
      {
        id: "acceptable-use",
        title: "5. Sử dụng được chấp nhận",
        blocks: [
          { type: "p", text: "Bạn đồng ý không sử dụng Nền tảng để:" },
          {
            type: "ul",
            items: [
              "Vi phạm bất kỳ luật, quy định hoặc quyền của bên thứ ba nào.",
              "Tải lên mã độc, cố gắng truy cập trái phép vào Nền tảng, hạ tầng của Nền tảng hoặc dữ liệu của người dùng khác.",
              "Sử dụng Nền tảng để xác định hoặc nhận diện lại cá nhân, hay phân biệt đối xử với bất kỳ người hoặc nhóm nào.",
              "Lách các giới hạn sử dụng, hạn ngạch hoặc biện pháp kiểm soát bảo mật, hoặc bán lại quyền truy cập Nền tảng mà không có giấy phép bằng văn bản.",
              "Can thiệp vào hoạt động hoặc khả năng sẵn có của Nền tảng.",
            ],
          },
        ],
      },
      {
        id: "data-protection",
        title: "6. Bảo vệ dữ liệu và Tuân thủ pháp luật",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi xử lý dữ liệu cá nhân theo Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15), Nghị định 356/2025/NĐ-CP và các quy định tương đương. Các hệ thống và quy trình của chúng tôi cũng được **thiết kế theo hướng** phù hợp với GDPR (EU) và HIPAA (Hoa Kỳ) khi hai khung này đi vào áp dụng với chúng tôi trong tương lai — hiện Omicslab **chưa được chứng nhận** theo bất kỳ khung nào trong số đó. Các cam kết chính gồm:",
          },
          {
            type: "ul",
            items: [
              "**Hợp pháp:** chúng tôi chỉ xử lý dữ liệu cá nhân trên cơ sở pháp lý hợp lệ — sự đồng ý, hợp đồng, nghĩa vụ pháp lý hoặc lợi ích hợp pháp.",
              "**Thu hẹp dữ liệu:** chúng tôi chỉ thu thập những gì cần để vận hành Nền tảng.",
              "**Bảo mật:** biện pháp kỹ thuật và tổ chức bảo vệ dữ liệu cá nhân khỏi truy cập trái phép, mất mát hoặc sửa đổi.",
              "**Quyền của bạn:** bạn có quyền truy cập, sửa đổi, xóa bỏ, hạn chế, di trú và phản đối — xem [Chính sách Quyền riêng tư](/privacy) để biết chi tiết.",
            ],
          },
          {
            type: "p",
            text: "Đối với dữ liệu nghiên cứu bạn tải lên, bạn giữ quyền kiểm soát và sở hữu. Chúng tôi đóng vai trò **người xử lý** đối với dữ liệu bạn cung cấp, và là **người kiểm soát** đối với dữ liệu tài khoản và sử dụng cần để vận hành dịch vụ.",
          },
        ],
      },
      {
        id: "service",
        title: "7. Khả dụng dịch vụ và Từ chối bảo đảm",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi nỗ lực cung cấp dịch vụ ổn định nhưng không bảo đảm Nền tảng sẽ không gián đoạn, không có lỗi, hay kết quả sẽ có giá trị khoa học cho bất kỳ mục đích cụ thể nào. Nền tảng được cung cấp **“nguyên trạng”**. Bạn chịu trách nhiệm kiểm chứng kết quả phân tích và tự lưu trữ bản sao dự phòng dữ liệu nghiên cứu khi nghĩa vụ của bạn yêu cầu.",
          },
        ],
      },
      {
        id: "liability",
        title: "8. Giới hạn trách nhiệm",
        blocks: [
          {
            type: "p",
            text: "Trong giới hạn luật pháp cho phép, chúng tôi không chịu trách nhiệm đối với các thiệt hại gián tiếp, phát sinh ngoài dự kiến, hoặc việc tổn thất dữ liệu, doanh thu và uy tín.",
          },
          {
            type: "p",
            text: "Trong mọi trường hợp, tổng mức bồi thường tối đa của chúng tôi liên quan đến Nền tảng sẽ không vượt quá số tiền bạn đã thanh toán trong 12 tháng gần nhất trước khi xảy ra khiếu nại.",
          },
          {
            type: "p",
            text: "Các điều khoản này không làm giảm hay loại bỏ bất kỳ trách nhiệm pháp lý bắt buộc nào theo quy định của pháp luật.",
          },
        ],
      },
      {
        id: "termination",
        title: "9. Thời hạn và Chấm dứt",
        blocks: [
          {
            type: "p",
            text: "Bạn có thể đóng tài khoản bất cứ lúc nào. Chúng tôi có thể đình chỉ hoặc chấm dứt quyền truy cập — có hoặc không thông báo — vì vi phạm các Điều khoản này, hoạt động bất hợp pháp, hoặc theo yêu cầu của luật. Khi chấm dứt, bạn vẫn chịu trách nhiệm cho các nghĩa vụ phát sinh trước đó. Dữ liệu cá nhân và dữ liệu nghiên cứu được xử lý theo [Chính sách Quyền riêng tư](/privacy) và thỏa thuận xử lý dữ liệu hiện hành.",
          },
        ],
      },
      {
        id: "changes",
        title: "10. Thay đổi các Điều khoản này",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi có thể chỉnh sửa các Điều khoản này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua Nền tảng trước khi có hiệu lực. Việc tiếp tục sử dụng Nền tảng sau khi thay đổi có hiệu lực được xem là chấp thuận các Điều khoản đã sửa đổi.",
          },
        ],
      },
      {
        id: "governing-law",
        title: "11. Pháp luật áp dụng",
        blocks: [
          {
            type: "p",
            text: "Các Điều khoản này chịu sự điều chỉnh của pháp luật Việt Nam, không phụ thuộc vào các nguyên tắc xung đột pháp luật. Mọi tranh chấp thuộc thẩm quyền xét xử độc quyền của cơ quan tư pháp có thẩm quyền tại Việt Nam.",
          },
        ],
      },
      {
        id: "contact",
        title: "12. Liên hệ",
        blocks: [
          {
            type: "p",
            text: "Các câu hỏi về Điều khoản này có thể gửi cho chúng tôi qua trang [Liên hệ](/contact) hoặc tới **contact@omicslab.io**, hoặc tới đầu mối bảo vệ dữ liệu được nêu trong [Chính sách Quyền riêng tư](/privacy).",
          },
        ],
      },
      {
        id: "billing",
        title: "13. Thanh toán, Số dư và Chu kỳ Dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Các điều khoản thanh toán và chu kỳ dưới đây áp dụng cho Nền tảng; thời gian lưu trữ dữ liệu chi tiết được nêu tại [Chính sách Quyền riêng tư](/privacy).",
          },
          {
            type: "ul",
            items: [
              "**Gói đăng ký (Subscription):** được thanh toán theo chu kỳ, thông thường là theo tháng. Việc gia hạn phải được thực hiện trước khi chu kỳ hiện tại kết thúc.",
              "**Lưu trữ Marketplace (pay-as-you-go):** dung lượng lưu trữ được tính phí theo mức sử dụng và theo chu kỳ tháng, gắn với gói đăng ký, và không thể kéo dài quá thời hạn của gói đang có hiệu lực.",
              "**Cảnh báo trước bằng email:** trước mọi hành động, chúng tôi gửi email cho quản trị viên — nhắc trước **7 ngày** khi chu kỳ lưu trữ sắp kết thúc, và thông báo ngay khi chu kỳ hết hạn. Sau khi hết hạn, dữ liệu được giữ thêm **thời gian ân hạn 1 tháng** trước khi bị dọn dẹp.",
              "**Dọn dẹp dữ liệu workspace:** qua thời hạn ân, dữ liệu trong workspace bị xóa — chỉ nhật ký audit được giữ lại cho mục đích tra cứu (chi tiết tại Mục 6 [Chính sách Quyền riêng tư](/privacy)).",
              "**Số dư Top-up:** chỉ có thể sử dụng khi tổ chức còn gói đăng ký hiệu lực. Khi gói hết hạn hoặc bị hủy mà không có gia hạn đang chờ xử lý, số dư còn lại bị thu hồi về 0; thông tin về số dư và các mốc thời hạn cũng được gửi qua email trước khi áp dụng.",
            ],
          },
        ],
      },
    ],
  },

  security: {
    kicker: "Bảo mật & Tuân thủ",
    title: "Bảo mật & Tuân thủ",
    navTitle: "Bảo mật & Tuân thủ",
    description:
      "Hai mô hình triển khai, các biện pháp kiểm soát bảo mật và phân định trách nhiệm giữa Omicslab và khách hàng.",
    sections: [
      {
        id: "trust-model",
        title: "Mô hình Tin cậy & Bảo mật (Trust Model)",
        blocks: [
          {
            type: "p",
            text: "Omicslab xây dựng một lớp vận hành đáng tin cậy dành cho điện toán khoa học, tối ưu cho các khối lượng công việc omics và dữ liệu sức khỏe nhạy cảm. Chúng tôi cung cấp hai mô hình triển khai linh hoạt:",
          },
          {
            type: "ul",
            items: [
              "**Bring Your Own Infrastructure (BYO):** Kết nối hạ tầng lưu trữ, kiểm soát phiên bản và tài nguyên tính toán sẵn có của chính bạn — đảm bảo dữ liệu luôn nằm hoàn toàn trong tầm kiểm soát nội bộ.",
              "**Platform-Managed:** Triển khai trực tiếp trên hạ tầng do Omicslab quản lý với cam kết tuân thủ đầy đủ các tiêu chuẩn an toàn dữ liệu.",
            ],
          },
        ],
      },
      {
        id: "compliance",
        title: "1. Tuân thủ Pháp lý & Bảo mật Dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Omicslab vận hành theo mô hình triển khai đa khu vực và áp dụng pháp luật Việt Nam về bảo vệ dữ liệu cá nhân cho hoạt động tại Việt Nam — đặc biệt là Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP. Vị trí lưu trữ và xử lý phụ thuộc vào khu vực được cấu hình cho tổ chức hoặc dịch vụ tương ứng.",
          },
          {
            type: "ul",
            items: [
              "**Lưu trữ & Xử lý:** Dữ liệu được lưu trữ và xử lý tại khu vực địa lý được cấu hình cho tổ chức hoặc dịch vụ tương ứng. Các triển khai tại khu vực Việt Nam được dự kiến sử dụng hạ tầng đặt tại Việt Nam, tùy theo cấu hình dịch vụ và các điều khoản hợp đồng áp dụng.",
              "**Chuyển dữ liệu xuyên biên giới:** Khi dữ liệu được xử lý tại khu vực ngoài Việt Nam, việc chuyển dữ liệu được thực hiện theo pháp luật hiện hành và thỏa thuận riêng.",
              "**Kiến trúc tách biệt (Separation of Control & Data):** Tầng điều khiển (quản lý điều phối job, thông tin xác thực, hạn ngạch) hoàn toàn độc lập với tầng dữ liệu. Dữ liệu chỉ luân chuyển giữa các điểm lưu trữ và môi trường tính toán do bạn chỉ định.",
              "**Chính sách riêng tư:** Quy định chi tiết về xử lý dữ liệu được công bố công khai tại [Điều khoản Dịch vụ](/terms) và [Chính sách Quyền riêng tư](/privacy) của chúng tôi.",
            ],
          },
        ],
      },
      {
        id: "controls",
        title: "2. Các Biện pháp Kiểm soát Bảo mật",
        blocks: [
          {
            type: "ul",
            items: [
              "**Mã hóa Dữ liệu (Encryption):** Áp dụng đồng bộ giao thức TLS cho dữ liệu đang truyền tải (in-transit) và thuật toán AES-256 cho dữ liệu lưu trữ (at-rest) trên toàn bộ tài nguyên do nền tảng quản lý.",
              "**Kiểm soát Truy cập & Audit (Access Control):** Phân quyền truy cập theo vai trò (RBAC), cách ly triệt để theo từng Workspace và tự động ghi nhật ký kiểm toán (audit log) đầy đủ cho mọi thao tác tác động lên tầng dữ liệu.",
              "**Quản lý Thông tin Xác thực (Credential Handling):** Các thông tin xác thực (credentials) dùng để khởi chạy công việc được mã hóa và truyền an toàn tới môi trường thực thi. Thông tin này tuyệt đối không hiển thị cho người dùng cuối hoặc lưu vết dưới dạng plain-text.",
            ],
          },
        ],
      },
      {
        id: "responsibility",
        title: "3. Phân định Trách nhiệm theo Mô hình Triển khai",
        blocks: [
          {
            type: "p",
            text: "Mức độ bảo đảm an ninh phụ thuộc vào mô hình triển khai do bạn lựa chọn:",
          },
          {
            type: "ul",
            items: [
              "**Mô hình Marketplace (Cao nhất):** Áp dụng cho các tài nguyên lưu trữ và tính toán do Quản trị viên (Superuser) của Omicslab cấp phát từ các nhà cung cấp đã qua thẩm định khắt khe. Omicslab chịu trách nhiệm bảo đảm toàn bộ các biện pháp an toàn và cam kết tuân thủ trên hạ tầng này.",
              "**Mô hình Tự kết nối (BYO):** Khi bạn tự kết nối hạ tầng lưu trữ và tính toán cá nhân, rủi ro và trách nhiệm quản lý thuộc về phía bạn (bao gồm việc lựa chọn nhà cung cấp, cấu hình hệ thống và thiết lập các biện pháp bảo vệ tương ứng).",
            ],
          },
        ],
      },
      {
        id: "more",
        title: "Tìm hiểu thêm",
        blocks: [
          {
            type: "ul",
            items: [
              "Trang [Tuân thủ (Compliance)](/security/compliance): Tìm hiểu chi tiết các tiêu chuẩn bảo mật, khuôn khổ vận hành và địa điểm đặt máy chủ.",
              "Trang [Phân định Trách nhiệm (Shared Responsibility)](/security/responsibility): Xem bảng phân công chi tiết quyền kiểm soát từng biện pháp an toàn giữa Omicslab và Khách hàng tương ứng với từng mô hình triển khai.",
            ],
          },
        ],
      },
    ],
  },
  compliance: {
    kicker: "Bảo mật & Tuân thủ",
    title: "Tuân thủ",
    navTitle: "Tuân thủ",
    description:
      "Nơi nền tảng được lưu trữ, pháp luật tuân theo và cam kết tuân thủ cho hoạt động tại Việt Nam.",
    sections: [
      {
        id: "hosting",
        title: "Lưu trữ dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Nền tảng Omicslab hỗ trợ triển khai theo khu vực. Đối với khu vực **Việt Nam**, dữ liệu khách hàng — gồm dữ liệu nghiên cứu, sinh học hoặc bộ gen tải lên nền tảng — được lưu trữ và xử lý trên hạ tầng đặt tại Việt Nam, tùy theo cấu hình dịch vụ và các điều khoản hợp đồng áp dụng. Các khu vực khác có thể sử dụng hạ tầng ngoài Việt Nam.",
          },
          {
            type: "p",
            text: "Nền tảng được vận hành theo **pháp luật dân sự Việt Nam**, cụ thể là **Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15)** và **Nghị định 356/2025/NĐ-CP** (thay thế Nghị định 13/2023/NĐ-CP), có hiệu lực từ ngày 01 tháng 01 năm 2026.",
          },
        ],
      },
      {
        id: "data-residency",
        title: "Nơi lưu trữ dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Nơi lưu trữ dữ liệu phụ thuộc vào khu vực được cấu hình cho tổ chức hoặc dịch vụ tương ứng. Với các triển khai tại khu vực Việt Nam, dữ liệu được dự kiến lưu tại Việt Nam; khi một dịch vụ được cấu hình tại khu vực khác, dữ liệu có thể được lưu trữ và xử lý ngoài Việt Nam, và các yêu cầu chuyển dữ liệu xuyên biên giới có thể được áp dụng. Khu vực được lựa chọn theo từng tổ chức hoặc dịch vụ; bảng dưới đây thể hiện khu vực Việt Nam mặc định.",
          },
          {
            type: "table",
            head: ["Khu vực", "Instance", "Khuôn khổ", "Nơi lưu trữ dữ liệu"],
            rows: [
              ["Việt Nam", "vn.omicslab.io", "PDPL (Luật 91/2025 + NĐ 356/2025)", "Dự kiến lưu tại Việt Nam"],
            ],
          },
          {
            type: "p",
            text: "Cam kết pháp lý của chúng tôi áp dụng cho hoạt động tại Việt Nam hiện nay. Nếu nền tảng được mở rộng sang khu vực pháp lý khác trong tương lai, trang này sẽ được cập nhật để phản ánh pháp luật và thỏa thuận lưu trữ áp dụng cho hoạt động đó.",
          },
        ],
      },
      {
        id: "framework",
        title: "Pháp luật chúng tôi tuân theo",
        blocks: [
          {
            type: "p",
            text: "Nền tảng được vận hành như một dịch vụ pháp lý và xử lý dữ liệu chịu sự điều chỉnh của pháp luật Việt Nam. Khung pháp lý chính là Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và Nghị định 356/2025/NĐ-CP (thay thế Nghị định 13/2023/NĐ-CP), điều chỉnh cách dữ liệu cá nhân được thu thập, xử lý và bảo vệ tại Việt Nam, gồm yêu cầu về sự đồng ý, quyền của chủ thể dữ liệu và thông báo sự cố dữ liệu.",
          },
        ],
      },
      {
        id: "posture",
        title: "Cam kết tuân thủ",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi duy trì cam kết tuân thủ bằng các biện pháp kỹ thuật và tổ chức hiện thực hóa yêu cầu của pháp luật Việt Nam — mã hóa khi truyền tải và khi lưu trữ, kiểm soát truy cập, ghi nhật ký kiểm toán và cách tiếp cận có tài liệu đối với việc xử lý dữ liệu cá nhân.",
          },
          {
            type: "p",
            text: "Xử phạt vi phạm trong lĩnh vực an ninh mạng và bảo vệ dữ liệu cá nhân được quy định tại Nghị định 330/2026/NĐ-CP, có hiệu lực từ ngày 19 tháng 8 năm 2026. Cam kết này chỉ phản ánh hoạt động tại Việt Nam hiện nay. Nếu nền tảng mở rộng ra quốc tế, khung tuân thủ và mọi chứng nhận liên quan sẽ được cập nhật và công bố trên trang này.",
          },
          {
            type: "p",
            text: "Hệ thống, biện pháp kiểm soát và quy trình của Omicslab được **thiết kế theo hướng** phù hợp với GDPR (EU) và HIPAA (Hoa Kỳ) để nền tảng có thể phục vụ các khối lượng công việc chịu yêu cầu nghiêm ngặt tại các khu vực này trong tương lai. Tính đến thời điểm trang này, Omicslab **chưa được chứng nhận, đánh giá độc lập hoặc công nhận** theo GDPR, HIPAA hay bất kỳ chương trình chứng nhận quốc tế nào — nội dung tại đây chỉ mô tả định hướng thiết kế và việc tuân thủ pháp luật Việt Nam. Mọi chứng nhận đạt được sẽ được công bố trên trang này.",
          },
          {
            type: "p",
            text: "Chúng tôi không bảo đảm Nền tảng tuân thủ mọi luật có thể áp dụng cho trường hợp sử dụng cụ thể của bạn. Bạn chịu trách nhiệm xác định việc sử dụng Nền tảng cho khối lượng công việc của mình có phù hợp hay không, cũng như trách nhiệm tuân thủ của riêng bạn. Xem [Chính sách Quyền riêng tư](/privacy) để biết đầy đủ các cam kết bảo vệ dữ liệu.",
          },
        ],
      },
    ],
  },

  responsibility: {
    kicker: "Bảo mật & Tuân thủ",
    title: "Trách nhiệm",
    navTitle: "Trách nhiệm",
    description:
      "Bảo mật là trách nhiệm chung. Trang này nêu rõ ai kiểm soát từng biện pháp trong từng mô hình triển khai, và những gì chúng tôi yêu cầu ở bạn.",
    sections: [
      {
        id: "matrix",
        title: "Ma trận chia sẻ trách nhiệm (Shared Responsibility Matrix)",
        blocks: [
          {
            type: "table",
            head: [
              "Hạng mục / Hạ tầng",
              "Tier 1 (Tự quản lý hạ tầng)",
              "Tier 2 (Nền tảng quản lý - Marketplace)",
            ],
            rows: [
              [
                "Lưu trữ dữ liệu",
                "Hạ tầng Cloud / Object Storage riêng của bạn",
                "Lưu trữ mã hóa AES-256 trên nền tảng (phân vùng theo Workspace)",
              ],
              [
                "Kiểm soát phiên bản",
                "Kho mã nguồn (GitHub) riêng của bạn",
                "Kho mã nguồn tích hợp trên Marketplace",
              ],
              [
                "Hạ tầng tính toán",
                "Cụm máy chủ HPC / Cloud riêng của bạn",
                "Hạ tầng tính toán được Omicslab quản lý trực tiếp",
              ],
              ["Truy cập hạ tầng", "Khách hàng tự quản lý", "Nền tảng quản lý"],
              [
                "Thông tin xác thực (Credentials)",
                "Khách hàng tự quản lý",
                "Nền tảng bảo mật (không hiển thị dạng thô)",
              ],
              [
                "Tuân thủ hạ tầng (Compliance)",
                "Khách hàng tự chịu trách nhiệm",
                "Nền tảng đảm bảo tuân thủ",
              ],
            ],
          },
          {
            type: "label",
            text: "Phân định vận hành",
          },
          {
            type: "ul",
            items: [
              "**Ở Tier 1:** Khách hàng tự cung cấp và chịu trách nhiệm toàn bộ đối với lưu trữ, mã nguồn và hạ tầng tính toán (vận hành trên tinh thần tự chịu rủi ro về mặt hạ tầng).",
              "**Ở Tier 2:** Mô hình mang lại mức độ bảo đảm tối đa — mọi tài nguyên đều do Omicslab trực tiếp cấp phát và quản lý thông qua các đối tác hạ tầng đạt chuẩn.",
            ],
          },
        ],
      },
      {
        id: "platform",
        title: "1. Cam kết Bảo mật từ Nền tảng",
        blocks: [
          {
            type: "ul",
            items: [
              "**Tách biệt kiến trúc:** Tách biệt tuyệt đối tầng điều khiển (Control Plane) khỏi tầng dữ liệu (Data Plane) của khách hàng.",
              "**Cấp quyền tối thiểu:** Sử dụng mã xác thực (credentials) ngắn hạn và giới hạn phạm vi truy cập nghiêm ngặt cho mọi kết nối liên vùng.",
              "**Cô lập môi trường:** Tách biệt dữ liệu theo từng Workspace và kiểm soát truy cập theo vai trò (RBAC).",
              "**Minh bạch kiểm toán:** Duy trì nhật ký ghi vết (Audit Logs) bất biến, phục vụ công tác rà soát an ninh.",
              "**Quản lý lỗ hổng:** Tiếp nhận báo cáo sự cố/cấu hình sai bảo mật và phát hành bản vá kịp thời.",
            ],
          },
          {
            type: "p",
            text: "**Lưu ý:** Với Tier 2, các cam kết trên được mở rộng xuống toàn bộ hạ tầng phần cứng bên dưới.",
          },
        ],
      },
      {
        id: "customer",
        title: "2. Trách nhiệm Bắt buộc của Khách hàng",
        blocks: [
          {
            type: "ul",
            items: [
              "**Bảo mật tài khoản:** Bảo vệ thông tin đăng nhập và bắt buộc áp dụng các biện pháp xác thực mạnh (MFA/2FA) trong tổ chức.",
              "**Tuân thủ pháp lý & Đạo đức:** Đạt được đầy đủ chấp thuận từ Hội đồng Đạo đức (IRB), sự đồng ý tự nguyện của chủ thể dữ liệu (Informed Consent) và các quyền hợp pháp cần thiết trước khi tải lên dữ liệu bộ gen hoặc dữ liệu sức khỏe con người.",
              "**Phân quyền dữ liệu:** Chủ động phân loại dữ liệu và thiết lập quyền truy cập phù hợp cho từng Workspace cũng như tài nguyên lưu trữ.",
              "**Sao lưu & Kiểm chứng:** Tự duy trì bản sao lưu dự phòng độc lập và tự chịu trách nhiệm kiểm chứng kết quả phân tích theo chính sách quản trị dữ liệu nghiên cứu của tổ chức mình.",
            ],
          },
        ],
      },
    ],
  },
};
