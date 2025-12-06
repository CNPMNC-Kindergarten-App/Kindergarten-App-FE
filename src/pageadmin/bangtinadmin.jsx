import React, { useState } from "react";
import { NewsletterForm } from "../components/NewsletterForm";
import { NewsletterPreview } from "../components/NewsletterPreview";
import { FileText, Eye } from "lucide-react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' | 'preview'
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Thông báo",
    date: new Date().toISOString().split("T")[0],
    image: "",
    author: "",
    featured: false,
    content: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
          
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold text-blue-600 mb-2">
            Hệ thống quản lý Bảng Tin
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý các thông báo cho học sinh và phụ huynh
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === "edit"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-5 h-5" />
            Soạn thảo
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === "preview"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Eye className="w-5 h-5" />
            Xem trước
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === "edit" ? (
            <NewsletterForm formData={formData} setFormData={setFormData} />
          ) : (
            <NewsletterPreview data={formData} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
