import { ImageResponse } from "next/og";
import { ARTICLES, getArticle } from "@/content/articles";

export const runtime = "edge";
export const alt = "WindykatorStop.pl — artykuł";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  return [{ contentType: "image/png", size, id: params.slug, alt: article?.title ?? alt }];
}

export default async function OGImage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  const title = article?.title ?? "WindykatorStop.pl";
  const category = article?.category ?? "Wiedza";
  const emoji = article?.emoji ?? "📘";
  const readMins = article?.readMinutes ?? 5;
  const urgent = article?.urgent ?? false;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: urgent
            ? "linear-gradient(135deg, #fef2f2 0%, #fafaf9 60%, #fff7ed 100%)"
            : "linear-gradient(135deg, #f0fdfa 0%, #fafaf9 60%, #fff7ed 100%)",
          padding: "70px 80px",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Decorative blob */}
        <div style={{
          position: "absolute", top: -120, right: -120,
          width: 450, height: 450, borderRadius: "50%",
          background: urgent ? "rgba(239, 68, 68, 0.12)" : "rgba(13, 148, 136, 0.15)",
          filter: "blur(60px)", display: "flex",
        }} />

        {/* Header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: "#0d9488", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 28, color: "white",
            }}>🛡</div>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 800, color: "#1c1917" }}>
              Windykator<span style={{ color: "#0d9488" }}>Stop</span>
            </div>
          </div>

          {urgent && (
            <div style={{
              display: "flex", padding: "10px 22px",
              background: "#dc2626", color: "white",
              borderRadius: 999, fontSize: 22, fontWeight: 800,
            }}>⚠ PILNE — 14 DNI</div>
          )}
        </div>

        {/* Category tag */}
        <div style={{
          display: "flex", marginBottom: 24, alignItems: "center", gap: 16,
        }}>
          <div style={{ fontSize: 72, display: "flex" }}>{emoji}</div>
          <div style={{
            display: "flex", padding: "10px 22px",
            background: "white", borderRadius: 999,
            border: "2px solid #0d9488", fontSize: 22,
            color: "#0d9488", fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{category}</div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: title.length > 60 ? 56 : 68,
          fontWeight: 900, color: "#1c1917",
          lineHeight: 1.08, letterSpacing: "-0.02em",
          flex: 1, display: "flex", alignItems: "center", maxWidth: 1050,
        }}>{title}</div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 30, paddingTop: 24, borderTop: "1px solid #d6d3d1",
        }}>
          <div style={{ display: "flex", fontSize: 22, color: "#57534e" }}>
            windykatorstop.pl/wiedza
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#57534e", fontWeight: 600 }}>
            {readMins} min czytania · Bezpłatnie
          </div>
        </div>
      </div>
    ),
    size
  );
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}
