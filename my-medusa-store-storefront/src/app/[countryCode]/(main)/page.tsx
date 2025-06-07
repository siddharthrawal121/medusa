"use server"

import { redirect } from "next/navigation"
import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Collections from "@modules/home/components/collections"
import Craftsmanship from "@modules/home/components/craftsmanship"
import Testimonials from "@modules/home/components/testimonials"
import Newsletter from "@modules/home/components/newsletter"
import { Suspense } from "react"
import FeaturedProductsSkeleton from "@modules/skeletons/components/featured-products-skeleton"
import { getRegion } from "@lib/data/regions"

// Strapi imports
import { getPromotions } from "@lib/data/strapi"
import PromotionCard from "@modules/home/components/PromotionCard" // Adjust path if necessary

export const metadata: Metadata = {
  title: "Marble Luxe - Fine Marble Handicrafts",
  description:
    "Discover exquisite handcrafted marble artifacts. Each piece is meticulously crafted by master artisans.",
}

// Set dynamic rendering options for this page
export const dynamic = "force-static" // Force static generation
export const revalidate = 3600 // Revalidate every hour

// Define Promotion type based on Strapi data structure (similar to PromotionCard)
interface Promotion {
  id: number;
  attributes: {
    title: string;
    description?: string;
    link_url?: string;
    image?: any; // Simplified, match actual type
  };
}

export default async function Home(props: {
  params: { countryCode: string }
}) {
  const { countryCode } = props.params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let promotions: Promotion[] = [];
  try {
    const fetchedPromotions = await getPromotions(); // Fetches { data: [...] }
    if (fetchedPromotions && Array.isArray(fetchedPromotions)) {
      promotions = fetchedPromotions;
    } else {
      console.warn("getPromotions did not return an array:", fetchedPromotions);
    }
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts countryCode={countryCode} />
        </Suspense>
      </section>

      {/* Promotions Section */}
      {promotions.length > 0 && (
        <section className="py-16 bg-luxury-ivory/30"> {/* Added a light background */}
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-luxury-charcoal">Special Offers</h2>
              <p className="text-lg text-luxury-charcoal/80 mt-2">
                Check out our latest promotions and deals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Collections Section */}
      <Collections />
      
      {/* Craftsmanship Section */}
      <Craftsmanship />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}
