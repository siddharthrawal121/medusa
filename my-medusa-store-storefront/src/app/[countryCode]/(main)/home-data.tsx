import HomeClientWrapper from "@modules/home/components/home-client-wrapper"
import { getRegion } from "@lib/data/regions"
import { getCachedCategories } from "@modules/home/components/categories"
import { getHomepageProducts } from "@lib/data/products"

interface HomeDataProps {
  countryCode: string
}

export default async function HomeData({ countryCode }: HomeDataProps) {
  // parallel data fetching
  const [region, categories, homepageProducts] = await Promise.all([
    getRegion(countryCode),
    getCachedCategories().catch(() => []),
    getHomepageProducts(countryCode).catch(() => ({ featuredProducts: [] })),
  ])

  const { featuredProducts } = homepageProducts

  return (
    <HomeClientWrapper
      featuredProducts={featuredProducts}
      categories={categories}
      region={region}
      countryCode={countryCode}
      showHero={false}
    />
  )
} 