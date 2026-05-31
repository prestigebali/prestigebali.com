'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Users, DollarSign, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  customerCountry: z.string().min(2, 'Country is required'),
  tourPackageId: z.string().min(1, 'Please select a tour package'),
  numberOfGuests: z.number().min(1, 'At least 1 guest required'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().optional(),
  pricePerPerson: z.number().min(0),
  totalPrice: z.number().min(0),
  specialRequests: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

interface BookingFormProps {
  tourPackageId?: string
  tourPackageTitle?: string
  onSuccess?: () => void
}

export function BookingForm({ tourPackageId, tourPackageTitle, onSuccess }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerCountry: '',
      tourPackageId: tourPackageId || '',
      numberOfGuests: 1,
      pricePerPerson: 0,
      totalPrice: 0,
      specialRequests: '',
    },
  })

  const onSubmit = async (values: BookingFormValues) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Get UTM parameters
      const searchParams = new URLSearchParams(window.location.search)
      const utmSource = searchParams.get('utm_source') || undefined
      const utmCampaign = searchParams.get('utm_campaign') || undefined
      const utmMedium = searchParams.get('utm_medium') || undefined

      const bookingData = {
        ...values,
        source: 'website',
        utmSource,
        utmCampaign,
        utmMedium,
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      setSubmitSuccess(true)
      form.reset()

      // Redirect or callback
      if (onSuccess) {
        onSuccess()
      } else {
        setTimeout(() => {
          window.location.href = '/booking-confirmation'
        }, 2000)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setSubmitError(errorMessage)
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 text-4xl">✅</div>
          <h3 className="text-lg font-semibold text-green-900">Booking Submitted!</h3>
          <p className="text-green-700 mt-2">
            Thank you for your booking. We'll confirm your reservation shortly.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>Fill in your details to reserve your tour</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Personal Information</h3>

              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Booking Details</h3>

              {tourPackageTitle && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Selected Package</p>
                  <p className="font-semibold">{tourPackageTitle}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any special requirements or preferences..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Let us know if you have any special needs or preferences
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Complete Booking'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By booking, you agree to our terms and conditions. We'll send a confirmation email shortly.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
