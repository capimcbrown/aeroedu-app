import { NextResponse } from "next/server";

/**
 * GET /api/deepgram-token
 *
 * Genera un token temporal (JWT) de Deepgram usando la clave API real,
 * que vive únicamente en el servidor como variable de entorno
 * (DEEPGRAM_API_KEY en Vercel). El navegador nunca ve la clave real,
 * solo recibe este token de corta duración.
 *
 * El SDK del cliente (@deepgram/agents) llama a este endpoint antes de
 * cada conexión y reconexión.
 */
export async function GET() {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    return new NextResponse(
      "Falta configurar la variable de entorno DEEPGRAM_API_KEY en Vercel.",
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.deepgram.com/v1/auth/grant", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ttl_seconds: 60 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse(
        `Error al generar el token de Deepgram: ${errorText}`,
        { status: response.status }
      );
    }

    const data = await response.json();

    // El SDK espera el token como texto plano en el cuerpo de la respuesta.
    return new NextResponse(data.access_token, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch {
    return new NextResponse(
      "No se pudo conectar con Deepgram para generar el token.",
      { status: 502 }
    );
  }
}
