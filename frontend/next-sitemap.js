const excludedPaths = [
  "/checkout",
  "/account/*",
  "/cart",
  "/admin/*",
  "/_next/*",
  "/api/*",
  "/reset-password",
  "/forgot-password",
]

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: excludedPaths,
  additionalPaths: async () => {
    const paths = []

    const staticPages = [
      { loc: "/us", priority: 1.0, changefreq: "daily" },
      { loc: "/us/products", priority: 0.9, changefreq: "daily" },
      { loc: "/us/categories", priority: 0.9, changefreq: "weekly" },
      { loc: "/us/collections", priority: 0.8, changefreq: "weekly" },
      { loc: "/us/store", priority: 0.8, changefreq: "daily" },
      { loc: "/us/blog", priority: 0.8, changefreq: "weekly" },
      { loc: "/us/about", priority: 0.7, changefreq: "monthly" },
      { loc: "/us/contact", priority: 0.7, changefreq: "monthly" },
      { loc: "/us/shipping", priority: 0.6, changefreq: "monthly" },
      { loc: "/us/terms", priority: 0.5, changefreq: "yearly" },
      { loc: "/us/privacy", priority: 0.5, changefreq: "yearly" },
      { loc: "/us/returns", priority: 0.6, changefreq: "monthly" },
      { loc: "/us/faqs", priority: 0.6, changefreq: "monthly" },
    ]

    return staticPages.map((page) => ({
      loc: page.loc,
      priority: page.priority,
      changefreq: page.changefreq,
      lastmod: new Date().toISOString(),
    }))
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: excludedPaths,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/checkout', '/account', '/cart', '/admin'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/checkout', '/account', '/cart', '/admin'],
      },
    ],
    host: process.env.NEXT_PUBLIC_BASE_URL,
  },
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/us') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/products/')) {
      priority = 0.8
      changefreq = 'daily'
    } else if (path.includes('/categories/')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.includes('/collections/')) {
      priority = 0.8
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
  sitemapSize: 5000,
  autoLastmod: true,
  outDir: './public',
}
