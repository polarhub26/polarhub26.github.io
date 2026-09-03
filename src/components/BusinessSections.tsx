import { ArrowRight, Building2, Check, Printer, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { BrandItem, GalleryItem, ProcessItem, SiteSettings } from "../types";
import { Icon } from "./Icon";
import { SectionHeading } from "./SectionHeading";
import { resolveImageUrl } from "../lib/images";

// [GUIDE: ABOUT] General contact details come from the Settings Sheet tab.
// Do not add registration or certification claims unless they are confirmed.
export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section className="about-section section-shell" id="about">
      <div className="container about-grid">
        <div className="about-visual" aria-hidden="true">
          <div className="workshop-sign"><span className="brand__mark">PH</span><strong>POLAR HUB</strong><small>{settings.tagline}</small></div>
          <div className="workbench">
            <div><Printer /><span>Printer care</span></div>
            <div><Wrench /><span>Technical repair</span></div>
            <div><ShieldCheck /><span>Clear advice</span></div>
          </div>
        </div>
        <div className="about-copy">
          <SectionHeading eyebrow="About us" title="Your printer, our priority." align="left" />
          <p>Polar Hub Creations n Solutions provides printer troubleshooting, repairs, resets, diagnostics and practical IT support from Soshanguve, Pretoria.</p>
          <p>We explain the issue and available options clearly so you can make an informed decision before work continues.</p>
          <div className="trust-grid">
            <div><Building2 /><span><strong>Professional</strong><small>Organised technical assistance</small></span></div>
            <div><Sparkles /><span><strong>Reliable</strong><small>Clear service communication</small></span></div>
            <div><ShieldCheck /><span><strong>Practical</strong><small>Advice based on diagnosis</small></span></div>
          </div>
          <a className="button button--primary" href="#quote">Learn more <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ process }: { process: ProcessItem[] }) {
  return (
    <section className="process-section section-shell" id="process">
      <div className="container">
        <SectionHeading eyebrow="How it works" title="A clear five-step service process" />
        <ol className="process-list">
          {process.map((item, index) => (
            <li key={item.id}>
              <div className="process-icon"><Icon name={item.icon} size={30} /><span>{item.step}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {index < process.length - 1 && <ArrowRight className="process-arrow" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// [GUIDE: BRANDS] Brand names are plain labels unless you provide approved logo
// image URLs in Sheets. This avoids displaying invented or distorted logos.
export function Brands({ brands }: { brands: BrandItem[] }) {
  return (
    <section className="brands-section section-shell" id="brands">
      <div className="container">
        <SectionHeading eyebrow="Supported brands" title="Support for popular printer brands" description="Contact us with the exact model because service availability differs by printer." />
        <div className="brand-list">
          {brands.map((brand) => {
            const imageUrl = resolveImageUrl(brand.imageUrl);
            return <div className="brand-chip" key={brand.id}>{imageUrl ? <img src={imageUrl} alt={`${brand.name} logo`} loading="lazy" /> : <span>{brand.name}</span>}</div>;
          })}
        </div>
        <div className="brands-action"><a className="button button--primary" href="#quote">View all brands <ArrowRight /></a></div>
      </div>
    </section>
  );
}

// [GUIDE: GALLERY] Add public HTTPS image URLs in the Gallery Sheet tab.
// Cards without images intentionally use the branded service icon treatment.
export function Gallery({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <section className="gallery-section section-shell" id="gallery">
      <div className="container">
        <SectionHeading eyebrow="Our work" title="Printer support in action" description="Service images can be managed from the private Google Sheet." />
        <div className="gallery-grid">
          {gallery.map((item, index) => {
            const imageUrl = resolveImageUrl(item.imageUrl);
            return (
            <article className="gallery-card" key={item.id}>
              {imageUrl ? (
                <img src={imageUrl} alt={item.title} loading="lazy" />
              ) : (
                <div className="gallery-card__fallback">{index === 0 ? <Printer /> : index === 1 ? <Wrench /> : <Check />}</div>
              )}
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}
