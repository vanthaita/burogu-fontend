'use client'
import { useEffect } from "react";

export default function useAuth() {
    useEffect(() => {
        console.log("useAuth");
        const handle = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/exp', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                console.log(data);
            } catch (err) {
                console.error('Error in useAuth fetch:', err);
            }
        }

        handle();
    }, []);
}
