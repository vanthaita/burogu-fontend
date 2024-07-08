import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privatePath = ['/new-post/', '/dashboard', '/followings'];
const authPath = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    // console.log(token);

    if (!token && privatePath.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && authPath.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && privatePath.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/followings',
        '/new-post',
        '/dashboard',
        '/new-post/:path*',
        '/profile/:path*',
        '/dashboard/:path*',
    ]
};
