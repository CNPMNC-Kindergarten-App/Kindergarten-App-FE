import { Calendar, User, ArrowRight } from "lucide-react";

export function NewsCard({ news, onClick }) {
  const categoryColors = {
  'thông báo': 'bg-red-100 text-red-700',
  'sự kiện': 'bg-purple-100 text-purple-700',
  'hoạt động': 'bg-green-100 text-green-700',
  'học thuật': 'bg-blue-100 text-blue-700',
  'tuyển sinh': 'bg-orange-100 text-orange-700',
};


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              categoryColors[news.category.normalize("NFC").trim().toLowerCase()]
 || "bg-gray-200 text-gray-700"
            }`}
          >
            {news.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {news.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(news.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{news.author}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm">
          <span>Xem chi tiết</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
