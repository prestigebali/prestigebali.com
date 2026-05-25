'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const packagesLinks = [
  { name: 'Luxury Day Tours', href: '/day-tours' },
  { name: 'Holiday Packages', href: '/holiday-packages' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPackagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isScrolledOrNotHome = scrolled || pathname !== '/';

  const linkClass = cn('text-sm font-medium transition-colors text-primary-foreground/90 hover:text-white');

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolledOrNotHome ? 'bg-gray-900/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image
            src="https://res.cloudinary.com/dfinkfssq/image/upload/v1760581094/logo_th6oyh.png"
            alt="Prestige Bali Logo"
            width={120}
            height={30}
            className="w-auto h-7"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className={linkClass}>About</Link>

          {/* Luxury Day Tours dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setPackagesOpen((o) => !o)}
              className={cn(linkClass, 'flex items-center gap-1')}
            >
              Packages <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', packagesOpen && 'rotate-180')} />
            </button>
            {packagesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-gray-900/95 backdrop-blur-sm shadow-xl border border-white/10 py-1.5 z-50">
                {packagesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setPackagesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/wellness" className={linkClass}>Wellness Service</Link>
          <Link href="/promotions" className={linkClass}>Promotions</Link>
          <Link href="/how-to-book" className={linkClass}>How to Book</Link>
          <Link href="/#destinations" className={linkClass}>Destinations</Link>
          <Link href="/#experiences" className={linkClass}>Experiences</Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full">
            <Link href="/packages">Book Now</Link>
          </Button>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Image
                    src="https://res.cloudinary.com/dfinkfssq/image/upload/v1760581094/logo_th6oyh.png"
                    alt="Prestige Bali Logo"
                    width={120}
                    height={30}
                    className="w-auto h-7"
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">About</Link>

                  {/* Mobile Packages accordion */}
                  <div>
                    <button
                      onClick={() => setMobilePackagesOpen((o) => !o)}
                      className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                    >
                      Packages
                      <ChevronDown className={cn('h-4 w-4 transition-transform', mobilePackagesOpen && 'rotate-180')} />
                    </button>
                    {mobilePackagesOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-3 border-l-2 border-muted pl-4">
                        {packagesLinks.map((link) => (
                          <Link key={link.href} href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link href="/wellness" className="text-lg font-medium hover:text-primary transition-colors">Wellness Service</Link>
                  <Link href="/promotions" className="text-lg font-medium hover:text-primary transition-colors">Promotions</Link>
                  <Link href="/how-to-book" className="text-lg font-medium hover:text-primary transition-colors">How to Book</Link>
                  <Link href="/#destinations" className="text-lg font-medium hover:text-primary transition-colors">Destinations</Link>
                  <Link href="/#experiences" className="text-lg font-medium hover:text-primary transition-colors">Experiences</Link>
                </nav>
                <Button asChild className="mt-4">
                  <Link href="/packages">Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
