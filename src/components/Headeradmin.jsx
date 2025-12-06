import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logoheader.png";

export function Header() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-teal-500 text-white py-2 px-4 text-center">
        <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          🔔 Hệ thống Sổ Liên Lạc Điện Tử – Cập nhật liên tục, nhanh chóng,
          chính xác! 🔔
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logo} alt="EduContact" className="h-12 md:h-14" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Trang chủ
              </Link>

              {/* ⭐ BẢNG TIN MỚI */}
              <Link
                to="/bangtinadmin"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Quản lý Bảng tin
              </Link>

              <Link
                to="/studentlist"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Thông tin học sinh
              </Link>

              <Link
                to="/attendanceadmin"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Điểm danh
              </Link>

              <Link
                to="/menu"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Thực đơn
              </Link>

              <a
                href="#"
                className="text-gray-700 hover:text-teal-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                style={{ fontWeight: 600 }}
              >
                Nộp đơn
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3"> 
              <Link
                to="/profile"
                className="hidden md:block hover:bg-teal-600 text-black px-8 py-2.5 rounded-full transition-colors no-underline"
                style={{ fontWeight: 700 , backgroundColor: 'orange'}}
              >
                Xin chào cô:
                <br />
                <span style={{ fontWeight: 700 }}>Trần Hà Linh</span>
              </Link>
              <button className="md:hidden p-2">
                <Menu className="w-6 h-6 text-teal-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="relative h-4 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,10 Q300,0 600,10 T1200,10 L1200,20 L0,20 Z"
              fill="#14B8A6"
              opacity="0.2"
            />
          </svg>
        </div>
      </header>
    </>
  );
}
