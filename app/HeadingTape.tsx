"use client";

import { useState } from "react";

const HEADINGS = [
  { deg: "000", label: "Inicio", href: "#inicio" },
  { deg: "090", label: "Programas", href: "#programas" },
  { deg: "180", label: "Metodología", href: "#metodologia" },
  { deg: "270", label: "Contacto", href: "#contacto" },
];

export default function HeadingTape() {
  const [active, setActive] = useState("000");

  return (
    <header className="sticky top-0 z-50 border-b border-panel-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <span className="font-display text-sm font-semibold tracking-[0.2em] text-brass-soft">
          @capimcbrown
        </span>

        <nav
          aria-label="Navegación principal"
          className="heading-tick relative flex flex-1 items-center justify-between overflow-x-auto py-2"
        >
          {HEADINGS.map((h) => (
            <a
              key={h.deg}
              href={h.href}
              onClick={() => setActive(h.deg)}
              className="group flex flex-col items-center gap-1 px-3 whitespace-nowrap"
            >
              <span
                className={`font-mono text-[11px] tracking-widest transition-colors ${
                  active === h.deg
                    ? "text-brass"
                    : "text-steel group-hover:text-brass-soft"
                }`}
              >
                {h.deg}°
              </span>
              <span
                className={`text-xs font-medium transition-colors ${
                  active === h.deg
                    ? "text-foreground"
                    : "text-foreground/50 group-hover:text-foreground/80"
                }`}
              >
                {h.label}
              </span>
              {active === h.deg && (
                <span className="h-0.5 w-6 rounded-full bg-brass" />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden shrink-0 rounded-sm border border-brass/60 px-4 py-2 font-mono text-xs tracking-wide text-brass-soft transition-colors hover:bg-brass/10 sm:inline-block"
        >
          Reservar cupo
        </a>
      </div>
    </header>
  );
}
