import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Clock, Copy, LoaderCircle, MapPin } from 'lucide-react'
import { budgets, profile, services } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { Stagger, StaggerItem } from '../components/ui/Stagger'
import { SocialIcon } from '../components/ui/Brand'

const ease = [0.16, 1, 0.3, 1]
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initial = { name: '', email: '', services: [], budget: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Add your name so I know who to reply to.'
  if (!emailPattern.test(values.email)) errors.email = 'Enter an email address like name@business.com.'
  if (values.message.trim().length < 10) errors.message = 'Tell me a little more — a sentence or two is enough.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false)

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const toggleService = (title) =>
    setValues((v) => ({
      ...v,
      services: v.services.includes(title) ? v.services.filter((s) => s !== title) : [...v.services, title],
    }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Services: ${values.services.join(', ') || 'Not specified'}`,
      `Budget: ${values.budget || 'Not specified'}`,
      '',
      values.message,
    ].join('\n')

    // With a form endpoint configured (Formspree, Web3Forms…), post directly.
    if (profile.formEndpoint) {
      try {
        const res = await fetch(profile.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, services: values.services.join(', ') }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        setValues(initial)
      } catch {
        setStatus('error')
      }
      return
    }

    // Otherwise, hand the message to the visitor's email app.
    await new Promise((r) => setTimeout(r, 600))
    const subject = `New project enquiry from ${values.name}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('mailto')
  }

  const inputBase =
    'mt-2 block w-full rounded-2xl border bg-surface px-4 py-3.5 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus:border-cobalt focus:outline-none focus:ring-4 focus:ring-cobalt/15'

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="contact-title"
          title="Tell me what you're working on."
          intro="I reply within one working day. If it's a fit, you'll have a free preview within a week."
        />

        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Direct contact */}
          <Stagger className="lg:col-span-4">
            <StaggerItem>
              <p className="text-ink-soft">Prefer email?</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="font-display text-2xl font-semibold tracking-tight underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-cobalt md:text-[1.75rem]">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:border-ink"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      {copied ? <Check className="size-4 text-cobalt" /> : <Copy className="size-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </StaggerItem>

            <StaggerItem as="ul" className="mt-10 space-y-4 text-ink-soft">
              <li className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0" aria-hidden="true" />
                {profile.location} — working with clients anywhere
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0" aria-hidden="true" />
                {profile.hours}
              </li>
            </StaggerItem>

            <StaggerItem as="ul" className="mt-10 flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-cobalt hover:text-cobalt"
                  >
                    <SocialIcon name={s.icon} className="size-[18px]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </StaggerItem>
          </Stagger>

          {/* Form */}
          <Reveal delay={0.15} y={40} className="lg:col-span-7 lg:col-start-6">
            <div className="relative rounded-[28px] border border-line bg-paper-2 p-6 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' || status === 'mailto' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-[28rem] flex-col items-start justify-center"
                    role="status"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-cobalt text-on-cobalt">
                      <Check className="size-7" />
                    </span>
                    <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight">
                      {status === 'sent' ? 'Message sent.' : 'Your email app should now be open.'}
                    </h3>
                    <p className="mt-3 max-w-md text-ink-soft">
                      {status === 'sent'
                        ? "Thanks — I'll reply within one working day with a few questions and a time for a quick call."
                        : `Your message is filled in and ready. Press send there, or write to ${profile.email} directly if nothing opened.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-medium text-cobalt underline underline-offset-4"
                    >
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-7"
                  >
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field label="Your name" error={errors.name} id="field-name">
                        <input
                          id="field-name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={set('name')}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'field-name-error' : undefined}
                          placeholder="Ananya Kulkarni"
                          className={`${inputBase} ${errors.name ? 'border-[#c4382d]' : 'border-line'}`}
                        />
                      </Field>
                      <Field label="Email" error={errors.email} id="field-email">
                        <input
                          id="field-email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={set('email')}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'field-email-error' : undefined}
                          placeholder="you@business.com"
                          className={`${inputBase} ${errors.email ? 'border-[#c4382d]' : 'border-line'}`}
                        />
                      </Field>
                    </div>

                    <fieldset>
                      <legend className="text-sm font-medium">What do you need?</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {services.map((s) => {
                          const on = values.services.includes(s.title)
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => toggleService(s.title)}
                              aria-pressed={on}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                                on ? 'border-cobalt bg-cobalt text-on-cobalt' : 'border-line bg-surface hover:border-ink'
                              }`}
                            >
                              {on && <Check className="size-3.5" aria-hidden="true" />}
                              {s.title}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-sm font-medium">Rough budget</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {budgets.map((b) => {
                          const on = values.budget === b
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setValues((v) => ({ ...v, budget: on ? '' : b }))}
                              aria-pressed={on}
                              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                                on ? 'border-ink bg-ink text-paper' : 'border-line bg-surface hover:border-ink'
                              }`}
                            >
                              {b}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    <Field label="About the project" error={errors.message} id="field-message">
                      <textarea
                        id="field-message"
                        rows={5}
                        value={values.message}
                        onChange={set('message')}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'field-message-error' : undefined}
                        placeholder="What's the business, what isn't working, and when would you like it live?"
                        className={`${inputBase} resize-y ${errors.message ? 'border-[#c4382d]' : 'border-line'}`}
                        data-lenis-prevent
                      />
                    </Field>

                    {status === 'error' && (
                      <p role="alert" className="rounded-2xl bg-[#c4382d]/10 px-4 py-3 text-sm text-[#a52c22] dark:text-[#ff9a90]">
                        The message didn't go through. Check your connection and send again, or email {profile.email}.
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-ink-soft">No spam, no newsletter. Just a reply.</p>
                      <Button
                        type="submit"
                        size="lg"
                        icon={status === 'sending' ? undefined : ArrowUpRight}
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <span className="inline-flex items-center gap-2">
                            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </span>
                        ) : (
                          'Send message'
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-2 text-sm text-[#c4382d] dark:text-[#ff9a90]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
