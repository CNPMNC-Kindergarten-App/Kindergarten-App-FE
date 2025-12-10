import { useState, useEffect } from "react";
import { AbsenceForm } from "../components/AbsenceForm";
import { AbsenceList } from "../components/AbsenceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FileText } from "lucide-react";

export default function Form() {
  // ✅ LẤY CHILD TỪ LOCALSTORAGE
  const child = JSON.parse(localStorage.getItem("selectedStudent"));
  const childrenId = child?.id;

  const [absences, setAbsences] = useState([]);
  const [activeTab, setActiveTab] = useState("form");

  // ✅ GỌI API GET
  const fetchAbsences = async () => {
    try {
      const res = await fetch(
        `https://bk-kindergarten.fly.dev/api/get?child_id=${childrenId}`
      );
      const data = await res.json();

      const list = Array.isArray(data) ? data : [data];
      setAbsences(list);
    } catch (err) {
      console.error("GET absence error:", err);
    }
  };

  useEffect(() => {
    if (childrenId) fetchAbsences();
  }, [childrenId]);

  // ✅ SAU KHI POST XONG → REFRESH LIST + CHUYỂN TAB
  const handleAbsenceSubmit = () => {
    fetchAbsences();
    setActiveTab("pending");
  };

  const pendingAbsences = absences.filter(
    (a) => a.status === "WAITING"
  );
  const approvedAbsences = absences.filter(
    (a) => a.status === "ACCEPTED"
  );

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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
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
            <AbsenceForm onSubmit={handleAbsenceSubmit} />
          </TabsContent>

          <TabsContent value="pending">
            <AbsenceList status="pending" />
          </TabsContent>

          <TabsContent value="approved">
            <AbsenceList status="approved" />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
