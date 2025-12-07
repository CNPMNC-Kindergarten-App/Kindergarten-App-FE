// src/components/AbsenceRequestModal.jsx
import React, { useEffect, useState } from "react";
import { X, Calendar, AlertTriangle } from "lucide-react";

export function AbsenceRequestModal({ record, onClose, onSubmit }) {
  const [startDate, setStartDate] = useState(record?.date || "");
  const [endDate, setEndDate] = useState(record?.date || "");
  const [reasonType, setReasonType] = useState("illness");
  const [reasonDetail, setReasonDetail] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (record?.date) {
      setStartDate(record.date);
      setEndDate(record.date);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) return;

    onSubmit({
      startDate,
      endDate,
      reasonType,
      reasonDetail,
      note,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-indigo-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-700" />
            <h2 className="font-semibold text-indigo-900">Báo nghỉ học</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-indigo-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Info line */}
          {record && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-indigo-50 text-sm text-indigo-800">
              <AlertTriangle className="w-4 h-4 mt-0.5" />
              <div>
                <p>
                  Ngày điểm danh được chọn: <strong>{record.date}</strong>
                </p>
                <p className="text-xs text-indigo-700">
                  Có thể chọn khoảng ngày nghỉ dài hơn nếu cần.
                </p>
              </div>
            </div>
          )}

          {/* Date range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày bắt đầu nghỉ
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày kết thúc nghỉ
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Reason type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lý do nghỉ
            </label>
            <select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            >
              <option value="illness">Ốm / Sức khỏe</option>
              <option value="family">Việc gia đình</option>
              <option value="travel">Du lịch</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              rows={3}
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
              placeholder="Ví dụ: Bé bị sốt, bác sĩ yêu cầu nghỉ 2 ngày..."
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Extra note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú bổ sung (tuỳ chọn)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Thông tin thêm cho giáo viên (nếu có)"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Gửi đơn xin phép
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
