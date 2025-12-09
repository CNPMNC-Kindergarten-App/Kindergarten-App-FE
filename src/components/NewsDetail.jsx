import { Calendar, User, ArrowLeft, Share2, Bookmark, Eye } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const categoryColors = {
  "thông báo": "bg-red-100 text-red-700",
  "sự kiện": "bg-purple-100 text-purple-700",
  "hoạt động": "bg-green-100 text-green-700",
  "học thuật": "bg-blue-100 text-blue-700",
  "tuyển sinh": "bg-orange-100 text-orange-700",
};

/* ✅ MAP ENUM → TIẾNG VIỆT (CHỈ ĐỂ FIX API) */
const categoryEnumMap = {
  ANNOUNCEMENT: "thông báo",
  EVENT: "sự kiện",
  ACTIVITY: "hoạt động",
  ACADEMIC: "học thuật",
  ENROLLMENT: "tuyển sinh",
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

  /* ✅ FIX CATEGORY TỪ ENUM */
  const safeCategory =
    categoryEnumMap[news.category] ||
    news.category?.normalize("NFC").trim().toLowerCase();

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
            categoryColors[safeCategory] || "bg-gray-200 text-gray-700"
          }`}
        >
          {safeCategory}
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
            <span>{news.views || 0} lượt xem</span>
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
            src={news.image || "/no-image.png"}
            alt={news.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* EXCERPT BOX */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg shadow-sm">
          <p className="text-gray-700 italic">
            {news.excerpt || "Đang cập nhật nội dung..."}
          </p>
        </div>

        {/* ✅ HTML CONTENT TỪ API – FIX DỨT ĐIỂM */}
        <div
          className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm"
          dangerouslySetInnerHTML={{
            __html: news.html || "<p>Nội dung đang cập nhật...</p>",
          }}
        />
      </article>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}


