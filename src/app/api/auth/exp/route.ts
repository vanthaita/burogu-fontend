import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import { differenceInHours, differenceInMinutes } from 'date-fns';

interface DecodedToken {
    exp: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refreshtoken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${refreshToken}`,
            },
        });

        if (!res.ok) {
            throw new Error('Refresh token failed');
        }

        const data = await res.json();
        return data.accessToken;
    } catch (err) {
        console.error('Error refreshing access token:', err);
        throw err;
    }
}

export async function GET(request: Request): Promise<Response> {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('token')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const user = cookieStore.get('user')?.value;

    if (!accessToken || !refreshToken || !user) {
        return new Response(JSON.stringify({ message: "Missing tokens", exp: true }), {
            status: 400,
        });
    }

    try {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const accessTokenExpiryDate = new Date(decodedAccessToken.exp * 1000);
        const now = new Date();

        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
        const refreshTokenExpiryDate = new Date(decodedRefreshToken.exp * 1000);

        if (differenceInHours(refreshTokenExpiryDate, now) < 0) {
            return new Response(JSON.stringify({ message: "Refresh token expired", exp: true }), {
                status: 400,
            });
        }

        if (differenceInMinutes(accessTokenExpiryDate, now) <= 2) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            cookieStore.delete('token');

            return new Response(JSON.stringify({ newAccessToken, exp: false }), {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${newAccessToken}; Path=/; SameSite=Strict; Secure; HttpOnly; Max-Age=${15 * 60}`,
                },
            });
        }

        return new Response(JSON.stringify({ message: 'Token is still valid', exp: false }), {
            status: 200,
        });
    } catch (err) {
        console.error('Error validating tokens:', err);
        return new Response(JSON.stringify({ error: 'Invalid access token' }), {
            status: 400,
        });
    }
}
