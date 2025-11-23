import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  const biosphereOrbs = [
    { top: "18%", left: "8%", size: "24rem", gradient: "from-emerald-300/60 via-lime-200/30 to-transparent" },
    { top: "35%", right: "10%", size: "18rem", gradient: "from-cyan-300/50 via-sky-400/30 to-transparent" },
    { top: "15%", right: "30%", size: "12rem", gradient: "from-rose-200/30 via-amber-200/20 to-transparent" },
  ];

  const orbitRings = [
    { size: "34rem", delay: "0s", border: "border-primary/30" },
    { size: "48rem", delay: "3s", border: "border-secondary/30" },
    { size: "60rem", delay: "6s", border: "border-primary/20" },
  ];

  const scrollToContent = () => {
    document.getElementById("geoscience-impact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/40 via-primary/20 to-background opacity-80 animate-aurora"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)] opacity-70 animate-pulse-soft"></div>
        <div className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:140px_140px] animate-drift-slow"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {biosphereOrbs.map((orb, index) => (
            <span
              key={`orb-${index}`}
              className={`absolute rounded-full blur-3xl animate-pulse-soft bg-gradient-to-br ${orb.gradient}`}
              style={{ top: orb.top, left: orb.left, right: orb.right, width: orb.size, height: orb.size }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
          {orbitRings.map((ring, index) => (
            <span
              key={`ring-${index}`}
              className={`absolute rounded-full border ${ring.border} animate-float`}
              style={{ width: ring.size, height: ring.size, animationDelay: ring.delay }}
            />
          ))}
        </div>

        <div className="absolute bottom-[-15%] left-1/2 w-[140%] h-[55vh] -translate-x-1/2 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,76,92,0.4),transparent_65%)] opacity-80 blur-[40px]"></div>
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(93,63,29,0.95)0%,rgba(125,84,35,0.9)30%,rgba(36,64,96,0.85)70%,rgba(11,32,52,0.9)100%)]"
            style={{ clipPath: "polygon(0% 70%, 15% 60%, 30% 68%, 45% 58%, 60% 66%, 75% 57%, 90% 65%, 100% 60%, 100% 100%, 0% 100%)" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-foreground tracking-tight">
            Geoscience for the Future
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Geoscientists play a crucial role in addressing society's future challenges through the United Nations Sustainable Development Goals
          </p>
          <Button
            onClick={scrollToContent}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6"
          >
            Explore the Future
            <ArrowDown className="ml-2 h-6 w-6 animate-bounce" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
