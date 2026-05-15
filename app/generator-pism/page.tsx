import type { Metadata } from "next";
import LetterGenerator from "@/components/LetterGenerator";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Generator Pism — WindykatorStop.pl",
  description:
    "Wygeneruj bezpłatne pismo do windykatora: cofnięcie zgód RODO, sprzeciw od nakazu EPU, wezwanie do zaprzestania nękania. Gotowe w 2 minuty.",
};

export default function GeneratorPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <LetterGenerator />
      </main>
    </>
  );
}
