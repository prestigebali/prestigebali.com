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
      // MAIN NAV CATEGORY
      // =====================
      defineField({
        name: 'mainCategory',
        title: 'Main Category (Nav Menu)',
        type: 'string',
        description: 'Controls which nav dropdown this package appears under on the website.',
        validation: Rule => Rule.required(),
       options: {
  list: [
    { title: 'Day Tour', value: 'Day Tour' },
    { title: 'Holiday Package', value: 'Holiday Package' },
  ],
  layout: 'radio',
},
        },
      }),

      // =====================
      // EXPERIENCE CATEGORY (IMPORTANT)
      // =====================
      defineField({
        name: 'experienceCategory',
        title: 'Experience Category',
        type: 'string',
        validation: Rule => Rule.required(),
        options: {
          list: [
            {
              title: 'All-Inclusive Luxury Holiday Packages in Bali',
              value: 'all-inclusive-luxury-holiday',
            },
            {
              title: 'Luxury Private Transportation in Bali - Chauffeur & VIP Transfers',
              value: 'luxury-private-transportation',
            },
            {
              title: 'Private Luxury Tours & Signature Bali Experiences',
              value: 'private-luxury-tours',
            },
            {
              title: 'All-Inclusive Retreat Hosting Service in Bali',
              value: 'retreat-hosting',
            },
            {
              title: 'Luxury Honeymoons & Romantic Getaways in Bali',
              value: 'luxury-honeymoon',
            },
            {
              title: 'Luxury Villas & Private Stays',
              value: 'luxury-villas',
            },
            {
              title: 'Luxury Yacht Charters & Island Hopping (Bali, Komodo, Labuan Bajo)',
              value: 'luxury-yacht-charter',
            },
            {
              title: 'Luxury Team Building & Corporate Retreats in Bali',
              value: 'corporate-retreat',
            },
          ],
          layout: 'dropdown',
        },
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
        name: 'priceFrom',
        title: 'Price From',
        type: 'number',
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
      }),

      // =====================
      // MEDIA
      // =====================
      defineField({
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),

      defineField({
        name: 'gallery',
        title: 'Gallery',
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
        media: 'featuredImage',
      },
    },
  })
  
