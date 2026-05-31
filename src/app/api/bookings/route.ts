import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/src/lib/sanity-client'

// GET all bookings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') || '100'

    let query = `*[_type == "booking"]`

    if (status && status !== 'all') {
      query += `| select(bookingStatus == "${status}")`
    }

    query += `| order(createdAt desc) | [0...${limit}] {
      _id,
      bookingId,
      customerName,
      customerEmail,
      customerPhone,
      tourPackage->{title},
      checkInDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
      paymentStatus,
      paymentMethod,
      createdAt
    }`

    const bookings = await sanityClient.fetch(query)

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

// POST new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate unique booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const booking = {
      _type: 'booking',
      bookingId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      customerCountry: body.customerCountry,
      tourPackage: {
        _type: 'reference',
        _ref: body.tourPackageId,
      },
      numberOfGuests: body.numberOfGuests,
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      numberOfNights: body.numberOfNights,
      pricePerPerson: body.pricePerPerson,
      totalPrice: body.totalPrice,
      currency: body.currency || 'USD',
      bookingStatus: 'inquiry',
      paymentStatus: 'pending',
      source: body.source || 'website',
      utmSource: body.utmSource,
      utmCampaign: body.utmCampaign,
      utmMedium: body.utmMedium,
      specialRequests: body.specialRequests,
      createdAt: new Date().toISOString(),
    }

    const result = await sanityClient.create(booking)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
