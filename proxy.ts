import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  try {
    const token = req.cookies.get(String(process.env.COOKIE_NAME))?.value;

    if (!token) {
      // Si no hay token:
      if (path.startsWith("/api") || path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      // Para páginas (admin) lo mando al home (o al login si quieres)
      return NextResponse.redirect(new URL("/", req.url));
    }

    const decoded = jwt.verify(token, process.env.COOKIE_KEY!) as any;
    console.log("decoded:", decoded);
    const { role } = decoded;

    // 🔹 Rutas de API -> solo developer
    if (path.startsWith("/api")) {
      if (role === "developer") return NextResponse.next();
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
    }

    // 🔹 Rutas de admin -> admin o developer
    if (path.startsWith("/admin")) {
      if (role === "admin" || role === "developer") return NextResponse.next();
      // user (o cualquier otro rol) -> fuera
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Por si acaso, cualquier otra ruta pasa normal
    return NextResponse.next();
  } catch (error) {
    console.error("Error en middleware:", error);

    if (path.startsWith("/api")) {
      return NextResponse.json({ message: "Token inválido o expirado" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};