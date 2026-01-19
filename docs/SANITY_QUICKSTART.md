# Sanity CMS Quick Start 🚀

**Ready in 3 steps!**

## Step 1: Start Your Studio (1 minute)
The Sanity Studio is embedded in your Next.js app!

\`\`\`bash
npm run dev
\`\`\`

Then visit: **http://localhost:3000/studio**

- Log in with your Sanity account
- The studio runs directly in your app (no separate deployment needed!)

## Step 2: Create Test Events (3 minutes)
1. Visit http://localhost:3000/studio
2. Click "Events" → "Create new event"
3. Fill in event details and click "Publish"
4. Create 2-3 test events

## Step 3: Update Events Page (5 minutes)

Replace your hardcoded events array with this:

\`\`\`typescript
// src/app/events/page.tsx
import { getUpcomingEvents } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  // Now map over 'events' instead of 'upcomingEvents'
  // Use event._id for keys
  // Use urlFor(event.featuredImage).width(600).url() for images
}
\`\`\`

## Test It!
Visit these URLs:
- **Studio**: `http://localhost:3000/studio` (create/manage events)
- **Events Page**: `http://localhost:3000/events` (see your events live!)

Your Sanity events should appear on the events page!

---

## Quick Reference

### Common Queries
\`\`\`typescript
import {
  getUpcomingEvents,      // Future events, soonest first
  getAllEvents,           // All events, newest first
  getEventBySlug,         // Single event by slug
  getFeaturedEvents,      // Limited number for homepage
} from '@/lib/sanity/queries'
\`\`\`

### Image Optimization
\`\`\`typescript
import { urlFor } from '@/lib/sanity/image'

// Basic
<img src={urlFor(image).url()} alt="..." />

// Optimized
<img
  src={urlFor(image).width(800).auto('format').url()}
  alt="..."
/>
\`\`\`

### Helpful Commands
\`\`\`bash
npm run dev               # Run Next.js + Studio
npm run sanity:manage     # Open project settings
\`\`\`

**Studio URL**: http://localhost:3000/studio

---

Need more details? See **SANITY_SETUP.md** for complete documentation.
