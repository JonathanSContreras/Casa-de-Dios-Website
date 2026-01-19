import { SanityImageSource } from '@sanity/image-url/lib/types/types'

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
  slug: {
    current: string
    _type: 'slug'
  }
  description: string
  startDate: string // ISO datetime string
  endDate?: string // ISO datetime string
  location?: string
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
  slug: string
  description: string
  startDate: Date
  endDate?: Date
  location?: string
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
  slug: {
    current: string
    _type: 'slug'
  }
  message: string
  priority: AnnouncementPriority
  publishDate: string // ISO datetime string
  expirationDate?: string // ISO datetime string
  link?: string
}

/**
 * Leadership Document Type
 * Represents a church leadership team member
 *
 * The 'order' field controls display order (lower numbers appear first)
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
  role: string
  bio?: string
  photo?: SanityImage
  email?: string
  order: number
}

/**
 * Ministry Document Type
 * Represents a church ministry
 *
 * Ministries can reference a leader from the leadership schema.
 * The 'isActive' field controls visibility (inactive ministries are hidden)
 */
export interface Ministry {
  _id: string
  _type: 'ministry'
  _createdAt: string
  _updatedAt: string
  name: string
  slug: {
    current: string
    _type: 'slug'
  }
  description: string
  meetingTime?: string
  location?: string
  contactEmail?: string
  isActive: boolean
  // Leader reference - can be a simple reference or populated
  leader?: {
    _ref: string
    _type: 'reference'
  }
}

/**
 * Ministry with Populated Leader
 * Used when fetching ministries with full leader data
 *
 * This is what you get when using the -> operator in GROQ queries
 * to populate the leader reference with actual leader data
 */
export interface MinistryWithLeader extends Omit<Ministry, 'leader'> {
  leader?: {
    _id: string
    name: string
    role: string
    photo?: SanityImage
    email?: string
  }
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
