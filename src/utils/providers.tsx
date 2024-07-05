'use client'

import DashboardNavbar from "@/components/dashboard.navbar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast";
import RefreshTokenAuth from "@/components/refresh.token";
export function Providers({children} : {children: React.ReactNode}) {
    const pathname = usePathname();
    const showNavbar = !['/login', '/register', '/new-post', '/dashboard'].includes(pathname) && !pathname.startsWith('/p/') && !pathname.startsWith('/u/') && !pathname.startsWith('/profile/');
    return (
        <div>
            {showNavbar ? (
                <>
                    <Navbar />
                    <div className="flex flex-col space-y-6 mt-6">
                        <div className="container grid flex-1 gap-6 md:gap-12 md:grid-cols-[200px_1fr]">
                            <aside className="hidden w-[200px] flex-col md:flex">
                                <DashboardNavbar />
                            </aside>
                            <main className="w-full md:w-auto">
                                {children}
                            </main>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    {pathname !== '/new-post' && pathname !== '/login' && pathname !== '/register' && <Navbar /> }
                    {children}
                    {pathname !== '/login' && pathname !== '/register' && pathname !== '/new-post' && <Footer />}
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
            <RefreshTokenAuth />
        </div>
    );
}
