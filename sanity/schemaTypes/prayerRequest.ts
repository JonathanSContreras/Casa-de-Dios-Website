import { defineField, defineType } from 'sanity'
import { Heart } from 'lucide-react'

/**
 * Prayer Request Schema
 *
 * Handles public prayer request submissions with moderation workflow.
 * Submissions start as "pending" and must be approved by staff before appearing publicly.
 *
 * Privacy:
 * - contactEmail is PRIVATE and never shown in previews or public queries
 * - Submissions can be anonymous (name is optional)
 *
 * Workflow:
 * 1. User submits prayer request via public form
 * 2. Request is created with status="pending" and isPublic=false
 * 3. Church staff reviews and moderates in Studio
 * 4. Staff approves and sets isPublic=true
 * 5. Approved requests appear on public prayer page
 */
export default defineType({
  name: 'prayerRequest',
  title: 'Prayer Requests',
  type: 'document',
  icon: Heart,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Submitter name (optional - can be anonymous)',
    }),
    defineField({
      name: 'request',
      title: 'Prayer Request',
      type: 'text',
      rows: 6,
      validation: (Rule) =>
        Rule.required()
          .max(500)
          .error('Prayer request must be under 500 characters'),
      description: 'The actual prayer request content',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description:
        '⚠️ PRIVATE - Never shown publicly. Only for staff follow-up.',
      validation: (Rule) =>
        Rule.email().warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
      validation: (Rule) => Rule.required(),
      description: 'Automatically set when request is submitted',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending Review', value: 'pending' },
          { title: '✅ Approved', value: 'approved' },
          { title: '📦 Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
      description: 'Moderation status - only approved requests can be made public',
    }),
    defineField({
      name: 'isPublic',
      title: 'Show Publicly',
      type: 'boolean',
      initialValue: false,
      description:
        'Toggle to show/hide this prayer request on the public prayer page',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      request: 'request',
      status: 'status',
      submittedAt: 'submittedAt',
      isPublic: 'isPublic',
    },
    prepare({
      name,
      request,
      status,
      submittedAt,
      isPublic
    }: {
      name?: string
      request?: string
      status?: 'pending' | 'approved' | 'archived'
      submittedAt?: string
      isPublic?: boolean
    }) {
      // Format status emoji
      const statusEmoji: Record<string, string> = {
        pending: '⏳',
        approved: '✅',
        archived: '📦',
      }
      const emoji = status ? statusEmoji[status] ?? '⏳' : '⏳'

      // Display name or "Anonymous"
      const displayName = name ?? 'Anonymous'

      // Format submitted date
      const submittedDateStr = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : 'Unknown date'

      // Truncate request for preview
      const truncatedRequest =
        request && request.length > 60
          ? request.substring(0, 60) + '...'
          : request ?? 'No content'

      // Public indicator
      const publicIndicator = isPublic ? ' 🌐' : ''

      return {
        title: `${emoji} ${displayName}${publicIndicator}`,
        subtitle: `${submittedDateStr} - ${truncatedRequest}`,
      }
    },
  },
  // Sort by submission date, newest first
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' },
      ],
    },
  ],
})
