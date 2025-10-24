import {defineType, defineField} from 'sanity'
import {Package as PackageIcon} from 'lucide-react'

export default defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Package Name',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Package Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: "Example: '7 Days' or '3 Days 2 Nights'",
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'A number between 1 and 5',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 4.5,
    }),
    defineField({
      name: 'category',
      title: 'Experience Category',
      type: 'string',
      options: {
        list: [
          'Romantic Honeymoons',
          'Family Vacations',
          'Cultural Adventures',
          'Wellness Retreats',
          'Company Outings',
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'destination.name',
      media: 'image',
    },
  },
})
