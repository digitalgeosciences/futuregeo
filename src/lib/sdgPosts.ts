import ReactMarkdown from "react-markdown";

export type FrontMatter = {
  title?: string;
  description?: string;
  link?: string;
  author?: string;
  authorImage?: string;
  date?: string;
  image?: string;
  featured?: string;
  tags?: string;
};

export type MarkdownPost = {
  slug: string;
  content: string;
  isExternal: boolean;
  title: string;
  description?: string;
  link?: string;
  author?: string;
  authorImage?: string;
  date?: string;
  image?: string;
  featured: boolean;
  tags: string[];
};

const markdownFiles = import.meta.glob<string>("../content/sdg-posts/*.md", {
  as: "raw",
  eager: true,
});

export function parseMarkdown(raw: string): { frontMatter: FrontMatter; body: string } {
  if (!raw.startsWith("---")) {
    return { frontMatter: {}, body: raw.trim() };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { frontMatter: {}, body: raw.trim() };
  }

  const fmRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();

  const frontMatter: FrontMatter = {};

  for (const line of fmRaw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const [key, ...rest] = trimmed.split(":") as [keyof FrontMatter | string, ...string[]];
    if (!key || rest.length === 0) continue;

    const valueRaw = rest.join(":").trim();
    const value = valueRaw.replace(/^["']|["']$/g, "");

    if (
      key === "title" ||
      key === "description" ||
      key === "link" ||
      key === "author" ||
      key === "authorImage" ||
      key === "date" ||
      key === "image" ||
      key === "featured" ||
      key === "tags"
    ) {
      frontMatter[key as keyof FrontMatter] = value;
    }
  }

  return { frontMatter, body };
}

export const sdgPosts: MarkdownPost[] = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()?.replace(".md", "") ?? path;
    const { frontMatter, body } = parseMarkdown(raw);
    const link = frontMatter.link;

    const featured = frontMatter.featured?.toLowerCase() === "true";

    const tags: string[] = frontMatter.tags
      ? frontMatter.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    return {
      slug,
      title: frontMatter.title ?? slug,
      description: frontMatter.description,
      link,
      author: frontMatter.author,
      authorImage: frontMatter.authorImage,
      date: frontMatter.date,
      image: frontMatter.image,
      content: body,
      featured,
      isExternal: typeof link === "string" && /^https?:\/\//i.test(link),
      tags,
    };
  })
  // Newest (by filename) first
  .sort((a, b) => b.slug.localeCompare(a.slug));

export function getPreview(markdown: string, maxChars = 220): string {
  // Strip inline image markdown so it doesn't show up as raw syntax in previews
  const withoutImages = markdown.replace(/!\[[^\]]*]\([^)]+\)/g, "");

  const paragraphs = withoutImages.split(/\n\s*\n/);
  const raw = paragraphs[0] ?? "";

  if (raw.length <= maxChars) {
    return raw;
  }

  const truncated = raw.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  const safe = lastSpace > 40 ? truncated.slice(0, lastSpace) : truncated;

  return `${safe.trimEnd()}…`;
}

export function formatDate(dateStr?: string): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name?: string): string {
  if (!name) return "FG";
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "FG";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function getFeaturedPosts(limit?: number): MarkdownPost[] {
  const featured = sdgPosts.filter((post) => post.featured);
  const base = featured.length > 0 ? featured : sdgPosts;
  return typeof limit === "number" ? base.slice(0, limit) : base;
}

// Re-export ReactMarkdown to keep imports tidy where we need full rendering
export { ReactMarkdown };
