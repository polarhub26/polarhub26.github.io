# Website owner admin guide

> **[GUIDE: ADMIN]** Use the Google Sheet for routine updates. Use GitHub only
> for design or code changes.

| Sheet tab | Controls | Important columns |
|---|---|---|
| Settings | Business details and social links | `key`, `value` |
| Services | Quick service cards and quote choices | `published`, `sortOrder` |
| Stats | Editable business statistics | `value`, `label` |
| Catalogues | Catalogue cards and WhatsApp text | `imageUrl`, `whatsappMessage` |
| Process | Five service steps | `step`, `sortOrder` |
| Brands | Supported brand list | `name`, `imageUrl` |
| FAQ | Accordion questions and answers | `question`, `answer` |
| Gallery | Work/service cards | `imageUrl` |
| Quotes | Private customer enquiries | `status`, contact fields |

Use `TRUE` under `published` to display a row and `FALSE` to hide it. Use whole
numbers in `sortOrder`. Do not reuse an `id` within the same tab.

## Quote workflow

1. A visitor completes the website form.
2. Apps Script appends the text details to the private Quotes tab.
3. WhatsApp opens with the same details prepared.
4. The visitor manually attaches any printer photo in WhatsApp.
5. Update the Quotes `status` cell to values meaningful to you, such as `New`,
   `Contacted`, `Booked`, or `Closed`.

The site never claims a server submission succeeded when Sheets is unavailable;
it displays a fallback message and still opens WhatsApp.
