/**
 * [GUIDE: SMOKE-TEST]
 * This dependency-free project test renders the React page through Vite and
 * checks the critical sections, controls, links, validation and responsive CSS.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const server = await createServer({
  root,
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const html = renderToStaticMarkup(React.createElement(App));
  const css = readFileSync(resolve(root, "src/styles.css"), "utf8");

  for (const id of ["home", "services", "catalogues", "about", "process", "brands", "gallery", "faq", "quote"]) {
    assert.match(html, new RegExp(`id="${id}"`), `Missing #${id} section`);
  }

  assert.match(html, /aria-controls="main-navigation"/, "Mobile navigation button is missing");
  assert.match(html, /aria-controls="circular-navigation"/, "Circular navigation button is missing");
  assert.match(html, /aria-expanded="true"/, "FAQ should render an expanded accessible answer");
  assert.match(html, /href="tel:\+27783538140"/, "Telephone link is missing");
  assert.match(html, /https:\/\/wa\.me\/27783538140/, "WhatsApp link is missing");
  assert.match(html, /name="email"|autocomplete="email"/, "Quote email field is missing");
  assert.match(html, /required=""/, "Required form validation attributes are missing");

  assert.match(css, /overflow-x:\s*hidden/, "Horizontal overflow protection is missing");
  for (const breakpoint of [1060, 900, 640, 380]) {
    assert.match(css, new RegExp(`max-width:\\s*${breakpoint}px`), `Missing ${breakpoint}px breakpoint`);
  }

  console.log("Smoke test passed: responsive sections, navigation, FAQ, quote fields, telephone and WhatsApp links are present.");
} finally {
  await server.close();
}
