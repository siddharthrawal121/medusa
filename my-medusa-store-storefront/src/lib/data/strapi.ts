import qs from 'qs';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

/**
 * Helper to make GET requests to Strapi API
 * @param {string} path Path of the API route
 * @param {object} params Query parameters
 * @returns {Promise} Parsed JSON data
 */
export async function fetchStrapiAPI(path: string, params = {}) {
  const MAPPED_PARAMS = {
    pagination: {},
    filters: {},
    populate: "*", // Default populate
    ...params,
  };
  const queryString = qs.stringify(MAPPED_PARAMS, { encodeValuesOnly: true });
  const requestUrl = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`);

  console.log("Fetching from Strapi URL:", requestUrl); // For debugging

  const response = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if STRAPI_API_TOKEN is available
      // ...(process.env.STRAPI_API_TOKEN && {
      //   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      // }),
    },
  });

  if (!response.ok) {
    console.error("Strapi API Fetch Error:", response.status, response.statusText);
    // Log the response body for more details if available
    try {
      const errorBody = await response.json();
      console.error("Error Body:", errorBody);
    } catch (e) {
      console.error("Could not parse error body:", e);
    }
    throw new Error(`Failed to fetch ${requestUrl}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// --- Specific data fetching functions ---

/**
 * Fetches data for the About Page (Single Type)
 */
export async function getAboutPage() {
  // For single types, Strapi typically returns the object directly in { data: { attributes: {...} } }
  // Populate media fields if any, e.g., ?populate=seo.metaImage,hero.cover_image
  const response = await fetchStrapiAPI("/about-page", { populate: "*" });
  return response.data; // Data for single type is usually under response.data
}

/**
 * Fetches data for the Policy Page (Single Type)
 */
export async function getPolicyPage() {
  const response = await fetchStrapiAPI("/policy-page", { populate: "*" });
  return response.data;
}

/**
 * Fetches all entries from the Blog Post Collection Type
 */
export async function getBlogPosts() {
  // For collection types, Strapi returns an array of objects in { data: [ { attributes: {...} } ] }
  // Sort, pagination, filters can be added here if needed. e.g. sort: 'publication_date:DESC'
  const response = await fetchStrapiAPI("/blog-posts", { populate: "*" });
  return response.data; // Data for collection is an array under response.data
}

/**
 * Fetches a single blog post by its slug
 * @param {string} slug The slug of the blog post
 */
export async function getBlogPostBySlug(slug: string) {
  const response = await fetchStrapiAPI("/blog-posts", {
    filters: { slug: { $eq: slug } },
    populate: "*",
  });
  // response.data will be an array, take the first element if it exists
  return response.data && response.data.length > 0 ? response.data[0] : null;
}

/**
 * Fetches all active promotions
 */
export async function getPromotions() {
  const response = await fetchStrapiAPI("/promotions", {
    filters: { is_active: { $eq: true } },
    populate: "*", // Populate image or other relations
  });
  return response.data;
}

// Example of how to fetch media URL if not populated directly
export function getStrapiMediaURL(mediaObject: any) {
  if (!mediaObject || !mediaObject.data || !mediaObject.data.attributes || !mediaObject.data.attributes.url) {
    return null;
  }
  const url = mediaObject.data.attributes.url;
  return url.startsWith("/") ? getStrapiURL(url) : url;
}
