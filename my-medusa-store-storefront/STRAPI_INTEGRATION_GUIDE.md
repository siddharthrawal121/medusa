# Strapi Integration Guide for Medusa Next.js Storefront

This document outlines how Strapi is integrated with the `my-medusa-store-storefront` Next.js application to manage various content types.

## 1. Strapi Setup

### Strapi Project Location
The Strapi CMS is installed in the following directory: `/app/strapi-cms/strapi-cms`.
This path is relative to the root of the environment where the applications are running.

### Starting Strapi
To start the Strapi development server:
1. Navigate to the Strapi project directory: `cd /app/strapi-cms/strapi-cms`
2. Run the development script: `yarn develop` (or `npm run develop` if yarn is not configured for the project)

### Accessing Strapi Admin
-   **Admin Panel URL:** [http://localhost:1337/admin](http://localhost:1337/admin)
-   **Admin Credentials:**
    -   Email: `admin@example.com`
    -   Password: `Password123` (This was set during the initial setup)

## 2. Content Management in Strapi

The following content types have been configured in Strapi:

### a. Blog Posts (Collection Type)
-   **Purpose:** For creating and managing blog articles.
-   **Fields:**
    -   `title` (String, required): The title of the blog post.
    -   `slug` (UID, required, attachedTo: `title`): The URL-friendly identifier for the post.
    -   `content` (Rich Text, required): The main body of the blog post.
    -   `excerpt` (Text, optional): A short summary of the post.
    -   `cover_image` (Media, optional): An image displayed with the post.
    -   `author_name` (String, optional): Name of the author.
    -   `publication_date` (Date, required): Date the post is published.
-   **Management:** Create new posts or edit existing ones under "Content Manager" > "Blog Post".

### b. About Page (Single Type)
-   **Purpose:** Manages the content for the "About Us" page.
-   **Fields:**
    -   `title` (String, required, default: "About Us"): Title of the page.
    -   `content` (Rich Text, required): Main content for the About Us page.
    -   `seo_title` (String, optional): Custom SEO title.
    -   `seo_description` (Text, optional): Custom SEO description.
-   **Management:** Edit under "Content Manager" > "About Page".

### c. Policy Page (Single Type)
-   **Purpose:** Manages the content for the site's main policy page (e.g., Privacy Policy).
-   **Fields:**
    -   `title` (String, required, default: "Privacy Policy"): Title of the policy.
    -   `content` (Rich Text, required): Full text of the policy.
    -   `last_updated` (Date, required): Date the policy was last updated.
-   **Management:** Edit under "Content Manager" > "Policy Page".

### d. Promotions (Collection Type)
-   **Purpose:** For homepage banners or other promotional content.
-   **Fields:**
    -   `title` (String, required): Title of the promotion.
    -   `description` (Text, optional): Brief description or call to action.
    -   `link_url` (String, optional): URL the promotion should link to.
    -   `image` (Media, optional): Image for the promotion.
    -   `is_active` (Boolean, default: true, required): Controls if the promotion is displayed. **Must be true for it to appear on the homepage.**
-   **Management:** Create new promotions or edit existing ones under "Content Manager" > "Promotion".

## 3. Next.js Frontend Integration

### Configuration
-   **Strapi API URL:** Defined in `my-medusa-store-storefront/.env.local` as `NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337`.
-   **Image Domain:** Strapi's image serving URL (`http://localhost:1337`) is added to `my-medusa-store-storefront/next.config.js` under `images.remotePatterns` to allow `next/image` to optimize these images. The specific pattern is for `hostname: "localhost", port: "1337", pathname: "/uploads/**"`.

### Data Fetching
-   All Strapi data fetching logic is centralized in `my-medusa-store-storefront/src/lib/data/strapi.ts`. This file contains helper functions to connect to the Strapi API and specific functions to retrieve each content type.

### Displayed Content
Strapi content is displayed on the following pages/components within the `my-medusa-store-storefront` application:
-   **About Page:** Content is fetched and displayed on `/about` (or `/[countryCode]/about`).
-   **Blog Listing Page:** A list of blog posts is displayed on `/blog` (or `/[countryCode]/blog`).
-   **Individual Blog Posts:** Each blog post is accessible via its slug at `/blog/[slug]` (or `/[countryCode]/blog/[slug]`).
-   **Homepage Promotions:** Active promotions are fetched and displayed on the main homepage (`/` or `/[countryCode]/`).
-   **Policy Page:** Content is fetched and displayed on `/policy` (or `/[countryCode]/policy`).

## 4. Important Notes

### Image Handling
-   Images should be uploaded to Strapi via its Media Library.
-   The Next.js frontend uses these URLs with the `next/image` component for optimized image rendering. The `getStrapiMediaURL` helper in `strapi.ts` ensures correct URL formatting.

### Rich Text Rendering
-   Rich text content (e.g., blog post bodies, page content) from Strapi is currently rendered using `dangerouslySetInnerHTML` in the Next.js application. This is a straightforward method for rendering HTML. If more complex interactions or styling are needed within the rich text content, or for enhanced security, consider replacing this with a dedicated Markdown-to-HTML library (if content is Markdown) or a more robust HTML sanitizer/renderer.

### Content Updates & Cache
-   The Next.js application fetches Strapi content. Some pages might be statically generated at build time (`force-static` with revalidation was noted on the homepage), while others might fetch data on each request or client-side.
-   If content updates made in Strapi do not reflect immediately:
    -   For statically generated pages, a new build and deployment of the Next.js application will be necessary. Revalidation settings might refresh content periodically on a running server.
    -   For dynamically fetched content, changes should appear more quickly.
    -   During local development, restarting the Next.js dev server (`yarn dev` or `npm run dev`) can help clear any Next.js or browser caches. Strapi itself does not typically require restarts for content changes to be available via its API.
