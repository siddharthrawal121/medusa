import { cache } from "react"
import { batchFetch } from "@lib/util/batch-fetch"
import { HttpTypes } from "@medusajs/types"

export const getHomePayload = cache(async (countryCode: string) => {
  // First batch: regions, categories, featured collection
  const [regionsRes, categoriesRes, collectionRes] = await batchFetch<[
    { regions: HttpTypes.StoreRegion[] },
    { product_categories: HttpTypes.StoreProductCategory[] },
    { collections: HttpTypes.StoreCollection[] }
  ]>([
    {
      path: "/store/regions",
      cacheRevalidate: 600,
      cacheTags: ["regions"],
    },
    {
      path: "/store/product-categories",
      query: { fields: "*category_children" },
      cacheRevalidate: 3600,
      cacheTags: ["categories"],
    },
    {
      path: "/store/collections",
      query: { handle: "featured-products", fields: "*products" },
      cacheRevalidate: 600,
      cacheTags: ["collections"],
    },
  ])

  const regions = (regionsRes.data as any)?.regions || []
  const region = regions.find((r: any) => r.countries?.some((c: any) => c.iso_2 === countryCode)) || regions[0] || null

  const categories = (categoriesRes.data as any)?.product_categories || []
  const featuredCollection = (collectionRes.data as any)?.collections?.[0]

  let featuredProducts: HttpTypes.StoreProduct[] = []

  if (featuredCollection && region) {
    try {
      const productsRes = await batchFetch<[{ products: HttpTypes.StoreProduct[] }]>([
        {
          path: "/store/products",
          query: {
            limit: 24,
            collection_id: [featuredCollection.id],
            region_id: region.id,
          } as any,
          cacheRevalidate: 300,
          cacheTags: ["products", `region-${region.id}`],
        },
      ])
      featuredProducts = (productsRes[0].data as any)?.products || []
    } catch {
      featuredProducts = []
    }
  }

  return {
    region,
    categories,
    featuredProducts,
  }
}) 