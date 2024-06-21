import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import {differenceInHours, differenceInMinutes} from 'date-fns'
async function refreshAccessToken(refreshToken: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refreshtoken`, {
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
        return '';
    }
}
function deleteTokens() {
    cookies().delete('token');
    cookies().delete('user');
    cookies().delete('refreshToken');
}
export async function GET(request: Request) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('token')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const user = cookieStore.get('user')?.value;


    if (!accessToken || !user || !refreshToken) {
        deleteTokens();
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
        if(differenceInHours(refreshTokenExpiryDate, now) < 0) {
            deleteTokens();
            return new Response(JSON.stringify({ message: "Refresh token expired", exp: true}), {
                status: 400,
            });
        }

        if (differenceInMinutes(tokenExpiryDate, now) <= 2) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if(newAccessToken === '') {
                return new Response(JSON.stringify({ error: 'Invalid refresh token', exp: true }), {
                    status: 400,
                });
            }
            cookies().delete('token');
            return new Response(JSON.stringify({ newAccessToken, exp: false}), {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${newAccessToken}; Path=/; HttpOnly; Secure;SameSite=Strict; Max-Age=${15 * 60}`
                }
            });
        } 
        return new Response(JSON.stringify({ message:'Token is still valid', exp: false}), {
            status: 200,
        });
    } catch (err) {
        deleteTokens()
        return new Response(JSON.stringify({ error: 'Invalid access token', exp: true }), {
            status: 400,
        });
    }
}