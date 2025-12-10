import { useState } from "react";
import { AbsenceForm } from "../components/AbsenceForm";
import { AbsenceList } from "../components/AbsenceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FileText } from "lucide-react";

export default function Form() {
  const [children] = useState([
    { id: 6, name: "Nguyễn Minh An", class: "Lớp Mầm" },
  ]);

  const [absences, setAbsences] = useState([
    {
      absenceId: 1,
      reason: "Sốt cao",
      childName: "Nguyễn Minh An",
      status: "WAITING",
      start_date: "2025-12-10",
      end_date: "2025-12-11",
      notes: "Đã đi khám bác sĩ",
    },
    {
      absenceId: 2,
      reason: "Về quê",
      childName: "Nguyễn Minh An",
      status: "ACCEPTED",
      start_date: "2025-12-05",
      end_date: "2025-12-07",
    },
  ]);

  const [activeTab, setActiveTab] = useState("form");

  const handleAbsenceSubmit = (formData) => {
    const child = children.find((c) => c.id === formData.child_id);

    const newAbsence = {
      absenceId: Date.now(),
      reason: formData.reason,
      childName: child?.name || "",
      status: "WAITING",
      start_date: formData.start_date,
      end_date: formData.end_date,
      notes: formData.notes,
    };

    setAbsences((prev) => [newAbsence, ...prev]);
    setActiveTab("pending");
  };

  const pendingAbsences = absences.filter((a) => a.status === "WAITING");
  const approvedAbsences = absences.filter((a) => a.status === "ACCEPTED");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-indigo-900">Đơn xin nghỉ học</h1>
              <p className="text-gray-600">
                Quản lý đơn xin nghỉ phép cho con em
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="form">Tạo đơn mới</TabsTrigger>
            <TabsTrigger value="pending">
              Đã gửi
              {pendingAbsences.length > 0 && (
                <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingAbsences.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <AbsenceForm children={children} onSubmit={handleAbsenceSubmit} />
          </TabsContent>

          <TabsContent value="pending">
            <AbsenceList absences={pendingAbsences} status="pending" />
          </TabsContent>

          <TabsContent value="approved">
            <AbsenceList absences={approvedAbsences} status="approved" />
          </TabsContent>
        </Tabs>
      </div>
        <Footer />
    </div>

  );
}
