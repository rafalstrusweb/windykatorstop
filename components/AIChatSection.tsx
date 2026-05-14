"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Shield } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Windykator dzwoni do mnie 10 razy dziennie. Co robić?",
  "Dostałem list z sądu w Lublinie. Co to znaczy?",
  "Czy mogę nie płacić starych długów po 10 latach?",
  "Komornik zajął mi konto. Mam prawa?",
];

const SYSTEM_PROMPT = `Jesteś pomocnym asystentem platformy WindykatorStop.pl.
Pomagasz osobom zadłużonym w Polsce. Twoje zasady:
1. Używaj PROSTEGO, empatycznego języka. Unikaj żargonu prawniczego.
2. NIGDY nie oceniaj ani nie zawstydzaj użytkownika.
3. Odpowiadaj KONKRETNIE i krótko. Maksymalnie 3-4 zdania.
4. Jeśli sprawa wymaga prawnika, powiedz to wprost i zaproponuj bezpłatne kliniki prawne.
5. NIE dawaj porad inwestycyjnych ani finansowych — tylko informacje o prawach dłużnika.
6. Zawsze przypominaj, że pisma i dokumenty dostępne są bezpłatnie na windykatorstop.pl`;

export default function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Cześć! Jestem asystentem WindykatorStop. Nie oceniam — pomagam. Możesz mi napisać co się u Ciebie dzieje, albo wybrać jedno z częstych pytań poniżej.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          system: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.content ?? "Coś poszło nie tak. Spróbuj ponownie." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Przepraszam, mam chwilowy problem z połączeniem. Spróbuj ponownie za chwilę.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ai-chat" className="py-16 sm:py-24 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Asystent AI — zawsze dostępny
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Zapytaj, bez wstydu
          </h2>
          <p className="text-stone-500 text-base max-w-lg mx-auto">
            Nie musisz wiedzieć jak zadać pytanie. Napisz jak do znajomego — asystent zrozumie i pomoże.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-stone-400">
            <Shield className="w-3.5 h-3.5 text-teal-400" />
            Rozmowy są anonimowe i nie są zapisywane
          </div>
        </div>

        {/* Chat window */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          {/* Messages */}
          <div className="h-80 sm:h-96 overflow-y-auto p-5 space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-teal-100 text-teal-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-stone-50 text-stone-800 rounded-tl-none"
                      : "bg-teal-600 text-white rounded-tr-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-stone-50 px-4 py-3 rounded-2xl rounded-tl-none">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Starter questions */}
          {messages.length <= 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {STARTERS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-teal-50 text-teal-700 px-3 py-2 rounded-xl hover:bg-teal-100 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-stone-100 p-4 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Napisz swoje pytanie..."
              className="flex-1 bg-stone-50 text-stone-900 placeholder-stone-400 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-11 h-11 bg-teal-600 text-white rounded-xl flex items-center justify-center hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-4">
          Asystent AI może popełniać błędy. Przy ważnych decyzjach skonsultuj się z prawnikiem lub{" "}
          <a href="#kontakt" className="underline hover:text-teal-600">
            bezpłatną kliniką prawną
          </a>
          .
        </p>
      </div>
    </section>
  );
}
