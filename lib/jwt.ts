import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();

const ACCESS_SECRET = encoder.encode(process.env.ACCESS_TOKEN_SECRET!);
const REFRESH_SECRET = encoder.encode(process.env.REFRESH_TOKEN_SECRET!);

interface UserPayload {
  id: string;
  name: string;
  role: string;
}

export const signAccessToken = async (user: UserPayload) => {
  return await new SignJWT({ ...user })    
  .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")         
    .sign(ACCESS_SECRET);
};

export const signRefreshToken = async (user: UserPayload) => {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(REFRESH_SECRET);
};

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    return payload;
  } catch (err) {
    console.error("❌ Access token verification failed:", err);
    return null;
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload;
  } catch (err) {
    console.error("❌ Refresh token verification failed:", err);
    return null;
  }
};


export async function generateEmailToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(process.env.EMAIL_VERIFICATION_SECRET!));
}