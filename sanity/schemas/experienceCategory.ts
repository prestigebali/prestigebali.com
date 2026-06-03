import {defineType, defineField} from 'sanity'
import {Sparkles} from 'lucide-react'

export default defineType({
  name: 'experienceCategory',
  title: 'Experience Category',
  type: 'document',
  icon: Sparkles,
  fields: [
    defineField({
      name: 'title',
      title: 'Experience Category Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., "Sightseeing", "Adventure", "Romantic", "Wellness", etc.',
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
      title: 'Experience Description',
      type: 'text',
      rows: 3,
      description: 'What makes this experience unique? Who would enjoy it?',
    }),

    defineField({
      name: 'icon',
      title: 'Experience Icon/Image',
      type: 'image',
      description: 'Visual representation of this experience type',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first (0, 1, 2, etc.)',
    }),

    defineField({
      name: 'color',
      title: 'Experience Color (Hex)',
      type: 'string',
      initialValue: '#3B82F6',
      description: 'Hex color code for this experience badge (e.g., #FF6B6B, #4ECDC4)',
    }),

    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      description: 'Optional emoji to represent this experience (e.g., 🏖️, 🎭, 💑, 🧘)',
    }),

    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Who is this experience for? (e.g., Couples, Families, Solo Travelers)',
      options: {
        list: [
          { title: 'Couples', value: 'couples' },
          { title: 'Families', value: 'families' },
          { title: 'Solo Travelers', value: 'solo' },
          { title: 'Groups', value: 'groups' },
          { title: 'Corporate Teams', value: 'corporate' },
          { title: 'Adventure Seekers', value: 'adventure' },
          { title: 'Culture Enthusiasts', value: 'culture' },
          { title: 'Wellness Seekers', value: 'wellness' },
        ],
      },
    }),

    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable/disable this experience category',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'icon',
      emoji: 'emoji',
      active: 'isActive',
    },
    prepare({title, media, emoji, active}) {
      return {
        title: `${emoji || '✨'} ${title}`,
        subtitle: active ? 'Active' : 'Inactive',
        media: media,
      }
    },
  },
})
