import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductData } from "@lib/data/products"
import ProductTemplate from "@modules/products/templates"
import { Suspense } from "react"
import Script from "next/script"
import { getBaseURL } from "@lib/util/env"
import { buildAlternates } from "@lib/util/seo"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"

type Props = {
  params: { countryCode: string; handle: string }
}

// Set dynamic rendering options for this page
export const dynamic = "force-dynamic"
// Use default fetch caching so region list is cached for 60s on the server
// (still dynamic thanks to force-dynamic)
// export const fetchCache = "force-no-store"
// Cache the product page for 5 minutes to balance freshness with performance.
export const revalidate = 300

// NOTE: Disabled static params generation to speed up dev and avoid large API calls.
/*
export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    // For each country, fetch product handles in parallel
    const countryProducts = await Promise.all(
      countryCodes.map(async (country) => {
        const { response } = await listProducts({
          countryCode: country,
          queryParams: { limit: 100, fields: "handle" },
        })

        return {
          country,
          products: response.products,
        }
      })
    )

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}
*/

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle, countryCode } = await props.params
  try {
    const { product } = await getProductData(handle, countryCode)

    if (!product) {
      return notFound()
    }

    const alternates = buildAlternates(`/products/${product.handle}`, countryCode, getBaseURL())

    const md: Record<string, any> | undefined = (product as any)?.metadata
    const seoTitle: string | undefined = md?.seo_title
    const seoDescription: string | undefined = md?.seo_description
    const seoKeywords: string[] | undefined = md?.seo_keywords
    const noindex: boolean | undefined = md?.noindex
    const ogImage: string | undefined = md?.og_image

    const baseTitle = seoTitle || `${product.title} | Imperial Craft Of India`
    const descriptionRaw =
      seoDescription ||
      (product.description as string | undefined) ||
      `Discover the exquisite ${product.title}, a handcrafted marble piece from our luxury collection.`
    const description = descriptionRaw.length > 160 ? `${descriptionRaw.substring(0, 157)}...` : descriptionRaw

    const imageCandidates: string[] = []
    if (product.thumbnail) imageCandidates.push(product.thumbnail)
    if (ogImage) imageCandidates.push(ogImage)
    if ((product as any).images?.length) imageCandidates.push(...(product as any).images.map((i: any) => i.url))
    const images = Array.from(new Set(imageCandidates)).slice(0, 4)

    const keywords: string[] = [
      ...(seoKeywords || []),
      product.title,
      ...((product as any).categories?.map((c: any) => c.name) || []),
      ...((product as any).tags?.map((t: any) => t.value || "") || []),
      "handcrafted",
      "marble",
      "buy online",
    ].filter(Boolean)

    return {
      title: baseTitle,
      description,
      keywords,
      robots: noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : undefined,
      alternates,
      openGraph: {
        title: baseTitle,
        description,
        images: images.length ? images : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: baseTitle,
        description,
        images: images.length ? images : undefined,
      },
    }
  } catch (error) {
    console.error(`Error generating metadata for product:`, error)
    return {
      title: "Product not found",
    }
  }
}

export default async function ProductPage(props: Props) {
  const { handle, countryCode } = await props.params
  try {
    const { product, region } = await getProductData(handle, countryCode)

    if (!product || !region) {
      return notFound()
    }

    const baseUrl = getBaseURL()

    const price = (product as any).variants?.[0]?.prices?.[0]
    const ldJson = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      image: product.thumbnail ? [product.thumbnail] : [],
      description: product.description,
      sku: (product as any).sku || product.id,
      brand: {
        "@type": "Brand",
        name: "Imperial Craft of India",
      },
      offers: {
        "@type": "Offer",
        url: `${baseUrl}/products/${product.handle}`,
        priceCurrency: price?.currency_code || region.currency_code,
        price: (price?.amount ?? 0) / 100,
        availability: "https://schema.org/InStock",
      },
    }

    return (
      <>
        <Suspense fallback={<SkeletonProductPage />}>
          <ProductTemplate
            product={product}
            region={region}
            countryCode={countryCode}
          />
        </Suspense>
        <Script id="product-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      </>
    )
  } catch (error) {
    console.error(`Error in ProductPage:`, error)
    // More friendly user interface for errors
    return (
      <div className="py-8 px-4 text-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-xl font-medium text-red-800 mb-2">
            Unable to load product
          </h2>
          <p className="text-red-700">
            We're having trouble loading this product. Please try refreshing the page.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-luxury-gold text-white rounded hover:bg-luxury-gold/90"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }
}
