# Hướng dẫn thiết lập môi trường

## ✅ Đã thiết lập xong

ExecutionPolicy đã được cấu hình cho CurrentUser, npm sẽ hoạt động trong tất cả các terminal PowerShell mới.

## 🚀 Cách sử dụng

### Cách 1: Sử dụng trực tiếp (khuyến nghị)
Mở terminal mới và chạy:
```powershell
npm --version
node --version
```

### Cách 2: Sử dụng script helper
Nếu PATH chưa được cập nhật, chạy:
```powershell
.\setup-env.ps1
```

## 📝 Lưu ý

- **ExecutionPolicy**: Đã được thiết lập là `RemoteSigned` cho CurrentUser
- **PATH**: Node.js có thể chưa có trong PATH mặc định, cần thêm vào hoặc khởi động lại máy
- **Script helper**: File `setup-env.ps1` giúp tự động thiết lập PATH mỗi khi cần

## 🔧 Khắc phục sự cố

Nếu npm vẫn không hoạt động:
1. Khởi động lại máy để PATH được cập nhật
2. Hoặc chạy: `.\setup-env.ps1` mỗi lần mở terminal mới




