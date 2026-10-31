# Celestia Designs

A Next.js Pages Router website for Celestia architectural metal systems. The
Precision Grid design uses shared colors and spacing, Inter typography, original
photography, and React Bootstrap for navigation, forms, the carousel, and dialogs.

## Development

Use Node.js 22.7 or newer. Install dependencies with `npm install`, then run
`npm run dev`. Open http://localhost:3000.

`npm run build` creates the production build and sitemap. Run it locally with
`npx next start`. Vercel uses its standard Next.js build and deployment settings.

## Editing the design

- **Colors, typography, spacing:** the variables at the top of
  `src/styles/index.css` control the shared theme, gutters, and section spacing.
  `src/styles/constants.module.scss` retains Sass breakpoint values and aliases to
  those shared colors. Component-specific styles live beside each component.
- **Fonts:** `src/pages/_document.js` loads Inter from Google Fonts with
  `display=swap`. Keep the font family in `src/styles/index.css` in sync.
- **Homepage:** `src/pages/index.js` arranges the hero, systems, application image,
  About section, and full inquiry form. The About navigation link uses `/#about`.
- **Hero images and captions:** edit the `slides` array in
  `src/components/Carousel/index.js`. Keep each image, visible caption, and
  alternative text together. Autoplay uses a seven-second interval and pauses on
  hover, keyboard focus, or the pause button. Reduced motion disables autoplay
  and transitions; arrows and touch navigation remain available.
- **Product summaries:** edit the four entries in
  `src/components/Products/index.js`; the homepage and catalog share this grid.
  Full specifications and document paths remain in `src/pages/products/` and use
  the shared `src/components/Product/` template.
- **Project photography:** the projects page lists all 18 image paths. Its gallery
  uses CSS for three desktop columns, two tablet columns, and one mobile column.
  Installation numbers identify images without inventing project names.
- **Contact details:** edit `CONTACT_DETAILS` in `src/pages/contact/index.js`.
  `src/components/ContactForm/` supplies the same form on the homepage and contact
  page, including visible labels, verification, and success/error messages.

Use original assets under `public/assets/`. Product images are contained rather
than cropped so the complete technical profiles stay visible. Architecture photos
use intentional crops within responsive frames. Generated design concepts are
references only and are not website assets.

## Contact form storage

The API validates inquiries and saves them to Microsoft Lists / SharePoint.
Your Lists workflow handles notifications to sales reps. Complete the
[SharePoint setup guide](docs/sharepoint-inquiries.md) and use the variable names in
[`.env.example`](.env.example). Keep real credentials in `.env.local` and Vercel,
never in source control. This redesign adds no environment settings or list fields.

## Verification

```sh
npm run test:contact
npm run lint
npm run build
npm run test:ui
```

The contact tests mock external services. Playwright browser checks cover all
pages on desktop, tablet, and mobile, navigation, carousel autoplay/pause, reduced
motion, downloads, and inquiry success/failure. Browser checks use a dummy site
key and mock reCAPTCHA and `/api/contact`; they do not create live inquiries.

If Chromium is not installed, download it with `npx playwright install chromium`.
For repository-only tool storage, set `PLAYWRIGHT_BROWSERS_PATH` to
`$PWD/.cache/browsers` for both installation and browser checks. Set `TMPDIR` to
`$PWD/.cache/tmp` and `npm_config_cache` to `$PWD/.cache/npm` to keep temporary files
and npm downloads here too; create those directories first.

`npm run test:ui` starts its own development server on port 3100. Run it separately
from a production build because both use Next.js's `.next` directory. Browser
screenshots are saved in `test-results/`; optional review copies go in `artifacts/`.
Both directories and local tool caches are ignored by Git.
