import { isPlaceholder } from '../../data/site'

/**
 * Renders a content value; ph('…') placeholders show as a dashed marigold
 * tag so unfinished content is impossible to miss before launch.
 */
export default function Fill({ value, className = '' }) {
  if (isPlaceholder(value)) return <span className={`placeholder ${className}`}>{value}</span>
  return value
}
