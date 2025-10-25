'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { Star, Pin } from 'lucide-react';
import React from 'react';
import { BookingDialog } from './booking-dialog';
import type { SanityDocument } from 'next-sanity';
import { PortableText } from './portable-text';

interface PackageDetailDialogProps {
  tourPackage: SanityDocument;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      {halfStar && <Star key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-muted-foreground/30 fill-muted-foreground/20"
          />
        ))}
    </>
  );
};

export function PackageDetailDialog({
  tourPackage,
  isOpen,
  onOpenChange,
}: PackageDetailDialogProps) {
  const [isBookingOpen, setBookingOpen] = React.useState(false);

  if (!tourPackage) return null;

  const imageUrl = tourPackage.image
    ? urlFor(tourPackage.image).width(800).height(600).url()
    : '/placeholder.png';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-lg font-bold">{tourPackage.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Pin className="w-4 h-4" />
                <span>{tourPackage.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(tourPackage.rating)}
                <span className="font-medium">{tourPackage.rating?.toFixed(1) || 'N/A'}</span>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden w-full self-start">
                <Image src={imageUrl} alt={tourPackage.title} fill className="object-cover" />
                {tourPackage.category && (
                  <Badge variant="default" className="absolute top-4 left-4">
                    {tourPackage.category}
                  </Badge>
                )}
              </div>
              <div className="prose prose-sm max-w-none">
                <PortableText value={tourPackage.description} />
              </div>
            </div>
          </div>
          <div className="mt-auto pt-6 flex justify-between items-center border-t">
            <div className="text-3xl font-bold text-primary">${tourPackage.price}</div>
            <Button size="lg" onClick={() => setBookingOpen(true)}>
              Book Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <BookingDialog
        tourPackage={{ id: tourPackage._id, title: tourPackage.title }}
        isOpen={isBookingOpen}
        onOpenChange={setBookingOpen}
      />
    </>
  );
}
