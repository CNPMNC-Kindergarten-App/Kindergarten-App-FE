import { useState } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Hiển thị trang đăng ký
  if (!isLoggedIn && showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  // Hiển thị trang đăng nhập nếu chưa đăng nhập
  if (!isLoggedIn) {
    return (
      <Login
        onShowRegister={() => setShowRegister(true)}
        onLoginSuccess={() => setIsLoggedIn(true)} // ⬅️ thêm dòng này
      />
    );
  }

  // Đã "đăng nhập" → vào Home
  return <Home />;
}
