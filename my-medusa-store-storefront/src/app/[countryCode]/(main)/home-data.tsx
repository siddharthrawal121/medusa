import HomeClientWrapper from "@modules/home/components/home-client-wrapper"
import { getHomePayload } from "@lib/data/home"

interface HomeDataProps {
  countryCode: string
}

export default async function HomeData({ countryCode }: HomeDataProps) {
  // parallel data fetching
  const { region, categories, featuredProducts } = await getHomePayload(countryCode)

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