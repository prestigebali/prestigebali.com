'use client';

import Image from 'next/image';
import { Star, StarHalf, Pin } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import React from 'react';
import { BookingDialog } from './booking-dialog';

interface TourCardProps {
  id: string; // id is required now
  image: ImagePlaceholder;
  title: string;
  description: string;
  price: number;
  rating: number;
  destination: string;
  category: string;
  className?: string;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {Array(fullStars).fill(0).map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
      {halfStar && <StarHalf key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />}
      {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30 fill-muted-foreground/20" />)}
    </>
  );
};

export function TourCard({ id, image, title, description, price, rating, destination, category, className }: TourCardProps) {
  const [isBookingOpen, setBookingOpen] = React.useState(false);
  
  return (
    <>
      <Card className={cn('group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card', className)}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {image?.imageUrl && (
            <Image
              src={image.imageUrl}
              alt={title}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <Badge variant="default" className="absolute top-4 left-4">{category}</Badge>
        </div>
        <div className="flex flex-col flex-grow">
          <CardHeader className="p-6">
            <CardTitle className="text-xl mb-2 leading-tight font-bold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">{description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-6 pt-0 mt-auto flex justify-between items-end">
            <div>
              <div className='flex items-center gap-1 text-sm text-muted-foreground mb-1'>
                  <Pin className='w-3.5 h-3.5'/>
                  <span>{destination}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(rating)}
                <span className="text-xs text-muted-foreground font-medium">{rating.toFixed(1)}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${price}
              </div>
            </div>
            <Button size="sm" className="rounded-full" onClick={() => setBookingOpen(true)}>
              Book Now
            </Button>
          </CardFooter>
        </div>
      </Card>
      {isBookingOpen && (
         <BookingDialog 
            tourPackage={{ id, title }}
            isOpen={isBookingOpen}
            onOpenChange={setBookingOpen}
         />
      )}
    </>
  );
}

    