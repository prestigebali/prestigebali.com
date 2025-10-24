'use client';

import Image from 'next/image';
import { Star, StarHalf, Pin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import React from 'react';
import { BookingDialog } from './booking-dialog';
import { urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PackageDetailDialog } from './package-detail-dialog';

// Function to convert block content to plain text
const blockContentToPlainText = (blocks: any[] = []) => {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
};


interface TourCardProps extends SanityDocument {
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

export function TourCard({ className, ...tourPackage }: TourCardProps) {
  const [isBookingOpen, setBookingOpen] = React.useState(false);
  const [isDetailOpen, setDetailOpen] = React.useState(false);
  
  const { _id, title, image, description, price, rating, destination, category } = tourPackage;

  const imageUrl = image ? urlFor(image).width(600).height(400).url() : '/placeholder.png';
  const plainDescription = blockContentToPlainText(description);

  return (
    <>
      <Card
        className={cn('group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card cursor-pointer', className)}
        onClick={() => setDetailOpen(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {category && <Badge variant="default" className="absolute top-4 left-4">{category}</Badge>}
        </div>
        <div className="flex flex-col flex-grow">
          <CardHeader className="p-6">
            <CardTitle className="text-xl mb-2 leading-tight font-bold">
               {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">{plainDescription}</CardDescription>
          </CardHeader>
          <CardFooter className="p-6 pt-0 mt-auto flex justify-between items-end">
            <div>
              <div className='flex items-center gap-1 text-sm text-muted-foreground mb-1'>
                  <Pin className='w-3.5 h-3.5'/>
                  <span>{destination}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(rating)}
                <span className="text-xs text-muted-foreground font-medium">{rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${price}
              </div>
            </div>
            <Button 
              size="sm" 
              className="rounded-full" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card's onClick from firing
                setBookingOpen(true);
              }}
            >
              Book Now
            </Button>
          </CardFooter>
        </div>
      </Card>
      
      <BookingDialog 
          tourPackage={{ id: _id, title }}
          isOpen={isBookingOpen}
          onOpenChange={setBookingOpen}
      />

      <PackageDetailDialog
        tourPackage={tourPackage}
        isOpen={isDetailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
