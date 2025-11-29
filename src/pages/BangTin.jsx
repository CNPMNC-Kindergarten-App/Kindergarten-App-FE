import { useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { NewsFilter } from "../components/NewsFilter";
import { NewsFeatured } from "../components/NewsFeatured";
import { NewsDetail } from "../components/NewsDetail";
import { Bell, Search } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const categories = ["Tất cả", "Thông báo", "Sự kiện", "Hoạt động", "Học thuật", "Tuyển sinh"];

export default function BangTin() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);

  const newsData = [ {
    id: 1,
    title: 'Thông báo lịch thi học kỳ 1 năm học 2024-2025',
    excerpt: 'Nhà trường thông báo lịch thi học kỳ 1 năm học 2024-2025 cho toàn thể học sinh. Kỳ thi sẽ diễn ra từ ngày 15/01 đến 25/01/2025.',
    category: 'Thông báo',
    date: '2024-11-25',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    author: 'Ban Giám Hiệu',
    featured: true
  },
  {
    id: 2,
    title: 'Hội thao truyền thống năm 2024',
    excerpt: 'Hội thao truyền thống toàn trường sẽ được tổ chức vào ngày 10/12/2024 tại sân vận động trường. Đây là dịp để các bạn học sinh thể hiện tinh thần đoàn kết và thể thao.',
    category: 'Sự kiện',
    date: '2024-11-20',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    author: 'Đoàn trường',
    featured: true
  },
  {
    id: 3,
    title: 'Chương trình tình nguyện "Tiếp sức đến trường"',
    excerpt: 'Nhà trường phát động chương trình tình nguyện "Tiếp sức đến trường" nhằm hỗ trợ học sinh có hoàn cảnh khó khăn. Kêu gọi sự đóng góp của toàn thể thầy cô và học sinh.',
    category: 'Hoạt động',
    date: '2024-11-18',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    author: 'Đoàn trường',
    featured: false
  },
  {
    id: 4,
    title: 'Khai giảng khóa học Olympic Toán 2024',
    excerpt: 'Khóa học Olympic Toán dành cho học sinh khá giỏi các khối 10, 11, 12 sẽ bắt đầu từ ngày 01/12/2024. Học sinh có thể đăng ký tại phòng Đào tạo.',
    category: 'Học thuật',
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    author: 'Phòng Đào tạo',
    featured: false
  },
  {
    id: 5,
    title: 'Ngày hội tư vấn tuyển sinh Đại học 2025',
    excerpt: 'Nhà trường tổ chức ngày hội tư vấn tuyển sinh với sự tham gia của 50+ trường Đại học hàng đầu trong cả nước. Học sinh lớp 12 không nên bỏ lỡ cơ hội này.',
    category: 'Tuyển sinh',
    date: '2024-11-12',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800',
    author: 'Phòng Hướng nghiệp',
    featured: false
  },
  {
    id: 6,
    title: 'Cuộc thi "Học sinh thanh lịch 2024"',
    excerpt: 'Cuộc thi nhằm tôn vinh những học sinh có hành vi đẹp, phong cách học tập tích cực. Đăng ký tham gia trước ngày 30/11/2024.',
    category: 'Sự kiện',
    date: '2024-11-10',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    author: 'Ban Giám Hiệu',
    featured: false
  },
  {
    id: 7,
    title: 'Lễ trao giải Cuộc thi Khoa học Kỹ thuật',
    excerpt: 'Nhà trường long trọng tổ chức lễ trao giải Cuộc thi Khoa học Kỹ thuật cấp trường. Chúc mừng các em học sinh đã đạt được những thành tích xuất sắc.',
    category: 'Hoạt động',
    date: '2024-11-08',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    author: 'Phòng Khoa học',
    featured: false
  },
  {
    id: 8,
    title: 'Thông báo nghỉ Tết Dương lịch 2025',
    excerpt: 'Nhà trường thông báo lịch nghỉ Tết Dương lịch 2025 cho học sinh và giáo viên từ ngày 01/01 đến 03/01/2025.',
    category: 'Thông báo',
    date: '2024-11-05',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800',
    author: 'Ban Giám Hiệu',
    featured: false
  }]; // copy nguyên array từ App.tsx vào đây

  const filteredNews = newsData.filter((news) => {
    const matchCategory = selectedCategory === "Tất cả" || news.category === selectedCategory;
    const matchSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredNews = newsData.filter((n) => n.featured);
  const regularNews = filteredNews.filter((n) => !n.featured);

  if (selectedNews) {
    return <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bell className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-gray-900">Bảng Tin Nhà Trường</h1>
            <p className="text-gray-600 text-sm">Cập nhật thông tin mới nhất</p>
          </div>
        </div>
      </header>

    <main className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-xl shadow-sm">

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm thông báo, sự kiện..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <NewsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Featured */}
        {selectedCategory === "Tất cả" && featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-blue-600 rounded-full" />
              Tin Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredNews.map((news) => (
                <NewsFeatured key={news.id} news={news} onClick={() => setSelectedNews(news)} />
              ))}
            </div>
          </div>
        )}

        {/* Regular List */}
        <div>
          <h2 className="text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            {selectedCategory === "Tất cả" ? "Tất Cả Thông Báo" : selectedCategory}
          </h2>

          {regularNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((news) => (
                <NewsCard key={news.id} news={news} onClick={() => setSelectedNews(news)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">Không tìm thấy kết quả phù hợp</p>
            </div>
          )}
        </div>
      </main>
            <Footer />

    </div>
  );
}
