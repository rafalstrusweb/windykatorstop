import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Bezpłatne — zawsze",
  "Bez rejestracji",
  "Bez oceniania",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-96 h-96 bg-teal-100 rounded-full opacity-40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-100 rounded-full opacity-40 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Bezpłatna pomoc dla każdego
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight tracking-tight mb-6">
          Dług to{" "}
          <span className="text-teal-600 relative">
            problem do rozwiązania,
            <svg
              aria-hidden
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M1 5.5C50 1.5 100 7.5 150 4C200 0.5 250 6.5 299 3"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          <br className="hidden sm:block" />
          a nie wyrok.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Odzyskaj spokój w 3 krokach.{" "}
          <strong className="text-stone-800 font-semibold">Bezpłatne narzędzia</strong>, które pomogą
          Ci zatrzymać telefony od windykatorów i uporządkować finanse — krok po kroku.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href="#pierwsza-pomoc"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 text-white text-lg font-bold px-8 py-4 rounded-2xl hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-200"
          >
            Zacznij tutaj — za darmo
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#ai-chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-teal-700 text-base font-semibold px-6 py-4 rounded-2xl hover:bg-teal-50 border border-teal-200 transition-all"
          >
            <Phone className="w-4 h-4" />
            Porozmawiaj z asystentem AI
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-stone-500">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps strip */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Oceń sytuację", desc: "Wypełnij mapę długów w 5 minut" },
            { step: "2", title: "Zatrzymaj nękanie", desc: "Wyślij pismo o cofnięciu zgód" },
            { step: "3", title: "Działaj z planem", desc: "Krok po kroku do wyjścia z długów" },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-stone-100"
            >
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                {step}
              </div>
              <div>
                <div className="font-semibold text-stone-900 text-base">{title}</div>
                <div className="text-stone-500 text-sm mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
