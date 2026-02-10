import { defineType, defineField } from 'sanity'
import { Heart } from 'lucide-react'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Heart,
  fields: [
    defineField({
      name: 'title',
      title: 'Experience Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Heart (Honeymoons)', value: 'Heart' },
          { title: 'Users (Family)', value: 'Users' },
          { title: 'Mountain (Adventures)', value: 'Mountain' },
          { title: 'Waves (Retreats)', value: 'Waves' },
          { title: 'Building (Company)', value: 'Building' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Experience Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ This creates the "Add item" button to link many products
    defineField({
      name: 'relatedPackages',
      title: 'Related Tour Packages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tourPackages' }] }],
      description: 'Select which tour packages appear under this experience',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
