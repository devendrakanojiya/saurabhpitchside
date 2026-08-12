import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
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
      { title: "Pitchside — Live Cricket Scores, News & Player Stats" },
      {
        name: "description",
        content:
          "Live cricket scores updated every 30 seconds, plus the latest cricket news, match analysis and player profiles across T20, ODI and Test cricket.",
      },
      { property: "og:title", content: "Pitchside — Live Cricket Scores & News" },
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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Live Cricket Scores
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {live.length} match{live.length === 1 ? "" : "es"} in play · refreshing every 30s
            </p>
          </div>
          <Link to="/series" className="text-xs font-semibold text-primary hover:underline">
            Fixtures & series →
          </Link>
        </div>

        {live.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {live.map((m) => (
              <LiveCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No matches are live right now. Check the fixtures for what's coming up.
          </p>
        )}

        <section className="mt-12">
          <div className="flex items-end justify-between gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Latest news</h2>
            <Link to="/news" className="text-xs font-semibold text-primary hover:underline">
              All stories →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {news.slice(0, 6).map((n) => (
              <Link
                key={n.id}
                to="/news/$storyId"
                params={{ storyId: n.id }}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring"
              >
                {n.image && (
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="h-32 w-full object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {n.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
