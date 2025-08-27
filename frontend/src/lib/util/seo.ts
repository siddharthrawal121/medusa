export const buildAlternates = (
  path: string,
  countryCode?: string,
  baseUrl?: string
) => {
  const code = (countryCode || "us").toLowerCase()

  // Ensure baseUrl is absolute and normalized (no trailing slash)
  const normalizedBase = (baseUrl || "").replace(/\/$/, "")
  const safeBase = normalizedBase || "https://www.imperialcraftofindia.com"

  // Normalize path and avoid double slashes
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : ""
  const url = `${safeBase}/${code}${normalizedPath}`.replace(/([^:]\/)\/+/, "$1")
  return {
    canonical: url,
    languages: {
      [`en-${code.toUpperCase()}`]: url,
    },
  }
} 