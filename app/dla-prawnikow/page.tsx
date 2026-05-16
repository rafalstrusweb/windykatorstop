import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import LawyerSignup from "@/components/LawyerSignup";

export const metadata: Metadata = {
  title: "Dla prawnikow - dolacz do WindykatorStop.pl",
  description:
    "Bezplatna platforma lead-genu dla radcow prawnych i adwokatow specjalizujacych sie w prawie konsumenckim i windykacyjnym. Tylko zweryfikowani prawnicy. Prowizja tylko od sukcesu.",
};

export default function DlaPrawnikow() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <LawyerSignup />
      </main>
    </>
  );
}
