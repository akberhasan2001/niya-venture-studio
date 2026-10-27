# Niya Venture Studio website

React marketing site for Niya Venture Studio. It preserves the navy, coral and editorial identity while presenting clear audience paths across clean routes. Vite produces a static `dist/` deployment for Netlify, and Anime.js provides accessible viewport reveals and metric count-ups.

## Routes

- `/` — home, six audience paths and Edition 1 recap
- `/connect/` — Niya Connect early access (pre-launch)
- `/founders/`, `/investors/`, `/providers/`, `/partners/`
- `/portfolio/` and starter founder-story pages
- `/events/`, `/events/halal-money-forum-nj/` (redirect to the official event website), `/summit/`
- `/summit/agenda/`, `/summit/hackathon/` — Edition 1 program archives
- `/signup/` — single role-based intake
- `/news/`, `/thanks/`, plus a React 404 fallback

## Local preview

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173/`.

Create a production build with `pnpm build`, then check it with `pnpm preview`.

## Netlify handoff

The checked-in `netlify.toml` sets the build command to `pnpm run build`, the Node runtime to 22, and the publish directory to `dist`. The SPA fallback in `app/public/_redirects` preserves direct access to every clean URL.

Two Netlify Forms are declared statically in `app/index.html` and rendered as accessible React forms:

- `niya-network` — the single Niya intake form; intended recipient: Taqi, `taqi@niyasf.com`.
- `halal-money-forum-pitchfest` — legacy Pitchfest form definition; intended recipient: Taqi, `taqi@niyasf.com`. The event page currently redirects to the official event site.

Before publishing, the hosting owner must enable Netlify Forms and add an email
submission notification for `niya-network` addressed to `taqi@niyasf.com` in the
site's Netlify form notification settings. Submit a test after deployment and
verify both the Netlify submission record and receipt in Taqi's inbox.
The hidden `routing_owner` and `routing_email` fields record the intended recipient;
they do not configure email delivery. No dashboard notification has been configured
or verified from this checkout. If the legacy Pitchfest form is re-enabled, give it
the same notification recipient and test it separately.

## Content and launch items still requiring owner input

- Taqi's review of the researched VePay, HalalWallet and Ummah Unite profiles;
  company approval and a verified Robert Mallon headshot remain outstanding.
  Public sources and portrait provenance are documented in `docs/portfolio-sources.md`.
- November 14 attendance and registration are handled at `https://muslimeconomysummit.org/`.
- Approved privacy notice, terms, and analytics decision.
- Hosting owner: activate the prepared `niyasummit.com` redirects after confirming ownership, domain aliases, HTTPS, and DNS. See `docs/summit-migration.md`.
- Final sourced facts file approval for any new metrics beyond the Summit recap.

## Sources used in the current build

The Edition 1 recap uses only figures verified in **Niya Global Startup Summit 2026 Event Report**: 400+ attendees, 50+ speakers and presenters, 14 live-pitch startups, and 50+ hackathon builders. Approved Summit photography lives in `assets/events/` and is web-optimized.

The historical speaker roster, agenda, hackathon program and partner acknowledgments
were migrated from the supplied `niya-summit-website.zip` on October 26, 2026.
Source details, exclusions and redirect handoff are recorded in `docs/summit-migration.md`.
