
import { prisma } from '@/prisma/client';
import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) return NextResponse.json({message:'Invalid or expired token'}, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({message:'Password reset successful'}, { status: 200 });
}
