export async function GET(request: Request) {
    return Response.json("Logut successfully!", {
        status: 200,
        headers: {
            'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=${24 * 60 * 60 * 1000}`
        }
    });
}


