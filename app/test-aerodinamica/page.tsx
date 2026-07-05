"use client";

import { useEffect, useState } from "react";

// ── Reemplaza esta URL por la tuya de Formspree (ver instrucciones) ──
const FORM_ENDPOINT = "https://formspree.io/f/xaqgvnee";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 25,
    question: "Los controles primarios del avión son:",
    options: [
      "Flaps, Slats, Rudder",
      "Fence, Taps, Compensadores",
      "Alerones, elevadores, Rudder",
      "Slats, elevadores, tabs",
    ],
    correctIndex: 2,
    explanation:
      "Los controles primarios actúan sobre los tres ejes del avión: los alerones controlan el alabeo, los elevadores el cabeceo, y el rudder (timón de dirección) la guiñada.",
  },
  {
    id: 26,
    question: "Los ejes imaginarios del avión son:",
    options: [
      "Longitudinal, transversal y vertical",
      "Lateral, longitudinal y vertical",
      "Hexagonal, transversal y lateral",
      "Lateral, hexagonal y oblicua",
    ],
    correctIndex: 0,
    explanation:
      "Los tres ejes imaginarios se cruzan en el centro de gravedad: longitudinal (nariz-cola), transversal (punta de ala a punta de ala) y vertical (de arriba hacia abajo).",
  },
  {
    id: 34,
    question: "El movimiento alrededor del eje longitudinal se llama:",
    options: ["Guiñada", "Cabeceo", "Alabeo", "Rollo"],
    correctIndex: 2,
    explanation:
      "El giro alrededor del eje longitudinal (el que atraviesa el avión de nariz a cola) se llama alabeo, y lo controlan los alerones.",
  },
  {
    id: 35,
    question: "La rotación alrededor del eje vertical se llama:",
    options: ["Guiñada", "Cabeceo", "Alabeo", "Rollo"],
    correctIndex: 0,
    explanation:
      "El giro alrededor del eje vertical se llama guiñada (yaw), y lo controla el timón de dirección (rudder).",
  },
  {
    id: 36,
    question:
      "De acuerdo al principio de Bernoulli, la sustentación alar se produce por:",
    options: [
      "La textura áspera de los perfiles aerodinámicos.",
      "El aire fluye a mayor velocidad bajo el ala que sobre ella, produciendo menor presión bajo el ala y mayor presión sobre el ala.",
      "El aire fluye a mayor velocidad sobre el ala que bajo ella, produciendo mayor presión bajo el ala y menor presión sobre el ala.",
      "El aire fluye a menor velocidad sobre el ala que bajo ella, produciendo menor presión bajo el ala y mayor presión sobre el ala.",
    ],
    correctIndex: 2,
    explanation:
      "El aire viaja más rápido sobre la superficie curva del ala que por debajo, lo que reduce la presión arriba y genera mayor presión abajo: esa diferencia es la sustentación.",
  },
  {
    id: 37,
    question: "A la parte delantera redondeada del ala se le denomina:",
    options: [
      "Borde de Fuga",
      "Borde de Ataque",
      "Borde Intermedio",
      "Borde de Choque",
    ],
    correctIndex: 1,
    explanation:
      "El borde de ataque es el borde redondeado y delantero del ala, el primero que corta el aire al volar.",
  },
  {
    id: 38,
    question: "A la parte posterior delgada del ala se le denomina:",
    options: [
      "Borde de Fuga",
      "Borde de Ataque",
      "Borde Intermedio",
      "Borde de Choque",
    ],
    correctIndex: 0,
    explanation:
      "El borde de fuga es el borde posterior y delgado del ala, por donde el aire sale después de pasar sobre el perfil.",
  },
  {
    id: 39,
    question: "Las cuatro fuerzas que actúan sobre un avión son:",
    options: [
      "Sustentación - Peso - Resistencia a Subir - Balanceo",
      "Peso - Resistencia al Avance - Limpieza del Fuselaje - Combustible",
      "Sustentación - Peso - Resistencia al Avance - Tracción o Empuje",
      "Peso - gravedad - Tracción - Balanceo",
    ],
    correctIndex: 2,
    explanation:
      "Las cuatro fuerzas fundamentales del vuelo son: sustentación (levanta el avión), peso (lo atrae hacia abajo), tracción o empuje (lo impulsa hacia adelante) y resistencia al avance (lo frena).",
  },
  {
    id: 40,
    question:
      "Las superficies móviles situadas generalmente en cada extremo del ala, en el borde de fuga, y que controlan el movimiento lateral sobre el eje longitudinal de la aeronave, se denominan:",
    options: [
      "Superficies de Control Primarios",
      "Alerones",
      "Elevadores",
      "Estabilizador",
    ],
    correctIndex: 1,
    explanation:
      "Los alerones son superficies móviles en los bordes de fuga de las puntas de ala; controlan el alabeo (movimiento lateral sobre el eje longitudinal).",
  },
  {
    id: 41,
    question:
      "La superficie que controla el movimiento del avión alrededor del eje vertical y que se encuentra abisagrado al estabilizador fijo vertical del empenaje de cola, se denomina:",
    options: ["Alerón", "Estabilizador", "Timón de Dirección", "Elevadores"],
    correctIndex: 2,
    explanation:
      "El timón de dirección (rudder) está articulado al estabilizador vertical y controla la guiñada, el giro del avión sobre el eje vertical.",
  },
  {
    id: 42,
    question: "Indique cuál es la definición de Despegue:",
    options: [
      "Se le considera una caída controlada con un stall al ras del suelo.",
      "Es el momento en que el avión deja de ser sostenido por el tren de aterrizaje y pasa a ser sustentado por las alas.",
      "El trayecto que recorre la aeronave en tierra.",
      "Se entiende como el momento en que la aeronave obtiene su mayor aceleración.",
    ],
    correctIndex: 1,
    explanation:
      "El despegue es el momento exacto en que las alas generan suficiente sustentación para que el avión deje de apoyarse en el tren y quede sostenido en el aire.",
  },
  {
    id: 43,
    question:
      "Son dispositivos que sirven para aumentar la sustentación y son usados para aproximarse y aterrizar, o para despegar a menores velocidades:",
    options: [
      "Flaps y Slats",
      "Spoilers o Speed brake",
      "Aletas compensadoras",
      "Elevadores",
    ],
    correctIndex: 0,
    explanation:
      "Los flaps y slats son dispositivos hipersustentadores: aumentan la sustentación del ala para poder volar seguro a menor velocidad, como en despegue y aterrizaje.",
  },
  {
    id: 44,
    question:
      "¿Cuál de las siguiente afirmaciones es correcta, con respecto a los ejes del avión?",
    options: [
      "El alabeo (roll) se produce a través del eje vertical.",
      "El cabeceo (pitch) se produce a través del eje lateral.",
      "La guiñada (yaw) se produce a través del eje longitudinal.",
      "Los alerones, ubicados en la superficie alar.",
    ],
    correctIndex: 1,
    explanation:
      "El cabeceo (pitch), el movimiento de subir o bajar la nariz, ocurre sobre el eje lateral (transversal) del avión, y lo controlan los elevadores.",
  },
  {
    id: 45,
    question:
      "El conjunto de componentes que sirven para soportar al avión en tierra y que pueden ser fijos, retráctiles, convencionales, o de triciclo, son:",
    options: [
      "Ruedas",
      "Amortiguadores",
      "Tren de aterrizaje",
      "Timón de Dirección",
    ],
    correctIndex: 2,
    explanation:
      "El tren de aterrizaje es el conjunto que soporta el avión en tierra; puede ser fijo, retráctil, convencional o de triciclo.",
  },
  {
    id: 46,
    question: "¿A qué se denomina TREN PRINCIPAL?",
    options: [
      "A las ruedas que se encuentran en la nariz del avión.",
      "Al conjunto de componentes que soportan el mayor peso del avión.",
      "Al conjunto de ruedas ubicadas en la nariz y cola de la aeronave.",
      "Al conjunto de ruedas ubicadas en la nariz y parte central de la aeronave.",
    ],
    correctIndex: 1,
    explanation:
      "El tren principal es el conjunto de ruedas que soporta la mayor parte del peso del avión en tierra.",
  },
  {
    id: 47,
    question: "La fuerza de tracción o empuje es dada por:",
    options: ["Las Alas", "Los Frenos", "Los Motores", "Ruedas"],
    correctIndex: 2,
    explanation:
      "La tracción o empuje —la fuerza que impulsa al avión hacia adelante— la generan los motores.",
  },
  {
    id: 48,
    question: "¿Qué es lo que permite incrementar o decrecer la velocidad del avión?",
    options: [
      "Los aceleradores de los motores.",
      "El timón de dirección ubicado en la cola del avión.",
      "Los alerones, ubicados en la superficie alar.",
      "Tren de aterrizaje",
    ],
    correctIndex: 0,
    explanation:
      "Los aceleradores (thrust levers) regulan la potencia entregada por los motores, y con ella la velocidad del avión.",
  },
  {
    id: 49,
    question: "La fuerza que levanta el ala es conocida como:",
    options: ["Peso o Gravedad", "Resistencia", "Sustentación", "Tracción o Empuje"],
    correctIndex: 2,
    explanation:
      "La sustentación es la fuerza generada por las alas que levanta al avión, contrarrestando el peso.",
  },
  {
    id: 50,
    question:
      "La fuerza que proporciona el movimiento a través de la masa de aire se denomina:",
    options: ["Tracción o Empuje", "Sustentación", "Resistencia", "Peso o gravedad"],
    correctIndex: 0,
    explanation:
      "La tracción o empuje es la fuerza que mueve al avión hacia adelante a través del aire.",
  },
  {
    id: 51,
    question: "La fuerza que retarda el movimiento del avión a través del aire es:",
    options: ["Peso o gravedad", "Sustentación", "Resistencia al Avance", "Tracción"],
    correctIndex: 2,
    explanation:
      "La resistencia al avance (drag) es la fuerza que se opone al movimiento del avión a través del aire.",
  },
  {
    id: 52,
    question:
      "¿Cuál de las siguientes afirmaciones con respecto a los controles de vuelo es correcta?",
    options: [
      "Alerón derecho sube, alerón izquierdo baja = El avión gira hacia la izquierda.",
      "Timón de profundidad sube = el avión baja.",
      "El timón de dirección se mueve hacia la derecha = la nariz del avión se mueve hacia la derecha.",
      "Timón de profundidad sube = el avión sube.",
    ],
    correctIndex: 2,
    explanation:
      "Cuando el timón de dirección se mueve hacia la derecha, la nariz del avión gira hacia la derecha (guiñada).",
  },
  {
    id: 53,
    question:
      "Su objetivo principal es: Aumentar la resistencia del avión, permitiéndole, un mayor ángulo de descenso sin un exclusivo aumento de la velocidad:",
    options: ["Flaps", "Spoilers o Frenos aerodinámicos", "Tren de Aterrizaje", "Estabilizador"],
    correctIndex: 1,
    explanation:
      "Los spoilers (frenos aerodinámicos) aumentan la resistencia y permiten un descenso más pronunciado sin que la velocidad aumente demasiado.",
  },
  {
    id: 54,
    question: "¿Cómo se genera la sustentación?",
    options: [
      "El aire al pasar por el perfil aerodinámico superior aumenta su velocidad y disminuye la presión, creando una fuerza de succión.",
      "El aire al pasar por el perfil aerodinámico superior disminuye su velocidad y aumenta la presión, creando una fuerza de succión.",
      "El aire al pasar por el perfil aerodinámico superior aumenta su velocidad y aumenta la presión, creando una fuerza de succión.",
      "El aire al pasar por el perfil aerodinámico superior disminuye su velocidad y disminuye la presión, creando una fuerza de succión.",
    ],
    correctIndex: 0,
    explanation:
      "El aire acelera al pasar por la parte superior curva del perfil; al aumentar la velocidad, la presión disminuye, generando una fuerza de succión que sustenta el ala.",
  },
  {
    id: 55,
    question: "El Alabeo se produce a través del eje:",
    options: ["Lateral", "Longitudinal", "Vertical", "Horizontal"],
    correctIndex: 1,
    explanation:
      "El alabeo se produce sobre el eje longitudinal, el que va de la nariz a la cola del avión.",
  },
  {
    id: 56,
    question: "Diga Ud. cuáles son las fuerzas que gobiernan un avión:",
    options: [
      "Sustentación - resistencia - superficie - gravedad",
      "Sustentación - resistencia - desplazamiento - gravedad",
      "Sustentación - resistencia - empuje - gravedad",
      "Sustentación - resistencia - peso - gravedad",
    ],
    correctIndex: 2,
    explanation:
      "Las fuerzas que gobiernan el vuelo son: sustentación, resistencia, empuje y gravedad (peso).",
  },
  {
    id: 57,
    question:
      "Durante un vuelo nivelado, las fuerzas aerodinámicas que actúan sobre el avión permanecen:",
    options: [
      "Constantes y en equilibrio.",
      "Constantes y en desequilibrio.",
      "En desequilibrio.",
      "En equilibrio",
    ],
    correctIndex: 0,
    explanation:
      "En vuelo nivelado y estable, las cuatro fuerzas aerodinámicas se mantienen constantes y equilibradas entre sí.",
  },
  {
    id: 58,
    question:
      "El ángulo agudo formado por la línea de cuerda del ala y el eje longitudinal del avión, se denomina:",
    options: [
      "Perfil aerodinámico",
      "Angulo de ataque",
      "Angulo de incidencia",
      "Angulo longitudinal",
    ],
    correctIndex: 2,
    explanation:
      "El ángulo de incidencia es el ángulo fijo de fábrica entre la cuerda del ala y el eje longitudinal del fuselaje; no cambia en vuelo (a diferencia del ángulo de ataque).",
  },
  {
    id: 59,
    question: "Los perfiles aerodinámicos del avión son:",
    options: [
      "Motor, alas, empenaje.",
      "Alas, hélice, empenaje.",
      "Alas, empenaje.",
      "Estabilizador",
    ],
    correctIndex: 2,
    explanation:
      "Los perfiles aerodinámicos del avión son las alas y las superficies del empenaje de cola, diseñados para generar fuerzas aerodinámicas.",
  },
  {
    id: 60,
    question:
      "Cualquier superficie tal como un ala de avión, diseñada para obtener una reacción, como la sustentación a través del cual se desplaza, se llama:",
    options: [
      "Perfil aerodinámico",
      "Superficie alar.",
      "Envergadura de las alas.",
      "Alerones.",
    ],
    correctIndex: 0,
    explanation:
      "Un perfil aerodinámico es cualquier superficie diseñada específicamente para generar una reacción útil, como la sustentación, al desplazarse por el aire.",
  },
  {
    id: 61,
    question: "Los dispositivos que destruyen la sustentación alar durante el aterrizaje se llaman:",
    options: ["Flaps.", "Spoilers.", "Alerones.", "Slats"],
    correctIndex: 0,
    explanation:
      "En su posición de aterrizaje, los flaps ayudan a reducir la sustentación remanente y aumentar la resistencia para frenar el avión, según este banco de preguntas.",
  },
  {
    id: 62,
    question: "Señale cual opción es considerada Superficies de control:",
    options: ["Alas", "Alerones, flaps", "Tren de Aterrizaje", "Visor gran angular."],
    correctIndex: 1,
    explanation:
      "Los alerones y flaps son superficies móviles ubicadas en las alas que se usan para controlar y ajustar el vuelo del avión.",
  },
  {
    id: 64,
    question:
      "El dispositivo cuyo objetivo es aumentar la resistencia del avión permitiendo mayor ángulo de descenso sin un excesivo aumento en la velocidad es:",
    options: [
      "Frenos aerodinámicos, spoilers o speedbrakes",
      "Flaps.",
      "Slats",
      "Alas, empenaje.",
    ],
    correctIndex: 0,
    explanation:
      "Los frenos aerodinámicos (spoilers/speedbrakes) aumentan la resistencia, permitiendo un mayor ángulo de descenso sin acelerar en exceso.",
  },
  {
    id: 321,
    question: "¿Cómo se denomina el ángulo formado por el eje longitudinal y la cuerda alar?",
    options: ["Angulo de ataque", "Angulo Diedro", "Angulo de Incidencia", "Angulo Flecha"],
    correctIndex: 2,
    explanation:
      "El ángulo de incidencia es el ángulo fijo entre el eje longitudinal del avión y la cuerda del ala.",
  },
  {
    id: 322,
    question: "¿Cuál es la función de los Flaps?",
    options: [
      "Aumentar la velocidad de la aeronave",
      "Aumentar el ángulo de giro de la aeronave",
      "Aumentar la sustentación y actuar como aerofrenos en tierra",
      "Aumentar la resistencia de la aeronave y aumentar su ángulo de banqueo",
    ],
    correctIndex: 2,
    explanation:
      "Los flaps aumentan la sustentación durante despegue y aproximación, y en tierra pueden usarse también como aerofrenos.",
  },
  {
    id: 333,
    question: "El ángulo formado por la cuerda alar y el viento relativo se denomina:",
    options: [
      "Angulo Diedro",
      "Angulo positivo del ala.",
      "Angulo de Incidencia",
      "Angulo de Ataque",
    ],
    correctIndex: 3,
    explanation:
      "El ángulo de ataque es el ángulo entre la cuerda del ala y el viento relativo; cambia constantemente durante el vuelo.",
  },
  {
    id: 345,
    question: "El flujo del aire sobre el perfil aerodinámico puede ser:",
    options: [
      "Flujo laminar o flujo turbulento",
      "Flujo direccional y paralelo",
      "Flujo perpendicular y Axial",
      "Flujo Constante o flujo variable",
    ],
    correctIndex: 0,
    explanation:
      "El aire puede fluir sobre el perfil de forma laminar (suave y ordenada) o turbulenta (caótica), lo cual afecta la sustentación y la resistencia.",
  },
  {
    id: 388,
    question: "La función de las superficies de control primarias es:",
    options: [
      "Ayudar a la velocidad y sustentación de la aeronave",
      "Permitir el control de la aeronave en vuelo",
      "Aumentar la sustentación de la aeronave a bajas velocidades",
      "Controlar la aeronave cuando se encuentra en tierra.",
    ],
    correctIndex: 1,
    explanation:
      "Las superficies de control primarias (alerones, elevadores, timón de dirección) permiten al piloto controlar la actitud y dirección de la aeronave durante el vuelo.",
  },
  {
    id: 398,
    question: "Las fuerzas que actúan en una aeronave en vuelo son:",
    options: [
      "sustentación, empuje, resistencia, tracción",
      "sustentación, Gravedad, resistencia, empuje",
      "Gravedad, y sustentación",
      "sustentación, gravedad, fuerza centrifuga, y fuerza de torque",
    ],
    correctIndex: 0,
    explanation:
      "Las fuerzas que actúan sobre una aeronave en vuelo son sustentación, resistencia al avance, y tracción o empuje.",
  },
  {
    id: 403,
    question: "Las superficies de control primarias son:",
    options: [
      "Alerones, compensadores y Estabilizadores",
      "Flaps, Slats y Trim Tabs",
      "Alerones, timón de dirección y timón de profundidad",
      "Alerones, Spoiler, Slots y Rudder",
    ],
    correctIndex: 2,
    explanation:
      "Las superficies de control primarias son los alerones (alabeo), el timón de dirección (guiñada) y el timón de profundidad o elevadores (cabeceo).",
  },
  {
    id: 407,
    question: "Los ejes imaginarios del avión son:",
    options: [
      "Longitudinal, Transversal, Vertical",
      "Incidencia, Longitudinal y transversal",
      "Transversal, de ataque, eje W",
      "lateral, transversal y de empuje",
    ],
    correctIndex: 0,
    explanation:
      "Los tres ejes imaginarios del avión son longitudinal, transversal y vertical, y se cruzan en el centro de gravedad.",
  },
  {
    id: 414,
    question: "Los tipos de perfil aerodinámico pueden ser:",
    options: [
      "Plano y Recto",
      "Simétrico y asimétrico",
      "Con curvatura o Plano",
      "El perfil aerodinámico no tiene variación",
    ],
    correctIndex: 1,
    explanation:
      "Los perfiles aerodinámicos pueden ser simétricos (igual curvatura arriba y abajo) o asimétricos (más curvos arriba), lo que afecta cómo generan sustentación.",
  },
  {
    id: 415,
    question: "Los tipos de resistencia que se presentan en una aeronave en vuelo son:",
    options: [
      "Resistencia Inducida y Parasita",
      "Resistencia longitudinal y Vertical",
      "Resistencia de fricción y Axial",
      "Resistencia Perpendicular y Axial.",
    ],
    correctIndex: 0,
    explanation:
      "La resistencia inducida se genera como consecuencia de producir sustentación; la resistencia parásita proviene de la fricción y forma del avión con el aire.",
  },
  {
    id: 434,
    question:
      "Si una aeronave en vuelo disminuye el ángulo de ataque, ¿qué le pasa a la sustentación?",
    options: [
      "Permanece constante",
      "Aumenta",
      "Disminuye",
      "El ángulo de ataque no tiene efecto sobre la sustentación",
    ],
    correctIndex: 2,
    explanation:
      "Si disminuye el ángulo de ataque, disminuye también la sustentación generada por el ala.",
  },
];

type Step = "register" | "quiz" | "done";

export default function TestAerodinamica() {
  const [step, setStep] = useState<Step>("register");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const registered = sessionStorage.getItem("tcp_aero_registered");
      if (registered) setStep("quiz");
    }
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError("Por favor completa los tres campos.");
      return;
    }
    setLoading(true);
    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: name,
          email: email,
          whatsapp: whatsapp,
          test: "Aerodinámica TCP",
          fecha: new Date().toISOString(),
        }),
      });
    } catch {
      // Aunque falle el envío del registro, dejamos continuar al test.
    }
    sessionStorage.setItem("tcp_aero_registered", "1");
    setLoading(false);
    setStep("quiz");
  }

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === QUESTIONS[current].correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (current + 1 < QUESTIONS.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setStep("done");
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setStep("quiz");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-panel-border px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-brass-soft">
            @capimcbrown
          </span>
          <p className="mt-1 font-mono text-xs tracking-widest text-steel">
            TEST TCP · AERODINÁMICA
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {step === "register" && (
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">
              Test de Aerodinámica — TCP
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Antes de comenzar, déjanos tus datos. Son {QUESTIONS.length} preguntas de
              opción múltiple, con corrección y explicación inmediata en cada una.
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
                {loading ? "Enviando..." : "Comenzar el test"}
              </button>
            </form>
          </div>
        )}

        {step === "quiz" && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-steel">
                PREGUNTA {current + 1} / {QUESTIONS.length}
              </span>
              <span className="font-mono text-xs tracking-widest text-brass">
                {score} correctas
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {QUESTIONS[current].question}
            </h2>

            <div className="mt-6 space-y-3">
              {QUESTIONS[current].options.map((opt, i) => {
                const isCorrect = i === QUESTIONS[current].correctIndex;
                const isSelected = i === selected;
                let stateClasses =
                  "border-panel-border bg-panel hover:border-brass/50";
                if (selected !== null) {
                  if (isCorrect) {
                    stateClasses = "border-green-500/60 bg-green-500/10";
                  } else if (isSelected) {
                    stateClasses = "border-alert/60 bg-alert/10";
                  } else {
                    stateClasses = "border-panel-border bg-panel opacity-60";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left text-sm transition-colors ${stateClasses}`}
                  >
                    <span>{opt}</span>
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
                <p className="font-mono text-xs tracking-widest text-brass">
                  EXPLICACIÓN
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {QUESTIONS[current].explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-5 rounded-sm bg-brass px-6 py-2.5 font-medium text-background transition-colors hover:bg-brass-soft"
                >
                  {current + 1 < QUESTIONS.length ? "Siguiente pregunta" : "Ver resultado"}
                </button>
              </div>
            )}
          </div>
        )}

        {step === "done" && (
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-brass">
              RESULTADO FINAL
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              {score} / {QUESTIONS.length}
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              {Math.round((score / QUESTIONS.length) * 100)}% de respuestas correctas
            </p>
            <button
              onClick={handleRestart}
              className="mt-8 rounded-sm border border-brass/60 px-6 py-3 font-mono text-sm tracking-wide text-brass-soft transition-colors hover:bg-brass/10"
            >
              Volver a intentar
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
