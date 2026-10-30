# Relaunch design refinement

Reviewed the updated relaunch plan and its live references on October 28, 2026.

## Reference decisions

- [Atomic](https://www.atomic.vc/): a concise opening statement, real company imagery, and companies introduced early. Niya now has a photo-led hero and a compact, linked showcase of its three published company stories.
- [Pioneer Square Labs](https://www.psl.com/): a direct founder proposition and separate routes for starting a company and growing an existing one. The founders page now has two clear paths with their own calls to action.
- [High Alpha](https://www.highalpha.com/): distinct space for each offering and generous type hierarchy. Niya retains its three fully clickable offering rows, with more deliberate spacing and consistent typography.
- [Salaam Gateway](https://salaamgateway.com/): content organized by subject and purpose. Niya keeps the planned navigation and six audience routes rather than adopting the reference's much denser news layout.
- [Alif](https://alif.vc/) redirects to [alif.build](https://alif.build/). Its restrained headline and clear primary action informed the hero hierarchy. Niya continues to use authentic photography rather than the reference's dark animated treatment.

These are layout and interaction references; no reference-site code, artwork, or copy was copied.

## Implementation

`app/src/design.css` holds the shared visual refinement after the existing component styles. It preserves the navy/coral palette, DM Serif Display and Manrope fonts, founder photos, supplied Edition 1 recap photo, summit archive, Anime.js motion, and existing destinations.

The main changes are a compact light header, warm page backgrounds, quieter card borders, pill-shaped actions, more consistent spacing, and a photo-led homepage. The menu now marks active routes, closes after link selection, and closes with Escape while returning focus to its toggle.

## Verification

- Production Vite build passes.
- Browser layout inspection at 1280px desktop, 768px tablet, and 390px/320px phone widths. No horizontal overflow on the homepage at the checked widths.
- Inspected the homepage, founder page, Connect page, events page, and summit archive. All three company logos load and link to their profiles.
- Mobile menu opens, closes with Escape, and closes after choosing About. Event filters respond to arrow keys and End. The upcoming-event link still points to `https://muslimeconomysummit.org/`.
- Summit photo dialog opens, advances by keyboard, and closes with Escape. Existing reduced-motion rules remain in effect.

This is a local design update. No deployment or external form submission was performed; production notification routing remains a separate launch task.
