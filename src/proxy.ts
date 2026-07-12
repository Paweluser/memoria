import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.JWT_SECRET) {
    throw new Error("Brak zmiennej jwt!");
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = path.startsWith("/dashboard");

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
        await jwtVerify(sessionCookie, secretKey);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};