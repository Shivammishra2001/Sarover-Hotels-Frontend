import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";

/** Phase 7 IA: renders a real, reachable (200 OK) page for burger-menu nodes
 * that have no ingested source content — e.g. Radisson Rewards, a
 * third-party loyalty program not present anywhere on the crawled source
 * site. Honest placeholder copy, not fabricated content; flagged
 * content_status=empty in data/qa-report/ia-coverage.csv. */
export function StubLanding({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <p className="mt-6 text-sm text-ink/50">More details coming soon.</p>
      </Container>
    </div>
  );
}
