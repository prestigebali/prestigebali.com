'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Search, List, Mail, MessageCircle, CreditCard, CheckCircle, Plane, Landmark, Wallet } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { useState, useEffect } from 'react';

export default function HowToBookPage() {
  const [settings, setSettings] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;
      const data = await client.fetch(query);
      setSettings(data);
    };
    fetchSettings();
  }, []);
  
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: '1. Explore Tour Packages',
      description: 'Find the perfect tour package for you on our Packages page. Use the filters to sort by destination, experience type, and price.',
      link: '/packages',
      linkLabel: 'Explore Packages'
    },
    {
      icon: <List className="w-12 h-12 text-primary" />,
      title: '2. Fill Out the Booking Form',
      description: 'Once you have selected a package, click the "Book Now" button. Fill out the form with your name, email, and phone number, then click "Submit Booking".',
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-primary" />,
      title: '3. Contact Us (Optional)',
      description: 'For a faster response, you can contact us directly via WhatsApp or Email after submitting the form. Our team will assist you promptly.',
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: '4. Confirmation & Payment',
      description: 'Our team will confirm the availability and details of your order. We will send you instructions for a secure and easy payment process.',
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-primary" />,
      title: '5. Booking Complete!',
      description: 'Once payment is confirmed, your booking is complete! You will receive all your travel details and itinerary via email.',
    },
    {
        icon: <Plane className="w-12 h-12 text-primary" />,
        title: '6. Enjoy Your Holiday',
        description: 'Now you are ready for an unforgettable adventure. Our team will ensure everything runs smoothly from start to finish. Enjoy your holiday!',
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white bg-gray-800 pt-20">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-shadow-lg shadow-black/50">
              How to Book
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mt-4 mb-8 text-shadow-md shadow-black/50">
              A step-by-step guide to planning your dream trip with us.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                    <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                      {step.link && (
                        <Button asChild className="mt-4">
                          <Link href={step.link}>{step.linkLabel}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

               <div className="mt-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Official Payment Information</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">Please use the official accounts below for all transactions. Be cautious of fraud attempts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Landmark className="w-8 h-8 text-primary" />
                            <CardTitle>Bank Transfer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground text-lg">
                            <p><strong className="text-foreground font-medium">Bank Name:</strong> {settings?.bankName || 'Not configured'}</p>
                            <p><strong className="text-foreground font-medium">Account Holder:</strong> {settings?.bankAccountHolder || 'Not configured'}</p>
                            <p><strong className="text-foreground font-medium">Account Number:</strong> {settings?.bankAccountNumber || 'Not configured'}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Wallet className="w-8 h-8 text-primary" />
                            <CardTitle>PayPal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground text-lg">
                            <p><strong className="text-foreground font-medium">PayPal Email:</strong></p>
                            <p>{settings?.paypalEmail || 'Not configured'}</p>
                            <p className="text-sm">Please ensure to cover any transaction fees.</p>
                        </CardContent>
                    </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
