# Code guide tags

> **[GUIDE: TAG-KEY]** Search the project for `[GUIDE:` to find short instructions
> next to the code they control. These comments are documentation and do not alter
> how the website runs.

| Tag | File area | What you change there |
|---|---|---|
| `[GUIDE: START-HERE]` | `README.md` | Overall setup and deployment path |
| `[GUIDE: CONNECTION]` | `public/runtime-config.js` | Paste the Apps Script `/exec` URL |
| `[GUIDE: FALLBACK-CONTENT]` | `src/data/fallbackContent.ts` | Content shown when Sheets is unavailable |
| `[GUIDE: THEME]` | `src/styles.css` | Brand colours and global visual tokens |
| `[GUIDE: HEADER]` | `src/components/Header.tsx` | Main and mobile navigation |
| `[GUIDE: HERO]` | `src/components/Hero.tsx` | Hero benefits and presentation |
| `[GUIDE: CIRCLE-NAV]` | `src/components/FloatingControls.tsx` | Circular navigation links |
| `[GUIDE: QUOTES]` | `src/components/QuoteForm.tsx` | Quote fields and WhatsApp handoff |
| `[GUIDE: GOOGLE-SHEETS-BACKEND]` | `google-apps-script/Code.gs` | Sheet setup and public endpoint |
| `[GUIDE: GITHUB-ACTION]` | `.github/workflows/deploy.yml` | Automatic GitHub Pages publishing |
| `[GUIDE: VALIDATION]` | `scripts/validate-project.mjs` | Required-file and import checks |

Do not put passwords, tokens, private Sheet links, customer details, or API keys
into any tagged file. The Apps Script deployment URL is not a password, but the
Sheet itself should remain private.
