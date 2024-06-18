import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';

async function refreshAccessToken(refreshToken: string) {
    try {
        const res = await fetch('http://localhost:8080/refreshtoken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${refreshToken}`
            },
            cache: 'no-store',
            credentials: 'include'
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

    if (!accessToken || !refreshToken) {
        return new Response(JSON.stringify({ message: "Missing tokens" }), {
            status: 400,
        });
    }

    try {
        const { exp } = jwtDecode<any>(accessToken);
        const tokenExpiry = exp * 1000;

        if (Date.now() - tokenExpiry >= 14 * 60 * 1000) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            console.log('new access token:', newAccessToken);
            return new Response(JSON.stringify({ newAccessToken }), {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${newAccessToken}; Path=/; HttpOnly; Max-Age=${15 * 60}`
                }
            });
        } 

        return new Response(JSON.stringify('Token is still valid'), {
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid access token' }), {
            status: 400,
        });
    }
}
