import type { QuotePayload, SiteSettings } from "../types";

export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage(
  quote: QuotePayload,
  settings: SiteSettings,
  reference?: string,
): string {
  const lines = [
    `Hello ${settings.shortName}, I would like a quotation.`,
    reference ? `Reference: ${reference}` : "",
    `Name: ${quote.name}`,
    `Phone: ${quote.phone}`,
    quote.email ? `Email: ${quote.email}` : "",
    `Printer: ${quote.brand}${quote.model ? ` ${quote.model}` : ""}`,
    `Service: ${quote.service}`,
    `Problem: ${quote.problem}`,
    `Preferred contact: ${quote.preferredContact}`,
    quote.imageFileName
      ? `Photo selected: ${quote.imageFileName} (I will attach it manually in WhatsApp.)`
      : "",
  ];

  return lines.filter(Boolean).join("\n");
}
