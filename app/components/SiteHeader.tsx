"use client";

import { useState } from "react";

const LINKS = [
  { deg: "000", label: "Inicio", href: "#inicio" },
  { deg: "090", label: "Cursos", href: "#cursos" },
  { deg: "180", label: "Método", href: "#metodo" },
  { deg: "270", label: "Contacto", href: "#contacto" },
];

export function LogoCapi({ className = "" }: { className?: string }) {
  return (
    <a href="#inicio" className={`relative inline-block leading-none ${className}`}>
      <span className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
        Capi McBrown
      </span>
      {/* avioncito + estela dorada */}
      <svg
        viewBox="0 0 220 34"
        className="pointer-events-none absolute -bottom-4 left-6 h-6 w-[115%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="estela" x1="0" x2="1">
            <stop offset="0" stopColor="#c9962c" stopOpacity="0" />
            <stop offset="1" stopColor="#e0b563" />
          </linearGradient>
        </defs>
        <path d="M2 30 C 70 30, 140 22, 196 8" fill="none" stroke="url(#estela)" strokeWidth="1.6" />
        <g transform="translate(196 -3) scale(0.62) rotate(62 12 12)">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="#e0b563"
          />
        </g>
      </svg>
    </a>
  );
}

export default function SiteHeader() {
  const [active, setActive] = useState("000");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <LogoCapi />

        <nav aria-label="Navegación principal" className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.deg}
              href={l.href}
              onClick={() => setActive(l.deg)}
              className="group flex flex-col items-center"
            >
              <span
                className={`font-mono text-[9px] tracking-[0.25em] transition-colors ${
                  active === l.deg ? "text-brass" : "text-steel group-hover:text-brass-soft"
                }`}
              >
                {l.deg}°
              </span>
              <span
                className={`mt-0.5 text-sm transition-colors ${
                  active === l.deg ? "text-foreground" : "text-foreground/65 group-hover:text-foreground"
                }`}
              >
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <a
          href="#inscripcion"
          className="gold-gradient hidden rounded-md px-5 py-2.5 text-sm font-semibold text-[#0b1220] shadow-[0_6px_24px_-8px_rgba(224,181,99,0.6)] transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Inscríbete
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-brass/40 px-3 py-2 font-mono text-xs tracking-widest text-brass-soft md:hidden"
          aria-label="Abrir menú"
        >
          {open ? "CERRAR" : "MENÚ"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/5 px-6 pb-5 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.deg}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/5 py-3 text-sm"
            >
              <span>{l.label}</span>
              <span className="font-mono text-[10px] tracking-widest text-steel">{l.deg}°</span>
            </a>
          ))}
          <a
            href="#inscripcion"
            onClick={() => setOpen(false)}
            className="gold-gradient mt-4 block rounded-md px-5 py-3 text-center text-sm font-semibold text-[#0b1220]"
          >
            Inscríbete
          </a>
        </nav>
      )}
    </header>
  );
}
