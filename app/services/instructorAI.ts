/**
 * services/instructorAI.ts
 *
 * Capa de servicio para el Instructor IA de CapiMcBrown.
 *
 * TEXTO (sendMessage): sigue simulado por ahora — no cambia en esta fase.
 * VOZ (connectVoice / disconnectVoice / streamAudio): ya está conectada de
 * verdad a Deepgram Voice Agent, usando el SDK oficial @deepgram/agents.
 *
 * La clave real de Deepgram vive únicamente en el servidor (variable de
 * entorno DEEPGRAM_API_KEY en Vercel) y nunca llega al navegador. El
 * navegador solo recibe tokens temporales de 60 segundos generados por
 * app/api/deepgram-token/route.ts.
 */

import { AgentSession, AgentMicrophone, AgentPlayer } from "@deepgram/agents";
import { INSTRUCTOR_PROMPT, INSTRUCTOR_GREETING } from "./aerodinamicaPrompt";

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
 * Fase de texto: todavía simulado (no conectado a un LLM de texto).
 */
export async function sendMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  void message;
  void history;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return SIMULATED_REPLY;
}

export type VoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "agent-thinking"
  | "agent-speaking"
  | "error";

export interface VoiceCallbacks {
  onStateChange?: (state: VoiceState) => void;
  onTranscript?: (role: ChatRole, content: string) => void;
  onError?: (message: string) => void;
}

export interface VoiceController {
  disconnect: () => void;
  mute: () => void;
  unmute: () => void;
}

let activeSession: AgentSession | null = null;
let activeMic: AgentMicrophone | null = null;
let activePlayer: AgentPlayer | null = null;

/**
 * Abre una sesión de voz en tiempo real contra Deepgram Voice Agent:
 * captura el micrófono, transmite el audio, reproduce la respuesta hablada
 * del agente, y reporta el estado y la transcripción a través de callbacks.
 */
export async function connectVoice(
  callbacks: VoiceCallbacks = {}
): Promise<VoiceController> {
  const { onStateChange, onTranscript, onError } = callbacks;

  onStateChange?.("connecting");

  const session = new AgentSession({
    auth: {
      tokenFactory: () => fetch("/api/deepgram-token").then((r) => r.text()),
    },
    agent: {
      language: "es",
      greeting: INSTRUCTOR_GREETING,
      listen: {
        provider: { version: "v1", type: "deepgram", model: "nova-3", language: "es" },
      },
      think: {
        provider: { type: "google", model: "gemini-3.1-flash-lite" },
        prompt: INSTRUCTOR_PROMPT,
      },
      speak: {
        provider: { type: "deepgram", model: "aura-2-celeste-es" },
      },
    },
  });

  // const player = new AgentPlayer();  // Deshabilitado: solo texto por ahora
  const mic = new AgentMicrophone((data) => session.sendAudio(data));
  // session.on("audio", (chunk) => player.queue(chunk));  // Deshabilitado
// player.interrupt();  // Deshabilitado
  // session.on("audio", (chunk) => player.queue(chunk));  // Deshabilitado
// player.interrupt();  // Deshabilitado
    // player.interrupt();  // Deshabilitado
    onStateChange?.("listening");
  });
  session.on("agent-thinking", () => onStateChange?.("agent-thinking"));
  session.on("agent-started-speaking", () => onStateChange?.("agent-speaking"));
  session.on("agent-audio-done", () => onStateChange?.("listening"));
  session.on("conversation-text", (msg) => {
    onTranscript?.(msg.role === "user" ? "user" : "assistant", msg.content);
  });
  session.on("connected", () => onStateChange?.("listening"));
  session.on("disconnected", () => onStateChange?.("idle"));
  session.on("error", (err) => {
    onStateChange?.("error");
    onError?.(err.description ?? "Ocurrió un error en la sesión de voz.");
  });
  session.on("sdk-error", (err) => {
    onStateChange?.("error");
    onError?.(err.message);
  });

  try {
    await session.connect();
    await mic.start();
  } catch {
    onStateChange?.("error");
    onError?.("No se pudo iniciar el micrófono o la conexión de voz.");
    throw new Error("voice-connect-failed");
  }

  activeSession = session;
  activeMic = mic;
  activePlayer = player;

  return {
    disconnect: () => disconnectVoice(),
    mute: () => mic.mute(),
    unmute: () => mic.unmute(),
  };
}

/**
 * Cierra la sesión de voz activa y libera el micrófono y el reproductor.
 */
export function disconnectVoice(): void {
  activeMic?.stop();
  activeSession?.disconnect();
  activePlayer?.dispose();
  activeMic = null;
  activeSession = null;
  activePlayer = null;
}

/**
 * Reservado para transmisión manual de fragmentos de audio.
 * En el flujo actual, AgentMicrophone transmite el audio automáticamente,
 * así que esta función normalmente no hace falta llamarla directamente.
 */
export function streamAudio(chunk: ArrayBuffer): void {
  activeSession?.sendAudio(chunk);
}
