import {defineType, defineField} from 'sanity'
import {Tag as TagIcon} from 'lucide-react'

export default defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tourPackage',
      title: 'Related Tour Package',
      type: 'reference',
      to: [{type: 'tourPackage'}],
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage (%)',
      type: 'number',
      description: 'Enter a number between 1 and 100.',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required().min(Rule.valueOf('startDate')),
    }),
    defineField({
      name: 'image',
      title: 'Promotion Image',
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
      subtitle: 'tourPackage.title',
      media: 'image',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({title, subtitle, media, startDate, endDate}) {
      const formattedDate = `Active: ${new Date(startDate).toLocaleDateString()} - ${new Date(
        endDate,
      ).toLocaleDateString()}`
      return {
        title: title,
        subtitle: `${subtitle || 'General Promo'} | ${formattedDate}`,
        media: media,
      }
    },
  },
})
