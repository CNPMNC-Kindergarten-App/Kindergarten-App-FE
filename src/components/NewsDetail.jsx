import { Calendar, User, ArrowLeft, Share2, Bookmark, Eye } from "lucide-react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
const categoryColors = {
  'thông báo': 'bg-red-100 text-red-700',
  'sự kiện': 'bg-purple-100 text-purple-700',
  'hoạt động': 'bg-green-100 text-green-700',
  'học thuật': 'bg-blue-100 text-blue-700',
  'tuyển sinh': 'bg-orange-100 text-orange-700',
};


const getDetailedContent = (id) => {
  const contentMap = {
    1: `
      <p>Kính gửi: Toàn thể học sinh và phụ huynh học sinh</p>
      
      <p>Nhà trường trân trọng thông báo lịch thi học kỳ 1 năm học 2024-2025 như sau:</p>
      
      <h3>1. Thời gian thi</h3>
      <p>Kỳ thi sẽ diễn ra từ ngày <strong>15/01/2025 đến 25/01/2025</strong></p>
      
      <h3>2. Đối tượng dự thi</h3>
      <p>Toàn thể học sinh các khối 10, 11, 12 đang theo học tại trường</p>
      
      <h3>3. Môn thi</h3>
      <ul>
        <li>Toán học</li>
        <li>Ngữ văn</li>
        <li>Tiếng Anh</li>
        <li>Vật lý (Khối 10, 11, 12)</li>
        <li>Hóa học (Khối 10, 11, 12)</li>
        <li>Sinh học (Khối 10, 11, 12)</li>
        <li>Lịch sử, Địa lý (Khối 10, 11, 12)</li>
      </ul>
      
      <h3>4. Lưu ý quan trọng</h3>
      <ul>
        <li>Học sinh phải có mặt trước giờ thi 15 phút</li>
        <li>Mang theo thẻ học sinh và dụng cụ học tập cần thiết</li>
        <li>Không mang điện thoại, tài liệu vào phòng thi</li>
        <li>Ăn mặc lịch sự, đúng quy định của nhà trường</li>
      </ul>
      
      <p>Lịch thi chi tiết theo từng môn sẽ được công bố vào ngày 05/01/2025. Học sinh vui lòng theo dõi bảng tin nhà trường để cập nhật thông tin mới nhất.</p>
      
      <p>Nhà trường chúc các em ôn tập tốt và đạt kết quả cao trong kỳ thi sắp tới!</p>
      
      <p className="mt-6"><strong>Ban Giám Hiệu</strong></p>
    `,
    2: `
      <p>Thân gửi toàn thể cán bộ, giáo viên và học sinh,</p>
      
      <p>Nhà trường trân trọng thông báo về việc tổ chức Hội thao truyền thống năm học 2024-2025:</p>
      
      <h3>1. Thời gian và địa điểm</h3>
      <ul>
        <li><strong>Thời gian:</strong> Ngày 10/12/2024 (Thứ Ba)</li>
        <li><strong>Địa điểm:</strong> Sân vận động trường</li>
        <li><strong>Giờ khai mạc:</strong> 7:00 sáng</li>
      </ul>
      
      <h3>2. Nội dung thi đấu</h3>
      <p><strong>Môn thi đấu tập thể:</strong></p>
      <ul>
        <li>Bóng đá nam (11 người)</li>
        <li>Bóng chuyền nữ (6 người)</li>
        <li>Chạy tiếp sức 4x100m</li>
        <li>Kéo co (10 người)</li>
      </ul>
      
      <p><strong>Môn thi đấu cá nhân:</strong></p>
      <ul>
        <li>Chạy 100m, 400m, 800m</li>
        <li>Nhảy xa</li>
        <li>Nhảy cao</li>
        <li>Cầu lông đơn nam/nữ</li>
        <li>Bóng bàn đơn nam/nữ</li>
      </ul>
      
      <h3>3. Đối tượng tham gia</h3>
      <p>Toàn thể học sinh các khối lớp 10, 11, 12. Mỗi lớp đăng ký tối thiểu 15 vận động viên tham gia các môn thi đấu.</p>
      
      <h3>4. Thời gian đăng ký</h3>
      <p>Các lớp nộp danh sách đăng ký về Đoàn trường trước ngày <strong>01/12/2024</strong></p>
      
      <h3>5. Giải thưởng</h3>
      <ul>
        <li>Giải Nhất toàn đoàn: 5.000.000 VNĐ + Cúp + Giấy khen</li>
        <li>Giải Nhì toàn đoàn: 3.000.000 VNĐ + Cúp + Giấy khen</li>
        <li>Giải Ba toàn đoàn: 2.000.000 VNĐ + Cúp + Giấy khen</li>
        <li>Giải Khuyến khích: Giấy khen</li>
        <li>Giải cá nhân xuất sắc từng môn</li>
      </ul>
      
      <p>Đây là sự kiện thể thao lớn nhất trong năm, hy vọng các em sẽ tham gia nhiệt tình, thể hiện tinh thần thể thao cao đẹp!</p>
      
      <p className="mt-6"><strong>Đoàn trường</strong></p>
    `,
    3: `
      <p>Kính gửi: Toàn thể thầy cô giáo và học sinh</p>
      
      <p>Với tinh thần "Tương thân tương ái", nhà trường phát động chương trình "Tiếp sức đến trường" năm học 2024-2025 nhằm hỗ trợ các em học sinh có hoàn cảnh khó khăn.</p>
      
      <h3>1. Mục đích</h3>
      <ul>
        <li>Hỗ trợ học phí, sách vở cho học sinh có hoàn cảnh khó khăn</li>
        <li>Tặng quà, học bổng cho các em học sinh vượt khó học giỏi</li>
        <li>Giúp đỡ các em có điều kiện tiếp tục theo đuổi ước mơ học tập</li>
        <li>Nâng cao ý thức trách nhiệm cộng đồng trong học sinh</li>
      </ul>
      
      <h3>2. Hình thức đóng góp</h3>
      <ul>
        <li><strong>Quyên góp tiền mặt:</strong> Nộp tại văn phòng Đoàn trường</li>
        <li><strong>Sách vở, đồ dùng học tập:</strong> Sách cũ còn sử dụng được, vở, bút, đồ dùng học tập</li>
        <li><strong>Quần áo:</strong> Quần áo, giày dép còn tốt, sạch sẽ</li>
      </ul>
      
      <h3>3. Thời gian nhận đóng góp</h3>
      <p>Từ ngày 20/11/2024 đến 15/12/2024</p>
      
      <h3>4. Địa điểm nhận đóng góp</h3>
      <p>Văn phòng Đoàn trường (Phòng 105, Tòa nhà A)</p>
      <p><strong>Thời gian:</strong> 7:00 - 11:00 và 13:00 - 16:00 các ngày trong tuần</p>
      
      <h3>5. Cam kết</h3>
      <ul>
        <li>100% đóng góp sẽ được trao tận tay các em học sinh khó khăn</li>
        <li>Công khai minh bạch danh sách học sinh nhận hỗ trợ</li>
        <li>Cập nhật số tiền, hiện vật đóng góp hàng tuần trên bảng tin</li>
      </ul>
      
      <p>Mọi đóng góp dù nhỏ hay lớn đều rất có ý nghĩa. Chúng ta cùng chung tay giúp đỡ các em có hoàn cảnh khó khăn vượt qua khó khăn, tiếp tục đến trường!</p>
      
      <p className="mt-6"><strong>Đoàn trường</strong></p>
    `,
    4: `
      <p>Kính gửi: Học sinh khá giỏi các khối 10, 11, 12</p>
      
      <p>Nhà trường thông báo khai giảng khóa học Olympic Toán năm học 2024-2025 dành cho các em có năng khiếu và đam mê môn Toán học.</p>
      
      <h3>1. Thông tin khóa học</h3>
      <ul>
        <li><strong>Thời gian khai giảng:</strong> 01/12/2024</li>
        <li><strong>Thời gian học:</strong> Thứ 7 và Chủ nhật hàng tuần</li>
        <li><strong>Giờ học:</strong> 14:00 - 17:00</li>
        <li><strong>Địa điểm:</strong> Phòng 301, 302 - Tòa nhà B</li>
        <li><strong>Thời lượng:</strong> 6 tháng (Đến tháng 5/2025)</li>
      </ul>
      
      <h3>2. Nội dung chương trình</h3>
      
      <p><strong>Khối 10:</strong></p>
      <ul>
        <li>Đại số nâng cao</li>
        <li>Hình học giải tích</li>
        <li>Bất đẳng thức</li>
        <li>Phương trình, hệ phương trình</li>
      </ul>
      
      <p><strong>Khối 11:</strong></p>
      <ul>
        <li>Lượng giác nâng cao</li>
        <li>Dãy số, cấp số</li>
        <li>Tổ hợp, xác suất</li>
        <li>Hình học không gian</li>
      </ul>
      
      <p><strong>Khối 12:</strong></p>
      <ul>
        <li>Giải tích nâng cao</li>
        <li>Hình học không gian phức tạp</li>
        <li>Phương pháp tọa độ trong không gian</li>
        <li>Luyện đề thi HSG, thi ĐH</li>
      </ul>
      
      <h3>3. Đội ngũ giảng viên</h3>
      <ul>
        <li>Thầy Nguyễn Văn A - Giáo viên THPT chuyên, Thạc sĩ Toán học</li>
        <li>Cô Trần Thị B - Giáo viên chuyên Toán, từng đạt HCV Olympic Toán</li>
        <li>Thầy Lê Văn C - Tiến sĩ Toán học, nhiều năm kinh nghiệm bồi dưỡng HSG</li>
      </ul>
      
      <h3>4. Điều kiện tham gia</h3>
      <ul>
        <li>Điểm trung bình môn Toán học kỳ trước từ 8.0 trở lên</li>
        <li>Có đam mê và quyết tâm học tập</li>
        <li>Cam kết tham gia đầy đủ các buổi học</li>
      </ul>
      
      <h3>5. Học phí</h3>
      <p><strong>Miễn phí hoàn toàn</strong> cho tất cả học sinh tham gia</p>
      
      <h3>6. Đăng ký</h3>
      <ul>
        <li><strong>Thời gian:</strong> Từ nay đến hết ngày 25/11/2024</li>
        <li><strong>Địa điểm:</strong> Phòng Đào tạo (Phòng 201, Tòa nhà A)</li>
        <li><strong>Hồ sơ:</strong> Đơn đăng ký + Bảng điểm học kỳ gần nhất</li>
      </ul>
      
      <p>Đây là cơ hội tuyệt vời để các em phát triển năng lực toán học, chuẩn bị cho các kỳ thi HSG và thi Đại học. Hãy nhanh tay đăng ký!</p>
      
      <p className="mt-6"><strong>Phòng Đào tạo</strong></p>
    `,
    5: `
      <p>Kính gửi: Học sinh lớp 12 và phụ huynh</p>
      
      <p>Nhà trường trân trọng thông báo về Ngày hội tư vấn tuyển sinh Đại học năm 2025 - Sự kiện quan trọng giúp các em định hướng nghề nghiệp và lựa chọn ngành học phù hợp.</p>
      
      <h3>1. Thông tin sự kiện</h3>
      <ul>
        <li><strong>Thời gian:</strong> Ngày 15/12/2024 (Chủ nhật)</li>
        <li><strong>Giờ:</strong> 8:00 - 17:00</li>
        <li><strong>Địa điểm:</strong> Sân trường và Hội trường lớn</li>
      </ul>
      
      <h3>2. Các trường Đại học tham gia</h3>
      
      <p><strong>Khối ngành Công nghệ - Kỹ thuật:</strong></p>
      <ul>
        <li>Đại học Bách Khoa Hà Nội</li>
        <li>Đại học Bách Khoa TP.HCM</li>
        <li>Đại học Công nghệ - ĐHQGHN</li>
        <li>Học viện Công nghệ Bưu chính Viễn thông</li>
      </ul>
      
      <p><strong>Khối ngành Kinh tế - Quản trị:</strong></p>
      <ul>
        <li>Đại học Kinh tế Quốc dân</li>
        <li>Đại học Ngoại thương</li>
        <li>Đại học Kinh tế TP.HCM</li>
        <li>Học viện Ngân hàng</li>
      </ul>
      
      <p><strong>Khối ngành Y - Dược:</strong></p>
      <ul>
        <li>Đại học Y Hà Nội</li>
        <li>Đại học Dược Hà Nội</li>
        <li>Đại học Y Dược TP.HCM</li>
      </ul>
      
      <p><strong>Khối ngành Khoa học Xã hội - Nhân văn:</strong></p>
      <ul>
        <li>Đại học Khoa học Xã hội và Nhân văn</li>
        <li>Đại học Sư phạm Hà Nội</li>
        <li>Đại học Ngoại ngữ - ĐHQGHN</li>
      </ul>
      
      <p>...và hơn 30 trường khác</p>
      
      <h3>3. Nội dung chương trình</h3>
      
      <p><strong>Buổi sáng (8:00 - 12:00):</strong></p>
      <ul>
        <li>Gian hàng tư vấn tuyển sinh của các trường</li>
        <li>Tọa đàm: "Định hướng nghề nghiệp thời đại 4.0"</li>
        <li>Chia sẻ kinh nghiệm từ sinh viên các trường</li>
      </ul>
      
      <p><strong>Buổi chiều (13:00 - 17:00):</strong></p>
      <ul>
        <li>Workshop: "Kỹ năng viết hồ sơ xét tuyển"</li>
        <li>Tư vấn 1-1 với chuyên gia hướng nghiệp</li>
        <li>Giới thiệu các chương trình học bổng</li>
        <li>Q&A trực tiếp với đại diện nhà trường</li>
      </ul>
      
      <h3>4. Lợi ích khi tham gia</h3>
      <ul>
        <li>Tìm hiểu chi tiết về ngành học, điều kiện tuyển sinh</li>
        <li>Nhận tài liệu tư vấn, sổ tay tuyển sinh miễn phí</li>
        <li>Được tư vấn trực tiếp bởi chuyên gia</li>
        <li>Cơ hội nhận học bổng từ các trường Đại học</li>
        <li>Kết nối với các bạn cùng định hướng nghề nghiệp</li>
      </ul>
      
      <h3>5. Đăng ký tham gia</h3>
      <p>Học sinh đăng ký tại giáo viên chủ nhiệm trước ngày <strong>10/12/2024</strong> để nhận thẻ tham dự và tài liệu hướng dẫn.</p>
      
      <p>Đây là cơ hội vàng để các em lựa chọn đúng đắn con đường học vấn tương lai. Nhà trường khuyến khích tất cả học sinh lớp 12 và phụ huynh tham gia!</p>
      
      <p className="mt-6"><strong>Phòng Hướng nghiệp</strong></p>
    `,
    6: `
      <p>Thân gửi toàn thể học sinh,</p>
      
      <p>Nhà trường phát động cuộc thi "Học sinh thanh lịch 2024" nhằm tôn vinh và khuyến khích các em rèn luyện hành vi đẹp, thái độ học tập tích cực.</p>
      
      <h3>1. Mục đích</h3>
      <ul>
        <li>Nâng cao ý thức rèn luyện phẩm chất đạo đức</li>
        <li>Khuyến khích học sinh có thái độ học tập tích cực</li>
        <li>Tạo môi trường giáo dục văn hóa, văn minh</li>
        <li>Tôn vinh những học sinh gương mẫu</li>
      </ul>
      
      <h3>2. Tiêu chí đánh giá</h3>
      
      <p><strong>Về ý thức học tập (30 điểm):</strong></p>
      <ul>
        <li>Chuyên cần, không đi học muộn</li>
        <li>Tích cực phát biểu, tham gia giờ học</li>
        <li>Hoàn thành tốt bài tập về nhà</li>
        <li>Kết quả học tập khá, giỏi</li>
      </ul>
      
      <p><strong>Về tác ph풍, ứng xử (30 điểm):</strong></p>
      <ul>
        <li>Lịch sự, kính trọng thầy cô</li>
        <li>Đoàn kết, giúp đỡ bạn bè</li>
        <li>Tham gia tích cực hoạt động tập thể</li>
        <li>Chấp hành tốt nội quy nhà trường</li>
      </ul>
      
      <p><strong>Về trang phục, ngoại hình (20 điểm):</strong></p>
      <ul>
        <li>Mặc đồng phục đúng quy định</li>
        <li>Giữ gìn trang phục gọn gàng, sạch sẽ</li>
        <li>Kiểu tóc phù hợp, phù hợp học sinh</li>
        <li>Không đeo trang sức phản cảm</li>
      </ul>
      
      <p><strong>Về ý thức công dân (20 điểm):</strong></p>
      <ul>
        <li>Tham gia các hoạt động tình nguyện</li>
        <li>Giữ gìn vệ sinh chung</li>
        <li>Ý thức bảo vệ tài sản chung</li>
        <li>Tuyên truyền lối sống văn hóa</li>
      </ul>
      
      <h3>3. Thời gian và quy trình</h3>
      <ul>
        <li><strong>Đăng ký:</strong> Đến hết ngày 30/11/2024</li>
        <li><strong>Vòng sơ khảo:</strong> 05/12/2024 (Đánh giá hồ sơ)</li>
        <li><strong>Vòng chung khảo:</strong> 20/12/2024 (Phỏng vấn + Trình diễn tài năng)</li>
        <li><strong>Lễ trao giải:</strong> 25/12/2024</li>
      </ul>
      
      <h3>4. Giải thưởng</h3>
      <ul>
        <li><strong>01 Giải Nhất:</strong> 3.000.000 VNĐ + Giấy khen + Quà tặng</li>
        <li><strong>02 Giải Nhì:</strong> 2.000.000 VNĐ + Giấy khen + Quà tặng</li>
        <li><strong>03 Giải Ba:</strong> 1.000.000 VNĐ + Giấy khen + Quà tặng</li>
        <li><strong>10 Giải Khuyến khích:</strong> 500.000 VNĐ + Giấy khen</li>
        <li>Các giải phụ: Tài năng, Thân thiện, Ấn tượng</li>
      </ul>
      
      <h3>5. Hồ sơ đăng ký</h3>
      <ul>
        <li>Đơn đăng ký (Theo mẫu của nhà trường)</li>
        <li>Bảng điểm học tập 2 học kỳ gần nhất</li>
        <li>Giấy xác nhận không vi phạm nội quy</li>
        <li>02 ảnh 4x6 (Mặc đồng phục)</li>
      </ul>
      
      <p><strong>Địa điểm nộp hồ sơ:</strong> Văn phòng Đoàn trường</p>
      
      <p>Cuộc thi là cơ hội để các em thể hiện bản thân, rèn luyện kỹ năng và xây dựng hình ảnh đẹp. Hãy tham gia để tỏa sáng!</p>
      
      <p className="mt-6"><strong>Ban Giám Hiệu</strong></p>
    `,
    7: `
      <p>Kính gửi: Toàn thể thầy cô giáo và học sinh</p>
      
      <p>Nhà trường long trọng tổ chức Lễ trao giải Cuộc thi Khoa học Kỹ thuật cấp trường năm học 2024-2025. Đây là dịp ghi nhận và tôn vinh những thành tích xuất sắc của các em học sinh.</p>
      
      <h3>1. Thông tin Lễ trao giải</h3>
      <ul>
        <li><strong>Thời gian:</strong> 14:00, Thứ Bảy, 14/12/2024</li>
        <li><strong>Địa điểm:</strong> Hội trường lớn, Tòa nhà A</li>
        <li><strong>Đối tượng:</strong> Ban Giám hiệu, Thầy cô, Học sinh đạt giải</li>
      </ul>
      
      <h3>2. Kết quả cuộc thi</h3>
      
      <p><strong>Giải Nhất (03 đề tài):</strong></p>
      <ul>
        <li>"Hệ thống tưới cây tự động sử dụng IoT" - Lớp 12A1</li>
        <li>"Ứng dụng AI phát hiện rác thải tái chế" - Lớp 11A2</li>
        <li>"Robot phân loại rác thông minh" - Lớp 10A3</li>
      </ul>
      
      <p><strong>Giải Nhì (05 đề tài):</strong></p>
      <ul>
        <li>"Năng lượng mặt trời cho trường học" - Lớp 12A2</li>
        <li>"App học tập thông minh cho học sinh" - Lớp 11A1</li>
        <li>"Hệ thống cảnh báo thiên tai địa phương" - Lớp 11A3</li>
        <li>"Thiết bị đo chất lượng không khí" - Lớp 10A1</li>
        <li>"Mô hình nhà thông minh tiết kiệm năng lượng" - Lớp 10A2</li>
      </ul>
      
      <p><strong>Giải Ba (08 đề tài):</strong></p>
      <ul>
        <li>"Túi đựng rác tự phân hủy từ bã mía" - Lớp 12A3</li>
        <li>"Website kết nối học sinh - phụ huynh" - Lớp 11A4</li>
        <li>"Máy lọc nước từ nguyên liệu tự nhiên" - Lớp 10A4</li>
        <li>...và 5 đề tài khác</li>
      </ul>
      
      <p><strong>Giải Khuyến khích:</strong> 12 đề tài</p>
      
      <h3>3. Giải thưởng</h3>
      <ul>
        <li><strong>Giải Nhất:</strong> 5.000.000 VNĐ + Cúp + Giấy khen</li>
        <li><strong>Giải Nhì:</strong> 3.000.000 VNĐ + Cúp + Giấy khen</li>
        <li><strong>Giải Ba:</strong> 2.000.000 VNĐ + Cúp + Giấy khen</li>
        <li><strong>Giải Khuyến khích:</strong> 1.000.000 VNĐ + Giấy khen</li>
      </ul>
      
      <h3>4. Chương trình Lễ trao giải</h3>
      <ul>
        <li><strong>14:00 - 14:15:</strong> Đón khách và nghi thức chào cờ</li>
        <li><strong>14:15 - 14:30:</strong> Phát biểu khai mạc của Hiệu trưởng</li>
        <li><strong>14:30 - 15:00:</strong> Trình chiếu các đề tài đạt giải</li>
        <li><strong>15:00 - 15:45:</strong> Trao giải và chụp ảnh lưu niệm</li>
        <li><strong>15:45 - 16:00:</strong> Phát biểu cảm nhận của học sinh</li>
        <li><strong>16:00:</strong> Bế mạc chương trình</li>
      </ul>
      
      <h3>5. Những con số ấn tượng</h3>
      <ul>
        <li>Tổng số đề tài dự thi: 87 đề tài</li>
        <li>Số học sinh tham gia: 256 học sinh</li>
        <li>Số lớp tham gia: 24/24 lớp (100%)</li>
        <li>Đề tài xuất sắc được đề cử thi cấp Thành phố: 03 đề tài</li>
      </ul>
      
      <p>Nhà trường xin chân thành cảm ơn sự nỗ lực của các em học sinh, sự hướng dẫn tận tình của các thầy cô giáo. Chúc các em tiếp tục phát huy tinh thần sáng tạo, nghiên cứu khoa học!</p>
      
      <p className="mt-6"><strong>Phòng Khoa học</strong></p>
    `,
    8: `
      <p>Kính gửi: Toàn thể cán bộ, giáo viên, nhân viên và học sinh</p>
      
      <p>Nhà trường thông báo lịch nghỉ Tết Dương lịch 2025 như sau:</p>
      
      <h3>1. Thời gian nghỉ</h3>
      <ul>
        <li><strong>Từ:</strong> Thứ Bảy, 01/01/2025 (Tết Dương lịch)</li>
        <li><strong>Đến:</strong> Chủ nhật, 03/01/2025</li>
        <li><strong>Tổng cộng:</strong> 03 ngày</li>
      </ul>
      
      <h3>2. Lịch học lại</h3>
      <ul>
        <li><strong>Học sinh:</strong> Trở lại học vào Thứ Hai, 04/01/2025</li>
        <li><strong>Giáo viên, nhân viên:</strong> Làm việc trở lại từ 04/01/2025</li>
      </ul>
      
      <h3>3. Công tác bảo vệ trong dịp nghỉ</h3>
      <p>Lực lượng bảo vệ trực 24/7 đảm bảo an ninh trật tự. Liên hệ khẩn cấp:</p>
      <ul>
        <li>Đội bảo vệ: 024.xxxx.xxxx</li>
        <li>Ban Giám hiệu: 024.yyyy.yyyy</li>
      </ul>
      
      <h3>4. Lưu ý quan trọng</h3>
      
      <p><strong>Đối với học sinh:</strong></p>
      <ul>
        <li>Chấp hành tốt các quy định về an toàn giao thông</li>
        <li>Không tham gia các hoạt động có nguy cơ mất an toàn</li>
        <li>Tận dụng thời gian nghỉ để ôn tập, chuẩn bị cho kỳ thi</li>
        <li>Giữ liên lạc với gia đình, không đi xa một mình</li>
      </ul>
      
      <p><strong>Đối với giáo viên:</strong></p>
      <ul>
        <li>Hoàn thành các công việc cần thiết trước khi nghỉ</li>
        <li>Sắp xếp kế hoạch giảng dạy cho tuần tiếp theo</li>
        <li>Giữ liên lạc qua group để xử lý công việc đột xuất</li>
      </ul>
      
      <h3>5. Kế hoạch tuần đầu tháng 1/2025</h3>
      <ul>
        <li><strong>Tuần 04-10/01:</strong> Ôn tập chuẩn bị thi học kỳ</li>
        <li><strong>Ngày 10/01:</strong> Họp phụ huynh học kỳ 1</li>
        <li><strong>Ngày 15/01:</strong> Bắt đầu thi học kỳ 1</li>
      </ul>
      
      <h3>6. Thông điệp năm mới</h3>
      <p>Nhân dịp năm mới 2025, Ban Giám hiệu nhà trường kính chúc:</p>
      <ul>
        <li>Toàn thể thầy cô giáo sức khỏe dồi dào, công tác tốt</li>
        <li>Các em học sinh học tập tiến bộ, luôn vui vẻ</li>
        <li>Quý phụ huynh hạnh phúc, ấm no</li>
        <li>Năm mới 2025 thành công, may mắn đến với mọi người!</li>
      </ul>
      
      <p>Chúc mọi người có một kỳ nghỉ Tết vui vẻ, bổ ích và an toàn!</p>
      
      <p className="mt-6"><strong>Ban Giám Hiệu</strong><br/>Trường THPT ABC</p>
    `
  };
  return contentMap[id] || "<p>Nội dung đang cập nhật...</p>";
};

export function NewsDetail({ news, onBack }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // LẤY NỘI DUNG CHI TIẾT ĐÚNG
  const detailedContent = getDetailedContent(news.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* BACK BUTTON */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      {/* DETAIL CONTENT */}
      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* CATEGORY BADGE */}
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            categoryColors[news.category.normalize("NFC").trim().toLowerCase()] || "bg-gray-200 text-gray-700"
          }`}
        >
          {news.category}
        </span>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
          {news.title}
        </h1>

        {/* META INFORMATION */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(news.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{news.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span>
              {news.views || Math.floor(Math.random() * 900) + 100} lượt xem
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Share2 className="w-4 h-4" />
            Chia sẻ
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Bookmark className="w-4 h-4" />
            Lưu
          </button>
        </div>

        {/* COVER IMAGE */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* EXCERPT BOX */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg shadow-sm">
          <p className="text-gray-700 italic">{news.excerpt}</p>
        </div>

        {/* HTML CONTENT */}
        <div
          className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm"
          dangerouslySetInnerHTML={{ __html: detailedContent }}
        />
      </article>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}