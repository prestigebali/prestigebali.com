import {defineType, defineField} from 'sanity'
import {Presentation} from 'lucide-react'

export default defineType({
  name: 'heroSettings',
  title: 'Hero Settings',
  type: 'document',
  icon: Presentation,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main title on the hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'The supporting text below the headline.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'The text displayed on the call-to-action button.',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'The URL the button links to (e.g., /packages).',
    }),
    defineField({
        name: 'backgroundType',
        title: 'Background Type',
        type: 'string',
        options: {
            list: ['Image', 'Video'],
            layout: 'radio',
        },
        initialValue: 'Image',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload or select an image for the background.',
      hidden: ({document}) => document?.backgroundType !== 'Image',
    }),
     defineField({
      name: 'imageBrightness',
      title: 'Image Brightness',
      type: 'string',
      options: {
        list: [
          {title: 'Normal (100%)', value: 'brightness-100'},
          {title: 'Dim (75%)', value: 'brightness-75'},
          {title: 'Dark (50%)', value: 'brightness-50'},
        ],
        layout: 'radio',
      },
      initialValue: 'brightness-75',
      description: 'Adjust the brightness of the background image to ensure text is readable.',
      hidden: ({document}) => document?.backgroundType !== 'Image',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video File',
      type: 'file',
      options: {
        accept: 'video/mp4'
      },
      description: 'Upload a video file (e.g., MP4). This has priority over a URL if both are provided.',
      hidden: ({document}) => document?.backgroundType !== 'Video',
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video URL',
      type: 'url',
      description: 'Or, provide a URL to a video file (e.g., from a CDN).',
      hidden: ({document}) => document?.backgroundType !== 'Video',
    }),
     defineField({
      name: 'youtubeVideoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Or, paste a YouTube video URL to embed it as the background.',
      hidden: ({document}) => document?.backgroundType !== 'Video',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: 'Hero Section Settings',
        subtitle: title,
        media: media || Presentation,
      }
    },
  },
})
