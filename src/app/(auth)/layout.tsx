// components/AuthLayout.js
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center md:justify-center h-screen bg-gray-100 p-5 sm:p-10">
      <Link href="/">
        <h1 className="font-bold text-4xl md:text-4xl lg:text-6xl mb-8 md:mt-0 mt-20 ">
          Burogu<span className="text-blue-500">.dev</span>
        </h1>
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Image 
            alt="auth image"
            src="/images/auth-image.svg"
            width={300}
            height={300}
            className="object-contain md:block hidden"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
