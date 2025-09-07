import { redirect } from "next/navigation"
import { getDefaultCountry } from "@lib/util/get-default-country"

export default async function RootPage() {
  // Determine default country code, fallback to 'us'
  let defaultCountryCode = (process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || process.env.DEFAULT_COUNTRY || 'us').toString().trim().toLowerCase()
  if (!/^[a-z]{2}$/.test(defaultCountryCode)) {
    defaultCountryCode = 'us'
  }
  try {
    // Resolve from backend, but don't block forever
    const resolved = await Promise.race([
      getDefaultCountry(),
      new Promise<string>((resolve) => setTimeout(() => resolve(defaultCountryCode), 800)),
    ])
    defaultCountryCode = resolved
  } catch (error) {
    console.error("Error determining default region:", error)
  }
  
  // Redirect to the default country store
  redirect(`/${defaultCountryCode}`)
} 