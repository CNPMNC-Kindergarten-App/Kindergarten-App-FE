import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";

function Button({ variant = "default", className = "", children, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-9 px-4";
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white",
    outline:
      "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-gray-300",
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <button
      {...props}
      className={`${base} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base bg-white outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-[3px] focus-visible:ring-purple-400 focus-visible:border-purple-400 " +
        className
      }
    />
  );
}

// thay lại khi gắn BE export function Login({ onShowRegister }) {
// Dùng để test
export function Login({ onShowRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("parent"); // "parent" | "teacher"

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng nhập:", { email, password, userType });
    alert("Đăng nhập thành công 🎉");
    if (onLoginSuccess) {
      onLoginSuccess();}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating animated decorations */}
      <div
        className="absolute top-10 left-10 text-6xl animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        🎈
      </div>
      <div
        className="absolute top-20 right-20 text-5xl animate-bounce"
        style={{ animationDuration: "2s", animationDelay: "0.5s" }}
      >
        ⭐
      </div>
      <div
        className="absolute bottom-20 left-20 text-5xl animate-bounce"
        style={{ animationDuration: "2.5s", animationDelay: "1s" }}
      >
        🌈
      </div>
      <div
        className="absolute bottom-10 right-10 text-6xl animate-bounce"
        style={{ animationDuration: "3s", animationDelay: "0.3s" }}
      >
        🎨
      </div>
      <div
        className="absolute top-1/2 left-5 text-4xl animate-bounce"
        style={{ animationDuration: "2.8s", animationDelay: "0.7s" }}
      >
        🦋
      </div>
      <div
        className="absolute top-1/3 right-10 text-4xl animate-bounce"
        style={{ animationDuration: "2.3s", animationDelay: "1.2s" }}
      >
        🌟
      </div>

      {/* Clouds */}
      <div className="absolute top-5 left-1/4 text-7xl opacity-30 animate-pulse">
        ☁️
      </div>
      <div
        className="absolute top-32 right-1/4 text-6xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      >
        ☁️
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full relative z-10 border-4 border-yellow-300">
        {/* Header with cute character */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-6 mb-4 shadow-lg transform hover:scale-110 transition-transform">
            <span className="text-6xl">🎒</span>
          </div>
          <h1 className="text-purple-700 mb-2">Chào mừng trở lại! 👋</h1>
          <p className="text-gray-600">
            Đăng nhập để bắt đầu ngày mới thật vui vẻ!
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setUserType("parent")}
            className={
              "flex-1 py-3 px-4 rounded-2xl border-2 transition-all " +
              (userType === "parent"
                ? "bg-pink-500 text-white border-pink-500 shadow-lg scale-105"
                : "bg-white text-gray-600 border-gray-300 hover:border-pink-300")
            }
          >
            <div className="text-2xl mb-1">👨‍👩‍👧</div>
            <div>Phụ Huynh</div>
          </button>
          <button
            type="button"
            onClick={() => setUserType("teacher")}
            className={
              "flex-1 py-3 px-4 rounded-2xl border-2 transition-all " +
              (userType === "teacher"
                ? "bg-purple-500 text-white border-purple-500 shadow-lg scale-105"
                : "bg-white text-gray-600 border-gray-300 hover:border-purple-300")
            }
          >
            <div className="text-2xl mb-1">👩‍🏫</div>
            <div>Giáo Viên</div>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Email hoặc Tên đăng nhập
              </span>
            </label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="border-2 border-purple-200 rounded-xl h-12 text-lg"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Mật khẩu
              </span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-2 border-purple-200 rounded-xl h-12 text-lg pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-purple-600 rounded"
              />
              <span className="text-gray-600">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-xl h-12 shadow-lg transform hover:scale-105 transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              Đăng Nhập
              <span className="text-xl">🚀</span>
            </span>
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-gray-500">hoặc</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl h-12 hover:border-blue-400 hover:bg-blue-50"
          >
            <span className="flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Đăng nhập với Google
            </span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl h-12 hover:border-blue-600 hover:bg-blue-50"
          >
            <span className="flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="#1877F2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Đăng nhập với Facebook
            </span>
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={onShowRegister}
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
          <p className="text-center text-gray-600 flex items-center justify-center gap-2">
            <span className="text-xl">💡</span>
            Cần hỗ trợ? Gọi{" "}
            <strong className="text-purple-700">08 6694 5529</strong>
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 pb-4 opacity-60">
        <span className="text-5xl">🌻</span>
        <span className="text-5xl">🌺</span>
        <span className="text-5xl">🌸</span>
        <span className="text-5xl">🌼</span>
      </div>
    </div>
  );
}
