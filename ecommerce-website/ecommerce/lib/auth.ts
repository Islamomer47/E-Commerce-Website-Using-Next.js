import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-jwt-secret");
  } catch (error) {
    return null;
  }
}

export async function authMiddleware(req: any) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect("/login");
  }

  const verified = await verifyJWT(token);
  if (!verified) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
