'use client'
import { useAppContext } from "@/context/app.provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshTokenAuth = () => {
    const router = useRouter();
    const {token, setToken} = useAppContext()
    const handle = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api/auth/exp`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setToken(data.newAccessToken)
            if(data.exp) {
                return router.push('/')
            }
        } catch (err) {
            console.error('Error in Auth fetch:', err);
        }
    }
    useEffect(() => {
        const interval = setInterval( async (
        ) => {
            await handle();
        }, 1000 * 60 * 2)
        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
export default RefreshTokenAuth