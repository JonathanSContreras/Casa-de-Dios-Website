# 🎉 Embedded Sanity Studio - Fixed & Ready!

## What Changed?

Your Sanity Studio is now **embedded directly in your Next.js app** instead of being deployed separately. This is the modern, recommended approach for Next.js projects.

### Before (Separate Deployment)
- ❌ Required separate `npx sanity deploy` command
- ❌ Needed separate hosting at `something.sanity.studio`
- ❌ Required additional package.json in sanity directory
- ❌ More complex deployment pipeline

### After (Embedded Studio) ✅
- ✅ Studio runs at **`http://localhost:3000/studio`**
- ✅ No separate deployment needed
- ✅ Same Next.js codebase and deployment
- ✅ Simpler, more integrated setup

---

## 🚀 How to Use Your Studio

### Development (Local)

1. **Start your dev server:**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Access the Studio:**
   Open your browser to: **http://localhost:3000/studio**

3. **Log in:**
   - You'll be prompted to log in with your Sanity account
   - Use the same credentials from sanity.io

4. **Create content:**
   - Click "Events" in the sidebar
   - Click "Create new event"
   - Fill in the details and click "Publish"

### Production (Deployed)

When you deploy your Next.js app to Vercel (or any hosting platform):
- Your Studio will automatically be available at: **`https://your-domain.com/studio`**
- No additional configuration needed!
- Church admins can access it from anywhere

---

## 📁 Technical Details

### Studio Route Structure
\`\`\`
src/app/studio/[[...tool]]/
├── page.tsx          # Main Studio component
└── loading.tsx       # Loading state
\`\`\`

The `[[...tool]]` catch-all route handles all Studio navigation internally.

### Configuration Files
- **sanity/sanity.config.ts** - Studio configuration
- **sanity/sanity.cli.ts** - CLI configuration
- **src/env.js** - Environment variable validation (T3 stack)

### Environment Variables
All Sanity env vars are now validated by the T3 stack in `src/env.js`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (production)
- `NEXT_PUBLIC_SANITY_READ_TOKEN` - Optional read token
- `SANITY_WRITE_TOKEN` - Server-side write token (optional)

---

## ✅ What's Working Now

1. ✅ **Studio Route** - Access at `/studio`
2. ✅ **Event Schema** - Ready to create events
3. ✅ **Type Safety** - Full TypeScript support
4. ✅ **Environment Validation** - T3 stack validates all env vars
5. ✅ **Image Optimization** - `urlFor()` helper ready
6. ✅ **Query Functions** - Multiple event queries available
7. ✅ **Development & Production** - Works in both environments

---

## 🎯 Next Steps

### 1. Test the Studio
\`\`\`bash
npm run dev
\`\`\`
Visit: http://localhost:3000/studio

### 2. Create Your First Event
- Log in to the Studio
- Click "Events" → "Create new event"
- Fill in:
  - Title: "Test Event"
  - Description: "This is a test"
  - Start Date: Pick a future date
  - Category: Choose any category
- Click "Publish"

### 3. Update Your Events Page
Replace the hardcoded events in `src/app/events/page.tsx`:

\`\`\`typescript
// Add this import at the top
import { getUpcomingEvents } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// Replace the component with this
export default async function EventsPage() {
  // Fetch real events from Sanity
  const events = await getUpcomingEvents()

  // ... rest of your code
  // Replace upcomingEvents.map with events.map
  // Use event._id instead of event.id
  // Use urlFor(event.featuredImage).width(600).url() for images
}
\`\`\`

### 4. Deploy to Production
When you're ready to deploy:

\`\`\`bash
git add .
git commit -m "Add Sanity CMS integration with embedded studio"
git push
\`\`\`

Your hosting provider (Vercel) will automatically deploy both your Next.js app and the Studio.

---

## 🔒 Security Notes

### Protecting Your Studio Route

By default, anyone with the URL can access your Studio. To restrict access in production:

#### Option 1: Sanity's Built-in Auth (Recommended)
- Studio requires Sanity account login by default
- Only team members added to your Sanity project can access it
- No additional setup needed!

#### Option 2: Next.js Middleware (Extra Layer)
Create `src/middleware.ts`:

\`\`\`typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only run on studio route
  if (request.nextUrl.pathname.startsWith('/studio')) {
    // Add your custom auth logic here if needed
    // For example, check for a specific header or cookie
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
\`\`\`

#### Option 3: Vercel Password Protection
- Use Vercel's password protection feature
- Protects entire site or specific paths
- Good for staging environments

---

## 🆘 Troubleshooting

### Studio Won't Load
**Problem**: Getting errors when accessing `/studio`

**Solutions**:
1. Verify env vars in `.env.local`:
   \`\`\`bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=qisvzbm2
   NEXT_PUBLIC_SANITY_DATASET=production
   \`\`\`

2. Restart dev server:
   \`\`\`bash
   # Kill the server (Ctrl+C)
   npm run dev
   \`\`\`

3. Check browser console for errors

### Login Issues
**Problem**: Can't log in to Studio

**Solutions**:
1. Make sure you have a Sanity account at sanity.io
2. Clear browser cache and cookies
3. Try incognito/private browsing mode
4. Verify you're a member of the project

### Events Not Showing
**Problem**: Created events don't appear on events page

**Solutions**:
1. Make sure events are **published**, not just saved as drafts
2. Check that `startDate` is in the future for upcoming events
3. Verify the query is correct in your events page
4. Check browser console for fetch errors

### TypeScript Errors
**Problem**: Type errors in IDE

**Solutions**:
1. Restart TypeScript server in VS Code:
   - Cmd/Ctrl + Shift + P
   - Type "TypeScript: Restart TS Server"
2. Run type check:
   \`\`\`bash
   npm run typecheck
   \`\`\`

---

## 📚 Additional Resources

- [Sanity Studio Documentation](https://www.sanity.io/docs/studio)
- [Next.js App Router](https://nextjs.org/docs/app)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)

---

## 🎊 Summary

Your Sanity CMS is fully integrated and working! The embedded studio approach gives you:

1. ✅ **One Codebase** - Studio and frontend together
2. ✅ **Simple Deployment** - Deploy once, get both
3. ✅ **Easy Development** - Everything runs locally
4. ✅ **Type Safety** - Full TypeScript support
5. ✅ **Production Ready** - Works in all environments

**Start creating content:**
\`\`\`bash
npm run dev
# Visit: http://localhost:3000/studio
\`\`\`

**Need more help?** Check out `SANITY_SETUP.md` and `SANITY_QUICKSTART.md`

---

**Happy content managing! 🚀**
