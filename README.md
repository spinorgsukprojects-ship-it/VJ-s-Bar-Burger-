# VJ's Bar & Burger

A responsive restaurant website using actual restaurant photography and the supplied dine-in menu.

## Run locally

Requires Node.js 18 or newer. No package installation is required.

```sh
npm run dev
```

Open http://localhost:3000. Stop the server with Control-C.

## Project files

- `dist/index.html`: Home page
- `dist/menu.html`: Our Menu
- `dist/specials.html`: Specials
- `dist/private-events.html`: Private Events
- `dist/delivery-takeout.html`: Delivery & Takeout
- `dist/find-us.html`: Find Us
- `dist/style.css`: responsive layout and colors
- `dist/typography.css`: shared fonts, readable text sizes, and responsive heading scale
- `dist/app.js`: menu search, categories, dish details, gallery, navigation, legacy section-link redirects, and Sacramento opening status
- `dist/menu.json`: all 57 dishes and prices from the supplied PDF
- `dist/assets/`: original restaurant photos, promotion artwork, logo, menu PDF, and a `sources.json` record of downloaded asset URLs
- `.openai/hosting.json`: existing Sites project ID and static hosting configuration
- `scripts/serve.mjs`: dependency-free local server

Run `npm run check` to check JavaScript syntax. Edit the files in `dist` directly; no build step is needed.

Online ordering links open the existing restaurant website. The site includes Specials and Delivery & Takeout sections, and has no table reservation links. Event inquiries use email. This site does not collect payments. Hours are shown in Sacramento time, and opening status uses the published regular schedule rather than live holiday information.

The hosted site remains private for owner review.

Each navigation item opens a separate HTML page, with its own title and active navigation state. Pages can be refreshed and linked directly. Previously shared home-section URLs redirect to their new page.

## Image quality and final style

The original restaurant images are retained. Responsive high-quality WebP variants use the available source resolution (up to 3840 pixels for the bar image). Menu thumbnails are separate from the full-size originals used in dish dialogs. Fonts are hosted in `dist/assets/fonts` with their license files. All six pages share the same typography, color palette, controls, and responsive layout.

HD desktop and retina mobile previews are saved locally in `previews/`; they are excluded from the published site and Git source.

The enhanced transparent logo is `dist/assets/brand/vjs-logo-enhanced.png`. The supplied image is preserved as `logo-original.jpeg`, and the built-in imagegen prompts are saved in `logo-enhancement-prompt.txt`. The enhanced logo is used in every header, footer, and favicon.
