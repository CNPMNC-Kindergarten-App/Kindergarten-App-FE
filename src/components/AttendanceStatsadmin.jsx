import { Users, Check, FileCheck, X, Clock } from "lucide-react";

export function AttendanceStats({ stats }) {
  const attendanceRate =
    stats.total > 0
      ? ((stats.present / stats.total) * 100).toFixed(1)
      : "0.0";

  const statItems = [
    {
      label: "Tổng số học sinh",
      value: stats.total,
      icon: Users,
      color: "bg-gray-100",
      textColor: "text-gray-700",
      iconColor: "text-gray-600",
    },
    {
      label: "Có mặt",
      value: stats.present,
      icon: Check,
      color: "bg-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
    },
    {
      label: "Đi trễ",
      value: stats.late,
      icon: Clock,
      color: "bg-orange-100",
      textColor: "text-orange-700",
      iconColor: "text-orange-600",
    },
    {
      label: "Vắng có phép",
      value: stats.absentWithPermission,
      icon: FileCheck,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      label: "Vắng không phép",
      value: stats.absentWithoutPermission,
      icon: X,
      color: "bg-red-100",
      textColor: "text-red-700",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Thống kê điểm danh</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Tỷ lệ có mặt</p>
          <p className="text-green-600">{attendanceRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`${item.color} rounded-lg p-4 transition-transform hover:scale-105`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
                <p className={`text-sm ${item.textColor}`}>{item.label}</p>
              </div>
              <p className={item.textColor}>{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Tiến độ điểm danh</span>
          <span className="text-gray-900">
            {stats.total > 0 ? stats.total : 0}/{stats.total} học sinh
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.total > 0 ? 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
