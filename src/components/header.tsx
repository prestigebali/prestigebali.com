import Link from 'next/link';
import { MountainIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Voyage Zen</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="#destinations" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Destinations
        </Link>
        <Link href="#tours" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Tours
        </Link>
        <Link href="#reviews" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Reviews
        </Link>
        <Button size="sm" variant="outline">
          Contact Us
        </Button>
      </nav>
    </header>
  );
}
