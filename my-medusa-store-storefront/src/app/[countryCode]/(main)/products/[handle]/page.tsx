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

// Cache the product page for 5 minutes to balance freshness with performance.
export const revalidate = 300

// Pre-render popular products while keeping others on-demand via ISR
export async function generateStaticParams() {
  // Skip during development to keep startup fast
  if (process.env.NODE_ENV !== "production") {
    return []
  }

  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.flatMap((r) => r.countries?.map((c) => c.iso_2) || [])
    )

    if (!countryCodes?.length) {
      return []
    }

    // Fetch top 50 newest products for each country in parallel
    const countryProducts = await Promise.all(
      countryCodes.map(async (country) => {
        const { response } = await listProducts({
          countryCode: country,
          queryParams: {
            limit: 50,
            fields: "handle",
            order: "created_at:desc",
          },
        })

        return response.products.map((product) => ({
          countryCode: country,
          handle: product.handle,
        }))
      })
    )

    return countryProducts.flat().filter((p) => p.handle)
  } catch (error) {
    console.error(
      `Failed to generate static params for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle, countryCode } = await props.params
  try {
    const { product } = await getProductData(handle, countryCode)

    if (!product) {
      return notFound()
    }

    const alternates = buildAlternates(`/products/${product.handle}`, countryCode, getBaseURL())
    return {
      title: `${product.title} | Imperial Craft Of India`,
      description:
        product.description?.substring(0, 160) ||
        `Discover the exquisite ${product.title}, a handcrafted marble piece from our luxury collection.`,
      alternates: alternates,
      openGraph: {
        title: `${product.title} | Imperial Craft Of India`,
        description:
          product.description?.substring(0, 160) ||
          `Discover the exquisite ${product.title}, a handcrafted marble piece from our luxury collection.`,
        images: product.thumbnail ? [product.thumbnail] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
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
