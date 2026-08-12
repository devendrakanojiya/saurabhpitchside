import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { MatchCard } from "@/components/MatchCard";
import { matches, type MatchStatus } from "@/data/matches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pitchside — Live Cricket Scores, Scorecards & Commentary" },
      {
        name: "description",
        content:
          "Follow live cricket scores, ball-by-ball commentary, full scorecards and upcoming fixtures across T20, ODI and Test cricket.",
      },
      { property: "og:title", content: "Pitchside — Live Cricket Scores" },
      {
        property: "og:description",
        content: "Live scores, scorecards and commentary for every international cricket match.",
      },
    ],
  }),
  component: Index,
});

const tabs: { key: MatchStatus; label: string }[] = [
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "recent", label: "Recent" },
];

function Index() {
  const [tab, setTab] = useState<MatchStatus>("live");
  const list = matches.filter((m) => m.status === tab);
  const liveCount = matches.filter((m) => m.status === "live").length;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Live Cricket Scores
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {liveCount} match{liveCount === 1 ? "" : "es"} in play right now.
        </p>

        <div className="mt-6 inline-flex rounded-lg border border-border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {list.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">No matches here.</p>
        )}
      </main>
    </div>
  );
}
