import { verifyAccessToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1]; // Extract Bearer token

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(token);

    if (!payload || !payload?.name) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
        where: { username: payload?.name },
        select: {
            id: true,
            username: true,
            email: true,
            profile: true,
            role: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user, message: "User fetched." }, { status: 200 });
}
