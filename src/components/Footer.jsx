// src/components/Footer.jsx
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logofooter.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-500 to-teal-600 text-white mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <img src={logo} alt="EduContact" className="h-12" />
            <p className="text-white/90 leading-relaxed">
              Hệ thống Sổ Liên Lạc giúp phụ huynh theo dõi thông tin của học
              sinh một cách nhanh chóng và liền lạc.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white">Liên kết</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Trang chủ
              </Link>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Thông tin
              </a>
              <Link
                to="/attendance"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Điểm danh
              </Link>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Thực đơn
              </a>
              <a
                href="#"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Nộp đơn
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                <p className="text-white/80">Trường tiểu học BK – TP. HCM</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a
                  href="tel:0123456789"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  0123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a
                  href="mailto:support@educontact.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  support@educontact.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/70 text-sm">
            © 2024 EduContact. Making learning fun.
          </p>
        </div>
      </div>
    </footer>
  );
}
