import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendResetEmail } from '@/lib/mailer';
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600 * 1000); // 1 hour

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({message:'User not found'}, { status: 404 });

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });

  try {
    await sendResetEmail(email, token);
    return NextResponse.json({message:'Reset email sent'});
  } catch (err) {
    console.error('Email failed:', err);
    return NextResponse.json({message: 'Email sending failed'}, { status: 500 });
  }
}
