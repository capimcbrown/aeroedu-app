"use client";

interface InstructorButtonProps {
  onClick: () => void;
}

export default function InstructorButton({ onClick }: InstructorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Abrir el Instructor IA de CapiMcBrown"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-brass/60 bg-panel px-5 py-3.5 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:bg-brass/10 hover:shadow-brass/20 sm:bottom-8 sm:right-8"
    >
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-brass/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="relative text-brass-soft transition-transform duration-300 group-hover:rotate-12"
        >
          <path
            d="M12 2 L14 9 L21 11 L14 13 L12 20 L10 13 L3 11 L10 9 Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-mono text-xs font-medium tracking-widest text-foreground/90">
        INSTRUCTOR IA
      </span>
    </button>
  );
}
