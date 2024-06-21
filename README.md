# Burogu.dev - Ứng Dụng Blog Đa Người Dùng

## Công Nghệ Sử Dụng
- **Backend**: Node.js - Express.js ([GitHub Repository](https://github.com/TaThasi/burogu))
- **Frontend**: Next.js
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

## Kiến Trúc

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
