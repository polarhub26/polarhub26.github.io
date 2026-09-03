import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import type { ServiceItem, SiteSettings } from "../types";
import { whatsappUrl } from "../lib/whatsapp";

interface HeaderProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

const navLinks = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Brands", "#brands"],
  ["Gallery", "#gallery"],
  ["FAQ", "#faq"],
  ["Contact", "#quote"],
] as const;

// [GUIDE: NAVIGATION] Change public section labels here only if you also keep
// the matching section IDs in the page. This prevents broken menu links.
export function Header({ settings, services }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const serviceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!serviceMenuRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <a href={`https://maps.google.com/?q=${encodeURIComponent(settings.location)}`} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /> <span>{settings.location}</span>
          </a>
          <a href={`tel:${settings.phoneDial}`}><Phone aria-hidden="true" /> {settings.phoneDisplay}</a>
          <a href={whatsappUrl(settings.whatsappNumber, `Hello ${settings.shortName}, I would like assistance.`)} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> WhatsApp Us
          </a>
          <div className="topbar__social" aria-label="Social links">
            {settings.facebookUrl ? <a href={settings.facebookUrl} aria-label="Facebook" target="_blank" rel="noreferrer"><span className="text-social">f</span></a> : <span aria-label="Facebook link not configured"><span className="text-social">f</span></span>}
            {settings.instagramUrl ? <a href={settings.instagramUrl} aria-label="Instagram" target="_blank" rel="noreferrer"><span className="text-social">IG</span></a> : <span aria-label="Instagram link not configured"><span className="text-social">IG</span></span>}
            {settings.tiktokUrl ? <a href={settings.tiktokUrl} aria-label="TikTok" target="_blank" rel="noreferrer"><span className="text-social">TT</span></a> : <span aria-label="TikTok link not configured"><span className="text-social">TT</span></span>}
            <a href={`mailto:${settings.email}`} aria-label="Email"><Mail /></a>
          </div>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar__inner">
          <a className="brand" href="#home" onClick={closeMenus} aria-label={`${settings.businessName} home`}>
            <span className="brand__mark" aria-hidden="true">PH</span>
            <span><strong>POLAR <em>HUB</em></strong><small>Creations n Solutions</small></span>
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="main-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <nav id="main-navigation" className={`main-nav ${mobileOpen ? "main-nav--open" : ""}`} aria-label="Main navigation">
            <a href="#home" onClick={closeMenus}>Home</a>
            <a href="#about" onClick={closeMenus}>About Us</a>
            <div className="services-menu" ref={serviceMenuRef}>
              <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((open) => !open)}>
                Services <ChevronDown aria-hidden="true" />
              </button>
              <div className={`services-menu__panel ${servicesOpen ? "services-menu__panel--open" : ""}`}>
                {services.map((service) => <a key={service.id} href="#services" onClick={closeMenus}>{service.title}</a>)}
              </div>
            </div>
            {navLinks.slice(2).map(([label, href]) => <a key={href} href={href} onClick={closeMenus}>{label}</a>)}
            <a className="button button--primary navbar__quote" href="#quote" onClick={closeMenus}>Get a Quote</a>
          </nav>
        </div>
      </header>
    </>
  );
}
