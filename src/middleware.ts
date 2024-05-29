import {type NextRequest, NextResponse} from 'next/server'
import {getUserAsAdmin} from "~/server/supabase/supabaseClient";
import {cookies} from "next/headers";

const publicRoutes = ['/', '/login', 'signup']

export async function middleware(request: NextRequest) {
    const mappedCookies = new Map(cookies());
    const accessToken = mappedCookies.get("access-token")?.value;

    if (accessToken) {
        const user = await getUserAsAdmin(accessToken)

        if (user) {
            return NextResponse.next()
        }
    }

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

    if (isPublicRoute) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}