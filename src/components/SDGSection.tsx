import { Link } from "react-router-dom";
import { Card } from "./ui/card";

const sdgGoals = [
  {
    number: 1,
    title: "No Poverty",
    color: "#E5243B",
    hover: "Resource mapping and sustainable mineral development improve livelihoods and reduce poverty.",
  },
  {
    number: 2,
    title: "Zero Hunger",
    color: "#DDA63A",
    hover: "Soil science and groundwater management support sustainable agriculture and food security.",
  },
  {
    number: 3,
    title: "Good Health",
    color: "#4C9F38",
    hover: "Environmental geoscience ensures safe drinking water and reduces exposure to natural hazards.",
  },
  {
    number: 4,
    title: "Quality Education",
    color: "#C5192D",
    hover: "Geoscience education promotes climate literacy and sustainable resource awareness.",
  },
  {
    number: 5,
    title: "Gender Equality",
    color: "#FF3A21",
    hover: "Inclusive geoscience initiatives empower women in environmental and earth sciences.",
  },
  {
    number: 6,
    title: "Clean Water",
    color: "#26BDE2",
    hover: "Hydrogeology ensures access to clean groundwater and sustainable water systems.",
  },
  {
    number: 7,
    title: "Affordable Energy",
    color: "#FCC30B",
    hover: "Geothermal, solar, and wind resource mapping drive renewable energy development.",
  },
  {
    number: 8,
    title: "Decent Work",
    color: "#A21942",
    hover: "Sustainable mineral exploration and georesource industries create skilled employment.",
  },
  {
    number: 9,
    title: "Innovation",
    color: "#FD6925",
    hover: "Geotechnical expertise supports resilient infrastructure and sustainable urban growth.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    hover: "Equitable access to natural resources fosters inclusive economic opportunities.",
  },
  {
    number: 11,
    title: "Sustainable Cities",
    color: "#FD9D24",
    hover: "Urban geology guides safe land use, reducing risk from natural hazards.",
  },
  {
    number: 12,
    title: "Responsible Consumption",
    color: "#BF8B2E",
    hover: "Circular economy strategies rely on resource tracking and lifecycle analysis by geoscientists.",
  },
  {
    number: 13,
    title: "Climate Action",
    color: "#3F7E44",
    hover: "Climate modeling, carbon sequestration, and monitoring underpin mitigation and adaptation efforts.",
  },
  {
    number: 14,
    title: "Life Below Water",
    color: "#0A97D9",
    hover: "Marine geoscience protects ocean ecosystems and sustainable fisheries.",
  },
  {
    number: 15,
    title: "Life on Land",
    color: "#56C02B",
    hover: "Geoscientists safeguard biodiversity through land restoration and soil conservation.",
  },
  {
    number: 16,
    title: "Peace & Justice",
    color: "#00689D",
    hover: "Transparent resource governance builds stability and environmental justice.",
  },
  {
    number: 17,
    title: "Partnerships",
    color: "#19486A",
    hover: "Global geoscience collaborations enable data sharing and sustainable innovation.",
  },
];

export const SDGSection = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            UN Sustainable Development Goals
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Geoscience expertise directly supports achieving these 17 global goals for a sustainable future
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {sdgGoals.map((goal) => (
            <a
              key={goal.number}
              href={`https://sdgs.un.org/goals/goal${goal.number}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn more about SDG ${goal.number}: ${goal.title}`}
              title={goal.hover}
              className="block"
            >
              <Card className="hover-lift aspect-square p-4 flex flex-col items-center justify-center text-center gap-2 group border hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: goal.color }}
                ></div>
                <img
                  src={`/images/sdg/${goal.number}.png`}
                  alt={`SDG ${goal.number}: ${goal.title}`}
                  className="w-full h-auto object-contain relative z-10"
                  loading="lazy"
                />
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/geosciences-sdgs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-foreground font-semibold"
          >
            Learn More about Geosciences and the SDGs (a new page compiling link to every initiative)
            <span className="text-primary group-hover:text-primary-foreground">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
