import { services } from "../lib/content.ts";

export const routes = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/about",
  "/locations",
  "/contact",
  "/resources",
  "/insights",
  "/careers",
  "/client-portal",
  "/partners",
  "/quote",
  "/privacy",
];
