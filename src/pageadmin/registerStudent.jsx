import React, { useState } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Thông tin cơ bản học sinh
    fullName: "",
    dateOfBirth: "",
    gender: "Nam",
    healthStatus: "Bình thường",
    habit: "",      // MỚI: Sở thích
    character: "",  // MỚI: Tính cách

    // Thông tin phụ huynh (Chỉ để hiển thị/validate)
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentAddress: "",

    // Thông tin sức khỏe / Khác
    medicalHistory: "",
    allergies: "",
    specialNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Kiểm tra thông tin cơ bản
    if (!formData.fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên học sinh");
      return false;
    }
    if (!formData.dateOfBirth) {
      toast.error("Vui lòng chọn ngày sinh");
      return false;
    }
    
    // Kiểm tra thông tin phụ huynh
    if (!formData.parentName.trim()) {
      toast.error("Vui lòng nhập họ tên phụ huynh");
      return false;
    }
    if (!formData.parentPhone.trim()) {
      toast.error("Vui lòng nhập số điện thoại phụ huynh");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Chuẩn bị dữ liệu JSON
    const payload = {
      name: formData.fullName,
      sex: formData.gender,
      dob: formData.dateOfBirth,
      habit: formData.habit || "Chưa cập nhật",         // Link API field habit
      character: formData.character || "Chưa cập nhật", // Link API field character
      allergy: formData.allergies || "Không",
      medical_issue: formData.specialNotes || "Không",
      medical_history: formData.medicalHistory || "Bình thường",
      health_status: formData.healthStatus,
      parent_id: 1 // Hardcode parent_id
    };

    try {
      const response = await fetch("https://bk-kindergarten.fly.dev/api/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(errorData.message || "Lỗi khi tạo hồ sơ học sinh");
      }

      toast.success("Đã thêm hồ sơ học sinh thành công!");
      
      // Reset form
      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "Nam",
        healthStatus: "Bình thường",
        habit: "",
        character: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        parentAddress: "",
        medicalHistory: "",
        allergies: "",
        specialNotes: "",
      });

      setTimeout(() => {
        navigate("/studentlist");
      }, 1500);

    } catch (error) {
      console.error("Error creating student:", error);
      toast.error(`Thất bại: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => navigate("/studentlist")}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại danh sách</span>
        </button>

        <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thêm hồ sơ trẻ
          </h1>
          <p className="text-gray-600">
            Điền thông tin để đăng ký hồ sơ trẻ vào hệ thống
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- KHỐI THÔNG TIN CƠ BẢN --- */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin cơ bản
            </h2>
            
            <div className="space-y-4">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên trẻ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Nhập họ và tên"
                />
              </div>

              {/* Ngày sinh & Giới tính */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              {/* MỚI: Sở thích & Tính cách */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sở thích
                  </label>
                  <input
                    type="text"
                    name="habit"
                    value={formData.habit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="VD: Vẽ tranh, lắp ráp..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tính cách
                  </label>
                  <input
                    type="text"
                    name="character"
                    value={formData.character}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="VD: Hoà đồng, năng động..."
                  />
                </div>
              </div>

              {/* Tình trạng sức khỏe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tình trạng sức khỏe <span className="text-red-500">*</span>
                </label>
                <select
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Bình thường">Bình thường</option>
                  <option value="Tốt">Tốt</option>
                  <option value="Yếu">Yếu</option>
                  <option value="Cần theo dõi đặc biệt">Cần theo dõi đặc biệt</option>
                  <option value="Đang điều trị">Đang điều trị</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- KHỐI THÔNG TIN PHỤ HUYNH --- */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin phụ huynh (Người giám hộ)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ tên phụ huynh <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Nhập họ tên phụ huynh"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="0123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ liên hệ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="parentAddress"
                  value={formData.parentAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="Nhập địa chỉ đầy đủ"
                />
              </div>
            </div>
          </div>

          {/* --- KHỐI THÔNG TIN CHI TIẾT --- */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin chi tiết (Tùy chọn)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiền sử bệnh (Lịch sử y tế)
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="Đã tiêm đủ vaccine, từng mắc bệnh gì..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dị ứng (Thức ăn/Thuốc)
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="VD: Dị ứng tôm, phấn hoa..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vấn đề y tế hiện tại (Ghi chú đặc biệt)
                </label>
                <textarea
                  name="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="VD: Đang bị ho, cần uống thuốc lúc 10h..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/studentlist")}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#D4D4D4', color: 'black' }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              style={{ backgroundColor: '#FEA439', color: 'black' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Lưu hồ sơ
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}