import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  fields: [

    // =====================
    // BASIC INFO
    // =====================
    defineField({
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: Rule => Rule.required(),
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // =====================
    // MAIN CATEGORY - FOR DAY TOURS VS HOLIDAY PACKAGES
    // =====================
    defineField({
      name: 'mainCategory',
      title: 'Package Type',
      type: 'string',
      description: 'Choose: Day Tour or Holiday Package',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Day Tour', value: 'Day Tour' },
          { title: 'Holiday Package', value: 'Holiday Package' },
        ],
        layout: 'radio',
      },
    }),

    // =====================
    // EXPERIENCE CATEGORY
    // =====================
    defineField({
      name: 'category',
      title: 'Experience Category',
      type: 'string',
      description: 'Example: Cultural Adventures, Beach Escapes, etc.',
    }),

    // =====================
    // DESTINATION
    // =====================
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
      description: 'Select the destination for this tour',
    }),

    // =====================
    // PACKAGE DETAILS
    // =====================
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Example: Full Day, 5 Days 4 Nights',
    }),

    defineField({
      name: 'price',
      title: 'Price From',
      type: 'number',
      description: 'Starting price for this package',
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
    }),

    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'What\'s included in this package',
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
    }),

    // =====================
    // MEDIA
    // =====================
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),

    // =====================
    // STATUS
    // =====================
    defineField({
      name: 'isActive',
      title: 'Active / Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'mainCategory',
      media: 'image',
    },
  },
})
