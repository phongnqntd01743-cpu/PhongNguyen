# 🎬 CINEMAX – PROMPT PHÁT TRIỂN HỆ THỐNG ĐẶT VÉ XEM PHIM TÍCH HỢP AI
> **Dự án tốt nghiệp – Nhóm CineMax (Nhóm 2, Lớp SD2001)**  
> Công nghệ: Jakarta EE 10 · Java Servlet/JSP · Apache Tomcat 10.1.43 · Microsoft SQL Server · Google Gemini API

---

## 📋 HƯỚNG DẪN SỬ DỤNG PROMPT

Prompt được chia thành **7 phần độc lập**, thực hiện **tuần tự từ PHẦN 1 → PHẦN 7**.  
Mỗi phần build trên kết quả của phần trước. **Không bỏ qua phần nào.**

| Phần | Nội dung | Ưu tiên |
|------|----------|---------|
| PHẦN 1 | Khởi tạo project, cấu trúc thư mục, pom.xml, database SQL Server | 🔴 Bắt buộc đầu tiên |
| PHẦN 2 | Database schema SQL Server đầy đủ (CREATE TABLE, stored procedures, seed data) | 🔴 Bắt buộc thứ hai |
| PHẦN 3 | Backend: Entity, DAO, Service, Utility, Filter, Listener | 🔴 Core logic |
| PHẦN 4 | Controller (Servlet): toàn bộ 8 Servlet xử lý nghiệp vụ | 🔴 Controller layer |
| PHẦN 5 | Frontend: JSP + CSS + JS – Giao diện khách hàng (trang chủ → thanh toán) | 🟡 View layer KH |
| PHẦN 6 | Frontend: JSP – Giao diện Nhân viên + Admin Dashboard | 🟡 View layer Staff/Admin |
| PHẦN 7 | Tích hợp AI (Gemini), VNPay/MoMo, Jakarta Mail, QR Code, kiểm thử cuối | 🟢 Integration |

---

# ═══════════════════════════════════════════════════════════
# PHẦN 1: KHỞI TẠO PROJECT & CẤU TRÚC THƯ MỤC
# ═══════════════════════════════════════════════════════════

## CONTEXT (Bối cảnh)

Tôi đang xây dựng **hệ thống đặt vé xem phim tích hợp AI** tên **CineMax** – một website thương mại đầy đủ chức năng tương đương CGV Vietnam (cgv.vn), Galaxy Cinema (galaxycine.vn), BHD Star (bhdstar.vn). **Không phải demo.** Toàn bộ dữ liệu phải hoạt động thật 100%.

## CÔNG NGHỆ BẮT BUỘC (không được thay đổi)

```
- Ngôn ngữ:        Java 17 LTS
- Nền tảng:        Jakarta EE 10
- Web framework:   Java Servlet 6.0 + JSP 3.1 (THUẦN – không dùng Spring)
- Application server: Apache Tomcat 10.1.43
- Build tool:      Maven 3.9+
- Database:        Microsoft SQL Server (bất kỳ edition)
  - Connection:    JDBC URL = jdbc:sqlserver://localhost:1433;databaseName=CineMaxDB;encrypt=true;trustServerCertificate=true
  - Username:      sa
  - Password:      123456
- JDBC Driver:     mssql-jdbc 12.6.1.jre11
- Template engine: JSP 3.1 + JSTL 3.0
- AI API:          Google Gemini 2.0 Flash (gemini-2.0-flash model)
- Payment:         VNPay (sandbox), MoMo (sandbox), ZaloPay (sandbox)
- Email:           Jakarta Mail 2.1 qua Gmail SMTP (smtp.gmail.com:587)
- QR Code:         ZXing 3.5.3
- Password hash:   jBCrypt 0.4
- JSON:            Gson 2.10.1
- HTTP Client:     OkHttp 4.12.0 (để gọi Gemini API)
- CSS Framework:   Bootstrap 5.3.3 (CDN)
- Icons:           Font Awesome 6.5 (CDN)
- Fonts:           Google Fonts – Inter (body), Bebas Neue (display/title)
```

## NHIỆM VỤ PHẦN 1

Tạo toàn bộ khung project Maven chuẩn Jakarta EE 10 với cấu trúc thư mục sau (CHÍNH XÁC – không được tự ý thêm bớt):

```
CineMax/
├── pom.xml                          ← Maven config đầy đủ với TẤT CẢ dependencies
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── cinemax/
│   │   │           ├── config/
│   │   │           │   ├── DatabaseConfig.java       ← Connection pool DBCP2
│   │   │           │   └── AppConfig.java            ← Hằng số toàn hệ thống
│   │   │           ├── entity/
│   │   │           │   ├── KhachHang.java
│   │   │           │   ├── NhanVien.java
│   │   │           │   ├── CumRap.java
│   │   │           │   ├── PhongChieu.java
│   │   │           │   ├── Ghe.java
│   │   │           │   ├── Phim.java
│   │   │           │   ├── SuatChieu.java
│   │   │           │   ├── GiaVe.java
│   │   │           │   ├── DatVe.java
│   │   │           │   ├── Ve.java
│   │   │           │   ├── ThanhToan.java
│   │   │           │   ├── KhuyenMai.java
│   │   │           │   ├── DanhGia.java
│   │   │           │   ├── Combo.java
│   │   │           │   ├── DatVeCombo.java
│   │   │           │   ├── GheGiuCho.java
│   │   │           │   └── AuditLog.java
│   │   │           ├── dao/
│   │   │           │   ├── KhachHangDAO.java
│   │   │           │   ├── NhanVienDAO.java
│   │   │           │   ├── CumRapDAO.java
│   │   │           │   ├── PhongChieuDAO.java
│   │   │           │   ├── GheDAO.java
│   │   │           │   ├── PhimDAO.java
│   │   │           │   ├── SuatChieuDAO.java
│   │   │           │   ├── GiaVeDAO.java
│   │   │           │   ├── DatVeDAO.java
│   │   │           │   ├── VeDAO.java
│   │   │           │   ├── ThanhToanDAO.java
│   │   │           │   ├── KhuyenMaiDAO.java
│   │   │           │   ├── DanhGiaDAO.java
│   │   │           │   ├── ComboDAO.java
│   │   │           │   ├── GheGiuChoDAO.java
│   │   │           │   └── AuditLogDAO.java
│   │   │           ├── service/
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── BookingService.java
│   │   │           │   ├── PaymentService.java
│   │   │           │   ├── AIService.java
│   │   │           │   ├── EmailService.java
│   │   │           │   ├── MemberService.java
│   │   │           │   ├── MovieService.java
│   │   │           │   ├── ScheduleService.java
│   │   │           │   └── ReportService.java
│   │   │           ├── servlet/
│   │   │           │   ├── AuthServlet.java          ← /auth/*
│   │   │           │   ├── HomeServlet.java          ← /
│   │   │           │   ├── MovieServlet.java         ← /movies/*
│   │   │           │   ├── ScheduleServlet.java      ← /schedule/*
│   │   │           │   ├── BookingServlet.java       ← /booking/*
│   │   │           │   ├── PaymentServlet.java       ← /payment/*
│   │   │           │   ├── AIServlet.java            ← /ai/*
│   │   │           │   ├── MemberServlet.java        ← /member/*
│   │   │           │   ├── StaffServlet.java         ← /staff/*
│   │   │           │   └── AdminServlet.java         ← /admin/*
│   │   │           ├── filter/
│   │   │           │   ├── AuthFilter.java           ← Chặn URL cần đăng nhập
│   │   │           │   ├── RBACFilter.java           ← Phân quyền Staff/Admin
│   │   │           │   ├── CORSFilter.java           ← Headers cho AJAX
│   │   │           │   └── EncodingFilter.java       ← UTF-8 toàn hệ thống
│   │   │           ├── listener/
│   │   │           │   ├── AppContextListener.java   ← Khởi tạo connection pool
│   │   │           │   └── SessionListener.java      ← Đếm online users
│   │   │           └── util/
│   │   │               ├── DBConnection.java         ← Lấy connection từ pool
│   │   │               ├── PasswordUtil.java         ← bcrypt hash/verify
│   │   │               ├── QRCodeUtil.java           ← Sinh mã QR (ZXing)
│   │   │               ├── EmailUtil.java            ← Gửi mail Jakarta Mail
│   │   │               ├── VNPayUtil.java            ← Ký HMAC-SHA512 VNPay
│   │   │               ├── MoMoUtil.java             ← Ký HMAC-SHA256 MoMo
│   │   │               ├── ZaloPayUtil.java          ← Ký HMAC-SHA256 ZaloPay
│   │   │               ├── SessionUtil.java          ← Helper đọc/ghi session
│   │   │               ├── ValidationUtil.java       ← Validate input server-side
│   │   │               ├── GeminiUtil.java           ← Gọi Gemini API qua OkHttp
│   │   │               └── DateTimeUtil.java         ← Format ngày giờ tiếng Việt
│   │   ├── resources/
│   │   │   └── (trống – dùng WEB-INF/config cho .properties)
│   │   └── webapp/
│   │       ├── index.jsp                             ← Redirect sang HomeServlet
│   │       ├── WEB-INF/
│   │       │   ├── web.xml                           ← Servlet 6.0, Session timeout, Error pages
│   │       │   ├── config/
│   │       │   │   └── app.properties               ← API keys, SMTP config (KHÔNG commit lên git)
│   │       │   └── views/
│   │       │       ├── common/
│   │       │       │   ├── header.jsp               ← Navbar responsive
│   │       │       │   ├── footer.jsp               ← Footer đầy đủ
│   │       │       │   ├── chatbot-widget.jsp       ← AI Chat bubble
│   │       │       │   ├── error-404.jsp
│   │       │       │   └── error-500.jsp
│   │       │       ├── auth/
│   │       │       │   ├── login.jsp
│   │       │       │   ├── register.jsp
│   │       │       │   ├── forgot-password.jsp
│   │       │       │   └── reset-password.jsp
│   │       │       ├── home/
│   │       │       │   └── index.jsp                ← Trang chủ
│   │       │       ├── movie/
│   │       │       │   ├── list.jsp                 ← Danh sách phim
│   │       │       │   └── detail.jsp               ← Chi tiết phim
│   │       │       ├── booking/
│   │       │       │   ├── select-showtime.jsp      ← Chọn suất chiếu
│   │       │       │   ├── seat-map.jsp             ← Sơ đồ ghế real-time
│   │       │       │   ├── combo-selection.jsp      ← Chọn bắp nước
│   │       │       │   └── payment.jsp              ← Xác nhận & thanh toán
│   │       │       ├── payment/
│   │       │       │   ├── success.jsp
│   │       │       │   ├── failed.jsp
│   │       │       │   └── pending.jsp
│   │       │       ├── member/
│   │       │       │   ├── profile.jsp
│   │       │       │   ├── ticket-history.jsp
│   │       │       │   ├── ticket-detail.jsp        ← Hiển thị QR
│   │       │       │   └── loyalty-card.jsp         ← Thẻ thành viên
│   │       │       ├── staff/
│   │       │       │   ├── dashboard.jsp
│   │       │       │   ├── sell-ticket.jsp
│   │       │       │   ├── scan-qr.jsp
│   │       │       │   ├── manage-movie.jsp
│   │       │       │   ├── manage-schedule.jsp
│   │       │       │   ├── manage-promotion.jsp
│   │       │       │   └── shift-report.jsp
│   │       │       └── admin/
│   │       │           ├── dashboard.jsp
│   │       │           ├── manage-cinema.jsp
│   │       │           ├── manage-room.jsp
│   │       │           ├── manage-staff.jsp
│   │       │           ├── manage-user.jsp
│   │       │           ├── pricing.jsp
│   │       │           ├── promotion.jsp
│   │       │           ├── revenue-report.jsp
│   │       │           ├── movie-stats.jsp
│   │       │           ├── manage-banner.jsp
│   │       │           ├── manage-review.jsp
│   │       │           └── audit-log.jsp
│   │       └── assets/
│   │           ├── css/
│   │           │   ├── main.css                     ← CSS custom toàn site
│   │           │   ├── seat-map.css                 ← Sơ đồ ghế
│   │           │   └── admin.css                    ← Dashboard admin/staff
│   │           ├── js/
│   │           │   ├── main.js                      ← JS chung
│   │           │   ├── seat-map.js                  ← Logic chọn ghế + AJAX polling
│   │           │   ├── countdown-timer.js           ← Đếm ngược 10 phút giữ ghế
│   │           │   ├── chatbot.js                   ← Chat widget logic
│   │           │   └── payment.js                   ← Chọn PTTT + redirect
│   │           └── images/
│   │               ├── logo.png
│   │               ├── logo-white.png
│   │               └── placeholder-movie.jpg
└── src/test/
    └── java/com/cinemax/
        ├── service/
        │   ├── BookingServiceTest.java
        │   ├── AuthServiceTest.java
        │   └── PaymentServiceTest.java
        └── dao/
            └── PhimDAOTest.java
```

## YÊU CẦU CỤ THỂ PHẦN 1

### 1.1 – Tạo file `pom.xml` đầy đủ

Phải có **đúng** các dependency sau với version chính xác:

```xml
<!-- Jakarta EE 10 Web API (provided – Tomcat cung cấp) -->
jakarta.servlet:jakarta.servlet-api:6.0.0 (scope: provided)
jakarta.servlet.jsp:jakarta.servlet.jsp-api:3.1.1 (scope: provided)
jakarta.servlet.jsp.jstl:jakarta.servlet.jsp.jstl-api:3.0.0 (scope: provided)
org.glassfish.web:jakarta.servlet.jsp.jstl:3.0.1 (scope: runtime)

<!-- Database -->
com.microsoft.sqlserver:mssql-jdbc:12.6.1.jre11
org.apache.commons:commons-dbcp2:2.12.0

<!-- Security -->
de.svenkubiak:jBCrypt:0.4.3

<!-- AI & HTTP -->
com.squareup.okhttp3:okhttp:4.12.0
com.google.code.gson:gson:2.10.1

<!-- QR Code -->
com.google.zxing:core:3.5.3
com.google.zxing:javase:3.5.3

<!-- Email -->
org.eclipse.angus:angus-mail:2.0.3

<!-- Testing -->
org.junit.jupiter:junit-jupiter:5.10.2 (scope: test)
org.mockito:mockito-core:5.11.0 (scope: test)

<!-- Build plugin -->
org.apache.maven.plugins:maven-war-plugin:3.4.0
  → failOnMissingWebXml=false
  → finalName=CineMax
```

**Java compiler: source=17, target=17, encoding=UTF-8**

### 1.2 – Tạo file `WEB-INF/web.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
         https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">
```

Phải cấu hình:
- `<session-config>`: timeout 30 phút, cookie httpOnly=true, secure=false (dev)
- `<error-page>`: 404 → `/WEB-INF/views/common/error-404.jsp`, 500 → `/WEB-INF/views/common/error-500.jsp`
- `<filter-mapping>`: EncodingFilter → /*, AuthFilter → /booking/*, /member/*, /ai/*
- `<welcome-file-list>`: index.jsp

### 1.3 – Tạo `WEB-INF/config/app.properties`

```properties
# Database
db.url=jdbc:sqlserver://localhost:1433;databaseName=CineMaxDB;encrypt=true;trustServerCertificate=true
db.username=sa
db.password=123456
db.pool.maxTotal=50
db.pool.maxIdle=10
db.pool.minIdle=5

# Google Gemini AI
gemini.api.key=YOUR_GEMINI_API_KEY
gemini.model=gemini-2.0-flash
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

# VNPay Sandbox
vnpay.tmnCode=YOUR_TMN_CODE
vnpay.hashSecret=YOUR_HASH_SECRET
vnpay.payUrl=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
vnpay.returnUrl=http://localhost:8080/CineMax/payment/vnpay-return
vnpay.ipnUrl=http://localhost:8080/CineMax/payment/vnpay-ipn

# MoMo Sandbox
momo.partnerCode=MOMO
momo.accessKey=F8BBA842ECF85
momo.secretKey=K951B6PE1waDMi640xX08PD3vg6EkVlz
momo.endpoint=https://test-payment.momo.vn/v2/gateway/api/create
momo.redirectUrl=http://localhost:8080/CineMax/payment/momo-return
momo.ipnUrl=http://localhost:8080/CineMax/payment/momo-ipn

# Jakarta Mail (Gmail SMTP)
mail.smtp.host=smtp.gmail.com
mail.smtp.port=587
mail.smtp.username=YOUR_GMAIL@gmail.com
mail.smtp.password=YOUR_APP_PASSWORD
mail.from.name=CineMax Cineplex
mail.from.email=noreply@cinemax.vn

# App
app.name=CineMax Cineplex
app.url=http://localhost:8080/CineMax
app.seat.hold.minutes=10
app.cancel.before.minutes=45
```

### 1.4 – Tạo `DatabaseConfig.java` với Apache Commons DBCP2

```java
// Dùng BasicDataSource từ commons-dbcp2
// Load config từ app.properties
// setMaxTotal(50), setMaxIdle(10), setMinIdle(5)
// setTestOnBorrow(true), setValidationQuery("SELECT 1")
// Expose static DataSource getInstance()
```

### 1.5 – Tạo `AppContextListener.java`

```java
@WebListener
// contextInitialized: load app.properties, khởi tạo DatabaseConfig, 
//                     lên lịch cleanup GheGiuCho (ScheduledExecutorService mỗi 1 phút)
// contextDestroyed: shutdown pool, shutdown scheduler
```

### 1.6 – Tạo `EncodingFilter.java`

```java
// Set request/response encoding UTF-8 cho mọi request
// Set Content-Type: text/html; charset=UTF-8
```

---

# ═══════════════════════════════════════════════════════════
# PHẦN 2: DATABASE SCHEMA SQL SERVER ĐẦY ĐỦ
# ═══════════════════════════════════════════════════════════

## NHIỆM VỤ PHẦN 2

Tạo file `database/CineMaxDB_Schema.sql` – script SQL Server chạy được 100%, tạo toàn bộ CSDL từ đầu.

### 2.1 – Tạo Database

```sql
CREATE DATABASE CineMaxDB
    COLLATE Vietnamese_CI_AS;
GO
USE CineMaxDB;
GO
```

### 2.2 – Tạo 17 bảng theo thứ tự (đúng dependency FK)

Tạo theo thứ tự sau, mỗi bảng phải có đầy đủ constraint:

**Thứ tự tạo bảng:**
1. `CumRap` → 2. `NhanVien` → 3. `PhongChieu` → 4. `Ghe` → 5. `Phim` → 6. `GiaVe` → 7. `SuatChieu` → 8. `KhachHang` → 9. `DatVe` → 10. `Ve` → 11. `ThanhToan` → 12. `KhuyenMai` → 13. `DatVeKhuyenMai` → 14. `Combo` → 15. `DatVeCombo` → 16. `DanhGia` → 17. `GheGiuCho` → 18. `AuditLog`

**Schema chi tiết từng bảng:**

```sql
-- 1. CumRap
CREATE TABLE CumRap (
    cumRapID    INT IDENTITY(1,1) PRIMARY KEY,
    tenCumRap   NVARCHAR(150) NOT NULL,
    diaChi      NVARCHAR(300) NOT NULL,
    thanhPho    NVARCHAR(100) NOT NULL,
    soDienThoai VARCHAR(15)   NOT NULL,
    googleMapsURL VARCHAR(500) NULL,
    trangThai   BIT DEFAULT 1 NOT NULL   -- 1=Hoạt động, 0=Tạm đóng
);

-- 2. NhanVien
CREATE TABLE NhanVien (
    nhanVienID  INT IDENTITY(1,1) PRIMARY KEY,
    hoTen       NVARCHAR(100) NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    matKhauHash VARCHAR(255)  NOT NULL,
    vaiTro      VARCHAR(20)   NOT NULL CHECK (vaiTro IN ('STAFF','ADMIN')),
    cumRapID    INT NULL FOREIGN KEY REFERENCES CumRap(cumRapID),
    trangThai   BIT DEFAULT 1 NOT NULL,
    ngayTao     DATETIME DEFAULT GETDATE()
);

-- 3. PhongChieu
CREATE TABLE PhongChieu (
    phongChieuID INT IDENTITY(1,1) PRIMARY KEY,
    cumRapID     INT NOT NULL FOREIGN KEY REFERENCES CumRap(cumRapID),
    tenPhong     NVARCHAR(50)  NOT NULL,
    loaiPhong    VARCHAR(10)   NOT NULL CHECK (loaiPhong IN ('2D','3D','IMAX','4DX')),
    tongSoGhe    INT           NOT NULL,
    soHang       INT           NOT NULL,
    soCot        INT           NOT NULL,
    trangThai    BIT DEFAULT 1 NOT NULL
);

-- 4. Ghe
CREATE TABLE Ghe (
    gheID        INT IDENTITY(1,1) PRIMARY KEY,
    phongChieuID INT     NOT NULL FOREIGN KEY REFERENCES PhongChieu(phongChieuID),
    hangGhe      CHAR(2) NOT NULL,       -- A, B, C...
    soGhe        INT     NOT NULL,
    loaiGhe      VARCHAR(10) NOT NULL CHECK (loaiGhe IN ('THUONG','VIP','DOI','DISABLE')),
    trangThai    VARCHAR(10) DEFAULT 'SUDUNG' CHECK (trangThai IN ('SUDUNG','HONG','LODI'))
);

-- 5. Phim
CREATE TABLE Phim (
    phimID         INT IDENTITY(1,1) PRIMARY KEY,
    tenPhim        NVARCHAR(200) NOT NULL,
    theLoai        NVARCHAR(100) NOT NULL,
    thoiLuong      INT NOT NULL,          -- phút
    nhanDoTuoi     VARCHAR(5) NOT NULL CHECK (nhanDoTuoi IN ('P','C13','C16','C18')),
    ngonNgu        NVARCHAR(100) NOT NULL,
    dinhDangHoTro  NVARCHAR(50) DEFAULT '2D',
    tenDaoDien     NVARCHAR(200) NULL,
    tenDienVien    NVARCHAR(500) NULL,
    nuocSanXuat    NVARCHAR(100) NULL,
    ngayKhoiChieu  DATE NOT NULL,
    moTa           NVARCHAR(MAX) NULL,
    posterURL      VARCHAR(500) NULL,
    trailerURL     VARCHAR(500) NULL,
    trangThai      VARCHAR(15) DEFAULT 'DANGCHIEU'
                   CHECK (trangThai IN ('DANGCHIEU','SAPCHIEU','NGUNGCHIEU')),
    ngayTao        DATETIME DEFAULT GETDATE()
);

-- 6. GiaVe
CREATE TABLE GiaVe (
    giaVeID     INT IDENTITY(1,1) PRIMARY KEY,
    cumRapID    INT NULL FOREIGN KEY REFERENCES CumRap(cumRapID),
    loaiGhe     VARCHAR(10) NOT NULL CHECK (loaiGhe IN ('THUONG','VIP','DOI')),
    dinhDang    VARCHAR(10) NOT NULL CHECK (dinhDang IN ('2D','3D','IMAX','4DX')),
    khungGio    VARCHAR(10) NOT NULL CHECK (khungGio IN ('SANG','CHIEU','TOI','KHUYA')),
    ngayLoai    VARCHAR(15) NOT NULL CHECK (ngayLoai IN ('THUATHUONG','CUOITUAN','NGAYLE')),
    giaTien     DECIMAL(10,2) NOT NULL,
    ngayHieuLuc DATE NOT NULL,
    ngayKetThuc DATE NULL     -- NULL = áp dụng vô thời hạn
);

-- 7. SuatChieu
CREATE TABLE SuatChieu (
    suatChieuID    INT IDENTITY(1,1) PRIMARY KEY,
    phimID         INT NOT NULL FOREIGN KEY REFERENCES Phim(phimID),
    phongChieuID   INT NOT NULL FOREIGN KEY REFERENCES PhongChieu(phongChieuID),
    thoiGianBatDau DATETIME NOT NULL,
    thoiGianKetThuc DATETIME NOT NULL,
    dinhDang       VARCHAR(10) NOT NULL CHECK (dinhDang IN ('2D','3D','IMAX','4DX')),
    trangThai      VARCHAR(10) DEFAULT 'MOBAN'
                   CHECK (trangThai IN ('MOBAN','DONGBAN','HUYCHIEU')),
    -- Ràng buộc: không trùng lịch trong cùng phòng chiếu
    CONSTRAINT UQ_SuatChieu_PhongTime UNIQUE (phongChieuID, thoiGianBatDau)
);

-- 8. KhachHang
CREATE TABLE KhachHang (
    khachHangID  INT IDENTITY(1,1) PRIMARY KEY,
    hoTen        NVARCHAR(100) NOT NULL,
    email        VARCHAR(150)  NOT NULL UNIQUE,
    soDienThoai  VARCHAR(15)   NOT NULL,
    matKhauHash  VARCHAR(255)  NOT NULL,
    ngaySinh     DATE NULL,
    anhDaiDien   VARCHAR(500) NULL,
    hangThanhVien VARCHAR(15) DEFAULT 'THUONG'
                  CHECK (hangThanhVien IN ('THUONG','BAC','VANG','KIMCUONG')),
    diemTichLuy  INT DEFAULT 0,
    trangThai    BIT DEFAULT 1,
    xacThucEmail BIT DEFAULT 0,
    tokenXacThuc VARCHAR(255) NULL,
    ngayTao      DATETIME DEFAULT GETDATE()
);

-- 9. DatVe
CREATE TABLE DatVe (
    datVeID     INT IDENTITY(1,1) PRIMARY KEY,
    khachHangID INT NOT NULL FOREIGN KEY REFERENCES KhachHang(khachHangID),
    nhanVienID  INT NULL FOREIGN KEY REFERENCES NhanVien(nhanVienID),
    ngayDatVe   DATETIME DEFAULT GETDATE(),
    tongTien    DECIMAL(10,2) NOT NULL,
    tienGiam    DECIMAL(10,2) DEFAULT 0,
    thanhTien   DECIMAL(10,2) NOT NULL,
    trangThai   VARCHAR(15) DEFAULT 'CHOTHANHOAN'
                CHECK (trangThai IN ('CHOTHANHOAN','DATHANHOAN','DAHUY'))
);

-- 10. Ve
CREATE TABLE Ve (
    veID        INT IDENTITY(1,1) PRIMARY KEY,
    datVeID     INT NOT NULL FOREIGN KEY REFERENCES DatVe(datVeID),
    suatChieuID INT NOT NULL FOREIGN KEY REFERENCES SuatChieu(suatChieuID),
    gheID       INT NOT NULL FOREIGN KEY REFERENCES Ghe(gheID),
    giaVeID     INT NOT NULL FOREIGN KEY REFERENCES GiaVe(giaVeID),
    giaThucTe   DECIMAL(10,2) NOT NULL,
    maQR        VARCHAR(500)  NOT NULL UNIQUE,
    trangThai   VARCHAR(15) DEFAULT 'DATHANHOAN'
                CHECK (trangThai IN ('DATHANHOAN','DASUDUNG','DAHUY')),
    -- Ràng buộc: không bán 2 vé cùng ghế trong cùng suất chiếu
    CONSTRAINT UQ_Ve_GheSuat UNIQUE (gheID, suatChieuID)
);

-- 11. ThanhToan
CREATE TABLE ThanhToan (
    thanhToanID      INT IDENTITY(1,1) PRIMARY KEY,
    datVeID          INT NOT NULL FOREIGN KEY REFERENCES DatVe(datVeID),
    phuongThuc       VARCHAR(15) NOT NULL
                     CHECK (phuongThuc IN ('VNPAY','MOMO','ZALOPAY','TIENMAT','THE')),
    soTienThanhToan  DECIMAL(10,2) NOT NULL,
    maGiaoDich       VARCHAR(200) NULL UNIQUE,
    thoiGianThanhToan DATETIME DEFAULT GETDATE(),
    ketQua           VARCHAR(12) DEFAULT 'DANGXULY'
                     CHECK (ketQua IN ('THANHCONG','THATBAI','HOANIEN','DANGXULY')),
    soTienHoan       DECIMAL(10,2) DEFAULT 0,
    thoiGianHoan     DATETIME NULL,
    kenhHoan         VARCHAR(30) NULL
);

-- 12. KhuyenMai
CREATE TABLE KhuyenMai (
    khuyenMaiID      INT IDENTITY(1,1) PRIMARY KEY,
    maKhuyenMai      VARCHAR(30) NOT NULL UNIQUE,
    tenChuongTrinh   NVARCHAR(200) NOT NULL,
    loaiGiam         VARCHAR(10) NOT NULL CHECK (loaiGiam IN ('PHANTRAM','CODINH')),
    giaTriGiam       DECIMAL(10,2) NOT NULL,
    giaTriGiamToiDa  DECIMAL(10,2) NULL,      -- áp dụng khi loaiGiam=PHANTRAM
    dieuKienToiThieu DECIMAL(10,2) DEFAULT 0,
    ngayBatDau       DATE NOT NULL,
    ngayKetThuc      DATE NOT NULL,
    soLuongPhat      INT NULL,                 -- NULL = vô hạn
    soLuongDaDung    INT DEFAULT 0,
    trangThai        BIT DEFAULT 1,
    hangThanhVienYeuCau VARCHAR(15) NULL       -- NULL = áp dụng cho tất cả
);

-- 13. DatVeKhuyenMai (N-N bridge)
CREATE TABLE DatVeKhuyenMai (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    datVeID      INT NOT NULL FOREIGN KEY REFERENCES DatVe(datVeID),
    khuyenMaiID  INT NOT NULL FOREIGN KEY REFERENCES KhuyenMai(khuyenMaiID),
    thoiGianApDung DATETIME DEFAULT GETDATE(),
    tienGiam     DECIMAL(10,2) NOT NULL
);

-- 14. Combo
CREATE TABLE Combo (
    comboID     INT IDENTITY(1,1) PRIMARY KEY,
    tenCombo    NVARCHAR(100) NOT NULL,
    moTa        NVARCHAR(300) NULL,
    gia         DECIMAL(10,2) NOT NULL,
    hinhAnh     VARCHAR(500) NULL,
    trangThai   BIT DEFAULT 1
);

-- 15. DatVeCombo (N-N bridge)
CREATE TABLE DatVeCombo (
    datVeComboID  INT IDENTITY(1,1) PRIMARY KEY,
    datVeID       INT NOT NULL FOREIGN KEY REFERENCES DatVe(datVeID),
    comboID       INT NOT NULL FOREIGN KEY REFERENCES Combo(comboID),
    soLuong       INT NOT NULL DEFAULT 1,
    giaTaiThoiDiem DECIMAL(10,2) NOT NULL
);

-- 16. DanhGia
CREATE TABLE DanhGia (
    danhGiaID   INT IDENTITY(1,1) PRIMARY KEY,
    phimID      INT NOT NULL FOREIGN KEY REFERENCES Phim(phimID),
    khachHangID INT NOT NULL FOREIGN KEY REFERENCES KhachHang(khachHangID),
    soSao       TINYINT NOT NULL CHECK (soSao BETWEEN 1 AND 5),
    noiDung     NVARCHAR(1000) NULL,
    ngayDanhGia DATETIME DEFAULT GETDATE(),
    trangThai   VARCHAR(10) DEFAULT 'HIENTHI'
                CHECK (trangThai IN ('HIENTHI','AN','BAOXAU')),
    -- Mỗi KH chỉ đánh giá 1 lần mỗi phim
    CONSTRAINT UQ_DanhGia_KhachPhim UNIQUE (phimID, khachHangID)
);

-- 17. GheGiuCho (Seat Hold – TTL 10 phút)
CREATE TABLE GheGiuCho (
    giuChoID     INT IDENTITY(1,1) PRIMARY KEY,
    suatChieuID  INT NOT NULL FOREIGN KEY REFERENCES SuatChieu(suatChieuID),
    gheID        INT NOT NULL FOREIGN KEY REFERENCES Ghe(gheID),
    khachHangID  INT NULL FOREIGN KEY REFERENCES KhachHang(khachHangID),
    sessionID    VARCHAR(100) NULL,
    thoiGianGiu  DATETIME DEFAULT GETDATE(),
    thoiGianHetHan DATETIME NOT NULL,
    CONSTRAINT UQ_GheGiuCho_GheSuat UNIQUE (gheID, suatChieuID)
);

-- 18. AuditLog
CREATE TABLE AuditLog (
    logID       INT IDENTITY(1,1) PRIMARY KEY,
    nguoiDungID INT NULL,
    vaiTro      VARCHAR(15) NULL,
    hanhDong    NVARCHAR(200) NOT NULL,
    bangBiAnh   VARCHAR(50) NULL,
    maBiAnh     INT NULL,
    chiTiet     NVARCHAR(MAX) NULL,
    thoiGian    DATETIME DEFAULT GETDATE(),
    diaChiIP    VARCHAR(45) NULL
);
```

### 2.3 – Tạo Indexes tối ưu truy vấn

```sql
-- Tìm phim theo trạng thái (trang chủ, danh sách phim)
CREATE INDEX IX_Phim_TrangThai ON Phim(trangThai);
CREATE INDEX IX_Phim_NgayKhoiChieu ON Phim(ngayKhoiChieu);

-- Tìm suất chiếu theo phim + ngày (lịch chiếu)
CREATE INDEX IX_SuatChieu_PhimNgay ON SuatChieu(phimID, thoiGianBatDau);
CREATE INDEX IX_SuatChieu_Phong ON SuatChieu(phongChieuID, thoiGianBatDau);

-- Kiểm tra ghế còn trống (sơ đồ ghế real-time)
CREATE INDEX IX_Ve_SuatChieu ON Ve(suatChieuID, trangThai);
CREATE INDEX IX_GheGiuCho_HetHan ON GheGiuCho(thoiGianHetHan);

-- Lịch sử đặt vé của khách hàng
CREATE INDEX IX_DatVe_KhachHang ON DatVe(khachHangID, ngayDatVe DESC);

-- Báo cáo doanh thu
CREATE INDEX IX_ThanhToan_ThoiGian ON ThanhToan(thoiGianThanhToan, ketQua);
```

### 2.4 – Stored Procedures quan trọng

```sql
-- SP: Đặt vé (atomic transaction – chống race condition)
CREATE PROCEDURE sp_DatVe
    @khachHangID INT,
    @suatChieuID INT,
    @gheIDs NVARCHAR(MAX),     -- JSON array: "[1,2,3]"
    @giaVeID INT,
    @tienGiam DECIMAL(10,2),
    @sessionID VARCHAR(100)
AS BEGIN
    -- Sử dụng TRANSACTION + SELECT ... WITH (UPDLOCK, ROWLOCK)
    -- Kiểm tra GheGiuCho còn hiệu lực
    -- Kiểm tra Ve chưa bán
    -- INSERT DatVe + Ve + xóa GheGiuCho
    -- Trả về datVeID hoặc lỗi
END

-- SP: Giữ ghế tạm thời (10 phút)
CREATE PROCEDURE sp_GiuCho
    @suatChieuID INT,
    @gheID INT,
    @khachHangID INT NULL,
    @sessionID VARCHAR(100)
AS BEGIN
    -- MERGE vào GheGiuCho (INSERT hoặc UPDATE nếu đã giữ)
    -- Kiểm tra ghế chưa có Ve hợp lệ
    -- Set thoiGianHetHan = GETDATE() + 10 phút
END

-- SP: Cleanup ghế hết hạn (chạy mỗi 1 phút)
CREATE PROCEDURE sp_CleanupGheHetHan
AS BEGIN
    DELETE FROM GheGiuCho WHERE thoiGianHetHan < GETDATE();
END

-- SP: Báo cáo doanh thu (Admin)
CREATE PROCEDURE sp_BaoCaoDoanhThu
    @tuNgay DATE, @denNgay DATE,
    @cumRapID INT NULL,
    @phimID INT NULL
AS BEGIN
    SELECT
        CAST(tt.thoiGianThanhToan AS DATE) AS ngay,
        SUM(tt.soTienThanhToan) AS doanhThu,
        COUNT(dv.datVeID) AS soVe,
        p.tenPhim
    FROM ThanhToan tt
    JOIN DatVe dv ON dv.datVeID = tt.datVeID
    JOIN Ve v ON v.datVeID = dv.datVeID
    JOIN SuatChieu sc ON sc.suatChieuID = v.suatChieuID
    JOIN Phim p ON p.phimID = sc.phimID
    JOIN PhongChieu pc ON pc.phongChieuID = sc.phongChieuID
    WHERE tt.ketQua = 'THANHCONG'
      AND CAST(tt.thoiGianThanhToan AS DATE) BETWEEN @tuNgay AND @denNgay
      AND (@cumRapID IS NULL OR pc.cumRapID = @cumRapID)
      AND (@phimID IS NULL OR sc.phimID = @phimID)
    GROUP BY CAST(tt.thoiGianThanhToan AS DATE), p.tenPhim
    ORDER BY ngay DESC;
END
```

### 2.5 – Dữ liệu mẫu (Seed Data) – PHẢI CÓ DATA THẬT

```sql
-- ===== CỤM RẠP (3 cụm rạp thực tế tại Đà Nẵng) =====
INSERT INTO CumRap (tenCumRap, diaChi, thanhPho, soDienThoai) VALUES
(N'CineMax Vincom Center', N'910 Ngô Quyền, Phước Mỹ, Sơn Trà', N'Đà Nẵng', '02363999888'),
(N'CineMax Lotte Mart', N'6 Nại Nam, Hòa Cường Bắc, Hải Châu', N'Đà Nẵng', '02363888777'),
(N'CineMax Big C', N'255-257 Hùng Vương, Vĩnh Trung, Thanh Khê', N'Đà Nẵng', '02363777666');

-- ===== PHÒNG CHIẾU (mỗi cụm có 4-6 phòng) =====
-- Cụm 1: 5 phòng
INSERT INTO PhongChieu (cumRapID, tenPhong, loaiPhong, tongSoGhe, soHang, soCot) VALUES
(1, N'Screen 1 - 2D', '2D', 120, 10, 12),
(1, N'Screen 2 - 3D', '3D', 100, 10, 10),
(1, N'IMAX Hall', 'IMAX', 200, 16, 14),
(1, N'Screen 4 - 2D', '2D', 80, 8, 10),
(1, N'VIP Lounge', '2D', 40, 4, 10);

-- ===== GHẾ (sinh ghế cho từng phòng) =====
-- Screen 1 (phongChieuID=1): 10 hàng A-J, mỗi hàng 12 ghế
-- Hàng A-G: THUONG, Hàng H-I: VIP, Hàng J: DOI (6 ghế đôi)
DECLARE @hang CHAR(1), @so INT;
-- (Code sinh ghế đầy đủ cho tất cả phòng)

-- ===== TÀI KHOẢN ADMIN & NHÂN VIÊN =====
-- Admin: admin@cinemax.vn / Admin@123456
INSERT INTO NhanVien (hoTen, email, matKhauHash, vaiTro, cumRapID) VALUES
(N'Nguyễn Quốc Nhật Phong', 'admin@cinemax.vn',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhcanFTsIpCfnB3k7AVHB2', 'ADMIN', NULL),
(N'Lê Văn Gia Bảo', 'staff1@cinemax.vn',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhcanFTsIpCfnB3k7AVHB2', 'STAFF', 1),
(N'Nguyễn Ngọc Bảo Duy', 'staff2@cinemax.vn',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhcanFTsIpCfnB3k7AVHB2', 'STAFF', 2);
-- password gốc: Admin@123456 (hash bcrypt cost 12)

-- ===== TÀI KHOẢN KHÁCH HÀNG MẪU =====
INSERT INTO KhachHang (hoTen, email, soDienThoai, matKhauHash, hangThanhVien, diemTichLuy, xacThucEmail) VALUES
(N'Trần Minh Khoa', 'khoa@gmail.com', '0901234567',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhcanFTsIpCfnB3k7AVHB2', 'VANG', 1500, 1),
(N'Nguyễn Thị Mai', 'mai@gmail.com', '0912345678',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhcanFTsIpCfnB3k7AVHB2', 'THUONG', 200, 1);

-- ===== PHIM MẪU (10 phim thực tế 2025) =====
INSERT INTO Phim (tenPhim, theLoai, thoiLuong, nhanDoTuoi, ngonNgu, tenDaoDien, tenDienVien,
                  ngayKhoiChieu, moTa, trangThai, dinhDangHoTro) VALUES
(N'The Fantastic Four: First Steps', N'Hành động, Khoa học viễn tưởng', 130, 'P',
 N'Tiếng Anh (phụ đề Việt, lồng tiếng Việt)',
 N'Matt Shakman',
 N'Pedro Pascal, Vanessa Kirby, Joseph Quinn, Ebon Moss-Bachrach',
 '2025-07-25',
 N'Bộ tứ siêu đẳng – Reed Richards, Sue Storm, Johnny Storm và Ben Grimm – lần đầu tiên ra mắt vũ trụ điện ảnh Marvel. Họ phải đối mặt với Galactus, kẻ tiêu thụ hành tinh, trong một cuộc chiến sinh tồn quyết định số phận Trái Đất.',
 'DANGCHIEU', '2D,3D,IMAX'),
(N'Jurassic World: Rebirth', N'Phiêu lưu, Hành động', 125, 'C13',
 N'Tiếng Anh (phụ đề Việt)',
 N'Gareth Edwards',
 N'Scarlett Johansson, Jonathan Bailey, Mahershala Ali',
 '2025-07-02',
 N'Một đội thám hiểm liều lĩnh thực hiện nhiệm vụ bí mật trên hòn đảo đầy khủng long nguy hiểm, nơi các loài bò sát khổng lồ đã tiến hóa theo những cách không ai ngờ tới.',
 'DANGCHIEU', '2D,3D'),
(N'Mission: Impossible – The Final Reckoning', N'Hành động, Gián điệp', 169, 'C13',
 N'Tiếng Anh (phụ đề Việt, lồng tiếng Việt)',
 N'Christopher McQuarrie',
 N'Tom Cruise, Hayley Atwell, Ving Rhames, Simon Pegg',
 '2025-05-21',
 N'Ethan Hunt và đội IMF đối mặt với mối đe dọa AI tự kiểm soát trong nhiệm vụ quyết định số phận nhân loại. Hành động không ngừng nghỉ với những pha mạo hiểm đỉnh cao.',
 'DANGCHIEU', '2D,3D,IMAX'),
(N'Lilo & Stitch', N'Hoạt hình, Gia đình', 108, 'P',
 N'Tiếng Anh (lồng tiếng Việt)',
 N'Dean Fleischer Camp',
 N'Sydney Elizebeth Agudong, Zach Galifianakis, Billy Magnussen',
 '2025-05-21',
 N'Phiên bản live-action của bộ phim hoạt hình kinh điển 2002. Cô bé Lilo người Hawaii kết bạn với sinh vật ngoài hành tinh Stitch, mở ra hành trình tìm kiếm ý nghĩa của gia đình và tình yêu thương.',
 'DANGCHIEU', '2D'),
(N'Superman', N'Hành động, Siêu anh hùng', 140, 'C13',
 N'Tiếng Anh (phụ đề Việt)',
 N'James Gunn',
 N'David Corenswet, Rachel Brosnahan, Nicholas Hoult',
 '2025-07-11',
 N'Phiên bản Superman hoàn toàn mới của vũ trụ DC. Clark Kent đấu tranh để cân bằng cuộc sống của một nhà báo bình thường với trách nhiệm của người anh hùng mạnh nhất thế giới.',
 'DANGCHIEU', '2D,3D,IMAX'),
(N'Hậu Duệ Mặt Trời 2025', N'Tình cảm, Hành động', 118, 'C13',
 N'Tiếng Việt',
 N'Lý Minh Thắng',
 N'Việt Anh, Lan Phương, Thái Hòa',
 '2025-08-01',
 N'Phiên bản Việt hóa của siêu phẩm Hàn Quốc. Câu chuyện tình yêu giữa đội trưởng đặc nhiệm và bác sĩ quân y trong vùng chiến sự, nơi mỗi giây phút bên nhau đều có thể là lần cuối.',
 'SAPCHIEU', '2D'),
(N'Despicable Me 4', N'Hoạt hình, Hài hước', 94, 'P',
 N'Tiếng Anh (lồng tiếng Việt)',
 N'Chris Renaud',
 N'Steve Carell, Kristen Wiig, Will Ferrell',
 '2025-08-15',
 N'Gru và gia đình tiếp tục những cuộc phiêu lưu hài hước cùng đội quân Minion trong phần 4 của series hoạt hình ăn khách toàn cầu.',
 'SAPCHIEU', '2D,3D'),
(N'Avengers: Doomsday', N'Hành động, Siêu anh hùng', 165, 'C13',
 N'Tiếng Anh (phụ đề Việt, lồng tiếng Việt)',
 N'Anh Chị Em Russo',
 N'Robert Downey Jr, Chris Evans, Benedict Cumberbatch, Tom Holland',
 '2025-11-07',
 N'Tiến sĩ Doom thực hiện kế hoạch kiểm soát toàn bộ đa vũ trụ. Các siêu anh hùng từ khắp nơi trong đa vũ trụ Marvel phải đoàn kết trong trận chiến định mệnh nhất lịch sử.',
 'SAPCHIEU', '2D,3D,IMAX');

-- ===== COMBO =====
INSERT INTO Combo (tenCombo, moTa, gia, trangThai) VALUES
(N'Combo 1 (1 Bắp Lớn + 1 Pepsi Lớn)',
 N'1 bắp rang bơ size lớn (128oz) + 1 Pepsi size lớn (32oz)', 79000, 1),
(N'Combo 2 (2 Bắp Vừa + 2 Pepsi Vừa)',
 N'2 bắp rang bơ size vừa (64oz) + 2 Pepsi size vừa (22oz)', 139000, 1),
(N'Combo 3 (1 Bắp Lớn + 1 Hot Dog + 1 Pepsi Lớn)',
 N'1 bắp rang bơ size lớn + 1 hot dog nguyên bản + 1 Pepsi size lớn', 109000, 1),
(N'Combo 4 – Gia Đình (2 Bắp Lớn + 4 Pepsi Vừa)',
 N'2 bắp rang bơ size lớn + 4 Pepsi size vừa – tiết kiệm 30%', 219000, 1);

-- ===== BẢNG GIÁ VÉ =====
-- Giờ Sáng (trước 12h): SANG | Chiều (12h-18h): CHIEU | Tối (18h-22h): TOI | Khuya (sau 22h): KHUYA
INSERT INTO GiaVe (loaiGhe, dinhDang, khungGio, ngayLoai, giaTien, ngayHieuLuc) VALUES
-- 2D - Thường - Thứ thường
('THUONG', '2D', 'SANG', 'THUATHUONG', 75000, '2025-01-01'),
('THUONG', '2D', 'CHIEU', 'THUATHUONG', 90000, '2025-01-01'),
('THUONG', '2D', 'TOI', 'THUATHUONG', 105000, '2025-01-01'),
('THUONG', '2D', 'KHUYA', 'THUATHUONG', 120000, '2025-01-01'),
-- 2D - Thường - Cuối tuần/lễ
('THUONG', '2D', 'SANG', 'CUOITUAN', 85000, '2025-01-01'),
('THUONG', '2D', 'CHIEU', 'CUOITUAN', 100000, '2025-01-01'),
('THUONG', '2D', 'TOI', 'CUOITUAN', 120000, '2025-01-01'),
('THUONG', '2D', 'KHUYA', 'CUOITUAN', 135000, '2025-01-01'),
-- VIP - 2D
('VIP', '2D', 'SANG', 'THUATHUONG', 120000, '2025-01-01'),
('VIP', '2D', 'TOI', 'THUATHUONG', 160000, '2025-01-01'),
('VIP', '2D', 'TOI', 'CUOITUAN', 180000, '2025-01-01'),
-- 3D
('THUONG', '3D', 'SANG', 'THUATHUONG', 110000, '2025-01-01'),
('THUONG', '3D', 'TOI', 'THUATHUONG', 140000, '2025-01-01'),
('THUONG', '3D', 'TOI', 'CUOITUAN', 160000, '2025-01-01'),
-- IMAX
('THUONG', 'IMAX', 'SANG', 'THUATHUONG', 180000, '2025-01-01'),
('THUONG', 'IMAX', 'TOI', 'THUATHUONG', 220000, '2025-01-01'),
('THUONG', 'IMAX', 'TOI', 'CUOITUAN', 250000, '2025-01-01');

-- ===== SUẤT CHIẾU MẪU (7 ngày tới) =====
-- (Script sinh suất chiếu tự động cho 7 ngày, tất cả phim đang chiếu)

-- ===== KHUYẾN MÃI =====
INSERT INTO KhuyenMai (maKhuyenMai, tenChuongTrinh, loaiGiam, giaTriGiam, dieuKienToiThieu,
                       ngayBatDau, ngayKetThuc, soLuongPhat) VALUES
('CINEMAX25', N'Giảm 25% nhân dịp khai trương', 'PHANTRAM', 25, 100000,
 '2025-01-01', '2025-12-31', 1000),
('WELCOME50K', N'Ưu đãi 50.000đ cho khách mới', 'CODINH', 50000, 150000,
 '2025-01-01', '2025-12-31', 500),
('VANGMEMBER', N'Ưu đãi thành viên Vàng – giảm 15%', 'PHANTRAM', 15, 200000,
 '2025-01-01', '2025-12-31', NULL);
```

---

# ═══════════════════════════════════════════════════════════
# PHẦN 3: BACKEND – ENTITY, DAO, SERVICE, UTILITY
# ═══════════════════════════════════════════════════════════

## NHIỆM VỤ PHẦN 3

Viết toàn bộ Java code cho tầng Model (Entity → DAO → Service → Util).  
**Yêu cầu bắt buộc:**
- Tất cả dùng `jakarta.*` package (KHÔNG dùng `javax.*`)
- DAO dùng `PreparedStatement` 100% – TUYỆT ĐỐI không string concat SQL
- Tất cả Connection lấy từ `DBConnection.getConnection()` (từ pool DBCP2)
- Đóng Connection/Statement/ResultSet trong `finally` block hoặc try-with-resources
- Tất cả exception phải log ra console với timestamp + class name

### 3.1 – Entity Classes (18 class)

Mỗi entity:
- POJO với private fields khớp đúng tên cột SQL (camelCase)
- Constructor đầy đủ + constructor rỗng
- Getter/Setter đầy đủ
- `toString()` override cho debug
- `equals()` và `hashCode()` dựa trên ID field

**Ví dụ chuẩn cho `Phim.java`:**
```java
package com.cinemax.entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Phim {
    private int phimID;
    private String tenPhim;
    private String theLoai;
    private int thoiLuong;
    private String nhanDoTuoi;
    private String ngonNgu;
    private String dinhDangHoTro;
    private String tenDaoDien;
    private String tenDienVien;
    private String nuocSanXuat;
    private LocalDate ngayKhoiChieu;
    private String moTa;
    private String posterURL;
    private String trailerURL;
    private String trangThai;
    private LocalDateTime ngayTao;
    // Transient fields (không có trong DB, tính toán)
    private double diemDanhGiaTraungBinh;
    private int soLuongDanhGia;
    // ... full getters/setters/constructors
}
```

### 3.2 – DAO Classes (17 class)

**Viết đầy đủ cho từng DAO. Ví dụ PhimDAO phải có:**

```java
package com.cinemax.dao;

public class PhimDAO {
    // CRUD cơ bản
    public List<Phim> findAll();
    public Phim findByID(int phimID);
    public int insert(Phim phim);      // trả về ID mới
    public boolean update(Phim phim);
    public boolean delete(int phimID); // soft delete: trangThai=NGUNGCHIEU
    
    // Tìm kiếm đặc thù
    public List<Phim> findByTrangThai(String trangThai);  // DANGCHIEU, SAPCHIEU
    public List<Phim> searchByKeyword(String keyword);    // LIKE %keyword% trên tenPhim, tenDaoDien, tenDienVien
    public List<Phim> findByTheLoai(String theLoai);
    public List<Phim> findDangChieuPaginaed(int page, int pageSize);
    public double getDiemDanhGiaTrungBinh(int phimID);
    public int getSoLuongDanhGia(int phimID);
    public List<Phim> findTopPhimDoanhThu(int limit);     // cho trang chủ
}
```

**Tương tự, viết đầy đủ cho:**
- `SuatChieuDAO`: findByPhimAndDate(), findByPhongChieu(), checkXungDotLichChieu()
- `GheDAO`: findByPhongChieu(), findAvailableByShowtime(suatChieuID) – JOIN với Ve và GheGiuCho
- `DatVeDAO`: findByKhachHang(), create() với transaction
- `VeDAO`: findByDatVe(), findByMaQR(), updateTrangThai()
- `GheGiuChoDAO`: insert(), deleteExpired(), deleteBySession()
- `ThanhToanDAO`: findByDatVe(), create(), updateKetQua()
- `KhachHangDAO`: findByEmail(), create(), updateDiemTichLuy(), findByToken()
- `KhuyenMaiDAO`: findByMaKM(), validateAndApply()

### 3.3 – Service Classes (9 class)

**`BookingService.java` – Service quan trọng nhất, phải có:**

```java
package com.cinemax.service;

public class BookingService {
    
    // Lấy sơ đồ ghế: trả về List<GheStatus> với trạng thái mỗi ghế
    // THUONG/VIP/DOI + TRONG/DATVE/DANGGIU/HONG
    public List<GheStatus> getSeatMap(int suatChieuID, String sessionID);
    
    // Giữ ghế tạm thời (gọi khi khách click chọn ghế)
    // Gọi stored procedure sp_GiuCho
    // Trả về: SUCCESS, SEAT_TAKEN, SEAT_HOLD_BY_OTHER, ERROR
    public String holdSeat(int suatChieuID, int gheID, int khachHangID, String sessionID);
    
    // Hủy giữ ghế (khi bỏ chọn hoặc timeout)
    public boolean releaseHold(int suatChieuID, int gheID, String sessionID);
    
    // Tạo đơn đặt vé (sau khi chọn xong và trước khi thanh toán)
    // Validates: ghế còn giữ? KM hợp lệ? Giá đúng?
    // INSERT DatVe + Ve (dùng transaction)
    public int createBooking(BookingRequest request); // trả về datVeID
    
    // Tính tổng tiền (ghế + combo - KM)
    public PriceCalculation calculatePrice(
        List<Integer> gheIDs, int suatChieuID,
        List<ComboItem> combos, String maKhuyenMai);
    
    // Hủy vé (khách chủ động, trước giờ chiếu 45p)
    public boolean cancelBooking(int datVeID, int khachHangID);
}
```

**`AuthService.java`:**
```java
public class AuthService {
    public KhachHang register(RegisterRequest req);  // hash pass, gửi email verify
    public KhachHang login(String email, String password);
    public NhanVien loginStaff(String email, String password);
    public boolean verifyEmail(String token);
    public boolean forgotPassword(String email);     // gửi reset link
    public boolean resetPassword(String token, String newPassword);
    public boolean changePassword(int khachHangID, String oldPass, String newPass);
}
```

**`PaymentService.java`:**
```java
public class PaymentService {
    public String createVNPayUrl(int datVeID, String ipAddress);
    public boolean verifyVNPayReturn(Map<String,String> params);
    public boolean handleVNPayIPN(Map<String,String> params);
    public String createMoMoUrl(int datVeID);
    public boolean handleMoMoCallback(String rawBody);
    public boolean processRefund(int thanhToanID, double soTienHoan);
    public ThanhToan getByDatVeID(int datVeID);
}
```

**`AIService.java` (gọi Google Gemini API):**
```java
public class AIService {
    // Chatbot: nhận câu hỏi người dùng, trả lời bằng tiếng Việt
    // System prompt: "Bạn là trợ lý AI của CineMax Cineplex..."
    // Gọi Gemini 2.0 Flash qua OkHttp
    public String chatbot(String userMessage, List<Phim> currentMovies);
    
    // Gợi ý phim dựa trên lịch sử xem + thể loại yêu thích
    public List<Phim> recommendMovies(int khachHangID, List<Phim> allMovies);
    
    // Tóm tắt phim không spoiler
    public String summarizeMovie(Phim phim);
}
```

**`EmailService.java` (Jakarta Mail 2.1):**
```java
public class EmailService {
    // Gửi email xác thực tài khoản (kèm link token)
    public void sendVerificationEmail(String toEmail, String hoTen, String token);
    
    // Gửi email xác nhận đặt vé (kèm ảnh QR code base64)
    public void sendBookingConfirmation(DatVe datVe, List<Ve> ves, byte[] qrImage);
    
    // Gửi email đặt lại mật khẩu
    public void sendPasswordResetEmail(String toEmail, String hoTen, String token);
    
    // Gửi email thông báo hủy suất chiếu cho khách đã đặt vé
    public void sendShowtimeCancellationNotice(String toEmail, SuatChieu sc);
}
```

### 3.4 – Utility Classes

**`QRCodeUtil.java`:**
```java
// Dùng ZXing com.google.zxing
// generateQRCodeImage(String content, int width, int height) → byte[]
// Content format: "CINEMAX-VE-{veID}-{maQR}-{suatChieuID}-{gheID}"
// Trả byte[] PNG để nhúng vào email hoặc hiển thị base64 trong JSP
```

**`VNPayUtil.java`:**
```java
// Tạo URL thanh toán VNPay sandbox với đủ parameters:
// vnp_Version, vnp_Command, vnp_TmnCode, vnp_Amount (×100),
// vnp_CurrCode=VND, vnp_TxnRef, vnp_OrderInfo, vnp_OrderType=other,
// vnp_Locale=vn, vnp_ReturnUrl, vnp_IpAddr, vnp_CreateDate, vnp_ExpireDate
// Ký HMAC-SHA512
public String buildPaymentUrl(int datVeID, long amount, String ipAddress, String orderInfo);
public boolean verifySignature(Map<String,String> params, String secretKey);
```

**`GeminiUtil.java`:**
```java
// Gọi Google Gemini 2.0 Flash API qua OkHttp
// POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY
// Request body JSON: { "contents": [{"parts": [{"text": "..."}]}] }
// Parse response: data.candidates[0].content.parts[0].text
// Timeout: connect=10s, read=30s
// Retry 1 lần nếu lỗi 503
public String generate(String systemPrompt, String userMessage);
```

### 3.5 – Filters

**`AuthFilter.java`:**
```java
// Bảo vệ: /booking/*, /member/*, /ai/*
// Kiểm tra session "khachHang" != null
// Nếu chưa đăng nhập → redirect /auth/login?returnUrl={encodedURL}
```

**`RBACFilter.java`:**
```java
// Bảo vệ: /staff/* → yêu cầu session "nhanVien" với vaiTro=STAFF hoặc ADMIN
// Bảo vệ: /admin/* → yêu cầu vaiTro=ADMIN
// Không đủ quyền → redirect /auth/login?error=unauthorized
```

---

# ═══════════════════════════════════════════════════════════
# PHẦN 4: CONTROLLER – SERVLET LAYER
# ═══════════════════════════════════════════════════════════

## NHIỆM VỤ PHẦN 4

Viết đầy đủ 10 Servlet. Mỗi Servlet dùng `@WebServlet` annotation.  
**Pattern xử lý chuẩn:**
```java
@WebServlet("/booking/*")
public class BookingServlet extends HttpServlet {
    private BookingService bookingService = new BookingService();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        String pathInfo = req.getPathInfo(); // /seat-map, /combo, etc.
        if (pathInfo == null || pathInfo.equals("/")) {
            // show booking step 1
        } else switch (pathInfo) {
            case "/seat-map"   -> showSeatMap(req, resp);
            case "/combo"      -> showCombo(req, resp);
            case "/payment"    -> showPayment(req, resp);
            default            -> resp.sendError(404);
        }
    }
}
```

### 4.1 – `HomeServlet.java` (@WebServlet("/"))
- GET `/`: Load phim đang chiếu (top 8), phim sắp chiếu (top 4), banner
- Set attributes: `currentMovies`, `comingSoonMovies`, `banners`
- Forward → `/WEB-INF/views/home/index.jsp`

### 4.2 – `AuthServlet.java` (@WebServlet("/auth/*"))
- GET `/auth/login` → show login form
- POST `/auth/login` → validate → set session `khachHang` → redirect returnUrl
- GET `/auth/register` → show register form
- POST `/auth/register` → validate → AuthService.register() → redirect verify
- GET `/auth/verify-email?token=` → AuthService.verifyEmail() → redirect login
- GET `/auth/forgot-password` → show forgot form
- POST `/auth/forgot-password` → AuthService.forgotPassword() → show success
- GET `/auth/reset-password?token=` → show reset form
- POST `/auth/reset-password` → AuthService.resetPassword()
- GET `/auth/logout` → invalidate session → redirect /

### 4.3 – `MovieServlet.java` (@WebServlet("/movies/*"))
- GET `/movies` → danh sách phim (filter: trangThai, theLoai, rạp, ngày, format)
- GET `/movies/{phimID}` → chi tiết phim + lịch chiếu 7 ngày + đánh giá
- GET `/movies/search?q=` → tìm kiếm autocomplete (trả JSON)
- POST `/movies/{phimID}/review` → submit đánh giá (yêu cầu đăng nhập + đã xem)

### 4.4 – `ScheduleServlet.java` (@WebServlet("/schedule/*"))
- GET `/schedule?phimID=&date=` → lịch chiếu theo phim và ngày
- GET `/schedule/cinema?cumRapID=&date=` → lịch chiếu theo rạp

### 4.5 – `BookingServlet.java` (@WebServlet("/booking/*"))
- GET `/booking/showtime?suatChieuID=` → bước 1: xác nhận suất chiếu
- GET `/booking/seat-map?suatChieuID=` → bước 2: sơ đồ ghế
- **POST `/booking/hold-seat` → giữ ghế (AJAX JSON)**
  - Request: `{suatChieuID, gheID, action: "hold"|"release"}`
  - Response JSON: `{success: true/false, message: "...", heldSeats: [...]}`
- **GET `/booking/seat-status?suatChieuID=` → polling real-time (AJAX JSON)**
  - Response JSON: array ghế với trạng thái hiện tại
- GET `/booking/combo?suatChieuID=&gheIDs=` → bước 3: chọn combo
- GET `/booking/payment?datVeID=` → bước 4: chọn PTTT
- POST `/booking/confirm` → tạo DatVe (gọi BookingService.createBooking())
- POST `/booking/cancel?datVeID=` → hủy vé

### 4.6 – `PaymentServlet.java` (@WebServlet("/payment/*"))
- POST `/payment/process` → redirect sang VNPay/MoMo/ZaloPay/TienMat
- GET `/payment/vnpay-return` → verify chữ ký → cập nhật DB → show kết quả
- POST `/payment/vnpay-ipn` → verify IPN → cập nhật DB → "00" response
- GET `/payment/momo-return` → tương tự VNPay
- POST `/payment/momo-ipn` → tương tự VNPay
- GET `/payment/success?datVeID=` → show trang thành công + QR
- GET `/payment/failed?datVeID=` → show trang thất bại

### 4.7 – `AIServlet.java` (@WebServlet("/ai/*"))
- **POST `/ai/chat` → Chatbot (AJAX JSON)**
  - Request: `{message: "Hôm nay có phim nào hay?"}`
  - Gọi AIService.chatbot() với context phim đang chiếu
  - Response JSON: `{reply: "...", suggestions: [{phimID, tenPhim}]}`
- **GET `/ai/recommend?khachHangID=` → gợi ý phim (AJAX JSON)**
- **POST `/ai/summarize` → tóm tắt phim (AJAX JSON)**
  - Request: `{phimID: 123}`

### 4.8 – `MemberServlet.java` (@WebServlet("/member/*"))
- GET `/member/profile` → hồ sơ cá nhân
- POST `/member/profile` → cập nhật thông tin
- POST `/member/change-password` → đổi mật khẩu
- GET `/member/tickets` → lịch sử đặt vé (phân trang)
- GET `/member/ticket/{datVeID}` → chi tiết vé + hiển thị QR
- GET `/member/loyalty` → thẻ thành viên + điểm tích lũy

### 4.9 – `StaffServlet.java` (@WebServlet("/staff/*"))
- GET `/staff/dashboard` → tổng quan ca làm việc
- GET `/staff/sell-ticket` → bán vé tại quầy (chọn phim → suất → ghế → combo → TT)
- POST `/staff/sell-ticket/confirm` → tạo đơn + thanh toán tiền mặt
- GET `/staff/scan-qr` → trang quét QR
- **POST `/staff/scan-qr/verify` → xác thực QR (AJAX JSON)**
  - Request: `{maQR: "CINEMAX-VE-123-..."}`
  - Response JSON: `{valid: true/false, veInfo: {...}, message: "..."}`
- GET + POST `/staff/movies` → CRUD phim
- GET + POST `/staff/schedules` → CRUD lịch chiếu
- GET + POST `/staff/promotions` → CRUD khuyến mãi
- GET `/staff/report` → báo cáo ca làm việc

### 4.10 – `AdminServlet.java` (@WebServlet("/admin/*"))
- GET `/admin/dashboard` → KPI tổng quan (doanh thu hôm nay, vé bán, tỷ lệ lấp đầy)
- GET + POST `/admin/cinema` → CRUD cụm rạp
- GET + POST `/admin/room` → CRUD phòng chiếu + cấu hình ghế
- GET + POST `/admin/staff` → CRUD nhân viên + phân quyền
- GET + POST `/admin/users` → quản lý khách hàng (khóa/mở khóa)
- GET + POST `/admin/pricing` → bảng giá vé
- GET + POST `/admin/promotion` → quản lý khuyến mãi
- **GET `/admin/revenue-report` → báo cáo doanh thu (filter ngày/rạp/phim)**
- GET `/admin/movie-stats` → thống kê phim (occupancy rate, top phim)
- GET + POST `/admin/banner` → quản lý banner trang chủ
- GET + POST `/admin/review` → duyệt đánh giá
- GET `/admin/audit-log` → nhật ký hoạt động

---

# ═══════════════════════════════════════════════════════════
# PHẦN 5: FRONTEND – GIAO DIỆN KHÁCH HÀNG (JSP + CSS + JS)
# ═══════════════════════════════════════════════════════════

## CONTEXT GIAO DIỆN

**Tham khảo thiết kế từ:** CGV Vietnam (cgv.vn), Galaxy Cinema (galaxycine.vn), BHD Star (bhdstar.vn), Lotte Cinema (lottecinemavn.com).

**Design System CineMax:**
```
Color Palette:
  --primary:     #E50914   ← Đỏ Netflix-style (màu chủ đạo rạp phim)
  --primary-dark: #B81D24
  --secondary:   #141414   ← Nền tối (cinema dark theme)
  --surface:     #1E1E1E   ← Card/section background
  --surface-light: #2A2A2A
  --accent:      #F5C518   ← Vàng IMDb (rating, highlights)
  --text-primary: #FFFFFF
  --text-secondary: #B3B3B3
  --success:     #2ECC71
  --warning:     #F39C12
  --danger:      #E74C3C
  --seat-empty:  #4CAF50   ← Ghế trống (xanh lá)
  --seat-taken:  #E50914   ← Ghế đã đặt (đỏ)
  --seat-hold:   #FFC107   ← Ghế đang giữ (vàng)
  --seat-vip:    #9C27B0   ← Ghế VIP (tím)
  --seat-couple: #FF6B6B   ← Ghế đôi (hồng)
  --seat-selected: #2196F3 ← Ghế đang chọn (xanh dương)

Typography:
  Display font: 'Bebas Neue', sans-serif  ← Tiêu đề phim, hero section
  Body font: 'Inter', sans-serif          ← Nội dung, UI text
  Font sizes: 12px/14px/16px/18px/24px/32px/48px

Border radius: 4px (button), 8px (card), 12px (modal), 50px (badge)
Shadow: 0 4px 20px rgba(0,0,0,0.5)
Transition: all 0.2s ease
```

## NHIỆM VỤ PHẦN 5

### 5.1 – `assets/css/main.css`

Viết CSS đầy đủ cho toàn bộ website khách hàng:

**Cấu trúc CSS:**
```css
/* 1. CSS Variables (Design Tokens) */
/* 2. Reset & Base */
/* 3. Navbar */
/* 4. Hero / Banner slider */
/* 5. Movie Cards */
/* 6. Booking Progress Steps */
/* 7. Seat Map */
/* 8. Combo Cards */
/* 9. Payment Section */
/* 10. Member Card */
/* 11. Chatbot Widget */
/* 12. Footer */
/* 13. Responsive Breakpoints */
/* 14. Animations & Transitions */
```

**Navbar phải giống CGV.vn:**
- Background: `#141414` với border-bottom `1px solid #2A2A2A`
- Logo trái, nav links giữa/phải, user avatar + đăng nhập
- Sticky top khi scroll
- Có dropdown mega-menu khi hover "Phim"
- Mobile: hamburger menu

**Hero Banner (trang chủ):**
- Full-width slider với ảnh backdrop phim
- Overlay gradient `linear-gradient(to right, rgba(0,0,0,0.9) 40%, transparent)`
- Thông tin phim: tên, thể loại, rating, nút "Mua vé ngay"
- Auto-play 5 giây, có dots indicator

**Movie Cards:**
```
┌──────────────────┐
│                  │
│   [POSTER IMG]   │  ← 2:3 ratio, object-fit: cover
│   [AGE BADGE]    │  ← P/C13/C16/C18 overlay góc trên trái
│                  │
├──────────────────┤
│ TÊN PHIM         │  ← Font Bebas Neue, 16px
│ Thể loại • 120p  │  ← Text-secondary, 12px
│ ★ 4.5  2D | 3D  │  ← Rating vàng + badge format
│ [Mua vé] [Trailer]│  ← 2 buttons
└──────────────────┘
```

**Hover effect**: scale(1.03) + shadow + show overlay với synopsis ngắn

### 5.2 – `assets/css/seat-map.css`

```css
/* Sơ đồ ghế theo chuẩn CGV */
.screen-area { /* màn hình chiếu perspective 3D */ }
.seat-grid { /* CSS Grid: auto-fill ghế */ }
.seat { /* 36px × 36px, border-radius 4px */ }
.seat.thuong { background: var(--seat-empty); }
.seat.vip { background: #9C27B0; border: 2px solid gold; }
.seat.doi { width: 72px; /* ghế đôi rộng gấp đôi */ }
.seat.taken { background: var(--seat-taken); cursor: not-allowed; }
.seat.hold { background: var(--seat-hold); animation: pulse 1.5s infinite; }
.seat.selected { background: var(--seat-selected); transform: scale(1.1); }
.seat:hover:not(.taken):not(.hold) { filter: brightness(1.3); }
.seat-legend { /* chú thích ghế */ }
.booking-timer { /* đếm ngược 10 phút: đỏ nháy khi < 2 phút */ }
```

### 5.3 – Trang JSP đầy đủ

**`/WEB-INF/views/common/header.jsp`:**
```jsp
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<!-- Navbar Bootstrap 5 dark theme -->
<!-- Logo CineMax -->
<!-- Nav: Phim đang chiếu | Sắp chiếu | Rạp chiếu | Khuyến mãi -->
<!-- Right: Tìm kiếm | Thông báo | Avatar + dropdown (Hồ sơ, Vé của tôi, Đăng xuất) -->
<!-- Chatbot widget trigger button (góc phải dưới) -->
```

**`/WEB-INF/views/home/index.jsp` – TRANG CHỦ:**

Cấu trúc theo đúng CGV/Galaxy:
```
1. HERO BANNER SLIDER (3-5 phim nổi bật)
   - Ảnh backdrop full width
   - Thông tin phim + nút Mua vé ngay
   - Auto-play 5 giây

2. PHIM ĐANG CHIẾU
   - Tiêu đề section + nút "Xem tất cả"
   - Grid 4 cột (desktop), 2 cột (mobile)
   - Tối thiểu 8 phim
   - Filter tabs: Tất cả | 2D | 3D | IMAX

3. PHIM SẮP CHIẾU
   - Horizontal scroll carousel (như CGV)
   - 4-6 phim
   - Badge "Sắp ra mắt" + ngày chiếu

4. KHUYẾN MÃI & ƯU ĐÃI
   - Grid 3 cột với ảnh banner KM
   - Click → trang chi tiết KM

5. AI MOVIE RECOMMENDATION (nếu đã đăng nhập)
   - Section "Gợi ý cho bạn" từ Gemini AI
   - 4 phim được gợi ý

6. THÔNG TIN THÀNH VIÊN (nếu đã đăng nhập)
   - Mini loyalty card: hạng, điểm, progress bar

7. FOOTER
   - 4 cột: Về CineMax | Hỗ trợ | Liên hệ | Mạng xã hội
   - Copyright + hotline 1900 6017
```

**`/WEB-INF/views/booking/seat-map.jsp` – CHỌN GHẾ:**

```
┌─────────────────────────────────────────────────────────┐
│  STEP INDICATOR: [1. Chọn suất] [2. Chọn ghế ●] [3. Combo] [4. TT] │
├─────────────────────────────────────────────────────────┤
│ Thông tin suất: [Poster nhỏ] TÊN PHIM | Rạp | Ngày giờ │
│                 IMAX | 2 giờ 20 phút | Phòng IMAX Hall  │
├──────────────────────────────────────────┬──────────────┤
│          MÀN HÌNH CHIẾU (3D view)        │   ĐƠN HÀNG   │
│                                          │ Suất: 19:30  │
├──────────────────────────────────────────┤ 24/06/2025   │
│     SƠ ĐỒ GHẾ (render từ DB real-time)  │              │
│                                          │ Ghế đã chọn: │
│  A  [ ][ ][ ][ ]  [_][_]  [ ][ ][ ][ ] │ C5 (VIP)     │
│  B  [ ][ ][ ][ ]  [_][_]  [ ][ ][ ][ ] │ C6 (VIP)     │
│  C  [■][■][■][■]  [_][_]  [ ][ ][ ][ ] │              │
│  D  [●][●][ ][ ]  [_][_]  [●][ ][ ][ ] │ Tạm tính:    │
│     (●=đã đặt đỏ, ■=đang chọn xanh)    │ 2 × 160.000đ │
│                                          │ = 320.000đ   │
│  CHÚ THÍCH:                              │              │
│  [■] Bạn chọn  [■] Đã đặt  [■] Đang giữ│ [Tiếp tục →] │
│  [■] Trống VIP  [■] Trống  [■] Ghế đôi  │              │
└──────────────────────────────────────────┴──────────────┘
ĐỒNG HỒ ĐẾM NGƯỢC: 09:47 (màu đỏ khi < 2 phút)
```

**`/WEB-INF/views/booking/payment.jsp` – THANH TOÁN:**

```
Bước 4: Thanh toán

╔══════════════════════════════════════════╗
║  THÔNG TIN ĐẶT VÉ                        ║
║  Phim: Mission: Impossible               ║
║  Rạp: CineMax Vincom – IMAX Hall         ║
║  Suất: 19:30 | 24/06/2025               ║
║  Ghế: C5 (VIP), C6 (VIP)                ║
║  Combo: Combo 2 (2 bắp + 2 Pepsi) ×1    ║
╠══════════════════════════════════════════╣
║  Tạm tính vé:          320.000đ          ║
║  Combo:                139.000đ          ║
║  Mã giảm giá [____] [Áp dụng]           ║
║  Giảm giá:              −0đ             ║
║  TỔNG CỘNG:            459.000đ          ║
╠══════════════════════════════════════════╣
║  PHƯƠNG THỨC THANH TOÁN                  ║
║  ○ VNPay (ATM/QR/Visa)   [logo VNPay]   ║
║  ○ MoMo                  [logo MoMo]    ║
║  ○ ZaloPay               [logo Zalo]    ║
║  ○ Thẻ quà tặng CineMax                 ║
╚══════════════════════════════════════════╝
       [← Quay lại]  [Thanh toán →]
ĐẾM NGƯỢC: Đơn hàng hết hạn sau 08:23
```

### 5.4 – `assets/js/seat-map.js`

```javascript
// AJAX polling cập nhật trạng thái ghế mỗi 5 giây
// Logic chọn ghế: click → gọi API /booking/hold-seat
// Quản lý state: selectedSeats = []
// Kiểm tra ghế đôi: phải chọn 2 ghế liền kề
// Đếm ngược countdown 10 phút
// Khi timeout: alert → redirect về trang chọn suất
// Update tóm tắt đơn hàng real-time khi thêm/bớt ghế
const SeatMap = {
    suatChieuID: null,
    selectedSeats: [],
    holdTimer: null,
    pollingInterval: null,
    
    init(suatChieuID) {...},
    renderSeatMap(seats) {...},     // render HTML ghế từ JSON
    handleSeatClick(gheID) {...},   // gọi API hold/release
    pollSeatStatus() {...},          // AJAX GET mỗi 5 giây
    startCountdown(seconds) {...},   // đồng hồ đếm ngược
    updateOrderSummary() {...}       // cập nhật tóm tắt bên phải
};
```

### 5.5 – `assets/js/chatbot.js`

```javascript
// Chat widget nổi ở góc phải dưới (như Tawk.to / Intercom)
// Click icon → mở cửa sổ chat 360×500px
// Giao diện: header "CineMax AI", messages, input + send button
// Gọi POST /ai/chat với JSON body
// Hiển thị typing indicator khi chờ AI
// Lưu lịch sử chat trong sessionStorage
// Hiển thị suggested replies: ["Phim đang chiếu", "Gợi ý phim hay", "Giá vé"]
const Chatbot = {
    isOpen: false,
    messages: [],
    
    toggle() {...},
    sendMessage(text) {...},         // POST /ai/chat
    renderMessage(role, text) {...}, // 'user' | 'bot'
    showTyping() {...},
    hideTyping() {...}
};
```

---

# ═══════════════════════════════════════════════════════════
# PHẦN 6: FRONTEND – GIAO DIỆN NHÂN VIÊN & ADMIN DASHBOARD
# ═══════════════════════════════════════════════════════════

## NHIỆM VỤ PHẦN 6

### 6.1 – Layout chung Staff/Admin

**`assets/css/admin.css`:**
```
Layout: Sidebar (240px cố định, trái) + Content area (phần còn lại)
Sidebar background: #1A1A2E (navy dark)
Active nav item: border-left 3px #E50914 + background #E50914/10
Header: white, shadow nhẹ, breadcrumb + user info + logout
Content: padding 24px, background #F5F7FA
```

**Sidebar Staff navigation:**
```
CineMax [logo]
─────────────
📊 Dashboard
🎬 Quản lý phim
📅 Lịch chiếu
🎭 Bán vé tại quầy
📷 Soát vé QR
🏷️ Khuyến mãi
📈 Báo cáo ca
─────────────
👤 [Tên NV]
🚪 Đăng xuất
```

**Sidebar Admin navigation:**
```
CineMax ADMIN
─────────────
📊 Dashboard
👥 Khách hàng
👔 Nhân viên
🏢 Cụm rạp & Phòng
🎬 [Phim & Lịch – xem tất cả]
💰 Bảng giá vé
🏷️ Khuyến mãi
📈 Doanh thu
🎯 Thống kê phim
🖼️ Banner & Nội dung
⭐ Đánh giá
📋 Audit Log
─────────────
⚙️ Cài đặt
🚪 Đăng xuất
```

### 6.2 – `admin/dashboard.jsp` – Trang tổng quan Admin

**KPI Cards (hàng đầu tiên):**
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 💰 Doanh thu     │ │ 🎫 Vé bán hôm nay│ │ 🎬 Phim đang chiếu│ │ 👥 Thành viên mới│
│  45.230.000đ    │ │      326 vé      │ │    8 phim        │ │   +47 hôm nay   │
│ ↑ 12% vs hôm qua│ │ ↑ 8% vs hôm qua │ │ 3 sắp chiếu      │ │ Tổng: 12.450    │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Charts (hàng thứ hai):**
- Biểu đồ cột: Doanh thu 7 ngày gần nhất (dùng Chart.js CDN)
- Biểu đồ tròn: Tỷ lệ phương thức thanh toán (VNPay/MoMo/Tiền mặt)

**Bảng (hàng thứ ba):**
- Top 5 phim doanh thu cao nhất hôm nay (bảng)
- 10 đơn đặt vé gần nhất (bảng với trạng thái badge màu)

### 6.3 – `staff/scan-qr.jsp` – Soát vé QR

```
┌──────────────────────────────────────┐
│  📷 SOÁT VÉ – CineMax Vincom        │
├──────────────────────────────────────┤
│  [Camera viewport 400×300px]        │
│  (hoặc input nhập mã QR thủ công)   │
├──────────────────────────────────────┤
│  Nhập mã QR: [_______________] [Xác nhận]│
├──────────────────────────────────────┤
│  KẾT QUẢ:                           │
│  ✅ HỢP LỆ                          │
│  👤 Trần Minh Khoa                  │
│  🎬 Mission: Impossible              │
│  📅 24/06/2025 – 19:30              │
│  💺 Ghế C5, C6 (IMAX Hall)          │
│  ✓ Đã cập nhật: "Đã sử dụng"       │
└──────────────────────────────────────┘
```

- Dùng `jsQR` library hoặc input text nếu không có camera
- Gọi AJAX POST `/staff/scan-qr/verify`
- Hiển thị kết quả: VALID (xanh), INVALID (đỏ), ALREADY_USED (vàng)
- Sound notification: beep thành công / error sound

### 6.4 – `admin/revenue-report.jsp` – Báo cáo doanh thu

```
Filter: [Từ ngày: ___] [Đến ngày: ___] [Rạp: ▼] [Phim: ▼] [Xem báo cáo]

KPI tổng kết:
Tổng doanh thu: 234.500.000đ | Tổng vé: 2.345 | Tỷ lệ lấp đầy: 73%

Biểu đồ đường: Doanh thu theo ngày (Chart.js)

Bảng chi tiết:
| Ngày       | Phim                | Số vé | Doanh thu    | Rạp          |
|------------|---------------------|-------|-------------|--------------|
| 24/06/2025 | Mission: Impossible | 156   | 22.140.000đ | Vincom       |

Nút xuất: [📊 Xuất Excel] [📄 Xuất PDF]
```

---

# ═══════════════════════════════════════════════════════════
# PHẦN 7: TÍCH HỢP NGOÀI + KIỂM THỬ + HOÀN THIỆN
# ═══════════════════════════════════════════════════════════

## NHIỆM VỤ PHẦN 7

### 7.1 – Tích hợp Google Gemini AI

**System prompt cho Chatbot (CHÍNH XÁC):**
```
Bạn là trợ lý AI của CineMax Cineplex – hệ thống đặt vé xem phim tại Đà Nẵng, Việt Nam.
Bạn hỗ trợ khách hàng với các thông tin:
1. Phim đang chiếu và sắp chiếu tại CineMax
2. Lịch chiếu, giờ chiếu, định dạng (2D/3D/IMAX)
3. Giá vé (từ 75.000đ đến 250.000đ tùy loại ghế/định dạng/khung giờ)
4. Hướng dẫn đặt vé, chính sách hủy vé (trước 45 phút được hoàn tiền)
5. Chương trình thành viên (tích điểm, hạng Thường/Bạc/Vàng/Kim Cương)
6. Combo bắp nước, khuyến mãi đang áp dụng
Trả lời ngắn gọn, thân thiện bằng tiếng Việt. Không trả lời các chủ đề ngoài dịch vụ rạp phim.
Danh sách phim đang chiếu: {MOVIES_CONTEXT}
```

**Gemini API call (GeminiUtil.java):**
```java
// POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}
// Headers: Content-Type: application/json
// Body:
{
  "systemInstruction": {
    "parts": [{"text": "SYSTEM_PROMPT"}]
  },
  "contents": [
    {"role": "user", "parts": [{"text": "USER_MESSAGE"}]}
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 500
  }
}
// Parse: response.candidates[0].content.parts[0].text
// Timeout OkHttp: connectTimeout(10, SECONDS), readTimeout(30, SECONDS)
```

### 7.2 – Tích hợp VNPay Sandbox

**Tham số bắt buộc khi tạo URL:**
```java
vnp_Version = "2.1.0"
vnp_Command = "pay"
vnp_TmnCode = từ app.properties
vnp_Amount = soTien × 100  // VNPay tính đơn vị 1/100 đồng
vnp_CurrCode = "VND"
vnp_TxnRef = datVeID + "_" + System.currentTimeMillis()  // mã giao dịch duy nhất
vnp_OrderInfo = "Thanh toan ve xem phim CineMax. Ma DV: " + datVeID
vnp_OrderType = "other"
vnp_Locale = "vn"
vnp_ReturnUrl = từ app.properties
vnp_IpAddr = lấy từ request.getRemoteAddr()
vnp_CreateDate = LocalDateTime.now().format("yyyyMMddHHmmss")
vnp_ExpireDate = LocalDateTime.now().plusMinutes(15).format("yyyyMMddHHmmss")
// Sort params alphabetically → hash HMAC-SHA512 với secretKey → append vnp_SecureHash
```

**Verify return/IPN:**
```java
// 1. Lấy vnp_SecureHash từ params
// 2. Remove vnp_SecureHash, vnp_SecureHashType khỏi map
// 3. Sort params, tạo hash → so sánh
// 4. Nếu khớp + vnp_ResponseCode="00" → THÀNH CÔNG
// 5. Cập nhật ThanhToan.ketQua = "THANHCONG" + DatVe.trangThai = "DATHANHOAN"
// 6. Gửi email xác nhận kèm QR
// 7. Cộng điểm thành viên (1000đ = 1 điểm)
```

### 7.3 – Tích hợp Jakarta Mail

**HTML email template xác nhận đặt vé:**
```html
<!-- Subject: [CineMax] Xác nhận đặt vé - Mission: Impossible -->
<!-- From: CineMax Cineplex <noreply@cinemax.vn> -->
<!-- Thiết kế: dark theme, logo trắng, QR code nhúng base64 -->

Cấu trúc email:
- Header: Logo CineMax trên nền #E50914
- Body: "Cảm ơn bạn đã đặt vé tại CineMax!"
- Thông tin vé: Phim, Rạp, Ngày giờ, Ghế, Phòng
- [QR CODE IMAGE 200×200px] ← nhúng inline base64
- "Vui lòng xuất trình mã QR này khi vào rạp"
- Tổng tiền đã thanh toán
- Footer: Hotline 1900 xxxx | Facebook | Instagram
```

### 7.4 – Cơ chế Cleanup GheGiuCho

```java
// Trong AppContextListener.contextInitialized():
ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
scheduler.scheduleAtFixedRate(() -> {
    try (Connection conn = DBConnection.getConnection();
         CallableStatement cs = conn.prepareCall("{call sp_CleanupGheHetHan}")) {
        cs.execute();
        // Log số dòng bị xóa
    } catch (SQLException e) {
        logger.warning("Cleanup GheGiuCho error: " + e.getMessage());
    }
}, 0, 1, TimeUnit.MINUTES);
```

### 7.5 – Error Handling & Logging

```java
// Mọi Servlet phải có try-catch toàn bộ doGet/doPost
// Log format: [YYYY-MM-DD HH:mm:ss] [CLASS] [LEVEL] message
// Dùng java.util.logging.Logger (không cần log4j)
// Lỗi 500: forward đến /WEB-INF/views/common/error-500.jsp
// Lỗi 404: forward đến /WEB-INF/views/common/error-404.jsp
```

### 7.6 – Kiểm tra cuối trước khi nộp

**Checklist bắt buộc – kiểm tra từng mục:**

```
□ mvn clean package -DskipTests → BUILD SUCCESS, file CineMax.war tạo thành công
□ Deploy CineMax.war vào Tomcat 10.1.43/webapps/ → Tomcat start không lỗi
□ http://localhost:8080/CineMax/ → Trang chủ hiển thị đầy đủ phim, banner
□ Đăng ký tài khoản mới → nhận email xác thực
□ Đăng nhập → session tạo thành công
□ Tìm kiếm phim autocomplete hoạt động
□ Xem chi tiết phim → hiển thị trailer, đánh giá, lịch chiếu
□ Chọn suất chiếu → hiển thị sơ đồ ghế đúng màu
□ Chọn ghế → ghế chuyển sang màu xanh, đồng hồ 10 phút bắt đầu
□ Chọn combo → hiển thị đúng giá
□ Nhập mã khuyến mãi "CINEMAX25" → giảm 25% đúng
□ Chuyển hướng VNPay sandbox → URL hợp lệ
□ Thanh toán thành công → email kèm QR gửi đến Gmail
□ Vào /member/tickets → thấy vé vừa mua + QR
□ Staff đăng nhập → vào /staff/scan-qr → nhập mã QR → xác thực thành công
□ Admin đăng nhập → dashboard hiển thị KPI
□ Admin xem báo cáo doanh thu → filter + xuất Excel hoạt động
□ Chatbot AI → nhập "Hôm nay có phim gì?" → AI trả lời bằng tiếng Việt
□ Hủy vé trước 45 phút → trạng thái "Đã hủy", điểm hoàn về
□ Test responsive mobile 375px → layout không vỡ
```

---

## 📌 GHI CHÚ QUAN TRỌNG

### Các lỗi phổ biến CẦN TRÁNH:

1. **KHÔNG dùng `javax.*`** – Tomcat 10.1+ yêu cầu `jakarta.*` package
2. **KHÔNG để SQL string concat** – phải dùng `PreparedStatement` với `?`
3. **KHÔNG đặt JSP trong `webapp/`** trực tiếp – chỉ đặt trong `WEB-INF/views/`
4. **KHÔNG quên đóng Connection** – dùng try-with-resources
5. **KHÔNG hardcode API key** – đọc từ `app.properties`
6. **KHÔNG dùng `HttpSession` để lưu List lớn** – chỉ lưu userID và role
7. **KHÔNG bỏ qua CSRF token** cho mọi form POST
8. **KHÔNG để plain text password** – bcrypt cost factor tối thiểu 12

### Encoding bắt buộc:
```xml
<!-- pom.xml -->
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
<!-- web.xml -->
<filter>EncodingFilter</filter>  ← set UTF-8 cho mọi request/response
<!-- JSP đầu mỗi file -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- HTML meta -->
<meta charset="UTF-8">
```

### Thứ tự build và chạy:
```bash
# 1. Tạo database
sqlcmd -S localhost -U sa -P 123456 -i database/CineMaxDB_Schema.sql

# 2. Build project
mvn clean package -DskipTests

# 3. Deploy
copy target/CineMax.war %TOMCAT_HOME%/webapps/

# 4. Start Tomcat
%TOMCAT_HOME%/bin/startup.bat

# 5. Access
http://localhost:8080/CineMax/
```

---

*Prompt được xây dựng dựa trên khảo sát thực tế:*  
*CGV Vietnam (cgv.vn) · Galaxy Cinema (galaxycine.vn) · BHD Star (bhdstar.vn) · Lotte Cinema (lottecinemavn.com)*  
*Báo cáo đồ án tốt nghiệp CineMax – Nhóm 2 – Lớp SD2001 – Đà Nẵng 06/2025*

---
---

# ═══════════════════════════════════════════════════════════
# PHẦN 8 [BỔ SUNG]: VAI TRÒ KHÁCH VÃNG LAI & CHI TIẾT CÁC TRANG CÒN THIẾU
# ═══════════════════════════════════════════════════════════

## 8.1 – BỐN VAI TRÒ NGƯỜI DÙNG ĐẦY ĐỦ (RBAC Matrix)

Hệ thống CineMax có **4 vai trò** với quyền hạn rõ ràng:

| Chức năng | Khách vãng lai | Khách hàng (đăng nhập) | Nhân viên (STAFF) | Quản lý (ADMIN) |
|-----------|:-:|:-:|:-:|:-:|
| Xem trang chủ, banner | ✅ | ✅ | ✅ | ✅ |
| Xem danh sách phim đang chiếu/sắp chiếu | ✅ | ✅ | ✅ | ✅ |
| Xem chi tiết phim (poster, trailer, cast, mô tả) | ✅ | ✅ | ✅ | ✅ |
| Xem lịch chiếu theo phim/rạp | ✅ | ✅ | ✅ | ✅ |
| Xem đánh giá phim của người dùng | ✅ | ✅ | ✅ | ✅ |
| Tìm kiếm phim (autocomplete) | ✅ | ✅ | ✅ | ✅ |
| Dùng Chatbot AI (hỏi phim, giá vé) | ✅ | ✅ | ❌ | ❌ |
| Xem trang khuyến mãi | ✅ | ✅ | ✅ | ✅ |
| **Đăng ký / Đăng nhập** | ✅ | — | — | — |
| **Đặt vé online** (chọn ghế, combo, thanh toán) | ❌ → redirect login | ✅ | ❌ | ❌ |
| Nhận email xác nhận + QR vé | ❌ | ✅ | ✅ (in vé) | ❌ |
| Hủy vé (trước 45 phút) | ❌ | ✅ | ❌ | ❌ |
| Xem lịch sử vé, QR cá nhân | ❌ | ✅ | ❌ | ❌ |
| Viết đánh giá phim (đã xem) | ❌ | ✅ | ❌ | ❌ |
| Tích điểm / đổi điểm thành viên | ❌ | ✅ | ❌ | ❌ |
| Xem thẻ thành viên | ❌ | ✅ | ❌ | ❌ |
| AI gợi ý phim cá nhân hóa | ❌ | ✅ | ❌ | ❌ |
| AI tóm tắt phim | ✅ | ✅ | ❌ | ❌ |
| **Bán vé tại quầy** | ❌ | ❌ | ✅ | ❌ |
| **Soát vé QR** | ❌ | ❌ | ✅ | ❌ |
| **CRUD phim** | ❌ | ❌ | ✅ | ✅ |
| **CRUD lịch chiếu** | ❌ | ❌ | ✅ | ✅ |
| **CRUD khuyến mãi** | ❌ | ❌ | ✅ | ✅ |
| Xem báo cáo ca làm việc | ❌ | ❌ | ✅ | ✅ |
| **Quản lý cụm rạp / phòng / ghế** | ❌ | ❌ | ❌ | ✅ |
| **Quản lý nhân viên** | ❌ | ❌ | ❌ | ✅ |
| **Quản lý khách hàng** (khóa/mở) | ❌ | ❌ | ❌ | ✅ |
| **Cấu hình giá vé** | ❌ | ❌ | ❌ | ✅ |
| **Báo cáo doanh thu** (toàn hệ thống) | ❌ | ❌ | ❌ | ✅ |
| **Quản lý banner trang chủ** | ❌ | ❌ | ❌ | ✅ |
| **Duyệt/ẩn đánh giá** | ❌ | ❌ | ❌ | ✅ |
| **Xem Audit Log** | ❌ | ❌ | ❌ | ✅ |

### Quy tắc redirect khi chưa đủ quyền:
- **Khách vãng lai** truy cập `/booking/*`, `/member/*`, `/ai/recommend` → redirect `/auth/login?returnUrl={encodedURL}` kèm thông báo "Vui lòng đăng nhập để đặt vé"
- **Khách hàng** truy cập `/staff/*` hoặc `/admin/*` → redirect `/` kèm thông báo lỗi 403
- **Nhân viên** truy cập `/admin/*` → redirect `/staff/dashboard` kèm thông báo "Không đủ quyền"

---

## 8.2 – GIAO DIỆN KHÁCH VÃNG LAI (Trang công khai)

### Navbar cho khách vãng lai:
```
[Logo CineMax]   Phim ▼   Lịch chiếu   Rạp   Khuyến mãi   [Tìm kiếm 🔍]   [Đăng nhập]  [Đăng ký]
```
- Nút "Đăng nhập" style: outline button trắng
- Nút "Đăng ký" style: filled button đỏ #E50914
- Khi đã đăng nhập, thay bằng: [🔔] [Avatar ▼ → Hồ sơ | Vé của tôi | Đăng xuất]

### Banner thông báo khi click "Mua vé" mà chưa đăng nhập:
```
┌─────────────────────────────────────────────────────────┐
│  🔒 Bạn cần đăng nhập để đặt vé                        │
│  Chỉ mất 30 giây! Đã có tài khoản?                     │
│  [Đăng nhập ngay]  hoặc  [Tạo tài khoản miễn phí]     │
└─────────────────────────────────────────────────────────┘
```
- Hiển thị dạng modal overlay (không redirect ngay)
- Sau khi đăng nhập thành công → tự động quay lại trang phim đang xem

---

## 8.3 – TRANG ĐĂNG NHẬP / ĐĂNG KÝ CHI TIẾT

### `auth/login.jsp`:
```
[Logo CineMax - trắng trên nền #141414]

        ĐĂNG NHẬP
   
   Email:     [________________________]
   Mật khẩu: [________________________] [👁]
   
   [  Ghi nhớ đăng nhập  ]   Quên mật khẩu?
   
   [       ĐĂNG NHẬP       ]  ← button đỏ full width
   
   ─────── hoặc ───────
   
   [G] Tiếp tục với Google   ← OAuth 2.0 (optional)
   
   Chưa có tài khoản? [Đăng ký ngay]
```

**Validation client-side (JS) + server-side (Java):**
- Email: định dạng hợp lệ
- Mật khẩu: tối thiểu 8 ký tự
- Nếu sai: hiển thị inline error đỏ ngay dưới field (không reload trang)
- Sau 5 lần sai liên tiếp: khóa form 15 phút (lưu vào session)
- Hiển thị returnUrl ẩn trong hidden input để redirect đúng sau đăng nhập

### `auth/register.jsp`:
```
        TẠO TÀI KHOẢN
   
   Họ và tên:    [________________________]  ← tối thiểu 2 ký tự
   Email:        [________________________]  ← kiểm tra unique real-time (AJAX)
   Số điện thoại:[________________________]  ← 10 số, bắt đầu 0
   Mật khẩu:    [________________________]  [👁]
                  ████████░░  Độ mạnh: Tốt   ← progress bar
   Nhập lại MK: [________________________]
   Ngày sinh:   [  DD  ] / [  MM  ] / [ YYYY ]
   
   ☑ Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật
   
   [     TẠO TÀI KHOẢN     ]
   
   Đã có tài khoản? [Đăng nhập]
```

**Sau đăng ký thành công:**
→ Hiển thị trang "Xác thực email" với thông báo:
"Chúng tôi đã gửi email xác thực đến [email]. Vui lòng kiểm tra hộp thư và click link xác thực."

---

## 8.4 – TRANG CHI TIẾT PHIM (`movie/detail.jsp`) ĐẦY ĐỦ

```
NAVBAR
──────────────────────────────────────────────────────────────────────
BACKDROP IMAGE (full width, blur gradient overlay)
                                    [POSTER 200×300px]   TÊN PHIM
                                                          ⭐ 4.5/5 (234 đánh giá)
                                                          🏷️ Hành động • Khoa học viễn tưởng
                                                          🕐 130 phút
                                                          📅 Khởi chiếu: 25/07/2025
                                                          🔞 C13
                                                          🌍 Mỹ | Tiếng Anh
                                                          🎬 Đạo diễn: Matt Shakman
                                                          👥 Diễn viên: Pedro Pascal, ...
                                                          
                                                          [🎬 Xem Trailer]  [🎫 Mua vé ngay]
──────────────────────────────────────────────────────────────────────
TAB BAR: [Nội dung phim] [Lịch chiếu] [Đánh giá]
──────────────────────────────────────────────────────────────────────
TAB 1 – NỘI DUNG:
  [VIDEO EMBED TRAILER - YouTube iframe 16:9]
  
  NỘI DUNG PHIM:
  [Mô tả đầy đủ từ DB]
  
  [Nút "AI Tóm tắt không spoiler ✨"] → gọi /ai/summarize → hiển thị kết quả
  
  DIỄN VIÊN:
  [Avatar] Pedro Pascal   [Avatar] Vanessa Kirby   [Avatar] Joseph Quinn
  
TAB 2 – LỊCH CHIẾU:
  [Chọn ngày: 24/6 | 25/6 | 26/6 | 27/6 | 28/6 | 29/6 | 30/6]  ← date picker row
  [Chọn rạp: Tất cả | CineMax Vincom ▼]
  [Chọn định dạng: Tất cả | 2D | 3D | IMAX]
  
  CineMax Vincom Center
  ┌─────────────────────────────────────────────────────────┐
  │ Screen 1 (2D)    08:00  10:30  13:00  15:30  18:00  20:30│
  │ IMAX Hall        09:00  12:00  15:00  19:30  22:00       │
  │ Screen 2 (3D)    10:00  13:30  17:00  20:00              │
  └─────────────────────────────────────────────────────────┘
  [Click vào giờ → redirect /booking/seat-map?suatChieuID=xxx]
  [Giờ đã qua → disabled + line-through]
  [Giờ sắp đầy (<20% ghế trống) → badge "Sắp đầy" màu cam]

TAB 3 – ĐÁNH GIÁ:
  ĐIỂM TỔNG HỢP:
  ⭐⭐⭐⭐⭐  4.5/5
  ████████░░  5 sao (156)
  ██████░░░░  4 sao (67)
  ████░░░░░░  3 sao (23)
  ░░░░░░░░░░  2 sao (5)
  ░░░░░░░░░░  1 sao (2)
  
  [Chỉ hiển thị nút "Viết đánh giá" nếu đã đăng nhập + đã xem phim]
  
  DANH SÁCH ĐÁNH GIÁ (phân trang 10/trang):
  [Avatar] Trần Minh Khoa  ⭐⭐⭐⭐⭐  24/06/2025
  "Phim cực hay! Kỹ xảo tuyệt vời, Pedro Pascal diễn xuất..."
  ─────────────────────────────────────────────
```

---

## 8.5 – TRANG DANH SÁCH PHIM (`movie/list.jsp`) ĐẦY ĐỦ

```
NAVBAR
──────────────────────────────────────────────────────────────────────
BREADCRUMB: Trang chủ > Phim đang chiếu

┌─── FILTER SIDEBAR (240px) ──┐  ┌─── DANH SÁCH PHIM (grid 4 cột) ─────────────────┐
│ THỂ LOẠI                    │  │ 24 phim   Sắp xếp: [Mới nhất ▼]  [  ] [≡]        │
│ ☑ Hành động  ☐ Tình cảm   │  │                                                     │
│ ☐ Hoạt hình  ☐ Kinh dị    │  │  [Card] [Card] [Card] [Card]                        │
│ ☐ Hài hước   ☐ Viễn tưởng │  │  [Card] [Card] [Card] [Card]                        │
│                             │  │  ...                                                 │
│ ĐỊNH DẠNG                   │  │                                                     │
│ ☑ 2D  ☐ 3D  ☐ IMAX        │  │  [← 1 2 3 ... 5 →]  ← phân trang                  │
│                             │  └─────────────────────────────────────────────────────┘
│ NHÃN ĐỘ TUỔI               │
│ ☐ P  ☐ C13  ☐ C16  ☐ C18  │
│                             │
│ RẠP CHIẾU                  │
│ ○ Tất cả                   │
│ ○ CineMax Vincom            │
│ ○ CineMax Lotte Mart        │
│ ○ CineMax Big C             │
│                             │
│ NGÀY CHIẾU                 │
│ [  Chọn ngày ▼  ]          │
│                             │
│ [Áp dụng bộ lọc]           │
│ [Xóa bộ lọc]               │
└─────────────────────────────┘

TABS trên cùng: [Đang chiếu (24)] [Sắp chiếu (8)] [Phim hot 🔥]
```

**Mobile responsive (<768px):** Filter collapse thành modal popup khi click icon Filter.

---

## 8.6 – TRANG KHUYẾN MÃI CÔNG KHAI (`/promotions`)

Thêm Servlet `PromotionServlet.java` (@WebServlet("/promotions/*")) và JSP tương ứng:

```
TRANG KHUYẾN MÃI & ƯU ĐÃI

[Banner lớn đầu trang – ảnh khuyến mãi nổi bật]

ĐANG DIỄN RA (3 thẻ)
┌──────────────────────────┐ ┌──────────────────────────┐ ┌──────────────────────────┐
│ [Ảnh banner KM]          │ │ [Ảnh banner KM]          │ │ [Ảnh banner KM]          │
│ GIẢM 25% KỲ KHAI TRƯƠNG │ │ THÀNH VIÊN VÀNG -15%     │ │ COMBO SIÊU TIẾT KIỆM     │
│ Mã: CINEMAX25            │ │ Dành cho hạng Vàng+       │ │ Bắp + Nước chỉ 99k      │
│ HSD: 31/12/2025          │ │ HSD: 31/12/2025           │ │ HSD: 31/12/2025          │
│ [Sao chép mã] [Dùng ngay]│ │ [Xem chi tiết]            │ │ [Xem chi tiết]           │
└──────────────────────────┘ └──────────────────────────┘ └──────────────────────────┘

ƯU ĐÃI THÀNH VIÊN
[Bảng so sánh 4 hạng thành viên: Thường / Bạc / Vàng / Kim Cương]
```

---

## 8.7 – AI TÍNH NĂNG ĐẦY ĐỦ (bổ sung phần thiếu)

### AI Phân tích sở thích từ lịch sử xem:

```java
// AIService.recommendMovies() – logic thực tế:
// 1. Lấy lịch sử xem của khachHangID (SELECT phim đã đặt vé + đã xem)
// 2. Đếm tần suất theo theLoai → tìm top 3 thể loại yêu thích
// 3. Lấy điểm đánh giá trung bình của phim khách đã rate
// 4. Gửi Gemini prompt:
//    "Khách hàng thích: {theLoai1}, {theLoai2}. Đã xem: {danhSachPhimDaXem}.
//     Trong danh sách phim hiện tại: {danhSachPhimHienCo}.
//     Hãy đề xuất 4 phim phù hợp nhất, giải thích ngắn gọn vì sao."
// 5. Parse JSON response, map với phimID từ DB
// 6. Hiển thị section "Gợi ý cho bạn" trên trang chủ (chỉ khi đã đăng nhập)
```

### Tóm tắt phim không spoiler:
```java
// AIService.summarizeMovie(Phim phim)
// Prompt: "Hãy tóm tắt phim '{tenPhim}' ({thoiLuong} phút, {theLoai}) 
//          trong 3-4 câu ngắn gọn, hấp dẫn, KHÔNG tiết lộ kết thúc hay 
//          tình tiết quan trọng (no spoiler). Viết bằng tiếng Việt."
// Cache kết quả trong HashMap<Integer, String> (phimID → summary) trong memory
// TTL 24 giờ – tái tạo nếu stale
```

---

## 8.8 – PHI CHỨC NĂNG (Non-Functional Requirements)

### Bắt buộc phải implement trong code:

**Performance:**
- Trang chủ load < 3 giây (với connection pool + index DB)
- Sơ đồ ghế AJAX response < 500ms
- Chatbot AI response < 5 giây (Gemini 2.0 Flash)

**Security:**
```java
// 1. CSRF Token – bắt buộc mọi form POST:
//    - Sinh token UUID trong session khi render form
//    - Verify token trong Servlet trước khi xử lý
//    - Mỗi token dùng một lần

// 2. SQL Injection – PreparedStatement 100% (đã có)

// 3. XSS Prevention:
//    - Tất cả output trong JSP dùng JSTL <c:out value="${...}" escapeXml="true"/>
//    - KHÔNG dùng <%= %> trực tiếp

// 4. Rate Limiting (đơn giản):
//    - Đăng nhập sai 5 lần → khóa IP 15 phút (lưu Map<String, LockInfo> trong ServletContext)
//    - AI Chatbot: max 20 request/phút/session

// 5. Session Security:
//    - Session ID regenerate sau đăng nhập (invalidate + tạo mới)
//    - HttpOnly cookie, SameSite=Lax
//    - Timeout 30 phút

// 6. Password Policy:
//    - Tối thiểu 8 ký tự
//    - Phải có chữ hoa, chữ thường, số
//    - bcrypt cost factor 12
//    - Không cho phép mật khẩu phổ biến (top 100 passwords list)
```

**Input Validation (ValidationUtil.java – viết đầy đủ):**
```java
public class ValidationUtil {
    public static boolean isValidEmail(String email);           // regex RFC 5322
    public static boolean isValidPhone(String phone);           // 10 số, bắt đầu 0
    public static boolean isValidPassword(String password);     // min 8, upper+lower+digit
    public static boolean isValidName(String name);             // 2-100 ký tự, no special
    public static String sanitizeInput(String input);           // strip HTML tags
    public static boolean isValidDate(String date);             // DD/MM/YYYY
    public static boolean isPositiveInt(String value);
    public static String escapeHtml(String input);              // < > & " '
}
```

**Responsive Breakpoints:**
```css
/* Mobile First: */
/* xs: < 576px  – 1 cột, hamburger menu, seat-map cuộn ngang */
/* sm: 576–768px – 2 cột movie grid */
/* md: 768–992px – 3 cột movie grid, filter collapse */
/* lg: 992–1200px – 4 cột movie grid, filter sidebar hiển thị */
/* xl: > 1200px – layout đầy đủ */

/* Media queries quan trọng: */
@media (max-width: 768px) {
    .navbar-brand .logo-text { display: none; } /* chỉ hiện icon */
    .movie-grid { grid-template-columns: repeat(2, 1fr); }
    .seat-map-container { overflow-x: scroll; }
    .booking-summary { position: fixed; bottom: 0; width: 100%; } /* sticky bottom */
    .sidebar-filter { display: none; } /* ẩn, mở qua modal */
    .hero-banner .movie-info { width: 100%; } /* full width overlay */
}
@media (max-width: 480px) {
    .movie-grid { grid-template-columns: repeat(1, 1fr); }
    .seat { width: 28px; height: 28px; font-size: 9px; }
}
```

---

## 8.9 – ZALOPAY CALLBACK ĐẦY ĐỦ

Bổ sung vào `PaymentServlet.java`:

```java
// GET /payment/zalopay-return (redirect sau thanh toán)
// POST /payment/zalopay-callback (webhook từ ZaloPay)

// ZaloPay verify callback:
// 1. Nhận JSON body: {"data": "...", "mac": "...", "type": 1}
// 2. Tính mac = HmacSHA256(data, key2)  ← key2 khác key1
// 3. So sánh mac → nếu khớp + returncode=1 → THÀNH CÔNG
// 4. Parse "data" JSON: apptransid, amount, servertime
// 5. Cập nhật ThanhToan.ketQua = "THANHCONG"

// ZaloPay tạo payment URL:
String appTransId = LocalDate.now().format("yyMMdd") + "_" + datVeID;
// POST https://sb-openapi.zalopay.vn/v2/create
// Body: appid, appuser, apptime, amount, apptransid, 
//       embeddata (JSON: {redirecturl: "..."}), item (JSON array),
//       callbackurl, mac = HmacSHA256(data, key1)
```

---

## 8.10 – `AppConfig.java` ĐẦY ĐỦ

```java
package com.cinemax.config;

public class AppConfig {
    // Load từ app.properties khi AppContextListener.contextInitialized()
    // Expose qua static fields sau khi load
    
    public static String APP_NAME;
    public static String APP_URL;
    public static int SEAT_HOLD_MINUTES;    // = 10
    public static int CANCEL_BEFORE_MINUTES; // = 45
    
    // Điểm tích lũy
    public static final int DIEM_PER_1000_VND = 1;   // 1000đ = 1 điểm
    public static final int DIEM_BAC   = 500;          // 500 điểm → Bạc
    public static final int DIEM_VANG  = 2000;         // 2000 điểm → Vàng
    public static final int DIEM_KIMCUONG = 5000;      // 5000 điểm → Kim Cương
    
    // Pagination
    public static final int PAGE_SIZE_MOVIES = 12;     // 12 phim/trang
    public static final int PAGE_SIZE_TICKETS = 10;    // 10 vé/trang
    public static final int PAGE_SIZE_REVIEWS = 10;    // 10 đánh giá/trang
    public static final int PAGE_SIZE_AUDIT_LOG = 20;  // 20 log/trang
    
    // Top list sizes
    public static final int HOME_CURRENT_MOVIES = 8;   // 8 phim đang chiếu trang chủ
    public static final int HOME_COMING_SOON = 4;      // 4 phim sắp chiếu
    
    // Gemini
    public static String GEMINI_API_KEY;
    public static String GEMINI_MODEL;
    public static String GEMINI_API_URL;
    
    // VNPay
    public static String VNPAY_TMN_CODE;
    public static String VNPAY_HASH_SECRET;
    public static String VNPAY_PAY_URL;
    public static String VNPAY_RETURN_URL;
    public static String VNPAY_IPN_URL;
    
    // MoMo
    public static String MOMO_PARTNER_CODE;
    public static String MOMO_ACCESS_KEY;
    public static String MOMO_SECRET_KEY;
    public static String MOMO_ENDPOINT;
    
    // ZaloPay
    public static String ZALOPAY_APP_ID;
    public static String ZALOPAY_KEY1;
    public static String ZALOPAY_KEY2;
    public static String ZALOPAY_ENDPOINT;
    
    // Mail
    public static String MAIL_HOST;
    public static int MAIL_PORT;
    public static String MAIL_USERNAME;
    public static String MAIL_PASSWORD;
    public static String MAIL_FROM_NAME;
    public static String MAIL_FROM_EMAIL;
    
    public static void load(java.util.Properties props) {
        APP_NAME = props.getProperty("app.name");
        APP_URL  = props.getProperty("app.url");
        SEAT_HOLD_MINUTES    = Integer.parseInt(props.getProperty("app.seat.hold.minutes", "10"));
        CANCEL_BEFORE_MINUTES = Integer.parseInt(props.getProperty("app.cancel.before.minutes", "45"));
        GEMINI_API_KEY  = props.getProperty("gemini.api.key");
        GEMINI_MODEL    = props.getProperty("gemini.model");
        GEMINI_API_URL  = props.getProperty("gemini.api.url");
        VNPAY_TMN_CODE  = props.getProperty("vnpay.tmnCode");
        VNPAY_HASH_SECRET = props.getProperty("vnpay.hashSecret");
        VNPAY_PAY_URL   = props.getProperty("vnpay.payUrl");
        VNPAY_RETURN_URL = props.getProperty("vnpay.returnUrl");
        VNPAY_IPN_URL   = props.getProperty("vnpay.ipnUrl");
        MOMO_PARTNER_CODE = props.getProperty("momo.partnerCode");
        MOMO_ACCESS_KEY   = props.getProperty("momo.accessKey");
        MOMO_SECRET_KEY   = props.getProperty("momo.secretKey");
        MOMO_ENDPOINT     = props.getProperty("momo.endpoint");
        ZALOPAY_APP_ID  = props.getProperty("zalopay.appId");
        ZALOPAY_KEY1    = props.getProperty("zalopay.key1");
        ZALOPAY_KEY2    = props.getProperty("zalopay.key2");
        ZALOPAY_ENDPOINT = props.getProperty("zalopay.endpoint");
        MAIL_HOST     = props.getProperty("mail.smtp.host");
        MAIL_PORT     = Integer.parseInt(props.getProperty("mail.smtp.port", "587"));
        MAIL_USERNAME = props.getProperty("mail.smtp.username");
        MAIL_PASSWORD = props.getProperty("mail.smtp.password");
        MAIL_FROM_NAME  = props.getProperty("mail.from.name");
        MAIL_FROM_EMAIL = props.getProperty("mail.from.email");
    }
}
```

---

## 8.11 – SCRIPT SINH GHẾ ĐẦY ĐỦ (SQL thật, không phải comment)

```sql
-- Sinh ghế cho Screen 1 (phongChieuID=1): 10 hàng A–J, 12 ghế/hàng
-- Hàng A–G (7 hàng): THUONG
-- Hàng H–I (2 hàng): VIP
-- Hàng J (1 hàng): DOI (6 ghế đôi = chiếm vị trí 2 cột)

DECLARE @phongID INT = 1;
DECLARE @hang NCHAR(1);
DECLARE @soGhe INT;
DECLARE @loai VARCHAR(10);
DECLARE @hangs TABLE (hang NCHAR(1), loai VARCHAR(10));
INSERT INTO @hangs VALUES
('A','THUONG'),('B','THUONG'),('C','THUONG'),('D','THUONG'),
('E','THUONG'),('F','THUONG'),('G','THUONG'),
('H','VIP'),('I','VIP'),
('J','DOI');

DECLARE cur CURSOR FOR SELECT hang, loai FROM @hangs;
OPEN cur;
FETCH NEXT FROM cur INTO @hang, @loai;
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @soGhe = 1;
    WHILE @soGhe <= 12
    BEGIN
        IF @loai = 'DOI' AND @soGhe % 2 = 0
        BEGIN
            -- Ghế đôi: mỗi cặp số lẻ–chẵn → chỉ INSERT ghế lẻ (chẵn là phần của ghế đôi)
            SET @soGhe = @soGhe + 1;
            CONTINUE;
        END
        INSERT INTO Ghe (phongChieuID, hangGhe, soGhe, loaiGhe, trangThai)
        VALUES (@phongID, @hang, @soGhe, @loai, 'SUDUNG');
        SET @soGhe = @soGhe + 1;
    END
    FETCH NEXT FROM cur INTO @hang, @loai;
END
CLOSE cur; DEALLOCATE cur;
GO

-- Lặp tương tự cho phongChieuID 2–15 (tất cả phòng của 3 cụm rạp)
-- Screen 2 (ID=2): 10×10=100 ghế, hàng A-H THUONG, hàng I-J VIP
-- IMAX Hall (ID=3): 16×14=224 ghế, hàng A-L THUONG, M-N VIP, không có DOI
-- Screen 4 (ID=4): 8×10=80 ghế, toàn THUONG
-- VIP Lounge (ID=5): 4×10=40 ghế, toàn VIP + 2 hàng DOI
```

---

## 8.12 – SCRIPT SUẤT CHIẾU MẪU 7 NGÀY (SQL thật)

```sql
-- Sinh suất chiếu cho 5 phim đang chiếu × 3 cụm rạp × 7 ngày tới
-- Mỗi phim chiếu 3-5 suất/ngày/phòng

DECLARE @today DATE = CAST(GETDATE() AS DATE);
DECLARE @dayOffset INT = 0;
DECLARE @baseDate DATETIME;

WHILE @dayOffset < 7
BEGIN
    SET @baseDate = DATEADD(DAY, @dayOffset, @today);
    
    -- Phim 1: The Fantastic Four (phimID=1) tại phòng IMAX (ID=3)
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (1, 3, DATEADD(HOUR, 9,  @baseDate), DATEADD(MINUTE, 9*60+130,  @baseDate), 'IMAX', 'MOBAN'),
    (1, 3, DATEADD(HOUR, 14, @baseDate), DATEADD(MINUTE, 14*60+130, @baseDate), 'IMAX', 'MOBAN'),
    (1, 3, DATEADD(HOUR, 19, @baseDate+30.0/1440), DATEADD(MINUTE, 19*60+30+130, @baseDate), 'IMAX', 'MOBAN');
    
    -- Phim 1 tại phòng Screen 2 - 3D (ID=2)
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (1, 2, DATEADD(HOUR, 10, @baseDate), DATEADD(MINUTE, 10*60+130, @baseDate), '3D', 'MOBAN'),
    (1, 2, DATEADD(HOUR, 15, @baseDate), DATEADD(MINUTE, 15*60+130, @baseDate), '3D', 'MOBAN'),
    (1, 2, DATEADD(HOUR, 20, @baseDate), DATEADD(MINUTE, 20*60+130, @baseDate), '3D', 'MOBAN');
    
    -- Phim 2: Jurassic World (phimID=2) tại Screen 1 - 2D (ID=1)
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (2, 1, DATEADD(HOUR, 8,  @baseDate), DATEADD(MINUTE, 8*60+125,  @baseDate), '2D', 'MOBAN'),
    (2, 1, DATEADD(HOUR, 11, @baseDate), DATEADD(MINUTE, 11*60+125, @baseDate), '2D', 'MOBAN'),
    (2, 1, DATEADD(HOUR, 14, @baseDate), DATEADD(MINUTE, 14*60+125, @baseDate), '2D', 'MOBAN'),
    (2, 1, DATEADD(HOUR, 17, @baseDate), DATEADD(MINUTE, 17*60+125, @baseDate), '2D', 'MOBAN'),
    (2, 1, DATEADD(HOUR, 20, @baseDate), DATEADD(MINUTE, 20*60+125, @baseDate), '2D', 'MOBAN');
    
    -- Phim 3: Mission Impossible (phimID=3) tại Screen 1 + IMAX
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (3, 1, DATEADD(HOUR, 9, DATEADD(MINUTE, 30, @baseDate)), DATEADD(MINUTE, 9*60+30+169, @baseDate), '2D', 'MOBAN'),
    (3, 1, DATEADD(HOUR, 13, @baseDate), DATEADD(MINUTE, 13*60+169, @baseDate), '2D', 'MOBAN'),
    (3, 1, DATEADD(HOUR, 18, @baseDate), DATEADD(MINUTE, 18*60+169, @baseDate), '2D', 'MOBAN');
    
    -- Phim 4: Lilo & Stitch (phimID=4) tại Screen 4 - 2D (ID=4)
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (4, 4, DATEADD(HOUR, 10, @baseDate), DATEADD(MINUTE, 10*60+108, @baseDate), '2D', 'MOBAN'),
    (4, 4, DATEADD(HOUR, 13, @baseDate), DATEADD(MINUTE, 13*60+108, @baseDate), '2D', 'MOBAN'),
    (4, 4, DATEADD(HOUR, 16, @baseDate), DATEADD(MINUTE, 16*60+108, @baseDate), '2D', 'MOBAN'),
    (4, 4, DATEADD(HOUR, 19, @baseDate), DATEADD(MINUTE, 19*60+108, @baseDate), '2D', 'MOBAN');
    
    -- Phim 5: Superman (phimID=5) tại Screen 2 - 3D (ID=2)
    INSERT INTO SuatChieu (phimID, phongChieuID, thoiGianBatDau, thoiGianKetThuc, dinhDang, trangThai) VALUES
    (5, 2, DATEADD(HOUR, 9, @baseDate), DATEADD(MINUTE, 9*60+140, @baseDate), '3D', 'MOBAN'),
    (5, 2, DATEADD(HOUR, 13, @baseDate), DATEADD(MINUTE, 13*60+140, @baseDate), '3D', 'MOBAN'),
    (5, 2, DATEADD(HOUR, 17, DATEADD(MINUTE, 30, @baseDate)), DATEADD(MINUTE, 17*60+30+140, @baseDate), '3D', 'MOBAN'),
    (5, 2, DATEADD(HOUR, 21, @baseDate), DATEADD(MINUTE, 21*60+140, @baseDate), '3D', 'MOBAN');
    
    SET @dayOffset = @dayOffset + 1;
END
GO
```

---

## 8.13 – THÊM VÀO CẤU TRÚC THƯ MỤC (bổ sung file còn thiếu)

```
CineMax/
├── database/
│   └── CineMaxDB_Schema.sql        ← Script SQL Server đầy đủ (Phần 2)
├── src/main/webapp/
│   └── WEB-INF/
│       └── views/
│           └── promotion/           ← MỚI
│               ├── list.jsp         ← Danh sách khuyến mãi (công khai)
│               └── detail.jsp       ← Chi tiết 1 chương trình KM
├── src/main/java/com/cinemax/
│   └── servlet/
│       └── PromotionServlet.java    ← MỚI – /promotions/*
```

**Thêm vào `web.xml` filter-mapping:**
```xml
<!-- CSRF Filter cho mọi POST request -->
<filter>
    <filter-name>CSRFFilter</filter-name>
    <filter-class>com.cinemax.filter.CSRFFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>CSRFFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

**Thêm file:**
```
├── filter/
│   └── CSRFFilter.java              ← MỚI – Validate CSRF token mọi POST
```

---

## 8.14 – CHECKLIST BỔ SUNG (thêm vào cuối Phần 7.6)

```
□ Khách vãng lai: vào trang chủ → xem phim → xem lịch chiếu → click "Mua vé" → modal đăng nhập
□ Khách vãng lai: dùng chatbot AI → hỏi "Phim nào đang chiếu?" → AI trả lời không yêu cầu đăng nhập
□ Đăng ký: nhập email trùng → hiện lỗi "Email đã được sử dụng" (AJAX real-time)
□ Đăng nhập sai 5 lần → form bị khóa 15 phút
□ Trang chi tiết phim: tab Lịch chiếu hiển thị đúng giờ, giờ đã qua disabled
□ Trang chi tiết phim: AI tóm tắt phim → text không spoiler
□ Trang danh sách phim: filter theo thể loại + định dạng hoạt động đúng
□ Trang khuyến mãi: công khai, khách vãng lai xem được
□ Thành viên: trang loyalty-card hiển thị đúng hạng, điểm, progress bar lên hạng
□ Admin: tạo khuyến mãi mới → dùng ngay để đặt vé → giảm giá đúng
□ Staff: bán vé tại quầy + thanh toán tiền mặt → vé tạo thành công trong DB
□ ZaloPay sandbox: tạo URL → redirect → callback → cập nhật DB
□ CSRF: POST không có token → bị chặn, trả về 403
□ XSS: nhập <script>alert(1)</script> vào form → không thực thi
□ SQL Injection: nhập ' OR '1'='1 vào ô tìm kiếm → không lỗi DB
□ Mobile 375px: navbar hamburger, movie grid 1 cột, seat-map cuộn ngang OK
□ AI gợi ý phim: đăng nhập tài khoản đã xem vài phim → trang chủ hiển thị "Gợi ý cho bạn"
```

---

*Phần 8 bổ sung hoàn thiện tất cả điểm còn thiếu so với yêu cầu gốc.*
*Tổng cộng 4 vai trò đã đầy đủ: Khách vãng lai · Khách hàng · Nhân viên · Admin*
