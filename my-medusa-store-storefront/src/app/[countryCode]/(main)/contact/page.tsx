"use client"

import { Button } from "@medusajs/ui"

interface ContactPageProps {
  params: {
    countryCode: string
  }
}

export default function ContactPage({ params }: ContactPageProps) {

  return (
    <div className="content-container py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4">
          Contact Us
        </h1>
        <div className="h-px w-20 bg-luxury-gold mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto">
          Our team of specialists is here to assist you with any inquiries about our marble collections,
          custom commissions, or care and maintenance of your pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Send Us a Message</h2>
          <div className="h-px w-16 bg-luxury-gold mb-8"></div>
          
            <form 
              action="https://formsubmit.co/support@imperialcraftofindia.com" 
              method="POST"
              className="space-y-6"
            >
              {/* FormSubmit redirect configuration */}
              <input type="hidden" name="_next" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/contact/thank-you`} />
              <input type="hidden" name="_subject" value="New Contact Form Submission" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-small-semi text-luxury-charcoal mb-2">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-small-semi text-luxury-charcoal mb-2">
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-small-semi text-luxury-charcoal mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-small-semi text-luxury-charcoal mb-2">
                    Subject*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Custom Commission">Custom Commission</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Care & Maintenance">Care & Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-small-semi text-luxury-charcoal mb-2">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full border border-luxury-lightgold/50 bg-luxury-ivory p-3 focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                ></textarea>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="luxury-btn px-8 py-4 w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </div>
            </form>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="font-display text-2xl text-luxury-charcoal mb-4">Our Information</h2>
          <div className="h-px w-16 bg-luxury-gold mb-8"></div>
          
          <div className="space-y-10">
            
            <div>
              <h3 className="font-display text-lg text-luxury-charcoal mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div className="text-serif-regular text-luxury-charcoal/80">
                    <p>support@imperialcraftofindia.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div className="text-serif-regular text-luxury-charcoal/80">
                    <p>+91 9259418994</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-lg text-luxury-charcoal mb-4">Hours of Operation</h3>
              <div className="space-y-2 text-serif-regular text-luxury-charcoal/80">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
} 