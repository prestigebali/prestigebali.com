import {defineType, defineField} from 'sanity'
import {Users} from 'lucide-react'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  icon: Users,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'tourPackage',
      title: 'Tour Package',
      type: 'reference',
      to: [{type: 'tourPackage'}],
    }),
    defineField({
      name: 'bookingDate',
      title: 'Booking Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tourPackage.title',
      date: 'bookingDate',
    },
    prepare({title, subtitle, date}) {
      return {
        title: title,
        subtitle: `${subtitle} on ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})
