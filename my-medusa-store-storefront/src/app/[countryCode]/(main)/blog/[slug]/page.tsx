"use client"
// This page is a client component to allow usage of BlogPostContent client component
import BlogPostContent from "./blog-post-content"
import Script from "next/script"
import { getBaseURL } from "@lib/util/env"

export default function BlogPost() {
  const baseUrl = getBaseURL()

  const title = "The Timeless Elegance of Indian Marble Handicrafts | Imperial Craft of India"
  const description = "Explore the rich heritage of Indian marble craftsmanship, from ancient techniques to modern luxury pieces. Learn about the artistry, techniques, and cultural significance of marble handicrafts from Agra's master artisans."

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: `${baseUrl}/blogs/marble-crafts-hero.png`,
    datePublished: "2024-03-20",
    author: {
      "@type": "Person",
      name: "Siddharth Rawal",
    },
    publisher: {
      "@type": "Organization",
      name: "Imperial Craft of India",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logos/logo.png`,
      },
    },
    description: description,
  }

  return (
    <>
      <BlogPostContent />
      <Script id="blog-post-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
    </>
  )
} 