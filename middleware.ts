import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { verifyAccessToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { JWTExpired } from 'jose/errors';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = intlMiddleware(request) ?? NextResponse.next();

  // Protect /dashboard routes
  const isDashboardProtected =
    pathname === '/dashboard' ||
    /^\/dashboard\//.test(pathname) ||
    /^\/(km|en)\/dashboard(\/|$)/.test(pathname);

  if (!isDashboardProtected) {
    return response;
  }

  const accessToken = cookies().get('accessToken')?.value;

  // If no token, redirect to login
  if (!accessToken) {
    const redirectUrl = new URL(`/${routing.defaultLocale}/auth/login`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // Verify token
    const payload = await verifyAccessToken(accessToken);
    const role = payload?.role;

    // If not ADMIN, redirect to home
    if (role !== 'ADMIN') {
      const unauthorizedUrl = new URL(`/${routing.defaultLocale}/`, request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    return response;
  } catch (error) {
    // Clear the invalid/expired token
    const cookieStore = cookies();
    cookieStore.delete('accessToken');

    // Optional: Log specific expiration error
    if (error instanceof JWTExpired) {
      console.warn('Access token expired, redirecting to login...');
    }

    const redirectUrl = new URL(`/${routing.defaultLocale}/auth/login`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    '/',
    '/(km|en)/:path*',
    '/(km|en)/dashboard/:path*',
  ],
};
