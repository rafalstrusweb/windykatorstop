import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CaseAssessment from "@/components/CaseAssessment";

export const metadata: Metadata = {
  title: "Bezpłatna ekspertyza Twojej sprawy — WindykatorStop.pl",
  description:
    "Odpowiedz na 5 pytań i otrzymaj indywidualną rekomendację: czy poradzisz sobie sam(a) z naszymi narzędziami, czy warto skorzystać z prawnika. Bezpłatnie.",
};

export default function EkspertyzaPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <CaseAssessment />
      </main>
    </>
  );
}
