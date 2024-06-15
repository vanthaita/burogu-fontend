"use client"


import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation"


export function Providers({children} : {children: React.ReactNode}) {
    const pathname = usePathname()
    const showNarbar = !['/login', '/register'].includes(pathname);

    return (
        <div>
            {showNarbar && <Navbar />}
           {children}        
        </div>
    )
}
