import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bookbazaar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BookBazaar | Luxury Global Literary Bazaar & Digital E-Books",
    template: "%s | BookBazaar",
  },
  description: "Experience BookBazaar, a luxury marketplace for curated global literature, artisanal digital manuscripts, and EPUB e-books.",
  keywords: ["BookBazaar", "Literary Bazaar", "Global Literature", "Digital Manuscripts", "EPUB Books", "Luxury Bookstore"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BookBazaar | Luxury Global Literary Bazaar",
    description: "Discover curated global literature and artisanal digital EPUB books at BookBazaar.",
    url: siteUrl,
    siteName: "BookBazaar",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "BookBazaar" }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-jakarta bg-white text-[#1C1C1C]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
