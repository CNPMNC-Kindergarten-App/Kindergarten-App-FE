import { Calendar, User, Star } from "lucide-react";

const categoryColors = {
  'thông báo': 'bg-red-100 text-red-700',
  'sự kiện': 'bg-purple-100 text-purple-700',
  'hoạt động': 'bg-green-100 text-green-700',
  'học thuật': 'bg-blue-100 text-blue-700',
  'tuyển sinh': 'bg-orange-100 text-orange-700',
};


export function NewsFeatured({ news, onClick }) {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <article
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64">

        {/* ---- DÙNG IMG THUẦN ---- */}
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />

        {/* Category + Nổi bật */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              categoryColors[news.category.normalize("NFC").trim().toLowerCase()]
 || "bg-gray-100 text-gray-700"
            }`}
          >
            {news.category}
          </span>

          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            <Star className="w-3 h-3" />
            Nổi bật
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* TEXT CONTENT */}
      <div className="p-6">
        <h3 className="text-gray-900 mb-3 hover:text-blue-600">{news.title}</h3>

        <p className="text-gray-600 mb-4">{news.excerpt}</p>

        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formatDate(news.date)}
          </span>

          <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {news.author}
          </span>
        </div>
      </div>
    </article>
  );
}
