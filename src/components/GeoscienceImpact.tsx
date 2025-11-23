import { Card } from "./ui/card";
import { Droplets, Zap, Leaf, Mountain, Users, Globe } from "lucide-react";

const impacts = [
  {
    icon: Droplets,
    title: "Clean Water Access",
    description:
      "Hydrogeologists locate and protect groundwater resources, ensuring billions have access to safe drinking water in water-stressed regions.",
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    description:
      "Geothermal specialists and mineral geologists enable the transition to clean energy through resource identification and sustainable extraction.",
  },
  {
    icon: Leaf,
    title: "Climate Solutions",
    description:
      "Carbon capture geologists store CO₂ underground permanently, while palaeoclimatologists reconstruct past climates to validate current models.",
  },
  {
    icon: Mountain,
    title: "Natural Hazard Protection",
    description:
      "Seismologists and volcanologists provide early warnings for earthquakes and eruptions, saving thousands of lives annually.",
  },
  {
    icon: Users,
    title: "Public Health",
    description:
      "Medical geologists identify disease sources linked to geology, from arsenic in groundwater to radon exposure, preventing health crises.",
  },
  {
    icon: Globe,
    title: "Critical Resources",
    description:
      "Mining and economic geologists secure supplies of lithium, cobalt, and rare earths essential for technology and renewable energy infrastructure.",
  },
];

export const GeoscienceImpact = () => {
  return (
    <section id="geoscience-impact" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Impact on Global Challenges
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            How geoscience expertise directly addresses critical issues facing humanity
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className="hover-lift group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <impact.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {impact.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{impact.description}</p>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-12 max-w-5xl rounded-2xl border-primary/20 bg-primary/5 p-8">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              Expert Knowledge for Sustainable Development
            </h3>
            <p className="mx-auto max-w-4xl text-lg text-muted-foreground">
              From preventing disasters to enabling clean energy, geoscientists provide the essential expertise needed
              to achieve the UN Sustainable Development Goals and build a resilient future for all.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

