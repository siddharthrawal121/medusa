"use client"

import { Button } from "@medusajs/ui"

interface ContactPageProps {
  params: {
    countryCode: string
  }
}

export default function ContactPage({ params }: ContactPageProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! How can Imperial Craft of India assist you today?")
    window.open(`https://wa.me/919259418994?text=${message}`, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="content-container py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-display text-4xl text-luxury-charcoal mb-4">
          Contact Us
        </h1>
        <div className="h-px w-20 bg-luxury-gold mb-8"></div>
        <p className="text-serif-regular text-luxury-charcoal/80 max-w-2xl mx-auto">
          Our team of specialists is here to assist you with any inquiries about our marble collections,
          custom commissions, or care and maintenance of your pieces. Choose your preferred way to reach us.
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
              <div className="space-y-6">
                {/* WhatsApp Section */}
                <div className="bg-luxury-cream/30 p-6 rounded-sm">
                  <div className="flex items-start space-x-4 mb-4">
                    <svg className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-serif-regular text-luxury-charcoal/80 mb-3">
                        Get instant responses through WhatsApp. Our team is available during business hours.
                      </p>
                      <button 
                        onClick={handleWhatsAppClick}
                        className="flex items-center gap-2 bg-luxury-gold text-white px-4 py-2 rounded-sm hover:bg-luxury-charcoal transition-colors duration-300"
                      >
                        <span className="text-sm font-medium">Chat on WhatsApp</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

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