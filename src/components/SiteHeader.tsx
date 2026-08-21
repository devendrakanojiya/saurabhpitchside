import { Link } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";

const links = [
  { to: "/", label: "Scores" },
  { to: "/series", label: "Series" },
  { to: "/news", label: "News" },
  { to: "/players", label: "Players" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">

        {/* Brand Logo & Live Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-2.5">
            <img
              src="public\saurabh.jpg"
              alt="Saurabhcricketx Logo"
              className="h-9 w-9 rounded-xl object-cover shadow-md shadow-primary/20 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                Saurabhcricketx
              </span>
              <span className="-mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Cricket Hub
              </span>
            </div>
          </Link>

          {/* Live Pulsing Badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            <span>Live Updates</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 overflow-x-auto text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className: "bg-secondary font-semibold text-primary shadow-sm",
              }}
              className="shrink-0 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:bg-secondary/60 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Quick Social Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://t.me/saurabhcricketx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram Channel"
            className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Send className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com/saurabhcricketx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

      </div>
    </header>
  );
}
