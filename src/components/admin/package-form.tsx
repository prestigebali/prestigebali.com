'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { destinations, tourCategories } from '@/lib/packages';
import type { TourPackage } from '@/lib/packages';

// Simplified schema: image is now an object with a URL string.
const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  destination: z.string().min(1, 'Please select a destination.'),
  category: z.string().min(1, 'Please select a category.'),
  rating: z.coerce.number().min(1).max(5).default(4.5),
  image: z.object({
    imageUrl: z.string().url('Please enter a valid image URL.'),
    imageHint: z.string().optional().default(''),
  }),
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageFormProps {
    initialData?: TourPackage & { id: string };
}

export function PackageForm({ initialData }: PackageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const isEditMode = !!initialData;

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: initialData || {
        title: '',
        description: '',
        price: 0,
        destination: '',
        category: '',
        rating: 4.5,
        image: {
            imageUrl: '',
            imageHint: ''
        }
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: PackageFormValues) => {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
        return;
    }
    setIsSubmitting(true);
    try {
        if (isEditMode && initialData) {
            const packageDocRef = doc(firestore, 'tour_packages', initialData.id);
            await updateDoc(packageDocRef, data);
             toast({
                title: 'Package Updated',
                description: 'The tour package has been updated successfully.',
            });
        } else {
            const packagesCollection = collection(firestore, 'tour_packages');
            const newDocRef = await addDoc(packagesCollection, data);
            // We need to add the generated ID to the document for consistency.
            await updateDoc(newDocRef, { id: newDocRef.id });
            toast({
                title: 'Package Created',
                description: 'The new tour package has been added successfully.',
            });
        }
      router.push('/admin/packages');
      router.refresh(); // To ensure the list is updated
    } catch (error) {
      console.error('Failed to save package:', error);
      toast({
        variant: 'destructive',
        title: 'Operation Failed',
        description: 'Could not save the package. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Enchanting Bali Discovery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the tour package in detail..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="1500" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a destination" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {destinations.map((dest) => (
                                <SelectItem key={dest.name} value={dest.name}>{dest.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {tourCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
             <FormField
                control={form.control}
                name="image.imageUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Package Image URL</FormLabel>
                        <FormControl>
                           <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                            Paste the full URL of the image here.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Package')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
