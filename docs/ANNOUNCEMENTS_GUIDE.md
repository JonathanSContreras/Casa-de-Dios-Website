# 📢 Announcements Feature Guide

Complete guide for managing church announcements with auto-expiration and priority levels.

---

## ✅ What's Been Added

### 1. **Announcement Schema** (`/sanity/schemaTypes/announcement.ts`)
   - Title (required)
   - Message (max 300 chars, required)
   - Priority: Urgent 🔴 / Normal 🔵 / Low ⚪
   - Publish Date (defaults to now)
   - Expiration Date (optional - for auto-hiding)
   - Link (optional - for "Learn More")
   - Slug (for potential detail pages)

### 2. **TypeScript Types** (`/src/lib/sanity/types.ts`)
   - `AnnouncementPriority` type
   - `Announcement` interface

### 3. **Query Functions** (`/src/lib/sanity/queries.ts`)
   - `getActiveAnnouncements()` - Fetches only active announcements
   - `getAllAnnouncements()` - For admin views
   - `getAnnouncementBySlug()` - Single announcement lookup

### 4. **Homepage Integration** (`/src/app/page.tsx`)
   - Announcements section (after hero, before service times)
   - Priority-based styling (red/blue/gray)
   - Auto-refresh every 5 minutes
   - "Learn More" links if provided

---

## 🚀 How to Use Announcements

### Creating an Announcement in Studio

1. **Go to Studio**: http://localhost:3000/studio
2. **Click "Announcements"** in the sidebar
3. **Click "Create new announcement"**
4. **Fill in the fields:**

   **Title** (required)
   ```
   Example: "Church Closed This Sunday"
   ```

   **Message** (required, max 300 chars)
   ```
   Example: "Due to building maintenance, all services are canceled this Sunday, January 21st. We will resume normal schedule the following week."
   ```

   **Priority** (required)
   - 🔴 **Urgent**: Time-sensitive, critical info (red styling)
     - Examples: Cancellations, emergencies, urgent changes
   - 🔵 **Normal**: Standard announcements (blue styling)
     - Examples: New programs, upcoming events, regular updates
   - ⚪ **Low**: General information (gray styling)
     - Examples: Newsletters, reminders, non-urgent info

   **Publish Date** (required, defaults to now)
   - When the announcement should become visible
   - Set future date to schedule announcements

   **Expiration Date** (optional)
   - When the announcement should automatically hide
   - Leave empty for announcements that stay visible indefinitely

   **Link** (optional)
   - URL for "Learn More" button
   - Example: Link to event registration, detailed info page, etc.

5. **Click "Publish"** to make it live!

---

## 📅 Auto-Expiration Logic

Announcements are **automatically shown/hidden** based on dates:

### Active Announcement Requirements:
1. ✅ `publishDate <= now()` (announcement has been published)
2. ✅ `expirationDate > now()` OR `expirationDate is null`

### Examples:

#### Temporary Announcement (Auto-expires)
```
Title: "Building Maintenance This Weekend"
Publish Date: January 18, 2026 8:00 AM
Expiration Date: January 20, 2026 11:59 PM
```
- ✅ Visible from Jan 18-20
- ❌ Automatically hidden after Jan 20

#### Permanent Announcement (No expiration)
```
Title: "New Online Giving Platform Available"
Publish Date: January 18, 2026 8:00 AM
Expiration Date: (leave empty)
```
- ✅ Visible from Jan 18 onwards
- ✅ Stays visible until manually removed or expired

#### Scheduled Announcement (Future publish)
```
Title: "Easter Service Times"
Publish Date: March 1, 2026 8:00 AM
Expiration Date: April 1, 2026 11:59 PM
```
- ❌ Hidden until March 1
- ✅ Visible March 1-31
- ❌ Automatically hidden after March 31

---

## 🎨 Priority Styling on Homepage

### Urgent (Red) 🔴
```css
- Red left border (4px)
- Light red background
- Red icon
- "URGENT" badge in red
```
**Best for:**
- Service cancellations
- Emergency closures
- Critical safety information
- Urgent schedule changes

### Normal (Blue) 🔵
```css
- Blue left border (4px)
- Light blue background
- Blue icon
- "NORMAL" badge in blue
```
**Best for:**
- Upcoming events
- New programs/ministries
- Regular announcements
- General updates

### Low (Gray) ⚪
```css
- Gray left border (4px)
- White background
- Gray icon
- "LOW" badge in gray
```
**Best for:**
- Newsletter reminders
- Non-urgent reminders
- General information
- Background updates

---

## 📱 Display Order

Announcements are displayed in this order:

1. **Priority** (urgent → normal → low)
2. **Publish Date** (newest first within each priority)

Example order on homepage:
```
🔴 Urgent Announcement #1 (Jan 19)
🔴 Urgent Announcement #2 (Jan 18)
🔵 Normal Announcement #1 (Jan 20)
🔵 Normal Announcement #2 (Jan 19)
⚪ Low Announcement #1 (Jan 18)
```

---

## 💡 Best Practices

### Writing Good Announcements

✅ **Do:**
- Keep messages concise (under 300 characters)
- Use clear, action-oriented titles
- Set expiration dates for time-sensitive announcements
- Use appropriate priority levels
- Include links for more detailed information

❌ **Don't:**
- Use all caps (looks like shouting)
- Mark everything as urgent (diminishes impact)
- Write long, detailed messages (use the link instead)
- Forget to set expiration dates for temporary announcements

### Priority Guidelines

**Use URGENT for:**
- Building closures
- Service cancellations
- Weather-related changes
- Safety alerts

**Use NORMAL for:**
- Most regular announcements
- Event reminders
- New ministry launches
- General updates

**Use LOW for:**
- Newsletter links
- Non-urgent reminders
- Background information
- Long-term notices

---

## 🧪 Testing Announcements

### Test the Full Workflow

1. **Create a test announcement:**
   ```
   Title: "Test Announcement"
   Message: "This is a test announcement to verify everything works."
   Priority: Normal
   Publish Date: Now
   Expiration Date: Tomorrow
   ```

2. **Publish it** in the Studio

3. **Check the homepage**: http://localhost:3000
   - Should appear in the announcements section
   - Should have blue (normal) styling

4. **Test expiration:**
   - Set expiration to 1 minute from now
   - Wait 1 minute
   - Refresh homepage
   - Announcement should disappear

5. **Test priority:**
   - Create 3 announcements (urgent, normal, low)
   - Check homepage
   - Urgent should appear first

---

## 🔄 Auto-Refresh Timing

The homepage **revalidates every 5 minutes** (300 seconds):
- New announcements appear within 5 minutes
- Expired announcements disappear within 5 minutes
- No manual refresh needed in production

For instant updates during development:
- Hard refresh: **Cmd/Ctrl + Shift + R**

---

## 📂 File Structure

```
casa-de-dios-website/
├── sanity/schemaTypes/
│   ├── announcement.ts          # Announcement schema
│   ├── event.ts                 # Event schema
│   └── index.ts                 # Exports both schemas
│
├── src/lib/sanity/
│   ├── types.ts                 # TypeScript types
│   ├── queries.ts               # GROQ queries
│   ├── client.ts                # Sanity client
│   └── image.ts                 # Image helper
│
└── src/app/
    ├── page.tsx                 # Homepage with announcements
    └── events/page.tsx          # Events page
```

---

## 🎯 Next Steps: Adding More Content Types

Now that you have **Events** and **Announcements** working, you can easily add:

### 3. Prayer Requests
Similar pattern:
- Create `prayer-request.ts` schema
- Add to types and queries
- Display on prayer page

### 4. Leadership
Similar pattern:
- Create `leadership.ts` schema
- Add to types and queries
- Display on about page

### 5. Ministries
Similar pattern:
- Create `ministry.ts` schema
- Add to types and queries
- Display on ministries page

### 6. Resources
Similar pattern:
- Create `resource.ts` schema
- Add to types and queries
- Display on resources page

**Follow the same steps we used for announcements!**

---

## 📞 Support & Tips

### Common Questions

**Q: Why isn't my announcement showing up?**
A: Check these:
1. Is it published (not just saved as draft)?
2. Is the publish date in the past?
3. Is the expiration date in the future (or empty)?
4. Has it been 5 minutes since publishing?

**Q: Can I edit a published announcement?**
A: Yes! Edit it in the Studio and click "Publish" again.

**Q: How do I remove an announcement?**
A: Either:
1. Set an expiration date in the past, OR
2. Unpublish/delete it in the Studio

**Q: Can announcements have images?**
A: Not currently, but you can add an image field to the schema if needed.

**Q: How do I schedule an announcement for next week?**
A: Set the publish date to next week. It won't appear until that date.

---

## ✨ Summary

Your announcements feature is **production-ready**! You can now:

✅ Create announcements with priority levels
✅ Schedule future announcements
✅ Auto-expire temporary announcements
✅ Display on homepage with beautiful styling
✅ Add "Learn More" links
✅ Manage everything from the Studio

**Start using it:**
```
http://localhost:3000/studio → Announcements → Create
```

Happy announcing! 🎉
