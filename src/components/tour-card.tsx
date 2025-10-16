import Image from 'next/image';
import { Star, StarHalf, Pin } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface TourCardProps {
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

export function TourCard({ image, title, description, price, rating, destination, category, className }: TourCardProps) {
  return (
    <Card className={cn('group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card', className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image.imageUrl}
            alt={title}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
           <Badge variant="default" className="absolute top-4 left-4">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className='flex items-center gap-1 text-sm text-muted-foreground mb-2'>
            <Pin className='w-3.5 h-3.5'/>
            <span>{destination}</span>
        </div>
        <CardTitle className="text-2xl mb-2 leading-tight">{title}</CardTitle>
        <div className="flex items-center gap-2 mb-4">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground font-medium">{rating.toFixed(1)}</span>
        </div>
        <CardDescription className="flex-grow text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center bg-transparent">
        <div>
            <p className="text-sm font-normal text-muted-foreground">Starting from</p>
            <div className="text-2xl font-bold text-primary">
            ${price}
            </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
          <Link href={`/packages?title=${encodeURIComponent(title)}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
