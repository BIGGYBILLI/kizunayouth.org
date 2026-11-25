# Kizuna Youth Project

The website for 絆 Kizuna Youth Project — a student-led consultancy guiding
students in India, the Philippines and Bangladesh toward Japanese universities.

The home page is one long editorial page in washi cream, moss green and
vermilion:

- **Hero** — a Three.js scene of two interlocking rings (the bond) turning among
  drifting sakura petals. It follows the pointer, can be dragged with the mouse
  or turned with the arrow keys, and recedes as the hero scrolls away.
- **Story** (`#story`) — the meaning of 絆, the belief behind the project and
  four short notes on how the first school workshops grew into three countries.
- **Guidance** (`#guidance`) — the three things Kizuna does, then a five-step
  application process on a dark moss panel.
- **Team** (`#team`) — three portrait cards. Selecting one opens an accessible
  profile dialog (Esc, backdrop click, focus returned on close).
- **FAQ** (`#faq`) — an accordion of the questions students and schools ask.
- **Contact** (`#contact`) — email, Instagram and footer.

## Run it

```sh
bun install
bun run dev        # http://localhost:5305 (Vite + the Worker in workerd)
bun run build      # dist/client (assets) + dist/creative_agency/index.js (Worker)
bun run typecheck
```

The folder name contains a space, so `scripts/postbuild.mjs` resolves `dist`
with `fileURLToPath` rather than a raw URL path.

## Live site

Pushing to `main` deploys the static client to GitHub Pages at
<https://biggybilli.github.io/kizunayouth.org/> via
`.github/workflows/pages.yml`. Pages serves files only, so `/admin`, the content
API and portrait uploads return 404 there; those need the Worker on Cloudflare.

## Edit it

- **`src/data.ts` holds every string, link and team entry.** Start there.
- **`src/pages/Home.tsx`** has the sections in order.
- **`src/components/Scene3D.tsx`** is the 3D scene: rings, lighting, petals and
  pointer/scroll interaction. It honours `prefers-reduced-motion` and stops
  rendering when off screen.
- **`src/components/Team.tsx`** holds the portrait cards and the profile dialog.
- **Team photos** live in `public/images/team/`. They are 3:4 crops of the
  named originals in `Icons/`; re-crop from there if the photos change.
- **`src/components/Chrome.tsx`** has `Reveal`, `Seal`, `Stamp`, `Eyebrow` and
  `ArrowLink`.
- **Tokens** are in `src/styles.css`: washi/paper, ink, moss, vermilion, blush
  and night colours; Instrument Serif for display, Inter Tight for text,
  Shippori Mincho for Japanese. The paper grain is a CSS overlay.
- **Team bios:** only the founder has a full profile today. The other two cards
  show their poster facts and a "profile coming soon" note — add `bio` text in
  `TEAM.members` when it arrives.
- **`src/worker/index.ts`** serves the content API, the uploaded portraits and
  the admin routes, then falls through to the assets.

## Admin

`/admin` is the private editor for the people (photos, names, English and
Japanese titles, tags, descriptions and quotes), the FAQ and the contact links.
Sign-in is limited to one account, `husainarib57@gmail.com`, plus the password
in `ADMIN_PASSWORD`.

- Locally the password lives in `.dev.vars`, which is git-ignored. In production
  set it as a secret instead: `wrangler secret put ADMIN_PASSWORD`.
- Content is stored in the D1 database bound as `DB`; uploaded portraits go to
  the R2 bucket bound as `FILES`. Without those bindings the site renders the
  content it ships with and the admin cannot save.
- Change `ADMIN_EMAIL` to point the admin at a different address.
