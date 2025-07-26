"use client"

import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AboutPage() {
  return (
    <div className="content-container py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4">
          About Imperial Craft of India
        </h1>
        <div className="h-px w-20 bg-luxury-gold mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 max-w-3xl mx-auto text-lg">
          From the heart of Agra—home of the Taj Mahal—Imperial Craft of India brings 15 years of marble‑sculpting mastery online. Since 2022, our workshop has been crafting museum‑quality marble sculptures, epoxy gemstone tables, bespoke tabletops, and more, delivering over <span className="font-semibold">10,000+</span> handcrafted pieces worldwide.
        </p>
      </div>

      {/* Heritage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Our Heritage & Story</h2>
          <div className="h-px w-16 bg-luxury-gold mb-8"></div>
          <div className="space-y-6 text-serif-regular text-luxury-charcoal/80">
            <p>
              Founded in 2008 as a family atelier, Imperial Craft of India was born from a passion for preserving centuries‑old marble carving traditions. Our founder, <em>Siddharth Rawal</em>, apprenticed under master sculptors in Rajasthan before opening his own studio in Agra. For 15 years, we served local palaces, temples, and private collectors—perfecting techniques passed down through three generations.
            </p>
            <p>
              In the wake of the 2020 global shift, we launched our online store in early 2022—to bring India's finest marble handicrafts and epoxy gemstone tables directly to your doorstep, anywhere in the world.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Our Craft & Process</h2>
          <div className="h-px w-16 bg-luxury-gold mb-8"></div>
          <ul className="space-y-4 text-serif-regular text-luxury-charcoal/80">
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">•</span>
              <span><strong className="text-luxury-charcoal">Selection:</strong> Ethically sourced premium marble from Makrana & Udaipur quarries.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">•</span>
              <span><strong className="text-luxury-charcoal">Design & Prototyping:</strong> 3D CAD mockups blended with hand‑sketch artistry.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">•</span>
              <span><strong className="text-luxury-charcoal">Sculpting & Carving:</strong> Precision chiseling and polishing by master artisans.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">•</span>
              <span><strong className="text-luxury-charcoal">Finishing:</strong> Multi‑stage sanding, sealing, and hand‑painting options.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">•</span>
              <span><strong className="text-luxury-charcoal">Quality Control:</strong> Each piece undergoes rigorous inspection before shipping.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-luxury-charcoal mb-4">What We Make</h2>
        <div className="h-px w-16 bg-luxury-gold mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Marble Sculptures</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Mini Taj Mahal replicas, gods & goddesses, bespoke figurines.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Jewelry & Ring Boxes</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Intricate inlaid designs, velvet‑lined interiors.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Chess Sets & Tabletops</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Functional art pieces, custom sizes.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Epoxy Gemstone Tables</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Live‑edge slabs inlaid with crushed gemstones & resin.</p>
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Quality, Authenticity & Promise</h2>
        <div className="h-px w-16 bg-luxury-gold mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-luxury-cream/30 p-6 rounded-sm text-center">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">100% Genuine Marble</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">With certification from source quarries.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm text-center">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Handmade Excellence</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Each creation carved, polished, and painted by hand.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm text-center">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Global Durability</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Built to last generations with minimal upkeep.</p>
          </div>
        </div>
      </div>

      {/* Shipping Section */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Worldwide Shipping & Service</h2>
        <div className="h-px w-16 bg-luxury-gold mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 mb-6">
          Over <span className="font-semibold">10,000+</span> pieces shipped to luxury hotels, galleries, and private homes across 50+ countries. We offer:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">White‑glove Delivery</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Museum‑grade packing for flawless arrivals.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Customs & Duties Support</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Documentation to streamline international delivery.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Easy Returns & Warranty</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">30‑day satisfaction guarantee + 2‑year craftsmanship warranty.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Why Choose Imperial Craft of India?</h2>
        <div className="h-px w-16 bg-luxury-gold mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Heritage Expertise</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">15 years honing the art of marble from Agra's finest masters.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Transparent Pricing</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">No hidden fees—detailed quotes for custom projects.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">One‑on‑One Support</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Dedicated project manager for every order.</p>
          </div>
          <div className="bg-luxury-cream/30 p-6 rounded-sm">
            <h3 className="font-display text-lg text-luxury-charcoal mb-3">Sustainability</h3>
            <p className="text-serif-regular text-luxury-charcoal/80">Eco‑friendly resins and responsibly quarried stone.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <LocalizedClientLink href="/products">
          <Button className="luxury-btn px-8 py-4">
            Explore Our Collection
          </Button>
        </LocalizedClientLink>
        <p className="mt-4 text-serif-regular text-luxury-charcoal/80">
          Or <LocalizedClientLink href="/contact" className="text-luxury-gold hover:text-luxury-charcoal transition-colors duration-200">contact us</LocalizedClientLink> for a custom quote.
        </p>
      </div>
    </div>
  )
} 