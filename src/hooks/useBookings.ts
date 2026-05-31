import { useState, useCallback } from 'react'

interface BookingFilters {
  status?: string
  paymentStatus?: string
  startDate?: string
  endDate?: string
  limit?: number
}

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async (filters?: BookingFilters) => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      if (filters?.status) queryParams.append('status', filters.status)
      if (filters?.paymentStatus) queryParams.append('paymentStatus', filters.paymentStatus)
      if (filters?.limit) queryParams.append('limit', filters.limit.toString())

      const response = await fetch(`/api/bookings?${queryParams}`)

      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }

      const data = await response.json()
      setBookings(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createBooking = useCallback(async (bookingData: any) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const newBooking = await response.json()
      setBookings(prev => [newBooking, ...prev])
      return newBooking
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error creating booking:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
  }
}
