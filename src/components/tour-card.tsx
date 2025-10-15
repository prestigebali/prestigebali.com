import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface TourCardProps {
  image: ImagePlaceholder;
  title: string;
  description: string;
  price: number;
  rating: number;
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
      {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50 fill-muted-foreground/20" />)}
    </>
  );
};

export function TourCard({ image, title, description, price, rating, className }: TourCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden transition-all hover:shadow-xl', className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={image.imageUrl}
            alt={title}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <div className="flex items-center gap-2 mb-4">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          ${price}
          <span className="text-sm font-normal text-muted-foreground">/person</span>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Book Now</Button>
      </CardFooter>
    </Card>
  );
}
