import { Mail, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground md:text-xl">
              <span className="text-primary drop-shadow-lg">GEOSCIENCES</span> for the future
            </h3>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Highlighting the vital role of geoscientists in achieving the United Nations Sustainable Development Goals.
            </p>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>
                Powered and maintained by{" "}
                <a
                  href="https://digitalgeosciences.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted"
                >
                  Digital Geosciences
                </a>
              </span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-primary" />
              <span>Contact: info@digitalgeosciences.com</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
