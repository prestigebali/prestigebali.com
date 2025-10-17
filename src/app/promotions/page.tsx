'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Calendar, Percent } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Promotion extends SanityDocument {
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  image: any;
  tourPackage?: {
    _id: string;
    title: string;
    price: number;
  };
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const query = `*[_type == "promotion" && startDate <= "${today}" && endDate >= "${today}"]{
        ...,
        tourPackage->{
          _id,
          title,
          price
        }
      }`;
      try {
        const data = await client.fetch(query);
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white bg-gray-800 pt-20">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-shadow-lg shadow-black/50">
              Special Promotions
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mt-4 mb-8 text-shadow-md shadow-black/50">
              Don't miss out on our limited-time offers for your dream vacation.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center text-muted-foreground">Loading promotions...</div>
            ) : promotions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promotions.map((promo) => (
                  <PromotionCard key={promo._id} promo={promo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No Active Promotions</h3>
                <p className="text-muted-foreground">Please check back later for special offers.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PromotionCard({ promo }: { promo: Promotion }) {
    const imageUrl = promo.image ? urlFor(promo.image).width(600).height(400).url() : '/placeholder.png';
    const originalPrice = promo.tourPackage?.price || 0;
    const discountedPrice = originalPrice * (1 - promo.discountPercentage / 100);

    return (
        <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge variant="destructive" className="absolute top-4 left-4 flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    {promo.discountPercentage}% OFF
                </Badge>
            </div>
            <div className="flex flex-col flex-grow">
                <CardHeader className="p-6">
                    <CardTitle className="text-xl mb-2 leading-tight font-bold">{promo.title}</CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">{promo.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                     {promo.tourPackage && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Tag className="w-4 h-4" />
                            <span>Applies to: <strong>{promo.tourPackage.title}</strong></span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Valid until: <strong>{format(new Date(promo.endDate), 'd MMMM, yyyy')}</strong></span>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto flex justify-between items-end">
                    {promo.tourPackage ? (
                        <div>
                             <p className="text-sm text-muted-foreground line-through">${originalPrice.toLocaleString()}</p>
                            <p className="text-2xl font-bold text-primary">${discountedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                    ) : (
                        <div/> 
                    )}
                    {promo.tourPackage ? (
                         <Button size="sm" className="rounded-full" asChild>
                            <Link href={`/packages`}>View Package</Link>
                        </Button>
                    ) : (
                         <Button size="sm" className="rounded-full" disabled>
                            Details Unavailable
                        </Button>
                    )}
                </CardFooter>
            </div>
        </Card>
    );
}