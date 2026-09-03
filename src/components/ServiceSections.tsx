import { ArrowRight, MessageCircle } from "lucide-react";
import type { CatalogueItem, ServiceItem, SiteSettings, StatItem } from "../types";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";
import { whatsappUrl } from "../lib/whatsapp";
import { resolveImageUrl } from "../lib/images";

interface QuickServicesProps {
  services: ServiceItem[];
}

// [GUIDE: SHEET-CONTENT] These cards are generated from the Services Sheet tab.
// Set Published to FALSE there to hide a card without deleting it.
export function QuickServices({ services }: QuickServicesProps) {
  return (
    <section className="quick-services section-shell" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          eyebrow="Technical services"
          title="Practical support for your printer"
          description="Start with the service closest to your problem. We confirm the correct solution after diagnosis."
        />
        <h2 className="sr-only" id="services-title">Printer services</h2>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <span className="icon-tile"><Icon name={service.icon} size={30} /></span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#quote">Request service <ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <section className="stats-section" aria-label="Business statistics">
      <div className="container stats-bar">
        {stats.map((stat) => (
          <div className="stat" key={stat.id}>
            <Icon name={stat.icon} size={34} />
            <span><strong>{stat.value}</strong><small>{stat.label}</small></span>
          </div>
        ))}
      </div>
    </section>
  );
}

interface CataloguesProps {
  catalogues: CatalogueItem[];
  settings: SiteSettings;
}

// [GUIDE: CATALOGUES] Edit titles, descriptions, images and WhatsApp messages
// in the Catalogues Sheet tab. Use a direct public HTTPS link for an image.
export function Catalogues({ catalogues, settings }: CataloguesProps) {
  return (
    <section className="catalogue-section section-shell" id="catalogues">
      <div className="container">
        <SectionHeading
          eyebrow="WhatsApp catalogues"
          title="Choose what you need"
          description="Open a catalogue request and continue the conversation directly on WhatsApp."
        />
        <div className="catalogue-grid">
          {catalogues.map((item) => {
            const imageUrl = resolveImageUrl(item.imageUrl);
            return (
            <article className="catalogue-card" key={item.id}>
              <div className="catalogue-card__media">
                {imageUrl ? (
                  <img src={imageUrl} alt={`${item.title} service`} loading="lazy" />
                ) : (
                  <Icon name={item.icon} size={52} strokeWidth={1.5} />
                )}
              </div>
              <div className="catalogue-card__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="button button--small" href={whatsappUrl(settings.whatsappNumber, item.whatsappMessage)} target="_blank" rel="noreferrer">
                  View catalogue <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          );})}
        </div>

        <div className="whatsapp-banner">
          <span><MessageCircle aria-hidden="true" /><strong>Chat on WhatsApp</strong> to view catalogues or request a service.</span>
          <a className="button button--white" href={whatsappUrl(settings.whatsappNumber, `Hello ${settings.shortName}, I would like to view your catalogues.`)} target="_blank" rel="noreferrer">Open WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
