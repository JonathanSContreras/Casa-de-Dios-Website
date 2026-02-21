import type { SanityImageSource } from '@sanity/image-url'

/**
 * TypeScript Types for Sanity Documents
 *
 * These types match the Sanity schema definitions and provide type safety
 * when working with Sanity data in your Next.js application.
 */

/**
 * Event Category Types
 */
export type EventCategory =
  | 'Outreach'
  | 'Youth'
  | 'Worship'
  | 'Prayer'
  | 'Fellowship'
  | 'Bible Study'

/**
 * Ministry Slug Types (for type-safe ministry identifiers)
 */
export type MinistrySlug =
  | 'mens-ministry'
  | 'womens-ministry'
  | 'youth-ministry'
  | 'kids-ministry'
  | 'street-evangelism'

/**
 * Announcement Priority Types
 */
export type AnnouncementPriority = 'urgent' | 'normal' | 'low'

/**
 * Prayer Request Status Types
 */
export type PrayerRequestStatus = 'pending' | 'approved' | 'archived'

/**
 * Sanity Image with metadata
 */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

/**
 * Event Document Type
 * Represents a church event from Sanity
 */
export interface Event {
  _id: string
  _type: 'event'
  _createdAt: string
  _updatedAt: string
  title: string
  titleEs: string // Spanish translation of title
  slug: {
    current: string
    _type: 'slug'
  }
  description: string
  descriptionEs: string // Spanish translation of description
  startDate: string // ISO datetime string
  endDate?: string // ISO datetime string
  location?: string
  locationEs?: string // Spanish translation of location
  category: EventCategory
  featuredImage?: SanityImage
  registrationLink?: string
  // ministry field removed for events-only setup
}

/**
 * Simplified Event type for display (after processing)
 */
export interface EventDisplay {
  id: string
  title: string
  titleEs: string
  slug: string
  description: string
  descriptionEs: string
  startDate: Date
  endDate?: Date
  location?: string
  locationEs?: string
  category: EventCategory
  featuredImage?: SanityImageSource
  registrationLink?: string
}

/**
 * Announcement Document Type
 * Represents a church announcement from Sanity
 *
 * Auto-expiration logic:
 * - Announcements are visible when publishDate <= now()
 * - If expirationDate is set, announcement hides when expirationDate < now()
 * - If expirationDate is null, announcement stays visible indefinitely
 */
export interface Announcement {
  _id: string
  _type: 'announcement'
  _createdAt: string
  _updatedAt: string
  title: string
  titleEs: string // Spanish translation of title
  slug: {
    current: string
    _type: 'slug'
  }
  message: string
  messageEs: string // Spanish translation of message
  dateLabel?: string // Optional date badge (e.g., "Starting Jan 28")
  dateLabelEs?: string // Spanish translation of date label
  priority: AnnouncementPriority
  publishDate: string // ISO datetime string
  expirationDate?: string // ISO datetime string
  link?: string
}

/**
 * Leadership Document Type
 * Represents a church leadership team member
 *
 * A leader can serve in multiple capacities:
 * - If showOnAboutPage is true, they appear on the About page with their primary 'role'
 * - They can be referenced by Ministry documents with an optional roleOverride
 * - A person can have BOTH (e.g., "Treasurer" on About page, "President" in Women's Ministry)
 *
 * The 'order' field controls display order on the About page (lower numbers appear first)
 */
export interface Leadership {
  _id: string
  _type: 'leadership'
  _createdAt: string
  _updatedAt: string
  name: string
  slug: {
    current: string
    _type: 'slug'
  }
  role?: string
  roleEs?: string // Spanish translation of role
  bio?: string
  bioEs?: string // Spanish translation of bio
  photo?: SanityImage
  email?: string
  showOnAboutPage: boolean
  order: number
}

/**
 * Leader Reference with Role Override
 * Used when a leader is referenced from a Ministry document
 *
 * The roleOverride allows displaying a different title for this ministry context.
 * If roleOverride is not set, the leader's primary 'role' should be displayed.
 */
export interface LeaderReference {
  person: Leadership
  roleOverride?: string
  roleOverrideEs?: string
}

/**
 * Ministry Document Type
 * Represents a church ministry with its leaders
 *
 * Each ministry can have multiple leaders, each with an optional roleOverride.
 * The 'isActive' field controls visibility (inactive ministries are hidden)
 * The 'order' field controls display order (lower numbers appear first)
 */
export interface Ministry {
  _id: string
  _type: 'ministry'
  _createdAt: string
  _updatedAt: string
  name: string
  nameEs?: string // Spanish translation of name
  slug: {
    current: string
    _type: 'slug'
  }
  description: string
  descriptionEs?: string // Spanish translation of description
  meetingTime?: string
  location?: string
  contactEmail?: string
  isActive: boolean
  order: number
  leaders?: LeaderReference[]
}

/**
 * Prayer Request Document Type
 * Represents a prayer request submission
 *
 * Privacy:
 * - contactEmail is PRIVATE and should never be exposed in public queries
 * - Only approved requests with isPublic=true should be shown publicly
 *
 * Moderation workflow:
 * 1. User submits request (status="pending", isPublic=false)
 * 2. Staff reviews in Studio
 * 3. Staff approves (status="approved") and toggles isPublic=true
 * 4. Request appears on public prayer page
 */
export interface PrayerRequest {
  _id: string
  _type: 'prayerRequest'
  _createdAt: string
  _updatedAt: string
  name?: string
  request: string
  contactEmail?: string // PRIVATE - never expose publicly
  submittedAt: string // ISO datetime string
  status: PrayerRequestStatus
  isPublic: boolean
}

/**
 * Public Prayer Request Type
 * Used for displaying approved prayer requests publicly
 * Excludes private fields like contactEmail
 */
export interface PublicPrayerRequest {
  _id: string
  name?: string
  request: string
  submittedAt: string
}
