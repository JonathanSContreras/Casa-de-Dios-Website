import { defineField, defineType } from 'sanity'
import { Users } from 'lucide-react'

/**
 * Leadership Schema
 *
 * Manages church leadership team members.
 * Can be referenced by ministries to show who leads each ministry.
 *
 * The 'order' field controls display order (lower numbers appear first)
 */
export default defineType({
  name: 'leadership',
  title: 'Leadership',
  type: 'document',
  icon: Users,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name of the leader',
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
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Senior Pastor", "Youth Director", "Worship Leader"',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      description: 'Brief biography or description of the leader',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Profile photo of the leader',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Must be a valid email address'
        ),
      description: 'Contact email (optional)',
    }),
    defineField({
      name: 'showOnAboutPage',
      title: 'Show on About Page',
      type: 'boolean',
      initialValue: false,
      description: 'Check this to show this person on the About page (for pastors, secretary, treasurer, etc.)',
    }),
    defineField({
      name: 'ministries',
      title: 'Ministry Roles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Men\'s Ministry', value: 'mens' },
          { title: 'Women\'s Ministry', value: 'womens' },
          { title: 'Youth Ministry', value: 'youth' },
          { title: 'Kids Ministry', value: 'kids' },
          { title: 'Street Evangelism', value: 'street-evangelism' },
        ],
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(5),
      description: 'Select which ministry(ies) this leader serves (optional, max 5). They will appear in the ministry sections on the Events page.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first within each ministry (0 = first, 1 = second, etc.)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      showOnAboutPage: 'showOnAboutPage',
      ministries: 'ministries',
      media: 'photo',
    },
    prepare({ title, role, showOnAboutPage, ministries }) {
      const ministryLabels = {
        'mens': 'Men\'s',
        'womens': 'Women\'s',
        'youth': 'Youth',
        'kids': 'Kids',
        'street-evangelism': 'Street Evangelism',
      }

      const badges = []

      if (showOnAboutPage) {
        badges.push('About Page')
      }

      if (ministries && ministries.length > 0) {
        const ministryNames = ministries.map((m: string) => ministryLabels[m as keyof typeof ministryLabels]).join(', ')
        badges.push(ministryNames)
      }

      const subtitle = badges.length > 0 ? `${role} • ${badges.join(' • ')}` : role

      return {
        title,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
