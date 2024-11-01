# Burogu.dev - Ứng Dụng Blog Đa Người Dùng / 複数ユーザー対応ブログアプリケーション

[Link Demo Ứng Dụng / デモリンク](https://burogu-fontend.vercel.app/).

[Video Demo Ứng Dụng / デモ動画リンク](https://www.youtube.com/watch?v=lxkugvKfWcE).

## Giới Thiệu / 紹介

**Burogu.dev** là một ứng dụng blog đa người dùng, cho phép người dùng đăng ký tài khoản, tạo và quản lý các bài viết, bình luận, và tương tác với nội dung từ người dùng khác.  
**Burogu.dev** は、ユーザーがアカウントを登録し、記事の作成・管理、コメント、他のユーザーとのコンテンツに対するインタラクションを可能にする、複数ユーザー対応のブログアプリです。

### Công Nghệ Sử Dụng / 使用技術
- **Backend**: Node.js, Express.js, Supabase (lưu trữ cơ sở dữ liệu), Prisma (ORM)  
  [GitHub Repository Backend](https://github.com/TaThasi/burogu)
- **Frontend**: Next.js 
  - App Router
  - Server và Client component / サーバー・クライアントコンポーネント
  - API Routes và Middleware / APIルートおよびミドルウェア  
  [GitHub Repository Frontend](https://github.com/TaThasi/burogu-fontend)
- **Xác Thực**: JWT (JSON Web Tokens) / JWT（JSON Webトークン）
- **Giao Diện**: Tailwindcss / Tailwind CSS
- **Thành Phần UI**: shadcn/ui
- **Trình Soạn Thảo WYSIWYG**: TinyMCE
- **Forms**: React-Hook-Forms / フォーム
- **Thông Báo (Toasts)**: React-Hot-Toast / 通知
- **Xác Thực Dữ Liệu**: Zod / データ検証
- **Biểu Tượng**: Lucide-Icon / アイコン
- **Ngôn Ngữ**: Typescript / 言語：Typescript

## Chức Năng / 機能

### Đăng Ký / Đăng Nhập / 登録・ログイン

Người dùng có thể tạo tài khoản mới và đăng nhập vào hệ thống để sử dụng các chức năng của ứng dụng.  
ユーザーは新しいアカウントを作成し、アプリケーションの機能を使用するためにシステムにログインできます。

### Tạo và Chia Sẻ Bài Viết / 記事の作成・共有

Người dùng có thể tạo và chia sẻ bài viết mới với các tính năng rich text của trình soạn thảo TinyMCE.  
TinyMCEのリッチテキスト機能を使用して、新しい記事を作成および共有できます。

### Xem và Tương Tác với Bài Viết / 記事の閲覧・インタラクション

Người dùng có thể xem các bài viết, bình luận, upvote hoặc downvote, và lưu trữ bài viết yêu thích.  
ユーザーは記事を閲覧、コメント、アップボート・ダウンボート、お気に入り記事の保存が可能です。

### Theo Dõi Người Dùng Khác / 他ユーザーのフォロー

Người dùng có thể theo dõi các tài khoản khác để cập nhật bài viết mới nhất từ họ.  
ユーザーは他のアカウントをフォローし、最新の投稿を更新できます。

## Kiến Trúc / アーキテクチャ

### Frontend
- **Framework Giao Diện**: Xây dựng trên Next.js, xử lý routing và render phía máy chủ (SSR).  
  インターフェースフレームワーク：Next.js上で構築され、サーバー側レンダリング（SSR）とルーティングを処理します。
- **Thiết Kế Dựa Trên Thành Phần**: Các thành phần giao diện được xây dựng bằng Shadcn-UI và tạo kiểu với Tailwind CSS.  
  コンポーネントベースの設計：Shadcn-UIで構築されたインターフェースコンポーネントを、Tailwind CSSでスタイリングします。
- **Quản Lý Trạng Thái và Biểu Mẫu**: Sử dụng React-Hook-Forms để quản lý biểu mẫu.  
  状態管理とフォーム：React-Hook-Formsを使用してフォームを管理します。
- **Xác Thực**: Sử dụng JWT tokens, lưu trữ trong cookies.  
  認証：JWTトークンを使用し、クッキーに保存します。
- **Middleware**: Triển khai để quản lý truy cập vào các route bảo vệ và chuyển hướng người dùng.  
  ミドルウェア：保護されたルートへのアクセスを管理し、ユーザーをリダイレクトするために実装されています。
- **Tích Hợp Trình Soạn Thảo**: TinyMCE được tích hợp làm trình soạn thảo WYSIWYG để tạo nội dung rich text.  
  エディタ統合：リッチテキストコンテンツの作成のためにTinyMCEエディタが統合されています。
- **Thông Báo**: Sử dụng React-Hot-Toast.  
  通知：React-Hot-Toastを使用します。

### Backend
Các thư mục và tệp chính trong dự án như sau:  
主なプロジェクトのフォルダとファイルは以下の通りです：
- **config/**: Chứa các tệp cấu hình cho ứng dụng (ví dụ: CORS).  
  アプリケーションの設定ファイルを含む（例：CORS）。
- **controllers/**: Chứa các bộ điều khiển định nghĩa logic xử lý yêu cầu và phản hồi.  
  リクエストとレスポンス処理ロジックを定義するコントローラーを含む。
- **lib/**: Bao gồm các tệp thư viện cung cấp các hàm tiện ích và trợ giúp (ví dụ: db).  
  ユーティリティ関数やサポート機能を提供するライブラリファイルを含む（例：db）。
- **middlewares/**: Chứa các hàm middleware xử lý yêu cầu trước khi đến các bộ điều khiển.  
  コントローラーに到達する前にリクエストを処理するミドルウェア関数を含む。
- **prisma/**: Chứa cấu hình và tệp schema của Prisma ORM cho tương tác cơ sở dữ liệu.  
  データベースとのインタラクション用のPrisma ORMの設定とスキーマファイルを含む。
- **routes/**: Định nghĩa các route API và liên kết chúng với các hàm bộ điều khiển tương ứng.  
  APIルートを定義し、それを対応するコントローラ関数にリンクします。
- **Cơ Sở Dữ Liệu**: Supabase được sử dụng để lưu trữ cơ sở dữ liệu, với Prisma làm ORM để tương tác.  
  データベース：Supabaseはデータベースの保存に使用され、Prismaはインタラクション用のORMとして使用されます。

## Hướng Dẫn Cài Đặt / インストールガイド

### Frontend

1. **Clone Repository / リポジトリをクローン**

    ```sh
    git clone https://github.com/TaThasi/burogu-fontend.git
    cd burogu-fontend
    ```

2. **Cài Đặt Dependencies / 依存関係をインストール**

    ```sh
    npm install
    ```

3. **Chạy Server Phát Triển / 開発サーバーを起動**

    ```sh
    npm run dev
    ```

4. **Cấu Hình Biến Môi Trường / 環境変数の設定**

    Tạo file `.env` trong thư mục gốc và thêm các biến môi trường sau:  
    ルートディレクトリに `.env` ファイルを作成し、次の環境変数を追加します：

    ```sh
    SERVER_URL=""
    TINY_API=""
    ```

### Backend

1. **Clone Repository / リポジトリをクローン**

    ```sh
    git clone https://github.com/TaThasi/burogu.git
    cd burogu
    ```

2. **Cài Đặt Dependencies / 依存関係をインストール**

    ```sh
    npm install
    ```

3. **Cài đặt biến môi trường / 環境変数の設定**

    ```sh
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    PORT=
    CLIENT_URL=""
    DATABASE_URL=""
    DIRECT_URL=""
    ```

4. **Chạy Migration Cơ Sở Dữ Liệu / データベース移行の実行**

    ```sh
    npx prisma migrate dev
    ```

5. **Khởi Động Server / サーバーの起動**

    ```sh
    npm run dev
    ```

[Link Repository Backend](https://github.com/TaThasi/burogu)  
[Link Repository Frontend](https://github.com/TaThasi/burogu-fontend)
