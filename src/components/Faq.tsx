import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "../types";
import { SectionHeading } from "./SectionHeading";

// [GUIDE: FAQ] Questions and answers come from the FAQ Sheet tab. React renders
// them as normal text, which protects the page from injected HTML.
export function Faq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="faq-section section-shell" id="faq">
      <div className="container faq-grid">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Answers before you book"
          description="If your printer problem is not covered here, send the model and exact error through WhatsApp."
          align="left"
        />
        <div className="faq-list">
          {items.map((item) => {
            const open = item.id === openId;
            const answerId = `faq-answer-${item.id}`;
            return (
              <article className={`faq-item ${open ? "faq-item--open" : ""}`} key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    {item.question}<ChevronDown aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-answer" id={answerId} hidden={!open}><p>{item.answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
