/**
 * Schema Types Index
 *
 * This file exports all Sanity schema types.
 *
 * Current schemas:
 * - announcement: Church announcements with priority and auto-expiration
 * - event: Church events and special gatherings
 * - leadership: Church leadership team members
 * - ministry: Church ministries (references leadership)
 * - prayerRequest: Prayer requests with moderation workflow
 *
 * To add more schemas:
 * 1. Create new schema files in this directory (e.g., resource.ts, testimony.ts)
 * 2. Import them here
 * 3. Add to the exported array
 */

import announcement from './announcement'
import event from './event'
import leadership from './leadership'
import ministry from './ministry'
import prayerRequest from './prayerRequest'

// Export all schema types
// Note: leadership must be defined before ministry since ministry references it
export const schemaTypes = [
  announcement,
  event,
  leadership,
  ministry,
  prayerRequest,
]
