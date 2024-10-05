import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/profile")) {
    return authMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
