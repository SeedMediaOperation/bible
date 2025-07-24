import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/cookies";
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import {signAccessToken, signRefreshToken} from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({message:"Invalid credentials"}, { status: 401 });
    }

    if (!user.isVerifyEmail) {
      return NextResponse.json({ message: "Please verify your username." }, { status: 403 });
    }

    const userPayload = { id: user.id, name: user.username, role: user.role };

    const accessToken = await signAccessToken(userPayload);
    const refreshToken = await signRefreshToken(userPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return setAuthCookies(accessToken, refreshToken, {
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  }catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}