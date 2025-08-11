import { NextResponse } from "next/server"
import { searchProducts } from "@lib/data/search"

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") ?? ""
  const countryCode = searchParams.get("countryCode") ?? "us"

  if (!q.trim()) {
    return new NextResponse(JSON.stringify({ products: [] }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=30',
      },
    })
  }

  try {
    const { products } = await searchProducts({
      query: q,
      limit: 5,
      offset: 0,
      filter: {},
      countryCode,
    })

    return new NextResponse(JSON.stringify({ products }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=30',
      },
    })
  } catch (e) {
    console.error("Error in search-suggest route", e)
    return new NextResponse(JSON.stringify({ products: [] }), { status: 500, headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    } })
  }
} 