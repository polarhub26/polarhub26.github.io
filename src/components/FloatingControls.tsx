import { useEffect, useState, type CSSProperties } from "react";
import { CircleHelp, Home, Image, Info, MessageCircle, Printer, X } from "lucide-react";
import type { SiteSettings } from "../types";
import { whatsappUrl } from "../lib/whatsapp";

const circleLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#services", label: "Services", icon: Printer },
  { href: "#catalogues", label: "Catalogues", icon: MessageCircle },
  { href: "#about", label: "About", icon: Info },
  { href: "#gallery", label: "Gallery", icon: Image },
  { href: "#faq", label: "FAQ", icon: CircleHelp },
];

// [GUIDE: CIRCLE-NAV] This is the requested circular quick-navigation control.
// Keep WhatsApp separate on the right so the two controls do not overlap.
export function NavigationCircle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <div className={`circle-nav ${open ? "circle-nav--open" : ""}`}>
      <div className="circle-nav__items" id="circular-navigation">
        {circleLinks.map(({ href, label, icon: LinkIcon }, index) => (
          <a key={href} href={href} aria-label={label} style={{ "--item": index } as CSSProperties} onClick={() => setOpen(false)}>
            <LinkIcon aria-hidden="true" /><span>{label}</span>
          </a>
        ))}
      </div>
      <button type="button" aria-controls="circular-navigation" aria-expanded={open} aria-label={open ? "Close quick navigation" : "Open quick navigation"} onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <span>MENU</span>}
      </button>
    </div>
  );
}

export function FloatingWhatsApp({ settings }: { settings: SiteSettings }) {
  return (
    <a className="floating-whatsapp" href={whatsappUrl(settings.whatsappNumber, `Hello ${settings.shortName}, I would like assistance.`)} target="_blank" rel="noreferrer" aria-label="Chat with Polar Hub on WhatsApp">
      <MessageCircle aria-hidden="true" /><span>WhatsApp</span>
    </a>
  );
}
