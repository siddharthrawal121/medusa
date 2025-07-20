import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"
import { sdk } from "@lib/config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL()

  // 1. Static top-level pages
  const urls: MetadataRoute.Sitemap = [
    "", // home
    "/products",
    "/blog",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }))

  // 2. Dynamic products (handles)
  try {
    const { products } = await sdk.client.fetch<{
      products: { handle: string; updated_at?: string }[]
    }>(`/store/products`, {
      query: { limit: "1000", fields: "handle,updated_at" },
      next: { revalidate: 60 * 60 }, // cache for 1h
    })

    products.forEach((p) => {
      if (p.handle) {
        urls.push({
          url: `${baseUrl}/products/${p.handle}`,
          lastModified: p.updated_at || new Date().toISOString(),
        })
      }
    })
  } catch (e) {
    console.error("Sitemap product fetch failed", e)
  }

  // 3. Collections
  try {
    const { collections } = await sdk.client.fetch<{
      collections: { handle: string; updated_at?: string }[]
    }>(`/store/collections`, {
      query: { limit: "500", fields: "handle,updated_at" },
      next: { revalidate: 60 * 60 },
    })

    collections.forEach((c) => {
      if (c.handle) {
        urls.push({
          url: `${baseUrl}/collections/${c.handle}`,
          lastModified: c.updated_at || new Date().toISOString(),
        })
      }
    })
  } catch (e) {
    console.error("Sitemap collection fetch failed", e)
  }

  // 4. Blog posts – static list for now (extend when CMS is added)
  const blogSlugs = [
    "timeless-elegance-indian-marble-handicrafts",
  ]

  blogSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date().toISOString(),
    })
  })

  return urls
} 