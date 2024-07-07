'use client'
import DashboardNavbar from "@/components/navbar/dashboard.navbar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast";
import RefreshTokenAuth from "@/components/refresh.token";
export function Providers({children} : {children: React.ReactNode}) {
    const pathname = usePathname();
    const showNavbarAndFooter =
        !pathname.startsWith('/new-post/') && // không bắt đầu bằng '/new-post/'
        !['/login', '/register', '/dashboard'].includes(pathname) && // không nằm trong các route này
        !pathname.startsWith('/p/') && // không bắt đầu bằng '/p/'
        !pathname.startsWith('/u/') && // không bắt đầu bằng '/u/'
        !pathname.startsWith('/profile/'); // không bắt đầu bằng '/profile/'
    return (
        <div>
            {showNavbarAndFooter ? (
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
                    {!pathname.startsWith('/new-post/')  && pathname !== '/login' && pathname !== '/register' && <Navbar /> }
                    {children}
                    {!pathname.startsWith('/new-post/') && pathname !== '/login' && pathname !== '/register' && pathname !== '/new-post' && <Footer />}
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
            <RefreshTokenAuth />
        </div>
    );
}
