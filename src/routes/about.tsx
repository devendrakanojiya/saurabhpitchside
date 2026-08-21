import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Instagram, Send, Youtube, Mail, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Saurabhcricketx" },
      {
        name: "description",
        content:
          "Saurabhcricketx is an India-based digital cricket platform founded in 2017 by Saurabh Singh, providing live scores, news, and match updates.",
      },
      { property: "og:title", content: "About Us | Saurabhcricketx" },
      {
        property: "og:description",
        content:
          "Learn about Saurabhcricketx, founded by Saurabh Singh in Bareilly, Uttar Pradesh.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Header Section */}
        <div className="border-b border-border pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Founded 2017 · Bareilly, UP, India
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            About Saurabhcricketx
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Saurabhcricketx Expands Digital Cricket Coverage With Live Scores, News, and Match Updates.
          </p>
        </div>

        {/* Story & Overview Section */}
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Founded by <strong className="text-foreground">Saurabh Singh</strong> in 2017, Saurabhcricketx is an India-based digital cricket platform established to create a dedicated online destination for cricket enthusiasts to follow domestic and international cricket developments conveniently.
          </p>
          <p>
            Over the years, Saurabhcricketx has grown its presence across web and social media channels. We focus primarily on real-time cricket coverage, including live score information, breaking news, match updates, and player statistics presented in a clean, broadcast-inspired interface.
          </p>
          <p>
            Alongside traditional sports publications and television coverage, modern digital platforms provide fans with faster ways to stay connected. Saurabhcricketx operates within this evolving digital environment by maintaining dedicated channels across Telegram, Instagram, YouTube, and the web.
          </p>
        </div>

        {/* Official Channels Grid */}
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Official Digital Channels</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Follow Saurabhcricketx across our official platforms for instant updates:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a
              href="https://t.me/saurabhcricketx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary"
            >
              <Send className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Telegram</p>
                <p className="text-xs text-muted-foreground">@saurabhcricketx</p>
              </div>
            </a>

            <a
              href="https://instagram.com/saurabhcricketx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary"
            >
              <Instagram className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Instagram</p>
                <p className="text-xs text-muted-foreground">@saurabhcricketx</p>
              </div>
            </a>

            <a
              href="https://youtube.com/@saurabhcricketx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary"
            >
              <Youtube className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">YouTube</p>
                <p className="text-xs text-muted-foreground">Saurabhcricketx</p>
              </div>
            </a>
          </div>
        </section>

        {/* Headquarters & Press Contact */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Headquarters</span>
            </div>
            <address className="mt-3 text-xs not-italic leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Saurabhcricketx</strong><br />
              57, Samrat Ashok Nagar<br />
              Avas Vikas Colony<br />
              Bareilly, Uttar Pradesh<br />
              India – 243006
            </address>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <Mail className="h-4 w-4 text-primary" />
              <span>Press & Business Contact</span>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <p><strong className="text-foreground">Contact:</strong> Saurabh Singh (Founder & CEO)</p>
              <p className="flex items-center gap-1">
                <strong className="text-foreground">Email:</strong>
                <a href="mailto:saurahcricketx@gmail.com" className="text-primary hover:underline">
                  saurahcricketx@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <a href="https://saurabhcrcketx.sport" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  saurabhcrcketx.sport
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
