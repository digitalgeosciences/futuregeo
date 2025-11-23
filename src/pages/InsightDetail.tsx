import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileDown, Linkedin, Link as LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { sdgPosts, formatDate, getInitials, ReactMarkdown } from "@/lib/sdgPosts";

const formatTagLabel = (tag: string) =>
  tag
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = sdgPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-secondary/10">
        <header className="border-b bg-background">
          <div className="container mx-auto space-y-4 px-4 py-8">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to archive
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Post not found</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              The post you are looking for could not be found. It may have been removed or renamed.
            </p>
          </div>
        </header>
        <Footer />
      </div>
    );
  }

  const formattedDate = formatDate(post.date);

  const handleExportPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // ignore clipboard errors
    }
  };

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
              <Link
                to="/insights"
                className="rounded-full bg-primary/5 px-3 py-1 font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                Insights archive
              </Link>
            </nav>
          </div>
        </div>
        <div className="container mx-auto space-y-3 px-4 py-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to archive
          </Link>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              FutureGeo insight
            </p>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-3">
                {(post.author || post.authorImage || formattedDate) && (
                  <div className="flex items-center gap-3">
                    {post.authorImage ? (
                      <img
                        src={post.authorImage}
                        alt={post.author ?? "Author"}
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {getInitials(post.author)}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {post.author && <span className="font-semibold text-foreground">By {post.author}</span>}
                      {formattedDate && <span className="text-muted-foreground">• {formattedDate}</span>}
                    </div>
                  </div>
                )}
                {post.isExternal && post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    View original article
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <button
                  type="button"
                  onClick={handleExportPdf}
                  aria-label="Export as PDF"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FileDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  aria-label="Share on LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary"
                  >
                    {formatTagLabel(tag)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="border border-border/80 bg-card/80 p-5 text-muted-foreground">
          <div className="prose max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetail;
