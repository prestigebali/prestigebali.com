'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Mail, MessageCircle } from 'lucide-react';

interface BookingDialogProps {
  tourPackage: {
    id: string;
    title: string;
  };
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
});

export function BookingDialog({
  tourPackage,
  isOpen,
  onOpenChange,
}: BookingDialogProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Database connection is not available.',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const bookingData = {
        ...values,
        tourPackageId: tourPackage.id,
        tourPackageName: tourPackage.title,
        bookingDate: new Date().toISOString(),
      };
      
      const bookingsCol = collection(firestore, 'bookings');
      await addDoc(bookingsCol, bookingData);

      onOpenChange(false); // Close the form dialog FIRST
      setShowConfirmation(true); // THEN show the confirmation dialog
      form.reset();

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
      onOpenChange(false); // Also close on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const whatsAppMessage = `Hello, I'm interested in booking the "${tourPackage.title}" package. My details have been submitted.`;
  const emailSubject = `Booking Inquiry for: ${tourPackage.title}`;
  
  const WHATSAPP_NUMBER = "6287764161803";
  const EMAIL_ADDRESS = "sales@prestigebali.com";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book: {tourPackage.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your booking request. We'll get back to you soon!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone/WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+62 812 3456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank You for Your Booking!</AlertDialogTitle>
            <AlertDialogDescription>
              Your request has been sent. To speed up the process, you can contact us directly via WhatsApp or Email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
            <AlertDialogAction asChild>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp
                </a>
            </AlertDialogAction>
            <AlertDialogAction asChild>
                 <a 
                   href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(emailSubject)}`}
                   className="flex items-center justify-center gap-2"
                  >
                  <Mail className="w-4 h-4" />
                  Continue with Email
                </a>
            </AlertDialogAction>
             <Button variant="outline" onClick={handleConfirmationClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
