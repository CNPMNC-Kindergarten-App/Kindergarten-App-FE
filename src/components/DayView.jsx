import { CheckCircle, XCircle, Clock, AlertTriangle, Send } from "lucide-react";

const statusConfig = {
  present: {
    label: "Có mặt",
    icon: CheckCircle,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  "absent-excused": {
    label: "Vắng có phép",
    icon: AlertTriangle,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  "absent-unexcused": {
    label: "Vắng không phép",
    icon: XCircle,
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  late: {
    label: "Đi trễ",
    icon: Clock,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
};

// ✅ CONFIG MẶC ĐỊNH KHI STATUS BỊ SAI
const defaultConfig = {
  label: "Không xác định",
  icon: AlertTriangle,
  bgColor: "bg-gray-50",
  textColor: "text-gray-700",
  borderColor: "border-gray-200",
};

export function DayView({ data = [], onRequestAbsence }) {
  // ✅ CHỐNG CRASH KHI DATA KHÔNG PHẢI MẢNG
  const safeData = Array.isArray(data) ? data : [];

  const sortedData = [...safeData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Không có ngày";

    const date = new Date(dateString);
    const dayNames = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  };

  return (
    <div className="p-6">
      <h3 className="text-indigo-900 mb-4">
        Chi tiết điểm danh từng ngày
      </h3>

      <div className="space-y-3">
        {sortedData.length === 0 && (
          <div className="text-gray-500 italic">
            Chưa có dữ liệu điểm danh
          </div>
        )}

        {sortedData.map((record) => {
          // ✅ LẤY CONFIG AN TOÀN
          const config = statusConfig[record?.status] || defaultConfig;
          const Icon = config.icon;

          return (
            <div
              key={record?.id ?? Math.random()}
              className={`border ${config.borderColor} rounded-lg p-4 ${config.bgColor} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${config.textColor}`} />
                    <span className={config.textColor}>
                      {config.label}
                    </span>
                  </div>

                  <div className="text-gray-700 mb-1">
                    {formatDate(record?.date)}
                  </div>

                  {record?.note && (
                    <div className="text-gray-600 text-sm mt-2 italic">
                      Ghi chú: {record.note}
                    </div>
                  )}
                </div>

                {record?.status === "absent-unexcused" && (
                  <button
                    onClick={() =>
                      onRequestAbsence && onRequestAbsence(record.id)
                    }
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm">Gửi xin phép</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
