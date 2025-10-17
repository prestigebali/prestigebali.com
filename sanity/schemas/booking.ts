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
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'tourPackage',
      title: 'Tour Package',
      type: 'reference',
      to: [{type: 'tourPackage'}],
      readOnly: true,
    }),
    defineField({
      name: 'bookingDate',
      title: 'Booking Date',
      type: 'datetime',
      readOnly: true,
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
