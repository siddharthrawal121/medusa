import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { notFound } from "next/navigation"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore our exclusive collection of handcrafted marble products.",
}

// Incremental static regeneration: refresh this listing every 5 minutes
export const revalidate = 300

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
