
import { useState, useEffect } from "react";
import { NewsCard } from "../components/NewsCard";
import { NewsFilter } from "../components/NewsFilter";
import { NewsFeatured } from "../components/NewsFeatured";
import { NewsDetail } from "../components/NewsDetail";
import { Bell, Search } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/* ✅ CATEGORY HIỂN THỊ */
const categories = [
  "Tất cả",
  "Thông báo",
  "Sự kiện",
  "Hoạt động",
  "Học thuật",
  "Tuyển sinh",
];

/* ✅ MAP ENUM API */
const categoryEnumMap = {
  "Thông báo": "ANNOUNCEMENT",
  "Sự kiện": "EVENT",
  "Hoạt động": "ACTIVITY",
  "Học thuật": "ACADEMIC",
  "Tuyển sinh": "ENROLLMENT",
};

export default function BangTin() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ LOAD DATA */
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let url =
          selectedCategory === "Tất cả"
            ? "https://bk-kindergarten.fly.dev/api/feed/findAll"
            : `https://bk-kindergarten.fly.dev/api/feed/findByCategory?category=${categoryEnumMap[selectedCategory]}`;

        const res = await fetch(url);
        const result = await res.json();

        if (Array.isArray(result)) {
          setNewsData(result);
        } else if (Array.isArray(result.data)) {
          setNewsData(result.data);
        } else {
          setNewsData([]);
        }
      } catch (error) {
        console.error("Lỗi API:", error);
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  /* ✅ SEARCH */
  const filteredNews = newsData.filter((news) => {
    const matchSearch =
      news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const featuredNews = filteredNews.filter(
    (n) => String(n.featured) === "true" || n.featured === true
  );

  const regularNews = filteredNews.filter(
    (n) => !(String(n.featured) === "true" || n.featured === true)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (selectedNews) {
    return (
      <NewsDetail
        news={selectedNews}
        onBack={() => setSelectedNews(null)}
      />
    );
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
            <p className="text-gray-600 text-sm">
              Cập nhật thông tin mới nhất
            </p>
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
                <NewsFeatured
                  key={news.id}
                  news={news}
                  onClick={() => setSelectedNews(news)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular List */}
        <div>
          <h2 className="text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-blue-600 rounded-full" />
            {selectedCategory === "Tất cả"
              ? "Tất Cả Thông Báo"
              : selectedCategory}
          </h2>

          {regularNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((news) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  onClick={() => setSelectedNews(news)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">
                Không tìm thấy kết quả phù hợp
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
