import { FileText, MessageSquare, AlertTriangle, Shield, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Shield,
    color: "teal",
    tag: "Najszybszy efekt",
    title: "Zatrzymaj telefony",
    subtitle: "Pismo RODO — cofnięcie zgód na kontakt",
    description:
      "Wygeneruj pismo cofające zgodę na kontakt telefoniczny. Firma MUSI zaprzestać dzwonić. Zostaje tylko korespondencja listowna. Działa na każdą firmę windykacyjną.",
    cta: "Wygeneruj pismo RODO",
    href: "/generator-pism",
    urgent: false,
    stat: "Skuteczność w 24-48h",
  },
  {
    icon: FileText,
    color: "blue",
    tag: "Obrona procesowa",
    title: "Generator Pism",
    subtitle: "Sprzeciw od nakazu, pisma do komornika",
    description:
      "Gotowe pisma prawne: sprzeciw od nakazu zapłaty, wniosek do komornika o ograniczenie zajęcia, wezwanie do zaprzestania nękania. Bezpłatnie, w kilka minut.",
    cta: "Wybierz pismo",
    href: "/generator-pism",
    urgent: false,
    stat: "Ponad 12 wzorów pism",
  },
  {
    icon: MessageSquare,
    color: "orange",
    tag: "Ściąga na telefon",
    title: "Skrypt Rozmowy",
    subtitle: "Co powiedzieć — słowo po słowie",
    description:
      "Windykator dzwoni? Masz tu gotowe zdania. Jedno zdanie chroni Cię prawnie: nie przyznawaj długu, nie obiecuj wpłat. Nawet 10 zł wpłaty może cofnąć przedawnienie.",
    cta: "Pokaż skrypt",
    href: "#skrypt-rozmowy",
    urgent: false,
    stat: "Chroni przed uznaniem długu",
  },
  {
    icon: AlertTriangle,
    color: "red",
    tag: "⚠️ Masz 14 dni!",
    title: "List z sądu (EPU)",
    subtitle: "Dostałeś list z Lublina? Działaj teraz.",
    description:
      "To nakaz zapłaty z e-Sądu. Masz 14 dni na sprzeciw — inaczej komornik. Sprzeciw jest bezpłatny i prosty. Złożony sprzeciw = fundusz musi udowodnić dług dokumentami. Często nie ma jak.",
    cta: "Złóż sprzeciw — krok po kroku",
    href: "/generator-pism",
    urgent: true,
    stat: "Bezpłatny sprzeciw niszczy ich sprawę",
  },
];

const colorMap = {
  teal: {
    icon: "bg-teal-100 text-teal-600",
    tag: "bg-teal-50 text-teal-700",
    border: "border-teal-100 hover:border-teal-200",
    cta: "bg-teal-600 hover:bg-teal-700 text-white",
    stat: "text-teal-600",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    tag: "bg-blue-50 text-blue-700",
    border: "border-blue-100 hover:border-blue-200",
    cta: "bg-blue-600 hover:bg-blue-700 text-white",
    stat: "text-blue-600",
  },
  orange: {
    icon: "bg-orange-100 text-orange-500",
    tag: "bg-orange-50 text-orange-700",
    border: "border-orange-100 hover:border-orange-200",
    cta: "bg-orange-500 hover:bg-orange-600 text-white",
    stat: "text-orange-600",
  },
  red: {
    icon: "bg-red-100 text-red-600",
    tag: "bg-red-50 text-red-700 font-semibold",
    border: "border-red-200 hover:border-red-300",
    cta: "bg-red-600 hover:bg-red-700 text-white",
    stat: "text-red-600",
  },
};

export default function FirstAidSection() {
  return (
    <section id="pierwsza-pomoc" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Działaj teraz
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mb-4">
            Pierwsza Pomoc
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Zacznij od tego, co jest dla Ciebie najpilniejsze. Każde z tych narzędzi działa samodzielnie — bez rejestracji, bezpłatnie.
          </p>
        </div>

        {/* Alert: recognition of debt warning */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <div className="text-amber-500 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-0.5">Ważne: Uważaj na uznanie długu</p>
            <p className="text-sm text-amber-700">
              Nawet wpłata <strong>10 zł</strong> lub prośba o "przedłużenie terminu" może zrestartować bieg przedawnienia i ożywić stary, martwy dług.
              Przed jakimkolwiek kontaktem z windykatorem — sprawdź przedawnienie.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const colors = colorMap[card.color as keyof typeof colorMap];

            return (
              <div
                key={card.title}
                className={`relative flex flex-col bg-white rounded-3xl border-2 ${colors.border} p-6 shadow-sm hover:shadow-lg transition-all duration-300 group`}
              >
                {card.urgent && (
                  <div className="absolute -top-3 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    PILNE — 14 DNI
                  </div>
                )}

                <div className={`inline-flex self-start text-xs font-medium px-3 py-1 rounded-full mb-4 ${colors.tag}`}>
                  {card.tag}
                </div>

                <div className={`w-12 h-12 rounded-2xl ${colors.icon} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-1">{card.title}</h3>
                <p className="text-sm font-medium text-stone-500 mb-3">{card.subtitle}</p>
                <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-4">
                  {card.description}
                </p>

                <div className={`text-xs font-semibold mb-4 ${colors.stat}`}>
                  ✓ {card.stat}
                </div>

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
