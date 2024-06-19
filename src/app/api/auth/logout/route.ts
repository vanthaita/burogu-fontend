import { cookies } from "next/headers";
export async function GET(request: Request) {
    cookies().delete('token');
    cookies().delete('user');
    cookies().delete('refreshToken');
    return Response.json("Logut successfully!", {
        status: 200,
    });
}


