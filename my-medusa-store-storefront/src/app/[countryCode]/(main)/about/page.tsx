"use server"

import { getRegion } from "@lib/data/regions"
// import Image from "next/image" // Keep if needed for other parts, remove if not
import { notFound } from "next/navigation"
import { getAboutPage } from "@lib/data/strapi"; // Import the Strapi fetch function

interface AboutPageProps {
  params: {
    countryCode: string
  }
}

// Define a type for the Strapi About Page data structure
// This should match what your getAboutPage function returns (after accessing .attributes)
interface StrapiAboutPage {
  title: string;
  content: string; // Assuming content is HTML or Markdown string
  // Add other fields if they exist, e.g., seo_title, seo_description
  seo_title?: string;
  seo_description?: string;
  // publication_date might not be relevant for a single type like "About Page"
  // but good to have a pattern if other single types use it.
  // publishedAt?: string;
}


export default async function AboutPage(props: AboutPageProps) {
  const params = await props.params
  const countryCode = params.countryCode
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // Fetch data from Strapi
  // The getAboutPage function in strapi.ts returns response.data,
  // which for single types is typically { id, attributes: { ... } }
  let strapiDataContainer;
  try {
    strapiDataContainer = await getAboutPage();
  } catch (error) {
    console.error("Error fetching About Page content from Strapi:", error);
    // Fallback content or error message if Strapi fetch fails
    return (
      <div className="content-container py-12">
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4 text-center">About Us</h1>
        <div className="h-px w-20 bg-luxury-gold mx-auto mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto text-center">
          We encountered an issue loading the content for this page. Please try again later.
        </p>
      </div>
    );
  }


  // Check if data and attributes exist
  if (!strapiDataContainer || !strapiDataContainer.attributes) {
    // You might want to log an error or show a specific message
    console.error("Failed to load About Page content from Strapi: Data or attributes missing.");
    // Optionally, you could fall back to a default content or use notFound()
    return (
      <div className="content-container py-12">
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4 text-center">About Us</h1>
        <div className="h-px w-20 bg-luxury-gold mx-auto mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto text-center">
          Content for the About Us page is currently unavailable. Please check back soon.
        </p>
      </div>
    );
  }

  const aboutContent: StrapiAboutPage = strapiDataContainer.attributes;

  return (
    <div className="content-container py-12">
      {/* Hero section - now driven by Strapi data */}
      <div className="flex flex-col items-center text-center mb-12"> {/* Reduced mb from 20 to 12 */}
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4">
          {aboutContent.title || "About Us"} {/* Fallback title */}
        </h1>
        <div className="h-px w-20 bg-luxury-gold mb-8"></div>
        {/* SEO Description could go here if available and desired */}
        {/* <p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto">
          {aboutContent.seo_description || ""}
        </p> */}
      </div>

      {/* Main content from Strapi's Rich Text Editor */}
      {/* Ensure the rich text content is sanitized if it's HTML */}
      {/* For now, using dangerouslySetInnerHTML for simplicity.
          Consider a markdown-to-html library or a dedicated HTML renderer for production. */}
      <div
        className="prose lg:prose-xl max-w-none mx-auto text-luxury-charcoal/80" // Added basic prose styling for rich text
        dangerouslySetInnerHTML={{ __html: aboutContent.content || "" }}  // Fallback for content
      />

      {/*
        The rest of the original static sections (Our Story, Process, Artisans, Quality Promise)
        have been removed. If these are to be part of the Strapi content,
        they should be modeled in the 'About Page' content type in Strapi
        (e.g., using components or dynamic zones) and then rendered here.
        For this step, we are only rendering the main 'title' and 'content' fields.
      */}
    </div>
  )
}
