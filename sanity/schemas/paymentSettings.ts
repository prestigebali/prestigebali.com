import {defineType, defineField} from 'sanity'
import {CreditCard} from 'lucide-react'

export default defineType({
  name: 'paymentSettings',
  title: 'Payment Settings',
  type: 'document',
  icon: CreditCard,
  fields: [
    defineField({
      name: 'paypalEmail',
      title: 'PayPal Email',
      type: 'string',
      description: 'The email address for PayPal payments.',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'paypalLink',
      title: 'PayPal.me Link',
      type: 'string',
      description: 'The PayPal.me link for direct payments (e.g., https://paypal.me/prestigebali).',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Payment Settings',
      }
    },
  },
})
