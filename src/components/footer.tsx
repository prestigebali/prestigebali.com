import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4 text-foreground">
              <Image 
                src="https://res.cloudinary.com/dfinkfssq/image/upload/v1760581094/logo_th6oyh.png" 
                alt="Prestige Bali Logo"
                width={140}
                height={35}
                className="w-auto h-8"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting premium leisure and tour experiences across Indonesia’s most captivating islands.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#destinations" className="text-sm text-muted-foreground hover:text-primary">Destinations</a></li>
              <li><a href="#tours" className="text-sm text-muted-foreground hover:text-primary">Tours</a></li>
              <li><a href="#experiences" className="text-sm text-muted-foreground hover:text-primary">Experiences</a></li>
              <li><a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">Reviews</a></li>
            </ul>
          </div>
          <div className="md:col-span-1">
             <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li>info@prestigebali.com</li>
                <li>+62 123 4567 890</li>
             </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Prestige Bali. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
