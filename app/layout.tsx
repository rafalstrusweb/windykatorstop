import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WindykatorStop.pl — Bezpłatna pomoc dla osób zadłużonych",
  description:
    "Zatrzymaj nękanie przez windykatorów. Darmowe pisma, skrypty rozmów, pomoc przy EPU i mapa długów. Krok po kroku, bez oceniania.",
  keywords: "windykator, dług, zadłużenie, EPU, sprzeciw, pismo, cofnięcie zgód, komornik",
  openGraph: {
    title: "WindykatorStop.pl — Bezpłatna pomoc dla osób zadłużonych",
    description: "Dług to problem do rozwiązania, a nie wyrok. Bezpłatne narzędzia które pomogą Ci odzyskać spokój.",
    locale: "pl_PL",
    type: "website",
  },
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
