# Burogu.dev - Ứng Dụng Blog Đa Người Dùng

[Link Demo Ứng Dụng](https://burogu-fontend.vercel.app/)

## Giới Thiệu

Burogu.dev là một ứng dụng blog đa người dùng. Ứng dụng cho phép người dùng đăng ký tài khoản, tạo và quản lý các bài viết, bình luận, và tương tác với các nội dung từ người dùng khác.

### Công Nghệ Sử Dụng
- **Backend**: Node.js, Express.js, Supabase (lưu trữ cơ sở dữ liệu), Prisma (ORM)  
  [GitHub Repository Backend](https://github.com/TaThasi/burogu)
- **Frontend**: Next.js 
  - App Router
  - Server và Client component
  - API Routes và Middleware  
  [GitHub Repository Frontend](https://github.com/TaThasi/burogu-fontend)
- **Xác Thực**: JWT (JSON Web Tokens)
- **Giao Diện**: Tailwindcss
- **Thành Phần UI**: shadcn/ui
- **Trình Soạn Thảo WYSIWYG**: TinyMCE
- **Forms**: React-Hook-Forms
- **Thông Báo (Toasts)**: React-Hot-Toast
- **Xác Thực Dữ Liệu**: Zod
- **Biểu Tượng**: Lucide-Icon
- **Ngôn Ngữ**: Typescript

## Chức Năng

### Đăng Ký / Đăng Nhập

Người dùng có thể tạo tài khoản mới và đăng nhập vào hệ thống để sử dụng các chức năng của ứng dụng.

![Đăng Nhập](https://github.com/TaThasi/burogu-fontend/assets/120630656/5de88ca8-b197-44db-a22d-c4898da0031d)
![Đăng Ký](https://github.com/TaThasi/burogu-fontend/assets/120630656/655058a1-4043-4af6-a0e5-6f9e08d6018f)

### Tạo và Chia Sẻ Bài Viết

Người dùng có thể tạo và chia sẻ bài viết mới với các tính năng rich text của trình soạn thảo TinyMCE.

![Tạo Bài Viết](https://github.com/TaThasi/burogu-fontend/assets/120630656/b06f10e7-2e35-460f-a954-25eabd9bceb0)

### Xem và Tương Tác với Bài Viết

Người dùng có thể xem các bài viết của mình hoặc của người khác, bình luận, upvote hoặc downvote, và lưu trữ bài viết yêu thích.

![Xem Bài Viết](https://github.com/TaThasi/burogu-fontend/assets/120630656/c6710f8e-903c-467c-9571-e27f12a584d0)
![Chi Tiết Bài Viết](https://github.com/TaThasi/burogu-fontend/assets/120630656/33198e4d-ed94-47bd-9326-a12e12e19b6d)

### Theo Dõi Người Dùng Khác

Người dùng có thể theo dõi các tài khoản khác để cập nhật bài viết mới nhất từ họ.

![Trang Cá Nhân](https://github.com/TaThasi/burogu-fontend/assets/120630656/2766e43a-84e1-4c6d-9152-10c0e1db21e2)

## Kiến Trúc

### Frontend
- **Framework Giao Diện**: Xây dựng trên Next.js, xử lý routing và render phía máy chủ (SSR).
- **Thiết Kế Dựa Trên Thành Phần**: Các thành phần giao diện được xây dựng bằng Shadcn-UI và tạo kiểu với Tailwind CSS.
- **Quản Lý Trạng Thái và Biểu Mẫu**: Sử dụng React-Hook-Forms để quản lý biểu mẫu.
- **Xác Thực**: Sử dụng JWT tokens, lưu trữ trong cookies.
- **Middleware**: Triển khai để quản lý truy cập vào các route bảo vệ và chuyển hướng người dùng.
- **Tích Hợp Trình Soạn Thảo**: TinyMCE được tích hợp làm trình soạn thảo WYSIWYG để tạo nội dung rich text.
- **Thông Báo**: Sử dụng React-Hot-Toast.

### Backend
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
- **Cơ Sở Dữ Liệu**: Supabase được sử dụng để lưu trữ cơ sở dữ liệu, với Prisma làm ORM để tương tác.
- **Xác Thực và Phân Quyền**: JWT được sử dụng để xác thực và phân quyền người dùng.
- **Sơ Đồ Cơ Sở Dữ Liệu**:

![Sơ Đồ Cơ Sở Dữ Liệu](https://github.com/TaThasi/burogu/assets/120630656/9c4766db-d5fc-4d6a-b0f2-188410351c4a)

## Hướng Dẫn Cài Đặt

### Frontend

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

### Backend

1. **Clone Repository**

    ```sh
    git clone https://github.com/TaThasi/burogu.git
    cd burogu
    ```

2. **Cài Đặt Dependencies**

    ```sh
    npm install
    ```

3. **Cài đặt biến môi trường**

    ```sh
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    PORT=
    CLIENT_URL=""
    DATABASE_URL=""
    DIRECT_URL="p"
    ```

4. **Chạy Migration Cơ Sở Dữ Liệu**

    ```sh
    npx prisma migrate dev
    ```

5. **Khởi Động Server**

    ```sh
    npm start
    ```

[Link Repository Backend](https://github.com/TaThasi/burogu)  
[Link Repository Frontend](https://github.com/TaThasi/burogu-fontend)
