import HeadingTape from "./components/HeadingTape";
import AttitudeIndicator from "./components/AttitudeIndicator";

const PROGRAMAS = [
  {
    code: "PLT-01",
    title: "Pilotos",
    desc: "Preparación teórica y checklists de examen para privados, comerciales y de línea, con simulacros de cabina y bancos de preguntas por materia.",
  },
  {
    code: "TCP-02",
    title: "Tripulación de cabina",
    desc: "Procedimientos, emergencias y servicio a bordo explicados con casos reales, pensados para retener bajo presión de tiempo.",
  },
  {
    code: "DSP-03",
    title: "Despachadores",
    desc: "Planificación de vuelo, meteorología y regulación aplicada, con ejercicios que reproducen el ritmo real de un centro de control.",
  },
];

const METODOLOGIA = [
  {
    tag: "01",
    title: "Microaprendizaje por tramo",
    desc: "Cada tema se corta en tramos de vuelo cortos y completos, no en clases largas que se abandonan a mitad de camino.",
  },
  {
    tag: "02",
    title: "Repetición espaciada",
    desc: "Los conceptos críticos vuelven a aparecer en momentos calculados, para que lleguen a memoria de largo plazo antes del examen o el chequeo.",
  },
  {
    tag: "03",
    title: "Simulación de escenario",
    desc: "Se practica sobre casos y checklists reales, no sobre definiciones sueltas, para que el conocimiento se active bajo presión.",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      <HeadingTape />

      <main>
        {/* HERO */}
        <section
          id="inicio"
          className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-brass">
              FORMACIÓN AERONÁUTICA · V/S DIGITAL
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Contenido técnico que se entiende
              <span className="text-brass-soft"> a la primera</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/70">
              Cursos y materiales para pilotos, tripulantes de cabina y
              despachadores, diseñados con pedagogía de medios digitales para
              que el conocimiento técnico quede claro, se recuerde y se use
              bajo presión real.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#programas"
                className="rounded-sm bg-brass px-6 py-3 font-medium text-background transition-colors hover:bg-brass-soft"
              >
                Ver programas
              </a>
              <a
                href="#metodologia"
                className="font-mono text-sm tracking-wide text-foreground/70 underline decoration-steel underline-offset-4 transition-colors hover:text-brass-soft"
              >
                Cómo enseñamos →
              </a>
            </div>
          </div>

          <AttitudeIndicator />
        </section>

        {/* PROGRAMAS */}
        <section
          id="programas"
          className="border-t border-panel-border bg-panel/40 px-6 py-20"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">
              PROGRAMAS
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Una ruta para cada rol de cabina y cubierta de vuelo
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROGRAMAS.map((p) => (
                <div
                  key={p.code}
                  className="group rounded-md border border-panel-border bg-panel p-6 transition-colors hover:border-brass/50"
                >
                  <span className="font-mono text-xs tracking-widest text-steel group-hover:text-brass-soft">
                    {p.code}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section id="metodologia" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">
              METODOLOGÍA
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Pedagogía pensada para comprensión, no solo para contenido
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
              {METODOLOGIA.map((m) => (
                <div key={m.tag} className="border-l-2 border-brass/50 pl-5">
                  <span className="font-mono text-xs text-steel">
                    {m.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="border-t border-panel-border bg-panel/40 px-6 py-20"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-brass">
                CONTACTO
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Reserva tu cupo en el próximo cohorte
              </h2>
              <p className="mt-3 max-w-md text-sm text-foreground/65">
                Cuéntanos tu rol y tu meta de certificación; te ubicamos en el
                programa correcto.
              </p>
            </div>
            <a
              href="https://wa.me/573167446685?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20programas%20de%20formaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-sm bg-brass px-6 py-3 font-medium text-background transition-colors hover:bg-brass-soft"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-panel-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-foreground/40 sm:flex-row">
          <span className="font-mono">@capimcbrown</span>
          <span>Educación digital para el gremio aeronáutico</span>
        </div>
      </footer>
    </div>
  );
}
