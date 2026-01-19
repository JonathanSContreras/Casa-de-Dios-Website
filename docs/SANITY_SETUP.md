# Sanity CMS Integration - Casa de Dios Website

Complete setup guide for managing church events with Sanity CMS.

## 📋 What's Been Set Up

### ✅ Phase 1: Initialization
- ✅ Installed Sanity packages (`sanity`, `@sanity/client`, `@sanity/image-url`, `next-sanity`)
- ✅ Connected to existing Sanity project (ID: `qisvzbm2`)
- ✅ Environment variables configured in `.env.local`

### ✅ Phase 2: Event Schema
- ✅ Created event schema in `/sanity/schemaTypes/event.ts`
- ✅ Schema includes:
  - Title, slug, description
  - Start/end dates
  - Location, category
  - Featured image with hotspot
  - Registration link
  - Ministry reference

### ✅ Phase 3: Frontend Integration
- ✅ Sanity client configured (`/lib/sanity/client.ts`)
- ✅ Image URL helper (`/lib/sanity/image.ts`)
- ✅ Event queries (`/lib/sanity/queries.ts`)
- ✅ TypeScript types (`/lib/sanity/types.ts`)

### ✅ Phase 4: Studio Configuration
- ✅ Studio config files created
- ✅ Embedded Studio route created at `/studio`
- ✅ NPM scripts added for Sanity management
- ✅ Environment variables validated with T3 stack

---

## 🚀 Quick Start: Access Your Embedded Studio

### Embedded Studio Approach

Your Sanity Studio is **embedded directly in your Next.js app** at the `/studio` route. This means:
- ✅ No separate deployment needed
- ✅ Same codebase and authentication
- ✅ Easy to customize and extend
- ✅ Works in both development and production

### Step 1: Start Your Development Server

\`\`\`bash
npm run dev
\`\`\`

### Step 2: Access Your Studio

Open your browser to: **http://localhost:3000/studio**

You'll be prompted to log in with your Sanity account. After logging in, you can manage all your content!

### Production Deployment

When you deploy your Next.js app (e.g., to Vercel), your Studio will automatically be available at:
\`\`\`
https://your-domain.com/studio
\`\`\`

No additional configuration needed!

---

## 📚 Using Sanity Studio

### Creating Your First Event

1. **Navigate to your Studio URL** (e.g., `https://casa-de-dios.sanity.studio`)
2. **Log in** with your Sanity credentials
3. **Click "Events"** in the sidebar
4. **Click "Create new event"**
5. **Fill in the event details:**
   - **Title**: Event name (e.g., "Christmas Eve Service")
   - **Slug**: Auto-generated from title (used for URLs)
   - **Description**: Event details
   - **Start Date & Time**: When the event begins
   - **End Date & Time**: When the event ends (optional)
   - **Location**: Where it's happening
   - **Category**: Choose from predefined categories
   - **Featured Image**: Upload an image (optional)
   - **Registration Link**: External registration URL (optional)
   - **Hosting Ministry**: Link to a ministry (optional)
6. **Click "Publish"** to make the event live

### Event Categories

Your events can be categorized as:
- Outreach
- Youth
- Worship
- Prayer
- Fellowship
- Bible Study

---

## 💻 Fetching Events in Your Next.js App

### Available Query Functions

```typescript
import {
  getUpcomingEvents,
  getAllEvents,
  getEventBySlug,
  getEventsByCategory,
  getPastEvents,
  getFeaturedEvents,
} from '@/lib/sanity/queries'
```

### Example: Update Events Page

Update `/src/app/events/page.tsx` to use real Sanity data:

```typescript
import { getUpcomingEvents } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export default async function EventsPage() {
  // Fetch upcoming events from Sanity
  const events = await getUpcomingEvents()

  return (
    <div className="min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif mb-8">Upcoming Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event._id} className="border rounded-lg p-6">
                {event.featuredImage && (
                  <img
                    src={urlFor(event.featuredImage).width(600).url()}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {event.category}
                </span>

                <h3 className="text-2xl font-medium mt-3 mb-2">
                  {event.title}
                </h3>

                <p className="text-slate-600 mb-4">{event.description}</p>

                <div className="space-y-2 text-sm text-slate-500">
                  <p>📅 {new Date(event.startDate).toLocaleDateString()}</p>
                  <p>⏰ {new Date(event.startDate).toLocaleTimeString()}</p>
                  {event.location && <p>📍 {event.location}</p>}
                </div>

                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Register Now →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## 🛠️ Development Commands

### Run Your App with Embedded Studio

\`\`\`bash
npm run dev
\`\`\`

This starts your Next.js app at `http://localhost:3000` with the Studio available at `http://localhost:3000/studio`

### Open Project Management

\`\`\`bash
npm run sanity:manage
\`\`\`

Opens your Sanity project dashboard in the browser.

---

## 📦 Project Structure

\`\`\`
casa-de-dios-website/
├── sanity/                          # Sanity Studio configuration
│   ├── schemaTypes/
│   │   ├── event.ts                # Event schema definition
│   │   └── index.ts                # Schema exports
│   ├── sanity.config.ts            # Studio config
│   └── sanity.cli.ts               # CLI config
│
├── lib/sanity/                      # Frontend Sanity integration
│   ├── client.ts                   # Sanity client
│   ├── image.ts                    # Image URL helper
│   ├── queries.ts                  # GROQ queries
│   └── types.ts                    # TypeScript types
│
├── .env.local                       # Environment variables
└── src/app/events/page.tsx         # Events page (to be updated)
\`\`\`

---

## 🔐 Environment Variables

Your `.env.local` contains:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=qisvzbm2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_READ_TOKEN=...
SANITY_WRITE_TOKEN=...
\`\`\`

⚠️ **Never commit `.env.local` to git!** It's already in `.gitignore`.

---

## 🎯 Next Steps

### 1. Start Your Development Server
\`\`\`bash
npm run dev
\`\`\`

### 2. Access Your Studio
- Visit **http://localhost:3000/studio**
- Log in with your Sanity account
- You should see the Events content type

### 3. Create Test Events
- Click "Events" → "Create new event"
- Create 2-3 test events with different categories
- Add featured images and details
- Click "Publish" for each event

### 4. Update Events Page
- Modify `/src/app/events/page.tsx` to fetch from Sanity
- Use the example code in this guide
- Refresh `http://localhost:3000/events` to see your events

---

## 📈 Expanding to Other Content Types

Your Sanity project already has schemas for:
- ✅ Events (currently integrated)
- 📋 Announcements
- 🙏 Prayer Requests
- 👥 Leadership
- ⛪ Ministries
- 📚 Resources

### To add another content type (e.g., Announcements):

1. **Fetch the schema details** from your deployed Sanity project
2. **Create a local schema file** in `/sanity/schemaTypes/announcement.ts`
3. **Export it** in `/sanity/schemaTypes/index.ts`
4. **Create TypeScript types** in `/lib/sanity/types.ts`
5. **Add queries** in `/lib/sanity/queries.ts`
6. **Update your frontend pages** to use the new content

Follow the same pattern used for events!

---

## 🆘 Troubleshooting

### Studio Won't Load
- Make sure your dev server is running: `npm run dev`
- Check that `.env.local` has the correct project ID
- Verify you're logged in to Sanity (you'll be prompted on first visit)
- Check browser console for any errors

### No Events Showing Up
- Check that events are **published** (not just saved as drafts) in the Studio
- Verify events have `startDate >= today`
- Check browser console for fetch errors

### TypeScript Errors
- Run `npm run typecheck` to see specific errors
- Make sure all Sanity packages are installed: `npm install`
- Restart your TypeScript server in VSCode

### Images Not Loading
- Verify the image has been uploaded in Sanity Studio
- Check that `featuredImage` field is populated
- Ensure the image URL is generated correctly with `urlFor()`

---

## 📞 Support

### Useful Sanity Resources
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Studio Customization](https://www.sanity.io/docs/studio-customization)

### Quick Commands Reference
\`\`\`bash
# Run Next.js + Studio
npm run dev

# Access Studio
# Visit: http://localhost:3000/studio

# Open project management
npm run sanity:manage
\`\`\`

---

## ✨ Summary

Your Sanity CMS is ready! Here's what you have:

1. ✅ **Event Schema** - Fully configured and deployed
2. ✅ **Frontend Integration** - Queries and helpers ready to use
3. ✅ **TypeScript Support** - Type-safe event data
4. 🚀 **Ready to Deploy** - Studio configured for sanity.io

**Next Action:** Run `npm run dev` and visit `http://localhost:3000/studio` to start creating events!

Once events are working perfectly, you can easily add the other 5 content types using the same pattern.

---

**Made with ❤️ for Casa de Dios**
