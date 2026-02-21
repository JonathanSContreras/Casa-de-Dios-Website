import { defineField, defineType } from 'sanity'
import { Heart } from 'lucide-react'

/**
 * Ministry Schema
 *
 * Manages church ministries with leader references.
 * Each ministry can have multiple leaders, each with an optional role override.
 *
 * Role Override: When a leader is added to a ministry, you can specify a
 * different role title for that ministry context. For example, someone who
 * is "Treasurer" church-wide might be "President" in the Women's Ministry.
 *
 * The 'isActive' field allows hiding ministries without deleting them.
 * Inactive ministries won't appear on the website but remain in the database.
 */
export default defineType({
  name: 'ministry',
  title: 'Ministries',
  type: 'document',
  icon: Heart,
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the ministry (e.g., "Youth Ministry", "Worship Team")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated URL-friendly identifier',
    }),
    defineField({
      name: 'nameEs',
      title: 'Ministry Name (Spanish)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Spanish name of the ministry',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      description: 'Description of what this ministry does and who it serves (English)',
    }),
    defineField({
      name: 'descriptionEs',
      title: 'Description (Spanish)',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      description: 'Spanish description of what this ministry does and who it serves',
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
      description: 'When this ministry meets (e.g., "Sundays at 9:00 AM")',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where this ministry meets (e.g., "Fellowship Hall", "Youth Room")',
    }),
    defineField({
      name: 'leaders',
      title: 'Ministry Leaders',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'leaderReference',
          fields: [
            defineField({
              name: 'person',
              title: 'Person',
              type: 'reference',
              to: [{ type: 'leadership' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'roleOverride',
              title: 'Role for This Ministry (English)',
              type: 'string',
              description:
                'Their title within this ministry in English (e.g., "President", "Director"). Leave blank to use their primary church role.',
            }),
            defineField({
              name: 'roleOverrideEs',
              title: 'Role for This Ministry (Spanish)',
              type: 'string',
              description:
                'Su título en este ministerio en español (ej. "Presidente", "Director"). Dejar en blanco para usar su rol principal.',
            }),
          ],
          preview: {
            select: {
              name: 'person.name',
              role: 'roleOverride',
              defaultRole: 'person.role',
              media: 'person.photo',
            },
            prepare(selection) {
              const { name, role, defaultRole } = selection as {
                name?: string
                role?: string
                defaultRole?: string
              }
              return {
                title: name || 'Select a person',
                subtitle: role || defaultRole || 'No role set',
              }
            },
          },
        },
      ],
      description:
        'Leaders for this ministry. You can customize their role title for this specific ministry.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Must be a valid email address'
        ),
      description: 'Contact email for this ministry (optional)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).integer(),
      description:
        'Order in which this ministry appears on the website (0 = first, 1 = second, etc.)',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description:
        'Inactive ministries are hidden from the website but remain in the database',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      meetingTime: 'meetingTime',
      leaders: 'leaders',
      isActive: 'isActive',
      order: 'order',
    },
    prepare(selection) {
      const { title, meetingTime, leaders, isActive, order } = selection as {
        title?: string
        meetingTime?: string
        leaders?: Array<{ person?: { name?: string } }>
        isActive?: boolean
        order?: number
      }
      const subtitle = []

      if (order !== undefined) {
        subtitle.push(`Order: ${order}`)
      }

      if (meetingTime) {
        subtitle.push(meetingTime)
      }

      if (leaders && leaders.length > 0) {
        const leaderCount = leaders.length
        subtitle.push(`${leaderCount} leader${leaderCount > 1 ? 's' : ''}`)
      }

      const statusBadge = isActive ? '' : ' (Inactive)'

      return {
        title: `${title || 'Untitled'}${statusBadge}`,
        subtitle: subtitle.join(' • '),
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
})
