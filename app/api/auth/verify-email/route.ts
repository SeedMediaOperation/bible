import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Missing token' }, { status: 400 });
  }

  // Find the token record and include user
  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  // Token missing or expired?
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  // Mark user email as verified
  await prisma.user.update({
    where: { id: record.userId },
    data: { isVerifyEmail: true },
  });

  // Delete used verification token
  await prisma.emailVerificationToken.delete({ where: { id: record.id } });

  // Extract locale from pathname, fallback to 'en'
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const locale = ['en', 'km'].includes(pathSegments[0]) ? pathSegments[0] : 'en';

  // Build absolute redirect URL to locale login page with verified query
  const redirectUrl = new URL(`/${locale}/auth/login?verified=1`, url.origin);

  return NextResponse.redirect(redirectUrl);
}
