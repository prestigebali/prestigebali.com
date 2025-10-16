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
import { useState, useRef, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useStorage } from '@/firebase';
import { destinations, tourCategories } from '@/lib/packages';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { generateId, uploadImage } from '@/lib/storage';
import { cn } from '@/lib/utils';
import type { TourPackage } from '@/lib/packages';
import { Progress } from '@/components/ui/progress';

const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  destination: z.string().min(1, 'Please select a destination.'),
  category: z.string().min(1, 'Please select a category.'),
  rating: z.coerce.number().min(1).max(5).default(4.5),
  image: z.object({
    imageUrl: z.string().url('Please upload an image.'),
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();

  const isEditMode = !!initialData;

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
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
    if (isEditMode && initialData) {
      form.reset(initialData);
    }
  }, [initialData, isEditMode, form]);
  
  const imageUrl = form.watch('image.imageUrl');

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        toast({ variant: 'destructive', title: 'Invalid File', description: 'Please select an image file.' });
        return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    try {
        if (!storage) {
            throw new Error("Firebase Storage is not initialized.");
        }
        const imageId = generateId();
        const path = `package-images/${imageId}`;
        const url = await uploadImage(storage, file, path, (progress) => {
          setUploadProgress(progress);
        });
        form.setValue('image.imageUrl', url, { shouldValidate: true });
    } catch(e: any) {
        console.error("Upload failed", e);
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: e.message || 'Could not upload the image. Please try again.'
        });
    } finally {
        setIsUploading(false);
        setUploadProgress(null);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileChange(e.dataTransfer.files);
    }
  };
  
  const removeImage = () => {
    form.setValue('image.imageUrl', '', { shouldValidate: true });
  }

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
            await addDoc(packagesCollection, data);
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
                        <FormLabel>Package Image</FormLabel>
                        <FormControl>
                            <div>
                                <input 
                                    type="file" 
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFileChange(e.target.files)}
                                    accept="image/*"
                                    disabled={isUploading}
                                />
                                {imageUrl ? (
                                    <div className="relative w-full max-w-sm h-64 rounded-md overflow-hidden border">
                                        <Image src={imageUrl} alt="Package preview" fill className="object-cover" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 rounded-full h-8 w-8"
                                            onClick={removeImage}
                                            disabled={isUploading}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => !isUploading && fileInputRef.current?.click()}
                                        className={cn(
                                            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md transition-colors",
                                            isUploading ? "cursor-not-allowed" : "cursor-pointer hover:border-primary",
                                            dragActive ? "border-primary bg-primary/10" : "border-input"
                                        )}
                                    >
                                        {isUploading ? (
                                            <div className="flex flex-col items-center gap-4 text-center w-full px-8">
                                                <Progress value={uploadProgress} className="w-full" />
                                                <p className="text-sm font-medium text-muted-foreground">
                                                  Uploading... {uploadProgress !== null ? `${Math.round(uploadProgress)}%` : ''}
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-10 h-10 text-muted-foreground" />
                                                <p className="mt-4 text-sm text-muted-foreground">
                                                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
                {isSubmitting ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Package')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
