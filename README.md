# Polar Hub Creations n Solutions website

> **[GUIDE: START-HERE]** This repository is a complete, no-subscription website:
> React + TypeScript + Vite on GitHub Pages, with a private Google Sheet as the
> simple admin area and Google Apps Script as the quotation/content bridge.

The site includes the responsive Polar Hub homepage, circular quick navigation,
mobile menu, services, catalogues, business statistics, about, process, brands,
gallery, FAQ, quotation form, footer, and WhatsApp actions.

## Free hosting design

| Part | Free service | Purpose |
|---|---|---|
| Website | GitHub Pages | Hosts the compiled React site |
| Admin content | Google Sheets | Lets the owner update text, order and visibility |
| Backend bridge | Google Apps Script | Publishes approved content and saves quote details |
| Customer conversation | WhatsApp | Receives a prepared quotation message and photos |

Google Sites cannot directly host a React/Vite source project. You may embed the
published GitHub Pages URL inside Google Sites, but GitHub Pages should host this
code. To get a root address without `/repository-name/`, name the repository
`YOUR-GITHUB-USERNAME.github.io`. This is still free.

## 1. Run it on your computer

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local address Vite prints. The website works immediately using the
safe content in `src/data/fallbackContent.ts`, even before Sheets is connected.

Before uploading, verify the project:

```bash
npm run check
npm run build
```

## 2. Create the Google Sheets admin

Follow [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md). In short:

1. Create a blank private Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the editor contents with `google-apps-script/Code.gs`.
4. Run `setupPolarHubWorkbook()` once and approve Google permissions.
5. Deploy as a Web app, executing as you and allowing **Anyone** to access it.
6. Copy the final URL ending in `/exec`.
7. Paste it into `public/runtime-config.js`.

The Sheet stays private. Only the public content tabs are returned by the Web
app. The `Quotes` tab is never included in the public response.

## 3. Publish on GitHub Pages

Follow [docs/GITHUB_PAGES_SETUP.md](docs/GITHUB_PAGES_SETUP.md). The included
GitHub Action builds and publishes automatically whenever `main` is updated.

For a URL with no repository subpath, create the repository as:

```text
YOUR-GITHUB-USERNAME.github.io
```

Your free URL will then be `https://YOUR-GITHUB-USERNAME.github.io/`.

## 4. Manage the website later

- Day-to-day content: edit the Google Sheet; no GitHub change is needed.
- Colours and layout: edit `src/styles.css`, then push to GitHub.
- Fallback content: edit `src/data/fallbackContent.ts`.
- Menu structure: edit `src/components/Header.tsx` and keep section IDs valid.
- Apps Script changes: update the deployment so the `/exec` URL uses the new version.

Read [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) for every Sheet tab and
[GUIDE_TAGS.md](GUIDE_TAGS.md) for the comment tags placed throughout the code.

## Important limitations

- A customer-selected photo is not uploaded to Sheets. WhatsApp opens and the
  customer attaches the photo there. This avoids paid file storage and exposing files.
- GitHub Pages is public static hosting. Never commit customer data or secrets.
- The Apps Script endpoint is public so website visitors can submit quotes. Basic
  validation, a honeypot, throttling and spreadsheet-formula protection are included,
  but you should still review the private `Quotes` tab for spam.
- Social URLs are blank by default. Add confirmed links in the Settings tab.

## Project map

```text
src/                     React website and editable fallback content
public/runtime-config.js Google Apps Script connection URL
google-apps-script/      Google Sheets backend
docs/                    Setup and owner instructions
.github/workflows/       Automatic GitHub Pages deployment
scripts/                 Local project validation
```

Copyright © 2026 Polar Hub Creations n Solutions.
