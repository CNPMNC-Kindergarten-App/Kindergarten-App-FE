import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { User, Phone, Mail, MapPin, Heart, Pill, Smile, Star, Activity, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// 1. IMPORT CONTEXT
import { useStudent } from "../contexts/StudentContext";

export default function StudentInformation() {
  const navigate = useNavigate();
  const { selectedStudent } = useStudent(); 

  const [activeTab, setActiveTab] = useState("contact"); 
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    let targetId = selectedStudent?.id;

    if (!targetId) {
       const saved = localStorage.getItem("selectedStudent");
       if (saved) {
          targetId = JSON.parse(saved).id;
       } 
    }

    if (!targetId) {
        setIsLoading(false);
        return; 
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://bk-kindergarten.fly.dev/api/children/${targetId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        
        const data = await response.json();

        // Format ngày sinh
        const formattedDob = data.dob ? data.dob.split('-').reverse().join('/') : "Chưa cập nhật";

        // Map dữ liệu
        setStudentData({
          id: data.id,
          fullName: data.name,
          dateOfBirth: formattedDob,
          gender: data.sex,
          healthStatus: data.health_status,
          
          parentName: data.parent_name || "Chưa cập nhật",
          parentPhone: data.parent_phone || "Chưa cập nhật",
          parentEmail: data.parent_email || "Chưa cập nhật",
          parentAddress: data.parent_address || "Chưa cập nhật",

          allergies: data.allergy || "Không có",
          medicalHistory: data.medical_history || "Không có",
          specialNotes: data.medical_issue || "Không có",

          habit: data.habit || "Chưa cập nhật",
          character: data.character || "Chưa cập nhật"
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Lỗi khi tải thông tin học sinh");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedStudent]); // Chạy lại khi selectedStudent thay đổi

  const calculateAge = (dateOfBirth) => {
    if(!dateOfBirth) return 0;
    const parts = dateOfBirth.split("/");
    if(parts.length !== 3) return 0;
    const birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!studentData) {
     return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Vui lòng chọn học sinh để xem thông tin.
            </div>
            <Footer />
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-row gap-6 px-4 py-8 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-1/5 min-w-[200px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 border border-blue-200 sticky top-24 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mb-1">Hồ sơ học sinh</p>
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                {studentData.fullName}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                <Calendar className="w-3 h-3"/> {studentData.dateOfBirth}
              </div>
              <p className="text-gray-600 mb-2 font-medium">{calculateAge(studentData.dateOfBirth)} tuổi - {studentData.gender}</p>
              
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                {studentData.healthStatus}
              </div>

              <div className="w-full border-t border-gray-100 mt-2"></div>
              
              <div className="mt-4 w-full">
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
                    <Activity className="w-4 h-4" /> Chế độ xem
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full md:w-4/5 min-w-0 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
            <div className="mt-1"><Activity className="w-5 h-5 text-blue-600"/></div>
            <div>
                <p className="text-sm text-blue-800">
                <strong>Thông tin chi tiết:</strong> Dưới đây là thông tin hồ sơ của trẻ được lưu trữ trên hệ thống. 
                Vui lòng liên hệ nhà trường nếu cần cập nhật thông tin.
                </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl p-2 border border-blue-200 shadow-sm inline-block w-full">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "contact"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Phone className="w-4 h-4" />
                Thông tin liên hệ
              </button>
              <button
                onClick={() => setActiveTab("health")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "health"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className="w-4 h-4" />
                Sức khỏe
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === "notes"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Smile className="w-4 h-4" />
                Sở thích & Tính cách
              </button>
            </div>
          </div>

          {/* Card 1: Thông tin liên hệ (Phụ huynh) */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <User className="w-6 h-6" />
                Thông tin phụ huynh / Người giám hộ
              </h2>
              <div className="space-y-4">
                {/* Họ tên phụ huynh */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Họ tên phụ huynh</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                    {studentData.parentName}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Số điện thoại */}
                    <div>
                    <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Số điện thoại
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                        {studentData.parentPhone}
                    </div>
                    </div>

                    {/* Email */}
                    <div>
                    <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                        {studentData.parentEmail}
                    </div>
                    </div>
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Địa chỉ liên hệ
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {studentData.parentAddress}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Thông tin sức khỏe */}
          {activeTab === "health" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <Heart className="w-6 h-6" />
                Thông tin sức khỏe & Y tế
              </h2>
              <div className="space-y-4">
                {/* Dị ứng */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-red-400" /> Dị ứng (Thức ăn/Thuốc)
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[60px]">
                    {studentData.allergies}
                  </div>
                </div>

                {/* Tiền sử bệnh */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Tiền sử bệnh
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[60px]">
                    {studentData.medicalHistory}
                  </div>
                </div>

                {/* Vấn đề y tế hiện tại (Ghi chú đặc biệt) */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <Pill className="w-3 h-3" /> Vấn đề y tế hiện tại / Ghi chú thuốc
                  </label>
                  <div className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-900 min-h-[60px]">
                    {studentData.specialNotes}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Ghi chú thêm (Sở thích & Tính cách) */}
          {activeTab === "notes" && (
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <Smile className="w-6 h-6" />
                Đặc điểm của trẻ
              </h2>
              <div className="space-y-4">
                {/* Sở thích */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <Star className="w-3 h-3" /> Sở thích / Thói quen
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[80px]">
                    {studentData.habit}
                  </div>
                </div>

                {/* Tính cách */}
                <div>
                  <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                    <Smile className="w-3 h-3" /> Tính cách
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[80px]">
                    {studentData.character}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}