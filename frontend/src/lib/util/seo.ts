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

  // Build hreflang map. Allow configuring active country codes via env to
  // advertise ALL regional alternates on every page and add x-default.
  const envCountries = (process.env.NEXT_PUBLIC_HREFLANG_COUNTRIES || "")
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter((c) => /^[a-z]{2}$/.test(c))

  const defaultCountry = (process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || process.env.DEFAULT_COUNTRY || "us")
    .toString()
    .trim()
    .toLowerCase()
  const safeDefault = /^[a-z]{2}$/.test(defaultCountry) ? defaultCountry : "us"

  const languages: Record<string, string> = {}

  // If the env list is provided, generate a full hreflang set; otherwise keep
  // the previous behaviour (self-only) to avoid unexpected changes.
  if (envCountries.length) {
    envCountries.forEach((cc) => {
      const href = `${safeBase}/${cc}${normalizedPath}`.replace(/([^:]\/)\/+/, "$1")
      languages[`en-${cc.toUpperCase()}`] = href
    })
    languages["x-default"] = `${safeBase}/${safeDefault}${normalizedPath}`.replace(/([^:]\/)\/+/, "$1")
  } else {
    languages[`en-${code.toUpperCase()}`] = url
  }

  return {
    canonical: url,
    languages,
  }
}