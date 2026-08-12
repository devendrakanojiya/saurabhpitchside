import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Pitchside" },
      {
        name: "description",
        content:
          "Read the Pitchside privacy policy to understand what data we collect, how we use it and your rights as a user.",
      },
      { property: "og:title", content: "Privacy Policy | Pitchside" },
      {
        property: "og:description",
        content:
          "Pitchside privacy policy: what we collect, how we use it and your rights.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Information we collect</h2>
            <p className="mt-2">
              Pitchside does not require an account to browse live scores, news or player profiles.
              We may collect anonymous usage data through our hosting and analytics providers to
              understand how visitors use the site and to improve performance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. How we use information</h2>
            <p className="mt-2">
              Any data collected is used solely to operate, maintain and improve Pitchside. We do not
              sell personal information to third parties. We do not use your data for targeted
              advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Third-party content</h2>
            <p className="mt-2">
              Pitchside displays match information and news sourced from public third-party feeds.
              These sources may use their own cookies or tracking technologies. We are not
              responsible for the privacy practices of external websites linked from Pitchside.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Cookies</h2>
            <p className="mt-2">
              We use only essential cookies required for the site to function. You can control or
              disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Your rights</h2>
            <p className="mt-2">
              Depending on your location, you may have rights to access, correct or delete personal
              information we hold about you. Contact us using the details below to make a request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Changes to this policy</h2>
            <p className="mt-2">
              We may update this privacy policy from time to time. Changes will be posted on this
              page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Contact us</h2>
            <p className="mt-2">
              If you have questions about this privacy policy or how we handle data, please reach
              out via the project contact channel.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
