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
import { useState, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useFirestore, useStorage } from '@/firebase';
import { destinations, tourCategories } from '@/lib/packages';
import type { TourPackage } from '@/lib/packages';
import { uploadImage } from '@/lib/storage';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  destination: z.string().min(1, 'Please select a destination.'),
  category: z.string().min(1, 'Please select a category.'),
  rating: z.coerce.number().min(1).max(5).default(4.5),
  image: z.object({
    imageUrl: z.string().url('Please upload an image or provide a valid URL.'),
    imageHint: z.string().optional().default(''),
  }),
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageFormProps {
  initialData?: TourPackage;
}

export function PackageForm({ initialData }: PackageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();

  const isEditMode = !!initialData;

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: isEditMode && initialData ? initialData : {
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

  const imagePreview = form.watch('image.imageUrl');

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for immediate preview
      const tempUrl = URL.createObjectURL(file);
      form.setValue('image.imageUrl', tempUrl, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: PackageFormValues) => {
    if (!firestore || !storage) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firebase services are not available.' });
        return;
    }
    setIsSubmitting(true);
    setUploadProgress(0);

    let finalImageUrl = data.image.imageUrl;

    try {
      // 1. Handle Image Upload if a new file is selected
      if (imageFile) {
        toast({ title: 'Uploading Image...', description: 'Please wait while the image is being uploaded.' });
        const fileId = uuidv4();
        const filePath = `tour_packages/${fileId}-${imageFile.name}`;
        
        finalImageUrl = await uploadImage(storage, imageFile, filePath, (progress) => {
            setUploadProgress(progress);
        });

        toast({ title: 'Upload Successful', description: 'Image has been uploaded.' });
      }

      // 2. Prepare data for Firestore
      const finalData = { ...data, image: { ...data.image, imageUrl: finalImageUrl } };

      // 3. Save data to Firestore
      toast({ title: 'Saving Package...', description: 'Please wait while the package details are being saved.' });
      
      if (isEditMode && initialData?.id) {
        const packageDocRef = doc(firestore, 'tour_packages', initialData.id);
        await updateDoc(packageDocRef, finalData);
      } else {
        const newId = uuidv4();
        const packageDocRef = doc(firestore, 'tour_packages', newId);
        await setDoc(packageDocRef, { ...finalData, id: newId });
      }

      toast({
          title: isEditMode ? 'Package Updated!' : 'Package Created!',
          description: `The tour package "${data.title}" has been saved successfully.`,
      });

      router.push('/admin/packages');
      router.refresh();

    } catch (error: any) {
        console.error("Operation failed:", error);
        toast({
            variant: "destructive",
            title: "Operation Failed",
            description: error.message || "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
        setUploadProgress(0);
        setImageFile(null);
    }
  };

  const isUploading = isSubmitting && uploadProgress > 0 && uploadProgress < 100;

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
                    <Input placeholder="e.g., Enchanting Bali Discovery" {...field} disabled={isSubmitting} />
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
                      disabled={isSubmitting}
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
                            <Input type="number" placeholder="1500" {...field} disabled={isSubmitting} />
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
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
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
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
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
                                    id="file-upload"
                                    onChange={handleFileChange} 
                                    accept="image/png, image/jpeg, image/gif"
                                    disabled={isSubmitting}
                                />
                                <div 
                                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors border-input"
                                    onClick={() => !isSubmitting && document.getElementById('file-upload')?.click()}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <p>Uploading...</p>
                                            <Progress value={uploadProgress} className="w-48" />
                                            <p className="text-sm font-semibold">{Math.round(uploadProgress)}%</p>
                                        </div>
                                    ) : imagePreview ? (
                                        <>
                                            <Image src={imagePreview} alt="Package preview" layout="fill" className="object-contain rounded-md p-2" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-7 w-7"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    form.setValue('image.imageUrl', '', { shouldValidate: true });
                                                    setImageFile(null);
                                                    // Also reset the file input
                                                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                                    if(fileInput) fileInput.value = '';
                                                }}
                                                disabled={isSubmitting}
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
                                    value={imagePreview && !imageFile ? imagePreview : field.value}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setImageFile(null);
                                    }}
                                    disabled={isSubmitting}
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
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isUploading ? 'Uploading...' : isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Package')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
