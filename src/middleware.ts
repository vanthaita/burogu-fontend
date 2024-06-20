import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privatePath = ['/dashboard', '/new-post'];
const authPath = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    
    if (!token && privatePath.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && authPath.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (token && privatePath.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/login', '/register', '/new-post']
};
