'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshTokenAuth = () => {
    const router = useRouter();
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
            if(data.exp === true) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    cache: 'no-cache',
                });
                if (!res.ok) {
                    throw new Error('Logout failed');
                }
                const resultFormNextServer = await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api/auth/logout`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  
                  if (!resultFormNextServer.ok) {
                    throw new Error('Login failed');
                  }
                return router.push('/login')
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