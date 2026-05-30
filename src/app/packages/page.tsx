import { Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PackagesClient } from './packages-client';

async function getPackagesData() {
  const dayToursQuery = `*[_type == "tourPackage" && mainCategory == "Day Tour" && isActive != false]{
    _id,
    title,
    shortDescription,
    priceFrom,
    currency,
    featuredImage,
    "destination": destination->name,
    slug,
    isActive
  } | order(_createdAt asc)`;

  const holidayPackagesQuery = `*[_type == "tourPackage" && mainCategory == "Holiday Package" && isActive != false]{
    _id,
    title,
    shortDescription,
    priceFrom,
    currency,
    featuredImage,
    "destination": destination->name,
    slug,
    isActive
  } | order(_createdAt asc)`;

  const destinationsQuery = `*[_type == "destination"]{_id, name} | order(name asc)`;

  const [dayTours, holidayPackages, destinations] = await Promise.all([
    client.fetch<SanityDocument[]>(dayToursQuery),
    client.fetch<SanityDocument[]>(holidayPackagesQuery),
    client.fetch<SanityDocument[]>(destinationsQuery)
  ]);

  return { dayTours, holidayPackages, destinations };
}

async function PackagesContent() {
  let dayTours: SanityDocument[] = [];
  let holidayPackages: SanityDocument[] = [];
  let destinations: SanityDocument[] = [];
  try {
    const data = await getPackagesData();
    dayTours = data.dayTours;
    holidayPackages = data.holidayPackages;
    destinations = data.destinations;
  } catch (err) {
    console.error('Failed to load packages data:', err);
  }
  return (
    <PackagesClient
      dayTours={dayTours}
      holidayPackages={holidayPackages}
      destinations={destinations}
    />
  );
}

export default async function PackagesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">EXCLUSIVE PACKAGES</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Find Your Perfect Journey</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                Discover your next unforgettable adventure. Choose from our curated Day Tours or multi-day Holiday Packages.
              </p>
            </div>
            <Suspense fallback={<div className="text-center">Loading packages...</div>}>
              <PackagesContent />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
