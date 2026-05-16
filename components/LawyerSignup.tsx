"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, CheckCircle2, ArrowRight, Shield, Users, TrendingUp, Lock } from "lucide-react";
import { Events } from "@/lib/track";

export default function LawyerSignup() {
  const [form, setForm] = useState({
    name: "", title: "radca", barNo: "", email: "", phone: "",
    city: "", specializations: [] as string[], website: "", notes: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const SPEC_OPTIONS = [
    "Prawo konsumenckie",
    "Sprzeciw od nakazu EPU",
    "Fundusze sekurytyzacyjne",
    "Upadlosc konsumencka",
    "Egzekucja komornicza",
    "Klauzule abuzywne (kredyty CHF)",
  ];

  function toggleSpec(s: string) {
    setForm((f) => ({
      ...f,
      specializations: f.specializations.includes(s)
        ? f.specializations.filter((x) => x !== s)
        : [...f.specializations, s],
    }));
  }

  async function submit() {
    setState("sending");
    try {
      const res = await fetch("/api/lawyer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        Events.lawyerSignup(form.city);
        setState("sent");
      } else setState("error");
    } catch {
      setState("error");
    }
  }

  const valid = form.name && form.email && form.barNo && form.city && form.specializations.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <Scale className="w-3.5 h-3.5" />
          Dla prawnikow
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-4 leading-tight">
          Wspolpracuj z najwiekszq <br className="hidden sm:block" />
          baza dluznikow w Polsce
        </h1>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">
          Dostawaj kwalifikowane zlecenia od osob, ktorych sprawa wymaga prawnika.
          Bez oplat wstepnych. Prowizja tylko od pozytywnego rozstrzygniecia sprawy.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: Users, title: "Kwalifikowane zlecenia", desc: "System scoringowy filtruje tylko sprawy wymagajace prawnika. Nie tracisz czasu na DIY-zgodne sprawy." },
          { icon: TrendingUp, title: "Prowizja tylko od sukcesu", desc: "Brak oplat wstepnych. Platforma otrzymuje umowiona prowizje wylacznie z honorarium za wygrana sprawe." },
          { icon: Shield, title: "Zgodne z CCBE", desc: "Model wspolpracy zgodny z wytycznymi Rady Adwokatur Europy oraz uchwalami KRRP i NRA." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-stone-100 p-6">
            <Icon className="w-8 h-8 text-teal-600 mb-3" />
            <h3 className="font-bold text-stone-900 mb-2">{title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-10 mb-12">
        <h2 className="text-2xl font-extrabold text-stone-900 mb-6">Jak to dziala</h2>
        <div className="space-y-5">
          {[
            { n: "1", t: "Uzytkownik wypelnia ekspertyze", d: "5-pytaniowy formularz z systemem scoringu identyfikuje zlozonosc sprawy." },
            { n: "2", t: "System dopasowuje prawnika", d: "Na podstawie typu sprawy, etapu procesowego i lokalizacji - dopasowanie do specjalizacji w Twoim wojewodztwie." },
            { n: "3", t: "Dostajesz powiadomienie email", d: "Pelne podsumowanie sprawy + dane kontaktowe uzytkownika (po jego wyraznej zgodzie)." },
            { n: "4", t: "Bezplatna konsultacja", d: "Pierwsza rozmowa z klientem jest bezplatna - to standard platformy. Wyceniasz dalsze kroki transparentnie." },
            { n: "5", t: "Prowizja po wygranej", d: "Platforma otrzymuje umowiona prowizje (typowo 10-15%) z honorarium dopiero po pozytywnym rozstrzygnieciu sprawy. Brak oplat 'success fee' od klienta." },
          ].map(({ n, t, d }) => (
            <div key={n} className="flex gap-4">
              <div className="w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {n}
              </div>
              <div>
                <p className="font-bold text-stone-900 text-base">{t}</p>
                <p className="text-stone-600 text-sm">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification standards */}
      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 mb-12">
        <h3 className="font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-teal-600" />
          Standardy weryfikacji
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700">
          {[
            "Aktualny wpis na liste OIRP lub ORA",
            "Aktualna polisa OC zawodowa",
            "Brak post. dyscyplinarnych w toku",
            "Minimum 2 lata doswiadczenia w prawie konsumenckim",
            "Pisemne zobowiazanie do polityki transparentnych cen",
            "Brak modelu 'abonament za ochrone'",
          ].map((s) => (
            <div key={s} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signup form */}
      <div id="zglos" className="bg-white rounded-3xl border-2 border-teal-200 p-6 sm:p-10">
        <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
          Zgloszenie wstepne
        </h2>
        <p className="text-stone-500 text-sm mb-8">
          Wypelnij ponizszy formularz. Skontaktujemy sie w celu weryfikacji w ciagu 3 dni roboczych.
        </p>

        {state === "sent" ? (
          <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-3">✉️</div>
            <h3 className="text-xl font-extrabold text-teal-900 mb-2">Zgloszenie przyjete</h3>
            <p className="text-teal-700">
              Skontaktujemy sie z Toba w ciagu 3 dni roboczych w celu weryfikacji uprawnien zawodowych.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Imie i nazwisko" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jan Kowalski" />
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Tytul zawodowy</label>
                <select
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="radca">Radca prawny</option>
                  <option value="adwokat">Adwokat</option>
                  <option value="aplikant">Aplikant (rok 2-3)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Numer wpisu OIRP/ORA" value={form.barNo} onChange={(v) => setForm({ ...form, barNo: v })} placeholder="np. WA-5432" />
              <Field label="Miasto / wojewodztwo" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Warszawa / mazowieckie" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="kancelaria@..." type="email" />
              <Field label="Telefon" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+48..." type="tel" />
            </div>

            <Field label="Strona www kancelarii (opcjonalnie)" value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="https://..." />

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Specjalizacje (wybierz wszystkie ktore dotycza)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SPEC_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSpec(s)}
                    className={`text-left px-3 py-2.5 rounded-xl border-2 text-sm transition-all ${
                      form.specializations.includes(s)
                        ? "border-teal-500 bg-teal-50 text-teal-900"
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    {form.specializations.includes(s) ? "✓ " : ""}{s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Dodatkowe informacje (opcjonalnie)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Lata doswiadczenia, znaczace sprawy, link do CV..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {state === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl p-3">
                Cos poszlo nie tak. Sprobuj ponownie lub napisz na pomoc@windykatorstop.pl
              </div>
            )}

            <button
              onClick={submit}
              disabled={!valid || state === "sending"}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {state === "sending" ? "Wysylam..." : "Wyslij zgloszenie wstepne"}
            </button>

            <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3" />
              Dane bezpieczne. RODO. Brak przekazywania osobom trzecim.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-stone-500 hover:text-teal-600 underline transition-colors">
          ← Wroc do strony glownej
        </Link>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>
  );
}
