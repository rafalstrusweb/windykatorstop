import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FirstAidSection from "@/components/FirstAidSection";
import AIChatSection from "@/components/AIChatSection";
import DebtMapSection from "@/components/DebtMapSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import JobBoardSection from "@/components/JobBoardSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navigation />
      <HeroSection />
      <FirstAidSection />
      <AIChatSection />
      <DebtMapSection />
      <KnowledgeSection />
      <JobBoardSection />
      <Footer />
    </main>
  );
}
