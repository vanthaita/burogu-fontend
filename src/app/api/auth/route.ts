export async function POST(request: Request) {
    const data = await request.json();
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken; 
    const user = JSON.stringify(data.user);

    if (!accessToken) {
        return new Response('Error', {
            status: 400
        });
    }

    const headers = new Headers();
    headers.append('Set-Cookie', `token=${accessToken}; Path=/; HttpOnly; Max-Age=${24 * 60 * 60}`);
    headers.append('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}`); // 7 days for refresh token
    headers.append('Set-Cookie', `user=${user}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}`); // 7 days for refresh token
    
    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: headers
    });
}
