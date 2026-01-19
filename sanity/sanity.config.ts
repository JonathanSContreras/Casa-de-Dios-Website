import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemaTypes'

/**
 * Sanity Studio Configuration
 *
 * This configuration defines your Sanity Studio setup.
 * The studio will be deployed to sanity.io for content management.
 *
 * Project: Casa de Dios Website
 * Dataset: production
 */
export default defineConfig({
  name: 'default',
  title: 'Casa de Dios Website',

  projectId: 'qisvzbm2',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
