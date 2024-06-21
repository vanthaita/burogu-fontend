import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    if (!refreshToken) {
        return new Response('No refresh token found', {
            status: 400,
        });
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    });

    if (!res.ok) {
        console.error('Logout failed', res.status, res.statusText);
        throw new Error('Logout failed');
    }

    cookieStore.delete('token');
    cookieStore.delete('user');
    cookieStore.delete('refreshToken');

    return new Response(JSON.stringify({ message: 'Logout successfully!' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
