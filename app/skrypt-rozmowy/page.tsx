import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PhoneScript from "@/components/PhoneScript";

export const metadata: Metadata = {
  title: "Skrypt Rozmowy z Windykatorem — WindykatorStop.pl",
  description:
    "Co powiedzieć gdy dzwoni windykator? Gotowy skrypt rozmowy — słowo po słowie. Używaj podczas rozmowy. Bezpłatnie.",
};

export default function SkryptPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50 pt-16">
        <PhoneScript />
      </main>
    </>
  );
}
