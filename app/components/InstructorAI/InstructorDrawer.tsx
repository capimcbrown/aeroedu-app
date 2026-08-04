"use client";

import { useEffect } from "react";
import Chat from "./Chat";

interface InstructorDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function InstructorDrawer({ open, onClose }: InstructorDrawerProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Instructor IA de CapiMcBrown"
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-panel-border bg-background shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-panel-border px-6 py-5">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-brass">
              INSTRUCTOR IA
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold leading-snug">
              Instructor IA de CapiMcBrown
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              Aprende aviación con un instructor inteligente especializado en
              pilotos, tripulantes de cabina y estudiantes de aviación.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-sm border border-panel-border p-2 text-foreground/60 transition-colors hover:border-brass/50 hover:text-brass-soft"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <Chat />
        </div>
      </aside>
    </>
  );
}
