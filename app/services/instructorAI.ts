/**
 * services/instructorAI.ts
 *
 * Capa de servicio para el Instructor IA de CapiMcBrown.
 *
 * FASE ACTUAL: todas las funciones devuelven respuestas simuladas.
 * No hay ninguna conexión real a un proveedor de IA todavía.
 *
 * PREPARADO PARA CONECTAR MÁS ADELANTE:
 *  - Deepgram   (voz: reconocimiento y síntesis de voz en tiempo real)
 *  - Gemini     (LLM de Google)
 *  - Claude     (LLM de Anthropic)
 *  - OpenAI     (LLM de OpenAI)
 *  - Base de conocimiento propia (ebooks, PDFs y cursos de @capimcbrown)
 *
 * Cuando se conecte un proveedor real, solo hay que reemplazar el cuerpo
 * de estas funciones — el resto de la interfaz (Chat.tsx, VoiceButton.tsx,
 * InstructorDrawer.tsx) no necesita cambiar.
 */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

const SIMULATED_REPLY =
  "Gracias por tu pregunta. Muy pronto el Instructor IA de CapiMcBrown estará disponible para ayudarte a aprender aviación.";

/**
 * Envía un mensaje de texto al Instructor IA y devuelve su respuesta.
 *
 * TODO (fase de conexión real): reemplazar por una llamada a la API route
 * correspondiente, por ejemplo:
 *   const res = await fetch("/api/instructor-ai/chat", {
 *     method: "POST",
 *     body: JSON.stringify({ message, history }),
 *   });
 *   return (await res.json()).reply;
 */
export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  void message;
  void history;

  // Simula latencia de red / generación del modelo.
  await new Promise((resolve) => setTimeout(resolve, 900));

  return SIMULATED_REPLY;
}

/**
 * Inicia una sesión de voz en tiempo real.
 *
 * TODO (fase de conexión real): abrir un WebSocket contra el Deepgram
 * Voice Agent (o equivalente) y comenzar a transmitir audio del micrófono.
 */
export function connectVoice(): void {
  // Sin implementar todavía. Reservado para la integración con Deepgram.
}

/**
 * Cierra la sesión de voz en tiempo real.
 *
 * TODO (fase de conexión real): cerrar el WebSocket y liberar el micrófono.
 */
export function disconnectVoice(): void {
  // Sin implementar todavía.
}

/**
 * Transmite un fragmento de audio capturado del micrófono al backend de voz.
 *
 * TODO (fase de conexión real): enviar el chunk de audio (por ejemplo,
 * un Float32Array o Blob) al WebSocket abierto por connectVoice().
 */
export function streamAudio(chunk: unknown): void {
  void chunk;
  // Sin implementar todavía.
}
