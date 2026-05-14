import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FirstAidSection from "@/components/FirstAidSection";
import StatuteCalculator from "@/components/StatuteCalculator";
import AIChatSection from "@/components/AIChatSection";
import DebtMapSection from "@/components/DebtMapSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import NGOSection from "@/components/NGOSection";
import JobBoardSection from "@/components/JobBoardSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navigation />
      <HeroSection />
      <FirstAidSection />
      <StatuteCalculator />
      <AIChatSection />
      <DebtMapSection />
      <KnowledgeSection />
      <NGOSection />
      <JobBoardSection />
      <Footer />
    </main>
  );
}
