import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {verifyAccessToken} from "@/lib/jwt";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1]; // Extract Bearer token
    const { profile } = await req.json();

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(token);

    if (!payload || !payload?.name) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.update({
        where: { username: String(payload.name) },
        data: { profile },
    });

    return NextResponse.json({ message: "Profile picture updated." });
}
