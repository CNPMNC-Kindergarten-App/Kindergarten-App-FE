import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { User } from "lucide-react";

export default function StudentInformation() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - sẽ thay thế bằng API call sau
  const [studentData, setStudentData] = useState({
    fullName: "Lê Đình Thuận",
    dateOfBirth: "13/12/2020",
    gender: "Nam",
    ethnicity: "Kinh",
    class: "Lá 3 (Lớp tăng cường Tiếng Anh)",
    email: "123/15 Đường 67, phường 89, Quận 10",
    allergies: "Lê Đình Công",
  });

  const handleInputChange = (field, value) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Gọi API để lưu thông tin
    console.log("Lưu thông tin:", studentData);
    setIsEditing(false);
    alert("Đã lưu thông tin thành công!");
  };

  const handleEdit = () => {
    setIsEditing(true);
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
              <p className="text-gray-600 mb-4">2020</p>
              {/* Blue divider line */}
              <div className="w-full border-t border-blue-300 mt-2"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Student Information (4/5 width) */}
        <div className="flex-1 w-full md:w-4/5 min-w-0 space-y-6">
          {/* Card 1: Thông tin học sinh */}
          <div className="bg-white rounded-xl p-6 border border-blue-200">
            <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
              Thông tin học sinh:
            </h2>
            <div className="space-y-4">
              {/* Họ và Tên - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và Tên:
                </label>
                <input
                  type="text"
                  value={studentData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Ngày sinh, Giới tính, Tuổi - 3 cột cùng hàng */}
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh:
                  </label>
                  <input
                    type="text"
                    value={studentData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính:
                  </label>
                  <input
                    type="text"
                    value={studentData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuổi:
                  </label>
                  <input
                    type="text"
                    value={studentData.ethnicity}
                    onChange={(e) => handleInputChange("ethnicity", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Lớp - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lớp:
                </label>
                <input
                  type="text"
                  value={studentData.class}
                  onChange={(e) => handleInputChange("class", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="text"
                  value={studentData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Thông tin sức khỏe */}
          <div className="bg-white rounded-xl p-6 border border-blue-200">
            <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight:900 }}>
              Thông tin sức khoẻ:
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dị ứng
              </label>
              <input
                type="text"
                value={studentData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập thông tin dị ứng (nếu có)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
                Nhu cầu đặc biệt
              </label>
              <input
                type="text"
                value={studentData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập thông tin nhu cầu đặc biệt (nếu có)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
                Tiểu sử bệnh
              </label>
              <input
                type="text"
                value={studentData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập tiểu sử bệnh(nếu có)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

           {/* Card 3: Thông tin lớp học */}
           <div className="bg-white rounded-xl p-6 border border-blue-200">
            <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight:900 }}>
              Thông tin lớp học:
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lớp học:
              </label>
              <input
                type="text"
                value={studentData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập thông tin lớp học"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
                Tình trạng đi học:
              </label>
              <input
                type="text"
                value={studentData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="Nhập thông tin nhu cầu đặc biệt (nếu có)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-6">
            <button
              onClick={handleEdit}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90"
              style={{ backgroundColor: '#D4D4D4', color: 'black' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#C4C4C4'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#D4D4D4'}
            >
              Chỉnh sửa
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-lg transition-colors font-medium text-base hover:opacity-90"
              style={{ backgroundColor: '#FEA439', color: 'black' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E89223'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FEA439'}
            >
              Lưu những thay đổi  
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
