import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Experience Title',
      type: 'string',
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
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
