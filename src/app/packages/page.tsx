

  import { Suspense } from 'react';
  import { Header } from '@/components/header';
  import { Footer } from '@/components/footer';
  import { client } from '@/lib/sanity';
  import type { SanityDocument } from 'next-sanity';
  import { PackagesClient } from './packages-client';

  async function getPackagesData() {
    const packagesQuery = `*[_type == "tourPackage"]{
        _id,
        title,
        shortDescription,
        priceFrom,
        currency,
        featuredImage,
        mainCategory,
        "category": experienceCategory,
        "destination": destination->name,
        slug,
        isActive
    }`;
    const experienceTypesQuery = `*[_type == "experience"]{_id, title}`;
    const destinationsQuery = `*[_type == "destination"]{_id, name}`;

    const [allPackages, experienceTypes, destinations] = await Promise.all([
      client.fetch<SanityDocument[]>(packagesQuery),
      client.fetch<SanityDocument[]>(experienceTypesQuery),
      client.fetch<SanityDocument[]>(destinationsQuery)
    ]);

    return { allPackages, experienceTypes, destinations };
  }

  const PackagesPage = () => {
    return (
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <section className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Packages</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                  Discover your next unforgettable journey. Filter by destination, experience, and price.
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
  };

 async function PackagesContent() {
  let allPackages: SanityDocument[] = [];
  let experienceTypes: SanityDocument[] = [];
  let destinations: SanityDocument[] = [];
  try {
    const data = await getPackagesData();
    allPackages = data.allPackages;
    experienceTypes = data.experienceTypes;
    destinations = data.destinations;
  } catch (err) {
    console.error('Failed to load packages data:', err);
  }
  return (
    <PackagesClient
      allPackages={allPackages}
      experienceTypes={experienceTypes}
      destinations={destinations}
    />
  );
}
export default PackagesPage;
