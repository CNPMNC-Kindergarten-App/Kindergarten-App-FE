import { useStudent } from '../contexts/StudentContext';
import { User, Calendar, Heart, Smile } from 'lucide-react';

export function StudentInfo() {
  const { selectedStudent } = useStudent();

  if (!selectedStudent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">
          Vui lòng chọn học sinh để xem thông tin
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className={`${
          selectedStudent.sex === 'Nam'
            ? 'from-blue-500 to-blue-600'
            : 'from-pink-500 to-pink-600'
        } bg-gradient-to-r p-6 text-white`}
      >
        <h2>{selectedStudent.name}</h2>
        <p>ID: {selectedStudent.id}</p>
      </div>

      <div className="p-6 space-y-4">
        <p>Giới tính: {selectedStudent.sex}</p>
        <p>Ngày sinh: {formatDate(selectedStudent.dob)}</p>
        <p>Tuổi: {calculateAge(selectedStudent.dob)}</p>
        <p>Tính cách: {selectedStudent.character}</p>
        <p>Sở thích: {selectedStudent.habit}</p>
      </div>
    </div>
  );
}
