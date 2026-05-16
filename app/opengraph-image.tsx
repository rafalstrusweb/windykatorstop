import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WindykatorStop.pl — Bezpłatna pomoc dla osób zadłużonych";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #f0fdfa 0%, #fafaf9 50%, #fff7ed 100%)",
          padding: "80px",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -100, left: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: "rgba(13, 148, 136, 0.15)", filter: "blur(60px)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.15)", filter: "blur(60px)",
          display: "flex",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 14,
            background: "#0d9488", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 36, color: "white", fontWeight: 900,
          }}>
            🛡
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: "#1c1917" }}>
            Windykator<span style={{ color: "#0d9488" }}>Stop</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          display: "flex", flexDirection: "column", flex: 1, justifyContent: "center",
        }}>
          <div style={{
            fontSize: 76, fontWeight: 900, color: "#1c1917",
            lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 30,
            display: "flex", flexDirection: "column",
          }}>
            <span>Dług to <span style={{ color: "#0d9488" }}>problem</span></span>
            <span>do rozwiązania,</span>
            <span>a nie wyrok.</span>
          </div>
          <div style={{
            fontSize: 28, color: "#57534e", fontWeight: 500,
            display: "flex", maxWidth: 900,
          }}>
            Bezpłatne narzędzia. Generator pism, skrypt rozmowy, sprawa EPU.
          </div>
        </div>

        {/* Footer badges */}
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          {["✓ Bezpłatne", "✓ Bez rejestracji", "✓ Bez oceniania"].map((b) => (
            <div key={b} style={{
              display: "flex", padding: "10px 24px",
              background: "white", borderRadius: 999,
              border: "1px solid #d6d3d1", fontSize: 22, color: "#0d9488", fontWeight: 700,
            }}>{b}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
