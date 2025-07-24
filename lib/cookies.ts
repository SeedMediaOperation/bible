import { NextResponse } from "next/server";

export function setAuthCookies(
    accessToken: string,
    refreshToken: string,
    jsonData: object = { message: "Login successful" }
): NextResponse {
    const res = NextResponse.json(jsonData);

    res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod, false in dev
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 1000, // 1h
    });

    res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
}

export function clearAuthCookies(res: NextResponse) {
    res.cookies.set("accessToken", "", { maxAge: 0 });
    res.cookies.set("refreshToken", "", { maxAge: 0 });
    return res;
}
