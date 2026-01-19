import { createClient } from 'next-sanity'

/**
 * Sanity Write Client Configuration
 *
 * This client is used for writing data to Sanity (mutations).
 * It includes an authentication token and should ONLY be used server-side
 * (API routes, Server Components with no client exposure).
 *
 * SECURITY WARNING:
 * - Never import this client in client-side code
 * - Never expose SANITY_WRITE_TOKEN to the browser
 * - Only use in API routes or secure server-side functions
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01' // Use today's date for latest API features
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Please check your .env.local file.'
  )
}

/**
 * Client for writing data to Sanity
 * Includes authentication token for mutations
 *
 * ONLY USE SERVER-SIDE:
 * - API routes (/app/api/*)
 * - Server Actions
 * - Server Components (with no client exposure)
 *
 * Note: If token is missing, operations will fail at runtime.
 * Check for the token in your API routes before using this client.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for write operations
  token: token || '', // Authentication token for write access
  perspective: 'published', // Default perspective
})

/**
 * Check if write client is properly configured
 */
export function isWriteClientConfigured(): boolean {
  return !!token
}
