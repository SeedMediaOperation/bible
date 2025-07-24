import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createEmailVerificationToken } from "@/lib/emailVerification";
import sendVerificationEmail from "@/lib/sendVerificationEmail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
  const { username, email, password } = await req.json();

  // Check if username or email is already taken
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Username or email already exists" },
      { status: 409 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      isVerifyEmail: false,
    },
  });

  // Create email verification token & send email
  const token = await createEmailVerificationToken(user.id);
  await sendVerificationEmail(user.email, token.token); // token might be string or object depending on your function

  return NextResponse.json(
      {
        data: user,
        message: "Registration successful! Please check your email to verify your account."},
      { status: 201 }
  );
  } catch (error) {
    console.error("User creation failed:", error);
    return NextResponse.json(
        { message: "Failed to register user. Please try again later." },
        { status: 500 }
    );
  }
}
