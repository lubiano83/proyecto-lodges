import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get(String(process.env.COOKIE_NAME))?.value;

    if (!token) {
      if(path.startsWith("/auth")) return NextResponse.redirect(new URL("/login", req.url));
      if(path.startsWith("/admin")) return NextResponse.redirect(new URL("/forbidden", req.url));
      return NextResponse.next();
    }

    const decoded = jwt.verify(token, process.env.COOKIE_KEY!) as any;
    const { role } = decoded;

    if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
      if (role === "admin" || role === "developer") return NextResponse.next();
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/api/admin/:path*"],
};