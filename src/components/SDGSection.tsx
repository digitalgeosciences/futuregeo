import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { getFeaturedPosts, getPreview, formatDate, getInitials } from "@/lib/sdgPosts";

export const SDGSection = () => {
  const posts = getFeaturedPosts(4);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="futuregeo-insights" className="bg-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            FutureGeo insights
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Short reflections and stories on how geoscience supports a sustainable future.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => {
            const formattedDate = formatDate(post.date);

            const preview = getPreview(post.content);

            const cardInner = (
              <Card className="hover-lift group relative flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
                <div className="space-y-4">
                  {post.image && (
                    <div className="overflow-hidden rounded-lg bg-muted/60">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-40 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
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

                  {(post.author || formattedDate) && (
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
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
                        <div className="flex flex-col">
                          {post.author && (
                            <span className="text-xs font-semibold text-foreground md:text-sm">
                              {post.author}
                            </span>
                          )}
                          {formattedDate && (
                            <span className="text-[0.7rem]">
                              {formattedDate}
                            </span>
                          )}
                        </div>
                      </div>

                      {post.isExternal ? (
                        <ExternalLink className="h-4 w-4 text-primary opacity-80 transition-opacity group-hover:opacity-100" />
                      ) : (
                        <ArrowRightCircle className="h-5 w-5 text-primary opacity-80 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                  )}
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
                  className="group block h-full"
                >
                  {cardInner}
                </a>
              );
            }

            return (
              <Link key={post.slug} to={`/insights/${post.slug}`} className="group block h-full">
                {cardInner}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="inline-flex items-center gap-2 text-base font-semibold">
            <Link to="/insights">
              View more FutureGeo insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
