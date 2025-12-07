// src/pages/AbsenceFormPage.jsx
import React, { useEffect, useState } from "react";
import { Calendar, FileUp } from "lucide-react";
import { toast } from "sonner";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  initAbsenceStore,
  createAbsenceRequest,
  getAbsencesByChildId,
} from "../mocks/absenceMock";

// Mock 1 học sinh; sau này có BE sẽ lấy thật
const MOCK_CHILD = {
  id: 101,
  name: "Nguyễn Văn An",
  className: "Lớp Mầm 3-4 tuổi",
};

export default function AbsenceFormPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reasonType, setReasonType] = useState("illness");
  const [reasonDetail, setReasonDetail] = useState("");
  const [note, setNote] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    initAbsenceStore();
    loadHistory();
  }, []);

  const loadHistory = () => {
    const items = getAbsencesByChildId(MOCK_CHILD.id);
    setHistory(items);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setAttachment(file || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }

    createAbsenceRequest({
      childId: MOCK_CHILD.id,
      childName: MOCK_CHILD.name,
      className: MOCK_CHILD.className,
      startDate,
      endDate,
      reasonType,
      reasonDetail,
      note,
      attachmentName: attachment ? attachment.name : null,
    });

    toast.success("Đã gửi đơn xin nghỉ học.");

    setStartDate("");
    setEndDate("");
    setReasonDetail("");
    setNote("");
    setAttachment(null);
    loadHistory();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-indigo-900 mb-2">
              Nộp đơn xin nghỉ học
            </h1>
            <p className="text-gray-600">
              Phụ huynh có thể gửi yêu cầu nghỉ học cho con trước khi điểm danh.
            </p>
          </div>

          {/* Form block */}
          <section className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8">
            {/* Student info */}
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-indigo-50">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Học sinh</p>
                <p className="font-semibold text-indigo-900">
                  {MOCK_CHILD.name}
                </p>
                <p className="text-sm text-gray-600">{MOCK_CHILD.className}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Ví dụ: Bé bị sốt, bác sĩ yêu cầu nghỉ 3 ngày..."
                  className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
              </div>

              {/* Note */}
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

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File đính kèm (giấy bác sĩ, nếu có)
                </label>
                <label className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <FileUp className="w-4 h-4 text-indigo-600" />
                  <span className="text-gray-600">
                    {attachment ? attachment.name : "Chọn tệp"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Gửi đơn xin nghỉ
                </button>
              </div>
            </form>
          </section>

          {/* History */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4">
              Lịch sử đơn nghỉ của học sinh
            </h2>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">
                Chưa có đơn nghỉ nào được gửi.
              </p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.startDate} → {item.endDate}
                      </p>
                      <p className="text-xs text-gray-500">
                        Lý do: {item.reasonType} – {item.reasonDetail}
                      </p>
                      {item.note && (
                        <p className="text-xs text-gray-500">
                          Ghi chú: {item.note}
                        </p>
                      )}
                    </div>
                    <div className="text-xs font-semibold">
                      {item.status === "PENDING" && (
                        <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                          Đang chờ giáo viên xác nhận
                        </span>
                      )}
                      {item.status === "APPROVED" && (
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                          Đã duyệt
                        </span>
                      )}
                      {item.status === "REJECTED" && (
                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                          Bị từ chối
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
