import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Pitchside" },
      {
        name: "description",
        content:
          "Pitchside is a fast, modern cricket companion built for fans who want live scores, breaking news and player stats in one place.",
      },
      { property: "og:title", content: "About Us | Pitchside" },
      {
        property: "og:description",
        content:
          "Learn about Pitchside, the cricket scores and news platform built for fans.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">About Pitchside</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Pitchside is a fast, modern cricket companion built for fans who want live scores,
            breaking news and player stats in one place. We aggregate match data and news from
            trusted public feeds so you never miss a moment of the action.
          </p>
          <p>
            Whether you are following a tense Test finish, tracking T20 league standings or catching
            up on the latest squad announcements, Pitchside keeps the essentials at your fingertips
            with a clean, broadcast-inspired interface.
          </p>
          <p>
            This is an independent project created for cricket lovers. We do not claim affiliation
            with any official cricket board, league or broadcaster.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
