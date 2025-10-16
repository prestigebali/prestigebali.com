import Image from 'next/image';
import { Star, StarHalf, Quote } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  avatar: ImagePlaceholder;
  name: string;
  handle: string;
  review: string;
  rating: number;
  className?: string;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array(fullStars).fill(0).map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
      {halfStar && <StarHalf key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />}
      {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30 fill-muted-foreground/20" />)}
    </div>
  );
};

export function ReviewCard({ avatar, name, handle, review, rating, className }: ReviewCardProps) {
  return (
    <Card className={cn('flex flex-col bg-card p-6 transition-all duration-300 border shadow-sm hover:shadow-xl hover:-translate-y-1', className)}>
      <CardContent className="flex-1 p-0 flex flex-col">
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">"{review}"</p>
        <div className="flex items-center gap-4 pt-4 border-t">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar.imageUrl} alt={name} data-ai-hint={avatar.imageHint} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground font-headline">{name}</p>
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{handle}</p>
                {renderStars(rating)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
