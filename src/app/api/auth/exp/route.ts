import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import {differenceInHours, differenceInMinutes} from 'date-fns'
async function refreshAccessToken(refreshToken: string) {
    try {
        const res = await fetch('http://localhost:8080/refreshtoken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${refreshToken}`
            },
        });
        const data = await res.json();
        if (!res.ok) {
            
            throw new Error('Refresh token failed');
        }
        return data.accessToken;
    } catch (err) {
        console.error('Error refreshing access token:', err);
        throw err;
    }
}

export async function GET(request: Request) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('token')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const user = cookieStore.get('user')?.value;

    if (!accessToken || !refreshToken || !user) {

        return new Response(JSON.stringify({ message: "Missing tokens", exp: true}), {
            status: 400,
        });
    }
    try {
        const { exp } = jwtDecode<any>(accessToken);
        const tokenExpiry = exp * 1000;
        const tokenExpiryDate = new Date(tokenExpiry);
        const now = new Date();
        const refreshTokenExp = jwtDecode<any>(refreshToken).exp;
        const refreshTokenExpiry = refreshTokenExp * 1000
        const refreshTokenExpiryDate = new Date(refreshTokenExpiry);
        if(differenceInHours(refreshTokenExpiry, now) < 0) {
            return new Response(JSON.stringify({ message: "Refresh token expired", exp: true}), {
                status: 400,
            });
        }

        if (differenceInMinutes(tokenExpiryDate, now) <= 2) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            cookies().delete('token');
            return new Response(JSON.stringify({ newAccessToken, exp: false}), {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${newAccessToken}; Path=/; HttpOnly; Max-Age=${15 * 60}`
                }
            });
        } 
        return new Response(JSON.stringify({ message:'Token is still valid', exp: false}), {
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid access token' }), {
            status: 400,
        });
    }
}
