"use client"
import { useState } from "react"
import Input from "@modules/common/components/input"
import { submitNewPassword } from "@lib/data/client-actions"
import { useSearchParams, useRouter } from "next/navigation"

export default function ResetPasswordTemplate() {
  const params = useSearchParams()
  const token = params?.get("token")
  const router = useRouter()

  const [pw1, setPw1] = useState("")
  const [pw2, setPw2] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string|null>(null)

  if (!token) {
    return <p className="text-center py-20">Invalid reset link.</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pw1 !== pw2) {
      setError("Passwords do not match")
      return
    }
    const res = await submitNewPassword(token, pw1)
    if (res.error) {
      setError(res.error)
    } else {
      setDone(true)
      setTimeout(() => router.push("/account"), 2000)
    }
  }

  return (
    <div className="w-full flex flex-col items-center py-20">
      {/* Decorative lock icon */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r from-[var(--color-luxury-gold)]/10 to-[var(--color-luxury-gold)]/20 border border-[var(--color-luxury-gold)]/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-luxury-darkgold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h1 className="font-display text-2xl text-[var(--color-luxury-charcoal)] mb-2 uppercase tracking-wider text-center">
        Set New Password
      </h1>
      <div className="h-0.5 w-32 gold-gradient mb-6"></div>
      {done ? (
        <p className="text-[var(--color-luxury-charcoal)]/80 max-w-sm text-center">
          Password updated! Redirecting…
        </p>
      ) : (
        <>
          <p className="text-center text-[var(--color-luxury-charcoal)]/70 mb-8 max-w-sm">
            Choose a strong password to keep your account secure.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <Input
              name="password"
              label="New password"
              type="password"
              required
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              className="luxury-input"
            />
            <Input
              name="password_confirm"
              label="Repeat password"
              type="password"
              required
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="luxury-input mt-4"
            />
            {error && (
              <div className="bg-red-100 mt-4 p-3 text-red-700 rounded">
                {error}
              </div>
            )}
            <button className="w-full mt-8 luxury-btn">Update password</button>
          </form>
        </>
      )}
    </div>
  )
} 