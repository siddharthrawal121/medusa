import { Metadata } from "next";
import { getBaseURL } from "@lib/util/env";
import { buildAlternates } from "@lib/util/seo";

import { listCollections } from "@lib/data/collections";
import { getRegion } from "@lib/data/regions";
import { getCachedCategories } from "@modules/home/components/categories"
import { getHomepageProducts } from "@lib/data/products"
import HomeClientWrapper from "@modules/home/components/home-client-wrapper"
import { Suspense } from "react"

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
  params: {
    countryCode: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const { countryCode } = await params;
  const [region, collectionsResp, categories, homepageProducts] = await Promise.all([
    getRegion(countryCode),
    listCollections({ fields: "id, handle, title" }),
    getCachedCategories().catch(() => []),
    getHomepageProducts(countryCode).catch(() => ({ featuredProducts: [] })),
  ])

  const { collections } = collectionsResp
  const { featuredProducts } = homepageProducts

  if (!collections || !region) {
    return null;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}> 
      <HomeClientWrapper
        featuredProducts={featuredProducts}
        categories={categories}
        region={region}
        countryCode={countryCode}
      />
    </Suspense>
  );
} 