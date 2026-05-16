"use client";

import { useState } from "react";
import Link from "next/link";
import { JOBS, type Job } from "@/content/jobs";
import {
  Briefcase, MapPin, Clock, Mail, Phone, Plus, X, Lock,
  CheckCircle2, Filter, ShieldCheck, Heart,
} from "lucide-react";
import { Events } from "@/lib/track";

const REGIONS = [
  { val: "all", label: "Wszystkie" },
  { val: "mazowieckie", label: "Mazowieckie" },
  { val: "malopolskie", label: "Małopolskie" },
  { val: "slaskie", label: "Śląskie" },
  { val: "dolnoslaskie", label: "Dolnośląskie" },
  { val: "wielkopolskie", label: "Wielkopolskie" },
  { val: "lodzkie", label: "Łódzkie" },
  { val: "zdalnie", label: "Zdalnie" },
];

const CATEGORIES = ["Wszystkie", "Fizyczna", "Biurowa", "Sprzedaż", "Transport", "Gastronomia"];

export default function JobBoard() {
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("Wszystkie");
  const [showForm, setShowForm] = useState(false);

  const filtered = JOBS.filter((j) => {
    if (region !== "all" && j.region !== region) return false;
    if (category !== "Wszystkie" && j.category !== category) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          Tablica Pracy
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-3 leading-tight">
          Praca dla każdego — <span className="text-teal-600">bez sprawdzania długów</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-2xl">
          Tu są ogłoszenia od pracodawców, którzy rozumieją Twoją sytuację. Nie sprawdzają BIK, nie pytają o przeszłość.
        </p>
      </div>

      {/* Trust banner */}
      <div className="bg-teal-50 border-2 border-teal-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <ShieldCheck className="w-8 h-8 text-teal-600 flex-shrink-0" />
        <div className="flex-1 text-sm">
          <p className="font-bold text-teal-900 mb-1">Ogłoszenia są bezpłatne i weryfikowane</p>
          <p className="text-teal-700">
            Nie wymagamy żadnych danych od osób szukających pracy. Kontaktujesz się bezpośrednio z pracodawcą.
            Każde ogłoszenie sprawdzamy zanim trafi na portal.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Dodaj ogłoszenie
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Region
          </label>
          <div className="flex flex-wrap gap-1.5">
            {REGIONS.map((r) => (
              <button
                key={r.val}
                onClick={() => setRegion(r.val)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  region === r.val
                    ? "bg-teal-600 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-teal-300"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Kategoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-stone-500 mb-4">
        {filtered.length === 0
          ? "Brak ogłoszeń w tym filtrze. Zmień region lub kategorię."
          : `Znaleziono ${filtered.length} ${filtered.length === 1 ? "ogłoszenie" : filtered.length < 5 ? "ogłoszenia" : "ogłoszeń"}`}
      </div>

      {/* Jobs */}
      <div className="space-y-3 mb-12">
        {filtered.map((job) => <JobCard key={job.id} job={job} />)}
      </div>

      {/* Bottom CTA — for those who can't find work */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 text-white text-center">
        <Heart className="w-8 h-8 mx-auto mb-3 text-orange-300" />
        <h2 className="text-2xl font-extrabold mb-2">Nie znalazłeś nic w swoim regionie?</h2>
        <p className="text-teal-100 mb-5 max-w-xl mx-auto text-sm">
          Tablica ogłoszeń rośnie. Dodajemy nowe oferty co tydzień.
          Wpisz się też do bezpłatnych zasiłków i programów pomocy społecznej — to nie wstyd, to Twoje prawo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.gov.pl/web/rodzina/pomoc-spoleczna"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-teal-700 font-bold px-5 py-3 rounded-xl text-sm hover:bg-teal-50"
          >
            Pomoc społeczna (gov.pl)
          </a>
          <Link
            href="/ekspertyza"
            className="bg-teal-800 border border-teal-500 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-teal-900"
          >
            Bezpłatna ekspertyza Twojej sytuacji
          </Link>
        </div>
      </div>

      {/* Submit form modal */}
      {showForm && <JobSubmitModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────

function JobCard({ job }: { job: Job }) {
  const [showContact, setShowContact] = useState(false);

  const daysAgo = Math.floor((Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white border border-stone-100 hover:border-teal-200 rounded-2xl p-5 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 text-base">{job.title}</h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-medium">
              {job.type}
            </span>
            {job.noCheckCredit && (
              <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Bez BIK/KRD
              </span>
            )}
            {job.quickStart && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">
                ⚡ Szybki start
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 mb-3">
            <span className="font-medium text-stone-700">{job.company}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {daysAgo === 0 ? "Dzisiaj" : `${daysAgo} dni temu`}
            </span>
          </div>

          <p className="text-sm text-stone-600 mb-2">{job.description}</p>
          <p className="text-xs text-teal-700 italic">{job.note}</p>
        </div>

        <div className="flex-shrink-0">
          {!showContact ? (
            <button
              onClick={() => { setShowContact(true); Events.jobContactRevealed(job.id); }}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Pokaż kontakt
            </button>
          ) : (
            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-3 flex items-center gap-2">
              {job.contactType === "email" ? (
                <>
                  <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <a href={`mailto:${job.contact}`} className="text-sm font-bold text-teal-800 hover:underline break-all">
                    {job.contact}
                  </a>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <a href={`tel:${job.contact.replace(/\s/g, "")}`} className="text-sm font-bold text-teal-800 hover:underline">
                    {job.contact}
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Submit modal ──────────────────────────────────────────────────────────

function JobSubmitModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    employerName: "",
    employerEmail: "",
    company: "",
    title: "",
    location: "",
    region: "mazowieckie",
    type: "Pełen etat",
    category: "Fizyczna",
    description: "",
    note: "",
    contact: "",
    contactType: "email" as "email" | "phone",
    noCheckCredit: true,
    quickStart: false,
    consent: false,
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const valid =
    form.employerName && form.employerEmail && form.company && form.title &&
    form.location && form.description && form.contact && form.consent;

  async function submit() {
    setState("sending");
    try {
      const res = await fetch("/api/job-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        Events.jobSubmitted(form.region);
        setState("sent");
      } else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-100 p-5 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">Dodaj ogłoszenie o pracę</h2>
            <p className="text-xs text-stone-500 mt-0.5">Bezpłatnie. Weryfikacja w 48h. Brak ogłoszenia po BIK.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {state === "sent" ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✉️</div>
            <h3 className="text-2xl font-extrabold text-stone-900 mb-2">Zgłoszenie przyjęte</h3>
            <p className="text-stone-600 mb-6">
              Sprawdzimy ogłoszenie w ciągu 48h. Jeśli wszystko jest w porządku — opublikujemy je za darmo.
              Otrzymasz email z potwierdzeniem.
            </p>
            <button
              onClick={onClose}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl"
            >
              Zamknij
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Employer info */}
            <div>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Dane pracodawcy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField label="Twoje imię i nazwisko *" value={form.employerName} onChange={(v) => setForm({ ...form, employerName: v })} />
                <FormField label="Twój email kontaktowy *" type="email" value={form.employerEmail} onChange={(v) => setForm({ ...form, employerEmail: v })} />
                <div className="sm:col-span-2">
                  <FormField label="Nazwa firmy *" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                </div>
              </div>
            </div>

            {/* Job info */}
            <div className="border-t border-stone-100 pt-4">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Ogłoszenie</h3>
              <div className="space-y-3">
                <FormField label="Stanowisko *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="np. Pakowacz magazynowy" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label="Miejscowość *" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="np. Wrocław" />
                  <FormSelect label="Region" value={form.region} onChange={(v) => setForm({ ...form, region: v })}
                    options={["mazowieckie", "malopolskie", "slaskie", "dolnoslaskie", "wielkopolskie", "lodzkie", "zdalnie", "cala-polska", "inne"]} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormSelect label="Typ umowy" value={form.type} onChange={(v) => setForm({ ...form, type: v })}
                    options={["Pełen etat", "Pół etatu", "Umowa zlecenie", "Elastyczne godziny", "Zdalnie"]} />
                  <FormSelect label="Kategoria" value={form.category} onChange={(v) => setForm({ ...form, category: v })}
                    options={["Fizyczna", "Biurowa", "Sprzedaż", "Transport", "Gastronomia", "Inne"]} />
                </div>

                <FormField label="Opis stanowiska *" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea placeholder="Czym się zajmuje pracownik? Jakie warunki?" />
                <FormField label="Dodatkowa informacja (premia, posiłki, zaliczka)" value={form.note} onChange={(v) => setForm({ ...form, note: v })} placeholder="np. Posiłki w pracy bezpłatne. Premia świąteczna." />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <FormField label="Kontakt dla aplikujących *" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} placeholder="email lub telefon" />
                  </div>
                  <FormSelect label="Typ kontaktu" value={form.contactType} onChange={(v) => setForm({ ...form, contactType: v as "email" | "phone" })}
                    options={["email", "phone"]} />
                </div>

                <div className="flex flex-col gap-2 bg-stone-50 rounded-xl p-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.noCheckCredit}
                      onChange={(e) => setForm({ ...form, noCheckCredit: e.target.checked })}
                      className="mt-0.5 accent-teal-600"
                    />
                    <span className="text-sm text-stone-700">
                      Nie sprawdzamy BIK/KRD kandydatów <span className="text-teal-700 font-semibold">(zalecane — przyciąga więcej kandydatów)</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.quickStart}
                      onChange={(e) => setForm({ ...form, quickStart: e.target.checked })}
                      className="mt-0.5 accent-teal-600"
                    />
                    <span className="text-sm text-stone-700">Szybkie zatrudnienie (start w ciągu 7 dni)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 accent-teal-600"
              />
              <span className="text-xs text-stone-700 leading-relaxed">
                Oświadczam, że jestem osobą uprawnioną do reprezentowania pracodawcy w sprawie tego ogłoszenia
                i wyrażam zgodę na publikację danych firmy oraz kontaktu na WindykatorStop.pl po weryfikacji.
              </span>
            </label>

            {state === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl p-3">
                Coś poszło nie tak. Spróbuj ponownie lub napisz na pomoc@windykatorstop.pl
              </div>
            )}

            <button
              onClick={submit}
              disabled={!valid || state === "sending"}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {state === "sending" ? "Wysyłam..." : "Wyślij do weryfikacji"}
            </button>

            <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3" />
              Dane bezpieczne. Publikacja tylko po weryfikacji.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Form helpers ─────────────────────────────────────────────────────────

function FormField({ label, value, onChange, placeholder, type = "text", textarea }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      )}
    </div>
  );
}

function FormSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
