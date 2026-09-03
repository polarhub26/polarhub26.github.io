import { useEffect, useState } from "react";
import { About, Brands, Gallery, HowItWorks } from "./components/BusinessSections";
import { Faq } from "./components/Faq";
import { FloatingWhatsApp, NavigationCircle } from "./components/FloatingControls";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuoteForm } from "./components/QuoteForm";
import { Catalogues, QuickServices, StatsBar } from "./components/ServiceSections";
import { fallbackContent } from "./data/fallbackContent";
import { loadSiteContent } from "./lib/contentApi";
import type { SiteContent } from "./types";

// [GUIDE: PAGE-ORDER] Reorder the components below only when you intentionally
// want to change the homepage layout. Keep their section IDs aligned with menus.
export default function App() {
  const [content, setContent] = useState<SiteContent>(fallbackContent);

  useEffect(() => {
    let active = true;
    loadSiteContent().then(({ content: nextContent }) => {
      if (active) setContent(nextContent);
    });
    return () => { active = false; };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header settings={content.settings} services={content.services} />
      <main id="main-content">
        <Hero settings={content.settings} />
        <QuickServices services={content.services} />
        <StatsBar stats={content.stats} />
        <Catalogues catalogues={content.catalogues} settings={content.settings} />
        <About settings={content.settings} />
        <HowItWorks process={content.process} />
        <Brands brands={content.brands} />
        <Gallery gallery={content.gallery} />
        <Faq items={content.faqs} />
        <QuoteForm settings={content.settings} services={content.services} />
      </main>
      <Footer settings={content.settings} services={content.services} />
      <NavigationCircle />
      <FloatingWhatsApp settings={content.settings} />
    </>
  );
}
