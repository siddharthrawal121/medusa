import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import { buildAlternates } from "@lib/util/seo"

// For now we only have one static post; extend when CMS is integrated
const POST_MAP: Record<string, { title: string; description: string; image: string; keywords: string }> = {
  "timeless-elegance-indian-marble-handicrafts": {
    title: "The Timeless Elegance of Indian Marble Handicrafts | Imperial Craft of India",
    description:
      "Explore the rich heritage of Indian marble craftsmanship, from ancient techniques to modern luxury pieces. Learn about the artistry, techniques, and cultural significance of marble handicrafts from Agra's master artisans.",
    image: "/blogs/marble-crafts-hero.jpg",
    keywords:
      "marble handicrafts, Indian marble art, luxury marble crafts, marble sculptures, Agra marble, handcrafted marble, marble artisans, marble home decor, marble gifts, marble collectibles",
  },
}

type Props = { params: { countryCode: string; slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, countryCode } = params
  const post = POST_MAP[slug]

  if (!post) {
    return {
      title: "Blog | Imperial Craft Of India",
    }
  }

  const alternates = buildAlternates(`/blog/${slug}`, countryCode, getBaseURL())

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
} 