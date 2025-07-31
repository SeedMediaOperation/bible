
import nodemailer from 'nodemailer';
import {routing} from "@/lib/i18n/routing";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${routing.defaultLocale}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"No Reply"`,
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested to reset your password.</p>
      <p><a href="${resetLink}">Click here to reset your password</a></p>
      <p>This link will expire in 1 hour.</p>
    `,
  });
};
