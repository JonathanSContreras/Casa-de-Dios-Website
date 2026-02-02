import { defineField, defineType } from 'sanity'
import { Users } from 'lucide-react'

/**
 * Leadership Schema
 *
 * Manages church leadership team members.
 * Leaders can appear on the About page (showOnAboutPage=true) and/or
 * be referenced by ministries with optional role overrides.
 *
 * The 'role' field is their primary church role (e.g., "Treasurer").
 * When referenced from a ministry, a roleOverride can display a different title.
 *
 * The 'order' field controls display order on the About page (lower numbers first).
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
      title: 'Primary Church Role',
      type: 'string',
      description: 'Their main church role (e.g., "Senior Pastor", "Treasurer"). This is shown on the About page. Leave blank if they only serve in ministry-specific roles.',
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
      description: 'Check this to display this person under Church Leadership on the About page.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Display order on the About page (lower numbers appear first: 0 = first, 1 = second, etc.).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      showOnAboutPage: 'showOnAboutPage',
      media: 'photo',
    },
    prepare({ title, role, showOnAboutPage }) {
      const subtitle = showOnAboutPage ? `${role} • About Page` : role

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
