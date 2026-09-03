# Google Sheets admin setup

> **[GUIDE: SHEETS-SETUP]** Complete these steps once. Normal content updates
> are then made directly in the private Sheet.

## Create the workbook

1. Sign in to Google and create a blank Google Sheet.
2. Name it **Polar Hub Website Admin**.
3. Keep its sharing setting **Restricted**. Do not publish the Sheet to the web.
4. Select **Extensions → Apps Script**.
5. In the Apps Script editor, open `Code.gs`, remove the example function, and
   paste all content from this repository's `google-apps-script/Code.gs`.
6. Save the script and name the project **Polar Hub Website API**.
7. Choose `setupPolarHubWorkbook` from the function list and click **Run**.
8. Review and approve the requested Google Sheets permission. Return to the Sheet.

The script creates `Guide`, `Settings`, `Services`, `Stats`, `Catalogues`,
`Process`, `Brands`, `FAQ`, `Gallery`, and private `Quotes` tabs. Re-running setup
does not replace tabs that already contain data.

## Deploy the backend

1. In Apps Script, choose **Deploy → New deployment**.
2. Click the gear and select **Web app**.
3. Description: `Polar Hub website API v1`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Click **Deploy**, approve if requested, and copy the Web app URL ending in `/exec`.
7. Open `public/runtime-config.js` in this website project.
8. Paste the URL between the quotes for `appsScriptUrl`.

Example only:

```js
window.POLAR_HUB_CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/PASTE-YOURS-HERE/exec",
  enableSheetQuotes: true,
};
```

Open the `/exec?action=health` URL in a browser. It should show JSON containing
`"ok":true`. Then open `/exec?action=content`; it should show public website data.

## When Code.gs changes

1. Save the updated Apps Script code.
2. Choose **Deploy → Manage deployments**.
3. Edit the existing deployment.
4. Select **New version**, then deploy.

Keep the same `/exec` URL; you normally do not need to change the website.

## Safety rules

- Never put passwords, recovery codes, banking details or private notes in content tabs.
- Never make the Sheet public. The Web app already returns approved content.
- Never rename tab headings unless you also update `Code.gs` and TypeScript types.
- Do not delete the Quotes header row.
- Treat quote rows as customer information: restrict access and delete old data you no longer need.
- Use direct public HTTPS image file URLs. A normal Google Drive sharing page is not a direct image URL.
