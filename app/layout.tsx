import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Atelier — Contemporary Vietnamese Silk",
  description: "A contemporary Vietnamese silk house. Considered silhouettes, tactile textures and pieces made to stay.",
  applicationName: "maison-atelier",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
