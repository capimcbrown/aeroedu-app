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

const CURSOS = [
  "Aerodinámica para TCP",
  "Derecho Aéreo para TCP",
  "Preparación examen Piloto Comercial (PCA)",
  "Preparación examen Piloto Privado",
  "Despachadores",
  "Curso de tierra Seneca II y III (con certificado)",
  "CRM aplicado a la línea aérea (sin certificación)",
  "Mercancías peligrosas (MMPP)",
  "Medicina aeroespacial (fisiología de vuelo)",
  "Aún no sé, quiero orientación",
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
          {CURSOS.map((c) => (
            <option key={c}>{c}</option>
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
