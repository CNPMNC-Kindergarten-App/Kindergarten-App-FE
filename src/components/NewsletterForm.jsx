import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm({ formData, setFormData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ ÉP featured THÀNH STRING "true" | "false"
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
            ? "true"
            : "false" // ✅ STRING
          : String(value), // ✅ TẤT CẢ FIELD KHÁC LÀ STRING
    });
  };

  // ✅ ĐỔI content → html (STRING)
  const handleContentChange = (html) => {
    setFormData({
      ...formData,
      html: String(html),
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      setFormData({
        ...formData,
        image: String(result.secure_url), // ✅ STRING
      });

      toast.success("Upload ảnh thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Upload ảnh thất bại");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION THEO FIELD STRING
    if (!formData.title?.trim()) {
      toast.error("Vui lòng nhập tiêu đề bản tin");
      return;
    }
    if (!formData.excerpt?.trim()) {
      toast.error("Vui lòng nhập mô tả ngắn");
      return;
    }
    if (!formData.author?.trim()) {
      toast.error("Vui lòng nhập tên tác giả");
      return;
    }
    if (!formData.html?.trim()) {
      toast.error("Vui lòng nhập nội dung bản tin");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feed/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // ✅ TOÀN BỘ STRING
        }
      );

      if (response.ok) {
        toast.success("Tạo bản tin thành công!");

        // ✅ RESET FORM TOÀN BỘ STRING
        setFormData({
          title: "",
          excerpt: "",
          category: "ANNOUNCEMENT",
          date: new Date().toISOString().split("T")[0],
          image: "",
          author: "",
          featured: "false",
          html: "",
        });
        setTimeout(() => {
    window.location.reload();
  }, 3000);
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="ANNOUNCEMENT">Thông báo</option>
            <option value="EVENT">Sự kiện</option>
            <option value="ACTIVITY">Hoạt động</option>
            <option value="ACADEMIC">Học thuật</option>
            <option value="ENROLLMENT">Tuyển sinh</option>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Image and Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="w-full"
          />

          {formData.image && (
            <img
              src={formData.image}
              className="mt-3 w-40 rounded border"
              alt="preview"
            />
          )}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
          checked={formData.featured === "true"}
          onChange={handleInputChange}
          className="w-4 h-4"
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
        <RichTextEditor value={formData.html} onChange={handleContentChange} />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
