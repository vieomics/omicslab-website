import type { GuideChapter } from "../../types";

export const chaptersPart2: GuideChapter[] = [
  {
    slug: "phan-tich",
    number: "05",
    kicker: "Chương 05 · Phân tích",
    title: "Chạy pipeline phân tích",
    navTitle: "Chạy phân tích",
    description:
      "Chọn pipeline, cấu hình tài nguyên và tham số, chạy job, theo dõi log và mở kết quả trong workspace.",
    summary:
      "Toàn bộ một lần chạy: chọn công cụ, cấu hình compute, manifest, theo dõi job, xem kết quả và chạy lại.",
    sections: [
      {
        id: "chon-cong-cu",
        title: "Chọn công cụ phân tích",
        blocks: [
          {
            type: "p",
            text: "Mở **Workspace → Phân tích → Công cụ**. Danh sách gồm các pipeline dùng được trong workspace, kèm thẻ mô tả và lần cập nhật gần nhất. Dùng ô tìm kiếm để lọc, ví dụ nhập **bacass** cho pipeline lắp ráp hệ gen vi khuẩn.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/01-chon-cong-cu.webp",
            alt: "Tab phân tích với ô tìm kiếm bacass và kết quả nf-core/bacass",
            caption:
              "Tìm pipeline trong tab Phân tích. Kết quả hiển thị tên, thẻ mô tả và ngày cập nhật.",
          },
          {
            type: "p",
            text: "Bấm vào tên pipeline để mở biểu mẫu chạy. Bước đầu tiên là chọn tài nguyên tính toán; cấu hình gợi ý phụ thuộc kích thước dữ liệu và pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/02-chon-pipeline.webp",
            alt: "Biểu mẫu chạy pipeline với lựa chọn pipeline và tài nguyên tính toán",
            caption:
              "Chọn pipeline và tài nguyên tính toán trước khi điền tham số.",
          },
        ],
      },
      {
        id: "cau-hinh-tinh-toan",
        title: "Điều chỉnh cấu hình tính toán",
        blocks: [
          {
            type: "p",
            text: "Kiểm tra số CPU, bộ nhớ và loại máy trước khi chạy. Cấu hình quá nhỏ có thể làm job chậm hoặc hết bộ nhớ; cấu hình quá lớn làm tăng chi phí. Chi phí ước tính được hiển thị cạnh nút chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/03-cau-hinh-tinh-toan.webp",
            alt: "Biểu mẫu điều chỉnh cấu hình CPU, bộ nhớ và loại máy cho job",
            caption:
              "Điều chỉnh tài nguyên cho phù hợp với dữ liệu. Chi phí ước tính thay đổi theo cấu hình.",
          },
          {
            type: "p",
            text: "Với dữ liệu lớn, nên chạy thử trên một mẫu nhỏ để kiểm tra tham số và thời gian trước khi chạy toàn bộ. Kết quả của lần chạy thử không thay thế kết quả phân tích chính thức.",
          },
        ],
      },
      {
        id: "cau-hinh-chung",
        title: "Cấu hình chung và tệp cấu hình",
        blocks: [
          {
            type: "p",
            text: "Phần **Chung** chọn profile, phiên bản công cụ và loại GitHub dùng để chạy phân tích. Với pipeline Nextflow, có thể chỉ định tệp cấu hình riêng thay vì dùng mặc định.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/04-cau-hinh-chung.webp",
            alt: "Biểu mẫu chọn profile, phiên bản công cụ và loại GitHub",
            caption:
              "Chọn profile, phiên bản công cụ và nguồn GitHub. Các lựa chọn phụ thuộc pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/05-tep-cau-hinh.webp",
            alt: "Biểu mẫu chọn tệp cấu hình cho pipeline Nextflow",
            caption:
              "Chọn tệp cấu hình khi pipeline là Nextflow. Để trống nếu dùng cấu hình mặc định.",
          },
          {
            type: "p",
            text: "Tệp cấu hình có thể lấy từ dữ liệu đã tải lên workspace. Cách này thuận tiện khi tổ chức duy trì một bộ cấu hình chuẩn cho nhiều dự án.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/06-cau-hinh-tu-du-lieu.webp",
            alt: "Hộp chọn tệp cấu hình trong dữ liệu của workspace",
            caption: "Chọn tệp cấu hình đã tải lên workspace thay vì tạo mới.",
          },
        ],
      },
      {
        id: "tham-so",
        title: "Điền tham số pipeline",
        blocks: [
          {
            type: "p",
            text: "Phần **Tham số** chứa các trường mà pipeline yêu cầu. Với nf-core, tham số đầu vào thường là samplesheet và thư mục đầu ra. Kiểm tra đường dẫn và định dạng của samplesheet trước khi chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/07-tham-so.webp",
            alt: "Biểu mẫu tham số pipeline với trường input và outdir",
            caption:
              "Tham số pipeline. Trường input nhận samplesheet hoặc thư mục dữ liệu tuỳ pipeline.",
          },
          {
            type: "p",
            text: "Nếu tham số là tệp hoặc thư mục, có thể chọn dữ liệu khác từ workspace. Chỉ thay các trường cần thiết để giữ cấu hình còn lại ổn định giữa các lần chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/08-thay-du-lieu.webp",
            alt: "Hộp chọn thay thế tệp hoặc thư mục đầu vào bằng dữ liệu trong workspace",
            caption:
              "Thay tệp hoặc thư mục đầu vào bằng dữ liệu khác trong workspace.",
          },
        ],
      },
      {
        id: "manifest",
        title: "Manifest và lưu cấu hình",
        blocks: [
          {
            type: "p",
            text: "**Manifest** là toàn bộ cấu hình của lần chạy, ở dạng JSON: pipeline, phiên bản, tài nguyên, tệp cấu hình và tham số. Kiểm tra manifest trước khi chạy để phát hiện đường dẫn hoặc tham số sai.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/09-manifest.webp",
            alt: "Xem trước manifest JSON của một lần chạy phân tích",
            caption:
              "Manifest tập hợp cấu hình và tham số của lần chạy. Có thể lưu lại để dùng cho lần chạy sau.",
          },
          {
            type: "p",
            text: "Có thể lưu manifest để dùng lại lần sau; khi đó chỉ cần thay tham số hoặc dữ liệu FASTQ đầu vào. Cách này giúp giữ nguyên phiên bản công cụ và cấu hình compute giữa các lần chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/10-luu-manifest.webp",
            alt: "Thao tác lưu manifest để dùng lại cho lần chạy sau",
            caption:
              "Lưu manifest để tái sử dụng cấu hình; lần sau chỉ cần đổi dữ liệu đầu vào.",
          },
        ],
      },
      {
        id: "chay-tu-manifest",
        title: "Chạy từ manifest có sẵn",
        blocks: [
          {
            type: "p",
            text: "Nếu đã có manifest trong dữ liệu, mở tab **Dữ liệu**, tìm tệp manifest và dùng thao tác chạy trực tiếp thay vì cấu hình lại từ đầu. Nền tảng đọc manifest để khôi phục pipeline và tham số.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/11-chay-tu-manifest.webp",
            alt: "Danh sách dữ liệu với tệp manifest và nút chạy phân tích từ manifest",
            caption:
              "Chạy trực tiếp từ manifest đã lưu trong dữ liệu của workspace.",
          },
          {
            type: "p",
            text: "Kiểm tra lại manifest trước khi chạy, đặc biệt nếu tệp được tạo từ phiên bản nền tảng hoặc pipeline cũ. Các tham số không còn được hỗ trợ có thể khiến job dừng sớm.",
          },
        ],
      },
      {
        id: "theo-doi",
        title: "Theo dõi job",
        blocks: [
          {
            type: "p",
            text: "Sau khi bấm chạy, nền tảng chuyển sang trang chi tiết job. Trang này có các tab **Tổng quan**, **Cấu hình**, **Manifest**, **Script** và **Nhật ký**.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/12-chi-tiet-job.webp",
            alt: "Trang chi tiết job phân tích với các tab tổng quan, cấu hình, manifest, script và nhật ký",
            caption:
              "Chi tiết job sau khi chạy: trạng thái, pipeline, tài nguyên và các tab cấu hình.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/13-xem-cau-hinh.webp",
            alt: "Tab cấu hình của job phân tích",
            caption:
              "Tab Cấu hình cho biết tài nguyên, tệp cấu hình và profile đã dùng.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/14-xem-manifest.webp",
            alt: "Tab manifest của job với cấu hình và tham số đã chạy",
            caption: "Tab Manifest lưu lại toàn bộ cấu hình của lần chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/15-xem-tham-so.webp",
            alt: "Tab manifest hiển thị các tham số pipeline đã dùng",
            caption:
              "Xem lại tham số đã dùng, gồm input, outdir và các tham số pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/16-json-tho.webp",
            alt: "Chế độ xem JSON thô của manifest",
            caption:
              "Chế độ JSON thô dùng khi cần kiểm tra hoặc so sánh chi tiết cấu hình.",
          },
          {
            type: "p",
            text: "Tab **Nhật ký** cho biết job đang ở bước nào. Với Nextflow, log thường đi qua các bước thiết lập môi trường, ghi tệp cấu hình, chuẩn bị dữ liệu và chạy từng tiến trình.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/17-log.webp",
            alt: "Nhật ký job phân tích đang chạy với các bước thiết lập và tiến trình",
            caption:
              "Nhật ký job. Có thể tìm kiếm, tải log và mở rộng vùng xem.",
          },
        ],
      },
      {
        id: "ket-qua",
        title: "Mở kết quả",
        blocks: [
          {
            type: "p",
            text: "Khi job hoàn tất, trạng thái chuyển sang **Hoàn tất**. Nếu job thất bại hoặc quá thời gian, log là nơi đầu tiên cần kiểm tra trước khi chạy lại.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/18-hoan-tat.webp",
            alt: "Job phân tích đã hoàn tất với trạng thái Hoàn tất",
            caption:
              "Job hoàn tất. Thời gian chạy và chi phí được ghi lại trong phần tổng quan.",
          },
          {
            type: "p",
            text: "Đường dẫn kết quả nằm trong tham số **outdir** của manifest. Mở lại manifest, tìm outdir, rồi chuyển sang tab Dữ liệu để mở đúng thư mục.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/19-tim-outdir.webp",
            alt: "Manifest với tham số outdir được đánh dấu để mở thư mục kết quả",
            caption: "Tìm outdir trong manifest để biết thư mục chứa kết quả.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/20-thu-muc-ket-qua.webp",
            alt: "Thư mục kết quả của job trong tab dữ liệu",
            caption:
              "Kết quả đã nằm trong thư mục của workspace sau khi job hoàn tất.",
          },
          {
            type: "p",
            text: "Với pipeline nf-core, báo cáo MultiQC thường là tệp HTML trong thư mục kết quả. Nhấp đúp để mở và xem tổng hợp chất lượng cùng số liệu chính.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/21-multiqc.webp",
            alt: "Tệp báo cáo MultiQC trong thư mục kết quả",
            caption:
              "Mở báo cáo MultiQC từ thư mục kết quả. Định dạng và tên tệp phụ thuộc pipeline.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/22-xem-toan-man.webp",
            alt: "Báo cáo MultiQC mở rộng toàn màn hình",
            caption: "Phóng to báo cáo để xem biểu đồ và bảng số liệu rõ hơn.",
          },
          {
            type: "p",
            text: "Trình xem hỗ trợ HTML, JSON và văn bản. Với tệp nhỏ, có thể chỉnh sửa nội dung và lưu lại; thay đổi này chỉ tác động lên bản sao trong workspace.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/23-xem-html-json.webp",
            alt: "Trình xem tệp HTML và trình chỉnh sửa JSON trong workspace",
            caption:
              "Xem HTML trực tiếp hoặc chỉnh sửa JSON, văn bản ngay trong trình duyệt.",
          },
        ],
      },
      {
        id: "nhieu-job",
        title: "Nhiều job và lịch sử",
        blocks: [
          {
            type: "p",
            text: "Khi chạy nhiều phân tích, tab **Đang chạy** hiển thị các job song song để theo dõi cùng lúc. Số job đồng thời bị giới hạn theo gói.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/24-job-dang-chay.webp",
            alt: "Tab đang chạy với nhiều job phân tích",
            caption: "Theo dõi nhiều job đang chạy trong cùng một workspace.",
          },
          {
            type: "p",
            text: "Tab **Lịch sử** giữ các job đã chạy, gồm trạng thái, thời gian, chi phí và người tạo. Dùng bộ lọc trạng thái để tìm job thất bại hoặc job cần chạy lại.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/25-lich-su-job.webp",
            alt: "Tab lịch sử với danh sách job đã chạy và trạng thái",
            caption:
              "Lịch sử job lưu trạng thái, thời gian chạy, chi phí và người tạo.",
          },
        ],
      },
      {
        id: "chay-lai",
        title: "Chạy lại và so sánh",
        blocks: [
          {
            type: "p",
            text: "Nút **Chạy lại** tạo một job mới từ cấu hình cũ. Có thể giữ nguyên tham số hoặc thay dữ liệu đầu vào trước khi chạy.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/26-chay-lai.webp",
            alt: "Biểu tượng chạy lại trên một dòng trong lịch sử job",
            caption:
              "Chạy lại job từ cấu hình đã dùng. Job mới có lịch sử riêng.",
          },
          {
            type: "p",
            text: "Sau khi chạy lại, trang job có thêm thông tin về những gì đã thay đổi so với lần trước. Kiểm tra phần này trước khi so sánh kết quả để tránh quy sai khác cho dữ liệu trong khi nguyên nhân là tham số.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/27-so-sanh-chay-lai.webp",
            alt: "Tab so sánh cho biết thay đổi giữa job chạy lại và job gốc",
            caption: "Thông tin thay đổi giữa lần chạy lại và lần chạy gốc.",
          },
        ],
      },
      {
        id: "danh-gia",
        title: "Đánh giá job",
        blocks: [
          {
            type: "p",
            text: "Tab **Đánh giá** tổng hợp số job theo tháng và trạng thái. Dùng tab này để kiểm tra số lần chạy, tỷ lệ hoàn tất và chi phí tích luỹ của workspace.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/28-danh-gia.webp",
            alt: "Tab đánh giá với biểu đồ số job theo tháng và trạng thái",
            caption:
              "Đánh giá job theo tháng và trạng thái. Số liệu phụ thuộc các job còn trong lịch sử.",
          },
        ],
      },
      {
        id: "pipeline-ngoai",
        title: "Pipeline ngoài nền tảng",
        blocks: [
          {
            type: "p",
            text: "Ngoài danh mục có sẵn, có thể cấu hình pipeline từ kho bên ngoài. Nền tảng cung cấp môi trường chạy và lưu log, nhưng không kiểm định nội dung, độ tin cậy hay khả năng tái lập của công cụ bên ngoài.",
          },
          {
            type: "figure",
            src: "/guides/phan-tich/29-pipeline-ngoai.webp",
            alt: "Biểu mẫu cấu hình pipeline ngoài nền tảng với cảnh báo về trách nhiệm của người dùng",
            caption:
              "Pipeline ngoài nền tảng: người dùng chịu trách nhiệm về độ tin cậy và khả năng tái lập của công cụ.",
          },
          {
            type: "note",
            title: "Trách nhiệm khi dùng công cụ bên ngoài",
            text: "Trước khi dùng kết quả cho công bố hoặc quyết định chuyên môn, nên kiểm tra phiên bản, giấy phép, tham số và một phần kết quả bằng công cụ độc lập. Việc nền tảng chạy được pipeline không đồng nghĩa với việc kết quả đã được kiểm chứng.",
          },
        ],
      },
    ],
  },
  {
    slug: "studio",
    number: "06",
    kicker: "Chương 06 · Studio",
    title: "Studio: VS Code, JupyterLab và RStudio",
    navTitle: "Studio",
    description:
      "Mở phiên làm việc tương tác trên compute của workspace, kết nối qua trình duyệt, lưu ảnh chụp và cấu hình Git an toàn.",
    summary:
      "Chạy và kết nối Studio, dùng VS Code Server, JupyterLab hoặc RStudio, lưu snapshot và quản lý token Git.",
    sections: [
      {
        id: "studio-la-gi",
        title: "Studio trên trình duyệt",
        blocks: [
          {
            type: "p",
            text: "**Studio** mở một ứng dụng tương tác trên compute của workspace và hiển thị trong trình duyệt. Dữ liệu vẫn nằm trong bucket của workspace; phiên làm việc chỉ tồn tại trong thời gian job chạy.",
          },
          {
            type: "figure",
            src: "/guides/studio/01-studio.webp",
            alt: "Tab Studio với danh sách ứng dụng và phiên đang chạy",
            caption:
              "Studio chạy ứng dụng web trên compute của workspace. Phiên được quản lý như một job.",
          },
        ],
      },
      {
        id: "chay-studio",
        title: "Chạy phiên Studio",
        blocks: [
          {
            type: "p",
            text: "Mở **Workspace → Studio → Công cụ**, chọn ứng dụng rồi chọn tài nguyên tính toán và cấu hình khởi tạo. Quy trình tương tự chạy một job phân tích.",
          },
          {
            type: "figure",
            src: "/guides/studio/03-chay-studio.webp",
            alt: "Biểu mẫu chạy Studio với lựa chọn ứng dụng và tài nguyên",
            caption:
              "Chọn ứng dụng Studio, tài nguyên và cấu hình trước khi khởi chạy.",
          },
          {
            type: "p",
            text: "Thời gian khởi động phụ thuộc việc tải image và cấu hình máy. Với image lớn, lần chạy đầu có thể lâu hơn các lần sau.",
          },
        ],
      },
      {
        id: "ket-noi",
        title: "Kết nối vào phiên",
        blocks: [
          {
            type: "p",
            text: "Khi job Studio chuyển sang trạng thái chạy, mở tab **Nhật ký** để kiểm tra địa chỉ web và tình trạng kết nối. Bấm **Kết nối** để mở phiên trong một tab mới.",
          },
          {
            type: "figure",
            src: "/guides/studio/04-ket-noi-studio.webp",
            alt: "Job Studio đang chạy với nút kết nối và nhật ký khởi động",
            caption:
              "Kết nối vào phiên Studio khi job đã chạy. Nếu nút chưa sẵn sàng, kiểm tra log khởi động.",
          },
          {
            type: "p",
            text: "Phiên Studio dùng chung thời gian và chi phí như job phân tích. Kết thúc phiên khi không còn sử dụng để tránh tính phí ngoài ý muốn.",
          },
        ],
      },
      {
        id: "ba-ung-dung",
        title: "Ba ứng dụng và CLI có sẵn",
        blocks: [
          {
            type: "p",
            text: "Có thể chạy đồng thời Visual Studio Code Server, JupyterLab và RStudio Server nếu gói cho phép số phiên tương ứng. Mỗi ứng dụng có phiên bản riêng, hiển thị trong danh sách phiên.",
          },
          {
            type: "figure",
            src: "/guides/studio/05-ba-studio.webp",
            alt: "Danh sách ba phiên Studio đang chạy: VS Code, JupyterLab và RStudio",
            caption:
              "Ba phiên Studio chạy song song: Visual Studio Code Server, JupyterLab và RStudio Server.",
          },
          {
            type: "p",
            text: "Trong VS Code Server, terminal có sẵn các công cụ dòng lệnh của môi trường. Có thể kiểm tra phiên bản Python, R hoặc các công cụ tin sinh trước khi chạy lệnh dài.",
          },
          {
            type: "figure",
            src: "/guides/studio/06-vscode-cli.webp",
            alt: "VS Code Server với terminal và các lệnh kiểm tra công cụ",
            caption: "VS Code Server có terminal và công cụ dòng lệnh cài sẵn.",
          },
          {
            type: "figure",
            src: "/guides/studio/07-jupyter-cli.webp",
            alt: "JupyterLab với terminal và các lệnh kiểm tra môi trường",
            caption: "JupyterLab có terminal riêng và kernel Python cài sẵn.",
          },
          {
            type: "figure",
            src: "/guides/studio/08-rstudio-cli.webp",
            alt: "RStudio với terminal và phiên R",
            caption: "RStudio Server có terminal và phiên R sẵn sàng.",
          },
        ],
      },
      {
        id: "snapshot",
        title: "Lưu ảnh chụp phiên",
        blocks: [
          {
            type: "p",
            text: "**Ảnh chụp** lưu thư mục home của phiên vào workspace để có thể tiếp tục ở lần truy cập sau. Nên tạo ảnh chụp sau khi cài thêm gói hoặc hoàn thành một phần phân tích, trước khi tắt job.",
          },
          {
            type: "figure",
            src: "/guides/studio/09-snapshot.webp",
            alt: "Thao tác tạo ảnh chụp cho phiên Studio đang chạy",
            caption:
              "Tạo ảnh chụp cho phiên Studio. Ảnh chụp lưu thư mục home vào workspace.",
          },
          {
            type: "p",
            text: "Kiểm tra ảnh chụp đã tải lên thành công trước khi tắt job. Nếu quá trình tải lên chưa xong mà phiên bị dừng, các thay đổi trong home có thể không được giữ lại.",
          },
          {
            type: "figure",
            src: "/guides/studio/10-xac-nhan-snapshot.webp",
            alt: "Xác nhận ảnh chụp Studio đã tải lên thành công",
            caption: "Xác nhận ảnh chụp đã hoàn tất trước khi tắt job.",
          },
        ],
      },
      {
        id: "token",
        title: "Git token và credential broker",
        blocks: [
          {
            type: "p",
            text: "Thông tin xác thực Git có thể lưu ở cấp tài khoản trong **Cài đặt → Quản lý phiên bản**. Token dùng cho kho riêng nên có quyền tối thiểu và thời hạn ngắn; không nên dùng token cá nhân có quyền rộng cho các job tự động.",
          },
          {
            type: "figure",
            src: "/guides/studio/02-github-token-tai-khoan.webp",
            alt: "Cài đặt quản lý phiên bản với thông tin xác thực GitHub",
            caption:
              "Thông tin xác thực Git ở cấp tài khoản, dùng cho các kho cần quyền truy cập.",
          },
          {
            type: "p",
            text: "Trong Studio, nền tảng có thể cấp một sandbox Git token và giữ token CLI ẩn với người dùng nhưng vẫn cho công cụ sử dụng. Cách này giảm việc lộ token dài hạn trong terminal hoặc tệp cấu hình.",
          },
          {
            type: "figure",
            src: "/guides/studio/11-sandbox-token.webp",
            alt: "Thiết kế sandbox Git token và CLI token được ẩn với người dùng",
            caption:
              "Sandbox Git token: công cụ vẫn dùng được token trong khi người dùng không nhìn thấy giá trị đầy đủ.",
          },
          {
            type: "p",
            text: "Với các tích hợp agent, credential broker có thể cấp thông tin xác thực theo phiên thay vì đặt token cố định trong môi trường. Đây là lớp hỗ trợ, không thay thế việc rà soát quyền của từng token.",
          },
          {
            type: "figure",
            src: "/guides/studio/12-credential-broker.webp",
            alt: "Tích hợp credential broker cho agent và công cụ trong Studio",
            caption:
              "Credential broker cấp thông tin xác thực theo phiên cho các tích hợp agent.",
          },
        ],
      },
      {
        id: "chay-lai",
        title: "Chạy lại Studio",
        blocks: [
          {
            type: "p",
            text: "Khi mở phiên mới từ ảnh chụp, không cần cài lại toàn bộ môi trường. Chọn ảnh chụp phù hợp, kiểm tra tài nguyên rồi khởi chạy; thời gian chuẩn bị thường ngắn hơn lần đầu.",
          },
          {
            type: "figure",
            src: "/guides/studio/13-chay-lai-studio.webp",
            alt: "Chạy lại Studio từ ảnh chụp đã lưu",
            caption:
              "Chạy lại Studio từ ảnh chụp để tiếp tục công việc mà không thiết lập lại từ đầu.",
          },
        ],
      },
    ],
  },
  {
    slug: "trinh-xem",
    number: "07",
    kicker: "Chương 07 · Trình xem",
    title: "Trình xem dữ liệu và kết quả",
    navTitle: "Trình xem",
    description:
      "Mở tệp trong IGV, Mol*, ECharts và Graphic Walker mà không cần tải xuống máy.",
    summary:
      "Bốn trình xem chuyên dụng cho hệ gen, cấu trúc phân tử, biểu đồ và khám phá dữ liệu dạng bảng.",
    sections: [
      {
        id: "tong-quan",
        title: "Bốn trình xem",
        blocks: [
          {
            type: "p",
            text: "Tab **Trình xem** mở tệp của workspace trong bốn trình xem: **Hệ gen (IGV)** cho BAM, CRAM, SAM, VCF, BED, GFF/GTF, bigWig và bigBed; **Cấu trúc (Mol*)** cho PDB, mmCIF, SDF, MOL2; **Biểu đồ (ECharts)** và **Khám phá dữ liệu (Graphic Walker)** cho CSV/TSV.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/01-trinh-xem.webp",
            alt: "Tab trình xem với bốn lựa chọn IGV, MolStar, ECharts và Graphic Walker",
            caption:
              "Chọn trình xem ở thanh bên. Mỗi trình xem chỉ nhận đúng loại tệp mà nó hỗ trợ.",
          },
          {
            type: "p",
            text: "Nút **Duyệt** cho phép chọn tệp từ bucket của workspace; hộp chọn đã lọc theo định dạng mà trình xem đang mở hỗ trợ. Có thể tải lại, mở rộng toàn màn hình hoặc xoá tệp đã nạp mà không rời trình xem.",
          },
        ],
      },
      {
        id: "molecular",
        title: "Cấu trúc phân tử",
        blocks: [
          {
            type: "p",
            text: "Trình xem **Mol*** kết xuất cấu trúc 3D tương tác. Có thể xoay, thu phóng, chọn chuỗi hoặc nguyên tử và đổi kiểu biểu diễn. Việc hiển thị không thay đổi tệp gốc trong workspace.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/02-protein-structure.webp",
            alt: "Cấu trúc protein 3D trong trình xem MolStar",
            caption:
              "Cấu trúc protein trong Mol*. Các thao tác xoay, thu phóng và chọn chuỗi chỉ thay đổi cách hiển thị.",
          },
        ],
      },
      {
        id: "bieu-do",
        title: "Biểu đồ từ bảng",
        blocks: [
          {
            type: "p",
            text: "**ECharts** vẽ biểu đồ đường, cột, vùng, phân tán hoặc tròn từ CSV/TSV. Có thể dùng dữ liệu mẫu của trình xem hoặc chọn bảng trong workspace, sau đó gán cột cho trục và chuỗi dữ liệu.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/03-bieu-do.webp",
            alt: "Biểu đồ ECharts dựng từ dữ liệu CSV hoặc TSV",
            caption:
              "Biểu đồ ECharts từ bảng CSV/TSV. Chọn cột trục và chuỗi dữ liệu ở thanh bên.",
          },
        ],
      },
      {
        id: "graphic-walker",
        title: "Khám phá dữ liệu",
        blocks: [
          {
            type: "p",
            text: "**Graphic Walker** cho phép kéo thả trường để khám phá bảng theo kiểu Tableau. Trình xem này phù hợp để tìm nhanh phân bố hoặc tương quan trước khi viết script phân tích chính thức.",
          },
          {
            type: "figure",
            src: "/guides/trinh-xem/04-graphic-walker.webp",
            alt: "Giao diện Graphic Walker với các trường dữ liệu kéo thả",
            caption:
              "Graphic Walker: kéo trường vào trục để tạo biểu đồ khám phá dữ liệu.",
          },
          {
            type: "p",
            text: "Biểu đồ tạo trong trình xem là công cụ khám phá, không phải một phần của pipeline. Nếu cần tái lập, nên ghi lại trường, bộ lọc và phiên bản dữ liệu đã dùng.",
          },
        ],
      },
    ],
  },
  {
    slug: "quan-ly",
    number: "08",
    kicker: "Chương 08 · Quản lý",
    title: "Theo dõi, hỗ trợ và tài khoản",
    navTitle: "Quản lý & hỗ trợ",
    description:
      "Kiểm tra ngân sách, xem hoạt động, gửi yêu cầu hỗ trợ, thiết lập tài khoản và tạo API token.",
    summary:
      "Các thao tác sau khi đã chạy phân tích: ngân sách, nhật ký hoạt động, hỗ trợ, tài khoản và token cho SDK/CLI.",
    sections: [
      {
        id: "ngan-sach",
        title: "Ngân sách workspace",
        blocks: [
          {
            type: "p",
            text: "**Ngân sách** theo dõi chi tiêu, hạn mức và phân bổ lưu trữ của workspace. Tab **Chi tiêu hằng ngày** tách chi phí phân tích và Studio theo ngày, kèm danh sách tác vụ và chi phí tương ứng.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/01-ngan-sach.webp",
            alt: "Trang ngân sách workspace với biểu đồ chi tiêu hằng ngày và danh sách tác vụ",
            caption:
              "Ngân sách workspace: chi tiêu theo ngày cho phân tích và Studio.",
          },
          {
            type: "p",
            text: "Số liệu ngân sách phản ánh các tác vụ còn trong lịch sử. Nếu cần đối chiếu với hoá đơn, so sánh cùng khoảng thời gian và kiểm tra cả tab Thanh toán của tổ chức.",
          },
        ],
      },
      {
        id: "hoat-dong",
        title: "Hoạt động và nhật ký",
        blocks: [
          {
            type: "p",
            text: "Tab **Hoạt động** ghi lại các thao tác liên quan đến dữ liệu và tác vụ trong workspace. Dùng tab này để kiểm tra ai đã tải, sửa hoặc xoá dữ liệu khi có nhiều thành viên cùng làm việc.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/02-hoat-dong.webp",
            alt: "Tab hoạt động với nhật ký thao tác dữ liệu trong workspace",
            caption:
              "Nhật ký hoạt động giúp truy vết thay đổi dữ liệu giữa các thành viên.",
          },
          {
            type: "p",
            text: "Nhật ký hỗ trợ điều tra nhưng không thay thế quy trình sao lưu hoặc kiểm soát truy cập. Với dữ liệu quan trọng, nên duy trì bản sao độc lập theo chính sách của tổ chức.",
          },
        ],
      },
      {
        id: "ho-tro",
        title: "Gửi yêu cầu hỗ trợ",
        blocks: [
          {
            type: "p",
            text: "Mở **Hỗ trợ → Gửi yêu cầu**, nhập tiêu đề, chọn danh mục (lỗi, yêu cầu tính năng, thanh toán, dữ liệu, tài khoản hoặc khác), mức ưu tiên và mô tả. Đính kèm ảnh chụp hoặc tệp log nếu có.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/03-gui-ho-tro.webp",
            alt: "Biểu mẫu gửi yêu cầu hỗ trợ với danh mục, mức ưu tiên và tệp đính kèm",
            caption:
              "Biểu mẫu gửi yêu cầu hỗ trợ. Thông tin càng cụ thể, thời gian xử lý thường càng ngắn.",
          },
          {
            type: "p",
            text: "Mô tả nên ghi rõ workspace hoặc dự án liên quan, thời điểm xảy ra và các bước tái hiện. Không đính kèm dữ liệu nhạy cảm hoặc thông tin xác thực trong ticket.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/04-danh-sach-ho-tro.webp",
            alt: "Danh sách yêu cầu hỗ trợ với trạng thái, mức ưu tiên và danh mục",
            caption:
              "Danh sách yêu cầu hỗ trợ của tài khoản, kèm trạng thái và người phụ trách.",
          },
          {
            type: "p",
            text: "Mở một yêu cầu để xem trao đổi và theo dõi tiến độ. Phản hồi mới thường được gửi qua email; có thể bổ sung bình luận ngay trong ticket.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/05-chi-tiet-ho-tro.webp",
            alt: "Chi tiết yêu cầu hỗ trợ với nội dung trao đổi và trạng thái",
            caption:
              "Chi tiết yêu cầu hỗ trợ: nội dung trao đổi, trạng thái và các tệp đính kèm.",
          },
        ],
      },
      {
        id: "tai-khoan",
        title: "Thiết lập tài khoản",
        blocks: [
          {
            type: "p",
            text: "**Cài đặt tài khoản** gồm hồ sơ, tài khoản, token API, bảo mật, quản lý phiên bản, hoá đơn và chế độ thử nghiệm. Đây là nơi sửa thông tin cá nhân dùng cho hoá đơn và cấu hình Git ở cấp người dùng.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/06-che-do-thu-nghiem.webp",
            alt: "Cài đặt tài khoản với mục chế độ thử nghiệm",
            caption:
              "Chế độ thử nghiệm chạy hướng dẫn với dữ liệu mẫu mà không tác động tới máy chủ thật.",
          },
          {
            type: "p",
            text: "Chế độ thử nghiệm phù hợp để làm quen giao diện. Khi bật, hướng dẫn không tạo dữ liệu thật; tắt chế độ này trước khi thao tác trên workspace thật.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/07-huong-dan-tai-khoan.webp",
            alt: "Hướng dẫn chi tiết trong phần thiết lập tài khoản",
            caption:
              "Hướng dẫn trong tài khoản giúp làm quen các bước cơ bản trước khi dùng dữ liệu thật.",
          },
        ],
      },
      {
        id: "api-token",
        title: "API token cho SDK và CLI",
        blocks: [
          {
            type: "p",
            text: "Mở **Cài đặt → Token API → Thêm**, đặt tên, chọn thời hạn, phạm vi workspace và vai trò. Token chỉ hiển thị một lần; sao chép ngay và lưu ở nơi an toàn.",
          },
          {
            type: "figure",
            src: "/guides/quan-ly/08-api-token.webp",
            alt: "Hộp thoại tạo token API với tên, thời hạn, phạm vi và vai trò",
            caption:
              "Tạo token API cho SDK hoặc CLI. Chọn thời hạn và phạm vi tối thiểu cần thiết.",
          },
          {
            type: "p",
            text: "Token dùng cho script hoặc tích hợp nên có quyền tối thiểu, thời hạn ngắn và được thu hồi khi không còn dùng. Không đặt token trong mã nguồn công khai hoặc trong ticket hỗ trợ.",
          },
          {
            type: "p",
            text: "Hướng dẫn cài đặt và dùng CLI nằm trong [SDK / CLI](https://docs.omicslab.io/sdk/installation).",
          },
        ],
      },
    ],
  },
];
