import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import AnimatedButton from "@modules/common/components/animated-button"
import Link from "next/link"

interface HeroSectionProps {
  countryCode: string
}

export default function HeroSection({ countryCode }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full">
      {/* Background image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/hero_img.webp"
          alt="Luxury marble tabletop in elegant interior"
          fill
          priority
          sizes="100vw"
          className="object-cover w-full h-full"
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 w-full py-12">
        <div className="mb-4 md:mb-6">
          <Heading level="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-serif text-white leading-tight">
            <span className="block">Bespoke Marble</span>
            <span className="block">Handicrafts</span>
            <span className="block">for Timeless Luxury</span>
          </Heading>
        </div>
        <div className="mb-6 md:mb-8">
          <Text className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-white">
            Hand-carved by Master Artisans in India
          </Text>
        </div>
        <div>
          <Link href={`/${countryCode}/categories`}>
            <AnimatedButton variant="gold" size="large" className="w-full sm:w-auto">
              Shop Signature Collection
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  )
} 