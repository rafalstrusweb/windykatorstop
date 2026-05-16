"use client";

import { useState } from "react";
import { FileText, Printer, ArrowLeft, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Events } from "@/lib/track";

// ─── Letter templates ────────────────────────────────────────────────────────

type Fields = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  companyName: string;
  companyStreet: string;
  companyCity: string;
  caseRef: string;
  orderDate: string;
  addStatute: boolean;
};

function todayPL() {
  return new Date().toLocaleDateString("pl-PL", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function rodoLetter(f: Fields) {
  return `
<p style="text-align:right">${f.city}, ${todayPL()}</p>

<p>
  <strong>${f.firstName} ${f.lastName}</strong><br/>
  ${f.street}<br/>
  ${f.zipCode} ${f.city}
</p>

<p>
  <strong>${f.companyName}</strong><br/>
  ${f.companyStreet}<br/>
  ${f.companyCity}
</p>

<h2>WYCOFANIE ZGODY NA KONTAKT TELEFONICZNY<br/>
ORAZ ŻĄDANIE ZAPRZESTANIA PRZETWARZANIA DANYCH OSOBOWYCH</h2>

<p>Na podstawie art.&nbsp;7 ust.&nbsp;3 oraz art.&nbsp;21 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016&nbsp;r. (RODO), niniejszym:</p>

<ol>
  <li><strong>Cofam</strong> wszelkie udzielone przeze mnie zgody na kontaktowanie się ze mną drogą telefoniczną, za pośrednictwem wiadomości SMS oraz poczty elektronicznej w jakichkolwiek celach, w tym windykacyjnych i marketingowych.</li>
  <li><strong>Wnoszę sprzeciw</strong> wobec przetwarzania moich danych osobowych w zakresie wykraczającym poza niezbędny, minimalny kontakt listowny uzasadniony prawnie usprawiedliwionym interesem Państwa firmy.</li>
  <li><strong>Żądam</strong> natychmiastowego zaprzestania wszelkiego kontaktu telefonicznego, SMS oraz e-mail i ograniczenia komunikacji wyłącznie do formy pisemnej (listownej) na adres wskazany powyżej.</li>
</ol>

<p>Jednocześnie informuję, że dokumentuję wszystkie próby kontaktu. W przypadku dalszego nękania telefonicznego zastrzegam sobie prawo do:</p>
<ul>
  <li>złożenia zawiadomienia o podejrzeniu popełnienia przestępstwa z art.&nbsp;190a&nbsp;§&nbsp;1 Kodeksu Karnego (uporczywe nękanie),</li>
  <li>złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO),</li>
  <li>złożenia zawiadomienia do Urzędu Ochrony Konkurencji i Konsumentów (UOKiK).</li>
</ul>

<p>Proszę o pisemne potwierdzenie przyjęcia niniejszego pisma.</p>

<p style="margin-top:48px">Z poważaniem,</p>
<p><strong>${f.firstName} ${f.lastName}</strong></p>
<p style="margin-top:48px">Własnoręczny podpis: ____________________________</p>
`;
}

function epuLetter(f: Fields) {
  return `
<p style="text-align:right">${f.city}, ${todayPL()}</p>

<p>
  <strong>Sąd Rejonowy Lublin-Zachód w Lublinie</strong><br/>
  VI Wydział Cywilny<br/>
  ul. Boczna Lubomelskiej 13<br/>
  20-070 Lublin
</p>

<p>
  <strong>Powód:</strong> ${f.companyName}<br/>
  <strong>Pozwany:</strong> ${f.firstName} ${f.lastName}, ${f.street}, ${f.zipCode} ${f.city}<br/>
  <strong>Sygnatura akt:</strong> ${f.caseRef || "________________"}
</p>

<h2>SPRZECIW OD NAKAZU ZAPŁATY<br/>
wydanego w Elektronicznym Postępowaniu Upominawczym</h2>

<p>Działając jako pozwany, niniejszym zaskarżam w całości nakaz zapłaty wydany w dniu ${f.orderDate || "________________"} w sprawie o sygnaturze akt ${f.caseRef || "________________"}.</p>

<h3>Wnoszę o:</h3>
<ol>
  <li>Uchylenie nakazu zapłaty w całości.</li>
  <li>Oddalenie powództwa w całości.</li>
  <li>Zasądzenie od powoda na rzecz pozwanego kosztów procesu według norm przepisanych.</li>
</ol>

<h3>Uzasadnienie:</h3>
<p>Zaprzeczam, aby powodowi przysługiwało wobec mnie roszczenie wskazane w pozwie. Kwestionuję powództwo zarówno co do zasady, jak i co do wysokości.</p>

${f.addStatute ? `<p><strong>Podnoszę zarzut przedawnienia roszczenia.</strong> Roszczenie objęte nakazem zapłaty jest w całości przedawnione, wobec czego powód nie może skutecznie dochodzić jego zaspokojenia na drodze sądowej.</p>` : ""}

<p>Wzywam powoda do przedłożenia kompletnej dokumentacji źródłowej potwierdzającej istnienie, wysokość oraz wymagalność dochodzonego roszczenia, w tym oryginału lub poświadczonej kopii umowy, dowodu wypłaty środków oraz pełnego wykazu dokonanych przez pozwanego spłat.</p>

<p style="margin-top:48px">Z poważaniem,</p>
<p><strong>${f.firstName} ${f.lastName}</strong><br/>${f.street}<br/>${f.zipCode} ${f.city}</p>
<p style="margin-top:48px">Własnoręczny podpis: ____________________________</p>

<hr style="margin-top:48px"/>
<p style="font-size:11px;color:#666">
  <strong>Ważne:</strong> Pismo należy wysłać <strong>listem poleconym za potwierdzeniem odbioru</strong> na adres sądu wskazany powyżej. Zachowaj potwierdzenie nadania — jest dowodem dotrzymania terminu 14 dni. Termin liczy się od daty doręczenia nakazu, nie od daty nadania pisma.
</p>
`;
}

function harassmentLetter(f: Fields) {
  return `
<p style="text-align:right">${f.city}, ${todayPL()}</p>

<p>
  <strong>${f.firstName} ${f.lastName}</strong><br/>
  ${f.street}<br/>
  ${f.zipCode} ${f.city}
</p>

<p>
  <strong>${f.companyName}</strong><br/>
  ${f.companyStreet}<br/>
  ${f.companyCity}
</p>

<h2>WEZWANIE DO NATYCHMIASTOWEGO ZAPRZESTANIA NĘKANIA</h2>

<p>Niniejszym, działając w obronie swoich dóbr osobistych i praw wynikających z przepisów prawa powszechnie obowiązującego, wzywam Państwa firmę do <strong>natychmiastowego zaprzestania</strong> wszelkich działań polegających na wielokrotnym, uporczywym kontaktowaniu się ze mną oraz z osobami trzecimi z mojego otoczenia, w szczególności:</p>

<ul>
  <li>wykonywania do mnie połączeń telefonicznych w nadmiernej liczbie lub o niedogodnych porach,</li>
  <li>wysyłania wiadomości SMS i e-mail o treści zawierającej groźby lub nieprawdziwe informacje,</li>
  <li>podejmowania prób kontaktu z moją rodziną, sąsiadami lub pracodawcą w sprawie mojego zadłużenia.</li>
</ul>

<p>Informuję, że powyższe działania:</p>
<ol>
  <li>Wyczerpują znamiona <strong>przestępstwa z art.&nbsp;190a&nbsp;§&nbsp;1 Kodeksu Karnego</strong> — uporczywego nękania (stalkingu), zagrożonego karą pozbawienia wolności do lat 3.</li>
  <li>Stanowią naruszenie <strong>dóbr osobistych</strong> chronionych art.&nbsp;23 i 24 Kodeksu Cywilnego.</li>
  <li>Naruszają przepisy <strong>RODO</strong> w zakresie przetwarzania danych osobowych.</li>
  <li>Mogą stanowić nieuczciwą praktykę rynkową w rozumieniu ustawy o przeciwdziałaniu nieuczciwym praktykom rynkowym.</li>
</ol>

<p>W przypadku dalszego nękania skieruję zawiadomienie o podejrzeniu popełnienia przestępstwa do właściwej jednostki Policji lub Prokuratury, a zgromadzone dowody (rejestry połączeń, zrzuty ekranu wiadomości) przekażę odpowiednim organom.</p>

<p>Wzywam do pisemnego potwierdzenia przyjęcia niniejszego wezwania w terminie 7 dni.</p>

<p style="margin-top:48px">Z poważaniem,</p>
<p><strong>${f.firstName} ${f.lastName}</strong></p>
<p style="margin-top:48px">Własnoręczny podpis: ____________________________</p>
`;
}

// ─── Letter types config ─────────────────────────────────────────────────────

const LETTERS = [
  {
    id: "rodo",
    icon: "🛑",
    label: "Zatrzymaj telefony (RODO)",
    subtitle: "Cofnięcie zgód na kontakt telefoniczny",
    desc: "Po wysłaniu tego pisma firma windykacyjna musi zaprzestać dzwonienia. Zostaje tylko kontakt listowny. Skuteczność w 24–48h.",
    urgent: false,
    needsCaseRef: false,
    generate: rodoLetter,
  },
  {
    id: "epu",
    icon: "⚖️",
    label: "Sprzeciw od nakazu EPU",
    subtitle: "List z sądu w Lublinie — masz 14 dni",
    desc: "Złożony sprzeciw niszczy automatycznie nakaz zapłaty. Fundusz musi iść do normalnego sądu i udowodnić dług dokumentami — często nie może.",
    urgent: true,
    needsCaseRef: true,
    generate: epuLetter,
  },
  {
    id: "harassment",
    icon: "✋",
    label: "Wezwanie do zaprzestania nękania",
    subtitle: "Gdy dzwonią kilkanaście razy dziennie",
    desc: "Formalne wezwanie z powołaniem się na art. 190a KK (stalking). Często skutkuje natychmiastowym wstrzymaniem kontaktów.",
    urgent: false,
    needsCaseRef: false,
    generate: harassmentLetter,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const EMPTY: Fields = {
  firstName: "", lastName: "", street: "", city: "", zipCode: "",
  companyName: "", companyStreet: "", companyCity: "",
  caseRef: "", orderDate: "", addStatute: false,
};

export default function LetterGenerator() {
  const [step, setStep] = useState<"choose" | "form" | "preview">("choose");
  const [letterId, setLetterId] = useState<string>("");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [showErrors, setShowErrors] = useState(false);

  const letter = LETTERS.find((l) => l.id === letterId);

  function set(key: keyof Fields, val: string | boolean) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  // Required fields by letter type
  const required: (keyof Fields)[] = [
    "firstName", "lastName", "street", "zipCode", "city", "companyName",
  ];
  const missing = required.filter((k) => !String(fields[k]).trim());
  const formValid = missing.length === 0;

  function tryGenerate() {
    if (formValid) {
      if (letterId) Events.letterGenerated(letterId);
      setStep("preview");
    } else {
      setShowErrors(true);
      // Scroll to first missing field
      setTimeout(() => {
        const firstError = document.querySelector("[data-error='true']");
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }

  const preview = letter ? letter.generate(fields) : "";

  function handlePrint() {
    window.print();
  }

  // ── STEP 1: Choose ──────────────────────────────────────────────────────────
  if (step === "choose") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Wróć do strony głównej
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <FileText className="w-3.5 h-3.5" />
            Bezpłatny Generator Pism
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Jakie pismo chcesz wygenerować?
          </h1>
          <p className="text-stone-500 text-lg">
            Gotowe w 2 minuty. Bez rejestracji. Bez opłat.
          </p>
        </div>

        <div className="space-y-3">
          {LETTERS.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLetterId(l.id); setStep("form"); }}
              className="w-full text-left bg-white border-2 border-stone-100 hover:border-teal-300 rounded-2xl p-5 transition-all group hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{l.icon}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-stone-900 text-base group-hover:text-teal-700 transition-colors">
                      {l.label}
                    </span>
                    {l.urgent && (
                      <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                        14 dni na działanie
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mb-1">{l.subtitle}</p>
                  <p className="text-sm text-stone-600">{l.desc}</p>
                </div>
                <span className="text-stone-300 group-hover:text-teal-400 transition-colors self-center">›</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>Zanim wyślesz jakiekolwiek pismo</strong> — upewnij się, że nie spowoduje to
            przerwania biegu przedawnienia. Jeśli Twój dług może być przedawniony, skonsultuj się
            z <Link href="/#kalkulator" className="underline">kalkulatorem przedawnienia</Link> lub
            bezpłatną kliniką prawną.
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2: Form ────────────────────────────────────────────────────────────
  if (step === "form" && letter) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={() => setStep("choose")}
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Zmień rodzaj pisma
        </button>

        <div className="mb-8">
          <div className="text-2xl mb-2">{letter.icon}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-1">{letter.label}</h1>
          <p className="text-stone-500">{letter.desc}</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8 space-y-6">
          {/* Twoje dane */}
          <div>
            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">
              Twoje dane
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Imię" value={fields.firstName} onChange={(v) => set("firstName", v)} placeholder="Jan" required showError={showErrors} />
              <Field label="Nazwisko" value={fields.lastName} onChange={(v) => set("lastName", v)} placeholder="Kowalski" required showError={showErrors} />
              <div className="sm:col-span-2">
                <Field label="Ulica i numer" value={fields.street} onChange={(v) => set("street", v)} placeholder="ul. Kwiatowa 5/10" required showError={showErrors} />
              </div>
              <Field label="Kod pocztowy" value={fields.zipCode} onChange={(v) => set("zipCode", v)} placeholder="00-001" required showError={showErrors} />
              <Field label="Miejscowość" value={fields.city} onChange={(v) => set("city", v)} placeholder="Warszawa" required showError={showErrors} />
            </div>
          </div>

          {/* Firma windykacyjna */}
          <div className="border-t border-stone-100 pt-6">
            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">
              Dane firmy windykacyjnej / wierzyciela
            </h2>
            <div className="space-y-3">
              <Field label="Nazwa firmy" value={fields.companyName} onChange={(v) => set("companyName", v)} placeholder="np. KRUK SA, Link Financial, DeltaWise..." required showError={showErrors} />
              <Field label="Adres firmy (ulica)" value={fields.companyStreet} onChange={(v) => set("companyStreet", v)} placeholder="ul. Przykładowa 1 (opcjonalnie)" />
              <Field label="Miejscowość firmy" value={fields.companyCity} onChange={(v) => set("companyCity", v)} placeholder="Wrocław (opcjonalnie)" />
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Adres znajdziesz w piśmie od windykatora lub na ich stronie internetowej.
            </p>
          </div>

          {/* EPU-specific fields */}
          {letter.needsCaseRef && (
            <div className="border-t border-stone-100 pt-6">
              <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">
                Dane z nakazu zapłaty
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Sygnatura akt (np. Nc-e 12345/24)"
                  value={fields.caseRef}
                  onChange={(v) => set("caseRef", v)}
                  placeholder="Nc-e 12345/24"
                />
                <Field
                  label="Data nakazu zapłaty"
                  value={fields.orderDate}
                  onChange={(v) => set("orderDate", v)}
                  placeholder="np. 10 stycznia 2024"
                />
              </div>
              <div className="mt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fields.addStatute}
                    onChange={(e) => set("addStatute", e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-teal-600"
                  />
                  <div>
                    <span className="text-sm font-medium text-stone-800">
                      Dodaj zarzut przedawnienia
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Zaznacz tylko jeśli Twój dług może być przedawniony (chwilówka starsza niż 3 lata,
                      kredyt bankowy starszy niż 3 lata bez wyroku sądu). Sprawdź w{" "}
                      <Link href="/#kalkulator" className="text-teal-600 underline">kalkulatorze</Link>.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {showErrors && !formValid && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <strong>Wypełnij wszystkie pola oznaczone gwiazdką (*).</strong>
                <p className="text-red-700 mt-0.5">Brakuje {missing.length} {missing.length === 1 ? "pola" : "pól"}. Sprawdź formularz powyżej — czerwone ramki wskazują puste pola.</p>
              </div>
            </div>
          )}

          <button
            onClick={tryGenerate}
            className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 transition-all active:scale-95"
          >
            Generuj pismo →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 3: Preview ─────────────────────────────────────────────────────────
  if (step === "preview" && letter) {
    return (
      <>
        {/* Print styles — hidden on screen */}
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            #letter-content, #letter-content * { visibility: visible !important; }
            #letter-content {
              position: fixed !important;
              top: 0; left: 0;
              width: 100% !important;
              padding: 2cm !important;
              font-family: 'Times New Roman', serif !important;
              font-size: 12pt !important;
              line-height: 1.6 !important;
              color: #000 !important;
            }
            #letter-content h2 {
              font-size: 13pt !important;
              text-align: center !important;
              margin: 24pt 0 12pt !important;
            }
            #letter-content h3 {
              font-size: 12pt !important;
              margin: 12pt 0 6pt !important;
            }
            #letter-content ol, #letter-content ul {
              margin-left: 20pt !important;
            }
            #letter-content p { margin-bottom: 8pt !important; }
            #letter-content hr { border-top: 1px solid #999 !important; margin: 20pt 0 !important; }
          }
        `}</style>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 print:hidden">
          <button
            onClick={() => setStep("form")}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wróć do formularza
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-stone-900">{letter.label}</h1>
              <p className="text-stone-500 text-sm mt-1">Sprawdź pismo, a następnie wydrukuj lub zapisz jako PDF.</p>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-orange-200 flex-shrink-0"
            >
              <Printer className="w-4 h-4" />
              Drukuj / Zapisz PDF
            </button>
          </div>

          {/* How to print box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6 text-sm text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">Jak wydrukować / zapisać PDF:</p>
            <p>• <strong>Na komputerze:</strong> kliknij "Drukuj / Zapisz PDF" → w oknie drukarki wybierz "Zapisz jako PDF" lub wybierz drukarkę.</p>
            <p>• <strong>Na telefonie:</strong> kliknij "Drukuj" → "Udostępnij jako PDF" → wyślij na email lub prześlij na pendrive i wydrukuj w punkcie ksero (Biedronka, salon prasowy, biblioteka — ok. 20–50 gr za stronę).</p>
            <p>• <strong>Wyślij:</strong> <strong className="text-stone-800">listem poleconym za potwierdzeniem odbioru</strong> — zachowaj potwierdzenie nadania!</p>
          </div>

          {letter.id === "epu" && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <strong>Termin 14 dni jest bezwzględny.</strong> Liczy się data doręczenia pisma do sądu, nie data nadania.
                Wyślij dzisiaj. Zachowaj potwierdzenie nadania listu poleconego.
              </div>
            </div>
          )}

          {/* The letter preview */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div
              id="letter-content"
              className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>

          {/* Post-send checklist */}
          <div className="mt-6 bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <p className="font-semibold text-teal-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Co zrobić po wysłaniu:
            </p>
            <div className="space-y-2 text-sm text-teal-800">
              {letter.id === "epu" ? (
                <>
                  <p>✓ Zachowaj potwierdzenie nadania listu poleconego — to dowód dotrzymania terminu</p>
                  <p>✓ Zapisz datę wysłania. Sąd powinien potwierdzić odbiór w ciągu kilku dni</p>
                  <p>✓ Skonsultuj sprawę z bezpłatną kliniką prawną (Fundacja Legitimis, NPP)</p>
                  <p>✓ Fundusz będzie musiał teraz udowodnić dług przed normalnym sądem — często rezygnuje</p>
                </>
              ) : (
                <>
                  <p>✓ Zachowaj potwierdzenie nadania — dowód wysłania pisma</p>
                  <p>✓ Dokumentuj wszystkie dalsze próby kontaktu telefonicznego (data, godzina, numer)</p>
                  <p>✓ Jeśli dzwonią dalej — masz podstawy do zawiadomienia Policji i PUODO</p>
                  <p>✓ Efekt powinien być widoczny w ciągu 24–48 godzin</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setStep("choose"); setFields(EMPTY); setLetterId(""); }}
              className="text-sm text-stone-500 hover:text-teal-600 underline transition-colors"
            >
              Wygeneruj kolejne pismo
            </button>
          </div>
        </div>

        {/* Print-only content */}
        <div className="hidden print:block">
          <div
            id="letter-content"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </>
    );
  }

  return null;
}

// ─── Field helper ────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, placeholder, required, showError,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; showError?: boolean;
}) {
  const isEmpty = !value.trim();
  const hasError = required && showError && isEmpty;

  return (
    <div data-error={hasError ? "true" : "false"}>
      <label className="block text-xs font-semibold text-stone-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 transition-all border-2 ${
          hasError
            ? "bg-red-50 border-red-300 focus:ring-red-300"
            : "bg-stone-50 border-stone-200 focus:ring-teal-400 focus:border-transparent"
        }`}
      />
      {hasError && (
        <p className="text-xs text-red-600 mt-1">To pole jest wymagane</p>
      )}
    </div>
  );
}
