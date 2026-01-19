# Prayer Requests System - Complete Guide

## Overview

The Prayer Requests system allows church members to submit prayer requests through a public form. All submissions are moderated by church staff before appearing publicly on the website.

## System Architecture

### Workflow
1. **User submits** prayer request via public form at `/prayer-request`
2. **API route** creates request in Sanity with `status="pending"` and `isPublic=false`
3. **Church staff** reviews requests in Sanity Studio at `/studio`
4. **Staff approves** by changing `status="approved"` and `isPublic=true`
5. **Approved requests** automatically appear on the public prayer page

### Privacy & Security
- **contactEmail is PRIVATE** - never exposed in public queries or previews
- All submissions start as pending and hidden
- Only approved + public requests are displayed
- API route uses server-side write token (never exposed to browser)
- Form includes validation and character limits

## Files Created

### Schema
- `/sanity/schemaTypes/prayerRequest.ts` - Prayer request document schema
- Updated `/sanity/schemaTypes/index.ts` - Added prayerRequest to exports

### Types & Queries
- Updated `/src/lib/sanity/types.ts` - Added PrayerRequest and PublicPrayerRequest types
- Updated `/src/lib/sanity/queries.ts` - Added getApprovedPrayerRequests() and getRecentPrayerRequests()
- `/src/lib/sanity/client-write.ts` - Write-enabled Sanity client (server-side only)

### API Route
- `/src/app/api/prayer-request/route.ts` - Handles form submissions

### Frontend
- `/src/app/prayer-request/page.tsx` - Main page (server component)
- `/src/app/prayer-request/PrayerForm.tsx` - Submission form (client component)
- `/src/app/prayer-request/ApprovedRequests.tsx` - Display component (server component)

## Setup Instructions

### 1. Environment Configuration

Your `.env.local` file should already have these variables (from existing Sanity setup):
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token_here
```

### 2. Getting the SANITY_WRITE_TOKEN

If you don't have a write token yet:

1. **Go to Sanity Manage**: https://www.sanity.io/manage
2. **Select your project** (Casa de Dios website)
3. **Navigate to**: API → Tokens
4. **Click "Add API token"**
5. **Configure the token**:
   - **Name**: "Next.js Write Token" or "Prayer Requests API"
   - **Permissions**: Select "Editor" (allows creating/updating documents)
   - **Dataset**: Select your dataset (usually "production")
6. **Copy the token** - you'll only see it once!
7. **Add to `.env.local`**:
   ```bash
   SANITY_WRITE_TOKEN=sk... (your token here)
   ```

⚠️ **IMPORTANT**: Never commit the write token to version control!

### 3. Schema Deployment

The schema has already been deployed, but if you make changes:

```bash
cd sanity
npx sanity schema deploy
```

### 4. Install Dependencies

Date-fns is used for date formatting:
```bash
npm install date-fns
```

### 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000/prayer-request to test the form.

## Using the System

### For Church Members (Public)

1. **Visit** `/prayer-request`
2. **Fill out the form**:
   - Name (optional - leave blank for anonymous)
   - Prayer Request (required, max 500 characters)
   - Email (optional - for follow-up)
3. **Submit** - request goes to pending queue
4. **Wait** - staff will review and may approve
5. **View** approved requests below the form

### For Church Staff (Sanity Studio)

1. **Access Studio**: Visit `/studio` or https://your-domain.com/studio
2. **Login** with your Sanity credentials
3. **Navigate to**: "Prayer Requests" in the sidebar
4. **Review pending requests**:
   - ⏳ = Pending review
   - ✅ = Approved
   - 📦 = Archived
   - 🌐 = Public (visible on website)

5. **Approve a request**:
   - Open the prayer request
   - Change **Status** to "✅ Approved"
   - Toggle **Show Publicly** to ON
   - Click **Publish**
   - Request will appear on public page within 5 minutes (cache revalidation)

6. **Archive a request**:
   - Change **Status** to "📦 Archived"
   - Toggle **Show Publicly** to OFF
   - Click **Publish**
   - Request will be hidden from public page

### Contact Email Privacy

⚠️ **The contactEmail field is PRIVATE and will NEVER appear in**:
- Public website queries
- Schema preview lists
- API responses to the public

Only church staff with Studio access can view contact emails for follow-up purposes.

## API Reference

### POST /api/prayer-request

**Request Body**:
```json
{
  "name": "John Doe",           // Optional
  "request": "Please pray...",  // Required, max 500 chars
  "contactEmail": "john@example.com"  // Optional
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Thank you for your prayer request. Our team will review it shortly.",
  "id": "prayer-request-id"
}
```

**Error Response** (400/500):
```json
{
  "error": "Error message here"
}
```

### Validation Rules
- `request` - Required, 1-500 characters
- `contactEmail` - Optional, must be valid email format if provided
- `name` - Optional, any string

## Query Functions

### getApprovedPrayerRequests(limit?: number)

Fetches approved public prayer requests.

```typescript
import { getApprovedPrayerRequests } from '@/lib/sanity/queries'

const requests = await getApprovedPrayerRequests(20)
// Returns: PublicPrayerRequest[]
```

**Returns**:
```typescript
interface PublicPrayerRequest {
  _id: string
  name?: string          // "Anonymous" if not provided
  request: string
  submittedAt: string    // ISO datetime
}
```

**Filters**:
- `status == "approved"`
- `isPublic == true`
- Ordered by `submittedAt` descending

**Privacy**: Never includes `contactEmail`

### getRecentPrayerRequests(limit?: number)

Convenience function, calls `getApprovedPrayerRequests(limit)` with default limit of 5.

```typescript
const recent = await getRecentPrayerRequests(3)
```

## Schema Fields Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | No | null | Submitter name or null for anonymous |
| `request` | text | Yes | - | Prayer request content (max 500 chars) |
| `contactEmail` | string | No | null | **PRIVATE** - Email for follow-up |
| `submittedAt` | datetime | Yes | now() | Auto-set submission timestamp |
| `status` | string | Yes | "pending" | pending \| approved \| archived |
| `isPublic` | boolean | Yes | false | Toggle to show/hide on public page |

## Customization

### Changing Character Limit

To change the 500 character limit:

1. **Schema** (`sanity/schemaTypes/prayerRequest.ts`):
   ```typescript
   validation: (Rule) =>
     Rule.required()
       .max(1000)  // Change this
   ```

2. **API Route** (`src/app/api/prayer-request/route.ts`):
   ```typescript
   if (body.request.length > 1000) {  // Change this
   ```

3. **Form** (`src/app/prayer-request/PrayerForm.tsx`):
   ```typescript
   maxLength={1000}  // Change this
   ```

4. **Redeploy schema**:
   ```bash
   cd sanity && npx sanity schema deploy
   ```

### Changing Revalidation Time

The approved requests are cached and revalidated every 5 minutes.

To change this, edit `src/app/prayer-request/ApprovedRequests.tsx`:
```typescript
export const revalidate = 600  // 10 minutes (in seconds)
```

### Customizing the Display Limit

To show more/fewer requests, edit `src/app/prayer-request/ApprovedRequests.tsx`:
```typescript
const prayerRequests = await getApprovedPrayerRequests(50)  // Change from 20
```

## Troubleshooting

### Form submission fails with "Failed to submit"

1. Check that `SANITY_WRITE_TOKEN` is set in `.env.local`
2. Verify the token has "Editor" permissions
3. Check browser console and API route logs for specific errors
4. Ensure Sanity project ID and dataset are correct

### Approved requests not showing up

1. Verify request is both `approved` AND `isPublic=true` in Studio
2. Wait up to 5 minutes for cache to revalidate
3. Check query with direct Sanity Studio query tool:
   ```groq
   *[_type == "prayerRequest" && status == "approved" && isPublic == true]
   ```

### "Missing Sanity environment variables" error

Ensure your `.env.local` has:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_WRITE_TOKEN`

Then restart the dev server.

### Schema not updating in Studio

1. Redeploy schema:
   ```bash
   cd sanity && npx sanity schema deploy
   ```
2. Refresh Studio page
3. Clear browser cache if needed

## Future Enhancements

Possible additions to consider:

1. **Email Notifications** - Notify staff when new requests come in
2. **Rate Limiting** - Prevent spam submissions (e.g., max 3 per IP per day)
3. **Categories** - Tag requests (healing, guidance, thanksgiving, etc.)
4. **Prayer Count** - Let users click "I'm praying" button
5. **Search/Filter** - Filter by category or date range
6. **Admin Dashboard** - Stats on pending/approved counts
7. **Auto-Archive** - Archive requests older than 30 days
8. **Batch Actions** - Approve/archive multiple requests at once

## Support

For questions or issues with the prayer request system:
1. Check this guide first
2. Review the code comments in the files
3. Check Sanity Studio for any validation errors
4. Review browser console and server logs

---

**Last Updated**: January 18, 2026
**Version**: 1.0
