'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mountain, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Tours', href: '#tours' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Mountain className={cn('h-7 w-7', scrolled ? 'text-primary' : 'text-white')} />
          <span className={cn('font-headline', scrolled ? 'text-foreground' : 'text-white shadow-black/50 text-shadow')}>
            Prestige Bali
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                scrolled ? 'text-foreground' : 'text-primary-foreground/90 hover:text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full">
            <Link href="#tours">Book Now</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('text-white hover:bg-white/10 hover:text-white', scrolled ? 'text-foreground' : 'text-white')}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span>Prestige Bali</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4">
                  <Link href="#tours">Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
