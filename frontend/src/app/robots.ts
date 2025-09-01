import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"
import { listRegions } from "@lib/data/regions"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = getBaseURL()

  // Get supported country codes dynamically
  let supportedCountries: string[] = []
  try {
    const regions = await listRegions()
    supportedCountries = regions
      .map((r) => r.countries?.map((c) => c.iso_2?.toLowerCase()).filter(Boolean) as string[])
      .flat()
      .filter(Boolean)
  } catch (e) {
    console.error("Failed to fetch regions for robots.txt", e)
    // Fallback to known supported countries from backend
    supportedCountries = ["ae", "au", "ca", "de", "dk", "es", "fr", "gb", "in", "it", "se", "us"]
  }

  // Common country codes that might be requested but not supported
  // Based on backend API: ae, au, ca, de, dk, es, fr, gb, in, it, se, us are supported
  const commonCountries = [
    "nl", "ch", "at", "be", "fi", "no", "pt", "pl", "cz", "hu", "ro", "gr", "hr", 
    "si", "sk", "bg", "lt", "lv", "ee", "mt", "cy", "lu", "ie", "jp", "kr", "cn", 
    "tw", "hk", "sg", "my", "th", "ph", "vn", "id", "bd", "pk", "lk", "np", "mm", 
    "kh", "la", "bn", "mx", "br", "ar", "cl", "co", "pe", "uy", "py", "bo", "ec", 
    "ve", "gy", "sr", "gf", "ru", "tr", "sa", "eg", "ma", "za", "ke", "ng", "gh",
    "tz", "ug", "zw", "bw", "mw", "zm", "mz", "ao", "cd", "cm", "ci", "bf", "ml",
    "ne", "td", "cf", "cg", "ga", "gq", "st", "cv", "gw", "gm", "sn", "mr", "lr"
  ]

  // Disallow only truly unsupported countries
  const unsupportedCountries = commonCountries.filter(code => !supportedCountries.includes(code))
  
  const disallow = [
    "/checkout",
    "/account",
    "/account/*",
    "/cart",
    "/admin",
    "/admin/*",
    "/_next/*",
    "/api/*",
    "/reset-password",
    "/forgot-password",
    // Prevent indexing of malformed nested country URLs like /us/in, /us/ae, etc.
    "/*/??",
    "/*/*/??",
    // Dynamically block unsupported country codes
    ...unsupportedCountries.map(code => `/${code}/*`),
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/checkout", "/account", "/cart", "/admin"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/checkout", "/account", "/cart", "/admin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 