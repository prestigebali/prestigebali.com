'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  Search,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface BookingStats {
  totalBookings: number
  totalRevenue: number
  confirmedBookings: number
  pendingPayments: number
  cancellations: number
  averageBookingValue: number
}

interface BookingData {
  id: string
  customerName: string
  customerEmail: string
  tourPackage: string
  checkInDate: string
  numberOfGuests: number
  totalPrice: number
  bookingStatus: string
  paymentStatus: string
  paymentMethod: string
}

export function BookingDashboard() {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    totalRevenue: 0,
    confirmedBookings: 0,
    pendingPayments: 0,
    cancellations: 0,
    averageBookingValue: 0,
  })
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Monthly revenue data (example)
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4000, bookings: 24 },
    { month: 'Feb', revenue: 3000, bookings: 20 },
    { month: 'Mar', revenue: 2000, bookings: 22 },
    { month: 'Apr', revenue: 2780, bookings: 29 },
    { month: 'May', revenue: 1890, bookings: 20 },
    { month: 'Jun', revenue: 2390, bookings: 22 },
  ]

  // Booking status distribution
  const bookingStatusData = [
    { name: 'Confirmed', value: 45 },
    { name: 'Pending', value: 30 },
    { name: 'Completed', value: 20 },
    { name: 'Cancelled', value: 5 },
  ]

  // Payment status distribution
  const paymentStatusData = [
    { name: 'Fully Paid', value: 50 },
    { name: 'Partially Paid', value: 30 },
    { name: 'Pending', value: 15 },
    { name: 'Refunded', value: 5 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setBookings(data)
      calculateStats(data)
      filterBookings(data, searchTerm, statusFilter)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const calculateStats = (data: BookingData[]) => {
    const totalRevenue = data.reduce((sum, b) => sum + b.totalPrice, 0)
    const confirmedBookings = data.filter(b => b.bookingStatus === 'confirmed').length
    const pendingPayments = data.filter(b => b.paymentStatus === 'pending').length
    const cancellations = data.filter(b => b.bookingStatus === 'cancelled').length

    setStats({
      totalBookings: data.length,
      totalRevenue,
      confirmedBookings,
      pendingPayments,
      cancellations,
      averageBookingValue: totalRevenue / (data.length || 1),
    })
  }

  // Filter bookings
  const filterBookings = (data: BookingData[], search: string, status: string) => {
    let filtered = data

    if (search) {
      filtered = filtered.filter(
        b =>
          b.customerName.toLowerCase().includes(search.toLowerCase()) ||
          b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
          b.tourPackage.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(b => b.bookingStatus === status)
    }

    setFilteredBookings(filtered)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    filterBookings(bookings, searchTerm, statusFilter)
  }, [searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'fully_paid':
        return 'bg-green-100 text-green-800'
      case 'partially_paid':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const exportToCSV = () => {
    const csv = [
      ['Booking ID', 'Customer', 'Email', 'Tour Package', 'Check-in', 'Guests', 'Total Price', 'Status', 'Payment'],
      ...filteredBookings.map(b => [
        b.id,
        b.customerName,
        b.customerEmail,
        b.tourPackage,
        b.checkInDate,
        b.numberOfGuests,
        b.totalPrice,
        b.bookingStatus,
        b.paymentStatus,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bookings.csv'
    a.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading booking dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Booking Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and track all bookings</p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download size={20} />
          Export CSV
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{stats.totalBookings}</span>
              <Users className="text-blue-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</span>
              <DollarSign className="text-green-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Booking Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">${Math.round(stats.averageBookingValue)}</span>
              <TrendingUp className="text-purple-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{stats.confirmedBookings}</span>
              <CheckCircle2 className="text-green-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{stats.pendingPayments}</span>
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{stats.cancellations}</span>
              <XCircle className="text-red-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Monthly Revenue</TabsTrigger>
          <TabsTrigger value="status">Booking Status</TabsTrigger>
          <TabsTrigger value="payment">Payment Status</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and booking count</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  <Bar dataKey="bookings" fill="#10b981" name="Bookings (#)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>All bookings in the system</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Customer</th>
                  <th className="text-left py-2 px-4 font-semibold">Tour Package</th>
                  <th className="text-left py-2 px-4 font-semibold">Check-in</th>
                  <th className="text-left py-2 px-4 font-semibold">Guests</th>
                  <th className="text-right py-2 px-4 font-semibold">Price</th>
                  <th className="text-left py-2 px-4 font-semibold">Status</th>
                  <th className="text-left py-2 px-4 font-semibold">Payment</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(booking => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-gray-500 text-xs">{booking.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{booking.tourPackage}</td>
                      <td className="py-3 px-4">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{booking.numberOfGuests}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        ${booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(booking.bookingStatus)}>
                          {booking.bookingStatus.charAt(0).toUpperCase() +
                            booking.bookingStatus.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus.replace('_', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
