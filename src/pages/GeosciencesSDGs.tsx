import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

interface Initiative {
  category: string;
  title: string;
  description: string;
  url: string;
}

const GeosciencesSDGs = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/geosciences-sdgs.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load initiatives.");
        }
        return res.json();
      })
      .then((data: Initiative[]) => {
        setInitiatives(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load initiatives.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-secondary/10">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="space-y-4">
            <p className="uppercase tracking-wide text-xs text-primary font-semibold">Resource library</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Geosciences & the UN Sustainable Development Goals
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A curated list of global initiatives, data hubs, and collaborations demonstrating how geoscientists power
              sustainable development. Explore the programs below to connect with partners, resources, and funding
              opportunities.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {loading && (
          <div className="text-center text-muted-foreground text-lg animate-pulse">Loading initiatives…</div>
        )}

        {error && (
          <div className="text-center text-destructive text-lg">
            {error} Please refresh the page or try again later.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative) => (
              <Card
                key={initiative.title}
                className="p-6 h-full flex flex-col justify-between border hover:border-primary transition-colors"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {initiative.category}
                  </p>
                  <h3 className="text-xl font-bold text-foreground">{initiative.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{initiative.description}</p>
                </div>
                <a
                  href={initiative.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Visit Initiative
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GeosciencesSDGs;
