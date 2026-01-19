import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

/**
 * Sanity Image URL Helper
 *
 * This helper generates optimized image URLs from Sanity image assets.
 * It supports responsive images, crops, and quality optimization.
 */

const builder = createImageUrlBuilder(client)

/**
 * Generate an optimized image URL from a Sanity image source
 *
 * @param source - Sanity image object or asset reference
 * @returns Image URL builder with chainable methods
 *
 * @example
 * ```tsx
 * import { urlFor } from '@/lib/sanity/image'
 *
 * // Basic usage
 * <img src={urlFor(event.featuredImage).url()} alt={event.title} />
 *
 * // With width and auto format
 * <img
 *   src={urlFor(event.featuredImage).width(800).auto('format').url()}
 *   alt={event.title}
 * />
 *
 * // With crop and quality
 * <img
 *   src={urlFor(event.featuredImage)
 *     .width(600)
 *     .height(400)
 *     .fit('crop')
 *     .quality(90)
 *     .url()}
 *   alt={event.title}
 * />
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Get a responsive srcset for an image
 *
 * @param source - Sanity image object
 * @param widths - Array of widths to generate
 * @returns srcset string for responsive images
 *
 * @example
 * ```tsx
 * <img
 *   srcSet={getImageSrcSet(event.featuredImage, [400, 800, 1200])}
 *   sizes="(max-width: 768px) 100vw, 800px"
 *   src={urlFor(event.featuredImage).width(800).url()}
 *   alt={event.title}
 * />
 * ```
 */
export function getImageSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200]
): string {
  return widths
    .map((width) => `${urlFor(source).width(width).auto('format').url()} ${width}w`)
    .join(', ')
}
