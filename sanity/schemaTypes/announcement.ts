import { defineField, defineType } from 'sanity'
import { Bell } from 'lucide-react'

/**
 * Announcement Schema
 *
 * Manages church announcements with priority levels and auto-expiration.
 * Announcements can be set to automatically hide after a certain date.
 *
 * Priority levels:
 * - urgent: Important, time-sensitive announcements (red)
 * - normal: Standard announcements (blue)
 * - low: General information (gray)
 */
export default defineType({
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  icon: Bell,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Brief, attention-grabbing title for the announcement',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated URL-friendly identifier',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .warning('Keep messages concise for better readability'),
      description: 'The main announcement message (max 300 characters)',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: '🔴 Urgent', value: 'urgent' },
          { title: '🔵 Normal', value: 'normal' },
          { title: '⚪ Low', value: 'low' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
      validation: (Rule) => Rule.required(),
      description: 'Urgent announcements appear first with red styling',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
      description: 'When this announcement should become visible',
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'datetime',
      description: 'Optional: Announcement will automatically hide after this date',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
      description: 'Optional: Add a "Learn More" link for additional information',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      priority: 'priority',
      publishDate: 'publishDate',
      expirationDate: 'expirationDate',
    },
    prepare({ title, priority, publishDate, expirationDate }: { title: string; priority: string; publishDate: string; expirationDate?: string }) {
      // Format priority for display
      const priorityEmoji = {
        urgent: '🔴',
        normal: '🔵',
        low: '⚪',
      }[priority as 'urgent' | 'normal' | 'low'] || '🔵'

      // Format publish date
      const publishDateStr = publishDate
        ? new Date(publishDate).toLocaleDateString()
        : 'Not set'

      // Check if expired
      const isExpired = expirationDate && new Date(expirationDate) < new Date()
      const expirationNote = isExpired ? ' (Expired)' : ''

      return {
        title: `${priorityEmoji} ${title}${expirationNote}`,
        subtitle: `Published: ${publishDateStr}`,
      }
    },
  },
  // Sort announcements by priority (urgent first), then by publish date
  orderings: [
    {
      title: 'Priority, Newest First',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'asc' }, // urgent comes first alphabetically
        { field: 'publishDate', direction: 'desc' },
      ],
    },
    {
      title: 'Publish Date, Newest First',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
})
