import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function WeekView({ data }) {
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const groupByWeek = () => {
    const weeks = new Map();

    data.forEach((record) => {
      const date = new Date(record.date);
      const weekNum = getWeekNumber(date);

      if (!weeks.has(weekNum)) {
        weeks.set(weekNum, []);
      }
      weeks.get(weekNum).push(record);
    });

    const weekData = [];
    weeks.forEach((records, weekNum) => {
      const dates = records
        .map((r) => new Date(r.date))
        .sort((a, b) => a.getTime() - b.getTime());
      const startDate = dates[0];
      const endDate = dates[dates.length - 1];

      weekData.push({
        weekNumber: weekNum,
        startDate: startDate.toLocaleDateString('vi-VN'),
        endDate: endDate.toLocaleDateString('vi-VN'),
        present: records.filter((r) => r.status === 'present').length,
        late: records.filter((r) => r.status === 'late').length,
        absentExcused: records.filter(
          (r) => r.status === 'absent-excused'
        ).length,
        absentUnexcused: records.filter(
          (r) => r.status === 'absent-unexcused'
        ).length,
        total: records.length,
      });
    });

    return weekData.sort((a, b) => b.weekNumber - a.weekNumber);
  };

  const weekData = groupByWeek();

  return (
    <div className="p-6">
      <h3 className="text-indigo-900 mb-4">Thống kê theo tuần</h3>
      <div className="space-y-4">
        {weekData.map((week) => {
          const attendanceRate = ((week.present + week.late) / week.total) * 100;

          return (
            <div
              key={week.weekNumber}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-gray-900 mb-1">Tuần {week.weekNumber}</h4>
                  <p className="text-gray-600 text-sm">
                    {week.startDate} - {week.endDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-indigo-600">
                    {attendanceRate.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-500">Chuyên cần</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Có mặt</span>
                  </div>
                  <div className="text-xl text-gray-900">{week.present}</div>
                </div>

                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-600">Đi trễ</span>
                  </div>
                  <div className="text-xl text-gray-900">{week.late}</div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Vắng có phép</span>
                  </div>
                  <div className="text-xl text-gray-900">
                    {week.absentExcused}
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Vắng không phép</span>
                  </div>
                  <div className="text-xl text-gray-900">
                    {week.absentUnexcused}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                    style={{ width: `${attendanceRate}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
