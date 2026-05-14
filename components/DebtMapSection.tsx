"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, Download } from "lucide-react";

type Debt = { id: number; name: string; amount: string; rate: string };

let nextId = 2;

export default function DebtMapSection() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Pożyczka w banku", amount: "", rate: "" },
  ]);

  function addRow() {
    setDebts((d) => [...d, { id: nextId++, name: "", amount: "", rate: "" }]);
  }

  function removeRow(id: number) {
    setDebts((d) => d.filter((r) => r.id !== id));
  }

  function updateRow(id: number, field: keyof Debt, value: string) {
    setDebts((d) => d.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  const total = debts.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  return (
    <section id="mapa-dlugow" className="py-16 sm:py-24 bg-gradient-to-br from-stone-50 to-teal-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Krok 1 — Poznaj swój dług
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-3">Mapa Długów</h2>
          <p className="text-stone-500 text-base max-w-md mx-auto">
            Wpisz wszystkie swoje długi. Nic tu nie jest oceniane — to tylko liczby, które pomogą Ci działać.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="text-left px-5 py-4 text-stone-500 font-medium">Wierzyciel / Pożyczka</th>
                  <th className="text-left px-4 py-4 text-stone-500 font-medium">Kwota (zł)</th>
                  <th className="text-left px-4 py-4 text-stone-500 font-medium">Oprocentowanie %</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {debts.map((debt) => (
                  <tr key={debt.id} className="group">
                    <td className="px-5 py-3">
                      <input
                        type="text"
                        value={debt.name}
                        onChange={(e) => updateRow(debt.id, "name", e.target.value)}
                        placeholder="np. Provident, PKO, SKOK..."
                        className="w-full bg-transparent text-stone-900 placeholder-stone-300 focus:outline-none text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={debt.amount}
                        onChange={(e) => updateRow(debt.id, "amount", e.target.value)}
                        placeholder="0"
                        className="w-24 bg-stone-50 rounded-lg px-3 py-1.5 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={debt.rate}
                        onChange={(e) => updateRow(debt.id, "rate", e.target.value)}
                        placeholder="?"
                        className="w-20 bg-stone-50 rounded-lg px-3 py-1.5 text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeRow(debt.id)}
                        disabled={debts.length === 1}
                        className="text-stone-300 hover:text-red-400 disabled:opacity-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-stone-50 border-t border-stone-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              onClick={addRow}
              className="inline-flex items-center gap-2 text-teal-600 text-sm font-semibold hover:text-teal-700"
            >
              <Plus className="w-4 h-4" /> Dodaj kolejny dług
            </button>

            {total > 0 && (
              <div className="text-right">
                <div className="text-xs text-stone-400 mb-0.5">Łączne zadłużenie</div>
                <div className="text-2xl font-extrabold text-stone-900">
                  {total.toLocaleString("pl-PL")} zł
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {total > 0 && (
            <div className="border-t border-stone-100 p-5 flex flex-col sm:flex-row gap-3">
              <a
                href="#plan"
                className="flex-1 bg-teal-600 text-white text-sm font-bold py-3 px-5 rounded-2xl text-center hover:bg-teal-700 transition-colors"
              >
                Generuj plan spłaty
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 bg-stone-100 text-stone-700 text-sm font-semibold py-3 px-5 rounded-2xl hover:bg-stone-200 transition-colors">
                <Download className="w-4 h-4" /> Pobierz jako PDF
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-stone-400 mt-5">
          Dane zostają tylko w Twojej przeglądarce. Nic nie wysyłamy na serwer.
        </p>
      </div>
    </section>
  );
}
