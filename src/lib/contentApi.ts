import { fallbackContent } from "../data/fallbackContent";
import type { QuotePayload, SiteContent } from "../types";
import { getRuntimeConfig } from "./runtimeConfig";

interface QuoteResponse {
  ok: boolean;
  saved: boolean;
  reference?: string;
  message?: string;
}

function ordered<T extends { published: boolean; sortOrder: number }>(items: T[]): T[] {
  return items.filter((item) => item.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

function mergeContent(value: Partial<SiteContent>): SiteContent {
  const use = <T,>(incoming: T[] | undefined, fallback: T[]) =>
    Array.isArray(incoming) && incoming.length ? incoming : fallback;

  return {
    settings: { ...fallbackContent.settings, ...(value.settings ?? {}) },
    services: ordered(use(value.services, fallbackContent.services)),
    stats: ordered(use(value.stats, fallbackContent.stats)),
    catalogues: ordered(use(value.catalogues, fallbackContent.catalogues)),
    process: ordered(use(value.process, fallbackContent.process)),
    brands: ordered(use(value.brands, fallbackContent.brands)),
    faqs: ordered(use(value.faqs, fallbackContent.faqs)),
    gallery: ordered(use(value.gallery, fallbackContent.gallery)),
  };
}

// [GUIDE: DATA-FLOW] The site remains usable with local fallback content if the
// Sheet is not configured. When connected, public Sheet rows replace it.
export async function loadSiteContent(): Promise<{ content: SiteContent; source: "sheet" | "fallback" }> {
  const { appsScriptUrl } = getRuntimeConfig();
  if (!appsScriptUrl) return { content: fallbackContent, source: "fallback" };

  try {
    const separator = appsScriptUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${appsScriptUrl}${separator}action=content&_=${Date.now()}`, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    const data = (await response.json()) as { ok?: boolean; content?: Partial<SiteContent> };
    if (!data.ok || !data.content) throw new Error("Invalid content response");
    return { content: mergeContent(data.content), source: "sheet" };
  } catch (error) {
    console.warn("Google Sheets content unavailable; using bundled content.", error);
    return { content: fallbackContent, source: "fallback" };
  }
}

// Apps Script accepts a plain-text JSON body to avoid a browser CORS preflight.
export async function saveQuote(quote: QuotePayload): Promise<QuoteResponse> {
  const { appsScriptUrl, enableSheetQuotes } = getRuntimeConfig();
  if (!appsScriptUrl || !enableSheetQuotes) {
    return { ok: true, saved: false, message: "Google Sheets is not connected." };
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "quote", ...quote }),
    });
    if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
    return (await response.json()) as QuoteResponse;
  } catch (error) {
    console.warn("Could not save quotation to Google Sheets.", error);
    return { ok: false, saved: false, message: "The Sheet connection was unavailable." };
  }
}
