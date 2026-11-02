# Niya launch fixes and Netlify handoff

Prepared October 31, 2026. Code is on `feature/niya-multipage-relaunch`. No deployment, live form submission, notification change, social post or message was made in this pass. The Netlify dashboard required a login; Barkath asked for a code update and instructions for the colleague with access instead.

## Code ready for review

- The November 14 event is named **Muslim Economy Summit**, at NJIT Campus, Newark, New Jersey. `/events/#startup-pavilion` has a free Startup Battlefield pitch application closing November 9 and an exhibitor deadline of November 10. The application opens `https://forms.gle/i3mKBTMrHsetRPRL8`.
- November 2 update: the exhibitor URL is `https://forms.gle/iqWWhgLS9QGRmXdw8`, configured in `exhibitorRegistration`. The Startup Pavilion displays “Reserve a Table”.
- The homepage Startup card leads to the Pavilion. The Edition 1 recap has a top link to the November 14 official site.
- Signup's internal launch note has been replaced with a privacy notice and legal links. The role option now says Startup. Footer links lead to `/privacy/` and `/terms/`.
- The supplied privacy/terms text is included, with the analytics placeholder resolved from observed production services: Cloudflare's beacon is present. Microsoft 365 is retained from the supplied draft and needs the owner's confirmation.
- Initial HTML contains Open Graph and Twitter tags for each canonical route, not just tags inserted by React. The 1200×630 PNG is `/social/niya-preview.png`. Crescent icons and a compressed 192px header/footer logo are included. Logo bytes fell from 368,725 to 2,940.
- Attendance is consistently **close to 400**. The Event Report cover says 400+, but its Executive Summary and detailed Attendance entry say close to 400. This conservative wording matches outreach. Other reported metrics are unchanged. Align future emails and flyers with the same wording.
- The tagline appears once, in the homepage hero. Internal arrows use →; external destinations use ↗. The footer logo and hero's arrow-only link have accessible names.

## Items to finish before publication

1. In `app/src/components/LegalPages.jsx`, replace `effectiveDate` with the actual publication date and `mailingAddress = null` with the company address once the supervisor supplies it. No fictional address or bracketed editing notes are shown publicly.
2. Confirm the email provider is Microsoft 365 and the privacy text matches the deployed services. The Cloudflare Web Analytics disclosure reflects the current live beacon; recheck if hosting settings change.
3. London is now listed as “London, April 2027 (date to be announced)”, explicitly tentative and planned, with a signup link for updates. Replace the tentative wording only once the organizer confirms the date.
4. The optional `/portfolio/` → `/companies/` migration is not part of these launch fixes.

## Netlify colleague — deployment and email delivery

1. Open the Netlify project attached to **niyasf.com**. Review the feature-branch changes and deploy through the team's normal process. Build command: `pnpm run build`. Publish directory: `dist`. Node 22 and pnpm 11.25.0 remain in `netlify.toml`.
2. Run `pnpm run check:build` after the build. The build must run the full package command, including `scripts/build-page-meta.mjs`; running Vite alone omits the page-specific initial-HTML tags.
3. In **Forms**, enable automatic form detection if it is not enabled, then deploy with the enabled setting. Confirm **niya-network** is detected. This form has a static HTML declaration in `app/index.html`, required name/email/role fields, an empty `bot-field` honeypot, and a `/thanks/` success destination.
4. In **Forms → Submission notifications**, add or verify an **email** notification for **niya-network** to **taqi@niyasf.com**. Save it. Inspect existing notifications so there are no unintended or duplicate recipients.
5. The hidden values `routing_owner=Taqi` and `routing_email=taqi@niyasf.com` are descriptive fields. **They do not configure Netlify email delivery.** Neither a repository build nor the success page proves an email was sent.
6. On the deployed `/signup/` page, submit one clearly labeled test: name `Niya website QA`, a real team-controlled email, role `Other`, organization `Niya QA`, and interest `Launch form delivery test — please confirm receipt; not an early-access signup.` Record the submission time.
7. Confirm the entry appears under the project's **Forms → niya-network** submissions. Open the entry and check its routing fields. If missing, check spam submissions and whether form detection was enabled for this deployment.
8. Confirm the corresponding notification actually arrives in **Taqi's Microsoft 365 inbox**, including its junk folder. Netlify documents the default sender as **formresponses@netlify.com**. If the dashboard record exists but no email arrives, check notification settings and mailbox filtering.
9. Report back with the deployment URL/commit, test timestamp, Netlify submission record, configured notification recipients, and inbox receipt. Only then mark delivery verified.

**Where submissions land:** Netlify stores accepted entries in the project's `niya-network` form. The intended notification destination is Taqi at `taqi@niyasf.com`; the actual live recipient list and inbox delivery have not been verified because dashboard access was unavailable.

The obsolete local `halal-money-forum-pitchfest` form definition has been removed. New pitch applications go to the organizer's separate Google Form. Historical Netlify submissions have not been deleted. The colleague may archive the old form separately after checking its records.

## Netlify colleague — remove the public badge

The public site currently loads `/.netlify/scripts/hud?variant=public` and displays the **Powered by Netlify** badge. It is host-injected and is not in this repository. For the niyasf.com project, go to **Project configuration → General → Powered by Netlify badge**, switch it off and save. Netlify says this takes effect on the next request without a redeploy. Verify in a fresh browser session; dismissing the badge only hides it for one visitor.

## Sharing checks after deployment

1. Load `https://niyasf.com/social/niya-preview.png` publicly. It must return an image, not a login or SPA HTML page, at 1200×630.
2. View the initial HTML source of `/`, `/events/`, `/signup/`, `/privacy/` and `/terms/`. Each should have its own title, description, canonical URL, `og:title`, `og:description`, `og:url`, `og:image` and `twitter:card=summary_large_image`. The image URL is absolute HTTPS. React also updates these tags during navigation.
3. Paste `https://niyasf.com/` and `https://niyasf.com/events/` into a **LinkedIn post draft**. Wait for the preview, check image/title/description and discard the draft. Do not publish a test post. If stale, use LinkedIn's Post Inspector to refresh the URL.
4. In **WhatsApp → Message yourself**, paste the same URLs into an **unsent draft** and check the preview. Clear the draft afterward. Do not message contacts just to test the preview. Platform caches can retain an older card after deployment.
5. Confirm the crescent favicon appears after a hard refresh. PNG, ICO and Apple touch icon files are included.

Updated previews could not be checked inside LinkedIn or WhatsApp before deployment: those services fetch the public domain, not this local build.

## Verification performed locally

Production build; initial-HTML metadata and image/icon checks; desktop and phone layouts; Pavilion links and deadlines; local invalid-email blocking; form declaration and intended routing fields; privacy/terms routes and links; homepage Startup routing; attendance wording; no public editing placeholders. These checks do not simulate Netlify ingestion or prove email delivery.

## Provider references

- [Netlify form detection and JavaScript forms](https://docs.netlify.com/manage/forms/setup/)
- [Netlify form notifications](https://docs.netlify.com/manage/forms/notifications/)
- [Netlify public badge controls](https://docs.netlify.com/manage/projects/powered-by-netlify-badge/)
- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/)
- [Cloudflare analytics dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Muslim Economy Summit official website](https://muslimeconomysummit.org/)
