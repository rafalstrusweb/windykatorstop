"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, XCircle, AlertCircle, ChevronDown } from "lucide-react";
import { Events } from "@/lib/track";

const DEBT_TYPES = [
  { value: "chwilowka", label: "Chwilówka / pożyczka pozabankowa", years: 3 },
  { value: "kredyt-konsumencki", label: "Kredyt konsumencki (bank)", years: 3 },
  { value: "telefon-media", label: "Rachunek za telefon / media / czynsz", years: 3 },
  { value: "kredyt-hipoteczny", label: "Kredyt hipoteczny", years: 6 },
  { value: "wyrok-sadu", label: "Dług potwierdzony wyrokiem sądu", years: 6 },
  { value: "zus-us", label: "ZUS / Urząd Skarbowy", years: 5 },
];

type Result = "przedawniony" | "wkrotce" | "aktywny" | null;

export default function StatuteCalculator() {
  const [debtType, setDebtType] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [interrupted, setInterrupted] = useState<boolean | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [expiryDate, setExpiryDate] = useState("");

  function calculate() {
    if (!debtType || !lastDate || interrupted === null) return;
    if (interrupted) {
      setResult("aktywny");
      setExpiryDate("");
      return;
    }

    const type = DEBT_TYPES.find((t) => t.value === debtType);
    if (!type) return;

    const start = new Date(lastDate);
    // End of the year in which the period expires (2018 reform)
    const expiryYear = start.getFullYear() + type.years;
    const expiry = new Date(expiryYear, 11, 31); // Dec 31
    const today = new Date();
    const monthsLeft = Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));

    setExpiryDate(expiry.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }));

    let r: "przedawniony" | "wkrotce" | "aktywny";
    if (today > expiry) r = "przedawniony";
    else if (monthsLeft <= 6) r = "wkrotce";
    else r = "aktywny";
    setResult(r);
    Events.statuteCalculated(r);
  }

  return (
    <section id="kalkulator" className="py-16 sm:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Darmowe narzędzie
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Czy mój dług jest przedawniony?
          </h2>
          <p className="text-stone-500 text-base max-w-md mx-auto">
            Sprawdź w 30 sekund. Przedawniony dług to dług, którego wierzyciel nie może już dochodzić przed sądem.
          </p>
        </div>

        <div className="bg-stone-50 rounded-3xl border border-stone-100 p-6 sm:p-8 space-y-6">
          {/* Step 1 */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              1. Jaki to rodzaj długu?
            </label>
            <div className="relative">
              <select
                value={debtType}
                onChange={(e) => { setDebtType(e.target.value); setResult(null); }}
                className="w-full appearance-none bg-white border border-stone-200 rounded-xl px-4 py-3 pr-10 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Wybierz typ długu...</option>
                {DEBT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              2. Kiedy minął termin ostatniej wymaganej spłaty (rata, termin pożyczki)?
            </label>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => { setLastDate(e.target.value); setResult(null); }}
              max={new Date().toISOString().split("T")[0]}
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <p className="text-xs text-stone-400 mt-1.5">
              Jeśli nie pamiętasz dokładnie — podaj przybliżoną datę. To da Ci orientację.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-3">
              3. Czy od tego czasu zdarzyło się coś z tej listy?
            </label>
            <div className="space-y-2">
              {[
                { val: false, label: "Nie — nie miałem żadnego kontaktu, nie płaciłem nic, nic nie podpisywałem" },
                { val: true, label: "Tak — płaciłem choć część, podpisałem ugodę, prosiłem o przedłużenie terminu, sąd wydał wyrok" },
              ].map(({ val, label }) => (
                <button
                  key={String(val)}
                  onClick={() => { setInterrupted(val); setResult(null); }}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                    interrupted === val
                      ? val ? "border-red-400 bg-red-50 text-red-800" : "border-teal-400 bg-teal-50 text-teal-800"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={calculate}
            disabled={!debtType || !lastDate || interrupted === null}
            className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Sprawdź przedawnienie
          </button>

          {/* Result */}
          {result && (
            <div className={`rounded-2xl p-5 border-2 ${
              result === "przedawniony" ? "bg-green-50 border-green-200" :
              result === "wkrotce" ? "bg-amber-50 border-amber-200" :
              "bg-stone-50 border-stone-200"
            }`}>
              {result === "przedawniony" && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-bold text-green-800 text-lg">Ten dług prawdopodobnie jest przedawniony</span>
                  </div>
                  <p className="text-green-700 text-sm mb-3">
                    Termin przedawnienia minął: <strong>{expiryDate}</strong>. Wierzyciel nie może już skutecznie dochodzić tego długu przed sądem.
                  </p>
                  <div className="bg-green-100 rounded-xl p-3 text-xs text-green-800 space-y-1">
                    <p><strong>Co to znaczy w praktyce:</strong></p>
                    <p>✓ Jeśli sprawa trafi do sądu — złóż zarzut przedawnienia</p>
                    <p>✓ NIE płać żadnych kwot — wpłata ożywi dług</p>
                    <p>✓ NIE podpisuj ugód — skonsultuj z prawnikiem</p>
                  </div>
                  <a href="/#pomoc-prawna" className="mt-3 inline-block text-sm text-green-700 font-semibold underline">
                    Skonsultuj z bezpłatną kliniką prawną →
                  </a>
                </div>
              )}

              {result === "wkrotce" && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="font-bold text-amber-800 text-lg">Przedawnienie jest bliskie — uważaj</span>
                  </div>
                  <p className="text-amber-700 text-sm mb-3">
                    Termin przedawnienia: <strong>{expiryDate}</strong>. Wierzyciel może teraz próbować Cię zmusić do uznania długu, bo mu się kończy czas.
                  </p>
                  <div className="bg-amber-100 rounded-xl p-3 text-xs text-amber-800">
                    <p><strong>Nie rób teraz:</strong> nie płać nic, nie podpisuj ugód, nie dzwoń do windykatora, nie odpowiadaj na SMS-y o "wyjątkowej propozycji".</p>
                  </div>
                </div>
              )}

              {result === "aktywny" && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-stone-500 flex-shrink-0" />
                    <span className="font-bold text-stone-700 text-lg">Dług prawdopodobnie nie jest przedawniony</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-3">
                    {interrupted
                      ? "Bieg przedawnienia został przerwany — termin biegnie od nowa."
                      : `Termin przedawnienia mija: ${expiryDate}.`}
                    Skup się teraz na innych narzędziach obrony.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <a href="/generator-pism" className="text-sm bg-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-teal-700">
                      Zatrzymaj telefony (RODO)
                    </a>
                    <a href="/#ai-chat" className="text-sm bg-white border border-stone-200 text-stone-700 px-4 py-2 rounded-xl font-semibold hover:bg-stone-50">
                      Zapytaj asystenta AI
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-stone-400 mt-5">
          Kalkulator daje orientację — nie zastąpi porady prawnika. W ważnych sprawach skonsultuj się z{" "}
          <a href="/#pomoc-prawna" className="underline hover:text-teal-600">bezpłatną kliniką prawną</a>.
        </p>
      </div>
    </section>
  );
}
