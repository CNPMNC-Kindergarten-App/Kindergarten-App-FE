import React from "react";
import { User, FileText, ClipboardList } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: User,
      title: "Thông tin học sinh",
      description:
        "Cập nhật đầy đủ thông tin học tập, điểm danh, kết quả và nhận xét của giáo viên theo từng ngày.",
      color: "orange",
      variant: "outline",
    },
    {
      icon: FileText,
      title: "Thực đơn",
      description:
        "Theo dõi thực đơn mỗi ngày, đảm bảo phụ huynh nắm được chế độ dinh dưỡng của con kèi trường.",
      color: "teal",
      variant: "solid",
    },
    {
      icon: ClipboardList,
      title: "Nộp đơn",
      description:
        "Hỗ trợ phụ huynh gửi đơn xin phép, đơn nghỉ học, đơn đề nghị một cách nhanh chóng và thuận tiện.",
      color: "orange",
      variant: "outline",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2
            className="text-gray-900"
            style={{ fontSize: "2rem", fontWeight: 800 }}
          >
            Tính năng nổi bật
          </h2>
          <p
            className="text-gray-600 max-w-3xl mx-auto"
            style={{ fontSize: "1rem", lineHeight: 1.6 }}
          >
            Mọi thông tin học tập và hoạt động của học sinh được cập nhật nhanh
            chóng – rõ ràng – minh bạch giữa phụ huynh và nhà trường.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHighlighted = feature.variant === "solid";

            return (
              <div
                key={index}
                className={`rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center ${
                  isHighlighted
                    ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg"
                    : "bg-white border-2 border-orange-400 hover:border-orange-500"
                }`}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                      isHighlighted
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-gradient-to-br from-orange-400 to-orange-500"
                    }`}
                  >
                    <Icon
                      className={`w-10 h-10 ${
                        isHighlighted ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3
                  className={`mb-4 ${
                    isHighlighted ? "text-white" : "text-gray-900"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mb-6 ${
                    isHighlighted ? "text-white/90" : "text-gray-600"
                  }`}
                  style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
                >
                  {feature.description}
                </p>

                {/* Button */}
                <div className="flex justify-center">
                  <button
                    className={`px-6 py-2.5 rounded-full border-2 transition-all ${
                      isHighlighted
                        ? "border-white text-white hover:bg-white hover:text-teal-600"
                        : "border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
