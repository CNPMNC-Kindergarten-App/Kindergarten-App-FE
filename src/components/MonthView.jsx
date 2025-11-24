import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function MonthView({ data }) {
  const groupByMonth = () => {
    const months = new Map();

    data.forEach((record) => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;

      if (!months.has(monthKey)) {
        months.set(monthKey, []);
      }
      months.get(monthKey).push(record);
    });

    const monthData = [];
    months.forEach((records, monthKey) => {
      const [year, month] = monthKey.split('-');
      const monthName = `Tháng ${parseInt(month, 10)}/${year}`;

      const present = records.filter((r) => r.status === 'present').length;
      const late = records.filter((r) => r.status === 'late').length;
      const absentExcused = records.filter(
        (r) => r.status === 'absent-excused'
      ).length;
      const absentUnexcused = records.filter(
        (r) => r.status === 'absent-unexcused'
      ).length;
      const total = records.length;

      monthData.push({
        month: monthName,
        present,
        late,
        absentExcused,
        absentUnexcused,
        total,
        attendanceRate: ((present + late) / total) * 100,
      });
    });

    return monthData.sort((a, b) => {
      const [monthA, yearA] = a.month.replace('Tháng ', '').split('/');
      const [monthB, yearB] = b.month.replace('Tháng ', '').split('/');
      return (
        parseInt(yearB, 10) * 12 +
        parseInt(monthB, 10) -
        (parseInt(yearA, 10) * 12 + parseInt(monthA, 10))
      );
    });
  };

  const monthData = groupByMonth();
  const currentMonth = monthData[0];

  const pieData = currentMonth
    ? [
        { name: 'Có mặt', value: currentMonth.present, color: '#22c55e' },
        { name: 'Đi trễ', value: currentMonth.late, color: '#f97316' },
        { name: 'Vắng có phép', value: currentMonth.absentExcused, color: '#3b82f6' },
        { name: 'Vắng không phép', value: currentMonth.absentUnexcused, color: '#ef4444' },
      ]
    : [];

  const barData = monthData.map((month) => ({
    name: month.month.replace('Tháng ', 'T'),
    'Có mặt': month.present,
    'Đi trễ': month.late,
    'Vắng có phép': month.absentExcused,
    'Vắng không phép': month.absentUnexcused,
  }));

  return (
    <div className="p-6">
      <h3 className="text-indigo-900 mb-6">Biểu đồ chuyên cần theo tháng</h3>

      {currentMonth && (
        <div className="mb-8">
          <h4 className="text-gray-900 mb-4">{currentMonth.month}</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-gray-700 mb-3 text-center">Phân bổ trạng thái</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-700">Có mặt</div>
                    <div className="text-2xl text-green-900">
                      {currentMonth.present} buổi
                    </div>
                  </div>
                  <div className="text-green-600">
                    {(
                      (currentMonth.present / currentMonth.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-orange-700">Đi trễ</div>
                    <div className="text-2xl text-orange-900">
                      {currentMonth.late} buổi
                    </div>
                  </div>
                  <div className="text-orange-600">
                    {(
                      (currentMonth.late / currentMonth.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-700">Vắng có phép</div>
                    <div className="text-2xl text-blue-900">
                      {currentMonth.absentExcused} buổi
                    </div>
                  </div>
                  <div className="text-blue-600">
                    {(
                      (currentMonth.absentExcused / currentMonth.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-red-700">Vắng không phép</div>
                    <div className="text-2xl text-red-900">
                      {currentMonth.absentUnexcused} buổi
                    </div>
                  </div>
                  <div className="text-red-600">
                    {(
                      (currentMonth.absentUnexcused / currentMonth.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-indigo-700">Tỷ lệ chuyên cần</div>
                    <div className="text-3xl text-indigo-900">
                      {currentMonth.attendanceRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-indigo-600">{currentMonth.total} buổi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart - Historical Comparison */}
      {monthData.length > 1 && (
        <div className="mt-8">
          <h4 className="text-gray-900 mb-4">So sánh các tháng</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Có mặt" fill="#22c55e" />
                <Bar dataKey="Đi trễ" fill="#f97316" />
                <Bar dataKey="Vắng có phép" fill="#3b82f6" />
                <Bar dataKey="Vắng không phép" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
