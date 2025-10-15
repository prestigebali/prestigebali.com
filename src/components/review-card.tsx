import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
      {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50 fill-muted-foreground/20" />)}
    </div>
  );
};


export function ReviewCard({ avatar, name, handle, review, rating, className }: ReviewCardProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar>
          <AvatarImage src={avatar.imageUrl} alt={name} data-ai-hint={avatar.imageHint} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{handle}</p>
        </div>
        {renderStars(rating)}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review}</p>
      </CardContent>
    </Card>
  );
}
