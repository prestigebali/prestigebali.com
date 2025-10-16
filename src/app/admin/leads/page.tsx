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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { collection, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

type Booking = {
    id: string;
    name: string;
    email: string;
    tourPackageName: string;
    bookingDate: string;
}

export default function LeadsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const bookingsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'bookings');
  }, [firestore]);

  const { data: bookings, isLoading } = useCollection<Booking>(bookingsCollection);

  const handleDelete = (bookingId: string) => {
    if (firestore) {
      // Removing confirm() to ensure delete is triggered directly.
      const docRef = doc(firestore, 'bookings', bookingId);
      deleteDocumentNonBlocking(docRef);
      toast({
        title: 'Lead Deletion Initiated',
        description: 'The booking lead has been scheduled for deletion.',
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
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.tourPackageName}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleDelete(booking.id)}>Delete</DropdownMenuItem>
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
