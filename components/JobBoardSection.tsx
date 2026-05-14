import { Briefcase, MapPin, Clock, ArrowRight, Plus } from "lucide-react";

const jobs = [
  {
    company: "Firma Sprzątająca MegaClean",
    location: "Warszawa / Zdalnie",
    title: "Pracownik obsługi — bez wymagań formalnych",
    type: "Pełen etat",
    note: "Przyjmujemy osoby wychodzące z trudności finansowych",
  },
  {
    company: "Budpol Sp. z o.o.",
    location: "Kraków",
    title: "Pomocnik na budowie — szkolenie w miejscu pracy",
    type: "Pełen etat",
    note: "Zaliczka na start możliwa",
  },
  {
    company: "LogiTrans",
    location: "Łódź / Trasa",
    title: "Kierowca kat. B — rozliczenie tygodniowe",
    type: "Elastyczne godziny",
    note: "Szybkie zatrudnienie, gotówka co tydzień",
  },
];

export default function JobBoardSection() {
  return (
    <section id="praca" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              Tablica Ogłoszeń
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-2">
              Praca dla każdego
            </h2>
            <p className="text-stone-500 text-base max-w-lg">
              Pracodawcy, którzy rozumieją Twoją sytuację i dają szansę bez zbędnych pytań.
            </p>
          </div>
          <a
            href="#dodaj-ogloszenie"
            className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Dodaj ogłoszenie
          </a>
        </div>

        {/* Job cards */}
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="group bg-stone-50 hover:bg-white border border-stone-100 hover:border-orange-100 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-bold text-stone-900 text-base">{job.title}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-medium">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
                    <span className="font-medium text-stone-700">{job.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {job.note}
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 flex-shrink-0"
                >
                  Aplikuj <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-stone-400 mt-6">
          Ogłoszenia są bezpłatne dla pracodawców. Nie wymagamy żadnych danych od osób szukających pracy.
        </p>
      </div>
    </section>
  );
}
