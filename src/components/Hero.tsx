import { CheckCircle2, MessageCircle, Printer, Wrench } from "lucide-react";
import type { SiteSettings } from "../types";
import { whatsappUrl } from "../lib/whatsapp";

interface HeroProps {
  settings: SiteSettings;
}

const benefits = [
  "Expert Printer Repair & Maintenance",
  "Software & Printer Reset Solutions",
  "Ink Level Check & Diagnostics",
  "Professional Support You Can Trust",
];

// [GUIDE: HERO] The business-wide heading and contact values come from Sheets.
// Change the four benefit bullets above only when the service promise changes.
export function Hero({ settings }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero__glow hero__glow--one" />
      <div className="hero__glow hero__glow--two" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Soshanguve printer support</p>
          <h1><span>POLAR</span> <strong>HUB</strong></h1>
          <p className="hero__script">Creations n Solutions</p>
          <p className="hero__tagline">{settings.tagline}</p>
          <p className="hero__description">{settings.heroDescription}</p>
          <ul className="hero__benefits">
            {benefits.map((benefit) => <li key={benefit}><CheckCircle2 aria-hidden="true" /> {benefit}</li>)}
          </ul>
          <div className="hero__actions">
            <a className="button button--primary" href={whatsappUrl(settings.whatsappNumber, `Hello ${settings.shortName}, I need help with a printer.`)} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> {settings.phoneDisplay}
            </a>
            <a className="button button--outline-light" href="#services">Our Services</a>
          </div>
        </div>

        <div className="hero__visual" aria-label="Printer repair and technical support">
          <div className="hero__brand-badges"><span>EPSON</span><span>hp</span></div>
          <div className="device-card device-card--back">
            <Printer aria-hidden="true" />
            <div><strong>Printer diagnostics</strong><small>Errors · software · ink checks</small></div>
          </div>
          <div className="device-card device-card--front">
            <Printer aria-hidden="true" />
            <div><strong>Professional support</strong><small>Repair · reset · maintenance</small></div>
          </div>
          <div className="service-status"><Wrench aria-hidden="true" /><span><small>Service desk</small><strong>Ready to help</strong></span></div>
        </div>
      </div>
    </section>
  );
}
