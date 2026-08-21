import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { fetchNews } from "@/lib/cricket.functions";

export const Route = createFileRoute("/news/$storyId")({
  loader: async ({ params }) => {
    const news = await fetchNews();
    const story = news.find((n) => n.id === params.storyId);
    if (!story) throw notFound();
    const related = news.filter((n) => n.id !== story.id).slice(0, 4);
    return { story, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story unavailable | Pitchside" }, { name: "robots", content: "noindex" }],
      };
    }
    const { story } = loaderData;
    const meta = [
      { title: `${story.title} | Pitchside` },
      { name: "description", content: story.summary.slice(0, 155) },
      { property: "og:title", content: story.title },
      { property: "og:description", content: story.summary.slice(0, 155) },
      { property: "og:type", content: "article" },
    ];
    if (story.image?.startsWith("https://")) {
      meta.push(
        { property: "og:image", content: story.image },
        { name: "twitter:image", content: story.image },
      );
    }
    return { meta };
  },
  component: StoryPage,
  errorComponent: ({ error }) => (
    <p role="alert" className="p-8 text-center text-sm text-muted-foreground">{error.message}</p>
  ),
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p className="text-sm text-muted-foreground">That story is no longer in the feed.</p>
      <Link to="/" className="mt-3 inline-block text-sm font-semibold text-primary">
        Back to home
      </Link>
    </div>
  ),
});

function StoryPage() {
  const { story, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-foreground">
          ← Home
        </Link>

        <article className="mt-4">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground">
            {story.title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">{story.publishedAt}</p>
          {story.image && (
            <img
              src={story.image}
              alt={story.title}
              className="mt-5 w-full rounded-xl border border-border object-cover"
            />
          )}
          <p className="mt-5 text-base leading-relaxed text-foreground">{story.summary}</p>
          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the full report
          </a>
        </article>

        <section className="mt-12 border-t border-border pt-6">
          <h2 className="text-sm font-bold text-foreground">More updates</h2>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {related.map((n) => (
              <li key={n.id}>
                <Link
                  to="/news/$storyId"
                  params={{ storyId: n.id }}
                  className="block p-4 transition-colors hover:bg-secondary/50"
                >
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{n.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
