import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { notFound } from "next/navigation"
import { getRegion } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"
import { buildAlternates } from "@lib/util/seo"

// Generate metadata with canonical URL
export async function generateMetadata({ params }: { params: { countryCode: string } }): Promise<Metadata> {
  const { countryCode } = await params
  const baseUrl = getBaseURL()
  const title = "Store | Imperial Craft Of India"
  const description = "Explore our exclusive collection of handcrafted marble products and luxury Indian handicrafts."
  const alternates = buildAlternates("/store", countryCode, baseUrl)

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

// Segment config should be a constant, not a function
export const dynamic = 'force-dynamic'

export default async function StorePage({
  params,
  searchParams,
}: {
  params: { countryCode: string }
  searchParams: { sortBy?: SortOptions; page?: string }
}) {
  // Get the country code from params
  const countryCode = params.countryCode
  
  // Verify the region exists
  const region = await getRegion(countryCode)
  
  if (!region) {
    return notFound()
  }
  
  // Get sort and pagination parameters
  const sortBy = searchParams.sortBy
  const page = searchParams.page
  
  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
