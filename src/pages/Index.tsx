import { useCallback } from "react";
import { Hero } from "@/components/Hero";
import { GeoscienceImpact } from "@/components/GeoscienceImpact";
import { Disciplines } from "@/components/Disciplines";
import { SDGSection } from "@/components/SDGSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleExplore = useCallback(() => {
    scrollToSection("geoscience-impact");
  }, [scrollToSection]);

  const handleInsights = useCallback(() => {
    scrollToSection("futuregeo-insights");
  }, [scrollToSection]);

  const handleImpact = useCallback(() => {
    scrollToSection("geoscience-impact");
  }, [scrollToSection]);

  const handleGeosciences = useCallback(() => {
    scrollToSection("geoscience-specializations");
  }, [scrollToSection]);

  return (
    <div className="min-h-screen space-y-12">
      <Hero
        onExplore={handleExplore}
        onNavigateInsights={handleInsights}
        onNavigateImpact={handleImpact}
        onNavigateGeosciences={handleGeosciences}
      />

      <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("hero");
            }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm transition-colors hover:bg-primary/20"
          >
            Home
          </a>
          <button
            type="button"
            onClick={handleInsights}
            className="rounded-full bg-primary/5 px-3 py-1 font-medium text-foreground transition-colors hover:bg-primary/10"
          >
            Insights
          </button>
          <button
            type="button"
            onClick={handleImpact}
            className="rounded-full bg-primary/5 px-3 py-1 font-medium text-foreground transition-colors hover:bg-primary/10"
          >
            Impact
          </button>
          <button
            type="button"
            onClick={handleGeosciences}
            className="rounded-full bg-primary/5 px-3 py-1 font-medium text-foreground transition-colors hover:bg-primary/10"
          >
            Geosciences
          </button>
        </div>
      </div>

      <SDGSection />
      <GeoscienceImpact />
      <Disciplines />
      <Footer />
    </div>
  );
};

export default Index;
