import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import InstructorAIWidget from "./components/InstructorAI/InstructorAIWidget";
import InscripcionForm from "./components/InscripcionForm";

type Ruta = {
  id: string;
  titulo: string;
  img?: string;
  imgPos?: string;
  enlaces: { texto: string; href?: string }[];
};

const RUTAS: Ruta[] = [
  {
    id: "pilotos",
    titulo: "Pilotos",
    img: "/img/cabina-mando.jpg",
    imgPos: "object-[60%_50%]",
    enlaces: [
      { texto: "Test PCA · 457 preguntas", href: "/test-pca" },
      { texto: "Curso de tierra Seneca II y III (con certificado)" },
      { texto: "Transición a aerolínea" },
      { texto: "Materias PPA y PCA: aerodinámica, derecho aéreo y más" },
    ],
  },
  {
    id: "tcp",
    titulo: "Tripulantes de cabina",
    img: "/img/cabina-pasajeros.jpg",
    imgPos: "object-center",
    enlaces: [
      { texto: "Test de Aerodinámica TCP", href: "/test-aerodinamica" },
      { texto: "Aerodinámica · Derecho Aéreo" },
      { texto: "Mercancías peligrosas · Medicina aeroespacial" },
    ],
  },
  {
    id: "despachadores",
    titulo: "Despachadores",
    enlaces: [
      { texto: "Peso y balance · Performance y planificación" },
      { texto: "Meteorología · Navegación" },
      { texto: "Derecho aéreo · Procedimientos operacionales" },
    ],
  },
];

const METODO = [
  {
    tag: "01",
    title: "Microaprendizaje por tramo",
    desc: "Cada tema se corta en tramos de vuelo cortos y completos, no en clases largas que se abandonan a mitad de camino.",
  },
  {
    tag: "02",
    title: "Repetición espaciada",
    desc: "Los conceptos críticos vuelven en momentos calculados, para que lleguen a memoria de largo plazo antes del examen o el chequeo.",
  },
  {
    tag: "03",
    title: "Simulación de escenario",
    desc: "Se practica sobre casos y checklists reales, no sobre definiciones sueltas, para que el conocimiento se active bajo presión.",
  },
];

const CREDENCIALES = [
  { valor: "+30", texto: "años en aviación" },
  { valor: "+5.000", texto: "horas de vuelo" },
  { valor: "B767 · B737 · A320 · Dash-8", texto: "equipos volados" },
];

const WAYPOINTS: [number, number, string][] = [
  [250, 170, "ASKUL"],
  [360, 150, "BUXOR"],
  [470, 95, "SKCL"],
];

/* Fondo ilustrado para Despachadores: carta de ruta con aerovías y waypoints */
function CartaRuta() {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-x-0 top-0 h-[70%] w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cr-bg" cx="75%" cy="30%" r="80%">
          <stop offset="0" stopColor="#1d3560" />
          <stop offset="1" stopColor="#0c1628" />
        </radialGradient>
        <linearGradient id="cr-ruta" x1="0" x2="1">
          <stop offset="0" stopColor="#e0b563" stopOpacity="0.2" />
          <stop offset="1" stopColor="#f3d48a" />
        </linearGradient>
      </defs>
      <rect width="600" height="300" fill="url(#cr-bg)" />
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#ffffff" strokeOpacity="0.05" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#ffffff" strokeOpacity="0.05" />
      ))}
      <circle cx="470" cy="95" r="70" fill="none" stroke="#7fa6e0" strokeOpacity="0.18" />
      <circle cx="470" cy="95" r="120" fill="none" stroke="#7fa6e0" strokeOpacity="0.1" />
      <path d="M120 250 L250 170 L360 150 L470 95 L560 40" fill="none" stroke="#7fa6e0" strokeOpacity="0.25" strokeDasharray="4 6" />
      <path d="M60 280 C 200 220, 330 170, 470 95" fill="none" stroke="url(#cr-ruta)" strokeWidth="2" />
      {WAYPOINTS.map(([x, y, n]) => (
        <g key={n}>
          <polygon points={`${x},${y - 7} ${x + 7},${y + 5} ${x - 7},${y + 5}`} fill="none" stroke="#e0b563" strokeOpacity="0.8" />
          <text x={x + 10} y={y - 8} fill="#e0b563" fillOpacity="0.7" fontSize="11" fontFamily="monospace">
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex-1">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section id="inicio" className="navy-glow relative overflow-hidden">
          {/* curva dorada de fondo */}
          <svg
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="curva" x1="0" x2="1">
                <stop offset="0" stopColor="#e0b563" stopOpacity="0.55" />
                <stop offset="0.6" stopColor="#e0b563" stopOpacity="0.15" />
                <stop offset="1" stopColor="#e0b563" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M-40 420 C 180 640, 420 700, 760 640" fill="none" stroke="url(#curva)" strokeWidth="1.5" />
          </svg>

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-16">
            <div>
              <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]">
                Te ayudo a entender aviación,{" "}
                <em className="gold-text pr-1 font-semibold italic">no solo a memorizar.</em>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/80">
                Formación para pilotos, tripulantes de cabina y despachadores.
              </p>

              <div className="mt-5 flex items-center gap-4">
                <span className="font-serif text-xl italic text-brass-soft">Método Capi McBrown</span>
                <span className="h-px max-w-[220px] flex-1 bg-gradient-to-r from-brass-soft/80 to-transparent" />
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#pilotos"
                  className="gold-gradient w-full rounded-md px-5 py-3 text-center font-serif text-base sm:w-auto font-semibold text-[#0b1220] shadow-[0_10px_30px_-10px_rgba(224,181,99,0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Explorar Pilotos
                </a>
                <a
                  href="#tcp"
                  className="w-full rounded-md border border-brass-soft/70 px-5 py-3 text-center font-serif text-base text-foreground sm:w-auto transition-colors hover:bg-brass/10"
                >
                  Explorar TCP
                </a>
                <a
                  href="#despachadores"
                  className="w-full rounded-md border border-brass-soft/70 px-5 py-3 text-center font-serif text-base text-foreground sm:w-auto transition-colors hover:bg-brass/10"
                >
                  Explorar Despachadores
                </a>
              </div>
            </div>

            {/* FOTO */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-brass/25 via-transparent to-transparent blur-2xl" />
              <div
                className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
                style={{ clipPath: "polygon(9% 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <Image
                  src="/img/capi-mcbrown.jpg"
                  alt="Capitana Ana Margarita Mc Brown, instructora de aviación"
                  width={900}
                  height={864}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220]/90 via-[#0b1220]/40 to-transparent px-6 pb-5 pt-16">
                  <p className="font-serif text-lg text-foreground">Cap. Ana Margarita Mc Brown</p>
                  <p className="text-xs tracking-wide text-foreground/70">
                    Capitana · Check Airman · Instructora de vuelo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CREDENCIALES */}
          <div className="relative border-y border-white/5 bg-panel/40">
            <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/5 px-2 sm:px-6">
              {CREDENCIALES.map((c) => (
                <div key={c.texto} className="px-2 py-5 text-center sm:px-4">
                  <p className="gold-text font-serif text-base font-semibold leading-tight sm:text-2xl">{c.valor}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-foreground/55 sm:text-xs sm:tracking-[0.2em]">{c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RUTAS / CURSOS */}
        <section id="cursos" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">CURSOS Y RECURSOS</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Una ruta para cada rol <em className="gold-text italic">de la operación</em>
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {RUTAS.map((r) => (
                <article
                  key={r.id}
                  id={r.id}
                  className="group relative flex min-h-[440px] scroll-mt-28 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-panel"
                >
                  {r.img ? (
                    <Image
                      src={r.img}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className={`object-cover ${r.imgPos} transition-transform duration-700 group-hover:scale-105`}
                    />
                  ) : (
                    <CartaRuta />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/60 to-transparent" />

                  <div className="relative p-7">
                    <h3 className="font-serif text-4xl font-semibold leading-tight text-foreground">{r.titulo}</h3>
                    <span className="mt-4 block h-px w-24 bg-gradient-to-r from-brass-soft to-transparent" />
                    <ul className="mt-5 space-y-2.5">
                      {r.enlaces.map((e) =>
                        e.href ? (
                          <li key={e.texto}>
                            <a
                              href={e.href}
                              className="inline-flex items-center gap-2 text-sm font-medium text-brass-soft underline-offset-4 hover:underline"
                            >
                              {e.texto} <span aria-hidden="true">→</span>
                            </a>
                          </li>
                        ) : (
                          <li key={e.texto} className="text-sm text-foreground/80">
                            {e.texto}
                          </li>
                        )
                      )}
                    </ul>
                    <a
                      href="#inscripcion"
                      className="mt-6 inline-block rounded-md border border-brass-soft/60 px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition-colors hover:bg-brass/10"
                    >
                      Quiero información
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MÉTODO */}
        <section id="metodo" className="scroll-mt-24 border-t border-white/5 bg-panel/40 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">MÉTODO CAPI McBROWN</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Pedagogía pensada para <em className="gold-text italic">comprender</em>, no solo para cubrir temas
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {METODO.map((m) => (
                <div
                  key={m.tag}
                  className="rounded-2xl border border-white/10 bg-background/60 p-7 transition-colors hover:border-brass/40"
                >
                  <span className="gold-text font-serif text-3xl font-semibold">{m.tag}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-3xl border border-brass/25 bg-gradient-to-br from-panel to-background p-8 sm:p-12 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-brass">CONTACTO</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Reserva tu cupo en la <em className="gold-text italic">próxima cohorte</em>
              </h2>
              <p className="mt-3 max-w-md text-sm text-foreground/65">
                Cuéntanos tu rol y tu meta de certificación; te ubicamos en el programa correcto.
              </p>
            </div>
            <a
              href="https://wa.me/573167446685?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20programas%20de%20formaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient shrink-0 rounded-md px-7 py-3.5 font-semibold text-[#0b1220] shadow-[0_10px_30px_-10px_rgba(224,181,99,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </section>

        {/* INSCRIPCIÓN CURSOS VIRTUALES */}
        <section id="inscripcion" className="scroll-mt-24 border-t border-white/5 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">INSCRIPCIÓN · CURSOS VIRTUALES</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              ¿Te interesa un <em className="gold-text italic">curso virtual?</em>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/65">
              Déjanos tus datos y el curso que te interesa. Te enviamos la información de fechas,
              contenido e inscripción.
            </p>
            <div className="mt-10">
              <InscripcionForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-foreground/45 sm:flex-row">
          <span className="font-serif text-base text-foreground/70">Capi McBrown</span>
          <span>@capimcbrown · Educación digital para el gremio aeronáutico</span>
          <a href="mailto:contacto@capimcbrown.com" className="hover:text-brass-soft">
            contacto@capimcbrown.com
          </a>
        </div>
      </footer>

      <InstructorAIWidget />
    </div>
  );
}
