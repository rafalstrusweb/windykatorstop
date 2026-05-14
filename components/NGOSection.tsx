import { Heart, MapPin, ArrowRight, Scale } from "lucide-react";

const orgs = [
  {
    name: "Fundacja Legitimis",
    city: "Lublin",
    focus: "Sprzeciwy od nakazów zapłaty (EPU), walka z funduszami sekurytyzacyjnymi",
    note: "Specjalizuje się dokładnie w sprawach z e-Sądu",
    href: "https://legitimis.pl",
    recommended: true,
  },
  {
    name: "Fundacja Togatus Pro Bono",
    city: "Ogólnopolska",
    focus: "Bezpłatne porady prawne, pomoc w rozumieniu pism urzędowych",
    note: "Działa w całej Polsce, bez oceniania",
    href: "https://fundacja.togatus.pl",
    recommended: false,
  },
  {
    name: "Fundacja Cognosco",
    city: "Kraków",
    focus: "Porady prawne przy nakazach zapłaty i roszczeniach windykacyjnych",
    note: "Radcowie prawni i adwokaci pro bono",
    href: "https://poradnieprawne.org",
    recommended: false,
  },
  {
    name: "Nieodpłatna Pomoc Prawna (NPP)",
    city: "Każdy powiat w Polsce",
    focus: "Darmowe porady adwokackie i radcowskie dla osób bez środków",
    note: "Finansowana przez państwo, umów wizytę telefonicznie w swoim powiecie",
    href: "https://np.ms.gov.pl",
    recommended: false,
  },
];

export default function NGOSection() {
  return (
    <section id="pomoc-prawna" className="py-16 sm:py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          {/* Left: Header */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Heart className="w-3.5 h-3.5" />
              Bezpłatna pomoc prawna
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-4">
              Gdy sprawa wymaga prawnika
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-6">
              Nasze narzędzia pomogą Ci w 80% przypadków. Ale gdy sprawa jest skomplikowana — skorzystaj z bezpłatnych klinik prawnych. Nie pobierają opłat.
            </p>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
              <p className="text-sm font-semibold text-red-800 mb-1 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Uważaj na płatne firmy oddłużeniowe
              </p>
              <p className="text-xs text-red-700">
                Firmy pobierające tysiące złotych "za analizę sprawy" lub "abonament ochronny" to najczęściej oszustwo. UOKiK wydaje regularnie ostrzeżenia przed takimi podmiotami.
              </p>
            </div>
          </div>

          {/* Right: Orgs */}
          <div className="flex-1 space-y-3">
            {orgs.map((org) => (
              <a
                key={org.name}
                href={org.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white rounded-2xl border border-stone-100 hover:border-teal-100 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-stone-900 text-base">{org.name}</span>
                    {org.recommended && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                        Polecamy do spraw EPU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-stone-400 mb-2">
                    <MapPin className="w-3 h-3" />
                    {org.city}
                  </div>
                  <p className="text-sm text-stone-600 mb-1">{org.focus}</p>
                  <p className="text-xs text-stone-400 italic">{org.note}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-teal-500 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
