import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { players } from "@/data/players";

export const Route = createFileRoute("/players/")({
  head: () => ({
    meta: [
      { title: "Cricket Player Profiles & Career Stats | Pitchside" },
      {
        name: "description",
        content:
          "Career records, batting and bowling averages and profiles for the world's leading cricketers across Test, ODI and T20I cricket.",
      },
      { property: "og:title", content: "Cricket Player Profiles & Career Stats | Pitchside" },
      {
        property: "og:description",
        content: "Profiles and career records for the world's leading cricketers.",
      },
    ],
  }),
  component: PlayersPage,
});

function PlayersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Players</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Career records for the players shaping the international game.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span className="block truncate text-sm font-semibold text-foreground">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.country} · {p.role}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
