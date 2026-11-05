# Niya Venture Studio website

React marketing site for Niya Venture Studio. It preserves the navy, coral and editorial identity while presenting clear audience paths across clean routes. Vite produces a static `dist/` deployment for Netlify, and Anime.js provides accessible viewport reveals and metric count-ups.

## Routes

- `/` — home, six audience paths and Edition 1 recap
- `/connect/` — Niya Connect early access (pre-launch)
- `/founders/`, `/investors/`, `/providers/`, `/partners/`
- `/portfolio/` and starter founder-story pages
- `/events/`, `/events/halal-money-forum-nj/` (redirect to the official event website), `/summit/`
- `/events/#startup-pavilion` — November 14 pitch applications and exhibitor information
- `/summit/agenda/`, `/summit/hackathon/` — Edition 1 program archives
- `/signup/` — single role-based intake
- `/privacy/`, `/terms/` — privacy policy and terms of use
- `/news/`, `/thanks/`, plus a React 404 fallback

## Local preview

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173/`.

Create a production build with `pnpm build`, validate its initial HTML and assets with `pnpm run check:build`, then inspect it with `pnpm preview`.

## Netlify handoff

The checked-in `netlify.toml` sets the build command to `pnpm run build`, the Node runtime to 22, and the publish directory to `dist`. The SPA fallback in `app/public/_redirects` preserves direct access to every clean URL.

The `niya-network` Netlify form is declared statically in `app/index.html` and rendered as an accessible React form. Its intended notification recipient is Taqi, `taqi@niyasf.com`.

Startup Battlefield pitch applications now go to the organizer's Google Form. The obsolete local pitchfest definition has been removed; historical Netlify records are untouched.

Before publishing, the hosting owner must enable Netlify Forms and add an email
submission notification for `niya-network` addressed to `taqi@niyasf.com` in the
site's Netlify form notification settings. Submit a test after deployment and
verify both the Netlify submission record and receipt in Taqi's inbox.
The hidden `routing_owner` and `routing_email` fields record the intended recipient;
they do not configure email delivery. No dashboard notification has been configured
or verified from this checkout. Detailed settings, delivery-test steps, badge removal,
and LinkedIn/WhatsApp checks are in [the launch handoff](docs/launch-handoff.md).

The build also creates initial HTML for every canonical route with its own social
tags through `scripts/build-page-meta.mjs`. Keep the full `pnpm run build` command;
running Vite alone omits that step. React continues to handle navigation.

## Content and launch items still requiring owner input

- Taqi's review of the researched VePay, HalalWallet and Ummah Unite profiles;
  company approval and a verified Robert Mallon headshot remain outstanding.
  Public sources and portrait provenance are documented in `docs/portfolio-sources.md`.
- November 14 attendance and registration are handled at `https://muslimeconomysummit.org/`.
- Legal pages use `info@niyasf.com` and omit the mailing address as requested.
  The effective date is November 5, 2026 for the planned go-live; revise it if
  publication moves. Confirm the Microsoft 365 provider detail in
  `app/src/components/LegalPages.jsx`. The supplied policy and
  terms are included; the analytics disclosure names the observed Cloudflare beacon.
- Official pitch and exhibitor URLs are configured in `app/src/data/events.js`.
- Hosting owner: activate the prepared `niyasummit.com` redirects after confirming ownership, domain aliases, HTTPS, and DNS. See `docs/summit-migration.md`.
- Final sourced facts file approval for any new metrics beyond the Summit recap.

## Sources used in the current build

The Edition 1 recap uses figures from **Niya Global Startup Summit 2026 Event Report**: close to 400 attendees, 50+ speakers and presenters, 14 live-pitch startups, and 50+ hackathon builders. The cover's 400+ attendance figure conflicts with the detailed record; the site follows the detailed record and outreach wording. Approved Summit photography lives in `assets/events/` and is web-optimized.

The historical speaker roster, agenda, hackathon program and partner acknowledgments
were migrated from the supplied `niya-summit-website.zip` on October 26, 2026.
Source details, exclusions and redirect handoff are recorded in `docs/summit-migration.md`.
