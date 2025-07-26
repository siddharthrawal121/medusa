export const buildAlternates = (
  path: string,
  countryCode?: string,
  baseUrl?: string
) => {
  const code = countryCode?.toLowerCase() || "us"
  const url = `${baseUrl || ""}/${code}${path.startsWith("/") ? path : `/${path}`}`
  return {
    canonical: url,
    languages: {
      [`en-${code.toUpperCase()}`]: url,
    },
  }
} 