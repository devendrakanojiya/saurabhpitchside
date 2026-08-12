import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { matches } from "@/data/matches";

export const Route = createFileRoute("/series")({
  head: () => ({
    meta: [
      { title: "Cricket Series & Fixtures | Pitchside" },
      {
        name: "description",
        content:
          "Browse ongoing and upcoming international cricket series with venues, formats and match schedules.",
      },
      { property: "og:title", content: "Cricket Series & Fixtures | Pitchside" },
      {
        property: "og:description",
        content: "Ongoing and upcoming international cricket series, fixtures and venues.",
      },
    ],
  }),
  component: SeriesPage,
});

function SeriesPage() {
  const seriesList = Array.from(new Set(matches.map((m) => m.series))).map((name) => {
    const m = matches.find((x) => x.series === name)!;
    return { name, format: m.format, venue: m.venue, startsAt: m.startsAt, status: m.status };
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Series</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ongoing and upcoming international cricket.
        </p>
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {seriesList.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {s.venue} · {s.startsAt}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
                {s.format}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
