import { defineField, defineType } from 'sanity'
import { Heart } from 'lucide-react'

/**
 * Ministry Schema
 *
 * Manages church ministries with leader references.
 * Each ministry can reference a leader from the leadership schema.
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      description: 'Description of what this ministry does and who it serves',
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
      name: 'leader',
      title: 'Ministry Leader',
      type: 'reference',
      to: [{ type: 'leadership' }],
      description:
        'The person leading this ministry (reference to a leadership member)',
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
      leaderName: 'leader.name',
      leaderRole: 'leader.role',
      isActive: 'isActive',
    },
    prepare({ title, meetingTime, leaderName, isActive }) {
      const subtitle = []

      if (meetingTime) {
        subtitle.push(meetingTime)
      }

      if (leaderName) {
        subtitle.push(`Led by ${leaderName}`)
      }

      const statusBadge = isActive ? '' : ' (Inactive)'

      return {
        title: `${title}${statusBadge}`,
        subtitle: subtitle.join(' • '),
      }
    },
  },
  orderings: [
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
