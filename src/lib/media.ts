/**
 * Append Sanity CDN image transforms for compression.
 * Serves WebP/AVIF automatically via auto=format.
 * Quality 80 = visually lossless at ~60% smaller file size.
 */
export function optimizeImageUrl(
  url: string | null | undefined,
  opts: { width?: number; quality?: number } = {}
): string | null {
  if (!url) return null
  const { width = 1920, quality = 80 } = opts
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&q=${quality}&auto=format&fit=max`
}

/** Full-screen hero: bigger but slightly more compressed */
export function heroImageUrl(url: string | null | undefined): string | null {
  return optimizeImageUrl(url, { width: 2400, quality: 75 })
}

/** Gallery images: good quality, reasonable size */
export function galleryImageUrl(url: string | null | undefined): string | null {
  return optimizeImageUrl(url, { width: 1600, quality: 80 })
}
