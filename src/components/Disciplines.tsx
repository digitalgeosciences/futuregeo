import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
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
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-primary text-xl">Loading specializations...</div>
        </div>
      </section>
    );
  }

  const categories = Object.entries(disciplines);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Geoscience Specializations</h2>
          <p className="text-muted-foreground text-sm mt-4">
            Click any field to explore how it contributes to solving future challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {categories.map(([category, data]) => (
            <Card key={category} className="border overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6 border-b bg-primary/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
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
                    <AccordionTrigger className="px-6 py-4 hover:bg-secondary/30 transition-colors text-left">
                      <span className="font-semibold text-foreground">{field.field}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-3 text-sm rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div>
                          <p className="font-semibold text-primary mb-1">What they do:</p>
                          <p className="text-muted-foreground">{field.description}</p>
                        </div>
                        <div className="pt-2 border-top border-primary/10">
                          <p className="font-semibold text-primary mb-1">Real-world application:</p>
                          <p className="text-muted-foreground">{field.application}</p>
                        </div>
                        <div className="pt-2 border-top border-primary/10">
                          <p className="font-semibold text-primary mb-1">Future impact:</p>
                          <p className="text-muted-foreground">{field.futureImpact}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

