// [GUIDE: TYPES] These types describe the columns returned by Google Sheets.
// If you add a Sheet column that the website must use, add the matching field here.
export type IconName =
  | "printer"
  | "refresh"
  | "trash"
  | "droplet"
  | "messages"
  | "wrench"
  | "users"
  | "clock"
  | "software"
  | "ink"
  | "tools"
  | "support"
  | "calendar"
  | "search"
  | "check"
  | "package"
  | "shield"
  | "award"
  | "headphones";

export interface SiteSettings {
  businessName: string;
  shortName: string;
  tagline: string;
  heroDescription: string;
  location: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsappNumber: string;
  email: string;
  businessHours: string;
  copyrightYear: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  imageUrl?: string;
  published: boolean;
  sortOrder: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: IconName;
  published: boolean;
  sortOrder: number;
}

export interface CatalogueItem extends ServiceItem {
  whatsappMessage: string;
}

export interface ProcessItem {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: IconName;
  published: boolean;
  sortOrder: number;
}

export interface BrandItem {
  id: string;
  name: string;
  imageUrl?: string;
  published: boolean;
  sortOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  sortOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  published: boolean;
  sortOrder: number;
}

export interface SiteContent {
  settings: SiteSettings;
  services: ServiceItem[];
  stats: StatItem[];
  catalogues: CatalogueItem[];
  process: ProcessItem[];
  brands: BrandItem[];
  faqs: FaqItem[];
  gallery: GalleryItem[];
}

export interface QuotePayload {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  service: string;
  problem: string;
  preferredContact: string;
  imageFileName: string;
  company?: string;
}

export interface RuntimeConfig {
  appsScriptUrl: string;
  enableSheetQuotes: boolean;
}

declare global {
  interface Window {
    POLAR_HUB_CONFIG?: Partial<RuntimeConfig>;
  }
}
