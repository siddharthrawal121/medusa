import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseURL()

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