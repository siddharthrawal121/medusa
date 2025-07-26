"use client"

import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"

export default function ThankYouPage() {
  const router = useRouter()
  
  return (
    <div className="content-container py-12">
      <div className="max-w-2xl mx-auto bg-luxury-cream/30 p-8 text-center">
        <svg className="w-16 h-16 text-luxury-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="font-display text-2xl text-luxury-charcoal mb-4">Thank You for Contacting Us</h1>
        <div className="h-px w-20 bg-luxury-gold mx-auto mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 mb-8">
          We've received your message and will respond within 24 hours. Thank you for your interest in our marble collections.
        </p>
        <Button 
          onClick={() => router.push("/contact")}
          className="luxury-btn-outline px-6 py-3"
        >
          Send Another Message
        </Button>
      </div>
    </div>
  )
} 