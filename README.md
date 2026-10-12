# Niya Venture Studio — Website

Static marketing site for **Niya Venture Studio** ("Building the Muslim Economy"):
a platform connecting founders, investors, and service providers across 7 global regions.

Plain HTML/CSS/JS — no build step, no dependencies beyond Google Fonts (Sora, DM Serif Display).

## Structure

```
.
├── index.html            # All page markup (single page, anchor-nav sections)
├── css/
│   └── styles.css        # All styles (design tokens as CSS variables in :root)
├── js/
│   └── main.js           # Nav shadow, modals, forms, scroll-reveal
└── assets/images/
    ├── logo-niya-sf.jpg
    ├── team-taqi-hasan.jpg
    └── team-tanveer-ali.jpg
```

## Page sections (`index.html`)

| Anchor | Section |
| --- | --- |
| `#platform` | Value proposition |
| *(feature grid)* | Features |
| `#for-lps` | For limited partners / investors |
| `#portfolio` | Portfolio |
| `#segments` | Market segments |
| `#traction` | Traction |
| `#team` | Team / about |
| `#halal-money` | Halal Money Forum |
| `#join` | Join form |
| *(events)* | Niya Startup Summit 2026 feature block |

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy (GitHub Pages)

Repo → **Settings → Pages → Deploy from branch → `main` / root**.

## Design tokens

Defined at the top of `css/styles.css`:

`--navy #1F4E79` · `--navy-dark #0D2137` · `--orange #FF6B35` · `--cream #FDF8F2` · `--gold #C9952A` · `--purple #6D5BD0` · `--teal #1D9E75`

## JavaScript behavior (`js/main.js`)

- **Nav**: adds a `scrolled` class (shadow) after 40px of scroll.
- **Waitlist / Design Partner modal** (`openModal('demo' | 'partner')`): one modal, content swapped by type.
- **Summit registration modal**: builds a `mailto:events@niyasf.com` link with the registrant's details.
- **Join form** + role buttons (`setJoinRole`): preselects the role dropdown and scrolls to the form.
- **Scroll reveal**: `IntersectionObserver` adds `.visible` to `.reveal` elements.
- `Esc` closes any open modal.

## Known limitations

- The **waitlist, design-partner, and join forms do not submit anywhere** — they only show a success
  message client-side. Wire them to a backend or form service (Formspree, Netlify Forms, etc.) before relying on them.
- The summit form relies on the visitor's mail client via `mailto:`.
- Images are large relative to how they're displayed (logo is 3125×3125 shown at ~40px tall); resizing/compressing
  them would noticeably improve load time.
- No favicon or Open Graph / social-share tags.
