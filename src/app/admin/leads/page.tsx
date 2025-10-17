'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { deleteBooking } from '@/lib/sanity-actions';

interface Booking extends SanityDocument {
    name: string;
    email: string;
    phoneNumber: string;
    tourPackage: {
        title: string;
    };
    bookingDate: string;
}

export default function LeadsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    const query = `*[_type == "booking"]{
        _id,
        name,
        email,
        phoneNumber,
        bookingDate,
        tourPackage->{title}
    } | order(bookingDate desc)`;
    try {
        const data = await client.fetch(query);
        setBookings(data);
    } catch (error) {
        console.error('Failed to fetch bookings from Sanity:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to fetch booking leads from CMS.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
        return;
    }

    const result = await deleteBooking(bookingId);

    if (result.success) {
      toast({
          title: 'Lead Deleted',
          description: 'The booking lead has been successfully deleted.',
      });
      fetchBookings(); // Refetch bookings to update the list
    } else {
      toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message || 'Failed to delete the booking lead.',
      });
    }
  };

  const formatBookingDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "d MMMM, yyyy 'at' h:mm a");
    } catch (error) {
      console.error("Failed to format date:", dateString, error);
      return 'Invalid Date';
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold">Booking Leads</h1>
            <p className="text-muted-foreground">Lihat dan kelola semua permintaan pemesanan yang masuk.</p>
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Paket Tur</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal Booking</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading leads...</TableCell>
                </TableRow>
              )}
              {!isLoading && bookings?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No leads found.</TableCell>
                </TableRow>
              )}
              {!isLoading && bookings?.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.tourPackage?.title || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatBookingDate(booking.bookingDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleDelete(booking._id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
