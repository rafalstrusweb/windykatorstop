import { BookOpen, Printer, Clock, Scale, Phone, Home, ArrowRight } from "lucide-react";

const articles = [
  {
    icon: Scale,
    category: "Prawo",
    urgent: false,
    title: "Przedawnienie długu — po ilu latach możesz przestać płacić?",
    description:
      "Chwilówka przedawnia się po 3 latach. Kredyt hipoteczny po 6. Ale uważaj — nawet 10 zł wpłaty lub prośba o ugodę restartuje licznik od zera.",
    time: "5 min czytania",
  },
  {
    icon: Phone,
    category: "Windykacja",
    urgent: false,
    title: "Windykator 3-osobowej firmy grozi wizytą terenową. To blef.",
    description:
      "Firma zatrudniająca 2-12 osób fizycznie nie ma pracowników w całej Polsce. Sprawdź jak odróżnić blef od realnego zagrożenia.",
    time: "4 min czytania",
  },
  {
    icon: Home,
    category: "Prawa dłużnika",
    urgent: false,
    title: "Co może windykator, a co komornik? Fundamentalna różnica.",
    description:
      "Windykator nie może wejść do mieszkania, zająć mienia ani zaglądać na konto. Tylko komornik z tytułem wykonawczym ma te uprawnienia.",
    time: "4 min czytania",
  },
  {
    icon: Printer,
    category: "Poradnik",
    urgent: false,
    title: "Jak wydrukować pismo jeśli nie masz drukarki?",
    description:
      "Krok po kroku: przelej plik na pendrive lub wyślij emailem. Punkty ksero w Biedronce, salonikach prasowych i bibliotekach. Koszt od 20 gr za stronę.",
    time: "3 min czytania",
  },
  {
    icon: Clock,
    category: "Pilne",
    urgent: true,
    title: "Komornik zajął mi konto — mam prawa w ciągu 24 godzin",
    description:
      "Kwota wolna od zajęcia: minimalne wynagrodzenie (pełna kwota). Świadczenia 500+, alimenty i zasiłki są całkowicie chronione przed komornikiem.",
    time: "4 min czytania",
  },
  {
    icon: BookOpen,
    category: "Zaawansowane",
    urgent: false,
    title: "Cesja długu to często prezent, nie powód do paniki",
    description:
      "Gdy fundusz kupuje Twój dług, często nie ma oryginalnych dokumentów umowy. W sądzie to ON musi udowodnić że dług istnieje. Często nie może.",
    time: "6 min czytania",
  },
];

export default function KnowledgeSection() {
  return (
    <section id="wiedza" className="py-16 sm:py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-stone-600 text-sm font-medium px-4 py-1.5 rounded-full border border-stone-200 mb-4">
              Baza wiedzy
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900">
              Wiedza, która chroni
            </h2>
            <p className="text-stone-500 text-base mt-2 max-w-md">
              To co windykatorzy wolą żebyś nie wiedział. Napisane po ludzku.
            </p>
          </div>
          <a
            href="#wszystkie-artykuly"
            className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => {
            const Icon = a.icon;
            return (
              <a
                key={a.title}
                href="#"
                className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-lg hover:border-teal-100 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    {a.urgent && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Pilne</span>
                    )}
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">{a.category}</span>
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-2 group-hover:text-teal-700 transition-colors leading-snug flex-1">
                  {a.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-3">{a.description}</p>
                <span className="text-xs text-stone-400">{a.time}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
