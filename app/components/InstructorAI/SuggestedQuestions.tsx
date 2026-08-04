"use client";

const SUGGESTIONS = [
  "¿Qué es la sustentación?",
  "Explícame el efecto Venturi.",
  "Hazme un examen corto.",
  "¿Qué significa un METAR?",
  "Explícame un NOTAM.",
  "Simula una entrevista para TCP.",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {SUGGESTIONS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded-sm border border-panel-border bg-panel px-4 py-3 text-left text-sm text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/50 hover:text-foreground"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
