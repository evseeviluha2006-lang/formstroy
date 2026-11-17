import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Фаворит-Строй — отделочная компания в Калининграде",
  description:
    "Отделочная компания «Фаворит-Строй»: качественный ремонт квартир и коммерческих объектов под ключ. Более 10 лет на рынке, 100% соблюдение сроков по договору.",
  keywords: [
    "ремонт квартир Калининград",
    "отделка коммерческих объектов",
    "отделочная компания Калининград",
    "Фаворит-Строй",
  ],
  openGraph: {
    title: "Фаворит-Строй — отделка и ремонт под ключ",
    description:
      "Качественный ремонт квартир и коммерческих объектов под ключ. Более 10 лет на рынке и 100% соблюдение сроков по договору.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${oswald.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ink text-bone">
        {children}
      </body>
    </html>
  );
}
