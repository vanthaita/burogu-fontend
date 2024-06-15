export async function POST(request: Request) {
    const data = await request.json();
    const token = data.accessToken;

    if (!token) {
        return Response.json('Error', {
            status: 400
        });
    }

    return Response.json({ data }, {
        status: 200,
        headers: {
            'Set-Cookie': `token=${token}; Path=/; HttpOnly`
        }
    });
}
