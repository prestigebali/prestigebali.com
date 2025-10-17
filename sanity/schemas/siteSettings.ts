import {defineType, defineField} from 'sanity'
import {Settings} from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Contact Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Company Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
      description: 'e.g., Bank Central Asia (BCA)',
    }),
    defineField({
      name: 'bankAccountHolder',
      title: 'Bank Account Holder',
      type: 'string',
      description: 'The name of the account holder, e.g., PT. PRESTIGE BALI',
    }),
    defineField({
      name: 'bankAccountNumber',
      title: 'Bank Account Number',
      type: 'string',
      description: 'The bank account number.',
    }),
    defineField({
      name: 'paypalEmail',
      title: 'PayPal Email',
      type: 'email',
      description: 'The email address for PayPal payments.',
    }),
  ],
})
