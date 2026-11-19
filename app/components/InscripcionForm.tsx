"use client";

import { useState } from "react";

// Formulario de Formspree que envía los datos a contacto@capimcbrown.com
const FORM_ENDPOINT = "https://formspree.io/f/mljbnvbl";

const PERFILES = [
  "Aspirante a TCP (tripulante de cabina)",
  "TCP en ejercicio",
  "Estudiante de piloto privado",
  "Piloto privado",
  "Estudiante de piloto comercial",
  "Piloto comercial",
  "Despachador / estudiante de despacho",
  "Otro",
];

// Cursos agrupados por rol, según los módulos teóricos de los cursos iniciales del RAC 141
// (Ap. 1 y 2 pilotos, Ap. 7 despachadores, Ap. 8 TCP). No incluye ditching, evacuación ni inglés técnico.
const CURSOS: { grupo: string; cursos: string[] }[] = [
  {
    grupo: "Pilotos (privado y comercial)",
    cursos: [
      "Preparación examen Piloto Comercial (PCA)",
      "Preparación examen Piloto Privado (PPA)",
      "Curso de tierra Seneca II y III (con certificado)",
      "Transición a aerolínea",
      "Derecho aéreo",
      "Principios de vuelo (aerodinámica)",
      "Conocimiento general de las aeronaves",
      "Performance y planificación de vuelo",
      "Meteorología",
      "Navegación",
      "Procedimientos operacionales",
      "Factores humanos – actuación humana",
      "Comunicaciones aeronáuticas – radiotelefonía",
    ],
  },
  {
    grupo: "Despachadores de vuelo",
    cursos: [
      "Derecho aéreo",
      "Aerodinámica y teoría de vuelo",
      "Conocimiento general de las aeronaves",
      "Peso y balance",
      "Cálculo de performance y planificación de vuelo",
      "Meteorología",
      "Navegación",
      "Procedimientos operacionales",
      "Comunicaciones aeronáuticas",
      "Actuación humana – factores humanos",
      "Seguridad aérea",
    ],
  },
  {
    grupo: "Tripulantes de cabina (TCP)",
    cursos: [
      "Derecho aéreo",
      "Aerodinámica básica",
      "Meteorología básica",
      "Obligaciones y responsabilidades",
      "Mercancías peligrosas (MMPP)",
      "Actuación humana",
      "Supervivencia (teórico)",
      "Medicina aeroespacial (fisiología de vuelo) y primeros auxilios",
      "Prevención de accidentes",
      "Seguridad de la aviación (AVSEC)",
      "Temas operacionales generales",
      "Procedimientos de emergencia y coordinación de la tripulación",
      "Familiarización con los equipos de emergencia",
    ],
  },
  {
    grupo: "Para todos los roles",
    cursos: [
      "CRM aplicado a la línea aérea (sin certificación)",
      "Aún no sé, quiero orientación",
    ],
  },
];

type Estado = "idle" | "enviando" | "ok" | "error";

const inputClass =
  "w-full rounded-lg border border-panel-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-brass";
const labelClass = "mb-1 block text-xs font-medium tracking-wide text-foreground/70";

export default function InscripcionForm() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const curso = String(data.get("curso") || "");
    if (!nombre || !email || !whatsapp || !curso) {
      setError("Por favor completa nombre, correo, WhatsApp y el curso de interés.");
      return;
    }

    data.append("_subject", `Nueva inscripción: ${curso} — ${nombre}`);
    data.append("origen", "capimcbrown.com — formulario de inscripción");

    setEstado("enviando");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("envio");
      form.reset();
      setEstado("ok");
    } catch {
      setEstado("error");
      setError(
        "No pudimos enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp."
      );
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-md border border-green-500/50 bg-green-500/10 p-8 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-green-500">✓ RECIBIDO</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          ¡Gracias por tu interés!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
          Ya tenemos tus datos. Te contactaremos pronto con la información del
          curso, fechas e inscripción.
        </p>
        <button
          onClick={() => setEstado("idle")}
          className="mt-6 font-mono text-xs tracking-widest text-brass-soft underline-offset-4 hover:underline"
        >
          Enviar otra inscripción
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-panel/60 p-6 sm:grid-cols-2 sm:p-10"
    >
      {/* Campo trampa contra spam (oculto para personas) */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className={labelClass}>Nombre completo *</label>
        <input name="nombre" type="text" className={inputClass} placeholder="Tu nombre y apellido" />
      </div>
      <div>
        <label className={labelClass}>Correo electrónico *</label>
        <input name="email" type="email" className={inputClass} placeholder="tu@correo.com" />
      </div>
      <div>
        <label className={labelClass}>WhatsApp *</label>
        <input name="whatsapp" type="tel" className={inputClass} placeholder="+57 300 000 0000" />
      </div>
      <div>
        <label className={labelClass}>Ciudad y país</label>
        <input name="ciudad" type="text" className={inputClass} placeholder="Cali, Colombia" />
      </div>
      <div>
        <label className={labelClass}>Tu perfil</label>
        <select name="perfil" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecciona una opción
          </option>
          {PERFILES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Curso virtual de interés *</label>
        <select name="curso" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecciona un curso
          </option>
          {CURSOS.map((g) => (
            <optgroup key={g.grupo} label={g.grupo}>
              {g.cursos.map((c) => (
                <option key={`${g.grupo}-${c}`} value={`${c} — ${g.grupo}`}>
                  {c}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Mensaje (opcional)</label>
        <textarea
          name="mensaje"
          rows={3}
          className={inputClass}
          placeholder="Cuéntanos tu meta: examen, chequeo, fecha aproximada…"
        />
      </div>

      {error && <p className="text-sm text-alert sm:col-span-2">{error}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="gold-gradient w-full rounded-md px-7 py-3.5 font-semibold text-[#0b1220] shadow-[0_10px_30px_-10px_rgba(224,181,99,0.7)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
        >
          {estado === "enviando" ? "Enviando…" : "Quiero inscribirme"}
        </button>
        <p className="mt-3 text-xs text-foreground/45">
          Tus datos solo se usan para contactarte sobre los cursos de @capimcbrown.
        </p>
      </div>
    </form>
  );
}
