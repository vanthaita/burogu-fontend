'use client'
import DashboardNavbar from "@/components/navbar/dashboard.navbar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast";
import RefreshTokenAuth from "@/components/refresh.token";
import { useAppContext } from "@/context/app.provider";
export function Providers({children} : {children: React.ReactNode}) {
    const {user} = useAppContext()
    const pathname = usePathname();
    const showNavbarAndFooter =
        !pathname.startsWith('/new-post/') && 
        !['/login', '/register', ].includes(pathname) && 
        !pathname.startsWith('/p/') && 
        !pathname.startsWith('/u/') && 
        !pathname.startsWith('/dashboard/'); 
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
                <div className="relative w-full h-full">
                    {!pathname.startsWith('/new-post/')  && pathname !== '/login' && pathname !== '/register' && <Navbar /> }
                    {children}
                    {!pathname.startsWith('/new-post/') && pathname !== '/login' && pathname !== '/register' && pathname !== '/new-post' && <Footer />}
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
            {user && <RefreshTokenAuth />}
        </div>
    );
}
