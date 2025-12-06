import React, { useState } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { ArrowLeft, User, Upload, Save, Loader2 } from "lucide-react";
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
    class: "",
    avatar: null,
    avatarPreview: null,

    // Thông tin phụ huynh
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentAddress: "",

    // Thông tin sức khỏe
    medicalHistory: "",
    allergies: "",
    specialNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    if (!formData.class) {
      toast.error("Vui lòng chọn lớp học");
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
    if (!/^[0-9]{10,11}$/.test(formData.parentPhone.replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ (10-11 chữ số)");
      return false;
    }
    if (!formData.parentEmail.trim()) {
      toast.error("Vui lòng nhập email phụ huynh");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      toast.error("Email không hợp lệ");
      return false;
    }
    if (!formData.parentAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ liên hệ");
      return false;
    }

    return true;
  };

  const checkDuplicate = async (studentData) => {
    // TODO: Gọi API để kiểm tra trùng thông tin
    // const response = await fetch("http://localhost:8080/student/check-duplicate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     fullName: studentData.fullName,
    //     dateOfBirth: studentData.dateOfBirth,
    //     class: studentData.class,
    //   }),
    // });
    // const result = await response.json();
    // return result.isDuplicate;

    // Mock: Giả sử không trùng
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Kiểm tra trùng thông tin
    const isDuplicate = await checkDuplicate({
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      class: formData.class,
    });

    if (isDuplicate) {
      toast.error("Học sinh này đã tồn tại trong hệ thống (trùng tên, ngày sinh và lớp)");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Gọi API để tạo học sinh mới
      // const formDataToSend = new FormData();
      // formDataToSend.append("fullName", formData.fullName);
      // formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      // formDataToSend.append("gender", formData.gender);
      // formDataToSend.append("class", formData.class);
      // if (formData.avatar) {
      //   formDataToSend.append("avatar", formData.avatar);
      // }
      // formDataToSend.append("parentName", formData.parentName);
      // formDataToSend.append("parentPhone", formData.parentPhone);
      // formDataToSend.append("parentEmail", formData.parentEmail);
      // formDataToSend.append("parentAddress", formData.parentAddress);
      // formDataToSend.append("medicalHistory", formData.medicalHistory);
      // formDataToSend.append("allergies", formData.allergies);
      // formDataToSend.append("specialNotes", formData.specialNotes);

      // const response = await fetch("http://localhost:8080/student/create", {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //   },
      //   body: formDataToSend,
      // });

      // if (!response.ok) {
      //   throw new Error("Không thể tạo học sinh mới");
      // }

      // const result = await response.json();

      // TODO: Tạo tài khoản cho phụ huynh
      // await fetch("http://localhost:8080/auth/register-parent", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: formData.parentEmail,
      //     password: formData.parentPhone, // Mật khẩu là số điện thoại
      //     fullName: formData.parentName,
      //     phone: formData.parentPhone,
      //     studentId: result.studentId,
      //     role: "parent",
      //   }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success("Đã thêm học sinh mới thành công! Tài khoản phụ huynh đã được tạo (Email: " + formData.parentEmail + ", Mật khẩu: " + formData.parentPhone + ")");
      
      // Reset form
      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "Nam",
        class: "",
        avatar: null,
        avatarPreview: null,
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        parentAddress: "",
        medicalHistory: "",
        allergies: "",
        specialNotes: "",
      });

      // Điều hướng về danh sách học sinh sau 2 giây
      setTimeout(() => {
        navigate("/studentlist");
      }, 2000);
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error("Lỗi khi tạo học sinh mới. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/studentlist")}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại danh sách</span>
        </button>

        {/* Form Header */}
        <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thêm học sinh mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin để đăng ký học sinh mới vào hệ thống
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin cơ bản học sinh */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin cơ bản học sinh
            </h2>
            
            <div className="space-y-4">
              {/* Họ và tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Nhập họ và tên học sinh"
                />
              </div>

              {/* Ngày sinh và Giới tính */}
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

              {/* Lớp học */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lớp học <span className="text-red-500">*</span>
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Chọn lớp</option>
                  <option value="Lá 1">Lá 1</option>
                  <option value="Lá 2">Lá 2</option>
                  <option value="Lá 3">Lá 3</option>
                  <option value="Chồi 1">Chồi 1</option>
                  <option value="Chồi 2">Chồi 2</option>
                  <option value="Mầm 1">Mầm 1</option>
                  <option value="Mầm 2">Mầm 2</option>
                </select>
              </div>

              {/* Ảnh đại diện */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh đại diện
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.avatarPreview ? (
                      <img
                        src={formData.avatarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg cursor-pointer hover:bg-teal-600 transition-colors">
                    <Upload className="w-5 h-5" />
                    Chọn ảnh
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin phụ huynh */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin phụ huynh / người giám hộ
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

          {/* Thông tin sức khỏe */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#19C1B6' }}>
              Thông tin sức khỏe (Tùy chọn)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiền sử bệnh
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="Nhập tiền sử bệnh (nếu có)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dị ứng thức ăn hoặc thuốc
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="Nhập thông tin dị ứng (nếu có)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú đặc biệt
                </label>
                <textarea
                  name="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  placeholder="Ví dụ: Cần uống thuốc lúc 10h sáng"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/studentlist")}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#D4D4D4', color: 'black' }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                  Lưu thông tin
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

