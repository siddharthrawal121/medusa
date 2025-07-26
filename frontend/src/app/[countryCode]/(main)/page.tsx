import { Metadata } from "next";
import { getBaseURL } from "@lib/util/env";
import { buildAlternates } from "@lib/util/seo";

import { Suspense } from "react"
import HeroSection from "@modules/home/components/hero-section"
import HomeData from "./home-data"

export async function generateMetadata({ params }: { params: { countryCode: string } }): Promise<Metadata> {
  const { countryCode } = params

  const baseUrl = getBaseURL()

  // Core SEO values
  const title = "Imperial Craft Of India | Fine Hand-Crafts"
  const description =
    "Explore Imperial Craft of India's exquisite collection of marble handicrafts, luxury decor, and bespoke gifts handcrafted by skilled Indian artisans."

  const alternates = buildAlternates("", countryCode, baseUrl)

  return {
    title,
    description,
    alternates,
    keywords: [
      "marble handicrafts",
      "luxury crafts",
      "Indian craftsmanship",
      "handcrafted gifts",
      "Imperial Craft of India",
    ],
    authors: [{ name: "Siddharth Rawal" }],
    publisher: "Siddharth Rawal",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${countryCode}`,
      title,
      description,
      images: [
        {
          url: `${baseUrl}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Imperial Craft of India Logo and Marble Handicrafts",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/opengraph-image.jpg`],
    },
  }
}

interface HomeProps {
  params: { countryCode: string }
}

export default function Home({ params }: HomeProps) {
  const { countryCode } = params

  return (
    <>
      <HeroSection countryCode={countryCode} />
      <Suspense fallback={null}>
        <HomeData countryCode={countryCode} />
      </Suspense>
    </>
  )
} 