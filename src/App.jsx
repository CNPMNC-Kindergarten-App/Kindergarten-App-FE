import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AttendancePage from "./pages/AttendancePage";
import Home from "./pages/home";
import BangTin from "./pages/BangTin";
import StudentInformation from "./pages/StudentInformation";
import MenuPage from "./pages/MenuPage";

import Homeadmin from "./pageadmin/homeadmin";
import BangTinadmin from "./pageadmin/bangtinadmin";
import Studentinfadmin from "./pageadmin/studentinfadmin";
import StudentList from "./pageadmin/studentlist";
import RegisterStudent from "./pageadmin/registerStudent";
import ProfileAdmin from "./pageadmin/profileAdmin";
import Attendanceadmin from "./pageadmin/attendanceadmin";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState(null);

  const { selectedStudent, setSelectedStudent } = useStudent();

  // ✅ LẤY USER KHI REFRESH
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setIsLoggedIn(true);
      setRole(parsed.role);
    }

    const savedStudent = localStorage.getItem("selectedStudent");
    if (savedStudent) {
      setSelectedStudent(JSON.parse(savedStudent));
    }
  }, []);

  // ==============================
  // 1. TRANG ĐĂNG KÝ
  // ==============================
  if (!isLoggedIn && showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  // ==============================
  // 2. TRANG ĐĂNG NHẬP
  // ==============================
  if (!isLoggedIn) {
    return (
      <Login
        onShowRegister={() => setShowRegister(true)}
        onLoginSuccess={(userData) => {
          setIsLoggedIn(true);
          setRole(userData.role);
        }}
      />
    );
  }

  // ✅ LẤY parent_id
  const user = JSON.parse(localStorage.getItem("user"));
  const parentId = user?.parent_id || 1; // test tạm

  // ==============================
  // 🚨 ÉP PHỤ HUYNH PHẢI CHỌN HỌC SINH
  // ==============================
  if (role === "parent" && !selectedStudent) {
    return (
      <StudentSelection
        parentId={parentId}
        onSelectStudent={() => {}}
      />
    );
  }

  // ==============================
  // 3. ROUTING SAU KHI ĐĂNG NHẬP
  // ==============================
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* ✅ HOME THEO ROLE */}
        <Route
          path="/"
          element={role === "teacher" ? <Homeadmin /> : <Home />}
        />

    {/* ================= TEACHER ================= */}
    {/* ❗ Teacher CHỈ được phép ở Homeadmin */}
    {role === "teacher" && (
      <>
        <Route path="/bangtinadmin" element={<BangTinadmin />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/studentinfadmin" element={<Studentinfadmin />} />
        <Route path="/registerstudent" element={<RegisterStudent />} />
        <Route path="/profile" element={<ProfileAdmin />} />
        <Route path="/attendanceadmin" element={<Attendanceadmin />} />
      </>
    )}

        {/* ================= PHỤ HUYNH ================= */}
        {role === "parent" && (
          <>
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/bangtin" element={<BangTin />} />
            <Route path="/StudentInformation" element={<StudentInformation />} />
            <Route path="/menu" element={<MenuPage />} />
          </>
        )}

        {/* ❌ TRUY CẬP SAI → HOME */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
 