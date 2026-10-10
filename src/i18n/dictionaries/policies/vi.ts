import type { Policies } from "./en";

/**
 * Vietnamese mirror of policies/en.ts. The explicit `Policies` annotation
 * makes the build fail when a key or section is missing or renamed.
 */
export const policiesVi: Policies = {
  shared: {
    lastUpdatedLabel: "Cập nhật lần cuối",
    lastUpdated: "10 tháng 10 năm 2026",
    tocLabel: "Trong trang này",
    policiesLabel: "Chính sách",
  },

  privacy: {
    kicker: "Pháp lý",
    title: "Chính sách bảo mật",
    navTitle: "Chính sách bảo mật",
    description:
      "Chào mừng bạn đến với Nền tảng phân tích dữ liệu tin sinh học Omicslab — sản phẩm do CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS vận hành. Chúng tôi cam kết bảo vệ dữ liệu cá nhân và dữ liệu bạn xử lý trên Nền tảng theo quy định của pháp luật Việt Nam (Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Nghị định 356/2025/NĐ-CP, Luật An ninh mạng) và các tiêu chuẩn bảo mật quốc tế.",
    notice:
      "Nền tảng Omicslab công khai (cloud) không tiếp nhận và không xử lý dữ liệu cá nhân nhạy cảm **chưa được công bố công khai** của cá nhân tại Việt Nam, bao gồm dữ liệu bộ gen người và dữ liệu liên quan đến sức khỏe. Với loại dữ liệu này, Khách hàng cần liên hệ với chúng tôi để triển khai **do khách hàng tự quản lý (self-hosted)** theo thỏa thuận riêng: chúng tôi bàn giao và triển khai phần mềm Nền tảng trên hạ tầng của chính Khách hàng và hướng dẫn đội ngũ Khách hàng thiết lập, còn Khách hàng tự vận hành, phân tích, lưu trữ và quản lý dữ liệu. Vieomics cung cấp phần mềm và hỗ trợ trong phạm vi dịch vụ đã thỏa thuận và không truy cập dữ liệu này. Trách nhiệm đối với dữ liệu cá nhân được xác định theo hoạt động xử lý thực tế, quyền truy cập được cấp, mục đích xử lý và quy định pháp luật áp dụng. Dữ liệu người được công bố công khai **không mặc nhiên là dữ liệu ẩn danh**: dữ liệu đã được công bố hợp pháp hoặc đã được ẩn danh hóa đúng cách chỉ được xử lý trên Nền tảng công khai sau khi đánh giá nguồn, điều kiện truy cập và rủi ro riêng tư (xem Mục 1).",
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
            text: "**Vieomics (CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS):** là pháp nhân vận hành Nền tảng Omicslab và chịu trách nhiệm, như quy định tại Chính sách này, đối với dữ liệu cá nhân mà chúng tôi thực sự thu thập hoặc xử lý (“chúng tôi”). Mọi cam kết, nghĩa vụ và trách nhiệm đối với dữ liệu cá nhân nêu dưới đây đều thuộc về Vieomics — không phải đối với thương hiệu “Omicslab”.",
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
            text: "**Dữ liệu cá nhân không thuộc về chính Người dùng:** bạn chỉ được tải lên Nền tảng công khai dữ liệu cá nhân của người khác khi đó là **dữ liệu cá nhân cơ bản**; khi đó bạn là **Bên Kiểm soát Dữ liệu** và chịu trách nhiệm về căn cứ thu thập, việc lấy sự đồng ý và xử lý hợp pháp, còn Vieomics chỉ đóng vai trò **Bên Xử lý** theo chỉ dẫn của bạn (chi tiết tại Mục 2). **Dữ liệu cá nhân nhạy cảm** (bao gồm dữ liệu bệnh nhân, dữ liệu sức khỏe và dữ liệu bộ gen) không được tải lên Nền tảng công khai — loại dữ liệu này chỉ được xử lý thông qua mô hình triển khai do khách hàng tự quản lý (self-hosted) nêu tại Mục này, trừ dữ liệu đã được công bố công khai hoặc đã được ẩn danh hóa đúng cách.",
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
            text: "**Bên Xử lý Dữ liệu:** Đối với dữ liệu nghiên cứu và dữ liệu sinh học do bạn (hoặc đơn vị của bạn) chủ động tải lên một dịch vụ Omicslab **do nền tảng quản lý**, bạn giữ vai trò là Bên Kiểm soát Dữ liệu và chúng tôi đóng vai trò là Bên Xử lý Dữ liệu — vận hành dịch vụ đó và thực hiện các tác vụ tính toán, lưu trữ theo chỉ dẫn, thiết lập và yêu cầu của bạn. Khi đóng vai trò Bên Xử lý, chúng tôi xử lý dữ liệu của Khách hàng theo chỉ dẫn bằng văn bản của bạn và theo thỏa thuận dịch vụ hiện hành, đồng thời vẫn chịu trách nhiệm đối với các nghĩa vụ của chính mình theo pháp luật hiện hành và các cam kết hợp đồng.",
          },
          {
            type: "p",
            text: "Vai trò này chỉ áp dụng với hạ tầng do chúng tôi thực sự vận hành. Trong **mô hình triển khai do khách hàng tự quản lý**, khi bạn tự vận hành toàn bộ hệ thống và chúng tôi không có quyền truy cập vào môi trường hay dữ liệu của bạn, chúng tôi không xử lý dữ liệu đó với tư cách Bên Xử lý. Vai trò và trách nhiệm của mỗi bên đối với dữ liệu cá nhân phụ thuộc vào hoạt động xử lý thực tế, quyền truy cập được cấp, mục đích xử lý và quy định pháp luật áp dụng — không chỉ vì việc sử dụng phần mềm Omicslab.",
          },
          {
            type: "label",
            text: "Phạm vi: Dữ liệu Người / Liên quan đến Sức khỏe (Không xử lý trên Nền tảng Công khai)",
          },
          {
            type: "p",
            text: "Nền tảng Omicslab công khai **không tiếp nhận và không xử lý dữ liệu cá nhân nhạy cảm chưa được công bố công khai** của cá nhân tại Việt Nam, bao gồm dữ liệu bộ gen người và dữ liệu liên quan đến sức khỏe (ví dụ NIPT, WES, WGS, RNA-Seq người hoặc hồ sơ di truyền của bệnh nhân). Bạn không được tải loại dữ liệu này lên Nền tảng công khai. **Dữ liệu công bố công khai không mặc nhiên là dữ liệu ẩn danh:** dữ liệu đã được công bố công khai và truy cập mở hợp pháp, hoặc đã được ẩn danh hóa đến mức việc tái nhận dạng không thể xảy ra một cách hợp lý trong hoàn cảnh tương ứng (ví dụ một số dữ liệu tải từ các kho dữ liệu công cộng như NCBI GEO/SRA), có thể được xử lý trên Nền tảng công khai. Trước khi tải lên bất kỳ bộ dữ liệu người nào, bạn phải đánh giá nguồn, điều kiện truy cập, mục đích sử dụng được phép, metadata và rủi ro riêng tư — bao gồm việc dữ liệu còn chứa hoặc có thể cho phép suy luận về cá nhân hay không — và xin mọi chấp thuận bổ sung cần thiết cho dữ liệu bị hạn chế hoặc nhạy cảm. Mã mẫu hoặc mã chủ thể không tự nó là thông tin định danh trực tiếp.",
          },
          {
            type: "p",
            text: "Để xử lý dữ liệu nhạy cảm, Khách hàng cần [liên hệ với chúng tôi](/contact) để **triển khai do khách hàng tự quản lý (self-hosted) theo thỏa thuận riêng**. Trong mô hình này, Omicslab bàn giao và triển khai phần mềm Nền tảng trên hạ tầng của chính Khách hàng và hướng dẫn đội ngũ Khách hàng thiết lập; Khách hàng tự vận hành Nền tảng, tự cấu hình cơ sở dữ liệu, lưu trữ, tính toán và công cụ phân tích của mình, đồng thời kiểm soát quyền truy cập dữ liệu và môi trường phân tích. Chúng tôi không yêu cầu bạn phải tải dữ liệu bộ gen hay dữ liệu lâm sàng nhạy cảm lên hạ tầng do Vieomics quản lý chỉ để sử dụng mô hình tự quản lý. Vieomics cung cấp phần mềm và hỗ trợ kỹ thuật trong phạm vi dịch vụ đã thỏa thuận và không truy cập dữ liệu này; mô hình do khách hàng tự quản lý vận hành độc lập và không có dữ liệu nào từ đó được truyền tới Vieomics. Trách nhiệm đối với dữ liệu cá nhân được xác định theo hoạt động xử lý thực tế, quyền truy cập được cấp, mục đích xử lý và quy định pháp luật áp dụng — Khách hàng chịu trách nhiệm về căn cứ pháp lý, các quyền và yêu cầu về sự đồng ý (khi áp dụng), cấu hình bảo mật cho môi trường của mình, và mọi đánh giá tác động xử lý dữ liệu cá nhân theo quy định của pháp luật.",
          },
          {
            type: "label",
            text: "Hạ tầng Do Người dùng Tự Quản lý (Bring Your Own Cloud – BYOC)",
          },
          {
            type: "p",
            text: "Trường hợp bạn chủ động kết nối, tích hợp tài khoản lưu trữ hoặc máy chủ phân tích riêng (API/Credentials cá nhân) vào Nền tảng Omicslab, bạn chịu trách nhiệm về tính bảo mật, quyền truy cập và an toàn dữ liệu trên hạ tầng do bạn tự quản lý đó. Trong giới hạn pháp luật cho phép, chúng tôi không chịu trách nhiệm đối với sự cố phát sinh từ hệ thống do bạn tự quản lý. Điều này không ảnh hưởng đến các nghĩa vụ của chính chúng tôi theo pháp luật hiện hành hoặc theo thỏa thuận riêng với bạn.",
          },
          {
            type: "label",
            text: "Mô hình triển khai",
          },
          {
            type: "p",
            text: "Omicslab xây dựng một lớp vận hành đáng tin cậy cho điện toán khoa học và được cung cấp qua nhiều mô hình triển khai khác nhau. **Do nền tảng quản lý (Marketplace):** Omicslab cung cấp và quản lý các dịch vụ ứng dụng, tính toán và lưu trữ do chúng tôi vận hành, và xử lý dữ liệu trong hạ tầng đó theo chỉ dẫn của bạn. **Do khách hàng tự quản lý (self-hosted / Bring Your Own Infrastructure):** bạn triển khai và vận hành toàn bộ hệ thống Omicslab — frontend, backend và API, cơ sở dữ liệu ứng dụng, lưu trữ đối tượng và các lưu trữ khác, hạ tầng tính toán và môi trường thực thi quy trình, các pipeline và công cụ phân tích bên thứ ba, cùng thông tin xác thực, chính sách truy cập, sao lưu và bảo mật vận hành của bạn — trên hạ tầng do bạn sở hữu hoặc kiểm soát. Chúng tôi cung cấp phần mềm, tài liệu, hướng dẫn kỹ thuật, cập nhật và hỗ trợ cho dịch vụ bạn đã mua, và không truy cập môi trường hay dữ liệu của bạn trừ khi bạn cho phép truy cập cho một mục đích hỗ trợ hoặc bảo trì xác định.",
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
                  "**Dữ liệu Người / Liên quan đến Sức khỏe:** Nền tảng công khai **không tiếp nhận và không xử lý dữ liệu cá nhân nhạy cảm chưa được công bố công khai** của cá nhân tại Việt Nam, bao gồm dữ liệu bộ gen người và dữ liệu liên quan đến sức khỏe (ví dụ NIPT, WES, WGS, RNA-Seq người hoặc hồ sơ di truyền và dữ liệu bộ gen lâm sàng của bệnh nhân). Loại dữ liệu này không được tải lên Nền tảng công khai. Để xử lý dữ liệu nhạy cảm, Khách hàng cần [liên hệ với chúng tôi](/contact) để triển khai Nền tảng do khách hàng tự quản lý (self-hosted) theo thỏa thuận riêng, trong đó chúng tôi bàn giao và triển khai phần mềm Nền tảng trên hạ tầng của chính Khách hàng và hướng dẫn đội ngũ Khách hàng thiết lập, còn Khách hàng tự vận hành, tự cấu hình, phân tích, lưu trữ và quản lý dữ liệu. **Dữ liệu công bố công khai không mặc nhiên là dữ liệu ẩn danh:** dữ liệu đã được công bố công khai và truy cập mở hợp pháp, hoặc đã được ẩn danh hóa đến mức việc tái nhận dạng không thể xảy ra một cách hợp lý trong hoàn cảnh tương ứng, có thể được xử lý trên Nền tảng công khai sau khi đánh giá như nêu tại Mục 1.",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "Nhóm dữ liệu áp dụng phụ thuộc vào mô hình triển khai. Trong **mô hình do khách hàng tự quản lý**, hệ thống hoàn toàn độc lập: không có dữ liệu nào từ môi trường của bạn — tệp nghiên cứu, kết quả phân tích, metadata tác vụ, nhật ký, chẩn đoán hay telemetry — được truyền tới hay lưu bởi Vieomics. Trong trường hợp đó, thông tin chúng tôi nắm giữ chỉ gồm dữ liệu tài khoản, thanh toán và hỗ trợ mà bạn cung cấp trực tiếp cho chúng tôi, cùng bất kỳ tài liệu nào bạn chủ động gửi kèm khi yêu cầu hỗ trợ. Trong **dịch vụ do nền tảng quản lý**, dữ liệu được xử lý trong hạ tầng do chúng tôi vận hành.",
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
              "**Dữ liệu người được công bố hợp pháp:** một số dữ liệu nghiên cứu về người được truy cập hợp pháp nhưng vẫn có thể chứa dữ liệu cá nhân hoặc cho phép suy luận về cá nhân. Việc tải lên Nền tảng công khai đòi hỏi đánh giá như nêu tại Mục 1; dữ liệu người nhạy cảm hoặc bị hạn chế cần chấp thuận bổ sung phải được xử lý trong môi trường do khách hàng tự quản lý.",
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
              "**Dữ liệu nghiên cứu trong lưu trữ do nền tảng quản lý:** dữ liệu trên dịch vụ lưu trữ đối tượng (Object Storage) của Marketplace được lưu theo mô hình **trả theo mức sử dụng, tính theo chu kỳ tháng (pay-as-you-go)** và chỉ có hiệu lực trong chu kỳ bạn đã trả. Nếu bạn không còn đăng ký bất kỳ gói dịch vụ nào hoặc không gia hạn chu kỳ lưu trữ, quyền truy cập workspace sẽ bị khóa, dữ liệu được giữ lại trong thời gian **ân hạn 1 tháng**, sau đó **bị dọn dẹp toàn bộ khỏi workspace** — chỉ nhật ký audit được giữ lại cho mục đích tra cứu. Bạn cũng có thể tự xóa dữ liệu bất cứ lúc nào trên Nền tảng.",
              "**Số dư Top-up (ví tiền tổ chức):** Số dư tiền nạp (top-up) chỉ có thể sử dụng khi tổ chức của bạn còn gói đăng ký hiệu lực. Khi gói đăng ký hết hạn hoặc bị hủy mà không có gia hạn đang chờ xử lý, **số dư còn lại bị thu hồi và đưa về 0** — số tiền nạp không thể tiếp tục sử dụng khi không còn gói dịch vụ. Tổ chức chưa từng đăng ký gói thì số dư (nếu có) không bị thu hồi. Việc thu hồi được rà soát tự động theo chu kỳ hằng ngày. Điều kiện thanh toán, email cảnh báo trước và các mốc thời hạn được nêu chi tiết tại Mục 13 [Điều khoản Dịch vụ](/terms).",
              "**Dữ liệu nghiên cứu trong mô hình do khách hàng tự quản lý:** dữ liệu nằm trong môi trường do bạn sở hữu hoặc kiểm soát được lưu và xóa theo vòng đời lưu trữ và cấu hình của chính bạn, tùy thuộc nghĩa vụ pháp lý của bạn. Vieomics không giữ bản sao dữ liệu đó và không thể xóa dữ liệu khỏi môi trường của bạn.",
              "**Xóa dữ liệu và các bản lưu giữ:** việc xóa tài khoản, workspace hay bộ dữ liệu không nhất thiết xóa ngay các bản sao lưu, hồ sơ giao dịch hoặc nhật ký audit; các bản này được ghi đè hoặc loại bỏ theo chu kỳ lưu trữ và sao lưu áp dụng.",
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
            text: "Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và vận hành để bảo vệ dữ liệu cá nhân và dữ liệu dịch vụ mà chúng tôi nắm giữ trên các hệ thống do Vieomics quản lý:",
          },
          {
            type: "ul",
            items: [
              "Mã hóa dữ liệu trên đường truyền (TLS/SSL) và khi lưu trữ (Encryption at Rest) đối với các dịch vụ do Vieomics quản lý.",
              "Phân quyền truy cập tối thiểu (RBAC), quản lý xác thực đa yếu tố (MFA) và ghi nhật ký hệ thống (Audit Logs).",
              "Cô lập theo từng Workspace, và tách biệt các khóa ánh xạ của Khách hàng khỏi môi trường phân tích khi được cấu hình về mặt kỹ thuật.",
              "Giám sát an ninh và phát hiện sự cố trên các tài nguyên do nền tảng quản lý, cùng với việc rà soát, đánh giá lỗ hổng bảo mật định kỳ.",
              "Chỉ những nhân sự được phân công và chịu cam kết bảo mật nghiêm ngặt mới có quyền truy cập thông tin hỗ trợ kỹ thuật khi có yêu cầu bằng văn bản từ bạn.",
              "**Quản lý thông tin xác thực:** thông tin xác thực dùng để khởi chạy công việc được mã hóa và truyền an toàn tới môi trường thực thi; không hiển thị cho người dùng cuối và không lưu dưới dạng plain-text.",
              "**Tách biệt kiến trúc:** tầng điều khiển (điều phối job, thông tin xác thực, hạn ngạch) được tách biệt khỏi tầng dữ liệu.",
            ],
          },
          {
            type: "p",
            text: "Các biện pháp kiểm soát này áp dụng cho các dịch vụ và hạ tầng do Vieomics thực sự vận hành. Trong **mô hình do khách hàng tự quản lý**, bạn chịu trách nhiệm cấu hình và vận hành bảo mật cho hạ tầng của mình — bao gồm thông tin xác thực, chính sách truy cập, sao lưu và môi trường phân tích — trong khi chúng tôi chịu trách nhiệm về bảo mật của phần mềm do chúng tôi cung cấp.",
          },
          {
            type: "p",
            text: "Các biện pháp này được **thiết kế theo hướng** phù hợp với GDPR (EU) và HIPAA (Hoa Kỳ) để nền tảng sẵn sàng cho các yêu cầu nghiêm ngặt hơn trong tương lai; tính đến ngày cập nhật của Chính sách này, Omicslab **chưa được chứng nhận** theo bất kỳ khung nào trong số đó. Xử phạt vi phạm trong lĩnh vực an ninh mạng và bảo vệ dữ liệu cá nhân được quy định tại Nghị định 330/2026/NĐ-CP, có hiệu lực từ ngày 19 tháng 8 năm 2026.",
          },
          {
            type: "p",
            text: "Khi phát hiện sự cố rò rỉ, mất mát hoặc truy cập trái phép dữ liệu cá nhân thuộc phạm vi chúng tôi kiểm soát, chúng tôi kích hoạt quy trình ứng phó sự cố nội bộ và, khi pháp luật áp dụng yêu cầu thông báo, thông báo cho cơ quan có thẩm quyền và/hoặc chủ thể dữ liệu bị ảnh hưởng theo đúng mốc thời hạn, đối tượng và điều kiện phát sinh nghĩa vụ theo quy định pháp luật hiện hành. Hồ sơ vụ việc được lưu trữ ít nhất trong thời hạn mà pháp luật yêu cầu kể từ ngày khắc phục xong sự cố.",
          },
          {
            type: "p",
            text: "Các cam kết bảo mật của Nền tảng và phân định trách nhiệm giữa các bên được nêu tại Mục 12 của Chính sách này.",
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
              "**Bên cung cấp dịch vụ hạ tầng (Bên Xử lý):** Các đơn vị cung cấp hạ tầng máy chủ, cổng thanh toán… chịu ràng buộc bởi nghĩa vụ bảo mật và bảo vệ dữ liệu, và chỉ xử lý dữ liệu cá nhân theo chỉ dẫn của chúng tôi.",
              "**Cơ quan nhà nước:** Khi có yêu cầu bằng văn bản đúng thẩm quyền và trình tự pháp lý.",
            ],
          },
          {
            type: "p",
            text: "Dữ liệu của Khách hàng sẽ không bao giờ được chia sẻ cho bên thứ ba ngoại trừ trường hợp có chỉ định trực tiếp từ bạn, hoặc khi pháp luật yêu cầu. Chúng tôi không công bố, phân phối lại hoặc tái sử dụng dữ liệu của Khách hàng như một bộ dữ liệu công khai hoặc đối chuẩn nếu không có sự cho phép riêng và căn cứ pháp lý hợp lệ.",
          },
          {
            type: "p",
            text: "**Nhà cung cấp dịch vụ của trang web này:** (i) **Cloudflare Pages** — phân phối các file tĩnh của trang (chúng tôi không bật dịch vụ phân tích của Cloudflare); (ii) **Google Analytics** — chỉ chạy khi bạn chấp nhận cookie tại Mục 11; (iii) **DMCA.com** — hiển thị huy hiệu bảo vệ. Trong phạm vi Nền tảng, chúng tôi làm việc với đối tác hạ tầng Marketplace và cổng thanh toán, tất cả đều chịu ràng buộc bởi các điều khoản bảo mật và bảo vệ dữ liệu phù hợp.",
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
            text: "Để thực hiện các quyền trên đối với thông tin do chúng tôi kiểm soát, bạn có thể thao tác trực tiếp tại phần Cài đặt tài khoản hoặc [liên hệ với chúng tôi](/contact). Chúng tôi xác nhận yêu cầu đầy đủ, hợp lệ trong thời gian sớm nhất và hướng tới giải quyết trong vòng 72 giờ làm việc; với yêu cầu phức tạp hoặc liên quan dữ liệu buộc phải lưu giữ theo pháp luật, chúng tôi có thể cần thêm thời gian và sẽ thông báo cho bạn. Đây là mục tiêu dịch vụ của chúng tôi, không phải thời hạn luật định. Khi dữ liệu cá nhân chỉ nằm trong **môi trường do khách hàng tự quản lý** mà chúng tôi không kiểm soát hay truy cập, chúng tôi không thể trực tiếp truy cập, chỉnh sửa, xuất hay xóa dữ liệu đó — yêu cầu cần được gửi tới tổ chức kiểm soát môi trường (xem Mục 12).",
          },
        ],
      },
      {
        id: "transfers",
        title: "10. Lưu trữ và vị trí dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Hiện tại Vieomics chỉ vận hành Nền tảng Omicslab tại Việt Nam, không vận hành ở nước ngoài. Với khu vực Việt Nam (mặc định), dữ liệu và tính toán do Vieomics cung cấp được lưu trữ và xử lý tại Việt Nam.",
          },
          {
            type: "p",
            text: "Nền tảng cũng hỗ trợ khu vực toàn cầu (Global) cho người Việt Nam hoặc người sinh sống tại Việt Nam, cùng các hợp tác đa quốc gia; ở khu vực này, **dữ liệu và tính toán vẫn được đặt tại Việt Nam**, người dùng chỉ truy cập từ nước ngoài. Vì dữ liệu và tính toán do Vieomics cung cấp được đặt tại Việt Nam, việc chuyển dữ liệu cá nhân ra nước ngoài không phát sinh trong hoạt động hiện tại.",
          },
          {
            type: "table",
            head: ["Khu vực", "Instance", "Khuôn khổ", "Nơi lưu trữ dữ liệu"],
            rows: [
              ["Việt Nam (mặc định)", "platform.omicslab.vn", "PDPL (Luật 91/2025 + NĐ 356/2025)", "Dữ liệu và tính toán do Vieomics cung cấp được lưu tại Việt Nam"],
              ["Toàn cầu (Global)", "platform.omicslab.vn", "PDPL cho dữ liệu cá nhân tại Việt Nam", "Vẫn tại Việt Nam; cho người Việt Nam hoặc người sinh sống tại Việt Nam, cùng hợp tác đa quốc gia"],
            ],
          },
          {
            type: "p",
            text: "Khách hàng cần xử lý dữ liệu cá nhân nhạy cảm chưa được công bố công khai phải thỏa thuận riêng một mô hình triển khai **do khách hàng tự quản lý (self-hosted)** như nêu tại Mục 1. Trong mô hình do khách hàng tự quản lý, nơi lưu trữ dữ liệu và mọi chuyển dữ liệu xuyên biên giới phụ thuộc vào hạ tầng và dịch vụ do bạn lựa chọn — không phụ thuộc vào Vieomics. Thông tin liên hệ tại Mục 12 được áp dụng.",
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
        id: "responsibility",
        title: "12. Phân định trách nhiệm",
        blocks: [
          {
            type: "p",
            text: "Bảo mật là trách nhiệm chung. Bảng dưới đây nêu rõ bên nào kiểm soát từng hạng mục trong mỗi mô hình triển khai.",
          },
          {
            type: "table",
            head: [
              "Hạng mục / Hạ tầng",
              "Khách hàng tự quản lý (self-hosted)",
              "Nền tảng quản lý (Marketplace)",
            ],
            rows: [
              ["Lưu trữ dữ liệu", "Hạ tầng Cloud / Object Storage riêng của bạn", "Lưu trữ mã hóa AES-256 trên nền tảng (phân vùng theo Workspace)"],
              ["Kiểm soát phiên bản", "Kho mã nguồn (GitHub) riêng của bạn", "Kho mã nguồn tích hợp trên Marketplace"],
              ["Hạ tầng tính toán", "Cụm máy chủ HPC / Cloud riêng của bạn", "Hạ tầng tính toán được Omicslab quản lý trực tiếp"],
              ["Truy cập hạ tầng", "Khách hàng tự quản lý", "Nền tảng quản lý"],
              ["Thông tin xác thực (Credentials)", "Khách hàng tự quản lý", "Nền tảng bảo mật (không hiển thị dạng thô)"],
              ["Toàn bộ ứng dụng (frontend, backend, cơ sở dữ liệu)", "Khách hàng triển khai và vận hành", "Nền tảng vận hành"],
              ["Tuân thủ hạ tầng (Compliance)", "Khách hàng tự chịu trách nhiệm", "Nền tảng quản lý trong phạm vi của mình"],
            ],
          },
          { type: "label", text: "Cam kết bảo mật của Nền tảng" },
          {
            type: "ul",
            items: [
              "**Tách biệt kiến trúc:** tách biệt tầng điều khiển (Control Plane) khỏi tầng dữ liệu (Data Plane) khi được cấu hình.",
              "**Cấp quyền tối thiểu:** sử dụng mã xác thực ngắn hạn và giới hạn phạm vi truy cập nghiêm ngặt cho mọi kết nối liên vùng.",
              "**Cô lập môi trường:** tách biệt dữ liệu theo từng Workspace và kiểm soát truy cập theo vai trò (RBAC).",
              "**Minh bạch kiểm toán:** duy trì nhật ký ghi vết (Audit Logs) phục vụ công tác rà soát an ninh.",
              "**Quản lý lỗ hổng:** tiếp nhận báo cáo sự cố hoặc cấu hình sai bảo mật và phát hành bản vá kịp thời.",
            ],
          },
          { type: "label", text: "Trách nhiệm bắt buộc của Khách hàng" },
          {
            type: "ul",
            items: [
              "**Bảo mật tài khoản:** bảo vệ thông tin đăng nhập và bắt buộc áp dụng các biện pháp xác thực mạnh (MFA/2FA) trong tổ chức.",
              "**Tuân thủ pháp lý và đạo đức:** đạt được đầy đủ chấp thuận từ Hội đồng Đạo đức (IRB), sự đồng ý tự nguyện của chủ thể dữ liệu (Informed Consent) và các quyền hợp pháp cần thiết trước khi xử lý dữ liệu bộ gen hoặc dữ liệu sức khỏe con người.",
              "**Phân quyền dữ liệu:** chủ động phân loại dữ liệu và thiết lập quyền truy cập phù hợp cho từng Workspace cũng như tài nguyên lưu trữ.",
              "**Sao lưu và kiểm chứng:** tự duy trì bản sao lưu dự phòng độc lập và tự chịu trách nhiệm kiểm chứng kết quả phân tích theo chính sách quản trị dữ liệu nghiên cứu của tổ chức mình.",
            ],
          },
        ],
      },
      {
        id: "contact",
        title: "13. Thông tin liên hệ",
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
      "Các Điều khoản này điều chỉnh việc bạn sử dụng Nền tảng Omicslab — nền tảng tin sinh học để lưu trữ, phân tích và chia sẻ dữ liệu nghiên cứu sinh học. Dữ liệu bộ gen và dữ liệu sức khỏe của người chưa được công bố công khai không được xử lý trên Nền tảng cloud công khai; loại dữ liệu này được xử lý thông qua mô hình triển khai do khách hàng tự quản lý (xem Mục 3).",
    notice:
      "Khi truy cập hoặc sử dụng Nền tảng Omicslab, bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này. Nếu không đồng ý, vui lòng không sử dụng Nền tảng.",
    sections: [
      {
        id: "acceptance",
        title: "1. Chấp thuận Điều khoản",
        blocks: [
          {
            type: "p",
            text: "Các Điều khoản Dịch vụ này là thỏa thuận có ràng buộc pháp lý giữa bạn (**Người dùng**) và **CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS** (“**Công ty**”, “**chúng tôi**”) — pháp nhân vận hành Nền tảng Omicslab (“**Nền tảng**”). Khi tạo tài khoản, truy cập hoặc sử dụng Nền tảng, bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản này, [Chính sách bảo mật](/privacy) của chúng tôi và mọi chính sách khác được tham chiếu tại đây.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "2. Điều kiện và giới hạn độ tuổi",
        blocks: [
          {
            type: "p",
            text: "Bạn phải từ **đủ 18 tuổi** trở lên mới được tạo tài khoản hoặc sử dụng Nền tảng. Khi đăng ký, bạn cam kết mình từ 18 tuổi trở lên và có năng lực pháp lý để tham gia thỏa thuận có ràng buộc. Nền tảng không dành cho người chưa đủ 18 tuổi, và chúng tôi không chủ động thu thập dữ liệu cá nhân của người chưa thành niên. Nếu phát hiện người dùng dưới 18 tuổi, chúng tôi sẽ vô hiệu hóa tài khoản và xử lý dữ liệu cá nhân liên quan theo [Chính sách bảo mật](/privacy) — xóa hoặc ẩn danh hóa theo yêu cầu của pháp luật.",
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
            text: "Nền tảng công khai **không dành cho dữ liệu cá nhân nhạy cảm chưa được công bố công khai** và không tiếp nhận, không xử lý loại dữ liệu này. Bạn không được tải dữ liệu cá nhân nhạy cảm chưa được công bố công khai của cá nhân tại Việt Nam lên Nền tảng công khai, bao gồm dữ liệu bộ gen người, dữ liệu di truyền, dữ liệu liên quan đến sức khỏe và các dữ liệu danh mục đặc biệt khác theo định nghĩa của pháp luật Việt Nam. Dữ liệu đã được công bố công khai và truy cập mở hợp pháp, hoặc đã được ẩn danh hóa đúng cách đến mức việc tái nhận dạng không thể xảy ra một cách hợp lý, chỉ có thể được xử lý trên Nền tảng công khai trong một số trường hợp hạn chế, và chỉ khi đã đánh giá nguồn, điều kiện truy cập, giấy phép và rủi ro riêng tư — việc công bố công khai không tự nó làm dữ liệu trở thành ẩn danh.",
          },
          {
            type: "p",
            text: "Để xử lý dữ liệu nhạy cảm, bạn cần [liên hệ với chúng tôi](/contact) để **triển khai do khách hàng tự quản lý (self-hosted) theo thỏa thuận riêng**. Chúng tôi bàn giao và triển khai phần mềm Nền tảng trên hạ tầng của chính bạn và hướng dẫn đội ngũ của bạn thiết lập; bạn tự vận hành Nền tảng, tự cấu hình cơ sở dữ liệu, lưu trữ, tính toán và công cụ phân tích của mình, đồng thời kiểm soát quyền truy cập dữ liệu và môi trường phân tích. Chúng tôi không yêu cầu bạn phải tải dữ liệu bộ gen hay dữ liệu lâm sàng nhạy cảm lên hạ tầng do Vieomics quản lý chỉ để sử dụng mô hình tự quản lý; Vieomics cung cấp phần mềm và hỗ trợ trong phạm vi dịch vụ đã thỏa thuận và không truy cập dữ liệu này. Trách nhiệm đối với dữ liệu cá nhân được xác định theo hoạt động xử lý thực tế, quyền truy cập được cấp, mục đích xử lý và quy định pháp luật áp dụng — bạn chịu trách nhiệm về căn cứ pháp lý, các quyền và yêu cầu về sự đồng ý (khi áp dụng), cấu hình bảo mật cho môi trường của mình, và mọi đánh giá tác động xử lý dữ liệu cá nhân theo quy định của pháp luật.",
          },
          {
            type: "label",
            text: "Triển khai tự quản lý bởi khách hàng (Customer-Managed Deployment)",
          },
          {
            type: "p",
            text: "Đối với mô hình triển khai tự quản lý, Omicslab được cài đặt và vận hành trên hạ tầng do khách hàng sở hữu hoặc kiểm soát. Khách hàng chịu trách nhiệm triển khai, cấu hình và quản lý toàn bộ các thành phần của hệ thống, bao gồm frontend, backend, cơ sở dữ liệu, lưu trữ đối tượng, tài nguyên tính toán và các công cụ phân tích.",
          },
          {
            type: "p",
            text: "Vieomics cung cấp phần mềm, tài liệu hướng dẫn, hỗ trợ triển khai, cập nhật và hỗ trợ kỹ thuật theo phạm vi dịch vụ đã thỏa thuận. Trong mô hình này, Vieomics không mặc nhiên có quyền truy cập hoặc kiểm soát hạ tầng, cơ sở dữ liệu hay dữ liệu được khách hàng lưu trữ và xử lý trên hệ thống của mình. Không có dữ liệu nào từ mô hình do khách hàng tự quản lý được truyền tới Vieomics; hệ thống vận hành độc lập trên hạ tầng của khách hàng.",
          },
          {
            type: "p",
            text: "Mọi quyền truy cập của Vieomics vào môi trường khách hàng, nếu có, phải được khách hàng cho phép và giới hạn theo mục đích hỗ trợ đã thống nhất. Trách nhiệm của mỗi bên đối với dữ liệu cá nhân được xác định theo hoạt động xử lý thực tế, quyền quyết định đối với việc xử lý dữ liệu và các quy định pháp luật áp dụng.",
          },
          {
            type: "p",
            text: "Khi bạn vận hành Nền tảng trong môi trường của riêng mình, bạn đồng ý rằng:",
          },
          {
            type: "ul",
            items: [
              "Bạn đã có các chấp thuận đạo đức, sự đồng ý có hiểu biết và ủy quyền cần thiết để xử lý dữ liệu, theo pháp luật hiện hành và các hội đồng đạo đức của tổ chức bạn.",
              "Bạn không xử lý dữ liệu thu thập từ những người chưa đồng ý xử lý cho nghiên cứu tin sinh học, trừ khi pháp luật cho phép.",
              "Bạn vẫn là người kiểm soát dữ liệu (hoặc người xử lý được ủy quyền theo thỏa thuận của riêng bạn), và chịu trách nhiệm bảo đảm việc sử dụng tuân thủ mọi luật bảo vệ dữ liệu hiện hành, gồm Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) và, khi áp dụng, GDPR hoặc HIPAA.",
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
            text: "Bạn chịu trách nhiệm bảo mật thông tin xác thực của mình và cho mọi hoạt động diễn ra dưới tài khoản. Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ truy cập trái phép hoặc nghi ngờ bị xâm phạm nào. Chúng tôi áp dụng các biện pháp kiểm soát bảo mật theo chuẩn ngành — gồm mã hóa khi truyền tải và khi lưu trữ, kiểm soát truy cập và ghi nhật ký kiểm toán — nhưng không hệ thống nào là không thể xâm nhập, và bạn phải tự bảo vệ thông tin xác thực của mình. Chi tiết được công bố tại trang [Chính sách Thương mại điện tử](/policies).",
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
              "**Quyền của bạn:** bạn có quyền truy cập, sửa đổi, xóa bỏ, hạn chế, di trú và phản đối — xem [Chính sách bảo mật](/privacy) để biết chi tiết.",
            ],
          },
          {
            type: "p",
            text: "Đối với dữ liệu nghiên cứu bạn tải lên, bạn giữ quyền kiểm soát và sở hữu. Chúng tôi chỉ đóng vai trò **người xử lý** đối với dữ liệu bạn cung cấp cho một dịch vụ do nền tảng quản lý mà chúng tôi vận hành; với dữ liệu nằm trong mô hình do khách hàng tự quản lý, chúng tôi không xử lý dữ liệu đó. Chúng tôi là **người kiểm soát** đối với dữ liệu tài khoản, thanh toán, bảo mật và sử dụng cần để vận hành dịch vụ.",
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
            text: "Bạn có thể đóng tài khoản bất cứ lúc nào. Chúng tôi có thể đình chỉ hoặc chấm dứt quyền truy cập — có hoặc không thông báo — vì vi phạm các Điều khoản này, hoạt động bất hợp pháp, hoặc theo yêu cầu của luật. Khi chấm dứt, bạn vẫn chịu trách nhiệm cho các nghĩa vụ phát sinh trước đó. Dữ liệu cá nhân và dữ liệu nghiên cứu được xử lý theo [Chính sách bảo mật](/privacy).",
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
            text: "Các câu hỏi về Điều khoản này có thể gửi cho chúng tôi qua trang [Liên hệ](/contact) hoặc tới **contact@omicslab.io**, hoặc tới đầu mối bảo vệ dữ liệu được nêu trong [Chính sách bảo mật](/privacy).",
          },
        ],
      },
      {
        id: "billing",
        title: "13. Thanh toán, Số dư và Chu kỳ Dữ liệu",
        blocks: [
          {
            type: "p",
            text: "Các điều khoản thanh toán và chu kỳ dưới đây áp dụng cho Nền tảng; thời gian lưu trữ dữ liệu chi tiết được nêu tại [Chính sách bảo mật](/privacy).",
          },
          {
            type: "ul",
            items: [
              "**Gói đăng ký (Subscription):** được thanh toán theo chu kỳ, thông thường là theo tháng. Việc gia hạn phải được thực hiện trước khi chu kỳ hiện tại kết thúc.",
              "**Lưu trữ Marketplace (pay-as-you-go):** dung lượng lưu trữ được tính phí theo mức sử dụng và theo chu kỳ tháng, gắn với gói đăng ký, và không thể kéo dài quá thời hạn của gói đang có hiệu lực.",
              "**Cảnh báo trước bằng email:** trước mọi hành động, chúng tôi gửi email cho quản trị viên — nhắc trước **7 ngày** khi chu kỳ lưu trữ sắp kết thúc, và thông báo ngay khi chu kỳ hết hạn. Sau khi hết hạn, dữ liệu được giữ thêm **thời gian ân hạn 1 tháng** trước khi bị dọn dẹp.",
              "**Dọn dẹp dữ liệu workspace:** qua thời hạn ân, dữ liệu trong workspace bị xóa — chỉ nhật ký audit được giữ lại cho mục đích tra cứu (chi tiết tại Mục 6 [Chính sách bảo mật](/privacy)).",
              "**Số dư Top-up:** chỉ có thể sử dụng khi tổ chức còn gói đăng ký hiệu lực. Khi gói hết hạn hoặc bị hủy mà không có gia hạn đang chờ xử lý, số dư còn lại bị thu hồi về 0; thông tin về số dư và các mốc thời hạn cũng được gửi qua email trước khi áp dụng.",
            ],
          },
        ],
      },
    ],
  },

  hub: {
    kicker: "Pháp lý",
    title: "Chính sách",
    description:
      "Các chính sách điều chỉnh Nền tảng Omicslab — bao gồm các nội dung công bố bắt buộc đối với website cung cấp dịch vụ thương mại điện tử theo quy định của Bộ Công Thương (Nghị định 52/2013/NĐ-CP, sửa đổi bởi Nghị định 85/2021/NĐ-CP).",
    intro:
      "Nền tảng Omicslab là dịch vụ phân tích dữ liệu tin sinh học do CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS vận hành. Các tài liệu dưới đây hợp thành bộ chính sách và được áp dụng cùng nhau.",
  },

  pricing: {
    kicker: "Pháp lý",
    title: "Chính sách giá",
    navTitle: "Chính sách giá",
    description:
      "Cách Omicslab xác định, niêm yết và điều chỉnh giá dịch vụ của Nền tảng.",
    sections: [
      {
        id: "price-basis",
        title: "Điều 1. Giá dịch vụ và đơn vị tiền tệ",
        blocks: [
          {
            type: "p",
            text: "Một số sản phẩm hoặc tính năng của Nền tảng có thể áp dụng phí dịch vụ. Biểu phí được công bố trên trang bảng giá của Nền tảng, trên Dashboard hoặc thông báo trực tiếp đến Khách hàng.",
          },
          {
            type: "ul",
            items: [
              "**Gói đăng ký (Subscription):** tính phí theo chu kỳ, thông thường theo tháng, theo gói bạn lựa chọn.",
              "**Lưu trữ Marketplace (pay-as-you-go):** tính phí theo mức sử dụng, theo chu kỳ tháng, gắn với gói đăng ký đang có hiệu lực.",
              "**Nạp trước (top-up):** khoản tín dụng trả trước trong ví tổ chức, dùng để thanh toán cho các dịch vụ trên Nền tảng.",
            ],
          },
          {
            type: "p",
            text: "Giá được thể hiện bằng **Đồng Việt Nam (VND)**, đã bao gồm hoặc chưa bao gồm thuế GTGT tùy theo thông báo tại bước thanh toán hoặc trên hóa đơn. Ngoài khoản phí đã niêm yết, không phát sinh chi phí nào khác từ việc bán dịch vụ. Chi phí cho hạ tầng bạn tự kết nối (Bring Your Own Cloud) do nhà cung cấp của bạn thu và không thuộc giá của chúng tôi.",
          },
        ],
      },
      {
        id: "quota",
        title: "Điều 2. Hạn ngạch sử dụng và cước vượt",
        blocks: [
          {
            type: "p",
            text: "Mỗi gói bao gồm các hạn ngạch sử dụng (lưu trữ, tính toán và số job chạy đồng thời). Nếu mức sử dụng vượt hạn ngạch đã đăng ký trong một chu kỳ, phần vượt được tính theo đơn giá hiệu lực của gói và trừ từ số dư trả trước của Khách hàng mà không làm gián đoạn dịch vụ. Khách hàng cần duy trì số dư phù hợp với mức sử dụng thực tế để dịch vụ hoạt động ổn định.",
          },
        ],
      },
      {
        id: "changes",
        title: "Điều 3. Thay đổi giá và khuyến mại",
        blocks: [
          {
            type: "p",
            text: "Biểu phí có thể được điều chỉnh theo từng thời điểm, hoặc áp dụng các chương trình khuyến mại. Khi có thay đổi, chúng tôi công bố trên Nền tảng ít nhất **20 ngày** trước thời điểm áp dụng. Nếu Khách hàng tiếp tục sử dụng dịch vụ sau khi biểu phí mới có hiệu lực thì được xem là đã chấp nhận mức phí đã điều chỉnh.",
          },
        ],
      },
      {
        id: "refunds",
        title: "Điều 4. Hoàn tiền",
        blocks: [
          {
            type: "p",
            text: "Trừ khi pháp luật có quy định khác, các khoản phí đã thanh toán **không được hoàn lại**. Việc hoàn tiền khi chấm dứt dịch vụ được điều chỉnh bởi [Chính sách về phương thức cung cấp dịch vụ, chấm dứt dịch vụ và hoàn tiền](/policies/service-provision).",
          },
        ],
      },
    ],
  },

  payment: {
    kicker: "Pháp lý",
    title: "Chính sách thanh toán",
    navTitle: "Chính sách thanh toán",
    description:
      "Cách đăng ký trực tuyến dịch vụ Omicslab và cách thức thanh toán.",
    sections: [
      {
        id: "steps",
        title: "Điều 1. Hướng dẫn đăng ký và thanh toán trực tuyến",
        blocks: [
          {
            type: "ul",
            items: [
              "**Bước 1:** mở trang bảng giá trên Nền tảng, chọn gói bạn mong muốn và chọn “Đăng ký”.",
              "**Bước 2:** tạo tài khoản hoặc đăng nhập. Nếu là người dùng mới, điền các thông tin yêu cầu; chúng tôi gửi email xác nhận để kích hoạt tài khoản.",
              "**Bước 3:** quay lại mục bảng giá và chọn gói phù hợp nhu cầu.",
              "**Bước 4:** hoàn tất thông tin thanh toán và tiếp tục.",
              "**Bước 5:** kiểm tra gói, điền mã giảm giá nếu có và tiếp tục thanh toán.",
              "**Bước 6:** thanh toán bằng mã QR hoặc chuyển khoản theo thông tin được cung cấp để kích hoạt gói dịch vụ.",
            ],
          },
        ],
      },
      {
        id: "methods",
        title: "Điều 2. Phương thức thanh toán",
        blocks: [
          { type: "p", text: "Nền tảng hỗ trợ các phương thức thanh toán sau:" },
          {
            type: "ul",
            items: [
              "Chuyển khoản ngân hàng theo thông tin tài khoản hiển thị trên Dashboard hoặc trên hóa đơn. Vui lòng không sửa nội dung chuyển khoản.",
              "Cổng thanh toán trực tuyến, hỗ trợ thẻ nội địa, thẻ quốc tế và các phương thức mà cổng cung cấp.",
              "Nạp trước (top-up) vào ví tổ chức.",
            ],
          },
          {
            type: "p",
            text: "Vui lòng kiểm tra kỹ thông tin thanh toán trước khi chuyển khoản. Dịch vụ chỉ được kích hoạt hoặc gia hạn sau khi chúng tôi xác nhận thanh toán.",
          },
        ],
      },
      {
        id: "cycles",
        title: "Điều 3. Chu kỳ thanh toán và số dư top-up",
        blocks: [
          {
            type: "ul",
            items: [
              "Thanh toán theo từng chu kỳ, thông thường theo tháng. Việc gia hạn phải hoàn tất trước khi chu kỳ hiện tại kết thúc.",
              "Hóa đơn điện tử được phát hành theo quy định của pháp luật.",
              "**Số dư top-up:** chỉ sử dụng được khi tổ chức còn gói đăng ký hiệu lực. Khi gói hết hạn hoặc bị hủy mà không có gia hạn đang xử lý, số dư còn lại bị thu hồi và đưa về 0 theo quy trình tự động hằng ngày; email cảnh báo được gửi trước khi áp dụng.",
            ],
          },
        ],
      },
      {
        id: "issues",
        title: "Điều 4. Thanh toán thất bại và giao dịch trùng lặp",
        blocks: [
          {
            type: "ul",
            items: [
              "Nếu thanh toán không thành công, quyền truy cập dịch vụ có thể bị tạm khóa cho đến khi thanh toán hoàn tất.",
              "Nếu phát sinh giao dịch trùng lặp hoặc ghi nợ sai, vui lòng liên hệ; chúng tôi đối soát và hoàn trả phần chênh lệch.",
            ],
          },
        ],
      },
      {
        id: "refunds",
        title: "Điều 5. Hoàn tiền khi chấm dứt dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Các khoản phí đã thanh toán không được hoàn lại trừ khi pháp luật có quy định khác. Việc hoàn tiền khi chấm dứt dịch vụ được điều chỉnh bởi [Chính sách về phương thức cung cấp dịch vụ, chấm dứt dịch vụ và hoàn tiền](/policies/service-provision).",
          },
        ],
      },
    ],
  },

  serviceProvision: {
    kicker: "Pháp lý",
    title: "Chính sách về phương thức cung cấp dịch vụ, chấm dứt dịch vụ và hoàn tiền",
    navTitle: "Cung cấp dịch vụ & hoàn tiền",
    description:
      "Cách Nền tảng cung cấp dịch vụ, cách dịch vụ chấm dứt và khi nào phí được hoàn lại.",
    sections: [
      {
        id: "conditions",
        title: "Điều 1. Điều kiện sử dụng dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Để sử dụng dịch vụ của Nền tảng, Khách hàng phải đáp ứng các điều kiện sau:",
          },
          {
            type: "ul",
            items: [
              "Có đầy đủ năng lực pháp luật và năng lực hành vi dân sự theo quy định.",
              "Là cá nhân, doanh nghiệp hoặc tổ chức hoạt động hợp pháp.",
              "Cung cấp đầy đủ, trung thực và chính xác thông tin đăng ký theo yêu cầu.",
              "Có quyền hợp pháp đối với hạ tầng, hệ thống hoặc dữ liệu được kết nối với Nền tảng.",
              "Tuân thủ chính sách này và các quy định pháp luật có liên quan.",
            ],
          },
          {
            type: "p",
            text: "Chúng tôi có quyền yêu cầu Khách hàng cung cấp thông tin hoặc tài liệu bổ sung để xác minh trong quá trình đăng ký hoặc sử dụng dịch vụ.",
          },
        ],
      },
      {
        id: "delivery",
        title: "Điều 2. Phương thức cung cấp dịch vụ",
        blocks: [
          {
            type: "ul",
            items: [
              "Dịch vụ được cung cấp **trực tuyến** qua Nền tảng Omicslab. Không giao hàng hóa vật lý.",
              "Tài khoản và không gian làm việc (workspace) được kích hoạt sau khi thanh toán hoặc xác nhận.",
              "Dịch vụ được cung cấp theo khả năng sẵn có, theo khu vực và gói. Xem [Điều kiện và hạn chế](/policies/conditions) về khả dụng dịch vụ và từ chối bảo đảm.",
            ],
          },
        ],
      },
      {
        id: "term",
        title: "Điều 3. Thời hạn sử dụng dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Thời hạn sử dụng được xác định theo gói dịch vụ hoặc thỏa thuận giữa Omicslab và Khách hàng, và được thông tin rõ ràng trước hoặc tại thời điểm đăng ký. Đối với dịch vụ có thời hạn xác định, quyền sử dụng của Khách hàng có hiệu lực từ khi bắt đầu sử dụng đến hết thời hạn đã đăng ký hoặc thỏa thuận. Đối với dịch vụ gia hạn định kỳ, thời hạn được tiếp tục sau khi Khách hàng hoàn tất gia hạn và đáp ứng đầy đủ các điều kiện áp dụng.",
          },
        ],
      },
      {
        id: "termination",
        title: "Điều 4. Các trường hợp chấm dứt dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Dịch vụ có thể chấm dứt khi hết thời hạn, theo yêu cầu của Khách hàng, theo thỏa thuận giữa các bên, hoặc khi Omicslab thực hiện quyền tạm ngừng, giới hạn hoặc chấm dứt cung cấp dịch vụ trong các trường hợp sau:",
          },
          {
            type: "ul",
            items: [
              "Khách hàng vi phạm các điều kiện sử dụng dịch vụ.",
              "Phát hiện dấu hiệu gian lận, lạm dụng hoặc rủi ro bảo mật.",
              "Khách hàng không thanh toán đầy đủ các khoản phí theo quy định.",
              "Theo yêu cầu của cơ quan nhà nước có thẩm quyền.",
              "Theo yêu cầu hoặc thay đổi từ đối tác cung cấp dịch vụ hoặc hạ tầng.",
              "Cần bảo trì, nâng cấp hoặc bảo vệ hệ thống.",
            ],
          },
          {
            type: "p",
            text: "Khi dịch vụ chấm dứt, chúng tôi có quyền thu hồi thông tin xác thực và vô hiệu hóa quyền truy cập vào hệ thống. Việc chấm dứt không làm chấm dứt các nghĩa vụ tài chính hoặc trách nhiệm pháp lý đã phát sinh trước thời điểm chấm dứt.",
          },
        ],
      },
      {
        id: "end-time",
        title: "Điều 5. Thời điểm hợp đồng chấm dứt hiệu lực",
        blocks: [
          {
            type: "p",
            text: "Hợp đồng giữa Omicslab và Khách hàng chấm dứt hiệu lực khi xảy ra một trong các trường hợp sau:",
          },
          {
            type: "ul",
            items: [
              "Hết thời hạn đã thỏa thuận mà các bên không có thỏa thuận gia hạn.",
              "Các bên đã hoàn thành đầy đủ quyền, nghĩa vụ và thống nhất chấm dứt hợp đồng trước thời hạn.",
              "Một trong các bên thực hiện quyền chấm dứt hợp đồng theo thỏa thuận hoặc theo quy định của pháp luật.",
              "Omicslab chấm dứt cung cấp dịch vụ theo hợp đồng, điều khoản sử dụng, chính sách của mình hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền.",
              "Các trường hợp khác theo thỏa thuận giữa các bên hoặc theo quy định của pháp luật.",
            ],
          },
          {
            type: "p",
            text: "Trường hợp không công bố rõ thời điểm chấm dứt hiệu lực và Khách hàng là bên chấm dứt, thì thời điểm Khách hàng gửi thông báo được coi là thời điểm hợp đồng chấm dứt.",
          },
        ],
      },
      {
        id: "termination-process",
        title: "Điều 6. Quy trình, thời hạn phản hồi khi Khách hàng gửi thông báo chấm dứt",
        blocks: [
          {
            type: "p",
            text: "Sau khi nhận được thông báo chấm dứt, chúng tôi kiểm tra và xác nhận tiếp nhận trong thời hạn tối đa **03 ngày làm việc**. Trường hợp thông báo chưa đầy đủ hoặc cần xác minh thêm, chúng tôi có thể yêu cầu Khách hàng bổ sung thông tin cần thiết; thời hạn được tính từ khi nhận đủ thông tin hợp lệ. Sau khi kiểm tra xong, chúng tôi phản hồi xác nhận việc chấm dứt, thời điểm chấm dứt và các nghĩa vụ còn tồn tại (nếu có). Chúng tôi dự kiến hoàn tất việc kiểm tra và phản hồi trong thời hạn **07 ngày làm việc** kể từ ngày nhận đủ thông tin hợp lệ; đối với trường hợp cần đối soát giao dịch hoặc phối hợp với bên thứ ba, thời hạn có thể kéo dài hơn và chúng tôi thông báo cho Khách hàng về tình trạng xử lý và thời gian dự kiến hoàn tất.",
          },
        ],
      },
      {
        id: "refunds",
        title: "Điều 7. Hoàn tiền khi chấm dứt dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Phí dịch vụ mà Khách hàng đã thanh toán cho Omicslab là khoản phí cho việc đăng ký và sử dụng dịch vụ theo thỏa thuận. Chúng tôi không hoàn trả phí dịch vụ trong trường hợp Khách hàng chấm dứt, ngừng hoặc không tiếp tục sử dụng dịch vụ trước thời hạn, trừ trường hợp pháp luật có quy định khác hoặc có chính sách riêng được công bố áp dụng cho từng dịch vụ. Việc chấm dứt không làm chấm dứt các nghĩa vụ tài chính hoặc trách nhiệm pháp lý đã phát sinh trước thời điểm chấm dứt. Không nội dung nào trong chính sách này làm hạn chế các quyền của người tiêu dùng theo quy định của pháp luật Việt Nam.",
          },
        ],
      },
    ],
  },

  conditions: {
    kicker: "Pháp lý",
    title: "Các điều kiện hoặc hạn chế trong việc cung cấp dịch vụ",
    navTitle: "Điều kiện & hạn chế",
    description:
      "Các điều kiện, giới hạn và hành vi bị cấm áp dụng cho Nền tảng.",
    sections: [
      {
        id: "conditions",
        title: "Điều 1. Điều kiện sử dụng dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Để sử dụng dịch vụ của Nền tảng, Khách hàng phải đáp ứng các điều kiện sau:",
          },
          {
            type: "ul",
            items: [
              "Từ **đủ 18 tuổi** trở lên, có đầy đủ năng lực pháp luật, hoặc là tổ chức hoạt động hợp pháp.",
              "Cung cấp đầy đủ, trung thực và chính xác thông tin đăng ký.",
              "Có quyền hợp pháp đối với hạ tầng, hệ thống hoặc dữ liệu được kết nối với Nền tảng.",
              "Tuân thủ các điều kiện này và các quy định pháp luật có liên quan.",
            ],
          },
        ],
      },
      {
        id: "scope",
        title: "Điều 2. Phạm vi sử dụng hợp lệ",
        blocks: [
          {
            type: "p",
            text: "Nền tảng cung cấp dịch vụ lưu trữ và phân tích dữ liệu tin sinh học — là dịch vụ phần mềm. Nền tảng không cung cấp hàng hóa vật lý. Bạn được phép sử dụng Nền tảng để:",
          },
          {
            type: "ul",
            items: [
              "Lưu trữ, quản lý và phân tích dữ liệu nghiên cứu phi người (vi sinh vật, thực vật, động vật, mẫu môi trường) và các khối lượng công việc khác trong phạm vi gói đã đăng ký.",
              "Tích hợp API và công cụ của Nền tảng vào website, ứng dụng hoặc hệ thống nội bộ của bạn.",
              "Đồng bộ kết quả phân tích và metadata với phần mềm hoặc hệ thống quản lý của bạn.",
            ],
          },
          {
            type: "p",
            text: "**Dữ liệu cá nhân nhạy cảm:** Nền tảng công khai không tiếp nhận và không xử lý dữ liệu cá nhân nhạy cảm chưa được công bố công khai của cá nhân tại Việt Nam. Dữ liệu bộ gen người hoặc dữ liệu liên quan đến sức khỏe chỉ được xử lý thông qua một mô hình **do khách hàng tự quản lý (self-hosted)** theo thỏa thuận riêng, trong đó chúng tôi bàn giao và triển khai phần mềm trên hạ tầng của chính bạn và bạn tự vận hành, tự cấu hình, phân tích, lưu trữ và quản lý dữ liệu (xem [Chính sách bảo mật](/privacy)). **Dữ liệu người được công bố công khai không mặc nhiên là dữ liệu ẩn danh:** dữ liệu đã được công bố công khai và truy cập mở hợp pháp, hoặc đã được ẩn danh hóa đúng cách chỉ có thể được xử lý trên Nền tảng công khai sau khi đánh giá nguồn, điều kiện truy cập và rủi ro riêng tư.",
          },
        ],
      },
      {
        id: "law",
        title: "Điều 3. Tuân thủ pháp luật",
        blocks: [
          {
            type: "p",
            text: "Bạn đồng ý sử dụng Nền tảng phù hợp với pháp luật Việt Nam và các quy định có liên quan về bảo vệ dữ liệu, an ninh mạng và nghiên cứu khoa học. Bạn chịu trách nhiệm về căn cứ pháp lý, sự đồng ý và chấp thuận đạo đức đối với dữ liệu bạn xử lý.",
          },
        ],
      },
      {
        id: "prohibited",
        title: "Điều 4. Các hành vi bị nghiêm cấm",
        blocks: [
          { type: "p", text: "Bạn không được sử dụng Nền tảng để:" },
          {
            type: "ul",
            items: [
              "Vi phạm pháp luật hoặc xâm phạm quyền của bất kỳ người nào.",
              "Tải dữ liệu cá nhân nhạy cảm chưa được công bố công khai của cá nhân tại Việt Nam lên Nền tảng công khai (trừ dữ liệu công khai đã được công bố công khai hoặc ẩn danh hóa hợp pháp).",
              "Cung cấp thông tin sai sự thật hoặc giả mạo danh tính của bất kỳ người hoặc tổ chức nào.",
              "Tải lên mã độc, cố gắng truy cập trái phép hoặc can thiệp vào an ninh, ổn định của Nền tảng.",
              "Tái định danh cá nhân hoặc phân biệt đối xử với bất kỳ người hoặc nhóm nào.",
              "Lách hạn ngạch hoặc biện pháp bảo mật, hoặc bán lại quyền truy cập khi không có sự cho phép bằng văn bản.",
              "Dịch ngược, sao chép hoặc khai thác phần mềm, API hoặc tài liệu kỹ thuật của Nền tảng khi chưa được chấp thuận bằng văn bản.",
            ],
          },
        ],
      },
      {
        id: "access",
        title: "Điều 5. Truy cập, thông tin xác thực và tích hợp",
        blocks: [
          {
            type: "p",
            text: "Bạn chịu trách nhiệm tích hợp với Nền tảng theo đúng tài liệu kỹ thuật của chúng tôi, bảo vệ thông tin xác thực của mình và kiểm soát quyền truy cập của nhân viên hoặc bên thứ ba. Bạn phải thông báo ngay cho chúng tôi khi phát hiện dấu hiệu lộ thông tin xác thực, truy cập trái phép hoặc sử dụng bất thường. Chúng tôi có thể áp dụng rate limit hoặc biện pháp kỹ thuật khác để bảo vệ hạ tầng, và có thể thay đổi hoặc ngừng hỗ trợ một phần API để nâng cấp hoặc tuân thủ pháp luật, thông báo hợp lý khi thay đổi ảnh hưởng đến việc tích hợp của bạn.",
          },
        ],
      },
      {
        id: "infrastructure",
        title: "Điều 6. Hạ tầng do Khách hàng tự quản lý",
        blocks: [
          {
            type: "p",
            text: "Trường hợp bạn kết nối hạ tầng lưu trữ, kiểm soát phiên bản hoặc tính toán của riêng mình (Bring Your Own Cloud), bạn chịu trách nhiệm về tính bảo mật, quyền truy cập và an toàn dữ liệu trên hạ tầng đó. Trong giới hạn pháp luật cho phép, chúng tôi không chịu trách nhiệm đối với sự cố phát sinh từ hệ thống do bạn tự quản lý, mà không giới hạn các nghĩa vụ của chính chúng tôi theo pháp luật hiện hành hoặc theo thỏa thuận riêng.",
          },
        ],
      },
      {
        id: "availability",
        title: "Điều 7. Độ ổn định và tính sẵn sàng của dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi nỗ lực duy trì hệ thống ổn định, an toàn và liên tục, nhưng không bảo đảm dịch vụ hoạt động 100% thời gian, không có lỗi hoặc gián đoạn, hoặc có thời gian phản hồi cố định. Gián đoạn có thể phát sinh do bảo trì, sự cố hạ tầng hoặc đối tác, lỗi Internet hoặc viễn thông, tấn công mạng, hoặc các sự kiện nằm ngoài khả năng kiểm soát hợp lý của chúng tôi.",
          },
        ],
      },
      {
        id: "suspension",
        title: "Điều 8. Tạm ngừng và chấm dứt dịch vụ",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi có thể tạm ngừng, giới hạn hoặc chấm dứt dịch vụ khi các điều kiện này hoặc điều khoản sử dụng bị vi phạm, khi có dấu hiệu gian lận, lạm dụng hoặc rủi ro bảo mật, khi phí không được thanh toán đầy đủ, theo yêu cầu của cơ quan có thẩm quyền, hoặc khi cần bảo trì, nâng cấp hoặc bảo vệ hệ thống. Khi chấm dứt, chúng tôi có thể thu hồi thông tin xác thực và vô hiệu hóa quyền truy cập. Việc chấm dứt không làm chấm dứt các nghĩa vụ tài chính hoặc trách nhiệm pháp lý đã phát sinh trước thời điểm chấm dứt.",
          },
        ],
      },
      {
        id: "force-majeure",
        title: "Điều 9. Sự kiện bất khả kháng",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi không chịu trách nhiệm đối với việc chậm hoặc không thể thực hiện nghĩa vụ do các sự kiện bất khả kháng, bao gồm thiên tai, hỏa hoạn, dịch bệnh, chiến tranh, mất điện diện rộng, tấn công mạng, lỗi Internet hoặc viễn thông, lỗi từ đối tác hạ tầng, hoặc quyết định của cơ quan nhà nước. Trong trường hợp này, chúng tôi sẽ nỗ lực khắc phục trong thời gian sớm nhất có thể.",
          },
        ],
      },
      {
        id: "changes",
        title: "Điều 10. Thay đổi các điều kiện",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi có thể sửa đổi hoặc bổ sung các điều kiện này khi cần thiết để phù hợp với hoạt động, yêu cầu của đối tác hoặc quy định của pháp luật. Phiên bản cập nhật được công bố trên Nền tảng. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có hiệu lực đồng nghĩa với việc chấp nhận nội dung sửa đổi.",
          },
        ],
      },
      {
        id: "effect",
        title: "Điều 11. Hiệu lực",
        blocks: [
          {
            type: "p",
            text: "Các điều kiện này có hiệu lực kể từ ngày được công bố trên Nền tảng. Nếu bất kỳ điều khoản nào bị tuyên vô hiệu theo quyết định của cơ quan có thẩm quyền thì các điều khoản còn lại vẫn giữ nguyên hiệu lực. Bằng việc đăng ký tài khoản hoặc sử dụng bất kỳ sản phẩm, API hoặc dịch vụ nào, Khách hàng xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều kiện hoặc hạn chế trong việc cung cấp dịch vụ này.",
          },
        ],
      },
    ],
  },

  rightsObligations: {
    kicker: "Pháp lý",
    title: "Quyền và nghĩa vụ các bên",
    navTitle: "Quyền & nghĩa vụ",
    description:
      "Quyền và nghĩa vụ của Omicslab (đơn vị vận hành nền tảng) và của Khách hàng.",
    sections: [
      {
        id: "provider",
        title: "Điều 1. Quyền và nghĩa vụ của đơn vị vận hành nền tảng (Omicslab / Vieomics)",
        blocks: [
          {
            type: "ul",
            items: [
              "Ban hành, công khai và tổ chức thực hiện điều kiện hoạt động, điều kiện giao dịch; xây dựng, công khai tiêu chuẩn dịch vụ và quy trình trên Nền tảng.",
              "Thu phí dịch vụ theo [Chính sách giá](/policies/pricing) đã công khai và thông tin đầy đủ hoặc tóm tắt về hình thức khuyến mại (nếu có) cho người mua trước khi đặt hàng.",
              "Bảo đảm vận hành an toàn, ổn định Nền tảng.",
              "Tạm ngừng, giới hạn hoặc chấm dứt cung cấp dịch vụ theo các trường hợp nêu tại [Chính sách về phương thức cung cấp dịch vụ, chấm dứt dịch vụ và hoàn tiền](/policies/service-provision); thu hồi thông tin xác thực và vô hiệu hóa quyền truy cập khi chấm dứt.",
              "Áp dụng các biện pháp bảo vệ bí mật kinh doanh và dữ liệu cá nhân của người tiêu dùng theo [Chính sách bảo mật](/privacy) đã công khai.",
              "Tiếp nhận, giải quyết yêu cầu, phản ánh, khiếu nại từ người sử dụng.",
              "Giám sát, ngăn chặn hành vi vi phạm pháp luật; phối hợp và cung cấp thông tin, dữ liệu theo yêu cầu của cơ quan nhà nước có thẩm quyền.",
              "Cung cấp thông tin chính xác, đầy đủ; bảo đảm chất lượng dịch vụ; thực hiện đầy đủ nghĩa vụ cung cấp dịch vụ, đổi trả, hoàn tiền; không lợi dụng nền tảng để kinh doanh ngành, nghề cấm đầu tư kinh doanh, hàng giả, hàng xâm phạm quyền sở hữu trí tuệ và các hành vi vi phạm pháp luật khác.",
              "Thực hiện nghĩa vụ tài chính với Nhà nước; bảo vệ dữ liệu của người mua; bảo vệ thông tin của người tiêu dùng; phối hợp với cơ quan nhà nước có thẩm quyền trong việc xử lý vi phạm pháp luật.",
            ],
          },
        ],
      },
      {
        id: "customer",
        title: "Điều 2. Quyền và nghĩa vụ của Khách hàng",
        blocks: [
          {
            type: "ul",
            items: [
              "Được bảo đảm quyền lợi của người tiêu dùng; được cung cấp thông tin đầy đủ, chính xác về dịch vụ và đơn vị cung cấp.",
              "Được lựa chọn dịch vụ, phương thức thanh toán; được bảo vệ dữ liệu cá nhân; được giải quyết phản ánh, yêu cầu, khiếu nại theo quy định.",
              "Cung cấp thông tin cần thiết, chính xác; thanh toán đầy đủ, đúng hạn.",
              "Tuân thủ quy định pháp luật, điều kiện hoạt động và điều kiện giao dịch của Nền tảng; không lợi dụng Nền tảng để thực hiện hành vi vi phạm pháp luật.",
            ],
          },
        ],
      },
    ],
  },

  complaints: {
    kicker: "Pháp lý",
    title: "Phương thức tiếp nhận và giải quyết phản ánh, yêu cầu, khiếu nại",
    navTitle: "Phản ánh & khiếu nại",
    description:
      "Cách gửi phản ánh, yêu cầu, khiếu nại và quy trình, thời hạn giải quyết.",
    sections: [
      {
        id: "methods",
        title: "Điều 1. Các phương thức tiếp nhận",
        blocks: [
          {
            type: "p",
            text: "Mọi yêu cầu hỗ trợ, phản ánh hoặc khiếu nại liên quan đến dịch vụ, vui lòng liên hệ với chúng tôi qua:",
          },
          {
            type: "ul",
            items: [
              "Biểu mẫu trực tuyến tại trang [Liên hệ](/contact).",
              "Email **contact@omicslab.io** — vui lòng ghi rõ “Phản ánh / Khiếu nại” ở tiêu đề email.",
              "Đầu mối bảo vệ dữ liệu cá nhân (DPO) **Nguyễn Tấn Thanh Giang** — **giangnguyen@omicslab.io** đối với khiếu nại liên quan đến dữ liệu cá nhân.",
              "Gửi bưu điện hoặc trực tiếp tại: CÔNG TY TRÁCH NHIỆM HỮU HẠN VIEOMICS, Số 10 Sông Thao, Phường Tân Sơn Hòa, Thành phố Hồ Chí Minh, Việt Nam.",
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Điều 2. Trình tự, thủ tục tiếp nhận và xử lý",
        blocks: [
          {
            type: "ul",
            items: [
              "**Bước 1 — Tiếp nhận:** bộ phận chăm sóc khách hàng tiếp nhận khiếu nại qua các kênh trên và phản hồi xác nhận đã nhận.",
              "**Bước 2 — Phân tích và xác minh:** khiếu nại được chuyển đến các bộ phận chuyên môn có liên quan để kiểm tra, xác minh nguyên nhân và mức độ sự việc.",
              "**Bước 3 — Đề xuất giải pháp và phản hồi:** dựa trên kết quả xác minh, chúng tôi đưa ra phương án giải quyết và liên hệ trực tiếp với Khách hàng để thống nhất.",
              "**Bước 4 — Thực hiện và đóng khiếu nại:** nếu Khách hàng đồng ý, chúng tôi thực hiện phương án đã thống nhất và thông báo đóng khiếu nại.",
            ],
          },
        ],
      },
      {
        id: "timelines",
        title: "Điều 3. Thời hạn phản hồi và giải quyết",
        blocks: [
          {
            type: "p",
            text: "Chúng tôi phản hồi các phản ánh, yêu cầu, khiếu nại trong vòng **03 ngày làm việc** kể từ thời điểm nhận được. Tùy theo tính chất, mức độ phức tạp và nội dung của từng khiếu nại, chúng tôi dự kiến giải quyết trong thời hạn **07 ngày làm việc** kể từ ngày xác nhận tiếp nhận đầy đủ thông tin, tài liệu cần thiết từ Khách hàng.",
          },
          {
            type: "p",
            text: "Đối với các vụ việc cần xác minh thêm, đối soát dữ liệu hoặc phối hợp với đối tác hoặc bên thứ ba có liên quan, thời hạn giải quyết có thể kéo dài hơn. Trong trường hợp này, chúng tôi thông báo cho Khách hàng về tình trạng xử lý, nguyên nhân và thời gian dự kiến hoàn tất.",
          },
        ],
      },
      {
        id: "tools",
        title: "Điều 4. Các biện pháp, công cụ hỗ trợ giải quyết",
        blocks: [
          {
            type: "ul",
            items: [
              "**Trao đổi, làm rõ với Khách hàng:** chúng tôi có thể trao đổi qua các kênh trên để làm rõ nội dung vụ việc, nguyên nhân và phương án xử lý.",
              "**Kiểm tra và đối soát thông tin:** chúng tôi có thể kiểm tra thông tin tài khoản, giao dịch, lịch sử sử dụng, dữ liệu trên hệ thống và tài liệu do Khách hàng cung cấp.",
              "**Yêu cầu bổ sung thông tin, tài liệu:** khi cần thiết, chúng tôi có thể yêu cầu Khách hàng cung cấp thêm thông tin, hình ảnh, chứng từ hoặc tài liệu liên quan.",
              "**Phối hợp với các bên liên quan:** khi vụ việc liên quan đến đối tác, nhà cung cấp hạ tầng hoặc bên thứ ba khác, chúng tôi có thể phối hợp để kiểm tra, đối soát và xác minh.",
            ],
          },
        ],
      },
      {
        id: "escalation",
        title: "Điều 5. Khiếu nại lên cấp cao hơn",
        blocks: [
          {
            type: "p",
            text: "Nếu không đồng ý với kết quả, bạn có thể yêu cầu xem xét lại hoặc khởi kiện theo quy định của pháp luật. Người tiêu dùng có thể gửi phản ánh tới cơ quan quản lý nhà nước về bảo vệ quyền lợi người tiêu dùng. Không nội dung nào trong chính sách này làm hạn chế các quyền của người tiêu dùng theo quy định của pháp luật.",
          },
        ],
      },
    ],
  },

  support: {
    kicker: "Pháp lý",
    title: "Hình thức hỗ trợ trực tuyến",
    navTitle: "Hỗ trợ trực tuyến",
    description:
      "Các kênh trực tuyến mà Omicslab hỗ trợ người dùng.",
    sections: [
      {
        id: "channels",
        title: "Điều 1. Các kênh hỗ trợ",
        blocks: [
          {
            type: "p",
            text: "Nền tảng cung cấp các hình thức hỗ trợ trực tuyến sau:",
          },
          {
            type: "ul",
            items: [
              "**Biểu mẫu liên hệ trực tuyến:** tại trang [Liên hệ](/contact).",
              "**Email hỗ trợ:** **contact@omicslab.io**.",
              "**Tài liệu tự phục vụ:** hướng dẫn, câu hỏi thường gặp và tài liệu kỹ thuật khi được cung cấp.",
              "**Hỗ trợ trong ứng dụng:** kênh trò chuyện hoặc hỗ trợ trong ứng dụng khi được cung cấp cho gói của bạn.",
              "**Pháp lý và dữ liệu cá nhân:** liên hệ DPO — **giangnguyen@omicslab.io**.",
            ],
          },
        ],
      },
      {
        id: "hours",
        title: "Điều 2. Thời gian và phản hồi hỗ trợ",
        blocks: [
          {
            type: "p",
            text: "Thời gian hỗ trợ là trong giờ làm việc (giờ hành chính), trừ ngày lễ. Yêu cầu ngoài giờ được xử lý vào ngày làm việc kế tiếp. Chúng tôi thường xác nhận các yêu cầu mới trong vòng **24 giờ làm việc**.",
          },
        ],
      },
    ],
  },
};
