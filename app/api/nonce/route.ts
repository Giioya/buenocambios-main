import { NextResponse } from "next/server";

export async function GET() {
  // 🔹 nonce alfanumérico (válido)
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const response = NextResponse.json({ nonce });

  response.cookies.set("siwe", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 👈 clave
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutos
  });

  return response;
}