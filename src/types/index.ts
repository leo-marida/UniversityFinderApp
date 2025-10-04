// src/types/index.ts

/**
 * Defines the structure of a University object based on the API response.
 * This type will be used across the entire application to ensure consistency.
 */
export interface University {
  name: string;
  country: string;
  'state-province': string | null; // This can be null, so we type it as optional
  web_pages: string[];
  alpha_two_code: string;
  domains: string[];
}