import { defineField, defineType } from 'sanity'
import { Calendar } from 'lucide-react'

/**
 * Event Schema
 * Manages church events including services, outreach, fellowship, and special gatherings
 */
export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: Calendar,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEs',
      title: 'Event Title (Spanish)',
      type: 'string',
      description: 'Spanish translation of the event title',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEs',
      title: 'Description (Spanish)',
      type: 'text',
      description: 'Spanish translation of the event description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location (English)',
      type: 'string',
    }),
    defineField({
      name: 'locationEs',
      title: 'Location (Spanish)',
      type: 'string',
      description: 'Spanish translation of the location (if different from English)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Outreach', value: 'Outreach' },
          { title: 'Youth', value: 'Youth' },
          { title: 'Worship', value: 'Worship' },
          { title: 'Prayer', value: 'Prayer' },
          { title: 'Fellowship', value: 'Fellowship' },
          { title: 'Bible Study', value: 'Bible Study' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    // Ministry reference removed for events-only setup
    // Uncomment when you add the ministry schema later:
    // defineField({
    //   name: 'ministry',
    //   title: 'Hosting Ministry',
    //   type: 'reference',
    //   to: [{ type: 'ministry' }],
    //   description: 'The ministry hosting or organizing this event',
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      startDate: 'startDate',
    },
    prepare({ title, subtitle, media, startDate }) {
      return {
        title,
        subtitle: `${subtitle} • ${startDate ? new Date(startDate).toLocaleDateString() : 'No date'}`,
        media,
      }
    },
  },
})
