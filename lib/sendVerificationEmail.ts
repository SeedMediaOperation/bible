import nodemailer from 'nodemailer';

export default async function sendVerificationEmail(email: string, token: string) {
     const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: 'The Bible Society in Cambodia.',
    to: email,
    subject: 'Verify your email address',
    html: `<p class="text-[20px]">Click <a href="${verificationUrl}" class="px-3 py-1 bg-indigo-950 rounded-full">here</a> to verify your email.</p>`,
  });
}
