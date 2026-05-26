'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type ProgramCategory = {
  category: string;
  href: string;
  items: { title: string; slug: string }[];
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [programCategories, setProgramCategories] = useState<ProgramCategory[]>([]);
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
        setProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('/api/nav-programs')
      .then((r) => r.json())
      .then((data) => setProgramCategories(data))
      .catch(() => {});
  }, []);

  const isScrolledOrNotHome = scrolled || pathname !== '/';
  const linkClass = cn('text-sm font-medium transition-colors text-primary-foreground/90 hover:text-white');
  const hasCategories = programCategories.length > 0;

  const fallbackLinks = [
    { name: 'Day Tour', href: '/day-tours' },
    { name: 'Holiday Packages', href: '/holiday-packages' },
  ];

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

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className={linkClass}>About</Link>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProgramsOpen((o) => !o)}
              className={cn(linkClass, 'flex items-center gap-1')}
            >
              Programs <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', programsOpen && 'rotate-180')} />
            </button>

            {programsOpen && (
              <div className={cn('absolute top-full left-0 mt-2 rounded-xl bg-gray-900/95 backdrop-blur-sm shadow-xl border border-white/10 py-2 z-50 max-h-[80vh] overflow-y-auto', hasCategories ? 'w-72' : 'w-52')}>
                {hasCategories ? (
                  programCategories.map((cat, idx) => (
                    <div key={cat.category}>
                      <Link
                        href={cat.href}
                        onClick={() => setProgramsOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors"
                      >
                        {cat.category}
                      </Link>
                      {cat.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/packages/${item.slug}`}
                          onClick={() => setProgramsOpen(false)}
                          className="block pl-6 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                      <Link
                        href={cat.href}
                        onClick={() => setProgramsOpen(false)}
                        className="block pl-6 px-4 py-2 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors"
                      >
                        View all {cat.category} →
                      </Link>
                      {idx < programCategories.length - 1 && (
                        <div className="my-1.5 mx-4 border-t border-white/10" />
                      )}
                    </div>
                  ))
                ) : (
                  fallbackLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setProgramsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))
                )}
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

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle className="sr-only">Menu</SheetTitle></SheetHeader>
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
                  <div>
                    <button
                      onClick={() => setMobileProgramsOpen((o) => !o)}
                      className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                    >
                      Programs
                      <ChevronDown className={cn('h-4 w-4 transition-transform', mobileProgramsOpen && 'rotate-180')} />
                    </button>
                    {mobileProgramsOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-2 border-l-2 border-muted pl-4">
                        {hasCategories ? (
                          programCategories.map((cat) => (
                            <div key={cat.category}>
                              <button
                                onClick={() => setMobileCategoryOpen((p) => p === cat.category ? null : cat.category)}
                                className="flex items-center justify-between w-full text-base font-semibold hover:text-primary transition-colors py-1"
                              >
                                {cat.category}
                                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', mobileCategoryOpen === cat.category && 'rotate-180')} />
                              </button>
                              {mobileCategoryOpen === cat.category && (
                                <div className="ml-3 mt-1 flex flex-col gap-2 border-l border-muted pl-3">
                                  {cat.items.map((item) => (
                                    <Link key={item.slug} href={`/packages/${item.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors py-0.5">
                                      {item.title}
                                    </Link>
                                  ))}
                                  <Link href={cat.href} className="text-sm font-medium text-primary hover:underline py-0.5">
                                    View all {cat.category} →
                                  </Link>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          fallbackLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                              {link.name}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <Link href="/wellness" className="text-lg font-medium hover:text-primary transition-colors">Wellness Service</Link>
                  <Link href="/promotions" className="text-lg font-medium hover:text-primary transition-colors">Promotions</Link>
                  <Link href="/how-to-book" className="text-lg font-medium hover:text-primary transition-colors">How to Book</Link>
                  <Link href="/#destinations" className="text-lg font-medium hover:text-primary transition-colors">Destinations</Link>
                  <Link href="/#experiences" className="text-lg font-medium hover:text-primary transition-colors">Experiences</Link>
                </nav>
                <Button asChild className="mt-4"><Link href="/packages">Book Now</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
