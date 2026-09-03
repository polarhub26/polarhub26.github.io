import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ServiceItem, SiteSettings } from "../types";
import { whatsappUrl } from "../lib/whatsapp";

// [GUIDE: FOOTER] Contact values are controlled by the Settings Sheet tab.
export function Footer({ settings, services }: { settings: SiteSettings; services: ServiceItem[] }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href="#home"><span className="brand__mark">PH</span><span><strong>POLAR <em>HUB</em></strong><small>Creations n Solutions</small></span></a>
          <p>{settings.tagline}</p>
          <div className="footer-social">
            {settings.facebookUrl ? <a href={settings.facebookUrl} aria-label="Facebook"><span className="text-social">f</span></a> : <span aria-label="Facebook link not configured"><span className="text-social">f</span></span>}
            {settings.instagramUrl ? <a href={settings.instagramUrl} aria-label="Instagram"><span className="text-social">IG</span></a> : <span aria-label="Instagram link not configured"><span className="text-social">IG</span></span>}
            {settings.tiktokUrl ? <a href={settings.tiktokUrl} aria-label="TikTok"><span className="text-social">TT</span></a> : <span aria-label="TikTok link not configured"><span className="text-social">TT</span></span>}
            <a href={whatsappUrl(settings.whatsappNumber, `Hello ${settings.shortName}`)} aria-label="WhatsApp"><MessageCircle /></a>
          </div>
        </div>
        <div><h2>Quick links</h2><a href="#home">Home</a><a href="#about">About us</a><a href="#catalogues">Catalogues</a><a href="#gallery">Gallery</a><a href="#faq">FAQ</a></div>
        <div><h2>Services</h2>{services.slice(0, 6).map((service) => <a key={service.id} href="#services">{service.title}</a>)}</div>
        <div><h2>Contact</h2><a href={`tel:${settings.phoneDial}`}><Phone />{settings.phoneDisplay}</a><a href={`mailto:${settings.email}`}><Mail />{settings.email}</a><a href={`https://maps.google.com/?q=${encodeURIComponent(settings.location)}`} target="_blank" rel="noreferrer"><MapPin />{settings.location}</a><p>{settings.businessHours}</p></div>
      </div>
      <div className="container footer-legal">
        <details id="privacy"><summary>Privacy policy</summary><p>Details submitted through the quotation form are used to respond to the service request. Do not send passwords or other sensitive information. Contact Polar Hub to request correction or deletion of your enquiry details.</p></details>
        <details id="terms"><summary>Terms and conditions</summary><p>Website information and initial quotations are subject to diagnosis, model support, parts availability and confirmation by Polar Hub. No repair is represented as complete until the agreed work has been performed and tested.</p></details>
      </div>
      <div className="container footer-bottom"><span>© {settings.copyrightYear} {settings.businessName}. All rights reserved.</span><span><a href="#privacy">Privacy</a> · <a href="#terms">Terms</a></span></div>
    </footer>
  );
}
