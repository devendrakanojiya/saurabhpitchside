import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { getMatch } from "@/data/matches";
import { fetchLiveMatches } from "@/lib/cricket.functions";

export const Route = createFileRoute("/match/$matchId")({
  loader: async ({ params }) => {
    const demo = getMatch(params.matchId);
    if (demo) return { demo, live: null };
    const live = (await fetchLiveMatches()).find((m) => m.id === params.matchId) ?? null;
    if (!live) throw notFound();
    return { demo: null, live };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Match unavailable | Pitchside" }, { name: "robots", content: "noindex" }],
      };
    }
    const { demo, live } = loaderData;
    const title = demo
      ? `${demo.teamA.team} vs ${demo.teamB.team} — ${demo.series} | Pitchside`
      : `${live!.teamA.name} vs ${live!.teamB.name} — Live Score | Pitchside`;
    const description = demo
      ? `${demo.note}. Live score, scorecard and commentary from ${demo.venue}.`
      : `Live score: ${live!.title}. Follow ball-by-ball progress on Pitchside.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MatchPage,
  errorComponent: ({ error }) => (
    <p role="alert" className="p-8 text-center text-sm text-muted-foreground">{error.message}</p>
  ),
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p className="text-sm text-muted-foreground">This match is no longer live.</p>
      <Link to="/" className="mt-3 inline-block text-sm font-semibold text-primary">
        Back to scores
      </Link>
    </div>
  ),
});

function MatchPage() {
  const { demo, live } = Route.useLoaderData();
  const [tab, setTab] = useState<"scorecard" | "commentary">("scorecard");

  if (live) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-foreground">
            ← All matches
          </Link>
          <section className="mt-4 rounded-xl border border-border bg-card p-5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-destructive">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
              Live
            </span>
            <h1 className="mt-3 text-lg font-bold tracking-tight text-foreground">
              {live.teamA.name} vs {live.teamB.name}
            </h1>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[live.teamA, live.teamB].map((t) => (
                <div key={t.name} className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{t.name}</p>
                  <p className="mt-1 font-mono text-xl font-bold tabular-nums text-foreground">
                    {t.score || "yet to bat"}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={live.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Full scorecard
            </a>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const match = demo!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-foreground">
          ← All matches
        </Link>

        <section className="mt-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                {match.teamA.team} vs {match.teamB.team}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {match.series} · {match.venue}
              </p>
            </div>
            {match.status === "live" && (
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                Live
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[match.teamA, match.teamB].map((inn) => (
              <div key={inn.short} className="rounded-lg bg-secondary/60 p-3">
                <p className="text-xs font-semibold text-muted-foreground">{inn.team}</p>
                <p className="mt-1 font-mono text-xl font-bold tabular-nums text-foreground">
                  {inn.runs}/{inn.wickets}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">({inn.overs} ov)</span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-primary">{match.note}</p>
        </section>

        <div className="mt-6 flex gap-1 border-b border-border">
          {(["scorecard", "commentary"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "scorecard" ? (
          <div className="mt-5 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-foreground">Batting</h2>
              <div className="mt-2 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-xs text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Batter</th>
                      <th className="px-2 py-2 text-right font-medium">R</th>
                      <th className="px-2 py-2 text-right font-medium">B</th>
                      <th className="px-2 py-2 text-right font-medium">4s</th>
                      <th className="px-3 py-2 text-right font-medium">6s</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(match.batters ?? []).map((b) => (
                      <tr key={b.name} className="border-t border-border">
                        <td className="px-3 py-2">
                          <span className="font-medium text-foreground">{b.name}</span>
                          <span className="block text-[11px] text-muted-foreground">
                            {b.out ?? "not out"}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-right font-mono font-semibold tabular-nums text-foreground">
                          {b.runs}
                        </td>
                        <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.balls}</td>
                        <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.fours}</td>
                        <td className="px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.sixes}</td>
                      </tr>
                    ))}
                    {!match.batters?.length && (
                      <tr>
                        <td colSpan={5} className="px-3 py-6 text-center text-xs text-muted-foreground">
                          Scorecard available once play begins.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {!!match.bowlers?.length && (
              <div>
                <h2 className="text-sm font-bold text-foreground">Bowling</h2>
                <div className="mt-2 overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60 text-xs text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Bowler</th>
                        <th className="px-2 py-2 text-right font-medium">O</th>
                        <th className="px-2 py-2 text-right font-medium">M</th>
                        <th className="px-2 py-2 text-right font-medium">R</th>
                        <th className="px-3 py-2 text-right font-medium">W</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.bowlers.map((b) => (
                        <tr key={b.name} className="border-t border-border">
                          <td className="px-3 py-2 font-medium text-foreground">{b.name}</td>
                          <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.overs}</td>
                          <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.maidens}</td>
                          <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{b.runs}</td>
                          <td className="px-3 py-2 text-right font-mono font-semibold tabular-nums text-foreground">
                            {b.wickets}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {(match.commentary ?? []).map((c, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                <span className="font-mono text-xs font-bold tabular-nums text-primary">{c.over}</span>
                <span className="text-sm text-foreground">{c.text}</span>
              </li>
            ))}
            {!match.commentary?.length && (
              <li className="py-8 text-center text-xs text-muted-foreground">
                Commentary starts with the first ball.
              </li>
            )}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
