import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Search, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Nie znaleziono strony — WindykatorStop.pl",
};

const QUICK_LINKS = [
  { href: "/generator-pism", label: "Generator Pism", desc: "Pisma do windykatora" },
  { href: "/skrypt-rozmowy", label: "Skrypt Rozmowy", desc: "Co powiedzieć przez telefon" },
  { href: "/epu", label: "Sprawa EPU", desc: "List z sądu? Masz 14 dni" },
  { href: "/ekspertyza", label: "Bezpłatna ekspertyza", desc: "Ocena Twojej sprawy" },
  { href: "/wiedza", label: "Baza wiedzy", desc: "Artykuły o prawach dłużnika" },
];

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-7xl mb-4">🔍</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-3">
            Nie znaleziono strony
          </h1>
          <p className="text-stone-500 text-lg mb-8">
            Strona mogła zostać przeniesiona lub link jest nieprawidłowy. Spróbuj jednego z poniższych narzędzi:
          </p>

          <div className="space-y-2 mb-8 text-left">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between bg-white border border-stone-100 hover:border-teal-200 rounded-2xl p-4 transition-all hover:shadow-md"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                    {link.label}
                  </div>
                  <div className="text-sm text-stone-500">{link.desc}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-teal-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </main>
    </>
  );
}
