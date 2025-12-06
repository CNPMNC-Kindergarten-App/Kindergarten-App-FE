import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { User, Loader2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function StudentList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true);
      try {
        // TODO: Gọi API để lấy danh sách lớp và học sinh
        // const response = await fetch("http://localhost:8080/teacher/classes", {
        //   headers: {
        //     "Authorization": `Bearer ${token}`,
        //   },
        // });
        // const data = await response.json();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - Danh sách lớp và học sinh
        // isAbsent: true = không đi học hôm nay, false = có đi học
        const mockClasses = [
          {
            id: 1,
            name: "Lá 2",
            code: "LA2",
            students: [
              { id: 1, name: "Lê Đình Thuận", avatar: null, isAbsent: false },
              { id: 2, name: "Nguyễn Văn A", avatar: null, isAbsent: false },
              { id: 3, name: "Trần Thị B", avatar: null, isAbsent: false },
              { id: 4, name: "Phạm Văn C", avatar: null, isAbsent: true }, // Không đi học
              { id: 5, name: "Lê Thị D", avatar: null, isAbsent: false },
              { id: 6, name: "Hoàng Văn E", avatar: null, isAbsent: false },
              { id: 7, name: "Vũ Thị F", avatar: null, isAbsent: false },
              { id: 8, name: "Đỗ Văn G", avatar: null, isAbsent: false },
            ]
          },
          {
            id: 2,
            name: "Lá 3",
            code: "LA3",
            students: [
              { id: 9, name: "Lê Đình Thuận", avatar: null, isAbsent: false },
              { id: 10, name: "Nguyễn Văn H", avatar: null, isAbsent: false },
              { id: 11, name: "Trần Thị I", avatar: null, isAbsent: false },
              { id: 12, name: "Phạm Văn K", avatar: null, isAbsent: true }, // Không đi học
              { id: 13, name: "Lê Thị L", avatar: null, isAbsent: false },
              { id: 14, name: "Hoàng Văn M", avatar: null, isAbsent: true }, // Không đi học
              { id: 15, name: "Vũ Thị N", avatar: null, isAbsent: true }, // Không đi học
              { id: 16, name: "Đỗ Văn O", avatar: null, isAbsent: false },
            ]
          }
        ];
        
        setClasses(mockClasses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading classes:", error);
        setIsLoading(false);
        toast.error("Không thể tải danh sách lớp. Vui lòng thử lại.");
      }
    };

    loadClasses();
  }, []);

  const handleStudentClick = (studentId) => {
    // Điều hướng đến trang chi tiết học sinh
    navigate(`/studentinfadmin?id=${studentId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
            <p className="text-gray-600">Đang tải danh sách lớp...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <button
            onClick={() => navigate("/registerstudent")}
            className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-md"
          >
            <UserPlus className="w-5 h-5" />
            Thêm học sinh mới
          </button>
        </div>

        {/* Classes List */}
        <div className="space-y-16">
          {classes.map((classItem, classIndex) => (
            <div key={classItem.id} className={`space-y-5 ${classIndex > 0 ? 'mt-8' : ''}`}>
              {/* Class Label */}
              <div className="flex items-center">
                <div  
                  className="px-6 py-3 black rounded-3xl  text-lg shadow-md "
                  style={{ backgroundColor: '#FEA439',
                    fontWeight: 'bold',
                    textColor: 'black',
                   }}
                >
                  Lớp: {classItem.name}
                </div>
              </div>

              {/* Students Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {classItem.students.map((student) => {
                  // Viền đỏ cho học sinh không đi học hôm nay
                  const isAbsent = student.isAbsent || false;
                  
                  return (
                    <div
                      key={student.id}
                      onClick={() => handleStudentClick(student.id)}
                      className={`relative rounded-xl p-3 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        isAbsent
                          ? "border-2 border-red-500 bg-red-50"
                          : "border-2 border-blue-200 bg-blue-50"
                      }`}
                      style={{
                        backgroundColor: isAbsent ? '#FEE2E2' : '#E0F2FE'
                      }}
                    >
                      {/* Student Card */}
                      <div className="bg-white rounded-lg p-5 flex flex-col items-center min-h-[140px] justify-center">
                        {/* Avatar */}
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-sm"
                          style={{ backgroundColor: '#FED7AA' }}
                        >
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10" style={{ color: '#EA580C' }} />
                          )}
                        </div>
                        
                        {/* Student Name */}
                        <p className="text-sm font-semibold text-gray-900 text-center leading-tight">
                          {student.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-blue-200 text-center shadow-sm">
            <p className="text-gray-600 text-lg">Chưa có lớp học nào</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
