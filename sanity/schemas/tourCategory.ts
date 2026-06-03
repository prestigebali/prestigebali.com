import {defineType, defineField} from 'sanity'
import {Layers} from 'lucide-react'

export default defineType({
  name: 'tourCategory',
  title: 'Tour Category',
  type: 'document',
  icon: Layers,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "Water Sports", "Cultural Tours", "Adventure", "Wellness"',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 3,
      description: 'Short description of what this category includes',
    }),

    defineField({
      name: 'icon',
      title: 'Category Icon Image',
      type: 'image',
      description: 'An image or icon representing this category',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first in category filter buttons',
    }),

    defineField({
      name: 'color',
      title: 'Category Color (Hex)',
      type: 'string',
      initialValue: '#3B82F6',
      description: 'Hex color code for category badge (e.g., #3B82F6)',
    }),

    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable/disable this category',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'icon',
      active: 'isActive',
    },
    prepare({title, media, active}) {
      return {
        title: title,
        subtitle: active ? 'Active' : 'Inactive',
        media: media,
      }
    },
  },
})
