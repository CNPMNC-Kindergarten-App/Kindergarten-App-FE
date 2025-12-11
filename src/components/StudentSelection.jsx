import { useState, useEffect } from "react";
import { useStudent } from "../contexts/StudentContext";
import { User, Calendar, Heart, Smile, ArrowRight } from "lucide-react";

export function StudentSelection({ parentId, onSelectStudent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedStudent } = useStudent();

  useEffect(() => {
    fetchStudents();
  }, [parentId]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://bk-kindergarten.fly.dev/api/children?parent_id=${parentId}`
      );

      if (!response.ok) {
        throw new Error("Không thể tải danh sách học sinh");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra");

      // ✅ MOCK DATA KHI BE LỖI
      setStudents([
        {
          id: 1,
          name: "Nguyễn Minh Anh",
          sex: "Nữ",
          dob: "2021-04-15",
          habit: "Ngủ sớm, thích vẽ",
          character: "Hiền, nhút nhát",
          parentId: parentId,
          createdAt: "2024-12-01T10:15:30",
        },
        {
          id: 2,
          name: "Nguyễn Hoàng Long",
          sex: "Nam",
          dob: "2020-09-20",
          habit: "Thích đá banh",
          character: "Năng động",
          parentId: parentId,
          createdAt: "2024-12-01T10:20:10",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    localStorage.setItem("selectedStudent", JSON.stringify(student)); // ✅ LƯU VÀO LOCAL
    onSelectStudent();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // ✅ LOADING UI (GIỮ NGUYÊN)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách học sinh...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-gray-900 mb-2">Chọn Học Sinh</h1>
          <p className="text-gray-600">
            Vui lòng chọn con em để xem thông tin và hoạt động
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-center">
              <span className="font-semibold">Lưu ý:</span> {error}. Đang hiển thị dữ liệu mẫu.
            </p>
          </div>
        )}

        {/* GRID */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => handleSelectStudent(student)}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* HEADER CARD */}
                <div
                  className={`${
                    student.sex === "Nam"
                      ? "bg-gradient-to-br from-blue-400 to-blue-600"
                      : "bg-gradient-to-br from-pink-400 to-pink-600"
                  } p-6 text-white relative`}
                >
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm">{student.sex}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <User
                        className={`w-12 h-12 ${
                          student.sex === "Nam"
                            ? "text-blue-600"
                            : "text-pink-600"
                        }`}
                      />
                    </div>
                    <h3 className="text-center">{student.name}</h3>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        student.sex === "Nam" ? "bg-blue-50" : "bg-pink-50"
                      }`}
                    >
                      <Calendar
                        className={`w-5 h-5 ${
                          student.sex === "Nam"
                            ? "text-blue-600"
                            : "text-pink-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày sinh</p>
                      <p className="text-gray-900">
                        {formatDate(student.dob)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ({calculateAge(student.dob)} tuổi)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        student.sex === "Nam" ? "bg-blue-50" : "bg-pink-50"
                      }`}
                    >
                      <Smile
                        className={`w-5 h-5 ${
                          student.sex === "Nam"
                            ? "text-blue-600"
                            : "text-pink-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tính cách</p>
                      <p className="text-gray-900">{student.character}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        student.sex === "Nam" ? "bg-blue-50" : "bg-pink-50"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          student.sex === "Nam"
                            ? "text-blue-600"
                            : "text-pink-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sở thích</p>
                      <p className="text-gray-900">{student.habit}</p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 pb-6">
                  <button
                    className={`w-full ${
                      student.sex === "Nam"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-pink-600 hover:bg-pink-700"
                    } text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:gap-4 transition-all`}
                  >
                    <span>Chọn học sinh này</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Không tìm thấy học sinh</h3>
            <p className="text-gray-600">
              Hiện tại không có học sinh nào trong danh sách.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
