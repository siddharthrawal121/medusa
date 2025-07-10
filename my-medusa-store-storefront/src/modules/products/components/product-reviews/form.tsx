"use client"

import { useState } from "react"

import { useEffect } from "react"
import { retrieveCustomer } from "../../../../lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { Button, Label, toast, Toaster } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { Star, StarSolid } from "@medusajs/icons"
import { addProductReview } from "../../../../lib/data/products"

type ProductReviewsFormProps = {
  productId: string
}

export default function ProductReviewsForm({ productId }: ProductReviewsFormProps) {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (customer) {
      return
    }

    retrieveCustomer().then(setCustomer)
  }, [])

  if (!customer) {
    return <></>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!content || !rating) {
      toast.error("Error", {
        description: "Please fill in required fields.",
      })
      return
    }

    e.preventDefault()
    setIsLoading(true)
    addProductReview({
      title,
      content,
      rating,
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      product_id: productId,
    }).then(() => {
      setShowForm(false)
      setTitle("")
      setContent("")
      setRating(0)
      toast.success("Success", {
        description: "Your review has been submitted and is awaiting approval.",
      })
    }).catch(() => {
      toast.error("Error", {
        description: "An error occurred while submitting your review. Please try again later.",
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  // TODO render form

  return (
    <div className="product-page-constraint mt-8">
      {!showForm && (
        <div className="flex justify-center">
          <Button variant="secondary" className="luxury-btn-outline" onClick={() => setShowForm(true)}>Add a review</Button>
        </div>
      )}
      {showForm && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <span className="font-display text-xl text-luxury-charcoal">
            Add a review
          </span>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Input
                label="Title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="mb-2 text-gray-700/80 text-sm">Content</label>
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
                rows={6}
                className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="mb-2 text-gray-700/80 text-sm">Rating</label>
              <div className="flex gap-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      setRating(index + 1)
                    }}
                    className="p-0 bg-transparent border-none"
                  >
                    {rating >= index + 1 ? (
                      <StarSolid className="text-luxury-gold" />
                    ) : (
                      <Star className="text-luxury-charcoal/30" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 luxury-btn"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  )
}

