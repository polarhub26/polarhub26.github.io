import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, MessageCircle, Send } from "lucide-react";
import type { QuotePayload, ServiceItem, SiteSettings } from "../types";
import { saveQuote } from "../lib/contentApi";
import { quoteMessage, whatsappUrl } from "../lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

const emptyQuote: QuotePayload = {
  name: "",
  phone: "",
  email: "",
  brand: "",
  model: "",
  service: "",
  problem: "",
  preferredContact: "WhatsApp",
  imageFileName: "",
  company: "",
};

interface QuoteFormProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

// [GUIDE: QUOTES] When Apps Script is connected, form details are stored in the
// private Quotes tab. WhatsApp still opens so the customer can attach photos.
// Never upload customer files to a public GitHub repository.
export function QuoteForm({ settings, services }: QuoteFormProps) {
  const [quote, setQuote] = useState<QuotePayload>(emptyQuote);
  const [status, setStatus] = useState<"idle" | "sending" | "saved" | "fallback">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update = (field: keyof QuotePayload, value: string) => {
    setQuote((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (quote.company) return;

    setStatus("sending");
    setStatusMessage("Saving your request…");

    // Open the tab during the direct click event to reduce popup blocking.
    const whatsappTab = window.open("about:blank", "polar-hub-whatsapp");
    const result = await saveQuote(quote);
    const message = quoteMessage(quote, settings, result.reference);
    const target = whatsappUrl(settings.whatsappNumber, message);

    if (whatsappTab) whatsappTab.location.href = target;
    else window.location.href = target;

    if (result.saved) {
      setStatus("saved");
      setStatusMessage(`Request saved${result.reference ? ` as ${result.reference}` : ""}. WhatsApp has opened for the next step.`);
      setQuote(emptyQuote);
    } else {
      setStatus("fallback");
      setStatusMessage("The Sheet was not connected, so your details were opened in WhatsApp instead.");
    }
  };

  return (
    <section className="quote-section section-shell" id="quote">
      <div className="container quote-grid">
        <div className="quote-copy">
          <SectionHeading eyebrow="Get a quotation" title="Tell us what your printer is doing" align="left" />
          <p>Include the printer brand, model and exact error. Clear information helps us advise you faster.</p>
          <ul>
            <li><CheckCircle2 />Your details can be recorded in the private admin Sheet.</li>
            <li><CheckCircle2 />WhatsApp opens with the same information prepared.</li>
            <li><CheckCircle2 />Attach printer photos manually after WhatsApp opens.</li>
          </ul>
          <a className="quote-direct" href={`tel:${settings.phoneDial}`}><MessageCircle />Prefer to call? {settings.phoneDisplay}</a>
        </div>

        <form className="quote-form" onSubmit={submit}>
          <div className="form-row">
            <label>Full name<input name="name" value={quote.name} onChange={(event) => update("name", event.target.value)} required maxLength={80} autoComplete="name" /></label>
            <label>Telephone<input name="phone" value={quote.phone} onChange={(event) => update("phone", event.target.value)} required maxLength={30} inputMode="tel" autoComplete="tel" /></label>
          </div>
          <div className="form-row">
            <label>Email address<input name="email" type="email" value={quote.email} onChange={(event) => update("email", event.target.value)} required maxLength={120} autoComplete="email" /></label>
            <label>Preferred contact<select name="preferredContact" value={quote.preferredContact} onChange={(event) => update("preferredContact", event.target.value)}><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label>
          </div>
          <div className="form-row">
            <label>Printer brand<input name="brand" value={quote.brand} onChange={(event) => update("brand", event.target.value)} required maxLength={60} placeholder="For example: Epson" /></label>
            <label>Printer model<input name="model" value={quote.model} onChange={(event) => update("model", event.target.value)} required maxLength={80} placeholder="For example: L3150" /></label>
          </div>
          <label>Service required<select name="service" value={quote.service} onChange={(event) => update("service", event.target.value)} required><option value="">Select a service</option>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
          <label>Describe the problem<textarea name="problem" value={quote.problem} onChange={(event) => update("problem", event.target.value)} required maxLength={1200} rows={5} placeholder="Include the exact error message and what happened before the problem started." /></label>
          <label>Optional photo<input name="printerPhoto" type="file" accept="image/*" onChange={(event) => update("imageFileName", event.target.files?.[0]?.name ?? "")} /><small>The file is not uploaded automatically. Attach it manually when WhatsApp opens.</small></label>
          <label className="honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" value={quote.company} onChange={(event) => update("company", event.target.value)} /></label>
          <button className="button button--primary form-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? <LoaderCircle className="spin" /> : <Send />} Send request & open WhatsApp
          </button>
          {status !== "idle" && <p className={`form-status form-status--${status}`} role="status">{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
}
