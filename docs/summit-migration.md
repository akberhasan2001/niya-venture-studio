# Edition 1 Summit migration

Implemented on October 26, 2026 against the existing React relaunch branch.
No deployment or DNS change was performed.

## Sources

- User-supplied `niya-summit-website.zip`, export dated October 21, 2026.
- Published HTML under `ready-to-host/index.html`, `agenda.html`, `hackathon.html`.
- Published WebP portraits and selected logos from the same export.
- Existing Niya Global Startup Summit 2026 Event Report remains authoritative for
  attendance, speakers/presenters, live-pitch startups and hackathon-builder totals.

The ZIP README notes that the export is the current workspace, not a historical
August snapshot. The archived agenda is explicitly labeled as the published
program, not proof that every session happened at the listed time. Speaker roles
and partner acknowledgments are historical listings, not current endorsements.

## Content migrated

- `/summit/`: existing report-backed recap and gallery retained; program overview,
  featured speakers, expandable full roster, organizers and sponsors/partners added.
- `/summit/agenda/`: morning, afternoon, pitches and breakout program.
- `/summit/hackathon/`: Founder in a Day concept, published schedule, judging themes.
- `app/src/data/summit-archive.json`: structured program data extracted from the
  published HTML; 44 speaker entries, including a repeated speaker in both tracks.
  The UI deduplicates the roster by name.
- `app/public/summit/`: locally hosted WebP portraits and selected logos.

The Niya Connect session is described as a historical platform vision/showcase;
it does not present Connect as a currently available product. Old pitch-entry
instructions and promotional prize copy were removed from the agenda entry.

## Deliberately excluded

Expired ticketing and registration links, pricing, sold-pass counters, countdown,
event-day popups, projected attendee/investor totals, market-size claims, API/admin
server, database schema, old intake forms, external tracking and old scripts.
No old source code or embedded scripts are executed by the new archive.

The old Ummah Unite case-study URL points to the existing portfolio page. The case
study text has not been imported as approved founder biography or company copy;
the relaunch plan requires separate owner review for portfolio details.

## Redirect inventory and deployment handoff

Prepared hostname-specific permanent redirects for both `niyasummit.com` and
`www.niyasummit.com`, ahead of the ordinary path rules and React fallback:

| Old path | Destination on niyasf.com |
| --- | --- |
| `/`, `/index.html` | `/summit/` |
| `/agenda.html` | `/summit/agenda/` |
| `/hackathon.html` | `/summit/hackathon/` |
| `/ummah-unite-muslim-event-platform.html` | `/portfolio/ummah-unite/` |

These are the public pages found in the export. No catch-all old-domain redirect
was guessed. The hosting owner must either attach both legacy domains to this
Netlify site with working HTTPS and DNS, or reproduce this map on the old host.
Rules in this repository cannot control an independently hosted domain.

The React app also resolves the old agenda and hackathon HTML paths locally.
The sitemap includes both new program routes. Netlify redirect rules require a
deployment test; Vite preview does not execute Netlify's redirect engine.

Before changing DNS, the hosting owner should preserve the previous deployment,
test the known old URLs, confirm the final destinations and status codes, and
confirm that `niyasf.com/` still opens the Venture Studio homepage.

## Verification

- Vite production build and `git diff --check` passed.
- All referenced speaker portraits exist locally; all 34 program entries have
  a title and description.
- Browser: full roster expansion/collapse, agenda page, and the legacy hackathon
  URL resolving to the new archive were checked.
- Desktop and 390px mobile layouts were visually reviewed.
- Live legacy-domain HTTP 301 responses remain a hosting/deployment check.
