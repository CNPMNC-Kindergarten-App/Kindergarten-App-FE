# Script tự động thiết lập môi trường Node.js và npm
# Chạy script này mỗi khi mở terminal mới: .\setup-env.ps1

# Thêm Node.js vào PATH nếu chưa có
$nodePath = "C:\Program Files\nodejs"
if ($env:Path -notlike "*$nodePath*") {
    $env:Path += ";$nodePath"
    Write-Host "✓ Đã thêm Node.js vào PATH" -ForegroundColor Green
} else {
    Write-Host "✓ Node.js đã có trong PATH" -ForegroundColor Green
}

# Kiểm tra Node.js và npm
Write-Host "`nKiểm tra phiên bản:" -ForegroundColor Cyan
node --version
npm --version

Write-Host "`n✓ Môi trường đã sẵn sàng!" -ForegroundColor Green
Write-Host "Bạn có thể sử dụng npm và node bình thường." -ForegroundColor Yellow

