import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { fetchNews } from "@/lib/cricket.functions";

const newsQuery = queryOptions({
  queryKey: ["news"],
  queryFn: () => fetchNews(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/news/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(newsQuery),
  head: () => ({
    meta: [
      { title: "Latest Cricket News & Updates | Pitchside" },
      {
        name: "description",
        content:
          "Breaking cricket news, squad announcements, injury updates and match reports from around the world, updated through the day.",
      },
      { property: "og:title", content: "Latest Cricket News & Updates | Pitchside" },
      {
        property: "og:description",
        content: "Breaking cricket news, match reports and analysis updated through the day.",
      },
    ],
  }),
  component: NewsPage,
  errorComponent: ({ error }) => (
    <p role="alert" className="p-8 text-center text-sm text-muted-foreground">{error.message}</p>
  ),
  notFoundComponent: () => <p className="p-8 text-center text-sm">No stories found.</p>,
});

function NewsPage() {
  const { data: news } = useSuspenseQuery(newsQuery);
  const [lead, ...rest] = news;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Cricket news & updates
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Fresh from the global cricket wire.</p>

        {lead && (
          <Link
            to="/news/$storyId"
            params={{ storyId: lead.id }}
            className="group mt-6 grid overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring sm:grid-cols-2"
          >
            {lead.image && (
              <img src={lead.image} alt={lead.title} className="h-56 w-full object-cover sm:h-full" />
            )}
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
                Top story
              </span>
              <h2 className="mt-2 text-xl font-bold leading-tight text-foreground group-hover:text-primary">
                {lead.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{lead.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground/70">{lead.publishedAt}</p>
            </div>
          </Link>
        )}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <li key={n.id}>
              <Link
                to="/news/$storyId"
                params={{ storyId: n.id }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring"
              >
                {n.image && (
                  <img src={n.image} alt={n.title} loading="lazy" className="h-36 w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs text-muted-foreground">{n.summary}</p>
                  <p className="mt-auto pt-3 text-[11px] text-muted-foreground/70">{n.publishedAt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
