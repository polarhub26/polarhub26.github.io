/**
 * [GUIDE: GOOGLE-SHEETS-BACKEND]
 * Paste this complete file into a Google Sheet's Apps Script editor as Code.gs.
 * Run setupPolarHubWorkbook() once, then deploy it as a Web app.
 * Never place passwords, API keys, banking details, or customer files in public tabs.
 */

const POLAR_HUB = Object.freeze({
  version: "1.0.0",
  spreadsheetProperty: "POLAR_HUB_SPREADSHEET_ID",
  quoteHeaders: [
    "timestamp", "reference", "status", "name", "phone", "email", "brand",
    "model", "service", "problem", "preferredContact", "imageFileName", "source"
  ],
  contentTabs: ["Services", "Stats", "Catalogues", "Process", "Brands", "FAQ", "Gallery"]
});

const POLAR_HUB_DEFAULTS = {
  Settings: {
    headers: ["key", "value", "guidance"],
    rows: [
      ["businessName", "Polar Hub Creations n Solutions", "Public business name"],
      ["shortName", "Polar Hub", "Short name used in messages"],
      ["tagline", "We Fix. We Reset. We Keep You Printing.", "Main tagline"],
      ["heroDescription", "Printer repairs, reset solutions, diagnostics and practical technical support for homes and small businesses.", "Short public introduction"],
      ["location", "Soshanguve, Pretoria, South Africa", "Public location"],
      ["phoneDisplay", "078 353 8140", "Human-readable phone number"],
      ["phoneDial", "+27783538140", "International click-to-call number"],
      ["whatsappNumber", "27783538140", "Digits only, including country code"],
      ["email", "info@polarhub.co.za", "Public contact email"],
      ["businessHours", "Monday–Friday 08:00–17:00 · Saturday 08:00–13:00", "Public hours"],
      ["copyrightYear", "2026", "Footer year"],
      ["facebookUrl", "", "Optional full HTTPS link"],
      ["instagramUrl", "", "Optional full HTTPS link"],
      ["tiktokUrl", "", "Optional full HTTPS link"]
    ]
  },
  Services: {
    headers: ["id", "title", "description", "icon", "imageUrl", "published", "sortOrder"],
    rows: [
      ["software", "Software Update", "Driver installation, firmware checks and printer software support.", "software", "", true, 1],
      ["reset", "Printer Reset", "Careful reset and restoration for supported printer models.", "refresh", "", true, 2],
      ["waste-ink", "Waste Ink Pad Reset", "Waste-ink warning diagnosis and supported reset assistance.", "trash", "", true, 3],
      ["ink-check", "Ink Check", "Ink-level, print-quality and basic cartridge diagnostics.", "droplet", "", true, 4],
      ["consultation", "Consultation", "Clear advice before you spend money on repair or replacement.", "messages", "", true, 5],
      ["technician", "Printer Technician", "Hands-on troubleshooting, maintenance and technical support.", "wrench", "", true, 6]
    ]
  },
  Stats: {
    headers: ["id", "value", "label", "icon", "published", "sortOrder"],
    rows: [
      ["experience", "5+", "Years Experience", "award", true, 1],
      ["customers", "1,000+", "Happy Customers", "users", true, 2],
      ["repairs", "2,500+", "Printers Repaired", "printer", true, 3],
      ["response", "24–48h", "Average Response Time", "clock", true, 4]
    ]
  },
  Catalogues: {
    headers: ["id", "title", "description", "icon", "imageUrl", "whatsappMessage", "published", "sortOrder"],
    rows: [
      ["printer-repairs", "Printer Repairs", "Assessment, maintenance and repair assistance for common printer faults.", "printer", "", "Hello Polar Hub, I would like more information about printer repair services.", true, 1],
      ["ink-supplies", "Ink & Supplies", "Ask about compatible inks, consumables and printer supplies.", "ink", "", "Hello Polar Hub, I would like more information about ink and printer supplies.", true, 2],
      ["software-services", "Software Services", "Printer drivers, setup, software troubleshooting and updates.", "software", "", "Hello Polar Hub, I would like more information about printer software services.", true, 3],
      ["reset-solutions", "Reset Solutions", "Supported printer reset and waste-ink warning solutions.", "refresh", "", "Hello Polar Hub, I would like more information about printer reset solutions.", true, 4],
      ["maintenance-tools", "Maintenance Tools", "Cleaning and maintenance guidance for keeping printers reliable.", "tools", "", "Hello Polar Hub, I would like more information about printer maintenance tools.", true, 5],
      ["it-support", "IT Support", "Basic computer, connectivity and business technology support.", "support", "", "Hello Polar Hub, I would like more information about IT support.", true, 6]
    ]
  },
  Process: {
    headers: ["id", "step", "title", "description", "icon", "published", "sortOrder"],
    rows: [
      ["book", 1, "Book", "Contact us and describe the printer problem.", "calendar", true, 1],
      ["diagnosis", 2, "Diagnosis", "We inspect the issue and explain the options.", "search", true, 2],
      ["repair", 3, "Repair", "Approved repair or reset work is completed.", "wrench", true, 3],
      ["testing", 4, "Testing", "Print quality and core functions are checked.", "check", true, 4],
      ["collection", 5, "Collection", "Collect your printer and receive practical advice.", "package", true, 5]
    ]
  },
  Brands: {
    headers: ["id", "name", "imageUrl", "published", "sortOrder"],
    rows: [
      ["epson", "Epson", "", true, 1], ["hp", "HP", "", true, 2],
      ["canon", "Canon", "", true, 3], ["brother", "Brother", "", true, 4],
      ["samsung", "Samsung", "", true, 5], ["lexmark", "Lexmark", "", true, 6]
    ]
  },
  FAQ: {
    headers: ["id", "question", "answer", "published", "sortOrder"],
    rows: [
      ["repair-types", "What printer problems do you repair?", "We assist with common printing, paper-feed, connection, software, ink and reset-related problems. A diagnosis confirms what is possible for your model.", true, 1],
      ["reset", "Can every printer be reset?", "No. Reset availability depends on the printer brand, model and exact error. Send the model and error message before booking.", true, 2],
      ["waste-ink", "What is a waste-ink-pad warning?", "It is a maintenance warning found on some inkjet printers. The printer must be assessed because resetting a counter does not automatically repair a physically saturated pad.", true, 3],
      ["time", "How long does a repair take?", "Timing depends on diagnosis, parts and workload. We confirm the expected turnaround after inspecting the printer.", true, 4],
      ["delivery", "Do you offer collection and delivery?", "Contact us with your location to confirm whether collection or delivery is available and whether a transport charge applies.", true, 5],
      ["brands", "Which brands do you support?", "We commonly assist with Epson, HP, Canon, Brother, Samsung and Lexmark. Support still depends on the exact model and fault.", true, 6],
      ["quote", "How do I request a quotation?", "Complete the quotation form or send the printer brand, model, fault and clear photos through WhatsApp.", true, 7]
    ]
  },
  Gallery: {
    headers: ["id", "title", "description", "imageUrl", "published", "sortOrder"],
    rows: [
      ["diagnostics", "Printer Diagnostics", "Careful fault checks before repair decisions are made.", "", true, 1],
      ["maintenance", "Maintenance Work", "Practical cleaning and maintenance for supported equipment.", "", true, 2],
      ["setup", "Software Setup", "Printer connection, drivers and software configuration.", "", true, 3]
    ]
  }
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Polar Hub Admin")
    .addItem("Set up / repair workbook", "setupPolarHubWorkbook")
    .addItem("Show connection instructions", "showConnectionInstructions")
    .addToUi();
}

/** [GUIDE: RUN-ONCE] Run this from the Apps Script editor while the target Sheet is open. */
function setupPolarHubWorkbook() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error("Open this script from a Google Sheet, then run setupPolarHubWorkbook again.");

  PropertiesService.getScriptProperties().setProperty(POLAR_HUB.spreadsheetProperty, spreadsheet.getId());
  ensureGuideTab_(spreadsheet);
  Object.keys(POLAR_HUB_DEFAULTS).forEach(function (name) {
    ensureContentTab_(spreadsheet, name, POLAR_HUB_DEFAULTS[name]);
  });
  ensureQuotesTab_(spreadsheet);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName("Guide"));
  SpreadsheetApp.getUi().alert("Polar Hub admin workbook is ready. Read the Guide tab, update content, then deploy the Apps Script as a Web app.");
}

function ensureGuideTab_(spreadsheet) {
  const name = "Guide";
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name, 0);
  if (sheet.getLastRow() > 0) return;

  const rows = [
    ["POLAR HUB WEBSITE ADMIN", "WHAT TO DO"],
    ["1. Settings", "Edit public business details. Never add passwords or private notes."],
    ["2. Content tabs", "Edit rows in Services, Stats, Catalogues, Process, Brands, FAQ and Gallery."],
    ["3. Publish", "Use TRUE in the published column to show a row, or FALSE to hide it."],
    ["4. Order", "Use sortOrder values 1, 2, 3… to control the display order."],
    ["5. Images", "Use a direct public HTTPS image URL. Google Drive sharing-page links do not work as image URLs."],
    ["6. Quotes", "Customer requests are stored privately in Quotes. Do not publish or share that tab."],
    ["7. Website connection", "Copy the deployed Web app URL into public/runtime-config.js in the GitHub project."],
    ["Safety", "Keep the spreadsheet private. The Web app returns only the approved public content tabs, never Quotes."],
    ["Updates", "After changing Sheet content, refresh the website. Code changes require a new GitHub deployment."]
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange(1, 1, 1, 2).setBackground("#00143D").setFontColor("#FFFFFF").setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(2, 680);
  sheet.getDataRange().setWrap(true).setVerticalAlignment("top");
}

function ensureContentTab_(spreadsheet, name, definition) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, definition.headers.length).setValues([definition.headers]);
    if (definition.rows.length) sheet.getRange(2, 1, definition.rows.length, definition.headers.length).setValues(definition.rows);
  }
  styleAdminTab_(sheet);
}

function ensureQuotesTab_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName("Quotes");
  if (!sheet) sheet = spreadsheet.insertSheet("Quotes");
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, POLAR_HUB.quoteHeaders.length).setValues([POLAR_HUB.quoteHeaders]);
  styleAdminTab_(sheet);
  sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");
}

function styleAdminTab_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastColumn).setBackground("#00143D").setFontColor("#FFFFFF").setFontWeight("bold");
  sheet.getDataRange().setWrap(true).setVerticalAlignment("top");
  sheet.autoResizeColumns(1, Math.min(lastColumn, 8));
}

function showConnectionInstructions() {
  SpreadsheetApp.getUi().alert(
    "Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Copy the /exec URL into public/runtime-config.js in your GitHub project."
  );
}

/** [GUIDE: PUBLIC-API] The website reads content through this endpoint. */
function doGet(event) {
  try {
    const action = event && event.parameter ? event.parameter.action : "content";
    if (action === "health") return json_({ ok: true, service: "Polar Hub Sheets API", version: POLAR_HUB.version });
    if (action !== "content") return json_({ ok: false, message: "Unknown action." });
    return json_({ ok: true, content: readPublicContent_(), generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, message: "Content is temporarily unavailable." });
  }
}

/** [GUIDE: QUOTE-ENDPOINT] Only quotation text is accepted; files are never uploaded here. */
function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || "{}");
    if (payload.action !== "quote") return json_({ ok: false, saved: false, message: "Unknown action." });
    if (String(payload.company || "").trim()) return json_({ ok: true, saved: false });

    const required = ["name", "phone", "brand", "service", "problem"];
    const missing = required.filter(function (key) { return !String(payload[key] || "").trim(); });
    if (missing.length) return json_({ ok: false, saved: false, message: "Missing required fields: " + missing.join(", ") });

    const throttleKey = "quote_" + digest_(String(payload.phone || "") + "|" + String(payload.email || ""));
    const cache = CacheService.getScriptCache();
    if (cache.get(throttleKey)) return json_({ ok: false, saved: false, message: "Please wait before sending another request." });
    cache.put(throttleKey, "1", 30);

    const reference = createReference_();
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error("Quote log is busy.");
    try {
      const sheet = getSpreadsheet_().getSheetByName("Quotes");
      if (!sheet) throw new Error("Quotes tab is missing. Run setupPolarHubWorkbook().");
      sheet.appendRow([
        new Date(), reference, "New", safeCell_(payload.name, 80), safeCell_(payload.phone, 30),
        safeCell_(payload.email, 120), safeCell_(payload.brand, 60), safeCell_(payload.model, 80),
        safeCell_(payload.service, 100), safeCell_(payload.problem, 1200),
        safeCell_(payload.preferredContact, 40), safeCell_(payload.imageFileName, 180), "Website"
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true, saved: true, reference: reference });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, saved: false, message: "The request could not be saved. Please use WhatsApp." });
  }
}

function readPublicContent_() {
  return {
    settings: readSettings_(),
    services: readObjects_("Services"),
    stats: readObjects_("Stats"),
    catalogues: readObjects_("Catalogues"),
    process: readObjects_("Process"),
    brands: readObjects_("Brands"),
    faqs: readObjects_("FAQ"),
    gallery: readObjects_("Gallery")
  };
}

function readSettings_() {
  const sheet = getSpreadsheet_().getSheetByName("Settings");
  if (!sheet || sheet.getLastRow() < 2) return {};
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getDisplayValues().reduce(function (result, row) {
    const key = String(row[0] || "").trim();
    if (key) result[key] = String(row[1] || "").trim();
    return result;
  }, {});
}

function readObjects_(sheetName) {
  const sheet = getSpreadsheet_().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(function (value) { return String(value).trim(); });
  return values.map(function (row) {
    return headers.reduce(function (item, header, index) {
      if (!header) return item;
      let value = row[index];
      if (header === "published") value = asBoolean_(value);
      if (header === "sortOrder" || header === "step") value = Number(value) || 0;
      item[header] = value;
      return item;
    }, {});
  }).filter(function (item) {
    return item.id && item.published === true;
  }).sort(function (a, b) {
    return (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
  });
}

function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty(POLAR_HUB.spreadsheetProperty);
  if (!id) throw new Error("Backend is not configured. Run setupPolarHubWorkbook().");
  return SpreadsheetApp.openById(id);
}

function asBoolean_(value) {
  return value === true || ["true", "yes", "1", "published"].indexOf(String(value).trim().toLowerCase()) >= 0;
}

function safeCell_(value, maxLength) {
  let text = String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, maxLength);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return text;
}

function createReference_() {
  const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  return "PH-" + date + "-" + Utilities.getUuid().slice(0, 6).toUpperCase();
}

function digest_(text) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text)
    .slice(0, 8)
    .map(function (byte) { return (byte + 256).toString(16).slice(-2); })
    .join("");
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
