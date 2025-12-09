import { useState, useEffect } from "react";
import { Calendar, Users, Save, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner"; // nhớ đã cài: npm install sonner
import { StudentCard } from "./StudentCard";
import { AttendanceStats } from "./AttendanceStatsadmin";

console.log("API URL:", import.meta.env.VITE_API_URL);


export function AttendanceForm() {
  const [classId, setClassId] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState("");

  // Mock student data - replace with API call
  
  // Load attendance data
  const loadAttendance = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/attend/class?classId=${classId}&date=${date}`
    );

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    // ✅ MAP ĐÚNG THEO JSON THẬT TỪ BACKEND
    const studentsWithAttendance = data.map((s) => ({
      id: s.child.id,
      name: s.child.name,
      studentCode: `HS${s.child.id.toString().padStart(3, "0")}`,
      avatar:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(s.child.name),
      status: s.status || "present",
    }));

    setStudents(studentsWithAttendance);
    setHasChanges(false);
    toast.success("Đã tải dữ liệu điểm danh");
  } catch (error) {
    console.error("Error loading attendance:", error);
    setStudents([]); // ✅ Không dùng mock nữa
    toast.error("Không thể kết nối đến server.");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    loadAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, date]);

  const handleStatusChange = (studentId, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
    setHasChanges(true);
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);

    try {
      // Send attendance for each student
      const promises = students.map((student) =>
        fetch(`${import.meta.env.VITE_API_URL}/api/attend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childId: student.id,
            classId: parseInt(classId, 10),
            date: date,
            status: student.status,
          }),
        })
      );

      const results = await Promise.allSettled(promises);

      const failedCount = results.filter((r) => r.status === "rejected")
        .length;

      if (failedCount === 0) {
        toast.success("Lưu điểm danh thành công!");
        setHasChanges(false);
        setLastSaved(new Date().toLocaleTimeString("vi-VN"));

        // Check for absent students and notify
        const absentWithoutPermission = students.filter(
          (s) => s.status === "absent_without_permission"
        );

        if (absentWithoutPermission.length > 0) {
          toast.info(
            `Đã gửi thông báo đến phụ huynh của ${absentWithoutPermission.length} học sinh vắng không phép`,
            { duration: 4000 }
          );
        }
      } else {
        toast.error(
          `Có lỗi khi lưu điểm danh cho ${failedCount} học sinh`
        );
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Không thể lưu điểm danh. Vui lòng kiểm tra kết nối API.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, status: "present" }))
    );
    setHasChanges(true);
    toast.success("Đã đánh dấu tất cả học sinh có mặt");
  };

  // Calculate statistics
  const stats = {
    total: students.length,
    present: students.filter((s) => s.status === "present").length,
    absentWithPermission: students.filter(
      (s) => s.status === "absent_with_permission"
    ).length,
    absentWithoutPermission: students.filter(
      (s) => s.status === "absent_without_permission"
    ).length,
    late: students.filter((s) => s.status === "late").length,
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="classId" className="block text-gray-700 mb-2">
              Lớp học
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="classId"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">Lớp 10A1</option>
                <option value="2">Lớp 10A2</option>
                <option value="3">Lớp 10A3</option>
                <option value="4">Lớp 11A1</option>
                <option value="5">Lớp 12A1</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 mb-2">
              Ngày điểm danh
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleMarkAllPresent}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              Đánh dấu tất cả có mặt
            </button>
          </div>
        </div>

        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Lưu lần cuối: {lastSaved}</span>
          </div>
        )}
      </div>

      {/* Statistics */}
      <AttendanceStats stats={stats} />

      {/* Student List */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Đang tải danh sách học sinh...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Không có học sinh trong lớp này</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="mb-4">
            Danh sách học sinh ({students.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 sticky bottom-6">
          <div className="flex items-center justify-between">
            <div>
              {hasChanges && (
                <p className="text-sm text-orange-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Có thay đổi chưa được lưu
                </p>
              )}
            </div>
            <button
              onClick={handleSaveAttendance}
              disabled={isSaving || !hasChanges}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Lưu điểm danh
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
