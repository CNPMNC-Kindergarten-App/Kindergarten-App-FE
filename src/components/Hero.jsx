import React from "react";
import heroImage from "../assets/anhminhhoa.png";
export function Hero() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 relative">
          {/* Decorative Elements */}
          <div className="absolute -top-8 -left-4 w-20 h-20 border-2 border-orange-400 rounded-full opacity-50" />
          <div className="absolute top-1/2 -right-8 w-16 h-16 border-2 border-teal-400 rounded-full opacity-50" />

          <div className="space-y-3">
            <p
              className="text-teal-500"
              style={{ fontSize: "1.125rem", fontWeight: 700 }}
            >
              Hệ thống Sổ Liên Lạc Điện Tử
            </p>
            <h1
              className="text-gray-900"
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Giúp phụ huynh và nhà trường kết nối mọi lúc, mọi nơi
            </h1>
          </div>

          <p
            className="text-gray-700"
            style={{ fontSize: "1rem", lineHeight: 1.6 }}
          >
            Theo dõi tình hình học tập – điểm danh – thông báo – kết quả học
            tập của học sinh một cách trực quan và túc thời.
          </p>

          <button
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ fontWeight: 700 }}
          >
            Truy cập ngay
          </button>
        </div>

        {/* Right Image */}
        <div className="relative flex items-center justify-center">
          {/* Main image */}
          <div className="relative w-full max-w-md">
            <img
              src={heroImage}
              alt="Child learning with educational materials"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
