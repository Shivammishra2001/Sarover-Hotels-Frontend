import { Container } from "./Container";

interface Stat {
  value: string;
  label: string;
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="grid grid-cols-2 divide-x divide-border py-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-2 text-center">
            <p className="font-display text-3xl font-semibold text-navy sm:text-4xl">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-ink/60">{stat.label}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}
