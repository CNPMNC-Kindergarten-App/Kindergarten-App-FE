import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { User, Phone, Mail, Heart, Pill, GraduationCap, Calendar, Eye, Loader2, ArrowLeft, Utensils, Moon, Smile } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function StudentInformation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  // Mock data - sẽ thay thế bằng API call sau
  useEffect(() => {
    if (!studentId) {
      toast.error("Không tìm thấy thông tin học sinh");
      navigate("/studentlist");
      return;
    }

    // Simulate API call với thời gian phản hồi ≤ 2 giây
    const loadStudentData = async () => {
      setIsLoading(true);
      try {
        // TODO: Gọi API để lấy thông tin học sinh
        // const response = await fetch(`http://localhost:8080/student/${studentId}`, {
        //   headers: {
        //     "Authorization": `Bearer ${token}`,
        //   },
        // });
        // const data = await response.json();
        
        // Simulate API call (≤ 2 giây)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - có thể thay đổi dựa trên studentId
        const mockData = {
          id: parseInt(studentId) || 1,
          fullName: "Lê Đình Thuận",
          dateOfBirth: "13/12/2020",
          gender: "Nam",
          age: 4,
          class: "Lá 3 (Lớp tăng cường Tiếng Anh)",
          classId: "LA3-TA",
          attendanceStatus: "Đi học đều",
          attendanceRate: "95%",
          
          // Thông tin liên hệ phụ huynh
          parentPhone: "0901234567",
          parentEmail: "phuhuynh@example.com",
          
          // Thông tin sức khỏe
          allergies: "Không có",
          specialMedicalNeeds: "Không có",
          medicalHistory: "Không có tiền sử bệnh nghiêm trọng",
          healthStatus: "Tốt",
          
          // Ghi chú thêm
          eatingHabits: "Ăn uống bình thường, thích ăn rau củ",
          sleepHabits: "Ngủ đúng giờ, 8-9 tiếng/ngày",
          personality: "Hoạt bát, thân thiện, thích vẽ tranh",
        };
        
        setStudentData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading student information:", error);
        setIsLoading(false);
        toast.error("Không thể tải thông tin học sinh. Vui lòng thử lại.");
      }
    };

    loadStudentData();
  }, [studentId, navigate]);

  // Tính tuổi từ ngày sinh
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth.split("/").reverse().join("-"));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
            <p className="text-gray-600">Đang tải thông tin học sinh...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Không tìm thấy thông tin học sinh</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              
              {/* View Mode Indicator */}
              <div className="mt-4 w-full">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  Chế độ xem
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Chỉ xem thông tin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Student Information (4/5 width) */}
        <div className="flex-1 w-full md:w-4/5 min-w-0 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/studentlist")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại danh sách lớp</span>
          </button>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Đây là thông tin chi tiết của học sinh. Bạn chỉ có quyền xem thông tin này.
            </p>
          </div>

          {/* Card 1: Thông tin cơ bản */}
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Thông tin cơ bản:
              </h2>
              <div className="space-y-4">
                {/* Họ và tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên:
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.fullName}
                  </div>
                </div>

                {/* Tuổi và Giới tính */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tuổi:
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {calculateAge(studentData.dateOfBirth)} tuổi
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới tính:
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {studentData.gender}
                    </div>
                  </div>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh:
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.dateOfBirth}
                  </div>
                </div>

                {/* Số điện thoại phụ huynh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại liên hệ (Phụ huynh):
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.parentPhone}
                  </div>
                </div>

                {/* Email phụ huynh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email liên hệ (Phụ huynh):
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.parentEmail}
                  </div>
                </div>
              </div>
            </div>

          {/* Card 2: Thông tin sức khỏe */}
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
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[80px]">
                    {studentData.allergies || "Không có thông tin"}
                  </div>
                </div>

                {/* Nhu cầu y tế đặc biệt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Nhu cầu y tế đặc biệt:
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[80px]">
                    {studentData.specialMedicalNeeds || "Không có thông tin"}
                  </div>
                </div>

                {/* Tiền sử bệnh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Tiền sử bệnh:
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[80px]">
                    {studentData.medicalHistory || "Không có thông tin"}
                  </div>
                </div>

                {/* Tình trạng sức khỏe hiện tại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tình trạng sức khỏe hiện tại:
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    <span className="font-semibold text-green-600">{studentData.healthStatus}</span>
                  </div>
                </div>
              </div>
            </div>

          {/* Card 3: Thông tin lớp & lịch học */}
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Thông tin lớp & lịch học:
              </h2>
              <div className="space-y-4">
                {/* Lớp được phân công */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Lớp được phân công:
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.class}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Mã lớp: {studentData.classId}</p>
                </div>

                {/* Tình trạng đi học */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Tình trạng đi học:
                  </label>
                  <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {studentData.attendanceStatus}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tỷ lệ đi học: {studentData.attendanceRate}</p>
                </div>

                {/* Lịch học (có thể thêm sau) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-cen111  ter gap-2">
                    <Calendar className="w-4 h-4" />
                    Lịch học trong tuần:
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 min-h-[100px]">
                    <p className="text-sm">Thứ 2 - Thứ 6: 7:30 - 16:30</p>
                    <p className="text-sm text-gray-600 mt-2">Lịch học chi tiết sẽ được cập nhật...</p>
                  </div>
                </div>
              </div>
            </div>

          {/* Card 4: Ghi chú thêm */}
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
                Ghi chú thêm:
              </h2>
              <div className="space-y-6">
                {/* Thói quen ăn uống */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Thói quen ăn uống:
                  </label>
                <div className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 min-h-[120px] whitespace-pre-wrap">
                  {studentData.eatingHabits || "Chưa có ghi chú chi tiết về thói quen ăn uống"}
                </div>
                </div>

                {/* Giấc ngủ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Giấc ngủ:
                  </label>
                <div className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 min-h-[120px] whitespace-pre-wrap">
                  {studentData.sleepHabits || "Chưa có ghi chú chi tiết về giấc ngủ"}
                </div>
                </div>

                {/* Tính cách của trẻ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Smile className="w-4 h-4" />
                    Tính cách của trẻ:
                  </label>
                <div className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 min-h-[120px] whitespace-pre-wrap">
                  {studentData.personality || "Chưa có ghi chú chi tiết về tính cách"}
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
