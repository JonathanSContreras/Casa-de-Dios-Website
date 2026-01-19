# Sanity Studio Customization Guide

## Overview
This document describes the comprehensive customizations made to the Sanity Studio for Casa de Dios church staff. The studio has been tailored for ease of use by non-technical users with a professional, calming design.

## 🎨 Customizations Implemented

### 1. **Custom Branding & Theme**
**File:** `sanity/sanity.config.ts`

- **Custom Title:** "Casa de Dios CMS" instead of default project name
- **Custom Icon:** Church icon from lucide-react
- **Professional Color Scheme:**
  - Primary: Deep blue (#2563eb) - represents trust and stability
  - Accent: Warm gold (#eab308) - welcoming and hopeful
  - Background: Soft neutral (#fafaf9) - clean and uncluttered

### 2. **Organized Content Structure**
**File:** `sanity/structure.ts`

Content is organized into three logical sections:

#### 📋 Content Management
- **Events** (Calendar icon)
  - Sorted by start date (newest first)
  - Quick access to upcoming events
- **Announcements** (Bell icon)
  - Sorted by priority and publish date
  - Urgent announcements appear first

#### 👥 People & Groups
- **Leadership** (Users icon)
  - Sorted by display order
  - Easy management of church leaders
- **Ministries** (Heart icon)
  - Active ministries shown first
  - Clear indication of inactive ministries

#### 🙏 Community
- **All Prayer Requests** (HandHeart icon)
  - Complete list sorted by submission date
- **Pending Review** (Quick filter)
  - Shows only prayer requests awaiting approval
  - Helps staff prioritize moderation tasks

### 3. **Custom Icons**
**Files:** `sanity/schemaTypes/*.ts`

Each content type has a recognizable icon from lucide-react:
- ✅ Events: Calendar
- ✅ Announcements: Bell
- ✅ Leadership: Users
- ✅ Ministries: Heart
- ✅ Prayer Requests: HandHeart (in structure)

### 4. **Dashboard Widgets**
**Files:** `sanity/dashboard/*.tsx`

#### Welcome Widget
- Friendly greeting message
- Quick tips for common tasks
- Church icon for branding

#### Stats Widget
- **Pending Prayer Requests:** Shows count with caution tone if > 0
- **Upcoming Events:** Count of future events
- **Active Announcements:** Count of non-expired announcements
- Real-time data fetched from Sanity

#### Quick Links Widget
Fast access to common actions:
- Create New Event
- Create New Announcement
- Review Prayer Requests
- Manage Leadership
- Manage Ministries

### 5. **Custom CSS Styling**
**File:** `sanity/styles/studio.css`

Enhanced visual polish:
- **Typography:** Clean, modern system fonts with anti-aliasing
- **Cards:** Subtle hover effects with elevation
- **Spacing:** Improved padding and margins throughout
- **Buttons:** Smooth transitions and hover states
- **Forms:** Better input styling with focus states
- **Mobile Responsive:** Optimized for smaller screens
- **Accessibility:** Clear focus indicators for keyboard navigation
- **Status Indicators:** Color-coded for prayer request status
- **Priority Indicators:** Visual left border for announcement urgency

## 🚀 Key Features

### User-Friendly Navigation
- Clear visual hierarchy
- Emoji section headers for quick scanning
- Grouped related content
- Quick filters for common tasks

### Professional Design
- Calming color palette appropriate for church environment
- Consistent spacing and typography
- Smooth transitions and interactions
- Clean, uncluttered interface

### Task-Oriented Dashboard
- See what needs attention at a glance
- Quick access to most-used features
- Real-time statistics
- Helpful tips and guidance

## 📱 Accessing the Studio

**Development:** http://localhost:3000/studio
**Production:** https://your-domain.com/studio

## 🎯 Design Principles

1. **Professional but Warm:** Church-appropriate branding
2. **Clear Visual Hierarchy:** Easy to scan and navigate
3. **Task-Focused:** Common actions are one click away
4. **Recognizable Icons:** Visual cues for quick identification
5. **Consistent Color Scheme:** Blue and gold throughout
6. **Clean Interface:** No overwhelming elements
7. **Mobile-Friendly:** Works on tablets and phones
8. **Accessible:** Keyboard navigation and focus states

## 🔧 Technical Implementation

### Dependencies Added
- `@sanity/dashboard` - Dashboard widgets plugin
- `lucide-react` - Icon library (already installed)

### Files Modified
1. `sanity/sanity.config.ts` - Main configuration
2. `src/app/studio/[[...tool]]/page.tsx` - CSS import

### Files Created
1. `sanity/structure.ts` - Custom structure
2. `sanity/dashboard/index.tsx` - Dashboard layout
3. `sanity/dashboard/WelcomeWidget.tsx` - Welcome message
4. `sanity/dashboard/StatsWidget.tsx` - Statistics display
5. `sanity/dashboard/QuickLinksWidget.tsx` - Quick actions
6. `sanity/styles/studio.css` - Custom styling

## 🎨 Color Reference

| Element | Color | Usage |
|---------|-------|-------|
| Primary | #2563eb | Buttons, links, brand color |
| Accent | #eab308 | Highlights, warnings |
| Background | #fafaf9 | Main background |
| Text | #0f172a | Primary text |
| Muted | #64748b | Secondary text |
| Border | #e2e8f0 | Dividers, borders |

## 📊 Status Indicators

### Prayer Requests
- ⏳ **Pending:** Orange (#f59e0b)
- ✅ **Approved:** Green (#10b981)
- 📦 **Archived:** Gray (#6b7280)

### Announcements
- 🔴 **Urgent:** Red left border
- 🔵 **Normal:** Blue left border
- ⚪ **Low:** Gray left border

## 💡 Tips for Staff

1. **Check Dashboard First:** See pending tasks at a glance
2. **Use Quick Links:** Faster than navigating menus
3. **Filter Prayer Requests:** Use "Pending Review" for moderation
4. **Watch Priority Indicators:** Urgent items have visual cues
5. **Mobile Access:** Studio works on tablets for on-the-go updates

## 🔄 Future Enhancements

Potential additions for later:
- Custom field previews
- Bulk actions for prayer requests
- Calendar view for events
- Email notifications for pending items
- Custom document templates
- Multi-language support

## 📞 Support

For questions or customization requests, refer to:
- Sanity Documentation: https://www.sanity.io/docs
- Project Repository: [Your repo URL]

---

**Last Updated:** January 2025
**Studio Version:** Sanity Studio v3
**Framework:** Next.js 14 with App Router
