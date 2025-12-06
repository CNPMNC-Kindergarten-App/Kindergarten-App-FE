import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm({ formData, setFormData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bản tin");
      return;
    }
    if (!formData.excerpt.trim()) {
      toast.error("Vui lòng nhập mô tả ngắn");
      return;
    }
    if (!formData.author.trim()) {
      toast.error("Vui lòng nhập tên tác giả");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Vui lòng nhập nội dung bản tin");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/feed/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Tạo bản tin thành công!");
        // Reset form
        setFormData({
          title: "",
          excerpt: "",
          category: "Thông báo",
          date: new Date().toISOString().split("T")[0],
          image: "",
          author: "",
          featured: false,
          content: "",
        });
      } else {
        const error = await response.text();
        toast.error(`Lỗi: ${error || "Không thể tạo bản tin"}`);
      }
    } catch (error) {
      console.error("Error creating newsletter:", error);
      toast.error(
        "Lỗi kết nối đến server. Vui lòng kiểm tra API đang chạy tại http://localhost:8080"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-gray-700 mb-2">
          Tiêu đề bản tin <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ví dụ: Thông báo lịch thi học kỳ 1 năm học 2024-2025"
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-gray-700 mb-2">
          Mô tả ngắn <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Nhập mô tả ngắn về bản tin..."
          required
        />
      </div>

      {/* Category and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-gray-700 mb-2">
            Danh mục
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Thông báo">Thông báo</option>
            <option value="Sự kiện">Sự kiện</option>
            <option value="Học tập">Học tập</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Tin tức">Tin tức</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 mb-2">
            Ngày đăng
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Image URL and Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            URL hình ảnh
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 mb-2">
            Tác giả <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ví dụ: Ban Giám Hiệu"
            required
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleInputChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-gray-700">
          Đánh dấu là bản tin nổi bật
        </label>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-gray-700 mb-2">
          Nội dung chi tiết <span className="text-red-500">*</span>
        </label>
        <RichTextEditor value={formData.content} onChange={handleContentChange} />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Lưu bản tin
            </>
          )}
        </button>
      </div>
    </form>
  );
}
