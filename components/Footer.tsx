import { Shield, Heart } from "lucide-react";

const links = {
  "Narzędzia": ["Generator Pism", "Skrypt Rozmowy", "Sprawa EPU", "Mapa Długów"],
  "Wiedza": ["Przedawnienie długu", "Windykator vs Komornik", "Jak drukować bez drukarki", "Prawa dłużnika"],
  "Wsparcie": ["Bezpłatna ekspertyza", "Bezpłatne kliniki prawne", "Dla prawników", "Polityka prywatności"],
};

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Windykator<span className="text-teal-400">Stop</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Bezpłatna pomoc dla osób w pętli zadłużenia. Bez oceniania, bez rejestracji, zawsze dostępna.
            </p>
            <div className="text-xs text-stone-500">
              Projekt non-profit. Nie jesteśmy kancelarią prawną.
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <div className="text-white font-semibold text-sm mb-4">{cat}</div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-stone-400 hover:text-teal-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>© 2024 WindykatorStop.pl — wszystkie narzędzia bezpłatne</span>
          <span className="flex items-center gap-1.5">
            Zrobione z <Heart className="w-3 h-3 text-red-400" /> dla ludzi w trudnej chwili
          </span>
        </div>
      </div>
    </footer>
  );
}
