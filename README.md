# Burogu.dev - Ứng Dụng Blog Đa Người Dùng - https://burogu-fontend.vercel.app/

### Công Nghệ Sử Dụng
- **Backend**: Node.js - Express.js - Supabase(lưu trữ cơ sở dữ liệu) - Prisma (ORM)  ([GitHub Repository](https://github.com/TaThasi/burogu))
- **Frontend**: Next.js - 
  - App Router
  - Server và Client component
  - API Routes và Middleware
- **Xác Thực**: JWT (JSON Web Tokens)
- **Giao Diện**: Tailwind CSS
- **Thành Phần UI**: Shadcn-UI
- **Trình Soạn Thảo WYSIWYG**: TinyMCE
- **Forms**: React-Hook-Forms
- **Thông Báo (Toasts)**: React-Hot-Toast
- **Xác Thực**: Zod
- **Biểu Tượng**: Lucide-Icon
- **Ngôn Ngữ**: TypeScript

### Fontend 
![screencapture-burogu-fontend-vercel-app-login-2024-06-21-13_12_22](https://github.com/TaThasi/burogu-fontend/assets/120630656/5de88ca8-b197-44db-a22d-c4898da0031d)
![screencapture-burogu-fontend-vercel-app-register-2024-06-21-13_16_09](https://github.com/TaThasi/burogu-fontend/assets/120630656/655058a1-4043-4af6-a0e5-6f9e08d6018f)
![screencapture-burogu-fontend-vercel-app-2024-06-21-13_12_44](https://github.com/TaThasi/burogu-fontend/assets/120630656/c6710f8e-903c-467c-9571-e27f12a584d0)
![screencapture-burogu-fontend-vercel-app-new-post-2024-06-21-13_12_55](https://github.com/TaThasi/burogu-fontend/assets/120630656/b06f10e7-2e35-460f-a954-25eabd9bceb0)
![screencapture-burogu-fontend-vercel-app-p-00772c48-919a-48e9-a116-74201e43bea1-2024-06-21-13_13_22](https://github.com/TaThasi/burogu-fontend/assets/120630656/33198e4d-ed94-47bd-9326-a12e12e19b6d)
![screencapture-burogu-fontend-vercel-app-u-05776465-a0f5-4f0b-a831-10af507c4723-2024-06-21-13_13_45](https://github.com/TaThasi/burogu-fontend/assets/120630656/2766e43a-84e1-4c6d-9152-10c0e1db21e2)

### Chức năng

Đăng kí / Đăng nhập: Người dùng có thể đăng ký tài khoản mới và đăng nhập vào hệ thống.
Tạo bài viết: Người dùng có thể tạo và chia sẻ bài viết mới.
Xem bài viết: Xem bài viết của mình hoặc người khác.
Comment: Người dùng có thể bình luận trên các bài viết.
Vote Up / Vote Down bài viết: Người dùng có thể bình chọn (upvote) hoặc phản đối (downvote) các bài viết.
Follow người dùng khác: Người dùng có thể theo dõi các tài khoản khác.
Bookmark: Lưu trữ bài viết của người khác.

### Kiến Trúc

- **Framework Giao Diện**: Xây dựng trên Next.js, xử lý routing và render phía máy chủ (SSR).
- **Thiết Kế Dựa Trên Thành Phần**: Các thành phần giao diện được xây dựng bằng Shadcn-UI và tạo kiểu với Tailwind CSS.
- **Quản Lý Trạng Thái và Biểu Mẫu**: Sử dụng React-Hook-Forms để quản lý biểu mẫu.
- **Xác Thực**: Sử dụng JWT tokens, lưu trữ trong cookies.
- **Middleware**: Triển khai để quản lý truy cập vào các route bảo vệ và chuyển hướng người dùng.
- **Tích Hợp Trình Soạn Thảo**: TinyMCE được tích hợp làm trình soạn thảo WYSIWYG để tạo nội dung rich text.
- **Thông Báo**: Sử dụng React-Hot-Toast.

## Cài Đặt

Để cài đặt dự án trên máy tính của bạn, hãy thực hiện các bước sau:

1. **Clone Repository**

    ```sh
    git clone https://github.com/TaThasi/burogu-fontend.git
    cd burogu-fontend
    ```

2. **Cài Đặt Dependencies**

    ```sh
    npm install
    ```

3. **Chạy Server Phát Triển**

    ```sh
    npm run dev
    ```

4. **Cấu Hình Biến Môi Trường**

    Tạo file `.env` trong thư mục gốc và thêm các biến môi trường sau:

    ```sh
    SERVER_URL=""
    TINY_API=""
    ```
# Backend cho Burogu ([GitHub Repository](https://github.com/TaThasi/burogu))

## Tổng Quan
Kho lưu trữ burogu chứa dịch vụ backend cho burogu.dev (blog app). Dịch vụ này được xây dựng bằng Node.js(ExpressJs) và các công nghệ khác nhau để xử lý logic backend, bao gồm tương tác cơ sở dữ liệu, chức năng middleware và các route API.

## Cấu Trúc Dự Án
Các thư mục và tệp chính trong dự án như sau:

- **config/**: Chứa các tệp cấu hình cho ứng dụng (ví dụ: CORS).
- **controllers/**: Chứa các bộ điều khiển định nghĩa logic xử lý yêu cầu và phản hồi.
- **lib/**: Bao gồm các tệp thư viện cung cấp các hàm tiện ích và trợ giúp (ví dụ: db).
- **middlewares/**: Chứa các hàm middleware xử lý yêu cầu trước khi đến các bộ điều khiển.
- **prisma/**: Chứa cấu hình và tệp schema của Prisma ORM cho tương tác cơ sở dữ liệu.
- **routes/**: Định nghĩa các route API và liên kết chúng với các hàm bộ điều khiển tương ứng.
- **.gitignore**: Chỉ định các tệp và thư mục sẽ bị Git bỏ qua.
- **package.json**: Liệt kê các phụ thuộc của dự án và các script.
- **server.js**: Thiết lập server.

## Sơ Đồ Cơ Sở Dữ Liệu
![Sơ Đồ Cơ Sở Dữ Liệu](https://github.com/TaThasi/burogu/assets/120630656/9c4766db-d5fc-4d6a-b0f2-188410351c4a)

## Hướng Dẫn Cài Đặt

### Clone Repository:
```sh
git clone https://github.com/TaThasi/burogu.git
cd burogu
```
### Cài Đặt Dependencies:
```sh
npm install
```
### Cài đặt biến môi trường
```sh
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=
CLIENT_URL=""
DATABASE_URL=""
DIRECT_URL="p"
```
### Chạy Migration Cơ Sở Dữ Liệu:
```sh
npx prisma migrate dev
```
### Khởi Động Server:
```sh
npm start
```


