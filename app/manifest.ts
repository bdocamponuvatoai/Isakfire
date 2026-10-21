import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Isak Fire Protection",
    short_name: "Isak Fire",
    description: "Fire protection systems, inspection and service across five states and Ontario.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f6f3",
    theme_color: "#00304a",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
