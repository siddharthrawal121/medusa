import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-primary/20 relative bg-primary">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-5xl font-serif text-neutral-light"
          >
            Ecommerce Starter Template
          </Heading>
          <Heading
            level="h2"
            className="text-xl font-sans text-grey-400 mt-4"
          >
            Powered by Medusa and Next.js
          </Heading>
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
        >
          <Button className="bg-secondary text-primary hover:bg-secondary/90 flex items-center gap-x-2 hover:scale-105 transition-transform duration-200 ease-in-out">
            View on GitHub
            <Github />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
