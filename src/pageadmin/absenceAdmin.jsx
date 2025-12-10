import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { 
  User, 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Check 
} from "lucide-react";

// ✅ CẤU HÌNH BASE URL
const API_BASE_URL = "https://bk-kindergarten.fly.dev/api";

export default function TeacherAbsenceManager() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("PENDING");

  // ✅ GET ALL REQUESTS TỪ API
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/absence/getAll`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper Functions ---
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

  // ✅ HANDLE APPROVE
  const handleApprove = async (request) => {
    const idToAccept = request.child_id || request.absenceId; 

    if (!idToAccept) {
      alert("Không tìm thấy ID để duyệt!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/absence/accept/${idToAccept}`, {
        method: "PUT",
      });

      if (!res.ok) throw new Error("Duyệt thất bại");

      setRequests((prev) =>
        prev.map((req) =>
          req.absenceId === request.absenceId ? { ...req, status: "ACCEPTED" } : req
        )
      );
      alert("Đã duyệt đơn thành công!");
    } catch (error) {
      console.error("Lỗi duyệt đơn:", error);
      alert("Có lỗi xảy ra khi duyệt đơn.");
    }
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
    return (
      <div className="flex items-center gap-1 text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>Đang chờ</span>
      </div>
    );
  };

  // ✅ FILTER LOGIC
  const filteredRequests = requests.filter((req) => {
    const status = req.status; 
    if (filterStatus === "PENDING") {
        return status !== "ACCEPTED"; 
    }
    return status === "ACCEPTED";
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
                {requests.filter(r => r.status !== "ACCEPTED").length > 0 && (
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full ml-2">
                    {requests.filter(r => r.status !== "ACCEPTED").length}
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
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Đang tải dữ liệu...</div>
            ) : filteredRequests.length === 0 ? (
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
                const displayName = req.childName || "Học sinh";
                
                return (
                  <div 
                    key={req.absenceId} 
                    // ⚠️ ĐÃ XÓA hover:shadow-md ở đây
                    className="border border-gray-200 rounded-lg bg-white overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 p-2 rounded-full">
                            <User className="w-6 h-6 text-[#19C1B6]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{displayName}</h3>
                            <p className="text-sm text-gray-500 font-medium">ID Đơn: {req.absenceId}</p>
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
                      </div>
                    </div>

                    {/* Actions Area */}
                    {req.status !== "ACCEPTED" && (
                      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end gap-3">
                        <button
                          onClick={() => handleApprove(req)}  
                          // ✨ NÚT DUYỆT ĐƠN ĐÃ ĐƯỢC NÂNG CẤP HI8  U ỨNG
                          className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-[#19C1B6] text-white font-bold hover:bg-[#139c94] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                          style={{ fontWeight: 900 , backgroundColor: '#19C1B6' }}
                        >
                          <Check className="w-5 h-5" /> Duyệt đơn
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