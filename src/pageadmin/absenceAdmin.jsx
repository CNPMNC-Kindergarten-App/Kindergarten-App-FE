import React, { useState } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { 
  User, 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Check, 
  X 
} from "lucide-react";

// Dữ liệu giả lập
const MOCK_REQUESTS = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "Lớp 3A",
    reason: "Sốt cao, đau họng",
    start_date: "2024-05-20",
    end_date: "2024-05-22",
    status: "PENDING",
    notes: "Gia đình xin phép cho cháu nghỉ để đi khám bệnh.",
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    class: "Lớp 4B",
    reason: "Việc gia đình",
    start_date: "2024-05-25",
    end_date: "2024-05-25",
    status: "PENDING",
    notes: "",
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    class: "Lớp 5A",
    reason: "Du lịch cùng gia đình",
    start_date: "2024-05-10",
    end_date: "2024-05-12",
    status: "ACCEPTED",
    notes: "",
  },
];

export default function TeacherAbsenceManager() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [filterStatus, setFilterStatus] = useState("PENDING"); // 'PENDING' | 'HISTORY'

  // --- Helper Functions (Tái sử dụng logic cũ) ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApprove = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: "ACCEPTED" } : req));
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: "REJECTED" } : req));
  };

  // --- Render Helpers ---
  const getStatusBadge = (status) => {
    if (status === "ACCEPTED") {
      return (
        <div className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Đã duyệt</span>
        </div>
      );
    }
    if (status === "REJECTED") {
      return (
        <div className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
          <XCircle className="w-4 h-4" />
          <span>Đã từ chối</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>Đang chờ</span>
      </div>
    );
  };

  // Filter logic
  const filteredRequests = requests.filter(req => {
    if (filterStatus === "PENDING") return req.status === "PENDING";
    return req.status === "ACCEPTED" || req.status === "REJECTED";
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm min-h-[600px]">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl underline decoration-2 underline-offset-4" style={{ color: '#19C1B6', fontWeight: 900 }}>
              Quản lý nghỉ học
            </h2>

            {/* Filter Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
                onClick={() => setFilterStatus("PENDING")}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
                    filterStatus === "PENDING"
                    ? "bg-white text-[#19C1B6] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                >
                <Clock className="w-4 h-4" />
                Chờ duyệt
                {requests.filter(r => r.status === "PENDING").length > 0 && (
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full ml-2">
                    {requests.filter(r => r.status === "PENDING").length}
                    </span>
                )}
            </button>
              <button
                onClick={() => setFilterStatus("HISTORY")}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
                  filterStatus === "HISTORY"
                    ? "bg-white text-[#19C1B6] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Lịch sử
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {filterStatus === "PENDING" 
                    ? "Hiện tại không có đơn nào đang chờ duyệt." 
                    : "Chưa có lịch sử đơn nghỉ học."}
                </p>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const days = calculateDays(req.start_date, req.end_date);
                
                return (
                  <div 
                    key={req.id} 
                    className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 p-2 rounded-full">
                            <User className="w-6 h-6 text-[#19C1B6]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{req.studentName}</h3>
                            <p className="text-sm text-gray-500 font-medium">{req.class}</p>
                          </div>
                        </div>
                        {getStatusBadge(req.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                        {/* Reason */}
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Lý do
                          </p>
                          <p className="text-gray-900 font-medium">{req.reason}</p>
                        </div>

                        {/* Date */}
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Thời gian
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {formatDate(req.start_date)} - {formatDate(req.end_date)}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">
                              {days} ngày
                            </span>
                          </div>
                        </div>

                        {/* Notes */}
                        {req.notes && (
                          <div className="md:col-span-2 pt-2 mt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-600 italic">
                              <span className="font-semibold not-italic">Ghi chú:</span> {req.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Area - Chỉ hiện khi đang chờ duyệt */}
                    {req.status === "PENDING" && (
                      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end gap-3">
                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" /> Từ chối
                        </button>
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#19C1B6] text-white font-medium hover:bg-[#15A097] shadow-sm transition-colors"
                          style={{ backgroundColor: '#19C1B6', fontWeight: 900 }}
                        >
                          <Check className="w-4 h-4 "/> Duyệt đơn
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}