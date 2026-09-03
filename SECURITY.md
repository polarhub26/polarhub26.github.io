# Security notes

> **[GUIDE: SECURITY]** Report private security issues directly to the site owner.

- Never commit Sheet exports, quote records, credentials, tokens or customer images.
- Keep the Google Sheet Restricted to approved staff.
- The public endpoint exposes only website content; it does not expose Quotes.
- Text received from the public form is length-limited and protected against
  spreadsheet-formula injection before being appended.
- Review Quotes for spam and delete personal data when it is no longer needed.
