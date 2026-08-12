import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Scores" },
  { to: "/news", label: "News" },
  { to: "/players", label: "Players" },
  { to: "/series", label: "Series" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-sm font-black text-primary-foreground">
            P
          </span>
          <span className="text-base font-extrabold tracking-tight text-foreground">Pitchside</span>
        </Link>
        <nav className="flex items-center gap-4 overflow-x-auto text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
              className="shrink-0 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
