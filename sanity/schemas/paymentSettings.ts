import {defineType, defineField} from 'sanity'
import {CreditCard} from 'lucide-react'

export default defineType({
  name: 'paymentSettings',
  title: 'Payment Settings',
  type: 'document',
  icon: CreditCard,
  fields: [
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
