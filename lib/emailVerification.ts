import crypto from 'crypto';
import { prisma } from '@/prisma/client';  // Adjust import to your prisma client path

export async function createEmailVerificationToken(userId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  return await prisma.emailVerificationToken.create({
    data: { userId, token, expiresAt },
  });
}