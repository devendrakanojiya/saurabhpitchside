import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
  { to: "/series", label: "Series" },
  { to: "/news", label: "News" },
  { to: "/players", label: "Players" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-sm font-black text-primary-foreground">
              P
            </span>
            <span className="text-base font-extrabold tracking-tight text-foreground">Pitchside</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {footerLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} Pitchside. Live scores, news and player stats for cricket fans.
        </p>
      </div>
    </footer>
  );
}
