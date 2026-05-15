"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, FileText, Send, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── Deadline calculator ───────────────────────────────────────────────────────

function calcDeadline(deliveryDate: string) {
  const d = new Date(deliveryDate);
  const deadline = new Date(d);
  deadline.setDate(deadline.getDate() + 14);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return { deadline, diff };
}

function formatPL(d: Date) {
  return d.toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ─── Steps config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, icon: "📬", label: "Sprawdź czy to EPU" },
  { id: 2, icon: "⏱️", label: "Oblicz termin 14 dni" },
  { id: 3, icon: "📄", label: "Wygeneruj sprzeciw" },
  { id: 4, icon: "📮", label: "Wyślij listem poleconym" },
  { id: 5, icon: "✅", label: "Co dalej?" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function EPUWizard() {
  const [step, setStep] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isEPU, setIsEPU] = useState<boolean | null>(null);

  const deadline = deliveryDate ? calcDeadline(deliveryDate) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          MASZ 14 DNI NA DZIAŁANIE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
          Dostałem list z sądu w Lublinie
        </h1>
        <p className="text-stone-500 text-lg">
          Krok po kroku — co zrobić żeby nie przegrać z automatu.
        </p>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => step > s.id && setStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                step === s.id
                  ? "bg-teal-600 text-white"
                  : step > s.id
                  ? "bg-teal-100 text-teal-700 cursor-pointer hover:bg-teal-200"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.id}</span>
            </button>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-3 h-3 text-stone-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: Czy to EPU? ─────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-stone-900 mb-4">
              📬 Krok 1: Czy to naprawdę nakaz z e-Sądu?
            </h2>
            <p className="text-stone-600 text-sm mb-5">
              Sprawdź kopertę i pismo. Nakaz z EPU ma konkretne cechy:
            </p>

            <div className="space-y-3 mb-6">
              {[
                { text: "Nadawca: Sąd Rejonowy Lublin-Zachód w Lublinie", yes: true },
                { text: 'Sygnatura akt zaczyna sie od "Nc-e"', yes: true },
                { text: 'W pismie jest zwrot "nakaz zaplaty" lub "elektroniczne postepowanie upominawcze"', yes: true },
                { text: "List jest awizowany (żółta kartka od listonosza) lub odebrałeś go osobiście", yes: true },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-stone-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-5">
              <p className="text-sm font-semibold text-stone-800 mb-3">
                Czy Twój list pasuje do powyższego opisu?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setIsEPU(true); setStep(2); }}
                  className="py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all"
                >
                  ✓ Tak, to EPU
                </button>
                <button
                  onClick={() => setIsEPU(false)}
                  className="py-3 bg-stone-100 text-stone-700 font-semibold rounded-2xl hover:bg-stone-200 transition-all"
                >
                  Nie jestem pewny
                </button>
              </div>
            </div>

            {isEPU === false && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">Nie jesteś pewny?</p>
                <p>Sfotografuj pismo i zapytaj asystenta AI — opisz dokładnie co jest napisane na kopercie i w piśmie.</p>
                <Link href="/#ai-chat" className="inline-block mt-2 text-teal-600 font-semibold underline">
                  Zapytaj asystenta AI →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 2: Termin 14 dni ───────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">
              ⏱️ Krok 2: Ile czasu zostało?
            </h2>
            <p className="text-stone-500 text-sm mb-5">
              Termin 14 dni liczy się od daty odebrania nakazu przez Ciebie (lub daty drugiego awiza).
            </p>

            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Kiedy odebrałeś/aś list? (lub data drugiego awiza)
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 mb-5"
            />

            {deadline && (
              <div className={`rounded-2xl p-5 border-2 mb-5 ${
                deadline.diff < 0 ? "bg-stone-50 border-stone-200" :
                deadline.diff <= 3 ? "bg-red-50 border-red-300" :
                deadline.diff <= 7 ? "bg-amber-50 border-amber-300" :
                "bg-teal-50 border-teal-200"
              }`}>
                {deadline.diff < 0 ? (
                  <div>
                    <p className="font-extrabold text-stone-700 text-lg mb-1">Termin minął {Math.abs(deadline.diff)} dni temu</p>
                    <p className="text-stone-600 text-sm mb-3">
                      Nakaz mógł się już uprawomocnić. Jednak działaj natychmiast — są sytuacje wyjątkowe gdy można złożyć wniosek o przywrócenie terminu.
                    </p>
                    <Link href="/generator-pism" className="text-sm font-bold text-teal-600 underline">
                      Skonsultuj z bezpłatną kliniką prawną — Fundacja Legitimis →
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-4xl font-extrabold ${
                        deadline.diff <= 3 ? "text-red-700" :
                        deadline.diff <= 7 ? "text-amber-700" :
                        "text-teal-700"
                      }`}>
                        {deadline.diff}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">
                          {deadline.diff === 1 ? "dzień do terminu" : deadline.diff < 5 ? "dni do terminu" : "dni do terminu"}
                        </div>
                        <div className="text-sm text-stone-500">
                          Termin: {formatPL(deadline.deadline)}
                        </div>
                      </div>
                    </div>

                    {deadline.diff <= 3 && (
                      <div className="bg-red-100 rounded-xl p-3 text-sm text-red-800 font-semibold">
                        🚨 DZIAŁAJ DZISIAJ. Wyślij sprzeciw dzisiaj — nawet bez pełnego uzasadnienia.
                      </div>
                    )}
                    {deadline.diff > 3 && deadline.diff <= 7 && (
                      <div className="bg-amber-100 rounded-xl p-3 text-sm text-amber-800 font-semibold">
                        ⚠️ Mało czasu. Nie czekaj — wygeneruj sprzeciw dzisiaj.
                      </div>
                    )}
                    {deadline.diff > 7 && (
                      <div className="bg-teal-100 rounded-xl p-3 text-sm text-teal-800">
                        Masz jeszcze czas, ale działaj teraz — nie zostawiaj na ostatnią chwilę.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-500 mb-5 space-y-1">
              <p className="font-semibold text-stone-700">Jak liczyć termin:</p>
              <p>• Odebrałeś list osobiście = termin od daty odbioru</p>
              <p>• List awizowany i odebrałeś drugie awizo = termin od daty drugiego awiza</p>
              <p>• List awizowany i nie odebrałeś = termin od daty zwrotu do nadawcy (14 dni od pierwszego awiza)</p>
              <p className="font-semibold text-stone-700 pt-1">W razie wątpliwości — działaj jakby termin był najkrótszy.</p>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!deliveryDate}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Generuj sprzeciw <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Generuj sprzeciw ───────────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">
              📄 Krok 3: Wygeneruj sprzeciw
            </h2>
            <p className="text-stone-600 text-sm mb-5">
              Sprzeciw od nakazu EPU jest <strong>bezpłatny</strong>. Nie musisz podawać skomplikowanych argumentów — wystarczy napisać że zaskarżasz nakaz. Mamy gotowy wzór.
            </p>

            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-5 space-y-2 text-sm text-teal-800">
              <p className="font-semibold">Co zawiera nasz sprzeciw:</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Zaskarżenie nakazu zapłaty w całości</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Wniosek o oddalenie powództwa</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Opcjonalny zarzut przedawnienia (jeśli dotyczy)</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Wezwanie do przedłożenia dokumentacji źródłowej</p>
            </div>

            <div className="space-y-3 mb-5">
              <div className="bg-stone-50 rounded-xl p-4 text-sm">
                <p className="font-semibold text-stone-800 mb-1">Czego NIE musisz wiedzieć żeby złożyć sprzeciw:</p>
                <p className="text-stone-600">Nie musisz wiedzieć czy dług jest przedawniony, czy umowa była legalna, ani ile dokładnie wynosi. Samo złożenie sprzeciwu przenosi ciężar dowodu na fundusz — oni muszą teraz udowodnić że dług istnieje.</p>
              </div>
            </div>

            <Link
              href="/generator-pism"
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 text-base"
            >
              <FileText className="w-5 h-5" />
              Wygeneruj sprzeciw EPU — za darmo
            </Link>

            <p className="text-xs text-stone-400 text-center mt-3">
              Kliknij „Sprzeciw od nakazu EPU" w generatorze pism
            </p>

            <button
              onClick={() => setStep(4)}
              className="w-full mt-3 py-3 text-sm text-stone-500 hover:text-teal-600 underline transition-colors"
            >
              Mam już gotowe pismo → jak je wysłać?
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Wyślij ────────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">
              📮 Krok 4: Wyślij — koniecznie listem poleconym
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <strong>Wyślij LISTEM POLECONYM za potwierdzeniem odbioru.</strong>{" "}
                Liczy się data nadania. Zachowaj potwierdzenie nadania — to Twój jedyny dowód dotrzymania terminu.
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Wydrukuj i podpisz pismo",
                  desc: "Podpis musi być własnoręczny — nie wystarczy wydrukowany. Jeśli nie masz drukarki: wyślij plik emailem i wydrukuj w Biedronce, salonie prasowym lub bibliotece (ok. 30–50 gr za stronę).",
                },
                {
                  step: "2",
                  title: "Idź na pocztę",
                  desc: 'Wyslij na adres: Sad Rejonowy Lublin-Zachod w Lublinie, VI Wydzial Cywilny, ul. Boczna Lubomelskiej 13, 20-070 Lublin. Powiedz: "Polecona ze zwrotnym potwierdzeniem odbioru."',
                },
                {
                  step: "3",
                  title: "Zachowaj potwierdzenie",
                  step_desc: "Poczta da Ci potwierdzenie nadania. Zachowaj je — to Twój dowód że wysłałeś w terminie. Zrób zdjęcie telefonem.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-1">{item.title}</p>
                    <p className="text-stone-500 text-sm">{item.desc ?? item.step_desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-stone-50 rounded-2xl p-4 text-sm text-stone-600">
              <p className="font-semibold text-stone-800 mb-2">Koszt wysyłki:</p>
              <p>List polecony priorytetowy ze zwrotnym potwierdzeniem odbioru: <strong className="text-stone-900">ok. 8–12 zł</strong>. To jedyny koszt całej procedury.</p>
            </div>

            <button
              onClick={() => setStep(5)}
              className="w-full mt-5 bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Wysłałem/am — co dalej? <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: Co dalej? ──────────────────────────────────────────────── */}
      {step === 5 && (
        <div className="space-y-5">
          <div className="bg-teal-50 border-2 border-teal-200 rounded-3xl p-6 sm:p-8 text-center mb-2">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-extrabold text-teal-900 mb-2">
              Brawo — zrobiłeś/aś najważniejszy krok
            </h2>
            <p className="text-teal-700 text-base">
              Złożony sprzeciw automatycznie unieważnia nakaz zapłaty. Fundusz musi teraz iść do normalnego sądu i udowodnić dług.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <h3 className="font-extrabold text-stone-900 text-lg mb-4">Co się teraz dzieje:</h3>
            <div className="space-y-4">
              {[
                {
                  icon: "⚖️",
                  title: "Sprawa wraca do normalnego sądu",
                  desc: "EPU zostaje umorzone. Jeśli fundusz chce dalej dochodzić długu, musi złożyć normalny pozew w sądzie właściwym dla Twojego miejsca zamieszkania.",
                },
                {
                  icon: "📁",
                  title: "Fundusz musi udowodnić dług dokumentami",
                  desc: "W normalnym sądzie to powód (fundusz) musi przedstawić oryginalne umowy, dowód wypłaty, historię wpłat. Wiele funduszy sekurytyzacyjnych kupiło długi bez pełnej dokumentacji — i nie może tego zrobić.",
                },
                {
                  icon: "📅",
                  title: "Masz czas na przygotowanie obrony",
                  desc: "Normalna sprawa sądowa trwa miesiące. Masz czas skonsultować się z bezpłatną kliniką prawną i przygotować odpowiedź na pozew.",
                },
                {
                  icon: "🏳️",
                  title: "Wiele funduszy rezygnuje",
                  desc: "Wniesienie pozwu do normalnego sądu jest kosztowne i pracochłonne. Część funduszy po prostu rezygnuje z dalszego dochodzenia roszczenia.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-0.5">{item.title}</p>
                    <p className="text-stone-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <h3 className="font-extrabold text-stone-900 text-base mb-4">
              <Send className="inline w-4 h-4 mr-2 text-teal-600" />
              Teraz skonsultuj sprawę z prawnikiem — bezpłatnie:
            </h3>
            <div className="space-y-2">
              {[
                { name: "Fundacja Legitimis", desc: "Specjalizuje się w sprzeciwach EPU i funduszach sekurytyzacyjnych", href: "https://legitimis.pl" },
                { name: "Nieodpłatna Pomoc Prawna (NPP)", desc: "W każdym powiecie. Zadzwoń i umów wizytę.", href: "https://np.ms.gov.pl" },
                { name: "Fundacja Togatus Pro Bono", desc: "Bezpłatne porady na terenie całego kraju", href: "https://fundacja.togatus.pl" },
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-stone-50 hover:bg-teal-50 rounded-xl p-3 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-900 group-hover:text-teal-700 transition-colors">{org.name}</p>
                    <p className="text-xs text-stone-500">{org.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#kalkulator"
              className="flex-1 text-center bg-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-teal-700 transition-colors text-sm"
            >
              Sprawdź czy dług jest przedawniony
            </Link>
            <Link
              href="/#ai-chat"
              className="flex-1 text-center bg-stone-100 text-stone-700 font-semibold py-3 px-4 rounded-xl hover:bg-stone-200 transition-colors text-sm"
            >
              Zadaj pytanie asystentowi AI
            </Link>
          </div>
        </div>
      )}

      {/* Bottom nav for steps 1-4 */}
      {step > 1 && step < 5 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setStep((s) => s - 1)}
            className="text-sm text-stone-400 hover:text-stone-700 underline transition-colors"
          >
            ← Poprzedni krok
          </button>
        </div>
      )}
    </div>
  );
}
