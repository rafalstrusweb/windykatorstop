import { FileText, MessageSquare, AlertTriangle, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: FileText,
    color: "teal",
    tag: "Najczęściej używane",
    title: "Generator Pism",
    subtitle: "Zatrzymaj nękanie telefonami",
    description:
      "Wygeneruj gotowe pismo o cofnięciu zgody na kontakt telefoniczny. Wydrukuj, wyślij — i telefony muszą ustać. To Twoje prawo.",
    cta: "Wygeneruj pismo",
    href: "#generator-pism",
    urgent: false,
  },
  {
    icon: MessageSquare,
    color: "orange",
    tag: "Ściąga na telefon",
    title: "Skrypt Rozmowy",
    subtitle: "Co powiedzieć windykatorowi?",
    description:
      "Nie wiesz co mówić gdy dzwoni windykator? Masz tu gotowe zdania. Przeczytaj, zapamiętaj jedno — i już wiesz jak się bronić.",
    cta: "Pobierz ściągę",
    href: "#skrypt-rozmowy",
    urgent: false,
  },
  {
    icon: AlertTriangle,
    color: "red",
    tag: "⚠️ Masz 14 dni!",
    title: "Sprawa w sądzie EPU",
    subtitle: "Dostałeś list z sądu w Lublinie?",
    description:
      "To nakaz zapłaty z Elektronicznego Postępowania Upominawczego. Masz dokładnie 14 dni na sprzeciw. Bez sprzeciwu — przegrywasz z automatu.",
    cta: "Sprawdź jak złożyć sprzeciw",
    href: "#epu-sprzeciw",
    urgent: true,
  },
];

const colorMap = {
  teal: {
    icon: "bg-teal-100 text-teal-600",
    tag: "bg-teal-50 text-teal-700",
    border: "border-teal-100",
    cta: "bg-teal-600 hover:bg-teal-700 text-white",
    shadow: "hover:shadow-teal-100",
  },
  orange: {
    icon: "bg-orange-100 text-orange-500",
    tag: "bg-orange-50 text-orange-700",
    border: "border-orange-100",
    cta: "bg-orange-500 hover:bg-orange-600 text-white",
    shadow: "hover:shadow-orange-100",
  },
  red: {
    icon: "bg-red-100 text-red-600",
    tag: "bg-red-50 text-red-700 font-semibold",
    border: "border-red-200",
    cta: "bg-red-600 hover:bg-red-700 text-white",
    shadow: "hover:shadow-red-100",
  },
};

export default function FirstAidSection() {
  return (
    <section id="pierwsza-pomoc" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Szybka pomoc
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-4">
            Pierwsza Pomoc
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Trzy narzędzia, które dają natychmiastowy efekt. Zacznij od tego, co jest dla Ciebie najważniejsze.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const colors = colorMap[card.color as keyof typeof colorMap];

            return (
              <div
                key={card.title}
                className={`relative flex flex-col bg-white rounded-3xl border-2 ${colors.border} p-6 shadow-sm hover:shadow-xl ${colors.shadow} transition-all duration-300 group`}
              >
                {card.urgent && (
                  <div className="absolute -top-3 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    PILNE — 14 DNI
                  </div>
                )}

                {/* Tag */}
                <div className={`inline-flex self-start text-xs font-medium px-3 py-1 rounded-full mb-4 ${colors.tag}`}>
                  {card.tag}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl ${colors.icon} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-stone-900 mb-1">{card.title}</h3>
                <p className="text-sm font-medium text-stone-500 mb-3">{card.subtitle}</p>
                <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-6">
                  {card.description}
                </p>

                {/* CTA */}
                <a
                  href={card.href}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${colors.cta}`}
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
