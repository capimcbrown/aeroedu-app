"use client";

import { useState } from "react";
import {
  connectVoice,
  disconnectVoice,
  type VoiceState,
  type VoiceController,
  type ChatRole,
} from "../../services/instructorAI";

interface VoiceButtonProps {
  onTranscript?: (role: ChatRole, content: string) => void;
}

const STATE_LABEL: Record<VoiceState, string> = {
  idle: "",
  connecting: "Conectando…",
  listening: "Escuchando…",
  "agent-thinking": "Pensando…",
  "agent-speaking": "Hablando…",
  error: "Hubo un problema con la voz. Intenta de nuevo.",
};

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [, setController] = useState<VoiceController | null>(null);

  const isActive = state !== "idle" && state !== "error";

  async function handleClick() {
    if (isActive) {
      disconnectVoice();
      setController(null);
      setState("idle");
      return;
    }

    try {
      const ctrl = await connectVoice({
        onStateChange: setState,
        onTranscript,
        onError: () => setState("error"),
      });
      setController(ctrl);
    } catch {
      setState("error");
    }
  }

  const label = STATE_LABEL[state];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          isActive
            ? "Terminar conversación por voz"
            : "Hablar por voz con el Instructor IA"
        }
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
          state === "error"
            ? "border-alert/60 bg-alert/10 text-alert"
            : isActive
              ? "animate-pulse border-brass bg-brass/10 text-brass"
              : "border-panel-border bg-panel text-foreground/60 hover:border-brass/50 hover:text-brass-soft"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </button>

      {label && (
        <div className="absolute bottom-14 right-0 w-56 rounded-sm border border-panel-border bg-panel px-3 py-2 text-xs leading-relaxed text-foreground/80 shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
}
