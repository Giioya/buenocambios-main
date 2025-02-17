import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const uuid = crypto.randomUUID().replace(/-/g, "");

  // Crear la respuesta con la cookie
  const response = NextResponse.json({ id: uuid });

  // Establecer la cookie en la respuesta
  response.cookies.set("payment-nonce", uuid, {
    httpOnly: true,
  });

  console.log("Valor de payment-nonce guardado:", uuid);

  return response;
}

