import type { StatsBlock as StatsBlockType } from "@/types";

export function StatsBlock({ block }: { block: StatsBlockType }) {
  const items = block.items ?? [];
  if (items.length === 0) return null;

  return (
    <div>
      {block.title && <h3 className="font-display text-xl font-semibold text-navy">{block.title}</h3>}
      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="text-center">
            <p className="font-display text-3xl font-semibold text-accent">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
