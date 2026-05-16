"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus, Trash2, Calculator, Download, AlertTriangle, TrendingUp,
  Calendar, ChevronDown, ChevronUp, Sparkles, Info, Lightbulb,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type DebtType = "chwilowka" | "bank" | "hipoteka" | "media" | "wyrok" | "inny";

type Debt = {
  id: number;
  name: string;
  type: DebtType;
  amount: number;
  rate: number;        // % oprocentowanie
  minPayment: number;  // minimalna rata miesieczna
  lastPaymentDate: string; // YYYY-MM-DD - data ostatniej wymagalnosci
};

const STORAGE_KEY = "windykatorstop:debtmap:v2";

const TYPE_LABEL: Record<DebtType, string> = {
  chwilowka: "Chwilówka / pożyczka",
  bank: "Kredyt bankowy",
  hipoteka: "Kredyt hipoteczny",
  media: "Media / czynsz / telefon",
  wyrok: "Dług z wyrokiem sądu",
  inny: "Inne",
};

// Statute years per type
const STATUTE_YEARS: Record<DebtType, number> = {
  chwilowka: 3, bank: 3, media: 3, hipoteka: 6, wyrok: 6, inny: 3,
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function emptyDebt(): Debt {
  return {
    id: Date.now() + Math.random(),
    name: "", type: "chwilowka", amount: 0, rate: 0,
    minPayment: 0, lastPaymentDate: "",
  };
}

// Returns months until statute of limitations expires. Negative = already expired.
function statuteStatus(debt: Debt): { monthsLeft: number | null; expired: boolean; expiryDate: Date | null } {
  if (!debt.lastPaymentDate) return { monthsLeft: null, expired: false, expiryDate: null };
  const start = new Date(debt.lastPaymentDate);
  const years = STATUTE_YEARS[debt.type];
  // 2018 reform — end-of-year rule for terms >= 2 years
  const expiryYear = start.getFullYear() + years;
  const expiryDate = new Date(expiryYear, 11, 31); // Dec 31
  const now = new Date();
  const monthsLeft = Math.round((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4));
  return { monthsLeft, expired: monthsLeft < 0, expiryDate };
}

// Avalanche method: order by highest interest rate first
function avalancheOrder(debts: Debt[]) {
  return [...debts].filter((d) => d.amount > 0).sort((a, b) => b.rate - a.rate);
}

// Snowball method: order by smallest balance first
function snowballOrder(debts: Debt[]) {
  return [...debts].filter((d) => d.amount > 0).sort((a, b) => a.amount - b.amount);
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function DebtMapSection() {
  const [debts, setDebts] = useState<Debt[]>([emptyDebt()]);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [extraBudget, setExtraBudget] = useState(200);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.debts) && parsed.debts.length > 0) {
          setDebts(parsed.debts);
          if (parsed.strategy) setStrategy(parsed.strategy);
          if (typeof parsed.extraBudget === "number") setExtraBudget(parsed.extraBudget);
        }
      }
    } catch {}
  }, []);

  // Save on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ debts, strategy, extraBudget }));
    } catch {}
  }, [debts, strategy, extraBudget]);

  function update(id: number, patch: Partial<Debt>) {
    setDebts((arr) => arr.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function addRow() {
    setDebts((arr) => [...arr, emptyDebt()]);
  }

  function removeRow(id: number) {
    setDebts((arr) => (arr.length === 1 ? arr : arr.filter((d) => d.id !== id)));
  }

  function clearAll() {
    if (confirm("Czy na pewno wyczyścić wszystkie dane?")) {
      setDebts([emptyDebt()]);
      setShowPlan(false);
    }
  }

  const validDebts = debts.filter((d) => d.amount > 0);
  const total = validDebts.reduce((s, d) => s + d.amount, 0);
  const totalMin = validDebts.reduce((s, d) => s + (d.minPayment || 0), 0);
  const expiredDebts = validDebts.filter((d) => statuteStatus(d).expired);
  const nearExpiry = validDebts.filter((d) => {
    const s = statuteStatus(d);
    return !s.expired && s.monthsLeft !== null && s.monthsLeft <= 6;
  });

  const orderedDebts = strategy === "avalanche" ? avalancheOrder(validDebts) : snowballOrder(validDebts);

  function handlePrint() {
    window.print();
  }

  return (
    <section id="mapa-dlugow" className="py-16 sm:py-24 bg-gradient-to-br from-stone-50 to-teal-50">
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #plan-print, #plan-print * { visibility: visible !important; }
          #plan-print { position: fixed; top: 0; left: 0; width: 100%; padding: 2cm; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Krok 1 — Poznaj swój dług
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-3">Mapa Długów</h2>
          <p className="text-stone-500 text-base max-w-lg mx-auto">
            Wpisz wszystkie swoje długi. Sprawdzimy które są <strong>przedawnione</strong> i wygenerujemy plan spłaty.
          </p>
        </div>

        {/* Debts list */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-6">
          <div className="p-4 sm:p-6 space-y-3">
            {debts.map((debt, idx) => {
              const status = statuteStatus(debt);
              const isExpanded = expandedId === debt.id;
              const hasWarning = status.expired || (status.monthsLeft !== null && status.monthsLeft <= 6);

              return (
                <div
                  key={debt.id}
                  className={`border-2 rounded-2xl transition-all ${
                    status.expired
                      ? "border-green-300 bg-green-50"
                      : status.monthsLeft !== null && status.monthsLeft <= 6
                      ? "border-amber-300 bg-amber-50"
                      : "border-stone-100 bg-stone-50"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-2 p-3">
                    <span className="text-xs font-bold text-stone-400 w-6 flex-shrink-0">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => update(debt.id, { name: e.target.value })}
                      placeholder="np. Provident, PKO, mBank..."
                      className="flex-1 bg-transparent text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none min-w-0"
                    />
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : debt.id)}
                      className="text-stone-400 hover:text-teal-600 transition-colors p-1"
                      aria-label="Rozwiń"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => removeRow(debt.id)}
                      disabled={debts.length === 1}
                      className="text-stone-300 hover:text-red-400 disabled:opacity-0 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick fields - always visible */}
                  <div className="px-3 pb-3 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-stone-500">Kwota:</span>
                      <input
                        type="number"
                        value={debt.amount || ""}
                        onChange={(e) => update(debt.id, { amount: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        className="w-24 bg-white rounded-lg px-2 py-1 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-stone-200"
                      />
                      <span className="text-xs text-stone-400">zł</span>
                    </div>

                    <select
                      value={debt.type}
                      onChange={(e) => update(debt.id, { type: e.target.value as DebtType })}
                      className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      {Object.entries(TYPE_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>

                    {/* Status badge */}
                    {hasWarning && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                        status.expired ? "bg-green-200 text-green-900" : "bg-amber-200 text-amber-900"
                      }`}>
                        {status.expired ? (
                          <>✓ Przedawniony</>
                        ) : (
                          <>⚠️ Przedawnia się za {status.monthsLeft} mies.</>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Expanded fields */}
                  {isExpanded && (
                    <div className="px-3 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-stone-200/50 pt-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Oprocentowanie (%)</label>
                        <input
                          type="number"
                          value={debt.rate || ""}
                          onChange={(e) => update(debt.id, { rate: parseFloat(e.target.value) || 0 })}
                          placeholder="np. 10"
                          className="w-full bg-white rounded-lg px-2 py-1.5 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Min. rata miesięczna (zł)</label>
                        <input
                          type="number"
                          value={debt.minPayment || ""}
                          onChange={(e) => update(debt.id, { minPayment: parseFloat(e.target.value) || 0 })}
                          placeholder="np. 200"
                          className="w-full bg-white rounded-lg px-2 py-1.5 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">
                          Data ostatniej wymagalności
                          <Info className="inline w-3 h-3 ml-1 text-stone-400" />
                        </label>
                        <input
                          type="date"
                          value={debt.lastPaymentDate}
                          onChange={(e) => update(debt.id, { lastPaymentDate: e.target.value })}
                          max={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white rounded-lg px-2 py-1.5 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-stone-50 border-t border-stone-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              onClick={addRow}
              className="inline-flex items-center gap-2 text-teal-600 text-sm font-semibold hover:text-teal-700"
            >
              <Plus className="w-4 h-4" /> Dodaj kolejny dług
            </button>
            {total > 0 && (
              <div className="text-right">
                <div className="text-xs text-stone-400">Łączne zadłużenie</div>
                <div className="text-2xl font-extrabold text-stone-900">
                  {total.toLocaleString("pl-PL")} zł
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CRITICAL WARNING: expired debts */}
        {expiredDebts.length > 0 && (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <h3 className="font-extrabold text-green-900">
                Masz {expiredDebts.length} {expiredDebts.length === 1 ? "dług który może być przedawniony" : "długi które mogą być przedawnione"}!
              </h3>
            </div>
            <p className="text-sm text-green-800 mb-3">
              <strong>NIE PŁAĆ tych długów</strong> bez konsultacji z prawnikiem. Wpłata nawet 10 zł reaktywuje dług. Te długi prawdopodobnie są martwe prawnie:
            </p>
            <ul className="text-sm text-green-900 space-y-1 mb-3">
              {expiredDebts.map((d) => (
                <li key={d.id} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <strong>{d.name || "Bez nazwy"}</strong> ({d.amount.toLocaleString("pl-PL")} zł) — termin minął
                </li>
              ))}
            </ul>
            <Link
              href="/#kalkulator"
              className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Dokładnie sprawdź przedawnienie →
            </Link>
          </div>
        )}

        {/* WARNING: near-expiry debts */}
        {nearExpiry.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-amber-900">
                {nearExpiry.length} {nearExpiry.length === 1 ? "dług" : "długi"} blisko przedawnienia
              </h3>
            </div>
            <p className="text-sm text-amber-800">
              Wierzyciel może teraz próbować Cię zmusić do uznania długu (wpłata, ugoda, prośba o przedłużenie).
              <strong> Nie reaguj na presję — czekaj.</strong>
            </p>
          </div>
        )}

        {/* Strategy & plan */}
        {validDebts.length >= 2 && (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-5 sm:p-6 mb-4">
            <h3 className="font-extrabold text-stone-900 text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              Wybierz strategię spłaty
            </h3>
            <p className="text-sm text-stone-500 mb-4">
              Te strategie dotyczą długów aktywnych — przedawnione wykluczamy automatycznie.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setStrategy("avalanche")}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${
                  strategy === "avalanche"
                    ? "border-teal-500 bg-teal-50"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="font-bold text-stone-900 mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Lawina
                </div>
                <p className="text-xs text-stone-600">
                  Spłacaj najpierw dług z najwyższym oprocentowaniem. Matematycznie najtańsza opcja.
                </p>
              </button>
              <button
                onClick={() => setStrategy("snowball")}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${
                  strategy === "snowball"
                    ? "border-teal-500 bg-teal-50"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="font-bold text-stone-900 mb-1">❄️ Kula śnieżna</div>
                <p className="text-xs text-stone-600">
                  Spłacaj najpierw najmniejszy dług. Szybkie zwycięstwa motywują do dalszej spłaty.
                </p>
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Dodatkowa kwota na spłatę długów miesięcznie (ponad minimalne raty):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={extraBudget}
                  onChange={(e) => setExtraBudget(parseInt(e.target.value))}
                  className="flex-1 accent-teal-600"
                />
                <span className="font-bold text-stone-900 w-20 text-right">{extraBudget} zł</span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Minimalne raty: {totalMin.toLocaleString("pl-PL")} zł. Łącznie miesięcznie: {(totalMin + extraBudget).toLocaleString("pl-PL")} zł.
              </p>
            </div>

            <button
              onClick={() => setShowPlan(true)}
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-2xl hover:bg-teal-700 transition-all active:scale-95"
            >
              Wygeneruj plan spłaty
            </button>
          </div>
        )}

        {/* Generated plan */}
        {showPlan && validDebts.length >= 1 && (
          <div className="bg-white rounded-3xl shadow-sm border-2 border-teal-200 p-5 sm:p-7" id="plan-print">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">
                  Twój plan spłaty
                </h3>
                <p className="text-sm text-stone-500">
                  Strategia: <strong>{strategy === "avalanche" ? "Lawina (po oprocentowaniu)" : "Kula śnieżna (po kwocie)"}</strong>
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold px-4 py-2 rounded-xl print:hidden"
              >
                <Download className="w-4 h-4" /> Drukuj / Zapisz PDF
              </button>
            </div>

            <ol className="space-y-3">
              {orderedDebts.map((d, i) => {
                const status = statuteStatus(d);
                if (status.expired) return null;
                return (
                  <li key={d.id} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50">
                    <span className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900 text-sm">
                        {d.name || "Bez nazwy"} <span className="text-stone-500 font-normal">— {TYPE_LABEL[d.type]}</span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Kwota: <strong className="text-stone-700">{d.amount.toLocaleString("pl-PL")} zł</strong>
                        {d.rate > 0 && <> · Oprocentowanie: <strong className="text-stone-700">{d.rate}%</strong></>}
                        {d.minPayment > 0 && <> · Min. rata: <strong className="text-stone-700">{d.minPayment} zł</strong></>}
                      </div>
                      {i === 0 && extraBudget > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                          ⚡ Tu wkładaj +{extraBudget} zł ekstra co miesiąc
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {expiredDebts.length > 0 && (
              <div className="mt-5 pt-5 border-t border-stone-200">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">
                  Wykluczone z planu (mogą być przedawnione):
                </p>
                <ul className="text-sm text-stone-600 space-y-1">
                  {expiredDebts.map((d) => (
                    <li key={d.id}>
                      • {d.name || "Bez nazwy"} ({d.amount.toLocaleString("pl-PL")} zł) — <span className="text-green-700 font-semibold">NIE PŁAĆ przed konsultacją z prawnikiem</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-stone-100 text-xs text-stone-400">
              Plan wygenerowany {new Date().toLocaleDateString("pl-PL")} przez WindykatorStop.pl
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-4 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            Dane zapisane w Twojej przeglądarce. Nic nie wysyłamy na serwer.
          </div>
          {total > 0 && (
            <button onClick={clearAll} className="hover:text-red-500 transition-colors underline">
              Wyczyść wszystko
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
