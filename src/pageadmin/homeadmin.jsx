import React from "react";
import { Header } from "../components/Headeradmin";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

export default function Homeadmin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
