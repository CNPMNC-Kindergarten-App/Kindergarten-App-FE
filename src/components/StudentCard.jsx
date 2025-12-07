import { Check, X, Clock, FileCheck } from "lucide-react";

export function StudentCard({ student, onStatusChange }) {
  const statusConfig = {
    present: {
      label: "Có mặt",
      icon: Check,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      borderColor: "border-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
    },
    absent_with_permission: {
      label: "Vắng có phép",
      icon: FileCheck,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      borderColor: "border-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    absent_without_permission: {
      label: "Vắng không phép",
      icon: X,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      borderColor: "border-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
    },
    late: {
      label: "Đi trễ",
      icon: Clock,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      borderColor: "border-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
    },
  };

  const currentStatus = student.status || "present";
  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;

  return (
    <div
      className={`border-2 ${config.borderColor} rounded-lg overflow-hidden transition-all hover:shadow-md`}
    >
      {/* Student Info */}
      <div className={`${config.bgColor} p-4`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={
                student.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.name
                )}&background=random`
              }
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.name
                )}&background=random`;
              }}
            />
            <div
              className={`absolute -bottom-1 -right-1 ${config.color} rounded-full p-1`}
            >
              <StatusIcon className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 truncate">{student.name}</p>
            <p className="text-sm text-gray-600">{student.studentCode}</p>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2 py-1 ${config.bgColor} ${config.textColor} rounded text-sm`}
        >
          <StatusIcon className="w-4 h-4" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="grid grid-cols-2 gap-1 p-2 bg-gray-50">
        <button
          onClick={() => onStatusChange(student.id, "present")}
          className={`p-2 rounded text-sm transition-colors ${
            student.status === "present"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 hover:bg-green-50"
          }`}
          title="Có mặt"
        >
          <Check className="w-4 h-4 mx-auto" />
        </button>

        <button
          onClick={() => onStatusChange(student.id, "late")}
          className={`p-2 rounded text-sm transition-colors ${
            student.status === "late"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 hover:bg-orange-50"
          }`}
          title="Đi trễ"
        >
          <Clock className="w-4 h-4 mx-auto" />
        </button>

        <button
          onClick={() => onStatusChange(student.id, "absent_with_permission")}
          className={`p-2 rounded text-sm transition-colors ${
            student.status === "absent_with_permission"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-blue-50"
          }`}
          title="Vắng có phép"
        >
          <FileCheck className="w-4 h-4 mx-auto" />
        </button>

        <button
          onClick={() =>
            onStatusChange(student.id, "absent_without_permission")
          }
          className={`p-2 rounded text-sm transition-colors ${
            student.status === "absent_without_permission"
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-red-50"
          }`}
          title="Vắng không phép"
        >
          <X className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
}
