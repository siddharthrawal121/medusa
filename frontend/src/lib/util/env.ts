export const getBaseURL = () => {
  const candidates = [
    process.env.NEXT_PUBLIC_BASE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ].filter(Boolean) as string[]

  let url = candidates.find(Boolean)

  // If Vercel style URL is provided without protocol, default to https
  if (url && !/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  // As a final safety fallback, prefer the production domain instead of localhost
  // so canonical tags are always absolute and crawlable.
  return url || "https://www.imperialcraftofindia.com"
}
