"use client"

import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatDate } from "@lib/utils"
import Image from "next/image"

export default function BlogPostContent() {
  const post = {
    title: "The Timeless Elegance of Indian Marble Handicrafts: A Legacy of Luxury and Artistry",
    date: "2024-03-20",
    readTime: "8 min read",
    category: "Craftsmanship",
    image: "/blogs/marble-crafts-hero.png",
    author: "Siddharth Rawal",
    authorTitle: "Founder & CEO"
  }

  return (
    <article className="content-container py-12">
      {/* Back to Blog (Top) */}
      <div className="mb-6">
        <LocalizedClientLink 
          href="/blog"
          className="text-luxury-gold hover:text-luxury-charcoal transition-colors duration-200"
        >
          ← Back to Blog
        </LocalizedClientLink>
      </div>
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 text-sm text-luxury-charcoal/60 mb-6">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
        
        <h1 className="font-display text-4xl text-luxury-charcoal mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-luxury-cream flex items-center justify-center">
            <span className="font-display text-xl text-luxury-gold">
              {post.author[0]}
            </span>
          </div>
          <div>
            <p className="font-medium text-luxury-charcoal">{post.author}</p>
            <p className="text-sm text-luxury-charcoal/60">{post.authorTitle}</p>
          </div>
        </div>

        <div className="relative h-[500px] w-full overflow-hidden rounded-sm mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2>Introduction to Indian Marble Craftsmanship</h2>
          <p>
            For centuries, Indian artisans have transformed raw marble into breathtaking works of art, 
            creating pieces that embody both cultural heritage and timeless luxury. This ancient craft, 
            perfected in the workshops of Agra—home to the magnificent Taj Mahal—continues to evolve 
            while maintaining its core traditions.
          </p>

          <h2>The Heritage of Marble Artistry</h2>
          <p>
            The art of marble crafting in India dates back to the Mughal era, where master craftsmen 
            created architectural marvels and intricate decorative pieces. Today's artisans carry 
            forward these centuries-old techniques, combining them with modern precision tools and 
            innovative designs to create pieces that honor tradition while meeting contemporary aesthetic 
            preferences.
          </p>

          <h2>Materials and Sourcing</h2>
          <p>
            The journey of creating a marble masterpiece begins with selecting the finest raw materials. 
            Premium marble is sourced from renowned quarries in Makrana and Udaipur, known for their 
            superior quality stone with distinctive veining patterns and crystalline structure. Each 
            block is carefully chosen based on its color consistency, structural integrity, and natural 
            patterns.
          </p>

          <h2>The Crafting Process</h2>
          <p>
            The transformation of raw marble into a finished piece involves several meticulous stages:
          </p>
          <ul>
            <li>
              <strong>Initial Shaping:</strong> Master craftsmen begin by roughly shaping the marble 
              block using traditional chisels and modern cutting tools.
            </li>
            <li>
              <strong>Detailed Carving:</strong> Intricate designs are carefully carved using specialized 
              tools, with artisans following age-old techniques passed down through generations.
            </li>
            <li>
              <strong>Surface Treatment:</strong> Multiple stages of sanding and polishing bring out the 
              stone's natural luster and ensure a smooth, flawless finish.
            </li>
            <li>
              <strong>Final Detailing:</strong> Delicate embellishments and inlay work, if part of the 
              design, are executed with precision and artistic finesse.
            </li>
          </ul>

          <h2>Popular Marble Handicraft Categories</h2>
          <p>
            Today's marble artisans create a diverse range of products:
          </p>
          <ul>
            <li>
              <strong>Decorative Sculptures:</strong> From miniature Taj Mahal replicas to contemporary 
              abstract pieces
            </li>
            <li>
              <strong>Functional Art:</strong> Intricately designed bowls, vases, and tableware
            </li>
            <li>
              <strong>Architectural Elements:</strong> Custom-made columns, fountains, and wall panels
            </li>
            <li>
              <strong>Modern Innovations:</strong> Fusion pieces combining marble with other materials 
              like metal and wood
            </li>
          </ul>

          <h2>Caring for Marble Handicrafts</h2>
          <p>
            To preserve the beauty of marble artifacts:
          </p>
          <ul>
            <li>Clean regularly with a soft, dry cloth</li>
            <li>Avoid acidic cleaners that can damage the stone</li>
            <li>Use coasters under drinks to prevent staining</li>
            <li>Apply marble sealant annually for added protection</li>
          </ul>

          <h2>The Future of Marble Craftsmanship</h2>
          <p>
            As we look to the future, Indian marble craftsmanship continues to evolve. Modern 
            technology and contemporary design influences are being integrated with traditional 
            techniques, creating pieces that appeal to global luxury markets while maintaining their 
            cultural authenticity.
          </p>

          <h2>Conclusion</h2>
          <p>
            Indian marble handicrafts represent more than just decorative items; they are a testament 
            to centuries of artistic excellence and cultural heritage. Each piece tells a story of 
            skilled craftsmanship, artistic vision, and timeless beauty that continues to captivate 
            collectors and art enthusiasts worldwide.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-luxury-cream/30 rounded-sm text-center">
          <h3 className="font-display text-2xl text-luxury-charcoal mb-4">
            Explore Our Marble Collection
          </h3>
          <p className="text-serif-regular text-luxury-charcoal/80 mb-6 max-w-2xl mx-auto">
            Discover our exquisite range of handcrafted marble pieces, each telling its own unique story 
            of artistry and elegance.
          </p>
          <LocalizedClientLink href="/products">
            <Button className="luxury-btn px-8 py-4">
              View Collection
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <LocalizedClientLink 
            href="/blog"
            className="text-luxury-gold hover:text-luxury-charcoal transition-colors duration-200"
          >
            ← Back to Blog
          </LocalizedClientLink>
        </div>
      </div>
    </article>
  )
} 