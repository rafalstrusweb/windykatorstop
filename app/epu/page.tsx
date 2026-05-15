import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import EPUWizard from "@/components/EPUWizard";

export const metadata: Metadata = {
  title: "Dostałem list z sądu EPU — co zrobić? — WindykatorStop.pl",
  description:
    "Masz 14 dni na sprzeciw od nakazu zapłaty z e-Sądu w Lublinie. Sprawdź ile czasu zostało i co zrobić krok po kroku. Sprzeciw jest bezpłatny.",
};

export default function EPUPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <EPUWizard />
      </main>
    </>
  );
}
