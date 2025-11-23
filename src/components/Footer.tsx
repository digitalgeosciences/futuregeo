export const Footer = () => {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              <span className="text-primary drop-shadow-lg">GEOSCIENCES</span> FOR THE FUTURE
            </h3>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Highlighting the vital role of geoscientists in achieving the United Nations Sustainable Development Goals.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered and Maintained by{" "}
            <a
              href="https://digitalgeosciences.com/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted"
            >
              Digital Geosciences
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
