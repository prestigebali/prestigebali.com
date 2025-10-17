import {defineType, defineField} from 'sanity'
import {Star} from 'lucide-react'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Handle (Optional)',
      type: 'string',
      description: 'e.g., @emilyc',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'A number between 1 and 5',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      media: 'avatar',
      rating: 'rating',
    },
    prepare({title, subtitle, media, rating}) {
      return {
        title: `${title} (${rating} ★)`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
