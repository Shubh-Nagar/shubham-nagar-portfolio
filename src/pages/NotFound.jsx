import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Shubham Nagar'
  }, [])

  return (
    <section className="flex min-h-[80vh] items-center px-5 pt-[112px] sm:px-8">
      <div className="mx-auto w-full max-w-[1320px]">
        <p className="text-cobalt">404</p>
        <h1 className="display mt-3 max-w-[14ch] text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
          This page doesn't exist yet.
        </h1>
        <p className="mt-6 max-w-lg text-xl text-ink-soft">
          The link may be old or mistyped. Everything else is on the home page.
        </p>
        <Button to="/" size="lg" icon={ArrowLeft} iconHover="left" className="mt-10 flex-row-reverse">
          Back to home
        </Button>
      </div>
    </section>
  )
}
