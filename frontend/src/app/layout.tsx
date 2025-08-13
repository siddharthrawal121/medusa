import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import "styles/globals.css"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// -- OPTIMIZED GOOGLE FONTS (Next.js font optimization) ---------------------
import {
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Inter,
} from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
})

// Base URL used in metadata throughout the site
const BASE_URL = getBaseURL()
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const BACKEND_ORIGIN = (() => {
  try {
    return BACKEND_URL ? new URL(BACKEND_URL).origin : null
  } catch {
    return null
  }
})()

// -- DEFAULT SITE-WIDE SEO METADATA -----------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Imperial Craft of India | Luxury Handicrafts & Marble Art",
    template: "%s | Imperial Craft of India",
  },
  description:
    "Discover exquisite handcrafted marble art and luxury Indian handicrafts from Imperial Craft of India. Shop our exclusive collection of sculptures, decor, and gifts.",
  keywords: [
    "marble handicrafts",
    "luxury crafts",
    "Indian craftsmanship",
    "handcrafted gifts",
    "Imperial Craft of India",
  ],
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Imperial Craft of India | Luxury Handicrafts & Marble Art",
    description:
      "Explore authentic Indian marble artistry and luxury handicrafts. Elevate your space with timeless elegance.",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Imperial Craft of India Logo and Marble Handicrafts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Craft of India | Luxury Handicrafts & Marble Art",
    description:
      "Discover handcrafted marble masterpieces and luxury Indian decor.",
    images: [`${BASE_URL}/opengraph-image.jpg`],
  },
  authors: [{ name: "Siddharth Rawal" }],
  publisher: "Siddharth Rawal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "EwadNZ1UkW_OTBPpXzTBT05Bx9qpMr-dVi43GtYUrJo",
  },
}

// -- VIEWPORT ----------------------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d4af37" },
    { media: "(prefers-color-scheme: dark)", color: "#b8941f" },
  ],
}

// Structured data definitions
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Imperial Craft of India",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logos/logo.png`,
  },
  image: `${BASE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.facebook.com/imperialcraftofindia",
    "https://www.instagram.com/imperialcraftofindia",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Imperial Craft of India",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Imperial Craft of India",
  image: `${BASE_URL}/opengraph-image.jpg`,
  url: BASE_URL,
  description:
    "Luxury Indian handicrafts and handcrafted marble art from master artisans.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <head>
        {BACKEND_ORIGIN && (
          <>
            <link rel="dns-prefetch" href={BACKEND_ORIGIN} />
            <link rel="preconnect" href={BACKEND_ORIGIN} crossOrigin="anonymous" />
          </>
        )}
        <meta property="og:site_name" content="Imperial Craft of India" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/hero_img.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Register a lightweight service worker after load for asset caching */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(){});
              });
            }
          `}
        </Script>
        <main className="relative">{props.children}</main>
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
