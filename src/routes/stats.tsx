import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { matches } from "@/data/matches";
import { players } from "@/data/players";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Cricket Stats: Series, Fixtures & Player Records | Pitchside" },
      {
        name: "description",
        content:
          "Ongoing and upcoming international series plus career records, batting and bowling averages for the world's leading cricketers.",
      },
      { property: "og:title", content: "Cricket Stats: Series, Fixtures & Player Records" },
      {
        property: "og:description",
        content: "Series fixtures, venues and full player career records in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  const seriesList = Array.from(new Set(matches.map((m) => m.series))).map((name) => {
    const m = matches.find((x) => x.series === name)!;
    return { name, format: m.format, venue: m.venue, startsAt: m.startsAt, status: m.status };
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Stats</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Series fixtures and career records from across the international game.
        </p>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Series &amp; Fixtures
          </h2>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
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
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Player Records
          </h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((p) => (
              <li key={p.id}>
                <Link
                  to="/players/$playerId"
                  params={{ playerId: p.id }}
                  className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {p.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {p.country} · {p.role}
                    </span>
                  </span>
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
