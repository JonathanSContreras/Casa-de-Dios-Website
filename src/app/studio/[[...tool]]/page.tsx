/**
 * Embedded Sanity Studio Route
 *
 * This route embeds the Sanity Studio directly in your Next.js app.
 * Access it at: http://localhost:3000/studio (development)
 *               https://your-domain.com/studio (production)
 *
 * Benefits:
 * - No separate deployment needed
 * - Same authentication flow
 * - Easy to customize and integrate
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
