import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getPlayer } from "@/data/players";

export const Route = createFileRoute("/players/$playerId")({
  loader: ({ params }) => {
    const player = getPlayer(params.playerId);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Player unavailable | Pitchside" }, { name: "robots", content: "noindex" }],
      };
    }
    const { player } = loaderData;
    const title = `${player.name} — Profile, Career Stats & Records | Pitchside`;
    const description = `${player.name} of ${player.country}: ${player.role}, ${player.batting}. Full Test, ODI and T20I career records.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
      ],
    };
  },
  component: PlayerPage,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p className="text-sm text-muted-foreground">We don't have a profile for that player yet.</p>
      <Link to="/players" className="mt-3 inline-block text-sm font-semibold text-primary">
        All players
      </Link>
    </div>
  ),
});

function PlayerPage() {
  const { player } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/players" className="text-xs font-medium text-muted-foreground hover:text-foreground">
          ← Players
        </Link>

        <header className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-black text-primary-foreground">
            {player.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight text-foreground">{player.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {player.country} · {player.role}
            </p>
          </div>
        </header>

        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Batting", player.batting],
            ["Bowling", player.bowling],
            ["Born", player.born],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-card p-3">
              <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{player.bio}</p>

        <h2 className="mt-8 text-sm font-bold text-foreground">Career records</h2>
        <div className="mt-2 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Format</th>
                <th className="px-2 py-2 text-right font-medium">Mat</th>
                <th className="px-2 py-2 text-right font-medium">Runs</th>
                <th className="px-2 py-2 text-right font-medium">Avg</th>
                <th className="px-2 py-2 text-right font-medium">SR</th>
                <th className="px-3 py-2 text-right font-medium">Wkts</th>
              </tr>
            </thead>
            <tbody>
              {player.stats.map((s) => (
                <tr key={s.format} className="border-t border-border">
                  <td className="px-3 py-2 font-semibold text-foreground">{s.format}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{s.matches}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-foreground">{s.runs}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{s.average}</td>
                  <td className="px-2 py-2 text-right font-mono tabular-nums text-muted-foreground">{s.strikeRate}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-foreground">{s.wickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
