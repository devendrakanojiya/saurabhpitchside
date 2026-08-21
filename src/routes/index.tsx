import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { fetchLiveMatches, fetchNews } from "@/lib/cricket.functions";
import type { LiveMatch } from "@/lib/cricket-parse";

const liveQuery = queryOptions({
  queryKey: ["live-matches"],
  queryFn: () => fetchLiveMatches(),
  refetchInterval: 30_000,
  staleTime: 20_000,
});

const newsQuery = queryOptions({
  queryKey: ["news"],
  queryFn: () => fetchNews(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(liveQuery),
      context.queryClient.ensureQueryData(newsQuery),
    ]);
  },
  head: () => ({
    meta: [
      { title: "Saurabhcricketx — Home | Live Cricket Scores & News" },
      {
        name: "description",
        content:
          "Your cricket home: live scores updated every 30 seconds, breaking news, match analysis and player stats across T20, ODI and Test cricket.",
      },
      { property: "og:title", content: "Saurabhcricketx — Home | Live Cricket Scores & News" },
      {
        property: "og:description",
        content: "Live scores, breaking cricket news and player stats, all in one place.",
      },
    ],
  }),
  component: Index,
  errorComponent: ({ error }) => (
    <p role="alert" className="p-8 text-center text-sm text-muted-foreground">
      {error.message}
    </p>
  ),
});

function LiveCard({ match }: { match: LiveMatch }) {
  return (
    <Link
      to="/match/$matchId"
      params={{ matchId: match.id }}
      className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-destructive">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
          Live
        </span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Scorecard →</span>
      </div>
      <div className="mt-3 space-y-2.5">
        {(["a", "b"] as const).map((side) => {
          const team = side === "a" ? match.teamA : match.teamB;
          const batting = match.battingFirstLive === side;
          return (
            <div key={side} className="flex items-center justify-between gap-3">
              <span
                className={`truncate text-sm ${batting ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              >
                {batting && <span className="mr-1 text-primary">●</span>}
                {team.name}
              </span>
              <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-foreground">
                {team.score || "—"}
              </span>
            </div>
          );
        })}
      </div>
    </Link>
  );
}

function Index() {
  const { data: live } = useSuspenseQuery(liveQuery);
  const { data: news } = useSuspenseQuery(newsQuery);

  const displayedMatches = live.slice(0, 8);
  const [lead, ...rest] = news;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Live scores */}
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Live Cricket Scores
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {displayedMatches.length} match{displayedMatches.length === 1 ? "" : "es"} in play · refreshing every 30s
            </p>
          </div>
          <Link to="/series" className="text-xs font-semibold text-primary hover:underline">
            Fixtures & series →
          </Link>
        </div>

        {displayedMatches.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {displayedMatches.map((m) => (
              <LiveCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No matches are live right now. Check the fixtures for what's coming up.
          </p>
        )}

        {/* News feed */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Latest cricket news</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Fresh updates from the global cricket wire.</p>

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
                <span className="text-[10px] font-bold uppercase tracking-wide text-primary">Top story</span>
                <h3 className="mt-2 text-xl font-bold leading-tight text-foreground group-hover:text-primary">
                  {lead.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{lead.summary}</p>
                <p className="mt-3 text-xs text-muted-foreground/70">{lead.publishedAt}</p>
              </div>
            </Link>
          )}

          {rest.length > 0 ? (
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
          ) : (
            <p className="mt-6 rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No news stories available right now.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
