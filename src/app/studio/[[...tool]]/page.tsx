/**
 * Embedded Sanity Studio Route (DEPRECATED)
 *
 * NOTE: The Sanity Studio is now deployed as a standalone app.
 * This embedded route is kept for backwards compatibility but may be removed.
 * Use the standalone Studio deployment instead.
 *
 * This route embeds the Sanity Studio directly in your Next.js app.
 * Access it at: http://localhost:3000/studio (development)
 *               https://your-domain.com/studio (production)
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  // Type assertion needed due to version mismatch between root and sanity/node_modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <NextStudio config={config as any} />
}
