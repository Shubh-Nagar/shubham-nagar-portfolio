import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-cobalt text-on-cobalt hover:bg-cobalt-deep',
  ghost: 'border border-line text-ink hover:border-ink',
  light: 'bg-white text-[#14171f] hover:bg-[#e2e5fb]', // for use on cobalt backgrounds
}

// How the trailing icon reacts on hover
const iconMotion = {
  rotate: 'group-hover:rotate-45',
  down: 'group-hover:translate-y-0.5',
  right: 'group-hover:translate-x-0.5',
  left: 'group-hover:-translate-x-0.5',
}

const sizes = {
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

/**
 * Pill button with a "text roll" hover: the label slides up and a copy
 * slides in from below. Renders a router <Link> (to), an <a> (href) or a
 * <button> depending on the props given.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconHover = 'rotate',
  children,
  className = '',
  ...rest
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium
    transition-[background-color,border-color,transform] duration-300 active:scale-[0.97]
    disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      <span className="relative block overflow-hidden leading-tight">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className={`size-[1.1em] shrink-0 transition-transform duration-500 ease-out-expo ${iconMotion[iconHover]}`}
          strokeWidth={2}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
