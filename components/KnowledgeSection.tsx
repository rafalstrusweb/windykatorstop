import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import { Clock, ArrowRight } from "lucide-react";

export default function KnowledgeSection() {
  const featured = ARTICLES.slice(0, 4);

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
            <p className="text-stone-500 text-base mt-2 max-w-md">
              To co windykatorzy wolą żebyś nie wiedział. Napisane po ludzku.
            </p>
          </div>
          <Link
            href="/wiedza"
            className="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/wiedza/${article.slug}`}
              className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-lg hover:border-teal-100 transition-all duration-300 flex gap-4"
            >
              <div className="text-3xl flex-shrink-0">{article.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                    {article.category}
                  </span>
                  {article.urgent && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                      Pilne
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1.5 group-hover:text-teal-700 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-2">{article.excerpt}</p>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readMinutes} min czytania
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
