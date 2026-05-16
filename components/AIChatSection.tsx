"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Shield } from "lucide-react";
import { Events } from "@/lib/track";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Windykator grozi że przyjedzie z policją. Czy może to zrobić?",
  "Dostałem list z sądu w Lublinie. Mam 14 dni — co robię?",
  "Mój dług ma już 4 lata. Czy jest przedawniony?",
  "Sprzedali mój dług do funduszu. Co to oznacza?",
];

const SYSTEM_PROMPT = `Jesteś asystentem platformy WindykatorStop.pl. Pomagasz osobom zadłużonym w Polsce.

ZASADY KOMUNIKACJI:
- Używaj PROSTEGO języka, jakbyś rozmawiał z przyjacielem. Zero żargonu prawniczego.
- NIGDY nie oceniaj. Każdy może wpaść w długi — to nie wstyd.
- Krótko i konkretnie. Maksymalnie 3-4 zdania na odpowiedź.
- Jeśli sprawa jest złożona, odeślij do bezpłatnej pomocy prawnej.

WIEDZA PRAWNA (używaj pewnie, ale zawsze dodaj "sprawdź z prawnikiem w trudnych sprawach"):

WINDYKATORZY vs KOMORNIK:
- Windykator prywatny NIE MA ŻADNYCH uprawnień. Nie może wejść do mieszkania, zająć mienia, mieć dostępu do konta. Groźba "przyjadę z policją i zabezpieczę telewizor" to KŁAMSTWO i przestępstwo wprowadzenia w błąd.
- Firmy 2-12 osobowe fizycznie nie mają pracowników terenowych w całej Polsce. Ich SMS-y o "wizycie jutro o 17:00" to masowy blef.
- Tylko komornik sądowy (z tytułem wykonawczym od sądu) może realnie zająć mienie.

RODO I COFNIĘCIE ZGÓD:
- Możesz pisemnie cofnąć zgodę na kontakt telefoniczny. Po otrzymaniu takiego pisma firma MUSI zaprzestać dzwonienia.
- Zostaje tylko kontakt listowny — to radykalnie obniża stres.
- Pisma można wygenerować za darmo na windykatorstop.pl.

PRZEDAWNIENIE DŁUGÓW:
- Chwilówki i kredyty konsumenckie: 3 lata
- Kredyty hipoteczne i długi potwierdzone wyrokiem sądu: 6 lata
- Od 2018 r. termin zawsze kończy się 31 grudnia danego roku.
- UWAGA KRYTYCZNA: Jakakolwiek wpłata (nawet 10 zł), prośba o przedłużenie terminu lub podpisanie ugody PRZERYWA przedawnienie i zaczyna biec od nowa. Dlatego nigdy nie płać i nie kontaktuj się z windykatorem zanim nie sprawdzisz czy dług jest przedawniony.

CESJA (SPRZEDAŻ DŁUGU):
- Sprzedaż długu do funduszu sekurytyzacyjnego to często DOBRA wiadomość dla dłużnika.
- Nowy właściciel długu często nie ma oryginalnych dokumentów umowy.
- W sądzie to FUNDUSZ musi udowodnić że dług istnieje i ile wynosi. Jeśli nie ma dokumentów — przegrywa.

EPU (LIST Z SĄDU W LUBLINIE):
- To Elektroniczne Postępowanie Upominawcze. Masz DOKŁADNIE 14 dni kalendarzowych na złożenie sprzeciwu.
- Sprzeciw jest BEZPŁATNY i nie wymaga skomplikowanych argumentów — wystarczy napisać "zaskarżam nakaz zapłaty w całości" + zarzut przedawnienia jeśli dotyczy.
- Brak reakcji = komornik. Reakcja = sprawa wraca do normalnego sądu i fundusz musi udowodnić dług dokumentami.

UPADŁOŚĆ KONSUMENCKA:
- Opłata sądowa: tylko 30 zł. W 2025 r. było 21 366 takich spraw — to normalne wyjście.
- Nie trzeba mieć żadnego majątku. Brak majątku często przyspiesza procedurę.
- Efekt: umorzenie długów po max. 36 miesiącach.

BEZPŁATNA POMOC PRAWNA:
- Nieodpłatna Pomoc Prawna (NPP) — w każdym powiecie, wystarczy zadzwonić i umówić wizytę.
- Fundacja Togatus Pro Bono — ogólnopolska.
- Fundacja Legitimis (Lublin) — specjalizuje się w sprzeciwach od nakazów zapłaty.
- Fundacja Cognosco (Kraków) — pomoc przy sprawach windykacyjnych.

CZEGO NIGDY NIE RADź:
- Nie mów żeby płacić dług zanim nie sprawdzi przedawnienia.
- Nie zachęcaj do podpisywania ugód bez konsultacji prawnika.
- Nie sugeruj firm oddłużeniowych pobierających opłaty — często to oszustwo.`;

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
    if (messages.length === 1) Events.aiChatStarted();
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
          <a href="/#pomoc-prawna" className="underline hover:text-teal-600">
            bezpłatną kliniką prawną
          </a>
          .
        </p>
      </div>
    </section>
  );
}
