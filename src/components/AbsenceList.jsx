import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function AbsenceList({ status }) {
  const child = JSON.parse(localStorage.getItem("selectedStudent"));
  const childrenId = child?.id;

  const [absences, setAbsences] = useState([]);

  // ✅ GỌI API GET THEO CHILD_ID
  const fetchAbsences = async () => {
    try {
      const res = await fetch(
        `https://bk-kindergarten.fly.dev/api/absence/get?child_id=${childrenId}`
      );
      const data = await res.json();

      const list = Array.isArray(data) ? data : [data];

      // ✅ LỌC THEO STATUS
      const filtered =
        status === "pending"
          ? list.filter((a) => a.status === "WAITING")
          : list.filter((a) => a.status === "ACCEPTED");

      setAbsences(filtered);
    } catch (err) {
      console.error("GET absence error:", err);
    }
  };

  useEffect(() => {
    if (childrenId) fetchAbsences();
  }, [childrenId, status]);

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getStatusBadge = (absenceStatus) => {
    if (absenceStatus === "ACCEPTED") {
      return (
        <div className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span>Đã duyệt</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
        <Clock className="w-4 h-4" />
        <span>Đang chờ</span>
      </div>
    );
  };

  if (!absences || absences.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-600 mb-2">
          {status === "pending"
            ? "Chưa có đơn chờ duyệt"
            : "Chưa có đơn đã duyệt"}
        </h3>
        <p className="text-gray-500">
          {status === "pending"
            ? "Các đơn xin nghỉ học đang chờ giáo viên xác nhận sẽ hiển thị ở đây"
            : "Các đơn xin nghỉ học đã được duyệt sẽ hiển thị ở đây"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {absences.map((absence) => {
        const days = calculateDays(
          absence.start_date,
          absence.end_date
        );

        return (
          <div
            key={absence.absenceId}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-gray-900">
                    {absence.childName}
                  </h3>
                </div>
              </div>
              {getStatusBadge(absence.status)}
            </div>

            <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 mb-4">
              <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-gray-600 text-sm">
                  Lý do nghỉ
                </p>
                <p className="text-gray-900">
                  {absence.reason}
                </p>
              </div>
            </div>

            {absence.start_date && absence.end_date && (
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">
                    Thời gian nghỉ
                  </p>
                  <p className="text-gray-900">
                    {formatDate(absence.start_date)} -{" "}
                    {formatDate(absence.end_date)}
                  </p>
                  {days && (
                    <p className="text-indigo-600 text-sm mt-1">
                      {days} ngày
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
