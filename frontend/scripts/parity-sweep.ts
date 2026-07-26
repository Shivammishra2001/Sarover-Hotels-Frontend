/**
 * Phase 6 QA: hits a REAL running Next.js server (start it first — see
 * `frontend/CLAUDE.md`/task notes, this script does not boot one itself) with
 * every old `redirect.from_path` (the ingested "old URL universe") plus a
 * sample of currently-live NEW canonical paths pulled straight from
 * `app/sitemap.ts`'s own output, and records the observed status per row.
 *
 * Usage: `npx tsx scripts/parity-sweep.ts <base-url>` (default http://localhost:3100)
 *
 * Output: `data/parity-report.csv` at the repo root — `source_path,new_path,status,notes`.
 */
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.argv[2] ?? "http://localhost:3100";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const OUT_FILE = path.join(REPO_ROOT, "data", "parity-report.csv");

// Sampling knobs — a real full sweep of ~974 redirects + ~2,900 sitemap URLs
// sequentially against a single dev/start server would take very long; this
// samples generously (every N-th row per source) rather than every URL. See
// report for exact counts sampled vs skipped.
const REDIRECT_SAMPLE_STRIDE = 1; // every redirect row — only 974, cheap enough to do all of them
const SITEMAP_SAMPLE_TARGET = 400; // spread across every route type in the sitemap

interface RedirectRow {
  from_path: string;
  to_path: string;
  status_code: "permanent" | "temporary";
}

interface ReportRow {
  source_path: string;
  new_path: string;
  status: string;
  notes: string;
}

async function fetchAllRedirects(): Promise<RedirectRow[]> {
  const all: RedirectRow[] = [];
  let page = 1;
  while (true) {
    const qs = new URLSearchParams({
      "filters[is_active][$eq]": "true",
      "pagination[page]": String(page),
      "pagination[pageSize]": "100",
    });
    const res = await fetch(`${STRAPI_URL}/api/redirects?${qs.toString()}`);
    const json = (await res.json()) as { data: RedirectRow[]; meta: { pagination: { pageCount: number } } };
    all.push(...json.data);
    if (page >= json.meta.pagination.pageCount) break;
    page += 1;
  }
  return all;
}

/** Parses the plain-text XML sitemap the running server actually serves at
 * `/sitemap.xml`, rather than re-importing `app/sitemap.ts`'s TS module
 * (which would need the Next.js runtime) — this is closer to "what a crawler
 * would really see" anyway. */
async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml -> ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1]);
}

/** One hop of redirect-following: request the path, and if it's a 3xx, follow
 * exactly one more hop to confirm the final destination resolves 200. */
async function probe(urlPath: string): Promise<{ status: string; notes: string }> {
  try {
    const res = await fetch(`${BASE_URL}${urlPath}`, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location") ?? "";
      const secondRes = await fetch(location.startsWith("http") ? location : `${BASE_URL}${location}`, {
        redirect: "manual",
      });
      if (secondRes.status >= 200 && secondRes.status < 300) {
        return { status: `${res.status}->${secondRes.status}`, notes: `redirected to ${location}` };
      }
      if (secondRes.status >= 300 && secondRes.status < 400) {
        const location2 = secondRes.headers.get("location") ?? "";
        return { status: `${res.status}->${secondRes.status}`, notes: `second hop also redirects (${location} -> ${location2}) — more than 1 hop` };
      }
      return { status: `${res.status}->${secondRes.status}`, notes: `redirected to ${location}, which itself failed` };
    }
    return { status: String(res.status), notes: "" };
  } catch (err) {
    return { status: "ERROR", notes: err instanceof Error ? err.message : String(err) };
  }
}

function sample<T>(items: T[], target: number): T[] {
  if (items.length <= target) return items;
  const stride = items.length / target;
  const out: T[] = [];
  for (let i = 0; i < target; i++) out.push(items[Math.floor(i * stride)]);
  return out;
}

function toCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function main() {
  console.log(`[parity-sweep] target server: ${BASE_URL}`);

  const redirects = await fetchAllRedirects();
  const redirectSample = redirects.filter((_, i) => i % REDIRECT_SAMPLE_STRIDE === 0);
  console.log(`[parity-sweep] ${redirects.length} active redirects total, sampling ${redirectSample.length} (stride ${REDIRECT_SAMPLE_STRIDE})`);

  const sitemapUrls = await fetchSitemapUrls();
  const sitemapPaths = sitemapUrls.map((u) => new URL(u).pathname);
  const sitemapSample = sample(sitemapPaths, SITEMAP_SAMPLE_TARGET);
  console.log(`[parity-sweep] ${sitemapPaths.length} live sitemap URLs total, sampling ${sitemapSample.length}`);

  const rows: ReportRow[] = [];

  let done = 0;
  const total = redirectSample.length + sitemapSample.length;
  const logEvery = 50;

  for (const r of redirectSample) {
    const { status, notes } = await probe(r.from_path);
    rows.push({ source_path: r.from_path, new_path: r.to_path, status, notes });
    done += 1;
    if (done % logEvery === 0) console.log(`[parity-sweep] ${done}/${total}`);
  }

  for (const p of sitemapSample) {
    const { status, notes } = await probe(p);
    rows.push({ source_path: p, new_path: p, status, notes: notes || "sitemap-sourced live URL (self-check)" });
    done += 1;
    if (done % logEvery === 0) console.log(`[parity-sweep] ${done}/${total}`);
  }

  const header = "source_path,new_path,status,notes";
  const csvLines = [header, ...rows.map((r) => [r.source_path, r.new_path, r.status, r.notes].map(toCsvField).join(","))];
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, csvLines.join("\n") + "\n", "utf8");

  const resolved = rows.filter((r) => /^(2\d\d)$/.test(r.status) || /^3\d\d->2\d\d$/.test(r.status));
  const failed = rows.filter((r) => !resolved.includes(r));

  console.log(`\n[parity-sweep] wrote ${rows.length} rows to ${OUT_FILE}`);
  console.log(`[parity-sweep] resolved (200, or 3xx->200 within 1 hop): ${resolved.length}/${rows.length} (${((resolved.length / rows.length) * 100).toFixed(2)}%)`);
  if (failed.length) {
    console.log(`[parity-sweep] ${failed.length} NOT resolved:`);
    for (const f of failed) {
      console.log(`  ${f.source_path} -> ${f.new_path} : ${f.status} ${f.notes}`);
    }
  }
}

main().catch((err) => {
  console.error("[parity-sweep] fatal:", err);
  process.exitCode = 1;
});
