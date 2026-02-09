import {defineType, defineField} from 'sanity'
import {Info} from 'lucide-react'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: Info,
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'The main title on the about page hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      description: 'The supporting text below the headline.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentSubtitle',
      title: 'Content Subtitle',
      type: 'string',
      description: 'The small text above the main content title (e.g., "Welcome to Prestige Bali").',
    }),
    defineField({
      name: 'contentTitle',
      title: 'Content Title',
      type: 'string',
      description: 'The main title of the content section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBody',
      title: 'Content Body',
      type: 'blockContent',
      description: 'The main content/paragraphs for the about page.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadline',
    },
    prepare({title}) {
      return {
        title: 'About Page Settings',
        subtitle: title,
      }
    },
  },
})
