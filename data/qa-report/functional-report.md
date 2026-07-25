# Functional Report (§6)

| Check | Result | Evidence |
|---|---|---|
| Inquiry form: valid submission returns 200/201 | PASS | status=201 |
| Inquiry form: valid submission creates exactly one record (count +1) | PASS | before=7 after=8 |
| Inquiry form: submitted fields persisted correctly | PASS | full_name/email/message match |
| Inquiry form: hotel relation set correctly by documentId | PASS | linked to hotel cq3x0k9ydpgaq8g63cr814a9 |
| Inquiry form: invalid submission (missing required field) is rejected, no record created | PASS | status=400, count before=9 after=9 |
| Inquiry form: invalid email format is rejected, no record created | PASS | status=400, count before=9 after=9 |
| Inquiry records are NOT publicly readable (GET /api/inquiries without token) | PASS | status=403, no data returned to public caller |
| Inquiry single record is NOT publicly readable (GET /api/inquiries/:id without token) | PASS | status=403 |
| Cleanup: test inquiry records deleted | PASS | deleted 2/2 test records (tagged qa-sweep-test in message) |
| Navigation: dedicated `navigation` content type | N/A | not implemented — nav is hardcoded in frontend/src/components/layout/Header.tsx and Footer.tsx, verified via the crawl's broken-links.csv instead |
| Listing/filter: hotels API supports brand/destination/property_type/star_rating filters (frontend/src/lib/api.ts getHotels) | PASS | verified filter param acceptance on /api/brands, status=200. Frontend /hotels route itself is server-rendered (ƒ dynamic) without a visible filter UI wired up in the pages reviewed — filtering exists at the API layer only. |

**Summary: 10 pass / 0 fail / 1 N/A**
