import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { User, Phone, Mail, Heart, Pill, MapPin, Loader2, ArrowLeft, Smile, Star, Activity } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function StudentInformation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (!studentId) {
      toast.error("Không tìm thấy ID học sinh");
      navigate("/studentlist");
      return;
    }

    const loadStudentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://bk-kindergarten.fly.dev/api/children/${studentId}`, {
           method: 'GET',
           headers: {
             "Content-Type": "application/json",
             // "Authorization": `Bearer ${localStorage.getItem('token')}`, 
           },
        });

        if (!response.ok) {
            throw new Error("Lỗi khi tải dữ liệu");
        }

        const data = await response.json();
        const formattedDob = data.dob ? data.dob.split('-').reverse().join('/') : "Chưa cập nhật";

        const mappedData = {
          id: data.id || studentId,
          fullName: data.name,
          dateOfBirth: formattedDob, 
          gender: data.sex,
          healthStatus: data.health_status,
          habit: data.habit,
          character: data.character,

          parentName: data.parent_name || "Nguyễn Văn Nam", 
          parentPhone: data.parent_phone || "0909090909",
          parentEmail: data.parent_email || "nguyenvannam@gmail.com",
          parentAddress: data.parent_address || "123 Nguyen Van Linh, Q9, TP.HCM",
          
          medicalHistory: data.medical_history,
          allergies: data.allergy,
          specialNotes: data.medical_issue, 
        };
        
        setStudentData(mappedData);
      } catch (error) {
        console.error("Error loading student information:", error);
        toast.error("Không thể tải thông tin học sinh.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [studentId, navigate]);

  // Tính tuổi từ ngày sinh
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const parts = dateOfBirth.split("/");
    if(parts.length !== 3) return 0;
    
    const birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const today = new Date();
    
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
            <p className="text-gray-600">Đang tải hồ sơ...</p>
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
        {/* Left Sidebar */}
        <div className="w-1/5 min-w-[200px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 border border-blue-200 sticky top-24 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mb-1">Hồ sơ học sinh</p>
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                {studentData.fullName}
              </h3>
              <p className="text-gray-600 mb-3 font-medium">{calculateAge(studentData.dateOfBirth)} tuổi</p>
              
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                {studentData.healthStatus}
              </div>

              <div className="w-full border-t border-gray-100 mt-2"></div>
              
              <div className="mt-4 w-full text-center">
                <p className="text-xs text-gray-400">
                  ID: {studentData.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full md:w-4/5 min-w-0 space-y-6">
          <button
            onClick={() => navigate("/studentlist")}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại danh sách</span>
          </button>

          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
               <Activity className="w-5 h-5 text-teal-600" />
            </div>
            <div>
               <h4 className="font-bold text-gray-800">Thông tin chi tiết</h4>
               <p className="text-sm text-gray-600">Dữ liệu được lấy trực tiếp từ hệ thống.</p>
            </div>
          </div>

            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <User className="w-6 h-6" />
                Thông tin cơ bản
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div>
                     <label className="text-sm text-gray-500 block mb-1">Họ và tên</label>
                     <div className="font-medium text-gray-900 text-lg">{studentData.fullName}</div>
                   </div>
                   <div>
                     <label className="text-sm text-gray-500 block mb-1">Ngày sinh</label>
                     <div className="font-medium text-gray-900">{studentData.dateOfBirth}</div>
                   </div>
                   <div>
                     <label className="text-sm text-gray-500 block mb-1">Tình trạng sức khỏe</label>
                     <div className="font-medium text-green-600">{studentData.healthStatus}</div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div>
                     <label className="text-sm text-gray-500 block mb-1">Giới tính</label>
                     <div className="font-medium text-gray-900">{studentData.gender}</div>
                   </div>
                   <div>
                     <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Sở thích
                     </label>
                     <div className="font-medium text-gray-900">{studentData.habit || "Chưa cập nhật"}</div>
                   </div>
                   <div>
                     <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Smile className="w-3 h-3" /> Tính cách
                     </label>
                     <div className="font-medium text-gray-900">{studentData.character || "Chưa cập nhật"}</div>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <User className="w-6 h-6" />
                Thông tin phụ huynh
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                     <label className="text-sm text-gray-500 block mb-1">Họ tên phụ huynh</label>
                     <div className="font-medium text-gray-900 text-lg">{studentData.parentName}</div>
                 </div>
                 <div>
                     <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Số điện thoại
                     </label>
                     <div className="font-medium text-gray-900">{studentData.parentPhone}</div>
                 </div>
                 <div>
                     <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                     </label>
                     <div className="font-medium text-gray-900">{studentData.parentEmail}</div>
                 </div>
                 <div className="md:col-span-2">
                     <label className="text-sm text-gray-500 block mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Địa chỉ liên hệ
                     </label>
                     <div className="font-medium text-gray-900">{studentData.parentAddress}</div>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#19C1B6' }}>
                <Heart className="w-6 h-6" />
                Thông tin y tế
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiền sử bệnh</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                    {studentData.medicalHistory !== "None" ? studentData.medicalHistory : "Không"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                     <Pill className="w-4 h-4 text-red-400" /> Dị ứng
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                    {studentData.allergies !== "None" ? studentData.allergies : "Không"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vấn đề y tế hiện tại</label>
                  <div className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-800">
                    {studentData.specialNotes !== "None" ? studentData.specialNotes : "Không"}
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