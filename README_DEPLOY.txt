TEACHERS.D10HUB.IO.VN — GÓI XUẤT BẢN

Đã có:
- Trang tổng quan giáo viên.
- Thư viện Sổ tay Core, Playbook A/B, SOP, Toolkit, Cẩm nang phát triển GV.
- Trình đọc lật trang, thumbnail, tìm kiếm, phím trái/phải, toàn màn hình.
- Dùng đúng logo Điểm 10+.
- Responsive điện thoại.
- Schema rỗng cho lịch dạy, thông báo và tài nguyên; không tạo dữ liệu giả.

Cấu hình tên miền mong muốn:
teachers.d10hub.io.vn

Cách deploy Netlify:
1. Giải nén thư mục.
2. Netlify > Add new site > Deploy manually.
3. Kéo toàn bộ thư mục teachers_d10hub_io_vn vào vùng deploy.
4. Vào Domain management > Add a domain alias > teachers.d10hub.io.vn.
5. Ở DNS của d10hub.io.vn, tạo CNAME:
   Host/Name: teachers
   Target: <tên-site-netlify>.netlify.app
6. Chờ Netlify cấp SSL tự động.

Không cần đổi apex d10hub.io.vn.

Xem local:
python -m http.server 8080
mở http://localhost:8080

Các file dữ liệu cần nối sau:
- data/schedule.json
- data/announcements.json
- data/resources.json
