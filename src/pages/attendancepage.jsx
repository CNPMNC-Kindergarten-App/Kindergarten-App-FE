import { useState, useEffect } from "react";
import { Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { AttendanceStats } from "../components/AttendanceStats";
import { DayView } from "../components/DayView";
import { WeekView } from "../components/WeekView";
import { MonthView } from "../components/MonthView";
import { AbsenceRequestModal } from "../components/AbsenceRequestModal";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function AttendancePage() {
  // ✅ LẤY ID TRẺ TỪ LOCALSTORAGE
  const child = JSON.parse(localStorage.getItem("selectedStudent"));
  const childrenId = child?.id;

  const [viewMode, setViewMode] = useState("day");
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ GET ĐIỂM DANH THEO CHILD ID (MAP ĐÚNG THEO API BẠN GỬI)
  useEffect(() => {
    if (!childrenId) return;

      const fetchAttendance = async () => {
        try {
          const res = await fetch(
            `https://bk-kindergarten.fly.dev/api/attend/child/${childrenId}`
          );

          const rawData = await res.json();

                    const mappedData = Array.isArray(rawData)
            ? rawData.map((item) => {
                const statusRaw = item.status?.toLowerCase(); // ✅ Chuẩn hoá

                let statusMapped = "absent-unexcused";

                if (statusRaw === "present") statusMapped = "present";
                else if (statusRaw === "absent") statusMapped = "absent-unexcused";
                else if (statusRaw === "excused") statusMapped = "absent-excused";
                else if (statusRaw === "late") statusMapped = "late";

                return {
                  id: item.id,
                  classId: item.classId,
                  date: item.attendDate,
                  childId: item.child?.id,
                  status: statusMapped,
                  note: item.note || "",
                };
              })
            : [];

setAttendanceData(mappedData);


setAttendanceData(mappedData);

      } catch (error) {
        console.error("Lỗi tải điểm danh:", error);
        setAttendanceData([]);
      }
    };

    fetchAttendance();
  }, [childrenId]);

  // ✅ MỞ MODAL XIN PHÉP
  const handleRequestAbsence = (recordId) => {
    const record = attendanceData.find((r) => r.id === recordId);
    if (record) {
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };

  // ✅ POST ĐƠN XIN PHÉP (ĐÚNG FORMAT BẠN ĐƯA)
  const handleSubmitRequest = async (reason) => {
    if (!selectedRecord || !childrenId) return;

    const payload = {
      reason: reason,
      start_date: selectedRecord.date,
      end_date: selectedRecord.date,
      child_id: childrenId,
    };

    try {
      const res = await fetch(
        "https://bk-kindergarten.fly.dev/api/absence/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Gửi đơn thất bại");

      // ✅ CẬP NHẬT UI NGAY
      setAttendanceData((prev) =>
        prev.map((record) =>
          record.id === selectedRecord.id
            ? {
                ...record,
                status: "absent-excused",
                note: reason,
              }
            : record
        )
      );
    } catch (error) {
      console.error("Lỗi gửi đơn:", error);
    }

    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-indigo-900">Điểm Danh Học Sinh</h1>
          </div>
          <p className="text-gray-600">
            Theo dõi tình hình chuyên cần của con em
          </p>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-indigo-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-indigo-900 mb-2">Thông tin học sinh</h2>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="text-gray-500">Họ và tên:</span>{" "}
                  {child?.name || "—"}
                </p>
                <p>
                  <span className="text-gray-500">Lớp:</span>{" "}
                  {child?.className || "—"}
                </p>
                <p>
                  <span className="text-gray-500">Học kỳ:</span> Học kỳ I - Năm
                  học 2025-2026
                </p>
              </div>
            </div>
            <div className="bg-indigo-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-indigo-700">
                <TrendingUp className="w-5 h-5" />
                <span>Chuyên cần tốt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Stats */}
        <AttendanceStats data={attendanceData} />

        {/* View Mode Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-indigo-100">
          <div className="flex gap-2">
            {["day", "week", "month"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  viewMode === mode
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {mode === "day"
                  ? "Theo Ngày"
                  : mode === "week"
                  ? "Theo Tuần"
                  : "Theo Tháng"}
              </button>
            ))}
          </div>
        </div>

        {/* Unexcused Alert */}
        {attendanceData.some((r) => r.status === "absent-unexcused") && (
          <div className="bg-white border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-900 mb-1">
                Có ngày vắng chưa xin phép
              </p>
              <p className="text-red-700 text-sm">
                Vui lòng gửi đơn xin phép cho giáo viên để cập nhật lý do nghỉ
                học.
              </p>
            </div>
          </div>
        )}

        {/* View Content */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
          {viewMode === "day" && (
            <DayView
              data={attendanceData}
              onRequestAbsence={handleRequestAbsence}
            />
          )}
          {viewMode === "week" && <WeekView data={attendanceData} />}
          {viewMode === "month" && <MonthView data={attendanceData} />}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Dữ liệu được cập nhật theo thời gian thực từ hệ thống trường học
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRecord && (
        <AbsenceRequestModal
          record={selectedRecord}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRecord(null);
          }}
          onSubmit={handleSubmitRequest}
        />
      )}

      <Footer />
    </div>
  );
}
