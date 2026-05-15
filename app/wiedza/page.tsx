import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import Navigation from "@/components/Navigation";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wiedza — baza wiedzy dla osób zadłużonych | WindykatorStop.pl",
  description:
    "Wszystko co windykatorzy wolą żebyś nie wiedział. Przedawnienie, EPU, cesja długu, upadłość konsumencka — napisane po ludzku, bez prawniczego żargonu.",
  openGraph: {
    title: "Baza wiedzy — WindykatorStop.pl",
    description: "Wszystko co musisz wiedzieć o swoich prawach jako dłużnik.",
    type: "website",
  },
};

const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));

export default function WiedzaIndex() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Baza wiedzy
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-3">
              Wiedza, która chroni
            </h1>
            <p className="text-stone-500 text-lg max-w-2xl">
              To co windykatorzy wolą żebyś nie wiedział. Każdy artykuł napisany prostym językiem, oparty na konkretnych przepisach prawa.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs font-semibold text-stone-400 self-center mr-2">Kategorie:</span>
            {CATEGORIES.map((cat) => (
              <span key={cat} className="text-xs font-medium bg-white border border-stone-200 text-stone-600 px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/wiedza/${article.slug}`}
                className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-lg hover:border-teal-100 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{article.emoji}</div>
                  <div className="flex items-center gap-2">
                    {article.urgent && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Pilne</span>
                    )}
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>
                <h2 className="font-bold text-stone-900 text-base mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readMinutes} min
                  </span>
                  <span className="flex items-center gap-1 text-teal-600 font-semibold group-hover:gap-1.5 transition-all">
                    Czytaj <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
