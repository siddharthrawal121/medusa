import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import CategorySection from "@modules/categories/components/category-section"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getBaseURL } from "@lib/util/env"
import { buildAlternates } from "@lib/util/seo"

// Generate metadata with canonical URL
export async function generateMetadata({ params }: { params: { countryCode: string } }): Promise<Metadata> {
  const { countryCode } = await params
  const baseUrl = getBaseURL()
  const title = "Categories | Imperial Craft Of India"
  const description = "Explore all categories of our luxury handcrafted marble products and artisanal decor."
  const alternates = buildAlternates("/categories", countryCode, baseUrl)

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

// Cache the rendered page for 5 minutes and serve stale content while revalidating.
export const revalidate = 300

export default async function Categories(props: {
  params: { countryCode: string }
}) {
  const { countryCode } = await props.params
  
  const region = await getRegion(countryCode).catch(() => null)
  const categories = await listCategories().catch(() => null)

  if (!categories) {
    return notFound()
  }

  // Get only parent categories
  const parentCategories = categories.filter((c) => !c.parent_category)

  return (
    <div className="py-6">
      <div className="content-container">
        <div className="flex flex-col gap-y-8 pb-24">
          <h1 className="text-2xl-semi font-display text-luxury-charcoal tracking-wide">Browse Categories</h1>
          <div className="flex flex-col gap-y-12">
            {parentCategories.map((c: HttpTypes.StoreProductCategory) => (
              <CategorySection category={c} key={c.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 