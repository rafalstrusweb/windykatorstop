import { BookOpen, Printer, Clock, Scale, ArrowRight } from "lucide-react";

const articles = [
  {
    icon: Scale,
    category: "Prawo",
    title: "Przedawnienie długu — po ilu latach możesz przestać płacić?",
    description:
      "Stary dług to często dług martwy. Sprawdź dokładnie kiedy Twój dług się przedawnił i co to oznacza w praktyce.",
    time: "5 min czytania",
    href: "#",
  },
  {
    icon: Printer,
    category: "Poradnik",
    title: "Jak wydrukować pismo jeśli nie masz drukarki?",
    description:
      "Krok po kroku: przelej plik na pendrive, wyślij emailem do Biedronki lub znajdź punkt ksero. Zdjęcia, adres, cena.",
    time: "3 min czytania",
    href: "#",
  },
  {
    icon: Clock,
    category: "Pilne",
    title: "Komornik zajął mi konto — co mogę zrobić w 24 godziny?",
    description:
      "Masz prawa nawet po zajęciu konta. Minimalna kwota wolna od zajęcia, wniosek o ograniczenie — wszystko tu.",
    time: "4 min czytania",
    href: "#",
  },
  {
    icon: BookOpen,
    category: "Podstawy",
    title: "Windykator a komornik — jaka jest różnica?",
    description:
      "Windykator nie ma żadnych uprawnień prawnych. Komornik — ma. Wiedz kto do Ciebie pisze i co może zrobić.",
    time: "4 min czytania",
    href: "#",
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
          </div>
          <a
            href="#wszystkie-artykuly"
            className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {articles.map((a) => {
            const Icon = a.icon;
            return (
              <a
                key={a.title}
                href={a.href}
                className="group bg-white rounded-2xl border border-stone-100 p-6 hover:shadow-lg hover:border-teal-100 transition-all duration-300 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">
                    {a.category}
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-3">{a.description}</p>
                  <span className="text-xs text-stone-400">{a.time}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
