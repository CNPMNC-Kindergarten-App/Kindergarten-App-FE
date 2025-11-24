// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AttendancePage from "./pages/AttendancePage";
import Home from "./pages/home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Trang đăng ký
  if (!isLoggedIn && showRegister) {
    return (
      <Register
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  // Trang đăng nhập
  if (!isLoggedIn) {
    return (
      <Login
        onShowRegister={() => setShowRegister(true)}
        // Gọi prop này trong Login khi đăng nhập thành công
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  // Sau khi đăng nhập -> dùng router
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attendance" element={<AttendancePage />} />
      {/* Nếu path lạ -> đẩy về trang chủ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
