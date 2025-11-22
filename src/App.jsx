import { useState } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Hiển thị trang đăng ký
  if (!isLoggedIn && showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  // Hiển thị trang đăng nhập nếu chưa đăng nhập
  if (!isLoggedIn) {
    return <Login onShowRegister={() => setShowRegister(true)} />;
  }

  // Hiển thị trang chủ sau khi đăng nhập
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <Programs />
      <Activities />
      <Contact />
    </div>
  );
}
