import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { Sparkles, FlaskConical, Activity, BatteryCharging, CloudSun, Users, Cpu } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card } from "./ui/card";

interface DisciplineField {
  category: string;
  field: string;
  description: string;
  application: string;
  futureImpact: string;
  color: string;
}

interface GroupedDisciplines {
  [category: string]: {
    fields: DisciplineField[];
    color: string;
  };
}

type CategoryIcon = typeof Sparkles;

const categoryIcons: Record<string, CategoryIcon> = {
  "Fundamental Sciences": FlaskConical,
  "Earth Dynamics & Hazards": Activity,
  "Resources & Energy": BatteryCharging,
  "Environmental & Climate": CloudSun,
  "Applied & Society": Users,
  "Emerging & Digital Fields": Cpu,
};

const getCategoryIcon = (category: string): CategoryIcon => categoryIcons[category] ?? Sparkles;

export const Disciplines = () => {
  const [disciplines, setDisciplines] = useState<GroupedDisciplines>({});
  const [loading, setLoading] = useState(true);
  const [openFields, setOpenFields] = useState<Record<string, string | undefined>>({});
  const collapseTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/+$/, "");

    fetch(`${baseUrl}/data/geoscience-specializations.csv`, { cache: "no-store" })
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<DisciplineField>(csvText, {
          header: true,
          complete: (results) => {
            const grouped: GroupedDisciplines = {};
            results.data.forEach((row) => {
              if (row.category && row.field) {
                if (!grouped[row.category]) {
                  grouped[row.category] = {
                    fields: [],
                    color: row.color,
                  };
                }
                grouped[row.category].fields.push(row);
              }
            });
            setDisciplines(grouped);
            setLoading(false);
          },
        });
      });
  }, []);

  useEffect(() => {
    return () => {
      Object.values(collapseTimers.current).forEach((timer) => clearTimeout(timer));
      collapseTimers.current = {};
    };
  }, []);

  const handleAccordionChange = (category: string, value: string | undefined) => {
    setOpenFields((prev) => {
      const next = { ...prev };
      if (value) {
        next[category] = value;
      } else {
        delete next[category];
      }
      return next;
    });

    if (collapseTimers.current[category]) {
      clearTimeout(collapseTimers.current[category]);
      delete collapseTimers.current[category];
    }

    if (value) {
      collapseTimers.current[category] = setTimeout(() => {
        setOpenFields((prev) => {
          if (prev[category] !== value) {
            return prev;
          }
          const next = { ...prev };
          delete next[category];
          return next;
        });
        delete collapseTimers.current[category];
      }, 15000);
    }
  };

  if (loading) {
    return (
      <section id="geoscience-specializations" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-xl text-primary">Loading specializations...</div>
        </div>
      </section>
    );
  }

  const categories = Object.entries(disciplines);

  return (
    <section id="geoscience-specializations" className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Geosciences</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Click any field to explore how it contributes to solving future challenges. Let us know if you want to add more.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map(([category, data]) => {
            const Icon = getCategoryIcon(category);

            return (
              <Card key={category} className="overflow-hidden border transition-all duration-300 hover:shadow-lg">
                <div className="border-b bg-primary/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category}</h3>
                  </div>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={openFields[category] ?? ""}
                  onValueChange={(value) => handleAccordionChange(category, value)}
                >
                  {data.fields.map((field, index) => (
                    <AccordionItem key={index} value={`${category}-${index}`} className="border-b last:border-0">
                      <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-secondary/30">
                        <span className="font-semibold text-foreground">{field.field}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                          <div>
                            <p className="mb-1 font-semibold text-primary">What they do:</p>
                            <p className="text-muted-foreground">{field.description}</p>
                          </div>
                          <div className="border-top border-primary/10 pt-2">
                            <p className="mb-1 font-semibold text-primary">Real-world application:</p>
                            <p className="text-muted-foreground">{field.application}</p>
                          </div>
                          <div className="border-top border-primary/10 pt-2">
                            <p className="mb-1 font-semibold text-primary">Future impact:</p>
                            <p className="text-muted-foreground">{field.futureImpact}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

