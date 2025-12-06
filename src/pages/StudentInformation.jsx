import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { User, Phone, Mail, MapPin, Users, Heart, Pill, Utensils, Moon, Smile, Eye, Edit2 } from "lucide-react";
import { toast } from "sonner";

export default function StudentInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("contact"); // 'contact' | 'health' | 'notes'
  const [isSaving, setIsSaving] = useState(false);

  // Mock data - sẽ thay thế bằng API call sau
  const [studentData, setStudentData] = useState({
    // Thông tin cơ bản (chỉ xem)
    fullName: "Lê Đình Thuận",
    dateOfBirth: "13/12/2020",
    gender: "Nam",
    age: 4,
    class: "Lá 3 (Lớp tăng cường Tiếng Anh)",
    
    // Thông tin liên hệ (có thể chỉnh sửa)
    phone: "0901234567",
    email: "phuhuynh@example.com",
    address: "123/15 Đường 67, phường 89, Quận 10, TP.HCM",
    pickupPerson: "Lê Đình Công",
    
    // Thông tin sức khỏe (có thể chỉnh sửa)
    allergies: "Không có",
    chronicDiseases: "Không có",
    medications: "Không có",
    healthStatus: "Tốt",
    
    // Ghi chú thêm (có thể chỉnh sửa)
    eatingHabits: "Ăn uống bình thường, thích ăn rau củ",
    sleepHabits: "Ngủ đúng giờ, 8-9 tiếng/ngày",
    personality: "Hoạt bát, thân thiện, thích vẽ tranh",
  });

  const handleInputChange = (field, value) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (studentData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }
    
    if (studentData.phone && !/^[0-9]{10,11}$/.test(studentData.phone.replace(/\s/g, ""))) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)");
      return;
    }

    setIsSaving(true);
    
    try {
      // TODO: Gọi API để lưu thông tin
      // const response = await fetch("http://localhost:8080/student/update", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(studentData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Gửi thông báo cho giáo viên
      // await fetch("http://localhost:8080/notifications/teacher", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     message: `Phụ huynh đã cập nhật thông tin cho học sinh ${studentData.fullName}`,
      //     studentId: studentData.id,
      //   }),
      // });
      
      setIsEditing(false);
      setIsSaving(false);
      toast.success("Đã cập nhật thông tin thành công! Giáo viên phụ trách đã được thông báo về thay đổi này.");
    } catch (error) {
      console.error("Error saving student information:", error);
      setIsSaving(false);
      toast.error("Lỗi khi lưu thông tin. Vui lòng thử lại.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reload data from API to reset changes
    toast.info("Đã hủy chỉnh sửa");
  };

  // Tính tuổi từ ngày sinh
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth.split("/").reverse().join("-"));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
        {/* Left Sidebar - Student Photo (1/5 width) */}
        <div className="w-1/5 min-w-[200px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 border border-blue-200 sticky top-24">
            <div className="flex flex-col items-center">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-gray-700" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Ảnh</p>
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                {studentData.fullName}
              </h3>
              <p className="text-gray-600 mb-2">{calculateAge(studentData.dateOfBirth)} tuổi</p>
              <p className="text-sm text-gray-500 mb-4">
                Tình trạng: <span className="font-semibold text-green-600">{studentData.healthStatus}</span>
              </p>
              {/* Blue divider line */}
              <div className="w-full border-t border-blue-300 mt-2"></div>
              
              {/* View/Edit Mode Indicator */}
              <div className="mt-4 w-full">
                {isEditing ? (
                  <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                    <Edit2 className="w-4 h-4" />
                    Chế độ chỉnh sửa
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    Chế độ xem
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Student Information (4/5 width) */}
        <div className="flex-1 w-full md:w-4/5 min-w-0 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Bạn có thể cập nhật thông tin liên hệ, sức khỏe và ghi chú của con mình. 
              Sau khi lưu, giáo viên phụ trách sẽ nhận được thông báo về các thay đổi này.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "contact"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Phone className="w-5 h-5" />
                Thông tin liên hệ
              </button>
              <button
                onClick={() => setActiveTab("health")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "health"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart className="w-5 h-5" />
                Thông tin sức khỏe
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "notes"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Smile className="w-5 h-5" />
                Ghi chú thêm
              </button>
            </div>
          </div>

          {/* Card 1: Thông tin liên hệ */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Thông tin liên hệ:
              </h2>
              <div className="space-y-4">
                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại:
                  </label>
                  <input
                    type="tel"
                    value={studentData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email:
                  </label>
                  <input
                    type="email"
                    value={studentData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Nhập địa chỉ email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Địa chỉ:
                  </label>
                  <textarea
                    value={studentData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập địa chỉ đầy đủ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Người đón trẻ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Người đón trẻ:
                  </label>
                  <input
                    type="text"
                    value={studentData.pickupPerson}
                    onChange={(e) => handleInputChange("pickupPerson", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Nhập tên người đón trẻ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Thông tin sức khỏe */}
          {activeTab === "health" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Thông tin sức khỏe:
              </h2>
              <div className="space-y-4">
                {/* Dị ứng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Dị ứng:
                  </label>
                  <textarea
                    value={studentData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin dị ứng (nếu có)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Bệnh mãn tính */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Bệnh mãn tính:
                  </label>
                  <textarea
                    value={studentData.chronicDiseases}
                    onChange={(e) => handleInputChange("chronicDiseases", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin bệnh mãn tính (nếu có)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Thuốc đang sử dụng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Thuốc đang sử dụng:
                  </label>
                  <textarea
                    value={studentData.medications}
                    onChange={(e) => handleInputChange("medications", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin thuốc đang sử dụng (nếu có)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Ghi chú thêm */}
          {activeTab === "notes" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Ghi chú thêm:
              </h2>
              <div className="space-y-4">
                {/* Thói quen ăn uống */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Thói quen ăn uống:
                  </label>
                  <textarea
                    value={studentData.eatingHabits}
                    onChange={(e) => handleInputChange("eatingHabits", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin về thói quen ăn uống của trẻ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Giấc ngủ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Giấc ngủ:
                  </label>
                  <textarea
                    value={studentData.sleepHabits}
                    onChange={(e) => handleInputChange("sleepHabits", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin về giấc ngủ của trẻ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Tính cách */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Smile className="w-4 h-4" />
                    Tính cách của trẻ:
                  </label>
                  <textarea
                    value={studentData.personality}
                    onChange={(e) => handleInputChange("personality", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Nhập thông tin về tính cách của trẻ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#D4D4D4', color: 'black' }}
                  onMouseEnter={(e) => !isSaving && (e.target.style.backgroundColor = '#C4C4C4')}
                  onMouseLeave={(e) => !isSaving && (e.target.style.backgroundColor = '#D4D4D4')}
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{ backgroundColor: '#FEA439', color: 'black' }}
                  onMouseEnter={(e) => !isSaving && (e.target.style.backgroundColor = '#E89223')}
                  onMouseLeave={(e) => !isSaving && (e.target.style.backgroundColor = '#FEA439')}
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu những thay đổi"
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90"
                style={{ backgroundColor: '#D4D4D4', color: 'black' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#C4C4C4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#D4D4D4'}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
