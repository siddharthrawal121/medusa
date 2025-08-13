import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"
import { sdk } from "@lib/config"
import { listRegions } from "@lib/data/regions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL()
  const now = new Date().toISOString()

  // Fetch all regions and derive country prefixes
  let countryCodes: string[] = []
  try {
    const regions = await listRegions()
    countryCodes = regions
      .map((r) => r.countries?.map((c) => c.iso_2?.toLowerCase()).filter(Boolean) as string[])
      .flat()
      .filter(Boolean)
  } catch (e) {
    console.error("Sitemap regions fetch failed", e)
  }

  // Fallback to 'us' if none found
  if (!countryCodes.length) {
    countryCodes = ["us"]
  }

  const urls: MetadataRoute.Sitemap = []

  // Static top-level pages per region
  const staticPaths = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/products", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/categories", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/collections", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/store", changeFrequency: "daily" as const, priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/shipping", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/returns", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/faqs", changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  for (const code of countryCodes) {
    for (const sp of staticPaths) {
      urls.push({
        url: `${baseUrl}/${code}${sp.path}`,
        lastModified: now,
        changeFrequency: sp.changeFrequency,
        priority: sp.priority,
      })
    }
  }

  // Dynamic products (handles)
  try {
    const { products } = await sdk.client.fetch<{ products: { handle: string; updated_at?: string }[] }>(
      `/store/products`,
      { query: { limit: "1000", fields: "handle,updated_at" }, next: { revalidate: 60 * 60 } }
    )

    for (const p of products) {
      if (!p.handle) continue
      for (const code of countryCodes) {
        urls.push({
          url: `${baseUrl}/${code}/products/${p.handle}`,
          lastModified: p.updated_at || now,
          changeFrequency: "daily",
          priority: 0.8,
        })
      }
    }
  } catch (e) {
    console.error("Sitemap product fetch failed", e)
  }

  // Collections
  try {
    const { collections } = await sdk.client.fetch<{ collections: { handle: string; updated_at?: string }[] }>(
      `/store/collections`,
      { query: { limit: "500", fields: "handle,updated_at" }, next: { revalidate: 60 * 60 } }
    )

    for (const c of collections) {
      if (!c.handle) continue
      for (const code of countryCodes) {
        urls.push({
          url: `${baseUrl}/${code}/collections/${c.handle}`,
          lastModified: c.updated_at || now,
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
    }
  } catch (e) {
    console.error("Sitemap collection fetch failed", e)
  }

  // Categories
  try {
    const { product_categories } = await sdk.client.fetch<{
      product_categories: { handle: string; updated_at?: string }[]
    }>(`/store/product-categories`, {
      query: { limit: "200", fields: "handle,updated_at" },
      next: { revalidate: 60 * 60 },
    })

    for (const cat of product_categories) {
      if (!cat.handle) continue
      for (const code of countryCodes) {
        urls.push({
          url: `${baseUrl}/${code}/categories/${cat.handle}`,
          lastModified: cat.updated_at || now,
          changeFrequency: "weekly",
          priority: 0.9,
        })
      }
    }
  } catch (e) {
    console.error("Sitemap categories fetch failed", e)
  }

  const blogSlugs = ["timeless-elegance-indian-marble-handicrafts"]
  for (const code of countryCodes) {
    blogSlugs.forEach((slug) => {
      urls.push({
        url: `${baseUrl}/${code}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  }

  return urls
} 