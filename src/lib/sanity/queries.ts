import { client } from './client'
import type {
  Announcement,
  Event,
  Leadership,
  Ministry,
  PublicPrayerRequest,
} from './types'

/**
 * Sanity GROQ Queries for Events
 *
 * These functions fetch event data from Sanity using GROQ queries.
 * All queries are optimized and return only the fields we need.
 */

/**
 * Common event fields projection
 * Used across multiple queries to keep them consistent
 */
const eventFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  titleEs,
  slug,
  description,
  descriptionEs,
  startDate,
  endDate,
  location,
  locationEs,
  category,
  featuredImage{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  registrationLink
`

/**
 * Get all upcoming events (events with startDate >= today)
 * Ordered by startDate ascending (soonest first)
 *
 * @returns Array of upcoming events
 *
 * @example
 * ```tsx
 * const events = await getUpcomingEvents()
 * ```
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const today = new Date().toISOString()

  const query = `*[_type == "event" && startDate >= $today] | order(startDate asc) {
    ${eventFields}
  }`

  return client.fetch(query, { today })
}

/**
 * Get all events (past and future)
 * Ordered by startDate descending (most recent first)
 *
 * @returns Array of all events
 *
 * @example
 * ```tsx
 * const events = await getAllEvents()
 * ```
 */
export async function getAllEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(startDate desc) {
    ${eventFields}
  }`

  return client.fetch(query)
}

/**
 * Get a single event by its slug
 *
 * @param slug - The event slug
 * @returns Single event or null if not found
 *
 * @example
 * ```tsx
 * const event = await getEventBySlug('christmas-service')
 * ```
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    ${eventFields}
  }`

  return client.fetch(query, { slug })
}

/**
 * Get events by category
 *
 * @param category - The event category
 * @returns Array of events in the specified category
 *
 * @example
 * ```tsx
 * const events = await getEventsByCategory('Worship')
 * ```
 */
export async function getEventsByCategory(
  category: string
): Promise<Event[]> {
  const query = `*[_type == "event" && category == $category] | order(startDate asc) {
    ${eventFields}
  }`

  return client.fetch(query, { category })
}

/**
 * Get recent past events (for archive/history)
 * Gets events from the past, limited to the specified count
 *
 * @param limit - Maximum number of events to return (default: 10)
 * @returns Array of past events
 *
 * @example
 * ```tsx
 * const pastEvents = await getPastEvents(5)
 * ```
 */
export async function getPastEvents(limit: number = 10): Promise<Event[]> {
  const today = new Date().toISOString()

  const query = `*[_type == "event" && startDate < $today] | order(startDate desc)[0...$limit] {
    ${eventFields}
  }`

  return client.fetch(query, { today, limit })
}

/**
 * Get featured/highlighted events
 * Returns upcoming events limited to a specific count (useful for homepage)
 *
 * @param limit - Maximum number of events to return (default: 3)
 * @returns Array of upcoming events
 *
 * @example
 * ```tsx
 * const featuredEvents = await getFeaturedEvents(3)
 * ```
 */
export async function getFeaturedEvents(limit: number = 3): Promise<Event[]> {
  const today = new Date().toISOString()

  const query = `*[_type == "event" && startDate >= $today] | order(startDate asc)[0...$limit] {
    ${eventFields}
  }`

  return client.fetch(query, { today, limit })
}

/**
 * ============================================================================
 * ANNOUNCEMENT QUERIES
 * ============================================================================
 */

/**
 * Common announcement fields projection
 * Used across announcement queries to keep them consistent
 */
const announcementFields = `
  _id,
  _type,
  title,
  titleEs,
  message,
  messageEs,
  dateLabel,
  dateLabelEs,
  priority,
  link,
  publishDate,
  expirationDate,
  slug
`

/**
 * Get active announcements
 *
 * Returns announcements that are currently active based on:
 * 1. publishDate <= now (announcement has been published)
 * 2. AND (expirationDate > now OR expirationDate is null)
 *    - If expiration date is set, announcement must not be expired
 *    - If no expiration date, announcement stays visible indefinitely
 *
 * Results are ordered by:
 * 1. Priority (urgent first, then normal, then low)
 * 2. Publish date (newest first within each priority level)
 *
 * @returns Array of active announcements
 *
 * @example
 * ```tsx
 * const announcements = await getActiveAnnouncements()
 * // Returns: [
 * //   { title: "Urgent Notice", priority: "urgent", ... },
 * //   { title: "New Service Time", priority: "normal", ... },
 * //   { title: "Newsletter", priority: "low", ... }
 * // ]
 * ```
 */
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const now = new Date().toISOString()

  const query = `*[
    _type == "announcement"
    && publishDate <= $now
    && (expirationDate > $now || expirationDate == null)
  ] | order(priority asc, publishDate desc) {
    ${announcementFields}
  }`

  return client.fetch(query, { now })
}

/**
 * Get all announcements (for admin/management views)
 * Ordered by publish date, newest first
 *
 * @returns Array of all announcements
 *
 * @example
 * ```tsx
 * const allAnnouncements = await getAllAnnouncements()
 * ```
 */
export async function getAllAnnouncements(): Promise<Announcement[]> {
  const query = `*[_type == "announcement"] | order(publishDate desc) {
    ${announcementFields}
  }`

  return client.fetch(query)
}

/**
 * Get a single announcement by slug
 *
 * @param slug - The announcement slug
 * @returns Single announcement or null if not found
 *
 * @example
 * ```tsx
 * const announcement = await getAnnouncementBySlug('church-closure')
 * ```
 */
export async function getAnnouncementBySlug(
  slug: string
): Promise<Announcement | null> {
  const query = `*[_type == "announcement" && slug.current == $slug][0] {
    ${announcementFields}
  }`

  return client.fetch(query, { slug })
}

/**
 * ============================================================================
 * LEADERSHIP QUERIES
 * ============================================================================
 */

/**
 * Common leadership fields projection
 * Used across leadership queries to keep them consistent
 */
const leadershipFields = `
  _id,
  _type,
  name,
  role,
  bio,
  photo{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  email,
  showOnAboutPage,
  order,
  slug
`

/**
 * Get all leadership members
 *
 * Returns all leadership team members ordered by the 'order' field.
 * Lower order numbers appear first (0 = first, 1 = second, etc.)
 *
 * @returns Array of leadership members
 *
 * @example
 * ```tsx
 * const leadership = await getLeadership()
 * // Returns: [
 * //   { name: "John Doe", role: "Senior Pastor", order: 0, ... },
 * //   { name: "Jane Smith", role: "Youth Director", order: 1, ... },
 * // ]
 * ```
 */
export async function getLeadership(): Promise<Leadership[]> {
  const query = `*[_type == "leadership"] | order(order asc) {
    ${leadershipFields}
  }`

  return client.fetch(query)
}

/**
 * Get church leadership (for About page)
 *
 * Returns leaders with showOnAboutPage=true (pastors, secretary, treasurer, etc.)
 * ordered by the 'order' field. These are the leaders that appear on the About page.
 *
 * @returns Array of church leadership members
 *
 * @example
 * ```tsx
 * const churchLeadership = await getChurchLeadership()
 * // Returns: [
 * //   { name: "John Doe", role: "Senior Pastor", showOnAboutPage: true, order: 0, ... },
 * //   { name: "Jane Smith", role: "Church Secretary", showOnAboutPage: true, ministries: ["womens"], order: 1, ... },
 * // ]
 * ```
 */
export async function getChurchLeadership(): Promise<Leadership[]> {
  const query = `*[_type == "leadership" && showOnAboutPage == true] | order(order asc) {
    ${leadershipFields}
  }`

  return client.fetch(query)
}

/**
 * Get a single leadership member by slug
 *
 * @param slug - The leadership member's slug
 * @returns Single leadership member or null if not found
 *
 * @example
 * ```tsx
 * const leader = await getLeadershipBySlug('john-doe')
 * ```
 */
export async function getLeadershipBySlug(
  slug: string
): Promise<Leadership | null> {
  const query = `*[_type == "leadership" && slug.current == $slug][0] {
    ${leadershipFields}
  }`

  return client.fetch(query, { slug })
}

/**
 * ============================================================================
 * MINISTRY QUERIES
 * ============================================================================
 */

/**
 * Common ministry fields projection with populated leaders
 * Used across ministry queries to keep them consistent
 *
 * The leaders array uses the -> operator to populate (dereference) each person reference.
 * Each leader includes their roleOverride (if set) and full person data.
 */
const ministryFields = `
  _id,
  _type,
  name,
  nameEs,
  description,
  descriptionEs,
  meetingTime,
  location,
  contactEmail,
  slug,
  isActive,
  order,
  leaders[]{
    roleOverride,
    roleOverrideEs,
    person->{
      _id,
      name,
      role,
      roleEs,
      photo{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      email
    }
  }
`

/**
 * Get active ministries
 *
 * Returns only ministries where isActive = true, ordered by the 'order' field.
 * Lower order numbers appear first (0 = first, 1 = second, etc.)
 * Falls back to alphabetical by name if order values are the same.
 * Each ministry includes its leaders array with roleOverride and full person data.
 *
 * @returns Array of active ministries with populated leaders
 *
 * @example
 * ```tsx
 * const ministries = await getActiveMinistries()
 * // Returns: [
 * //   {
 * //     name: "Sunday School",
 * //     order: 0,
 * //     leaders: [
 * //       { roleOverride: "Director", person: { name: "Jane Smith", role: "Treasurer", ... } },
 * //     ],
 * //     ...
 * //   },
 * // ]
 * ```
 */
export async function getActiveMinistries(): Promise<Ministry[]> {
  const query = `*[_type == "ministry" && isActive == true] | order(order asc, name asc) {
    ${ministryFields}
  }`

  return client.fetch(query)
}

/**
 * Get all ministries (for admin/management views)
 *
 * Returns all ministries regardless of active status, ordered by the 'order' field.
 * Falls back to alphabetical by name if order values are the same.
 * Useful for admin views where you want to see inactive ministries too.
 *
 * @returns Array of all ministries with populated leaders
 *
 * @example
 * ```tsx
 * const allMinistries = await getAllMinistries()
 * ```
 */
export async function getAllMinistries(): Promise<Ministry[]> {
  const query = `*[_type == "ministry"] | order(order asc, name asc) {
    ${ministryFields}
  }`

  return client.fetch(query)
}

/**
 * Get a single ministry by slug
 *
 * @param slug - The ministry slug
 * @returns Single ministry with populated leaders or null if not found
 *
 * @example
 * ```tsx
 * const ministry = await getMinistryBySlug('youth-ministry')
 * ```
 */
export async function getMinistryBySlug(
  slug: string
): Promise<Ministry | null> {
  const query = `*[_type == "ministry" && slug.current == $slug][0] {
    ${ministryFields}
  }`

  return client.fetch(query, { slug })
}

/**
 * ============================================================================
 * PRAYER REQUEST QUERIES
 * ============================================================================
 */

/**
 * Common prayer request fields projection (PUBLIC ONLY)
 * IMPORTANT: Never include contactEmail in public queries for privacy
 */
const publicPrayerRequestFields = `
  _id,
  name,
  request,
  submittedAt
`

/**
 * Get approved public prayer requests
 *
 * Returns prayer requests that are:
 * 1. status = "approved" (moderated by staff)
 * 2. AND isPublic = true (explicitly marked for public display)
 *
 * Results are ordered by submission date (newest first) and limited.
 *
 * PRIVACY: contactEmail is intentionally excluded from public queries.
 * Only church staff can see contact emails in the Sanity Studio.
 *
 * @param limit - Maximum number of requests to return (default: 20)
 * @returns Array of approved public prayer requests
 *
 * @example
 * ```tsx
 * const prayerRequests = await getApprovedPrayerRequests(10)
 * // Returns: [
 * //   { _id: "...", name: "John Doe", request: "Please pray for...", submittedAt: "2026-01-18..." },
 * //   { _id: "...", name: null, request: "Anonymous prayer request...", submittedAt: "2026-01-17..." },
 * // ]
 * ```
 */
export async function getApprovedPrayerRequests(
  limit = 20
): Promise<PublicPrayerRequest[]> {
  const query = `*[
    _type == "prayerRequest"
    && status == "approved"
    && isPublic == true
  ] | order(submittedAt desc)[0...$limit] {
    ${publicPrayerRequestFields}
  }`

  return client.fetch(query, { limit })
}

/**
 * Get recent approved prayer requests (for homepage/featured section)
 *
 * Returns a small number of recent prayer requests for display on the homepage.
 * Same filtering as getApprovedPrayerRequests but with a smaller default limit.
 *
 * @param limit - Maximum number of requests to return (default: 5)
 * @returns Array of recent approved public prayer requests
 *
 * @example
 * ```tsx
 * const recentRequests = await getRecentPrayerRequests(3)
 * ```
 */
export async function getRecentPrayerRequests(
  limit = 5
): Promise<PublicPrayerRequest[]> {
  return getApprovedPrayerRequests(limit)
}
