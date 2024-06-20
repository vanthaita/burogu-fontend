import { cookies } from "next/headers";
export async function GET(request: Request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    console.log(refreshToken);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${refreshToken}`,
        },
    });
    
    if (!res.ok) {
        throw new Error('Logout failed');
    }
    cookies().delete('token');
    cookies().delete('user');
    cookies().delete('refreshToken');
    return Response.json("Logut successfully!", {
        status: 200,
    });
}


