import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import JwtInterface from "../interface/jwt.interface";

const COOKIE_NAME = process.env.COOKIE_NAME!;
const COOKIE_KEY = process.env.COOKIE_KEY!; // misma que usabas en passport

// 👇 Equivalente a tu cookieExtractor, pero para NextRequest
export const cookieExtractor = (req: NextRequest): string | null => {
  const cookie = req.cookies.get(COOKIE_NAME);
  return cookie?.value ?? null;
};

// 👇 Equivalente a tu estrategia "current": devuelve el payload o null
export const getCurrentUser = (req: NextRequest): JwtInterface | null => {
  const token = cookieExtractor(req);
  if (!token) return null;

  try {
    const payload = jwt.verify(token, COOKIE_KEY) as JwtInterface;
    return payload;
  } catch (error) {
    console.error("Error al verificar JWT:", error);
    return null;
  }
};
