'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useStorage } from '@/firebase';
import { destinations, tourCategories } from '@/lib/packages';
import type { TourPackage } from '@/lib/packages';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '@/lib/storage';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  destination: z.string().min(1, 'Please select a destination.'),
  category: z.string().min(1, 'Please select a category.'),
  rating: z.coerce.number().min(1).max(5).default(4.5),
  image: z.object({
    imageUrl: z.string().url('Please provide a valid image URL. Upload an image or paste a URL.'),
    imageHint: z.string().optional().default(''),
  }),
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageFormProps {
    initialData?: TourPackage & { id: string };
}

export function PackageForm({ initialData }: PackageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image?.imageUrl || null);
  
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setImagePreview(initialData.image.imageUrl);
    }
  }, [initialData, form]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!storage) {
        toast({ variant: 'destructive', title: 'Error', description: 'Storage service is not available.' });
        return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
        const fileId = uuidv4();
        const filePath = `tour_packages/${fileId}-${file.name}`;
        
        const downloadURL = await uploadImage(storage, file, filePath, (progress) => {
            setUploadProgress(progress);
        });

        form.setValue('image.imageUrl', downloadURL, { shouldValidate: true });
        setImagePreview(downloadURL);
        toast({ title: 'Upload Successful', description: 'Image has been uploaded and URL is set.' });

    } catch (error) {
        console.error("Upload failed:", error);
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: error instanceof Error ? error.message : "Could not upload image. Please try again.",
        });
    } finally {
        setIsUploading(false);
    }
  };


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
            // We'll update the document with its own ID, which is a common pattern for easier lookups.
            await updateDoc(newDocRef, { id: newDocRef.id });
            toast({
                title: 'Package Created',
                description: 'The new tour package has been added successfully.',
            });
        }
      router.push('/admin/packages');
      router.refresh();
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

  const isFormBusy = isSubmitting || isUploading;

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
                    <Input placeholder="e.g., Enchanting Bali Discovery" {...field} disabled={isFormBusy} />
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
                      disabled={isFormBusy}
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
                            <Input type="number" placeholder="1500" {...field} disabled={isFormBusy} />
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
                        <Select onValueChange={field.onChange} value={field.value} disabled={isFormBusy}>
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
                        <Select onValueChange={field.onChange} value={field.value} disabled={isFormBusy}>
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
                        <FormLabel>Package Image</FormLabel>
                        <FormControl>
                            <div>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    accept="image/png, image/jpeg, image/gif"
                                    disabled={isFormBusy}
                                />
                                <div 
                                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors border-input"
                                    onClick={() => !isFormBusy && fileInputRef.current?.click()}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <p>Uploading...</p>
                                            <Progress value={uploadProgress} className="w-48" />
                                            <p className="text-sm font-semibold">{Math.round(uploadProgress)}%</p>
                                        </div>
                                    ) : imagePreview ? (
                                        <>
                                            <Image src={imagePreview} alt="Package preview" layout="fill" className="object-contain rounded-md" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-7 w-7"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setImagePreview(null);
                                                    form.setValue('image.imageUrl', '', { shouldValidate: true });
                                                }}
                                                disabled={isFormBusy}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <UploadCloud className="w-10 h-10" />
                                            <p>Click to upload or drag & drop</p>
                                            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                                <Input 
                                    className="mt-4" 
                                    placeholder="Or paste an image URL here" 
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setImagePreview(e.target.value);
                                    }}
                                    disabled={isFormBusy}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isFormBusy}>
                Cancel
            </Button>
            <Button type="submit" disabled={isFormBusy}>
                {isFormBusy ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Package')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
