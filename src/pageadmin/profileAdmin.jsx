import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { User, Loader2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProfileAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-xl p-6 border border-blue-200">
          <h2 className="text-3xl mb-6 underline" style={{ color: '#19C1B6', fontWeight: 900 }}>
            Thông tin cá nhân:
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}