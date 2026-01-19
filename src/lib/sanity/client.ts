import { createClient } from 'next-sanity'

/**
 * Sanity Client Configuration
 *
 * This client is used to fetch data from Sanity in your Next.js application.
 * It supports both client-side and server-side rendering.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01' // Use today's date for latest API features

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Please check your .env.local file.'
  )
}

/**
 * Client for reading data
 * Safe to use on client-side and server-side
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for faster response times in production
  perspective: 'published', // Only fetch published documents
})

/**
 * Client for preview mode (optional)
 * Use this if you want to preview draft content
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for preview to get latest data
  perspective: 'previewDrafts', // Include draft documents
  token: process.env.SANITY_READ_TOKEN, // Add read token for draft access
})

/**
 * Helper to get the appropriate client based on preview mode
 */
export function getClient(preview: boolean = false) {
  return preview ? previewClient : client
}
