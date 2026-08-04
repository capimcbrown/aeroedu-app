"use client";

import { useEffect, useRef, useState } from "react";
import {
  sendMessage,
  type ChatMessage,
  type ChatRole,
} from "../../services/instructorAI";
import SuggestedQuestions from "./SuggestedQuestions";
import VoiceButton from "./VoiceButton";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  async function handleSend(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    const reply = await sendMessage(text, nextMessages);

    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      },
    ]);
    setIsTyping(false);
  }

  function handleVoiceTranscript(role: ChatRole, content: string) {
    if (!content.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: makeId(), role, content, createdAt: Date.now() },
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div>
            <p className="mb-3 font-mono text-xs tracking-widest text-steel">
              PREGUNTAS SUGERIDAS
            </p>
            <SuggestedQuestions onSelect={(q) => handleSend(q)} />
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-brass text-background"
                  : "border border-panel-border bg-panel text-foreground/90"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-sm border border-panel-border bg-panel px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brass-soft [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brass-soft [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brass-soft" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-panel-border p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Escribe tu pregunta sobre aviación..."
            className="max-h-32 flex-1 resize-none rounded-sm border border-panel-border bg-panel px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-brass"
          />
          <VoiceButton onTranscript={handleVoiceTranscript} />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            aria-label="Enviar mensaje"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-background transition-colors hover:bg-brass-soft disabled:opacity-40"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
