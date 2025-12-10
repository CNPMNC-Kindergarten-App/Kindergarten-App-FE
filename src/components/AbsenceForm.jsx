import { useState } from "react";
import { Calendar, User, FileText, StickyNote } from "lucide-react";
import { Button } from "./button";

const ABSENCE_REASONS = [
  "Ốm đau, sốt",
  "Khám bác sĩ",
  "Việc gia đình",
  "Du lịch",
  "Khác",
];

export function AbsenceForm({ children, onSubmit }) {
  const child = children[0];

  const [formData, setFormData] = useState({
    child_id: child?.id || 0,
    reason: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.child_id) {
      newErrors.child_id = "Vui lòng chọn học sinh";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Vui lòng nhập lý do nghỉ";
    }

    if (!formData.start_date) {
      newErrors.start_date = "Vui lòng chọn ngày bắt đầu";
    }

    if (!formData.end_date) {
      newErrors.end_date = "Vui lòng chọn ngày kết thúc";
    }

    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);

      if (endDate < startDate) {
        newErrors.end_date = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);

    setFormData({
      child_id: child?.id || 0,
      reason: "",
      start_date: "",
      end_date: "",
      notes: "",
    });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculateDays = () => {
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays =
        Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const days = calculateDays();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-indigo-900 mb-6">Tạo đơn xin nghỉ học</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin học sinh */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-gray-600 text-sm">Học sinh</p>
              <p className="text-gray-900">{child?.name}</p>
              <p className="text-gray-600 text-sm">{child?.class}</p>
            </div>
          </div>
        </div>

        {/* Ngày nghỉ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Ngày bắt đầu nghỉ
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) =>
                handleChange("start_date", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.start_date
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.start_date}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Ngày kết thúc nghỉ
            </label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) =>
                handleChange("end_date", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.end_date
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.end_date}
              </p>
            )}
          </div>
        </div>

        {days > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
            Số ngày nghỉ: <span>{days} ngày</span>
          </div>
        )}

        {/* Lý do nghỉ */}
        <div>
          <label className="block text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Lý do nghỉ
          </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {ABSENCE_REASONS.map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() =>
                  handleChange("reason", reason)
                }
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  formData.reason === reason
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={formData.reason}
            onChange={(e) =>
              handleChange("reason", e.target.value)
            }
            placeholder="Hoặc nhập lý do khác..."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.reason
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">
              {errors.reason}
            </p>
          )}
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block text-gray-700 mb-2">
            <StickyNote className="w-4 h-4 inline mr-2" />
            Ghi chú bổ sung (không bắt buộc)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
            placeholder="Thông tin thêm về tình trạng của con..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
        >
          Gửi đơn xin nghỉ học
        </Button>
      </form>
    </div>
  );
}
