import type { RuntimeConfig } from "../types";

// [GUIDE: CONNECTION] Values come from public/runtime-config.js so the Apps
// Script URL can be changed without touching the React components.
export function getRuntimeConfig(): RuntimeConfig {
  return {
    appsScriptUrl: window.POLAR_HUB_CONFIG?.appsScriptUrl?.trim() ?? "",
    enableSheetQuotes: window.POLAR_HUB_CONFIG?.enableSheetQuotes ?? true,
  };
}
