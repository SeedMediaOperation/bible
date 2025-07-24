import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { verifyAccessToken } from '@/lib/jwt';
import {cookies} from "next/headers";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const intlResponse = intlMiddleware(request);
  const response = intlResponse ?? NextResponse.next();

  // Protect /dashboard and nested routes, localized or not
  const isDashboardProtected =
    pathname === '/dashboard' ||
    /^\/dashboard\//.test(pathname) ||
    /^\/(km|en)\/dashboard(\/|$)/.test(pathname);

  if (!isDashboardProtected) {
    return response;
  }

  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    const redirectUrl = new URL(`/${routing.defaultLocale}/auth/login`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  try {
    const payload = await verifyAccessToken(accessToken) ;
    // You can access the role from the payload token
    const role = payload?.role;
    // Deny access if the user is not admin
    if(role !== 'ADMIN') {
      const unauthorizedUrl = new URL(`/${routing.defaultLocale}/`, request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    return response;
  } catch {
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
