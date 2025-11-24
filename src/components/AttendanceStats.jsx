import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function AttendanceStats({ data }) {
  const stats = {
    present: data.filter((r) => r.status === 'present').length,
    absentExcused: data.filter((r) => r.status === 'absent-excused').length,
    absentUnexcused: data.filter((r) => r.status === 'absent-unexcused').length,
    late: data.filter((r) => r.status === 'late').length,
  };

  const total = data.length;
  const attendanceRate = ((stats.present + stats.late) / total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* Attendance Rate */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-md p-6 text-white">
        <div className="text-indigo-200 text-sm mb-2">Tỷ lệ chuyên cần</div>
        <div className="text-3xl mb-1">{attendanceRate.toFixed(1)}%</div>
        <div className="text-indigo-200 text-sm">Tổng {total} buổi học</div>
      </div>

      {/* Present */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-gray-600 text-sm">Có mặt</div>
        </div>
        <div className="text-2xl text-gray-900">{stats.present}</div>
        <div className="text-sm text-green-600 mt-1">
          {((stats.present / total) * 100).toFixed(1)}%
        </div>
      </div>

      {/* Late */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-gray-600 text-sm">Đi trễ</div>
        </div>
        <div className="text-2xl text-gray-900">{stats.late}</div>
        <div className="text-sm text-orange-600 mt-1">
          {((stats.late / total) * 100).toFixed(1)}%
        </div>
      </div>

      {/* Absent Excused */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-gray-600 text-sm">Vắng có phép</div>
        </div>
        <div className="text-2xl text-gray-900">{stats.absentExcused}</div>
        <div className="text-sm text-blue-600 mt-1">
          {((stats.absentExcused / total) * 100).toFixed(1)}%
        </div>
      </div>

      {/* Absent Unexcused */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-gray-600 text-sm">Vắng không phép</div>
        </div>
        <div className="text-2xl text-gray-900">{stats.absentUnexcused}</div>
        <div className="text-sm text-red-600 mt-1">
          {((stats.absentUnexcused / total) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
