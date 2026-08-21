import { Link } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";

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
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand & Bio */}
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex items-center gap-2">
              <img
                src="public\saurabh.jpg"
                alt="Saurabhcricketx Logo"
                className="h-9 w-9 rounded-xl object-cover shadow-md shadow-primary/20 transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-black tracking-tight text-foreground">
                Saurabhcricketx
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Live scores, match updates, news, and player statistics built for cricket fans.
            </p>
          </div>

          {/* Social Links & Navigation */}
          <div className="flex flex-col items-center gap-6 md:items-end">
            {/* Social Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/saurabhcricketx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href="https://instagram.com/saurabhcricketx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {footerLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="transition-colors hover:text-foreground"
                  activeProps={{ className: "font-semibold text-foreground" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-8 border-t border-border/50 pt-6 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saurabhcricketx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
