import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/content/articles";
import Navigation from "@/components/Navigation";
import ShareButtons from "@/components/ShareButtons";
import { Clock, ArrowLeft, Calendar } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return { title: "Nie znaleziono artykułu" };

  const url = `https://windykatorstop.pl/wiedza/${article.slug}`;
  const ogImage = `${url}/opengraph-image`;

  return {
    title: `${article.title} | WindykatorStop.pl`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "WindykatorStop.pl",
      locale: "pl_PL",
      type: "article",
      publishedTime: article.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "WindykatorStop.pl" },
    publisher: {
      "@type": "Organization",
      name: "WindykatorStop.pl",
      logo: { "@type": "ImageObject", url: "https://windykatorstop.pl/logo.png" },
    },
    mainEntityOfPage: `https://windykatorstop.pl/wiedza/${article.slug}`,
  };

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-stone-50 pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back link */}
          <Link
            href="/wiedza"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-teal-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wszystkie artykuły
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{article.emoji}</span>
              <div>
                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                  {article.category}
                </div>
                {article.urgent && (
                  <span className="inline-block mt-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                    Pilne
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed">{article.description}</p>

            <div className="flex items-center gap-5 mt-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {article.readMinutes} min czytania
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="article-content text-stone-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share buttons */}
          <ShareButtons
            url={`/wiedza/${article.slug}`}
            title={article.title}
            description={article.description}
          />

          {/* CTA box */}
          <div className="mt-10 bg-gradient-to-br from-teal-50 to-orange-50 border border-teal-100 rounded-3xl p-6 sm:p-8 text-center">
            <h3 className="text-xl font-extrabold text-stone-900 mb-2">
              Potrzebujesz pomocy z konkretną sprawą?
            </h3>
            <p className="text-stone-600 text-sm mb-5">
              Wygeneruj bezpłatne pismo, zapytaj asystenta AI lub skorzystaj z kalkulatora przedawnienia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/generator-pism"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm"
              >
                Generator Pism
              </Link>
              <Link
                href="/#ai-chat"
                className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-700 font-semibold px-5 py-3 rounded-xl hover:bg-stone-50 transition-colors text-sm"
              >
                Zapytaj AI
              </Link>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-12 border-t border-stone-100 pt-8">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Powiązane artykuły</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/wiedza/${r.slug}`}
                  className="group bg-white border border-stone-100 hover:border-teal-100 rounded-xl p-4 transition-all hover:shadow-md"
                >
                  <div className="text-2xl mb-2">{r.emoji}</div>
                  <p className="text-sm font-semibold text-stone-900 group-hover:text-teal-700 leading-snug">
                    {r.title}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">{r.readMinutes} min</p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <style>{`
        .article-content { font-size: 17px; line-height: 1.75; }
        .article-content > * + * { margin-top: 1.25em; }
        .article-content p.lead { font-size: 19px; color: #44403c; font-weight: 500; }
        .article-content h2 { font-size: 26px; font-weight: 800; color: #1c1917; margin-top: 2.5em; margin-bottom: 0.6em; line-height: 1.3; }
        .article-content h3 { font-size: 20px; font-weight: 700; color: #1c1917; margin-top: 1.8em; margin-bottom: 0.4em; }
        .article-content ul, .article-content ol { padding-left: 1.5em; }
        .article-content ul { list-style: disc; }
        .article-content ol { list-style: decimal; }
        .article-content li { margin: 0.4em 0; }
        .article-content strong { color: #1c1917; font-weight: 700; }
        .article-content a { color: #0d9488; text-decoration: underline; font-weight: 500; }
        .article-content a:hover { color: #0f766e; }
        .article-content .btn {
          display: inline-block; background: #0d9488; color: white !important;
          padding: 12px 20px; border-radius: 12px; text-decoration: none !important;
          font-weight: 700; margin-top: 0.5em;
        }
        .article-content .btn:hover { background: #0f766e; }
        .article-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 15px; }
        .article-content th, .article-content td { border: 1px solid #e7e5e4; padding: 10px 14px; text-align: left; }
        .article-content th { background: #f5f5f4; font-weight: 700; }
        .article-content .callout {
          background: #f0fdfa; border-left: 4px solid #0d9488;
          padding: 16px 20px; border-radius: 8px; margin: 1.5em 0;
        }
        .article-content .callout-warning {
          background: #fef3c7; border-left-color: #f59e0b;
        }
      `}</style>
    </>
  );
}
