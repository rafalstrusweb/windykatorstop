import Link from "next/link";
import { Shield, Heart } from "lucide-react";

const sections = [
  {
    title: "Narzędzia",
    links: [
      { label: "Generator Pism", href: "/generator-pism" },
      { label: "Skrypt Rozmowy", href: "/skrypt-rozmowy" },
      { label: "Sprawa EPU", href: "/epu" },
      { label: "Bezpłatna ekspertyza", href: "/ekspertyza" },
    ],
  },
  {
    title: "Wiedza",
    links: [
      { label: "Przedawnienie długu", href: "/wiedza/przedawnienie-dlugu-po-ilu-latach" },
      { label: "Windykator vs Komornik", href: "/wiedza/windykator-vs-komornik-roznica" },
      { label: "Sprzeciw EPU", href: "/wiedza/sprzeciw-epu-14-dni-instrukcja" },
      { label: "Upadłość konsumencka", href: "/wiedza/upadlosc-konsumencka-2026" },
      { label: "Wszystkie artykuły", href: "/wiedza" },
    ],
  },
  {
    title: "Wsparcie",
    links: [
      { label: "Bezpłatna pomoc prawna (NPP)", href: "https://np.ms.gov.pl", external: true },
      { label: "Fundacja Legitimis", href: "https://legitimis.pl", external: true },
      { label: "Fundacja Togatus", href: "https://fundacja.togatus.pl", external: true },
      { label: "Dla prawników", href: "/dla-prawnikow" },
      { label: "Praca dla wychodzących z długów", href: "/praca" },
      { label: "Polityka prywatności", href: "/prywatnosc" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Windykator<span className="text-teal-400">Stop</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Bezpłatna pomoc dla osób w pętli zadłużenia. Bez oceniania, bez rejestracji, zawsze dostępna.
            </p>
            <div className="text-xs text-stone-500 mb-2">
              Projekt non-profit. Nie jesteśmy kancelarią prawną.
            </div>
            <div className="text-xs text-stone-600 flex items-center gap-1.5">
              <span className="text-teal-400">🔒</span>
              Zero ciasteczek śledzących. <Link href="/prywatnosc" className="underline hover:text-teal-400">Polityka prywatności</Link>
            </div>
          </div>

          {sections.map((sec) => (
            <div key={sec.title}>
              <div className="text-white font-semibold text-sm mb-4">{sec.title}</div>
              <ul className="space-y-2.5">
                {sec.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-stone-400 hover:text-teal-400 transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-stone-400 hover:text-teal-400 transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} WindykatorStop.pl — wszystkie narzędzia bezpłatne</span>
          <span className="flex items-center gap-1.5">
            Zrobione z <Heart className="w-3 h-3 text-red-400" /> dla ludzi w trudnej chwili
          </span>
        </div>
      </div>
    </footer>
  );
}
