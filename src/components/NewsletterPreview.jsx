import React from "react";
import { Calendar, User, Tag, Star } from "lucide-react";

export function NewsletterPreview({ data }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Preview Header */}
        <div className="mb-6 pb-4 border-b">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <span className="text-sm">Chế độ xem trước</span>
            {data.featured && (
              <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                <Star className="w-3 h-3" />
                Nổi bật
              </span>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {data.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800";
              }}
            />
          </div>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          {data.category && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{data.category}</span>
            </div>
          )}
          {data.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(data.date)}</span>
            </div>
          )}
          {data.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{data.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {data.title || "Tiêu đề bản tin"}
        </h1>

        {/* Excerpt */}
        {data.excerpt && (
          <div className="text-gray-600 mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            {data.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {data.content ? (
            <div
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <p className="text-gray-400 italic">
              Nội dung chi tiết sẽ hiển thị ở đây...
            </p>
          )}
        </div>

        {/* Preview Footer */}
        <div className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
          <p>--- Kết thúc bản tin ---</p>
        </div>
      </div>

      <style>{`
        .content-preview h1,
        .content-preview h2,
        .content-preview h3 {
          color: #1e293b;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .content-preview h3 {
          font-size: 1.25em;
          font-weight: 600;
        }
        
        .content-preview p {
          margin-bottom: 1em;
          line-height: 1.7;
        }
        
        .content-preview ul,
        .content-preview ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .content-preview li {
          margin-bottom: 0.5em;
        }
        
        .content-preview strong {
          font-weight: 600;
          color: #0f172a;
        }
        
        .content-preview a {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
