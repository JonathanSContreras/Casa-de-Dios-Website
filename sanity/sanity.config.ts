import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { Church } from 'lucide-react'

import { schemaTypes } from './schemaTypes'
import { structure } from './deskStructure'
import { Dashboard } from './dashboard'

/**
 * Sanity Studio Configuration
 *
 * This configuration defines your Sanity Studio setup with custom branding
 * and theme tailored for Casa de Dios church staff.
 *
 * Project: Casa de Dios Website
 * Dataset: production
 */
export default defineConfig({
  name: 'default',
  title: 'Casa de Dios CMS',

  projectId: 'qisvzbm2',
  dataset: 'production',

  // basePath removed for standalone studio deployment
  // basePath: '/studio',

  plugins: [
    dashboardTool({
      widgets: [
        {
          name: 'custom-dashboard',
          component: Dashboard,
          layout: { width: 'full' },
        },
      ],
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Custom studio icon
  icon: Church,
})
