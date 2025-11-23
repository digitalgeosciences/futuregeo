import { Card } from "./ui/card";
import { Droplets, Zap, Leaf, Mountain, Users, Globe } from "lucide-react";

const impacts = [
  {
    icon: Droplets,
    title: "Clean Water Access",
    sdg: "6: clean water & sanitation",
    description:
      "Hydrogeologists locate and protect groundwater resources, ensuring billions have access to safe drinking water in water-stressed regions.",
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    sdg: "7: affordable & clean energy",
    description:
      "Geothermal specialists and mineral geologists enable the transition to clean energy through resource identification and sustainable extraction.",
  },
  {
    icon: Leaf,
    title: "Climate Solutions",
    sdg: "13: climate action",
    description:
      "Carbon capture geologists store CO₂ underground permanently, while palaeoclimatologists reconstruct past climates to validate current models.",
  },
  {
    icon: Mountain,
    title: "Natural Hazard Protection",
    sdg: "11: sustainable cities & communities",
    description:
      "Seismologists and volcanologists provide early warnings for earthquakes and eruptions, saving thousands of lives annually.",
  },
  {
    icon: Users,
    title: "Public Health",
    sdg: "3: good health & well-being",
    description:
      "Medical geologists identify disease sources linked to geology, from arsenic in groundwater to radon exposure, preventing health crises.",
  },
  {
    icon: Globe,
    title: "Critical Resources",
    sdg: "9: industry, innovation & infrastructure",
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
              className="hover-lift group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-3 flex items-start gap-4">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <impact.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {impact.title}
                  </h3>
                  <p className="text-[0.7rem] font-medium text-primary/80">
                    {impact.sdg}
                  </p>
                </div>
              </div>
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
