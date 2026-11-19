"use client";

import { useEffect, useMemo, useState } from "react";
import { MATERIAS, PREGUNTAS_PCA, type PreguntaPCA } from "./preguntas";

// Mismo buzón de Formspree que el test de TCP
const FORM_ENDPOINT = "https://formspree.io/f/xaqgvnee";
const PASSING_SCORE = 80; // nota mínima sobre 100
const SIMULACRO_SIZE = 50; // preguntas del simulacro aleatorio
const STORAGE_KEY = "pca_registro";

type Step = "register" | "menu" | "quiz" | "done";
type Modo = { tipo: "simulacro" } | { tipo: "materia"; materia: number };
type Respuesta = { pregunta: PreguntaPCA; elegida: number };

function mezclar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Simulacro: reparte las preguntas entre las 9 materias según el peso de cada una en el banco
function armarSimulacro(): PreguntaPCA[] {
  const total = PREGUNTAS_PCA.length;
  const porMateria = MATERIAS.map((_, s) => PREGUNTAS_PCA.filter((p) => p.s === s));
  const cupos = porMateria.map((lista) => Math.floor((lista.length / total) * SIMULACRO_SIZE));
  let faltan = SIMULACRO_SIZE - cupos.reduce((a, b) => a + b, 0);
  const orden = porMateria
    .map((lista, s) => ({ s, resto: (lista.length / total) * SIMULACRO_SIZE - cupos[s] }))
    .sort((x, y) => y.resto - x.resto);
  for (const { s } of orden) {
    if (faltan <= 0) break;
    cupos[s]++;
    faltan--;
  }
  const elegidas = porMateria.flatMap((lista, s) => mezclar(lista).slice(0, cupos[s]));
  return mezclar(elegidas);
}

function nombreModo(modo: Modo) {
  return modo.tipo === "simulacro" ? "Simulacro aleatorio" : MATERIAS[modo.materia];
}

export default function TestPCA() {
  const [step, setStep] = useState<Step>("register");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");

  const [modo, setModo] = useState<Modo>({ tipo: "simulacro" });
  const [preguntas, setPreguntas] = useState<PreguntaPCA[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

  const conteo = useMemo(
    () => MATERIAS.map((_, s) => PREGUNTAS_PCA.filter((p) => p.s === s).length),
    []
  );

  useEffect(() => {
    try {
      const guardado = sessionStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const d = JSON.parse(guardado);
        setName(d.nombre || "");
        setEmail(d.email || "");
        setWhatsapp(d.whatsapp || "");
        setStep("menu");
      }
    } catch {
      // Si el navegador no permite guardar, se pide el registro de nuevo.
    }
  }, []);

  async function enviar(datos: Record<string, unknown>) {
    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: name,
          email,
          whatsapp,
          test: "PCA — Piloto Comercial Avión",
          fecha: new Date().toISOString(),
          ...datos,
        }),
      });
    } catch {
      // Si falla el envío, el estudiante igual puede seguir.
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError("Por favor completa los tres campos.");
      return;
    }
    setLoading(true);
    await enviar({ tipo: "Registro" });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ nombre: name, email, whatsapp }));
    } catch {
      // sin almacenamiento: no pasa nada
    }
    setLoading(false);
    setStep("menu");
  }

  function iniciar(m: Modo) {
    const lista =
      m.tipo === "simulacro"
        ? armarSimulacro()
        : mezclar(PREGUNTAS_PCA.filter((p) => p.s === m.materia));
    setModo(m);
    setPreguntas(lista);
    setCurrent(0);
    setSelected(null);
    setRespuestas([]);
    setStep("quiz");
    window.scrollTo({ top: 0 });
  }

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setRespuestas((r) => [...r, { pregunta: preguntas[current], elegida: index }]);
  }

  function handleNext() {
    if (current + 1 < preguntas.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      window.scrollTo({ top: 0 });
    } else {
      const correctas = respuestas.filter((r) => r.elegida === r.pregunta.a).length;
      const nota = Math.round((correctas / preguntas.length) * 100);
      enviar({
        tipo: "Resultado final",
        modalidad: nombreModo(modo),
        correctas: `${correctas} / ${preguntas.length}`,
        nota_sobre_100: nota,
        resultado: nota >= PASSING_SCORE ? "APROBADO" : "NO APROBADO",
      });
      setStep("done");
      window.scrollTo({ top: 0 });
    }
  }

  const aciertos = respuestas.filter((r) => r.elegida === r.pregunta.a).length;
  const p = preguntas[current];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-panel-border px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-brass-soft">
            @capimcbrown
          </span>
          <p className="mt-1 font-mono text-xs tracking-widest text-steel">
            TEST PCA · PILOTO COMERCIAL AVIÓN
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {step === "register" && (
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">
              Test PCA — Piloto Comercial Avión
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Banco de {PREGUNTAS_PCA.length} preguntas en {MATERIAS.length} materias, con
              corrección y explicación inmediata en cada una. Puedes practicar por materia o
              presentar un simulacro aleatorio de {SIMULACRO_SIZE} preguntas. Antes de comenzar,
              déjanos tus datos.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-foreground/70">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-panel-border bg-panel px-4 py-3 text-sm outline-none focus:border-brass"
                  placeholder="Tu nombre y apellido"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-foreground/70">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-panel-border bg-panel px-4 py-3 text-sm outline-none focus:border-brass"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium tracking-wide text-foreground/70">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-sm border border-panel-border bg-panel px-4 py-3 text-sm outline-none focus:border-brass"
                  placeholder="+57 300 000 0000"
                />
              </div>

              {error && <p className="text-sm text-alert">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-sm bg-brass px-6 py-3 font-medium text-background transition-colors hover:bg-brass-soft disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Continuar"}
              </button>
            </form>
          </div>
        )}

        {step === "menu" && (
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">
              ¿Cómo quieres practicar{name ? `, ${name.split(" ")[0]}` : ""}?
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Nota mínima para aprobar: {PASSING_SCORE}/100. Las preguntas salen en orden
              aleatorio cada vez.
            </p>

            <button
              onClick={() => iniciar({ tipo: "simulacro" })}
              className="mt-8 w-full rounded-sm border border-brass/60 bg-brass/10 px-5 py-5 text-left transition-colors hover:bg-brass/20"
            >
              <p className="font-mono text-xs tracking-widest text-brass">SIMULACRO DE EXAMEN</p>
              <p className="mt-1 font-display text-lg font-semibold">
                {SIMULACRO_SIZE} preguntas al azar de las {MATERIAS.length} materias
              </p>
              <p className="mt-1 text-xs text-foreground/60">
                Cada materia aporta preguntas según su peso en el banco.
              </p>
            </button>

            <p className="mt-10 font-mono text-xs tracking-widest text-steel">PRÁCTICA POR MATERIA</p>
            <div className="mt-3 space-y-2">
              {MATERIAS.map((m, s) => (
                <button
                  key={m}
                  onClick={() => iniciar({ tipo: "materia", materia: s })}
                  className="flex w-full items-center justify-between rounded-sm border border-panel-border bg-panel px-4 py-3 text-left text-sm transition-colors hover:border-brass/50"
                >
                  <span>
                    <span className="mr-2 font-mono text-xs text-steel">{s + 1}.</span>
                    {m}
                  </span>
                  <span className="ml-3 shrink-0 font-mono text-xs text-brass">
                    {conteo[s]} preguntas
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "quiz" && p && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-steel">
                PREGUNTA {current + 1} / {preguntas.length}
              </span>
              <span className="font-mono text-xs tracking-widest text-brass">
                {aciertos} correctas
              </span>
            </div>
            <div className="mb-8 h-1 w-full rounded-full bg-panel">
              <div
                className="h-1 rounded-full bg-brass transition-all"
                style={{ width: `${((current + (selected !== null ? 1 : 0)) / preguntas.length) * 100}%` }}
              />
            </div>

            <p className="mb-2 font-mono text-[11px] tracking-widest text-steel">
              {MATERIAS[p.s].toUpperCase()} · BANCO N.º {p.id}
            </p>
            <h2 className="font-display text-xl font-semibold leading-snug sm:text-2xl">{p.q}</h2>

            <div className="mt-6 space-y-3">
              {p.o.map((opt, i) => {
                const isCorrect = i === p.a;
                const isSelected = i === selected;
                let stateClasses = "border-panel-border bg-panel hover:border-brass/50";
                if (selected !== null) {
                  if (isCorrect) stateClasses = "border-green-500/60 bg-green-500/10";
                  else if (isSelected) stateClasses = "border-alert/60 bg-alert/10";
                  else stateClasses = "border-panel-border bg-panel opacity-60";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left text-sm transition-colors ${stateClasses}`}
                  >
                    <span>
                      <span className="mr-2 font-mono text-xs text-steel">{"ABC"[i]}.</span>
                      {opt}
                    </span>
                    {selected !== null && isCorrect && (
                      <span className="ml-3 shrink-0 text-green-500">✓</span>
                    )}
                    {selected !== null && isSelected && !isCorrect && (
                      <span className="ml-3 shrink-0 text-alert">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-6 rounded-sm border border-panel-border bg-panel/60 p-4">
                <p className="font-mono text-xs tracking-widest text-brass">EXPLICACIÓN</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.e}</p>
                <button
                  onClick={handleNext}
                  className="mt-5 rounded-sm bg-brass px-6 py-2.5 font-medium text-background transition-colors hover:bg-brass-soft"
                >
                  {current + 1 < preguntas.length ? "Siguiente pregunta" : "Ver resultado"}
                </button>
              </div>
            )}

            <button
              onClick={() => setStep("menu")}
              className="mt-10 font-mono text-xs tracking-widest text-steel underline-offset-4 hover:underline"
            >
              ← Salir al menú (no se guarda el avance)
            </button>
          </div>
        )}

        {step === "done" &&
          (() => {
            const nota = Math.round((aciertos / preguntas.length) * 100);
            const passed = nota >= PASSING_SCORE;
            const desglose = MATERIAS.map((m, s) => {
              const deMateria = respuestas.filter((r) => r.pregunta.s === s);
              return {
                m,
                total: deMateria.length,
                ok: deMateria.filter((r) => r.elegida === r.pregunta.a).length,
              };
            }).filter((d) => d.total > 0);
            const falladas = respuestas.filter((r) => r.elegida !== r.pregunta.a);
            return (
              <div>
                <div className="text-center">
                  <p className="font-mono text-xs tracking-[0.3em] text-brass">
                    RESULTADO · {nombreModo(modo).toUpperCase()}
                  </p>
                  <h2 className="mt-3 font-display text-5xl font-semibold">
                    {nota}
                    <span className="text-2xl text-foreground/50">/100</span>
                  </h2>
                  <p className="mt-2 text-sm text-foreground/70">
                    {aciertos} de {preguntas.length} respuestas correctas
                  </p>
                  <span
                    className={`mt-5 inline-block rounded-sm border px-4 py-2 font-mono text-sm tracking-wide ${
                      passed
                        ? "border-green-500/60 bg-green-500/10 text-green-500"
                        : "border-alert/60 bg-alert/10 text-alert"
                    }`}
                  >
                    {passed ? "✓ APROBADO" : "✗ NO APROBADO"} — mínimo para pasar: {PASSING_SCORE}/100
                  </span>
                  <p className="mt-4 text-xs text-foreground/50">Tu resultado ya fue enviado por correo.</p>
                </div>

                {modo.tipo === "simulacro" && (
                  <div className="mt-10">
                    <p className="font-mono text-xs tracking-widest text-steel">RESULTADO POR MATERIA</p>
                    <div className="mt-3 space-y-2">
                      {desglose.map((d) => {
                        const pct = Math.round((d.ok / d.total) * 100);
                        return (
                          <div key={d.m} className="rounded-sm border border-panel-border bg-panel px-4 py-2.5 text-sm">
                            <div className="flex items-center justify-between">
                              <span>{d.m}</span>
                              <span className={`font-mono text-xs ${pct >= PASSING_SCORE ? "text-green-500" : "text-alert"}`}>
                                {d.ok}/{d.total}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {falladas.length > 0 && (
                  <div className="mt-10">
                    <p className="font-mono text-xs tracking-widest text-steel">
                      PARA REPASAR ({falladas.length})
                    </p>
                    <div className="mt-3 space-y-3">
                      {falladas.map(({ pregunta: f, elegida }) => (
                        <div key={f.id} className="rounded-sm border border-panel-border bg-panel/60 p-4 text-sm">
                          <p className="font-medium leading-snug">{f.q}</p>
                          <p className="mt-2 text-alert">✗ Tu respuesta: {f.o[elegida]}</p>
                          <p className="mt-1 text-green-500">✓ Correcta: {f.o[f.a]}</p>
                          <p className="mt-2 text-xs leading-relaxed text-foreground/70">{f.e}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => iniciar(modo)}
                    className="rounded-sm bg-brass px-6 py-3 font-medium text-background transition-colors hover:bg-brass-soft"
                  >
                    Volver a intentar
                  </button>
                  <button
                    onClick={() => setStep("menu")}
                    className="rounded-sm border border-brass/60 px-6 py-3 font-mono text-sm tracking-wide text-brass-soft transition-colors hover:bg-brass/10"
                  >
                    Elegir otra materia
                  </button>
                </div>
              </div>
            );
          })()}
      </main>
    </div>
  );
}
