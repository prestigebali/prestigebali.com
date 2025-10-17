import {defineType, defineField} from 'sanity'
import {Map as MapIcon} from 'lucide-react'

export default defineType({
  name: 'destination',
  title: 'Destinasi',
  type: 'document',
  icon: MapIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Destinasi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Gambar Unggulan',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
