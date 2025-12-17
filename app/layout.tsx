import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig, getAllKeywords, getJsonLd } from "@/config/site";

import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ace Arts | Custom Tattoos & Flash in Cedar Rapids",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: getAllKeywords(),
  authors: [{ name: siteConfig.artist.name, url: siteConfig.url }],
  creator: siteConfig.artist.name,
  publisher: siteConfig.business.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Ace Arts | Custom Tattoos & Flash in Cedar Rapids",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Arts | Custom Tattoos & Flash in Cedar Rapids",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "Art & Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd();

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <JsonLd data={jsonLd} />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={cn("antialiased font-serif")}>{children}</body>
    </html>
  );
}
