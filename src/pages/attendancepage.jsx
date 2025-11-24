// src/pages/AttendancePage.jsx
import { useState } from "react";
import { Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { AttendanceStats } from "../components/AttendanceStats";
import { DayView } from "../components/DayView";
import { WeekView } from "../components/WeekView";
import { MonthView } from "../components/MonthView";
import { AbsenceRequestModal } from "../components/AbsenceRequestModal";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

// Mock data
const mockAttendanceData = [
  { id: "1", date: "2025-11-24", status: "present" },
  { id: "2", date: "2025-11-23", status: "present" },
  { id: "3", date: "2025-11-22", status: "late", note: "Đến trễ 15 phút" },
  { id: "4", date: "2025-11-21", status: "present" },
  { id: "5", date: "2025-11-20", status: "present" },
  { id: "6", date: "2025-11-19", status: "absent-unexcused" },
  { id: "7", date: "2025-11-18", status: "present" },
  { id: "8", date: "2025-11-17", status: "present" },
  { id: "9", date: "2025-11-16", status: "present" },
  { id: "10", date: "2025-11-15", status: "absent-excused", note: "Ốm" },
  { id: "11", date: "2025-11-14", status: "present" },
  { id: "12", date: "2025-11-13", status: "present" },
  { id: "13", date: "2025-11-12", status: "present" },
  { id: "14", date: "2025-11-11", status: "late", note: "Đến trễ 10 phút" },
  { id: "15", date: "2025-11-10", status: "present" },
  { id: "16", date: "2025-11-09", status: "present" },
  { id: "17", date: "2025-11-08", status: "present" },
  { id: "18", date: "2025-11-07", status: "present" },
  { id: "19", date: "2025-11-06", status: "absent-excused", note: "Đi khám bệnh" },
  { id: "20", date: "2025-11-05", status: "present" },
  { id: "21", date: "2025-11-04", status: "present" },
  { id: "22", date: "2025-11-03", status: "present" },
  { id: "23", date: "2025-11-02", status: "present" },
  { id: "24", date: "2025-11-01", status: "present" },
  { id: "25", date: "2025-10-31", status: "late" },
  { id: "26", date: "2025-10-30", status: "present" },
  { id: "27", date: "2025-10-29", status: "present" },
  { id: "28", date: "2025-10-28", status: "absent-unexcused" },
];

export default function AttendancePage() {
  const [viewMode, setViewMode] = useState("day");
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestAbsence = (recordId) => {
    const record = attendanceData.find((r) => r.id === recordId);
    if (record) {
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };

  const handleSubmitRequest = (reason) => {
    if (selectedRecord) {
      setAttendanceData((prev) =>
        prev.map((record) =>
          record.id === selectedRecord.id
            ? { ...record, status: "absent-excused", note: reason }
            : record
        )
      );
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
                  <span className="text-gray-500">Họ và tên:</span> Nguyễn Văn An
                </p>
                <p>
                  <span className="text-gray-500">Lớp:</span> 10A1
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
            <button
              onClick={() => setViewMode("day")}
              className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                viewMode === "day"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Theo Ngày
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                viewMode === "week"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Theo Tuần
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                viewMode === "month"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Theo Tháng
            </button>
          </div>
        </div>

        {/* Unexcused Absence Alert */}
        {attendanceData.some((r) => r.status === "absent-unexcused") && (
          <div className="bg-white border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-900 mb-1">
                Có ngày vắng chưa xin phép
              </p>
              <p className="text-red-700 text-sm">
                Vui lòng gửi đơn xin phép cho giáo viên để cập nhật lý do nghỉ học.
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

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Dữ liệu được cập nhật theo thời gian thực từ hệ thống trường học
        </div>
      </div>

      {/* Absence Request Modal */}
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
