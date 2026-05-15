import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://windykatorstop.pl"),
  title: {
    default: "WindykatorStop.pl — Bezpłatna pomoc dla osób zadłużonych",
    template: "%s | WindykatorStop.pl",
  },
  description:
    "Zatrzymaj nękanie przez windykatorów. Darmowe pisma, skrypty rozmów, pomoc przy EPU i kalkulator przedawnienia. Krok po kroku, bez oceniania.",
  keywords: [
    "windykator", "dług", "zadłużenie", "EPU", "sprzeciw od nakazu zapłaty",
    "pismo do windykatora", "cofnięcie zgód", "komornik", "przedawnienie długu",
    "upadłość konsumencka", "RODO windykacja", "windykator a komornik",
  ],
  authors: [{ name: "WindykatorStop.pl" }],
  alternates: { canonical: "https://windykatorstop.pl" },
  openGraph: {
    title: "WindykatorStop.pl — Bezpłatna pomoc dla osób zadłużonych",
    description: "Dług to problem do rozwiązania, a nie wyrok. Bezpłatne narzędzia które pomogą Ci odzyskać spokój.",
    url: "https://windykatorstop.pl",
    siteName: "WindykatorStop.pl",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WindykatorStop.pl",
    description: "Bezpłatne narzędzia dla osób zadłużonych.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
