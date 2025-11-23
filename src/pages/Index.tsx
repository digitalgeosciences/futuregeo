import { Hero } from "@/components/Hero";
import { GeoscienceImpact } from "@/components/GeoscienceImpact";
import { Disciplines } from "@/components/Disciplines";
import { SDGSection } from "@/components/SDGSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen space-y-12">
      <Hero />
      <GeoscienceImpact />
      <Disciplines />
      <SDGSection />
      <Footer />
    </div>
  );
};

export default Index;
