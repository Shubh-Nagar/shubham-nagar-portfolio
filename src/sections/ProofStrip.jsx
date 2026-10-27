import { Phone } from 'lucide-react'
import { previewMessage, profile, whatsappLink } from '../data/site'
import Button from '../components/ui/Button'
import { SocialIcon } from '../components/ui/Brand'
import Reveal from '../components/ui/Reveal'

/**
 * A single question to the visitor after "How it works": a cobalt card
 * with a real client site rising out of its top edge, and the
 * free-preview and call buttons beside it.
 */
export default function ProofStrip() {
  return (
    <section
      aria-labelledby="preview-question"
      className="relative px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36"
      style={{ background: 'linear-gradient(180deg, var(--paper) 0 45%, var(--paper-2) 45% 100%)' }}
    >
      <Reveal className="relative mx-auto max-w-[1180px]">
        <div className="relative grid overflow-visible rounded-[2rem] bg-cobalt text-on-cobalt shadow-[0_30px_60px_-30px_rgba(20,23,31,0.45)] md:grid-cols-12">
          {/* Decorative shapes, clipped to the card */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute -left-16 top-10 size-[26rem] rounded-full bg-white/10" />
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/10" />
            <div className="absolute bottom-8 right-10 hidden size-24 rounded-3xl border-[10px] border-white/10 md:block" />
          </div>

          {/* Site preview that breaks out of the top of the card */}
          <div className="relative px-6 pt-8 md:col-span-6 md:px-10 md:pt-0">
            <div className="relative mx-auto max-w-md md:-mt-20 md:mb-0">
              <div className="overflow-hidden rounded-t-2xl border border-white/20 bg-white shadow-2xl md:rounded-2xl md:rounded-b-none">
                <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f3f4f8] px-4 py-2.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-xs text-[#5b6070]">yourclinic.in</span>
                </div>
                <img
                  src="/work/dental-clinic-800.webp"
                  alt="Preview of a dental clinic website built by Shubham"
                  width="800"
                  height="4946"
                  loading="lazy"
                  className="h-64 w-full object-cover object-top sm:h-80 md:h-[22rem]"
                />
              </div>
            </div>
          </div>

          {/* Copy + actions */}
          <div className="relative px-6 py-10 sm:px-10 md:col-span-6 md:py-16 md:pl-4 md:pr-14">
            <h2 id="preview-question" className="display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02]">
              Want to see your new website before you pay a rupee?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed opacity-85">
              Tell me about your business and I'll build a working preview of your site. Pay only once you like it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button variant="light" size="lg" href={whatsappLink(previewMessage)} target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-2.5">
                  <SocialIcon name="whatsapp" className="size-5" />
                  Get your free preview
                </span>
              </Button>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 font-medium underline-offset-4 hover:underline"
              >
                <Phone aria-hidden="true" className="size-5" strokeWidth={2} />
                {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
