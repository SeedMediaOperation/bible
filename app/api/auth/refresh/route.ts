import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken
} from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie");
  const token = cookie?.split(";").find((c) => c.trim().startsWith("refreshToken="))?.split("=")[1];

  if (!token) {
    return new Response("No token", { status: 401 });
  }

  try {
    // ✅ Verify refresh token (async)
    const payload = await verifyRefreshToken(token) as { id: string; name: string; role: string };

    if (!payload?.id) {
      return new Response("Invalid token payload", { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    // ✅ Make sure token matches user's stored token (optional but secure)
    if (!user || user.refreshToken !== token) {
      return new Response("Invalid token or user", { status: 403 });
    }

    // ✅ Generate new tokens
    const newAccessToken = await signAccessToken({ id: user.id, name: user.username, role: user.role });
    const newRefreshToken = await signRefreshToken({ id: user.id, name: user.username, role: user.role });

    // ✅ Save new refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // ✅ Return new tokens in Set-Cookie
    return NextResponse.json(
      { accessToken: newAccessToken },
      {
        headers: {
          "Set-Cookie": `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
        },
      }
    );
  } catch (err) {
    console.error("❌ Refresh failed:", err);
    return new Response("Token expired or invalid", { status: 403 });
  }
}
