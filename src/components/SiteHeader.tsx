import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-sm font-black text-primary-foreground">
            P
          </span>
          <span className="text-base font-extrabold tracking-tight text-foreground">
            Pitchside
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <Link to="/" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">
            Scores
          </Link>
          <Link
            to="/series"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            Series
          </Link>
        </nav>
      </div>
    </header>
  );
}
