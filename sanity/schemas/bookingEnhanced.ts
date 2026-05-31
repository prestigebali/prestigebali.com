import {defineType, defineField} from 'sanity'
import {Users, Calendar, MapPin, DollarSign, CheckCircle2, Clock} from 'lucide-react'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  icon: Users,
  fields: [
    // =====================
    // BOOKING REFERENCE
    // =====================
    defineField({
      name: 'bookingId',
      title: 'Booking ID',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Unique booking identifier (auto-generated)',
    }),

    // =====================
    // CUSTOMER INFO
    // =====================
    defineField({
      name: 'customerName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'customerEmail',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),

    defineField({
      name: 'customerPhone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'customerCountry',
      title: 'Country',
      type: 'string',
    }),

    defineField({
      name: 'specialRequests',
      title: 'Special Requests',
      type: 'text',
      rows: 3,
    }),

    // =====================
    // BOOKING DETAILS
    // =====================
    defineField({
      name: 'tourPackage',
      title: 'Tour Package',
      type: 'reference',
      to: [{type: 'tourPackage'}],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),

    defineField({
      name: 'checkInDate',
      title: 'Check-in Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'checkOutDate',
      title: 'Check-out Date',
      type: 'datetime',
    }),

    defineField({
      name: 'numberOfNights',
      title: 'Number of Nights',
      type: 'number',
    }),

    // =====================
    // PRICING
    // =====================
    defineField({
      name: 'pricePerPerson',
      title: 'Price Per Person',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),

    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
          { title: 'IDR', value: 'IDR' },
          { title: 'AUD', value: 'AUD' },
        ],
      },
    }),

    defineField({
      name: 'discountApplied',
      title: 'Discount Applied',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'depositPaid',
      title: 'Deposit Paid',
      type: 'number',
      initialValue: 0,
    }),

    // =====================
    // PAYMENT & STATUS
    // =====================
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Deposit Received', value: 'deposit_received' },
          { title: 'Partially Paid', value: 'partially_paid' },
          { title: 'Fully Paid', value: 'fully_paid' },
          { title: 'Refund Requested', value: 'refund_requested' },
          { title: 'Refunded', value: 'refunded' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'pending',
    }),

    defineField({
      name: 'bookingStatus',
      title: 'Booking Status',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Inquiry', value: 'inquiry' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'No Show', value: 'no_show' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'inquiry',
    }),

    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Credit Card', value: 'credit_card' },
          { title: 'Bank Transfer', value: 'bank_transfer' },
          { title: 'PayPal', value: 'paypal' },
          { title: 'Stripe', value: 'stripe' },
          { title: 'On Site', value: 'on_site' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),

    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
    }),

    // =====================
    // ACCOMMODATION
    // =====================
    defineField({
      name: 'accommodationType',
      title: 'Accommodation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hotel', value: 'hotel' },
          { title: 'Resort', value: 'resort' },
          { title: 'Villa', value: 'villa' },
          { title: 'Boutique Hotel', value: 'boutique' },
          { title: 'Hostel', value: 'hostel' },
        ],
      },
    }),

    defineField({
      name: 'accommodationName',
      title: 'Accommodation Name',
      type: 'string',
    }),

    defineField({
      name: 'roomType',
      title: 'Room Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single', value: 'single' },
          { title: 'Double', value: 'double' },
          { title: 'Twin', value: 'twin' },
          { title: 'Suite', value: 'suite' },
          { title: 'Deluxe', value: 'deluxe' },
        ],
      },
    }),

    // =====================
    // ADD-ON SERVICES
    // =====================
    defineField({
      name: 'addOnServices',
      title: 'Add-on Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'serviceName',
              title: 'Service Name',
              type: 'string',
            },
            {
              name: 'servicePrice',
              title: 'Service Price',
              type: 'number',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
          ],
        },
      ],
    }),

    // =====================
    // NOTES & CANCELLATION
    // =====================
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'cancelationReason',
      title: 'Cancellation Reason',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'canceledAt',
      title: 'Cancelled Date',
      type: 'datetime',
    }),

    // =====================
    // TIMESTAMPS
    // =====================
    defineField({
      name: 'createdAt',
      title: 'Booking Created',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'confirmedAt',
      title: 'Booking Confirmed',
      type: 'datetime',
    }),

    defineField({
      name: 'completedAt',
      title: 'Booking Completed',
      type: 'datetime',
    }),

    // =====================
    // TRACKING & UTM
    // =====================
    defineField({
      name: 'source',
      title: 'Booking Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Agency', value: 'agency' },
          { title: 'Partner', value: 'partner' },
        ],
      },
    }),

    defineField({
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
    }),

    defineField({
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
    }),

    defineField({
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'customerName',
      subtitle: 'tourPackage.title',
      media: 'tourPackage.image',
      status: 'bookingStatus',
      paymentStatus: 'paymentStatus',
    },
    prepare({title, subtitle, media, status, paymentStatus}) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `Status: ${status} | Payment: ${paymentStatus}`,
        media,
      }
    },
  },
})
