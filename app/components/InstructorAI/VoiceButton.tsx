"use client";

import { useState } from "react";
import { connectVoice, disconnectVoice } from "../../services/instructorAI";

export default function VoiceButton() {
  const [showNotice, setShowNotice] = useState(false);
  const [active, setActive] = useState(false);

  function handleClick() {
    if (active) {
      disconnectVoice();
      setActive(false);
    } else {
      connectVoice();
      setActive(true);
    }
    setShowNotice(true);
    window.setTimeout(() => setShowNotice(false), 3200);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Hablar por voz con el Instructor IA"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
          active
            ? "border-brass bg-brass/10 text-brass"
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

      {showNotice && (
        <div className="absolute bottom-14 right-0 w-56 rounded-sm border border-panel-border bg-panel px-3 py-2 text-xs leading-relaxed text-foreground/80 shadow-lg">
          Próximamente podrás hablar por voz con el Instructor IA.
        </div>
      )}
    </div>
  );
}
