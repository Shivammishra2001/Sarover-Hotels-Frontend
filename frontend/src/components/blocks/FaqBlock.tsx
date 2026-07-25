import type { FaqBlock as FaqBlockType } from "@/types";

export function FaqBlock({ block }: { block: FaqBlockType }) {
  const items = block.items ?? [];
  if (items.length === 0) return null;

  return (
    <div>
      {block.title && <h3 className="font-display text-xl font-semibold text-navy">{block.title}</h3>}
      <dl className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="py-4">
            <dt className="font-semibold text-navy">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink/70">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
