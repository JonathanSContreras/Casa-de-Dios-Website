# 👥 Leadership & Ministries Guide

Complete guide for managing church leadership and ministries with reference relationships.

---

## ✅ What's Been Added

### **Leadership Schema** (`/sanity/schemaTypes/leadership.ts`)
- Name (required)
- Role/Title (required - e.g., "Senior Pastor", "Youth Director")
- Biography (optional)
- Photo with hotspot (optional)
- Email (optional)
- Order field for sorting (default: 0)
- Slug for URLs

### **Ministry Schema** (`/sanity/schemaTypes/ministry.ts`)
- Name (required)
- Description (required)
- Meeting Time (optional - e.g., "Sundays at 9:00 AM")
- Location (optional)
- **Leader Reference** - Links to leadership member
- Contact Email (optional)
- Is Active boolean (default: true - for hiding without deleting)
- Slug for URLs

### **TypeScript Types** (`/src/lib/sanity/types.ts`)
- `Leadership` interface
- `Ministry` interface
- `MinistryWithLeader` interface (for populated leader data)

### **Query Functions** (`/src/lib/sanity/queries.ts`)
**Leadership:**
- `getLeadership()` - All leaders ordered by 'order' field
- `getLeadershipBySlug()` - Single leader

**Ministries:**
- `getActiveMinistries()` - Active ministries with populated leader data
- `getAllMinistries()` - All ministries (admin view)
- `getMinistryBySlug()` - Single ministry with populated leader

### **Pages**
- **About Page** (`/src/app/about/page.tsx`) - Leadership section updated
- **Ministries Page** (`/src/app/ministries/page.tsx`) - New page created

---

## 🔗 Understanding the Reference Relationship

### How Ministries Reference Leaders

**In the Ministry Schema:**
```typescript
leader: {
  type: 'reference',
  to: [{ type: 'leadership' }]
}
```

This creates a **relationship** between ministries and leadership:
- Each ministry can have ONE leader
- The leader must be a person from the Leadership content type
- This is **optional** - ministries can exist without a leader

### Populating References in Queries

**Without Population** (just the reference):
```groq
*[_type == "ministry"] {
  name,
  leader  // Returns: { _ref: "abc123", _type: "reference" }
}
```

**With Population** (full leader data):
```groq
*[_type == "ministry"] {
  name,
  leader-> {  // The -> operator "dereferences" the reference
    name,
    role,
    photo
  }
}
```

This is what our queries do! The `->` operator fetches the full leader data automatically.

---

## 🚀 Creating Leadership Members

### Step 1: Go to Studio
http://localhost:3000/studio

### Step 2: Create Leadership

Click **"Leadership"** → **"Create new leadership"**

Fill in:
```
Name: Rev. John Doe
Role: Senior Pastor
Bio: Rev. John has served our church for over 15 years...
Photo: Upload a profile photo
Email: john@church.com
Order: 0  (appears first)
```

Click **"Publish"**

### Step 3: Create More Leaders

Create additional leaders with incremented order numbers:
- Senior Pastor: order = 0
- Associate Pastor: order = 1
- Youth Director: order = 2
- Worship Leader: order = 3

The `order` field controls the display order (lower numbers appear first).

---

## 🚀 Creating Ministries

### Step 1: Create a Leader First

Before creating ministries, **create at least one leadership member** since ministries reference leaders.

### Step 2: Create Ministry

Click **"Ministries"** → **"Create new ministry"**

Fill in:
```
Name: Youth Ministry
Description: Our youth ministry serves teens ages 12-18...
Meeting Time: Sundays at 6:00 PM
Location: Youth Room
Leader: [Select from dropdown - shows all leadership members]
Contact Email: youth@church.com
Is Active: ✓ (checked)
```

Click **"Publish"**

### Step 3: The Leader Dropdown

When you click the **"Leader"** field:
- You'll see a dropdown of ALL leadership members
- Search by typing a name
- Select the appropriate leader
- The reference is created automatically!

### Step 4: Optional Leader

You can leave the leader field empty if:
- The ministry doesn't have a dedicated leader yet
- Multiple people lead it
- You want to add the leader later

---

## 📋 How References Work

### In the Studio

**When creating a ministry:**
1. You type in the Leader field
2. Studio searches the Leadership content type
3. You select a person
4. Studio stores: `{ _ref: "leadership-id-123", _type: "reference" }`

**When viewing a ministry:**
- Studio shows the leader's name (not just the ID)
- You can click to open the leader's profile
- If you delete a leader, ministries referencing them will show a warning

### On the Website

**Our queries automatically populate the reference:**

```typescript
const ministries = await getActiveMinistries();

// Each ministry has full leader data:
ministries[0].leader = {
  _id: "...",
  name: "Rev. John Doe",
  role: "Senior Pastor",
  photo: { ... },
  email: "john@church.com"
}
```

No extra work needed - the `->` operator in GROQ does this for us!

---

## 🎨 Display Features

### About Page - Leadership Section

**Location:** http://localhost:3000/about (scroll to bottom)

**Features:**
- Grid layout (3 columns on desktop)
- Profile photos with fallback icon
- Name, role, and biography
- Contact button (if email provided)
- Ordered by the 'order' field

**Empty State:**
"Leadership information coming soon."

### Ministries Page

**Location:** http://localhost:3000/ministries

**Features:**
- Full-width cards for each ministry
- Ministry name, description, meeting time, location
- Contact email (clickable mailto link)
- **Leader card** showing:
  - Leader photo (or fallback icon)
  - Leader name and role
  - Contact link
- Only shows ACTIVE ministries
- Alphabetically ordered by name

**Empty State:**
"Ministry information coming soon. Check back later!"

---

## 🔄 Hiding vs. Deleting Ministries

### The `isActive` Field

Instead of deleting ministries, you can **deactivate** them:

1. Open the ministry in Studio
2. Uncheck **"Is Active"**
3. Click **"Publish"**

**Result:**
- ❌ Ministry hidden from website
- ✅ Ministry remains in database
- ✅ All data preserved
- ✅ Can reactivate anytime

**Use cases:**
- Seasonal ministries (summer programs)
- Ministries on hiatus
- Restructuring ministries
- Keeping historical data

---

## 📊 Ordering Leadership

### The `order` Field

Leadership members display in order of the `order` field:

```
order: 0  →  Senior Pastor (appears first)
order: 1  →  Associate Pastor
order: 2  →  Youth Director
order: 10 →  Volunteer Coordinator (appears last)
```

**Tips:**
- Use multiples of 10 (0, 10, 20, 30) to leave room for insertions
- If two people have the same order, they're sorted by name
- The order field can be negative (order: -1 appears before 0)

---

## 🧪 Testing the Reference Relationship

### Test Workflow

1. **Create a Leader:**
   ```
   Name: Test Leader
   Role: Test Director
   Order: 99
   ```

2. **Create a Ministry:**
   ```
   Name: Test Ministry
   Description: This is a test ministry
   Leader: [Select "Test Leader"]
   Is Active: ✓
   ```

3. **Check the Ministries Page:**
   - Visit: http://localhost:3000/ministries
   - You should see "Test Ministry"
   - The leader card should show "Test Leader" with their role

4. **Update the Leader:**
   - Go back to Studio
   - Edit "Test Leader"
   - Change role to "Senior Test Director"
   - Publish

5. **Refresh Ministries Page:**
   - Within an hour (or hard refresh), you'll see the updated role
   - The reference automatically shows current data!

---

## 💡 Best Practices

### Leadership

✅ **Do:**
- Use clear, professional photos (headshots work best)
- Write concise biographies (2-3 sentences)
- Use consistent titles ("Senior Pastor" not "Sr Pastor")
- Set order numbers with gaps (0, 10, 20) for flexibility
- Include contact emails for accessibility

❌ **Don't:**
- Use group photos for individual leaders
- Write long biographies (save details for a dedicated page)
- Skip the order field (defaults to 0, everyone appears at top)
- Delete leaders that ministries reference

### Ministries

✅ **Do:**
- Write clear, inviting descriptions
- Include specific meeting times and locations
- Assign appropriate leaders
- Use isActive for seasonal ministries
- Keep contact emails up to date

❌ **Don't:**
- Mark everything as active if it's not currently meeting
- Leave ministries without descriptions
- Forget to publish changes
- Delete leaders referenced by active ministries

---

## 🔧 Common Tasks

### Adding a New Leader Mid-Year

1. Create the leader in Studio
2. Set appropriate order number (e.g., between existing leaders)
3. Publish
4. Update any ministries they should lead

### Reassigning Ministry Leadership

1. Open the ministry in Studio
2. Click the Leader field
3. Remove old leader (X button)
4. Select new leader
5. Publish

### Creating a Ministry Without a Leader

1. Create ministry normally
2. Leave Leader field empty
3. Publish
4. Ministry displays without leader card

### Reordering Leadership

1. Open each leader
2. Update order numbers
3. Publish all changes
4. Refresh About page to see new order

---

## 📁 File Structure

```
casa-de-dios-website/
├── sanity/schemaTypes/
│   ├── announcement.ts          # Announcements
│   ├── event.ts                 # Events
│   ├── leadership.ts            # ✨ Leadership (NEW)
│   ├── ministry.ts              # ✨ Ministries (NEW)
│   └── index.ts                 # Exports all schemas
│
├── src/lib/sanity/
│   ├── types.ts                 # TypeScript types
│   ├── queries.ts               # GROQ queries
│   ├── client.ts                # Sanity client
│   └── image.ts                 # Image helper
│
└── src/app/
    ├── about/page.tsx           # ✨ Leadership section (UPDATED)
    ├── ministries/page.tsx      # ✨ Ministries page (NEW)
    ├── events/page.tsx          # Events page
    └── page.tsx                 # Homepage
```

---

## 🎯 Next Content Types to Add

You now have **4 content types** working:
1. ✅ Events
2. ✅ Announcements
3. ✅ Leadership
4. ✅ Ministries

**Ready to add:**
- 🙏 Prayer Requests
- 📚 Resources

Follow the same patterns!

---

## 📞 Support

### Common Questions

**Q: Why can't I select a leader for my ministry?**
A: You need to create leadership members first! Go to Leadership → Create, then come back to the ministry.

**Q: What happens if I delete a leader that's referenced by a ministry?**
A: Sanity will warn you. The ministry will lose its leader reference. It's better to update the ministry first.

**Q: Can a ministry have multiple leaders?**
A: Currently no - the schema allows ONE leader. You could create a "Co-Directors" leader entry, or extend the schema to allow multiple references.

**Q: Why doesn't my leadership photo appear?**
A: Check that the photo uploaded successfully and is published. The page uses a fallback icon if no photo exists.

**Q: Can I change the order of ministries?**
A: Ministries are alphabetically sorted by name. To change order, you'd need to rename them or add an order field to the ministry schema.

---

## ✨ Summary

Your Leadership and Ministries features are **production-ready**!

✅ **Leadership:**
- Managed in Studio
- Displayed on About page
- Ordered by custom field
- Photos with fallbacks
- Contact information

✅ **Ministries:**
- References leadership members
- Shows full leader details
- Active/inactive toggle
- Meeting times and locations
- Dedicated ministries page

✅ **Reference Relationship:**
- Ministries → Leadership connection
- Auto-populated in queries
- Easy to manage in Studio
- Type-safe TypeScript

**Start using it:**
```
http://localhost:3000/studio → Leadership → Create
http://localhost:3000/studio → Ministries → Create
```

Happy organizing! 🎉
