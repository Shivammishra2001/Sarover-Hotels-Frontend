import { humanizeEnum } from "@/lib/utils";
import type { Banquet } from "@/types";

const CAPACITY_COLUMNS: Array<{ key: keyof Banquet; label: string }> = [
  { key: "theatre_capacity", label: "Theatre" },
  { key: "classroom_capacity", label: "Classroom" },
  { key: "ushape_capacity", label: "U-Shape" },
  { key: "cluster_capacity", label: "Cluster" },
  { key: "round_table_capacity", label: "Round Table" },
  { key: "floating_capacity", label: "Floating" },
];

export function BanquetTable({
  banquets,
  onEnquire,
}: {
  banquets: Banquet[];
  onEnquire?: (banquet: Banquet) => void;
}) {
  if (banquets.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-ink/60">
          <tr>
            <th className="px-4 py-3">Venue</th>
            <th className="px-4 py-3">Event Type</th>
            <th className="px-4 py-3">Area</th>
            {CAPACITY_COLUMNS.map((col) => (
              <th key={col.key} className="px-4 py-3">
                {col.label}
              </th>
            ))}
            {onEnquire && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {banquets.map((banquet) => (
            <tr key={banquet.documentId}>
              <td className="px-4 py-3 font-semibold text-navy">{banquet.name}</td>
              <td className="px-4 py-3 text-ink/70">{humanizeEnum(banquet.event_type ?? "")}</td>
              <td className="px-4 py-3 text-ink/70">
                {banquet.area_sqft ? `${banquet.area_sqft} sq.ft` : "—"}
              </td>
              {CAPACITY_COLUMNS.map((col) => (
                <td key={col.key} className="px-4 py-3 text-ink/70">
                  {(banquet[col.key] as number | undefined) ?? "—"}
                </td>
              ))}
              {onEnquire && (
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onEnquire(banquet)}
                    className="font-semibold text-accent hover:underline"
                  >
                    Enquire
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
