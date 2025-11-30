// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AttendancePage from "./pages/AttendancePage";
import Home from "./pages/home";

// ⚠️ Import trang bảng tin mới của bạn
import BangTin from "./pages/BangTin";
import StudentInformation from "./pages/StudentInformation";
import MenuPage from "./pages/MenuPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ==============================
  // 1. TRANG ĐĂNG KÝ
  // ==============================
  if (!isLoggedIn && showRegister) {
    return (
      <Register
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  // ==============================
  // 2. TRANG ĐĂNG NHẬP
  // ==============================
  if (!isLoggedIn) {
    return (
      <Login
        onShowRegister={() => setShowRegister(true)}
        // Gọi khi đăng nhập thành công
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  // ==============================
  // 3. SAU KHI ĐĂNG NHẬP → ROUTING APP
  // ==============================
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attendance" element={<AttendancePage />} /> 
      <Route path="/bangtin" element={<BangTin />} />
      <Route path="/StudentInformation" element={<StudentInformation />} />
            <Route path="/menu" element={<MenuPage />} />
      {/* Path lạ → trả về Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
