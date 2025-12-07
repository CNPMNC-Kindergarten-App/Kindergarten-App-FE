import { ClipboardCheck } from "lucide-react";
import { AttendanceForm } from "../components/AttendanceForm";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
         <Header/>  
        {/* Header */}
      <div className="max-w-7xl mx-auto p-6">
       
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-blue-600">Điểm danh học sinh</h1>
              <p className="text-gray-600">
                Quản lý chuyên cần và theo dõi tình hình đi học của học sinh
              </p>
            </div>
          </div>
        </div>

        {/* Attendance Form */}
        <AttendanceForm />
      </div>
      <Footer/>
    </div>
  );
}
