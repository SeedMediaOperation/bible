import { clearAuthCookies } from "@/lib/cookies";
import { NextResponse } from "next/server";

export const POST = () => {
    const res = NextResponse.json({ message: "Logged out" });
    clearAuthCookies(res);
    return res;
};