import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRightCircle, ExternalLink, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { sdgPosts, formatDate, getPreview } from "@/lib/sdgPosts";

const PAGE_SIZE = 15;

const formatTagLabel = (tag: string) =>
  tag
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const InsightsArchive = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showTags, setShowTags] = useState(false);

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          sdgPosts
            .flatMap((post) => post.tags ?? [])
            .map((tag) => tag.toLowerCase())
        )
      ).sort(),
    []
  );

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return sdgPosts.filter((post) => {
      const matchesTag =
        !activeTag || post.tags.map((t) => t.toLowerCase()).includes(activeTag);

      if (!matchesTag) return false;

      if (!term) return true;

      const haystack = [
        post.title,
        post.description,
        post.author,
        getPreview(post.content, 260),
        post.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [activeTag, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);
  return (
    <div className="min-h-screen bg-secondary/10">
      <header className="border-b bg-background">
        <div className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto flex items-center justify-between px-4 py-3 text-sm">
            <Link
              to="/"
              className="font-semibold tracking-wide text-foreground transition-colors hover:text-primary"
            >
              GEOSCIENCES for the future
            </Link>
            <nav className="flex items-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-primary/5 px-3 py-1 font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                Home
              </Link>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm">
                Insights archive
              </span>
            </nav>
          </div>
        </div>
        <div className="container mx-auto space-y-4 px-4 py-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Insights archive
            </p>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              FutureGeo insights
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Browse all posts and external articles collected for FutureGeo.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search insights by title, author, or topic…"
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {allTags.length > 0 && (
            <div className="flex flex-col items-start gap-2 md:items-end">
              <button
                type="button"
                onClick={() => setShowTags((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {showTags ? "Hide topics" : "Filter by topics"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${showTags ? "rotate-180" : ""}`}
                />
              </button>
              {showTags && (
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTag(null);
                      setPage(1);
                    }}
                    className={`rounded-full border px-3 py-1 transition-colors ${
                      activeTag === null
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/70 bg-background text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    All topics
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setActiveTag(tag === activeTag ? null : tag);
                        setPage(1);
                      }}
                      className={`rounded-full border px-3 py-1 transition-colors ${
                        activeTag === tag
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-background text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {formatTagLabel(tag)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {pagePosts.map((post) => {
            const formattedDate = formatDate(post.date);
            const preview = getPreview(post.content, 260);

            const card = (
              <Card className="hover-lift group flex h-full rounded-xl border border-border/80 bg-card/80 p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
                <div className="flex w-full flex-col gap-4 md:flex-row md:items-stretch">
                  {post.image && (
                    <div className="flex w-full md:w-40 md:shrink-0 md:justify-start">
                      <div className="w-full overflow-hidden rounded-lg bg-muted/60 aspect-[16/9] md:h-full md:w-40 md:aspect-auto">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 text-xs text-muted-foreground">
                        <div className="space-y-1">
                          <h2 className="text-base font-semibold text-foreground md:text-lg">
                            {post.title}
                          </h2>
                          <div className="flex items-center gap-3">
                            {post.authorImage && (
                              <img
                                src={post.authorImage}
                                alt={post.author ?? "Author"}
                                className="h-8 w-8 rounded-full object-cover"
                                loading="lazy"
                              />
                            )}
                            <div className="space-y-0.5">
                              {post.author && (
                                <p className="text-xs font-semibold text-muted-foreground">
                                  By {post.author}
                                </p>
                              )}
                              {formattedDate && (
                                <p className="text-[0.7rem] text-muted-foreground">
                                  {formattedDate}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {post.featured && (
                          <span className="rounded-full bg-primary/5 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-2">
                        {post.description && (
                          <p className="text-sm text-muted-foreground">
                            {post.description}
                          </p>
                        )}
                        {preview && (
                          <p className="text-sm text-muted-foreground">
                            {preview}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end text-primary">
                      {post.isExternal ? (
                        <ExternalLink className="h-4 w-4 opacity-80 transition-opacity group-hover:opacity-100" />
                      ) : (
                        <ArrowRightCircle className="h-5 w-5 opacity-80 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );

            if (post.isExternal && post.link) {
              return (
                <a
                  key={post.slug}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              );
            }

            return (
              <Link key={post.slug} to={`/insights/${post.slug}`} className="block">
                {card}
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <span className="font-semibold">
                {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filteredPosts.length)}
              </span>{" "}
              of <span className="font-semibold">{filteredPosts.length}</span> insights
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InsightsArchive;
