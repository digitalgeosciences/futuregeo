import { Card } from "./ui/card";
import { Droplets, Zap, Leaf, Mountain, Users, Globe } from "lucide-react";

const impacts = [
  {
    icon: Droplets,
    title: "Clean Water Access",
    description: "Hydrogeologists locate and protect groundwater resources, ensuring billions have access to safe drinking water in water-stressed regions.",
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    description: "Geothermal specialists and mineral geologists enable the transition to clean energy through resource identification and sustainable extraction.",
  },
  {
    icon: Leaf,
    title: "Climate Solutions",
    description: "Carbon capture geologists store CO₂ underground permanently, while palaeoclimatologists reconstruct past climates to validate current models.",
  },
  {
    icon: Mountain,
    title: "Natural Hazard Protection",
    description: "Seismologists and volcanologists provide early warnings for earthquakes and eruptions, saving thousands of lives annually.",
  },
  {
    icon: Users,
    title: "Public Health",
    description: "Medical geologists identify disease sources linked to geology, from arsenic in groundwater to radon exposure, preventing health crises.",
  },
  {
    icon: Globe,
    title: "Critical Resources",
    description: "Mining and economic geologists secure supplies of lithium, cobalt, and rare earths essential for technology and renewable energy infrastructure.",
  },
];

export const GeoscienceImpact = () => {
  return (
    <section id="geoscience-impact" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Impact on Global Challenges
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How geoscience expertise directly addresses critical issues facing humanity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className="hover-lift p-6 group border hover:border-primary transition-all duration-300"
            >
              <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <impact.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {impact.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {impact.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 bg-primary/5 border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Expert Knowledge for Sustainable Development
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              From preventing disasters to enabling clean energy, geoscientists provide the essential expertise needed to achieve the UN Sustainable Development Goals and build a resilient future for all.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
