import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tour',
      title: 'Tour',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'client' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'media',
      title: 'Media',
      description: 'Drop all project images and videos here',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
        defineArrayMember({
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            defineField({
              name: 'file',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/*' },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            prepare() {
              return { title: 'Video' }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { role: 'role', name: 'name' },
            prepare({ role, name }) {
              return { title: `${role}: ${name}` }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      client: 'client',
      tour: 'tour',
      media: 'heroImage',
    },
    prepare({ client, tour, media }) {
      return {
        title: client,
        subtitle: tour,
        media,
      }
    },
  },
})
