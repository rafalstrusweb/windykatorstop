"use client";

import { useState } from "react";
import { Phone, ChevronRight, ChevronLeft, Shield, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Card = {
  id: string;
  phase: string;
  situation: string;
  say: string[];
  doNOT?: string[];
  why?: string;
  danger?: boolean;
};

const CARDS: Card[] = [
  {
    id: "opening",
    phase: "Windykator sie przedstawia",
    situation: "Odebrales telefon. Ktos mowi ze dzwoni w sprawie dlugu.",
    say: [
      '"Slucham."',
      '"Prosze podac nazwe firmy ktora Pan/Pani reprezentuje oraz swoje imie i nazwisko."',
      '"Prosze o kontakt wylacznie pisemny."',
    ],
    doNOT: [
      'Nie mow "tak, wiem w jakiej sprawie"',
      "Nie potwierdzaj ze znasz dlug",
      "Nie podawaj numeru PESEL ani danych konta",
    ],
    why: "Na tym etapie windykator zbiera informacje. Kazde Twoje slowo potwierdzajace dlug moze byc uzytre jako uznanie roszczenia.",
  },
  {
    id: "pressure",
    phase: "Windykator mowi ze musisz zaplacic teraz",
    situation: 'Grozi: "Jesli nie zaplaci Pan dzisiaj, sprawa trafi do sadu / komornika."',
    say: [
      '"Nie bede podejmowac zadnych decyzji podczas rozmowy telefonicznej."',
      '"Prosze o przeslanie wszystkich roszczen w formie pisemnej na moj adres."',
      '"Do widzenia."',
    ],
    doNOT: [
      "Nie obiecuj zadnej wplaty — nawet symbolicznej",
      'Nie mow "zaplace jak tylko bede mogl"',
      'Nie pros o "przedluzenie terminu" — to uznanie dlugu',
    ],
    why: "Prosba o przedluzenie terminu lub obiecanie wplaty to UZNANIE DLUGU. Restartuje bieg przedawnienia. Nawet 10 zl wplaty robi to samo.",
    danger: true,
  },
  {
    id: "field-threat",
    phase: "Windykator grozi wizyta terenowa",
    situation: 'Mowi: "Przyjedzie windykator terenowy jutro o 17:00 / z Policja / zabezpieczymy mienie."',
    say: [
      '"Windykator prywatny nie ma zadnych uprawnien. Nie wpuszcze nikogo bez nakazu sadowego."',
      '"Wejscie na teren mojej posesji bez mojej zgody to naruszenie miru domowego — art. 193 KK."',
      '"Jesli ktos sie pojawi, wezwe Policje."',
    ],
    doNOT: [
      "Nie otwieraj drzwi zadnej osobie z firmy windykacyjnej",
      "Nie daj sie przestraszyc — to standardowy blef",
      'Nie plac "zeby nie przyjezdzali"',
    ],
    why: "Firma windykacyjna zatrudniajaca 2-20 osob fizycznie nie moze miec pracownikow terenowych w calej Polsce. To masowy blef wysylany automatycznie do tysiecy osob jednoczesnie.",
  },
  {
    id: "family",
    phase: "Windykator grozi kontaktem z rodzina lub pracodawca",
    situation: 'Mowi: "Skontaktujemy sie z Pana rodzina / pracodawca jesli nie zaplaci Pan dzisiaj."',
    say: [
      '"Ujawnienie mojego zadluzenia osobom trzecim to naruszenie RODO oraz moich dobr osobistych."',
      '"Zglrosze to do PUODO i zloze zawiadomienie o popelnieniu przestepstwa."',
      '"Prosze o kontakt wylacznie pisemny. Do widzenia."',
    ],
    doNOT: [
      "Nie tlumacz swojej sytuacji finansowej",
      "Nie pros zeby nie dzwonili do rodziny — to okazuje ze sie boisz",
    ],
    why: "Informowanie o dlugu osob trzecich (rodzina, pracodawca, sasiedzi) to razace naruszenie RODO i dobr osobistych z art. 23 KC. Moze byc przestepstwem.",
    danger: true,
  },
  {
    id: "harassment",
    phase: "Dzwonia kilkanascie razy dziennie",
    situation: "Kilkanascie polaczen dziennie, SMS-y, wczesny rano lub poznym wieczorem.",
    say: [
      '"Informuje, ze dokumentuje kazde polaczenie z data i godzina."',
      '"Wielokrotne nekanie to przestepstwo z art. 190a Kodeksu Karnego."',
      '"Zloze zawiadomienie na Policje jesli kontakty nie ustana."',
    ],
    doNOT: [
      "Nie reaguj emocjonalnie — to wlasnie chca osiagnac",
      "Nie podnosj glosu",
    ],
    why: "Uporztywe nekanie (art. 190a KK) jest zagrozore kara do 3 lat pozbawienia wolnosci. Nagrywanie rozmow przez strone jest w Polsce legalne.",
  },
  {
    id: "end",
    phase: "Jak zakonczyc kazda rozmowe",
    situation: "Niezaleznie od tego co powie windykator — masz prawo zakonczyc rozmowe w kazdej chwili.",
    say: [
      '"Nie bede dalej rozmawiac przez telefon."',
      '"Prosze o kontakt wylacznie pisemny."',
      '"Do widzenia." [rozlacz sie]',
    ],
    doNOT: [
      "Nie czuj sie zobowiazany do rozmowy",
      "Nie tlumacz dlaczego sie rozlaczasz",
      "Nie przepraszaj",
    ],
    why: "Masz absolutne prawo zakonczyc rozmowe w dowolnym momencie. Windykator nie moze Cie do niczego zmusic przez telefon.",
  },
];

export default function PhoneScript() {
  const [mode, setMode] = useState<"menu" | "card">("menu");
  const [cardIndex, setCardIndex] = useState(0);

  const current = CARDS[cardIndex];

  function openCard(id: string) {
    const idx = CARDS.findIndex((c) => c.id === id);
    setCardIndex(idx);
    setMode("card");
  }

  function prev() { if (cardIndex > 0) setCardIndex((i) => i - 1); }
  function next() { if (cardIndex < CARDS.length - 1) setCardIndex((i) => i + 1); }

  if (mode === "menu") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Phone className="w-3.5 h-3.5" />
            Sciagtka na telefon
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Skrypt rozmowy z windykatorem
          </h1>
          <p className="text-stone-500 text-lg">
            Windykator wlasnie dzwoni? Wybierz sytuacje i czytaj na glos.
          </p>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6 flex gap-3">
          <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="font-bold text-orange-900 text-sm">Dzwoni teraz?</p>
            <p className="text-orange-800 text-sm mb-2">Zacznij od pierwszej karty i przechodzaj dalej podczas rozmowy.</p>
            <button
              onClick={() => openCard("opening")}
              className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Zacznij od poczatku
            </button>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <p className="text-sm font-bold text-red-800 mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Zasada nr 0 — najwazniejsza
          </p>
          <p className="text-sm text-red-700">
            <strong>Nigdy nie obiecuj zadnej wplaty i nie pros o przedluzenie terminu.</strong>{" "}
            Nawet 10 zl lub slowa "zaplace jak bede mogl" moga ozywic przedawniony dlug
            i zrestartowac bieg przedawnienia.
          </p>
        </div>

        <div className="space-y-2">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => openCard(card.id)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all group hover:shadow-md ${
                card.danger
                  ? "border-red-100 bg-red-50 hover:border-red-300"
                  : "border-stone-100 bg-white hover:border-teal-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                      Sytuacja {i + 1}
                    </span>
                    {card.danger && (
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-semibold">
                        Pulapka
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-stone-900 text-sm leading-snug">{card.phase}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-teal-500 flex-shrink-0 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/generator-pism"
            className="flex-1 text-center bg-teal-600 text-white font-semibold py-3 px-5 rounded-xl hover:bg-teal-700 transition-colors text-sm"
          >
            Wygeneruj pismo cofajace zgody
          </Link>
          <Link
            href="/#kalkulator"
            className="flex-1 text-center bg-stone-100 text-stone-700 font-semibold py-3 px-5 rounded-xl hover:bg-stone-200 transition-colors text-sm"
          >
            Sprawdz czy dlug jest przedawniony
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col max-w-xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMode("menu")}
          className="text-sm text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Wszystkie sytuacje
        </button>
        <span className="text-xs text-stone-400 font-medium">
          {cardIndex + 1} / {CARDS.length}
        </span>
      </div>

      <div className="h-1.5 bg-stone-100 rounded-full mb-6">
        <div
          className="h-1.5 bg-teal-500 rounded-full transition-all"
          style={{ width: `${((cardIndex + 1) / CARDS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
            Sytuacja {cardIndex + 1}
          </span>
          {current.danger && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
              Pulapka
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-2 leading-tight">
          {current.phase}
        </h2>

        <div className="bg-stone-100 rounded-xl px-4 py-3 mb-5 text-sm text-stone-600 italic">
          {current.situation}
        </div>

        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
              Powiedz to — czytaj na glos:
            </span>
          </div>
          <div className="space-y-3">
            {current.say.map((line, i) => (
              <p key={i} className="text-teal-900 font-semibold text-base sm:text-lg leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>

        {current.doNOT && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-xs font-bold text-red-700 uppercase tracking-wide">
                Nie mow / nie rob:
              </span>
            </div>
            <ul className="space-y-1">
              {current.doNOT.map((line, i) => (
                <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">x</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {current.why && (
          <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-4 flex gap-3">
            <Shield className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-stone-500 leading-relaxed">{current.why}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-stone-100">
        <button
          onClick={prev}
          disabled={cardIndex === 0}
          className="flex-1 py-3.5 rounded-2xl border-2 border-stone-200 text-stone-600 font-semibold text-sm hover:border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Poprzednia
        </button>
        {cardIndex < CARDS.length - 1 ? (
          <button
            onClick={next}
            className="flex-1 py-3.5 rounded-2xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Nastepna <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setMode("menu")}
            className="flex-1 py-3.5 rounded-2xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-all active:scale-95"
          >
            Koniec — wróc do menu
          </button>
        )}
      </div>
    </div>
  );
}
