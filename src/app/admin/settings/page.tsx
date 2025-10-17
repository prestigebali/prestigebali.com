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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';

const settingsSchema = z.object({
  email: z.string().email('Please enter a valid email.').default(''),
  phoneNumber: z.string().min(1, 'Please enter a phone number.').default(''),
  facebookUrl: z.string().url('Please enter a valid URL.').or(z.literal('')).optional(),
  twitterUrl: z.string().url('Please enter a valid URL.').or(z.literal('')).optional(),
  instagramUrl: z.string().url('Please enter a valid URL.').or(z.literal('')).optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SiteSettings extends SettingsFormValues {
  id?: string;
}

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const settingsDocRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'global');
  }, [firestore]);

  const { data: initialData, isLoading } = useDoc<SiteSettings>(settingsDocRef);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSubmitting(true);
    if (!firestore) return;

    try {
      const docRef = doc(firestore, 'settings', 'global');
      setDocumentNonBlocking(docRef, data, { merge: true });

      toast({
        title: 'Settings Updated!',
        description: 'Your contact and social media information has been saved.',
      });
    } catch (error: any) {
      console.error("Operation failed:", error);
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  if (isLoading) {
    return (
        <main className="flex-1 p-4 sm:p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Pengaturan Website</h1>
                <p className="text-muted-foreground">Perbarui informasi kontak dan tautan sosial media Anda.</p>
            </div>
            <p>Loading settings...</p>
        </main>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6">
       <div className="mb-8">
            <h1 className="text-3xl font-bold">Pengaturan Website</h1>
            <p className="text-muted-foreground">Perbarui informasi kontak dan tautan sosial media Anda di sini.</p>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>Detail ini akan ditampilkan di footer website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Alamat Email</FormLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="sales@prestigebali.com" {...field} className="pl-10" />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nomor Telepon / WhatsApp</FormLabel>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="+62 877 6416 1803" {...field} className="pl-10"/>
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
            </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Sosial Media</CardTitle>
                    <CardDescription>Masukkan URL lengkap untuk setiap profil sosial media.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="facebookUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Facebook</FormLabel>
                             <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input placeholder="https://facebook.com/yourpage" {...field} value={field.value ?? ''} className="pl-10" />
                                </FormControl>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitterUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Twitter / X</FormLabel>
                            <div className="relative">
                                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input placeholder="https://twitter.com/yourhandle" {...field} value={field.value ?? ''} className="pl-10"/>
                                </FormControl>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instagramUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Instagram</FormLabel>
                             <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input placeholder="https://instagram.com/yourprofile" {...field} value={field.value ?? ''} className="pl-10" />
                                </FormControl>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
        </Form>
    </main>
  );
}
