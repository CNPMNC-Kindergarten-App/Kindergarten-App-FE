import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChild } from "../contexts/StudentContext";

export default function SelectChild() {
  const [childrenList, setChildrenList] = useState([]);
  const { setSelectedChild } = useChild();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const parentId = user?.id; // ID phụ huynh sau login

  useEffect(() => {
    if (!parentId) return;

    const API_URL = import.meta.env.VITE_API_URL; // ✅ LẤY TỪ .env

    fetch(`${API_URL}/children?parent_id=${parentId}`)
uy
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => setChildrenList(data))
      .catch(() => alert("Lỗi lấy danh sách học sinh"));
  }, [parentId]);

  const handleSelectChild = (child) => {
    setSelectedChild(child); // ✅ lưu toàn cục
    localStorage.setItem("child", JSON.stringify(child)); // ✅ lưu reload
    navigate("/"); // ✅ về Home
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-6 text-center">
        Chọn bé để theo dõi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childrenList.map((child) => (
          <div
            key={child.id}
            onClick={() => handleSelectChild(child)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition border hover:border-blue-500"
          >
            <h2 className="text-lg font-semibold">{child.name}</h2>
            <p>Giới tính: {child.sex}</p>
            <p>Ngày sinh: {child.dob}</p>
            <p>Tính cách: {child.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
