import { Link } from "@tanstack/react-router";
import type { Match, Innings } from "@/data/matches";

function ScoreLine({ innings, dim }: { innings: Innings; dim?: boolean }) {
  const played = innings.overs !== "0.0";
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
          {innings.short}
        </span>
        <span className={`text-sm font-medium ${dim ? "text-muted-foreground" : "text-foreground"}`}>
          {innings.team}
        </span>
      </div>
      {played ? (
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
          {innings.runs}
          <span className="text-muted-foreground">/{innings.wickets}</span>
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">({innings.overs})</span>
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">yet to bat</span>
      )}
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  return (
    <Link
      to="/match/$matchId"
      params={{ matchId: match.id }}
      className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">{match.series}</p>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground/70">{match.venue}</p>
        </div>
        {match.status === "live" ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            Live
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
            {match.format}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2.5">
        <ScoreLine innings={match.teamA} />
        <ScoreLine innings={match.teamB} dim />
      </div>

      <p
        className={`mt-3 text-xs font-semibold ${
          match.status === "live" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {match.note}
      </p>
    </Link>
  );
}
