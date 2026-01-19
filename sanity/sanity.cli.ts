import { defineCliConfig } from 'sanity/cli'

/**
 * Sanity CLI Configuration
 *
 * This configuration is used by the Sanity CLI for commands like:
 * - npx sanity deploy (deploy studio to sanity.io)
 * - npx sanity manage (open project management)
 * - npx sanity schema deploy (deploy schema changes)
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qisvzbm2',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  /**
   * Enable auto-updates for the Sanity CLI and studio deployment
   */
  deployment: {
    autoUpdates: true,
  },
})
