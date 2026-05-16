import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import JobBoard from "@/components/JobBoard";

export const metadata: Metadata = {
  title: "Praca dla osób w trudnej sytuacji finansowej — WindykatorStop.pl",
  description:
    "Oferty pracy od pracodawców, którzy rozumieją sytuację osób zadłużonych. Bez sprawdzania BIK/KRD. Szybkie zatrudnienie. Zaliczki na start.",
};

export default function PracaPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <JobBoard />
      </main>
    </>
  );
}
