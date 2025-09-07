import { NextRequest, NextResponse } from "next/server"
import { getDefaultCountry } from "./lib/util/get-default-country"
import { getValidCountries } from "./lib/util/get-valid-countries"

// Cache for valid countries and default country
let cachedValidCountries: string[] | null = null
let cachedDefaultCountry: string | null = null
let cacheTimestamp = 0
const CACHE_TTL = 60 * 1000 // 1 minute

// Paths that should have longer cache times (static content)
const STATIC_PATHS = [
  '/api/static',
  '/_next/static',
  '/images',
  '/fonts',
  '/icons',
  '/favicon.ico',
]

// Paths that should never be cached
const DYNAMIC_PATHS = [
  '/api/auth',
  '/api/checkout',
  '/api/cart',
]

/**
 * Get the default country and valid countries with caching
 */
async function getCountryData() {
  const now = Date.now()
  
  // Use cached data if available and not expired
  if (cachedValidCountries && cachedDefaultCountry && (now - cacheTimestamp < CACHE_TTL)) {
    return {
      validCountries: cachedValidCountries,
      defaultCountry: cachedDefaultCountry
    }
  }
  
  // Otherwise fetch fresh data
  try {
    const [validCountries, defaultCountry] = await Promise.all([
      getValidCountries(),
      getDefaultCountry()
    ])
    
    // Update cache
    cachedValidCountries = validCountries
    cachedDefaultCountry = defaultCountry
    cacheTimestamp = now
    
    return {
      validCountries,
      defaultCountry
    }
  } catch (error) {
    console.error("Error fetching country data:", error)
    
    // Fallback to whatever we have in cache, or empty arrays if nothing
    return {
      validCountries: cachedValidCountries || [],
      defaultCountry: cachedDefaultCountry || "us"
    }
  }
}

/**
 * Read an env-provided default country and normalize
 */
function getEnvDefaultCountry(): string {
  const envValue = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || process.env.DEFAULT_COUNTRY
  const candidate = (envValue || "us").toString().trim().toLowerCase()
  return /^[a-z]{2}$/.test(candidate) ? candidate : "us"
}

/**
 * Wrap a promise with a timeout. Resolves with fallback on timeout.
 */
async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  let timeoutId: NodeJS.Timeout
  const timeout = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), ms)
  })
  try {
    const result = await Promise.race([promise, timeout]) as T
    return result
  } finally {
    // @ts-ignore - defined above
    clearTimeout(timeoutId)
  }
}

/**
 * Utility: best-effort extraction of the visitor's ISO-2 country code.
 * 1. Prefer Next.js Edge `request.geo` (works on Vercel/Cloudflare).
 * 2. Fallback to common CDN headers.
 */
function extractCountry(req: NextRequest): string | null {
  // Edge Runtime provides `request.geo`, but the typings may not include it.
  // Cast to `any` to avoid TypeScript issues in environments where it's missing.
  const geoCountry = (req as any).geo?.country ||
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("x-country-code") ||
    req.headers.get("cf-ipcountry")

  if (geoCountry) {
    return geoCountry.toLowerCase()
  }

  // Fallback: try to parse region from Accept-Language (e.g., "en-IN,en;q=0.9")
  const acceptLang = req.headers.get("accept-language")
  if (acceptLang) {
    const match = acceptLang.match(/-([A-Za-z]{2})\b/)
    if (match?.[1]) {
      return match[1].toLowerCase()
    }
  }

  return null
}

/**
 * Middleware to handle region selection, caching, and performance optimization.
 */
export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Note: Apex domain redirect is handled by Next.js config (next.config.js)
    // to avoid conflicts. No need to handle it here.

    // Check if the URL has Builder.io preview parameters
    const isPreviewing =
      request.nextUrl.searchParams.has("builder.preview") ||
      request.nextUrl.searchParams.has("__builder_editing__");

    // If the page is in Builder.io preview mode, skip redirect logic
    if (isPreviewing) {
      return NextResponse.next();
    }
    
    // Get country data from backend (cached) with a strict timeout.
    // If it fails, we still want the homepage to redirect using an env fallback
    // so crawlers and users don't land on "/" without locale.
    const envFallback = getEnvDefaultCountry()
    const { validCountries, defaultCountry } = await withTimeout(
      getCountryData(),
      800,
      { validCountries: cachedValidCountries || [], defaultCountry: cachedDefaultCountry || envFallback }
    )
    
    const hasCountryData = Boolean(validCountries?.length) && Boolean(defaultCountry)
    
    // Determine visitor country from request
    const visitorCountry = extractCountry(request)
    
    // Check for malformed nested country codes like /us/in or /us/ae and redirect to 404
    // This prevents search engines from indexing invalid URL patterns
    const nestedCountryMatch = pathname.match(/^\/([a-z]{2})\/([a-z]{2})($|\/)/)
    
    if (nestedCountryMatch) {
      const firstCountryCode = nestedCountryMatch[1]
      const secondCountryCode = nestedCountryMatch[2]
      
      // If both are valid country codes, this is likely a mistake
      if (validCountries.includes(firstCountryCode) && validCountries.includes(secondCountryCode)) {
        // Instead of redirecting, return a 404 to prevent search engines from indexing these URLs
        return new Response('Not Found', { status: 404 })
      }
    }
    
    // Get country code from URL
    const urlCountryCode = pathname.split("/")[1]?.toLowerCase()
    
    // If URL has a country code, validate it's supported
    if (urlCountryCode && validCountries.length > 0) {
      // If the country code is not in our supported list, redirect to /us
      if (!validCountries.includes(urlCountryCode) && urlCountryCode.match(/^[a-z]{2}$/)) {
        // This is a 2-letter code that looks like a country but isn't supported
        // Redirect to the same path but with /us
        const redirectPath = pathname.substring(3) // Remove /xx from start
        const queryString = request.nextUrl.search ? request.nextUrl.search : ""
        const redirectUrl = `${request.nextUrl.origin}/us${redirectPath}${queryString}`
        return NextResponse.redirect(redirectUrl, 302)
      }
    }
    
    // Create a response object we can modify
    let response = NextResponse.next()
    
    // Add cache headers based on path
    if (process.env.NODE_ENV === 'production') {
      // Check if the path is for static assets
      if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
        // Static assets can be cached longer
        response.headers.set(
          'Cache-Control',
          'public, max-age=31536000, immutable'
        )
      } 
      // Never cache dynamic endpoints
      else if (DYNAMIC_PATHS.some(path => pathname.startsWith(path))) {
        response.headers.set(
          'Cache-Control',
          'no-store, no-cache, must-revalidate, proxy-revalidate'
        )
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
      } 
      // For regular pages, use a balanced approach
      else {
        response.headers.set(
          'Cache-Control',
          'public, max-age=10, s-maxage=30, stale-while-revalidate=59'
        )
      }
    }

    // If URL already has a valid country code, just proceed with cache headers
    if (urlCountryCode && hasCountryData && validCountries.includes(urlCountryCode)) {
      // Set cache ID cookie if not already set
      let cacheIdCookie = request.cookies.get("_medusa_cache_id")
      if (!cacheIdCookie) {
        response.cookies.set("_medusa_cache_id", crypto.randomUUID(), {
          maxAge: 60 * 60 * 24,
        })
      }
      return response
    }

    // Check if the URL is a static asset
    if (pathname.includes(".")) {
      return response
    }

    // Decide where to send the visitor. If we don't have country data yet,
    // use env fallback for root path to guarantee a redirect.
    const preferredCountry = hasCountryData
      ? (visitorCountry && validCountries.includes(visitorCountry) ? visitorCountry : defaultCountry)
      : envFallback

    const isUnsupportedVisitor = hasCountryData ? (!visitorCountry || !validCountries.includes(visitorCountry)) : false

    const redirectPath = pathname === "/" ? "" : pathname
    const queryString = request.nextUrl.search ? request.nextUrl.search : ""
    const redirectUrl = `${request.nextUrl.origin}/${preferredCountry}${redirectPath}${queryString}`

    // Enhanced redirect loop prevention
    const currentUrl = request.nextUrl.href
    if (currentUrl === redirectUrl) {
      return response
    }
    
    // Also prevent redirecting if we're already on the correct country path
    if (pathname.startsWith(`/${preferredCountry}`)) {
      return response
    }
    
    // Log redirect for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Redirecting: ${currentUrl} → ${redirectUrl}`)
    }

    // Use 302 for country-based redirects as they're based on user location and may change
    // If we lack country data and path is not root, avoid unsafe redirects
    if (!hasCountryData && pathname !== "/") {
      return response
    }
    response = NextResponse.redirect(redirectUrl, 302)

    // Set cache ID cookie
    response.cookies.set("_medusa_cache_id", crypto.randomUUID(), {
      maxAge: 60 * 60 * 24,
    })

    // Flag unsupported visitors so the client can show a notice once
    if (isUnsupportedVisitor) {
      response.cookies.set("unsupported_country", "1", {
        path: "/",
        maxAge: 60 * 5, // 5 minutes is enough for first page-load
      })
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // In case of any error, just proceed with the request
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
