"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle,
  Scale, FileText, Phone, Mail, Shield, Lock,
} from "lucide-react";

// ─── Question definitions ────────────────────────────────────────────────────

type Q = { id: string; label: string; options: { val: string; label: string; score: number }[] };

const QUESTIONS: Q[] = [
  {
    id: "type",
    label: "Jaki to typ zadluzenia?",
    options: [
      { val: "chwilowka", label: "Chwilowka / pozyczka pozabankowa", score: 1 },
      { val: "bank", label: "Kredyt bankowy / karta kredytowa", score: 2 },
      { val: "hipoteka", label: "Kredyt hipoteczny", score: 4 },
      { val: "media", label: "Rachunki za media / telefon / czynsz", score: 1 },
      { val: "wyrok", label: "Dlug z prawomocnym wyrokiem sadu", score: 4 },
      { val: "kilka", label: "Mam kilka roznych dlugow", score: 3 },
    ],
  },
  {
    id: "amount",
    label: "Jaka jest laczna kwota zadluzenia?",
    options: [
      { val: "do5", label: "Do 5 000 zl", score: 1 },
      { val: "5-20", label: "5 000 - 20 000 zl", score: 2 },
      { val: "20-50", label: "20 000 - 50 000 zl", score: 3 },
      { val: "50-100", label: "50 000 - 100 000 zl", score: 4 },
      { val: "100plus", label: "Powyzej 100 000 zl", score: 5 },
    ],
  },
  {
    id: "stage",
    label: "Na jakim etapie jest sprawa?",
    options: [
      { val: "telefony", label: "Telefony od windykatora — bez sadu", score: 1 },
      { val: "monity", label: "Monity, wezwania pisemne", score: 1 },
      { val: "epu", label: "Dostalem nakaz zaplaty z e-Sadu (EPU)", score: 3 },
      { val: "wyrok", label: "Jest prawomocny wyrok przeciwko mnie", score: 4 },
      { val: "komornik", label: "Komornik prowadzi egzekucje", score: 5 },
    ],
  },
  {
    id: "age",
    label: "Ile lat ma najstarszy z dlugow?",
    options: [
      { val: "poniz1", label: "Mniej niz rok", score: 1 },
      { val: "1-3", label: "1-3 lata", score: 2 },
      { val: "3-5", label: "3-5 lat", score: 3 },
      { val: "5plus", label: "Powyzej 5 lat", score: 3 },
      { val: "nie-wiem", label: "Nie wiem dokladnie", score: 2 },
    ],
  },
  {
    id: "contact",
    label: "Czy w ostatnich 3 latach mialaś/es kontakt z wierzycielem?",
    options: [
      { val: "nic", label: "Nie - nic nie placilem, nic nie podpisywalem", score: 1 },
      { val: "rozmowa", label: "Rozmawialem przez telefon", score: 2 },
      { val: "wplata", label: "Zaplacilem czesc lub podpisal ugode", score: 4 },
      { val: "nie-pamiet", label: "Nie pamietam", score: 2 },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CaseAssessment() {
  const [step, setStep] = useState(0); // 0..QUESTIONS.length = result
  const [answers, setAnswers] = useState<Record<string, { val: string; score: number; label: string }>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", city: "", consent: false });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function answer(q: Q, opt: typeof q.options[0]) {
    setAnswers((a) => ({ ...a, [q.id]: { val: opt.val, score: opt.score, label: opt.label } }));
    setTimeout(() => setStep((s) => s + 1), 250);
  }

  const totalScore = Object.values(answers).reduce((s, a) => s + a.score, 0);
  const maxScore = QUESTIONS.reduce((s, q) => s + Math.max(...q.options.map((o) => o.score)), 0);
  const riskLevel: "low" | "medium" | "high" =
    totalScore <= 7 ? "low" : totalScore <= 13 ? "medium" : "high";

  const isResult = step >= QUESTIONS.length;

  async function submitLead() {
    setSubmitState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.label])),
          score: totalScore,
          riskLevel,
        }),
      });
      if (res.ok) setSubmitState("sent");
      else setSubmitState("error");
    } catch {
      setSubmitState("error");
    }
  }

  // ── PROGRESS BAR ──────────────────────────────────────────────────────────
  const progress = isResult ? 100 : Math.round((step / QUESTIONS.length) * 100);

  // ── RESULT VIEW ───────────────────────────────────────────────────────────
  if (isResult) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Twoja indywidualna ekspertyza
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Wyniki analizy Twojej sprawy
          </h1>
        </div>

        {/* RESULT CARD */}
        <div className={`rounded-3xl p-6 sm:p-8 mb-6 border-2 ${
          riskLevel === "low" ? "bg-teal-50 border-teal-300" :
          riskLevel === "medium" ? "bg-amber-50 border-amber-300" :
          "bg-orange-50 border-orange-300"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`text-4xl ${
              riskLevel === "low" ? "" : riskLevel === "medium" ? "" : ""
            }`}>
              {riskLevel === "low" ? "✅" : riskLevel === "medium" ? "⚠️" : "🚨"}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">Poziom zlozonosci</div>
              <div className={`text-2xl font-extrabold ${
                riskLevel === "low" ? "text-teal-800" :
                riskLevel === "medium" ? "text-amber-800" :
                "text-orange-800"
              }`}>
                {riskLevel === "low" ? "Niski" : riskLevel === "medium" ? "Sredni" : "Wysoki"}
              </div>
            </div>
          </div>

          <p className={`text-base leading-relaxed mb-5 ${
            riskLevel === "low" ? "text-teal-900" :
            riskLevel === "medium" ? "text-amber-900" :
            "text-orange-900"
          }`}>
            {riskLevel === "low" &&
              "Twoja sprawa jest relatywnie prosta. Mozesz spokojnie skorzystac z naszych bezplatnych narzedzi i poradzic sobie samodzielnie. Wiekszosc takich spraw udaje sie zakonczyc bez prawnika."}
            {riskLevel === "medium" &&
              "Twoja sprawa wymaga uwagi. Nasze narzedzia pokryja wiekszosc kwestii, ale w niektorych krokach (np. argumentacja przed sadem) warto skonsultowac sie z prawnikiem."}
            {riskLevel === "high" &&
              "Twoja sprawa jest zlozona. Stawka jest wysoka, a ryzyko bledu duze. Zdecydowanie zalecamy konsultacje z wyspecjalizowanym prawnikiem — najlepiej z naszej zweryfikowanej listy."}
          </p>
        </div>

        {/* DIY recommendations */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6 mb-6">
          <h2 className="text-xl font-extrabold text-stone-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            Co mozesz zrobic samodzielnie (za darmo):
          </h2>
          <div className="space-y-3">
            {answers.stage?.val === "telefony" && (
              <Recommendation
                href="/generator-pism"
                title="Wygeneruj pismo RODO"
                desc="Pierwszy krok: zatrzymaj telefony od windykatora. Skutek w 24-48h."
              />
            )}
            {answers.stage?.val === "epu" && (
              <Recommendation
                href="/epu"
                title="EPU Wizard - masz 14 dni"
                desc="Krok po kroku jak zlozyc bezplatny sprzeciw. Pilne!"
                urgent
              />
            )}
            {answers.age?.val === "3-5" || answers.age?.val === "5plus" ? (
              <Recommendation
                href="/#kalkulator"
                title="Sprawdz przedawnienie"
                desc="Twoj dlug moze byc juz przedawniony. Sprawdz w 30 sekund."
              />
            ) : null}
            <Recommendation
              href="/skrypt-rozmowy"
              title="Skrypt rozmowy z windykatorem"
              desc="Gotowe zdania na kazda sytuacje. Uzywaj podczas rozmowy."
            />
          </div>
        </div>

        {/* LEAD FORM - lawyer match */}
        {(riskLevel === "medium" || riskLevel === "high") && submitState !== "sent" && (
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide opacity-80">
                Opcja dodatkowa
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
              Skonsultuj sprawe z prawnikiem - bez wstepnych oplat
            </h2>
            <p className="text-teal-50 text-sm mb-5 leading-relaxed">
              Wspolpracujemy z wyspecjalizowanymi w sprawach windykacyjnych radcami prawnymi i adwokatami.
              <strong className="text-white"> Pierwsza konsultacja jest bezplatna.</strong> Prawnik wycenia sprawe transparentnie,
              przed podjeciem jakichkolwiek dzialan.
            </p>

            <div className="bg-white/10 rounded-xl p-4 mb-5 space-y-2 text-sm">
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Tylko zweryfikowani prawnicy</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Bez ukrytych oplat i abonamentow</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Bezplatna pierwsza konsultacja</p>
              <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> Geo-match: prawnik z Twojego wojewodztwa</p>
            </div>

            {submitState === "error" && (
              <div className="bg-red-500/20 border border-red-300 rounded-xl p-3 mb-4 text-sm">
                Wystapil problem z wyslaniem. Sprobuj jeszcze raz lub napisz na pomoc@windykatorstop.pl
              </div>
            )}

            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Imie i nazwisko"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full bg-white/95 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full bg-white/95 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="tel"
                placeholder="Telefon (opcjonalnie)"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full bg-white/95 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder="Miejscowosc / wojewodztwo"
                value={contact.city}
                onChange={(e) => setContact({ ...contact, city: e.target.value })}
                className="w-full bg-white/95 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded accent-white"
              />
              <span className="text-xs text-teal-50 leading-relaxed">
                Wyrazam zgode na przekazanie moich danych zweryfikowanemu prawnikowi
                wspolpracujacemu z WindykatorStop.pl w celu bezplatnej konsultacji.
                W kazdej chwili moge cofnac zgode pisemnie.
              </span>
            </label>

            <button
              onClick={submitLead}
              disabled={!contact.name || !contact.email || !contact.consent || submitState === "sending"}
              className="w-full bg-white text-teal-700 font-bold py-4 rounded-2xl hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {submitState === "sending" ? "Wysylam..." : "Polacz mnie z prawnikiem - bezplatnie"}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-teal-100">
              <Lock className="w-3 h-3" />
              Twoje dane sa szyfrowane i przekazywane tylko jednemu prawnikowi
            </div>
          </div>
        )}

        {submitState === "sent" && (
          <div className="bg-teal-50 border-2 border-teal-300 rounded-3xl p-8 text-center mb-6">
            <div className="text-5xl mb-3">✉️</div>
            <h3 className="text-2xl font-extrabold text-teal-900 mb-2">Zgloszenie wyslane</h3>
            <p className="text-teal-700">
              Zweryfikowany prawnik skontaktuje sie z Toba w ciagu <strong>24 godzin roboczych</strong>.<br/>
              Pierwsza konsultacja jest bezplatna i niezobowiazujaca.
            </p>
          </div>
        )}

        {/* Free help */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6 mb-6">
          <h3 className="font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-600" />
            Calkowicie darmowa pomoc prawna:
          </h3>
          <div className="space-y-2 text-sm">
            <a href="https://np.ms.gov.pl" target="_blank" rel="noopener" className="block hover:bg-stone-50 rounded-xl p-3 -m-3 transition-colors">
              <strong className="text-stone-900">Nieodplatna Pomoc Prawna (NPP)</strong>
              <div className="text-stone-500 text-xs">W kazdym powiecie. Telefoniczna rejestracja.</div>
            </a>
            <a href="https://legitimis.pl" target="_blank" rel="noopener" className="block hover:bg-stone-50 rounded-xl p-3 -m-3 transition-colors">
              <strong className="text-stone-900">Fundacja Legitimis</strong>
              <div className="text-stone-500 text-xs">Specjalizuje sie w sprawach EPU. Bezplatnie.</div>
            </a>
          </div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={() => { setStep(0); setAnswers({}); setContact({ name: "", email: "", phone: "", city: "", consent: false }); setSubmitState("idle"); }}
            className="text-sm text-stone-500 hover:text-teal-600 underline transition-colors"
          >
            Zacznij nowa ekspertyze
          </button>
        </div>
      </div>
    );
  }

  // ── QUESTION VIEW ─────────────────────────────────────────────────────────
  const q = QUESTIONS[step];

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Bezplatna ekspertyza w 2 minuty
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
            Ocenmy razem Twoja sprawe
          </h1>
          <p className="text-stone-500 text-sm">
            5 pytan - dostaniesz indywidualna rekomendacje. Bez rejestracji.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-stone-400">Pytanie {step + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="h-1.5 bg-stone-100 rounded-full">
          <div
            className="h-1.5 bg-teal-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-stone-900 mb-5">{q.label}</h2>
        <div className="space-y-2">
          {q.options.map((opt) => (
            <button
              key={opt.val}
              onClick={() => answer(q, opt)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all hover:border-teal-300 hover:bg-teal-50 ${
                answers[q.id]?.val === opt.val
                  ? "border-teal-500 bg-teal-50"
                  : "border-stone-200 bg-white"
              }`}
            >
              <span className="text-sm sm:text-base text-stone-800 font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-4 mx-auto block text-sm text-stone-500 hover:text-teal-600 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Wroc do poprzedniego pytania
        </button>
      )}

      <div className="mt-8 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        Wszystkie odpowiedzi sa anonimowe. Nic nie wysylamy bez Twojej zgody.
      </div>
    </div>
  );
}

// ─── Helper ────────────────────────────────────────────────────────────────

function Recommendation({ href, title, desc, urgent }: { href: string; title: string; desc: string; urgent?: boolean }) {
  return (
    <Link href={href} className="block group">
      <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        urgent ? "bg-red-50 border-red-200 hover:border-red-400" : "bg-stone-50 border-stone-100 hover:border-teal-300"
      }`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-stone-900 text-sm">{title}</p>
            {urgent && (
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-bold">Pilne</span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-teal-500 transition-colors" />
      </div>
    </Link>
  );
}
