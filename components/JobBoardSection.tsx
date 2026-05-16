import Link from "next/link";
import { JOBS } from "@/content/jobs";
import { Briefcase, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function JobBoardSection() {
  const featured = JOBS.slice(0, 3);

  return (
    <section id="praca" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Pracodawcy, którzy rozumieją Twoją sytuację. Bez sprawdzania BIK/KRD.
            </p>
          </div>
          <Link
            href="/praca"
            className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            Wszystkie ogłoszenia
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {featured.map((job) => (
            <Link
              key={job.id}
              href="/praca"
              className="group bg-stone-50 hover:bg-white border border-stone-100 hover:border-orange-200 rounded-2xl p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                  {job.type}
                </span>
                {job.noCheckCredit && (
                  <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> Bez BIK
                  </span>
                )}
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-teal-700 transition-colors">{job.title}</h3>
              <div className="text-sm text-stone-500 mb-2">{job.company}</div>
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <MapPin className="w-3 h-3" /> {job.location}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-stone-400">
          Ogłoszenia bezpłatne. Brak danych od kandydatów. Weryfikujemy każdego pracodawcę.
        </p>
      </div>
    </section>
  );
}
