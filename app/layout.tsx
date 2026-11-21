import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Atelier — Lụa Việt, phong cách đương đại",
  description: "Khám phá những thiết kế lấy cảm hứng từ vẻ mềm mại của lụa Việt. Phom dáng hiện đại, tinh giản và dễ ứng dụng mỗi ngày.",
  applicationName: "Maison Atelier",
  openGraph: {
    title: "Maison Atelier — Lụa Việt, phong cách đương đại",
    description: "Những thiết kế lụa tinh giản dành cho tủ đồ hiện đại.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
