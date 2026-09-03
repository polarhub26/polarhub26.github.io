import type { SiteContent } from "../types";

// [GUIDE: FALLBACK-CONTENT]
// The site displays this information before Google Sheets is connected or when
// the connection is temporarily unavailable. Keep it accurate and non-private.
export const fallbackContent: SiteContent = {
  settings: {
    businessName: "Polar Hub Creations n Solutions",
    shortName: "Polar Hub",
    tagline: "We Fix. We Reset. We Keep You Printing.",
    heroDescription:
      "Printer repairs, reset solutions, diagnostics and practical technical support for homes and small businesses.",
    location: "Soshanguve, Pretoria, South Africa",
    phoneDisplay: "078 353 8140",
    phoneDial: "+27783538140",
    whatsappNumber: "27783538140",
    email: "info@polarhub.co.za",
    businessHours: "Monday–Friday 08:00–17:00 · Saturday 08:00–13:00",
    copyrightYear: "2026",
    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
  },
  services: [
    { id: "software", title: "Software Update", description: "Driver installation, firmware checks and printer software support.", icon: "software", published: true, sortOrder: 1 },
    { id: "reset", title: "Printer Reset", description: "Careful reset and restoration for supported printer models.", icon: "refresh", published: true, sortOrder: 2 },
    { id: "waste-ink", title: "Waste Ink Pad Reset", description: "Waste-ink warning diagnosis and supported reset assistance.", icon: "trash", published: true, sortOrder: 3 },
    { id: "ink-check", title: "Ink Check", description: "Ink-level, print-quality and basic cartridge diagnostics.", icon: "droplet", published: true, sortOrder: 4 },
    { id: "consultation", title: "Consultation", description: "Clear advice before you spend money on repair or replacement.", icon: "messages", published: true, sortOrder: 5 },
    { id: "technician", title: "Printer Technician", description: "Hands-on troubleshooting, maintenance and technical support.", icon: "wrench", published: true, sortOrder: 6 },
  ],
  stats: [
    { id: "experience", value: "5+", label: "Years Experience", icon: "award", published: true, sortOrder: 1 },
    { id: "customers", value: "1,000+", label: "Happy Customers", icon: "users", published: true, sortOrder: 2 },
    { id: "repairs", value: "2,500+", label: "Printers Repaired", icon: "printer", published: true, sortOrder: 3 },
    { id: "response", value: "24–48h", label: "Average Response Time", icon: "clock", published: true, sortOrder: 4 },
  ],
  catalogues: [
    { id: "printer-repairs", title: "Printer Repairs", description: "Assessment, maintenance and repair assistance for common printer faults.", icon: "printer", whatsappMessage: "Hello Polar Hub, I would like more information about printer repair services.", published: true, sortOrder: 1 },
    { id: "ink-supplies", title: "Ink & Supplies", description: "Ask about compatible inks, consumables and printer supplies.", icon: "ink", whatsappMessage: "Hello Polar Hub, I would like more information about ink and printer supplies.", published: true, sortOrder: 2 },
    { id: "software-services", title: "Software Services", description: "Printer drivers, setup, software troubleshooting and updates.", icon: "software", whatsappMessage: "Hello Polar Hub, I would like more information about printer software services.", published: true, sortOrder: 3 },
    { id: "reset-solutions", title: "Reset Solutions", description: "Supported printer reset and waste-ink warning solutions.", icon: "refresh", whatsappMessage: "Hello Polar Hub, I would like more information about printer reset solutions.", published: true, sortOrder: 4 },
    { id: "maintenance-tools", title: "Maintenance Tools", description: "Cleaning and maintenance guidance for keeping printers reliable.", icon: "tools", whatsappMessage: "Hello Polar Hub, I would like more information about printer maintenance tools.", published: true, sortOrder: 5 },
    { id: "it-support", title: "IT Support", description: "Basic computer, connectivity and business technology support.", icon: "support", whatsappMessage: "Hello Polar Hub, I would like more information about IT support.", published: true, sortOrder: 6 },
  ],
  process: [
    { id: "book", step: 1, title: "Book", description: "Contact us and describe the printer problem.", icon: "calendar", published: true, sortOrder: 1 },
    { id: "diagnosis", step: 2, title: "Diagnosis", description: "We inspect the issue and explain the options.", icon: "search", published: true, sortOrder: 2 },
    { id: "repair", step: 3, title: "Repair", description: "Approved repair or reset work is completed.", icon: "wrench", published: true, sortOrder: 3 },
    { id: "testing", step: 4, title: "Testing", description: "Print quality and core functions are checked.", icon: "check", published: true, sortOrder: 4 },
    { id: "collection", step: 5, title: "Collection", description: "Collect your printer and receive practical advice.", icon: "package", published: true, sortOrder: 5 },
  ],
  brands: ["Epson", "HP", "Canon", "Brother", "Samsung", "Lexmark"].map((name, index) => ({
    id: name.toLowerCase(), name, published: true, sortOrder: index + 1,
  })),
  faqs: [
    { id: "repair-types", question: "What printer problems do you repair?", answer: "We assist with common printing, paper-feed, connection, software, ink and reset-related problems. A diagnosis confirms what is possible for your model.", published: true, sortOrder: 1 },
    { id: "reset", question: "Can every printer be reset?", answer: "No. Reset availability depends on the printer brand, model and exact error. Send the model and error message before booking.", published: true, sortOrder: 2 },
    { id: "waste-ink", question: "What is a waste-ink-pad warning?", answer: "It is a maintenance warning found on some inkjet printers. The printer must be assessed because resetting a counter does not automatically repair a physically saturated pad.", published: true, sortOrder: 3 },
    { id: "time", question: "How long does a repair take?", answer: "Timing depends on diagnosis, parts and workload. We confirm the expected turnaround after inspecting the printer.", published: true, sortOrder: 4 },
    { id: "delivery", question: "Do you offer collection and delivery?", answer: "Contact us with your location to confirm whether collection or delivery is available and whether a transport charge applies.", published: true, sortOrder: 5 },
    { id: "brands", question: "Which brands do you support?", answer: "We commonly assist with Epson, HP, Canon, Brother, Samsung and Lexmark. Support still depends on the exact model and fault.", published: true, sortOrder: 6 },
    { id: "quote", question: "How do I request a quotation?", answer: "Complete the quotation form or send the printer brand, model, fault and clear photos through WhatsApp.", published: true, sortOrder: 7 },
  ],
  gallery: [
    { id: "diagnostics", title: "Printer Diagnostics", description: "Careful fault checks before repair decisions are made.", published: true, sortOrder: 1 },
    { id: "maintenance", title: "Maintenance Work", description: "Practical cleaning and maintenance for supported equipment.", published: true, sortOrder: 2 },
    { id: "setup", title: "Software Setup", description: "Printer connection, drivers and software configuration.", published: true, sortOrder: 3 },
  ],
};
