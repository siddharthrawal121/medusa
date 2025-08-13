import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatDate } from "@lib/utils"
import Image from "next/image"
import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import { buildAlternates } from "@lib/util/seo"

export async function generateMetadata({ params }: { params: { countryCode: string } }): Promise<Metadata> {
	const { countryCode } = await params
	const baseUrl = getBaseURL()
	const title = "Blog | Imperial Craft Of India"
	const description = "Insights on luxury marble craftsmanship, artisan stories, and design inspiration."
	const alternates = buildAlternates("/blog", countryCode, baseUrl)
	return {
		title,
		description,
		alternates,
		openGraph: {
			type: "website",
			title,
			description,
			images: [
				{
					url: `${baseUrl}/opengraph-image.jpg`,
					width: 1200,
					height: 630,
					alt: "Imperial Craft of India Blog",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [`${baseUrl}/opengraph-image.jpg`],
		},
	}
}

export default function BlogPage() {
	const blogPosts = [
		{
			id: 1,
			title: "The Timeless Elegance of Indian Marble Handicrafts: A Legacy of Luxury and Artistry",
			slug: "timeless-elegance-indian-marble-handicrafts",
			excerpt: "Discover the rich heritage of Indian marble craftsmanship, from ancient techniques to modern luxury pieces. Learn how these exquisite artworks are created and why they're coveted worldwide.",
			date: "2024-03-20",
			readTime: "8 min read",
			category: "Craftsmanship",
			image: "/blogs/marble-crafts-hero.jpg"
		}
		// More blog posts will be added here
	]

	return (
		<div className="content-container py-12">
			{/* Hero Section */}
			<div className="flex flex-col items-center text-center mb-16">
				<h1 className="font-display text-4xl text-luxury-charcoal mb-4">
					Luxury Insights & Artisan Stories
				</h1>
				<div className="h-px w-20 bg-luxury-gold mb-8"></div>
				<p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto mb-6">
					Explore the world of fine marble craftsmanship, design inspiration, and the stories behind our exquisite collections.
				</p>

				{/* CTA to product catalog */}
				<LocalizedClientLink href="/products">
					<Button className="luxury-btn px-8 py-3">
						Discover Our Products →
					</Button>
				</LocalizedClientLink>
			</div>

			{/* Blog Posts Grid */}
			<div className="grid grid-cols-1 gap-12">
				{blogPosts.map((post) => (
					<article key={post.id} className="group">
						<LocalizedClientLink 
							href={`/blog/${post.slug}`}
							className="grid md:grid-cols-2 gap-8 items-center bg-luxury-cream/10 p-8 rounded-sm hover:bg-luxury-cream/20 transition-colors duration-300"
						>
							<div className="relative h-[200px] overflow-hidden rounded-sm">
								<Image
									src={post.image}
									alt={post.title}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover group-hover:scale-105 transition-transform duration-700"
									priority
								/>
							</div>
							<div className="flex flex-col items-start text-left">
								<div className="flex items-center gap-4 text-sm text-luxury-charcoal/60 mb-4">
									<span>{formatDate(post.date)}</span>
									<span>•</span>
									<span>{post.readTime}</span>
									<span>•</span>
									<span>{post.category}</span>
								</div>
								<h2 className="font-display text-2xl text-luxury-charcoal mb-4 group-hover:text-luxury-gold transition-colors duration-300">
									{post.title}
								</h2>
								<p className="text-serif-regular text-luxury-charcoal/80 mb-6">
									{post.excerpt}
								</p>
								<Button
									className="luxury-btn-outline px-6 py-2"
								>
									Read More
								</Button>
							</div>
						</LocalizedClientLink>
					</article>
				))}
			</div>
		</div>
	)
} 