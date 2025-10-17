import {defineType, defineField} from 'sanity'
import {Package as PackageIcon} from 'lucide-react'

export default defineType({
  name: 'tourPackage',
  title: 'Paket Tur',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Paket',
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
      title: 'Destinasi',
      type: 'reference',
      to: [{type: 'destination'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Paket',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Harga (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'duration',
      title: 'Durasi',
      type: 'string',
      description: "Contoh: '7 Hari' atau '3 Hari 2 Malam'",
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Nilai antara 1 dan 5',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 4.5,
    }),
    defineField({
      name: 'category',
      title: 'Kategori Pengalaman',
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
      title: 'Gambar Paket',
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
