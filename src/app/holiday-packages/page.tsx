import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourCard } from '@/components/tour-card';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';

export const metadata: Metadata = {
  title: 'Bali Holiday Packages | Tailor-Made Multi-Day Getaways | Prestige Bali',
  description:
    'Discover premium Bali holiday packages — from romantic honeymoons and family vacations to adventure escapes across Bali, Lombok, Labuan Bajo, and Sumbawa. Fully tailor-made multi-day itineraries.',
  keywords: [
    'Bali holiday packages',
    'Bali tour packages',
    'Bali multi-day packages',
    'Bali honeymoon package',
    'Bali family holiday',
    'Lombok tour package',
    'Labuan Bajo tour',
    'luxury Bali vacation',
    'all-inclusive Bali package',
  ],
  openGraph: {
    title: 'Bali Holiday Packages | Prestige Bali',
    description:
      'Tailor-made multi-day holiday packages across Bali, Lombok, Labuan Bajo, and Sumbawa. Luxury travel designed around you.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bali Holiday Packages',
      },
    ],
  },
};

async function getHolidayPackages() {
  try {
    return await client.fetch<SanityDocument[]>(
      `*[_type == "tourPackage" && mainCategory == "Holiday Package" && isActive != false]{
        _id,
        title,
        "image": featuredImage,
        "description": shortDescription,
        "price": priceFrom,
        rating,
        "destination": destination->name,
        "category": experienceCategory,
        mainCategory,
        slug
      } | order(_createdAt asc)`
    );
  } catch {
    return [];
  }
}

export default async function HolidayPackagesPage() {
  const packages = await getHolidayPackages();

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=80"
            alt="Bali Holiday Packages"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">
              Prestige Bali
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Holiday Packages
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
              Tailor-made multi-day escapes across Bali, Lombok, Labuan Bajo, and Sumbawa — crafted for couples, families, and groups who demand the finest.
            </p>
          </div>
        </section>

        {/* SEO Intro */}
        <section className="py-14 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Indonesia&apos;s Most Sought-After Holiday Packages
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              From romantic honeymoon retreats in Ubud&apos;s jungle to thrilling multi-island adventures across Lombok&apos;s pristine beaches and Labuan Bajo&apos;s Komodo dragons, Prestige Bali designs every package around your dream holiday. We handle every detail — accommodation, transport, tours, dining — so all you have to do is arrive and enjoy.
            </p>
            <p className="text-lg text-muted-foreground">
              Our holiday packages start from 3 nights and can extend to 14+ days, including stays at Bali&apos;s most coveted villas and resorts, curated with over 500 accommodation partners. Whether you&apos;re celebrating a special occasion or simply craving a premium escape, we make it extraordinary.
            </p>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-10 bg-muted/20 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {['Honeymoon', 'Family Holiday', 'Adventure', 'Wellness Retreat', 'Group Tour', 'Corporate Outing'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                {packages.length > 0 ? 'Browse Our Holiday Packages' : 'Packages Coming Soon'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {packages.length > 0
                  ? `${packages.length} curated package${packages.length === 1 ? '' : 's'} ready to book`
                  : 'We are preparing exclusive holiday packages — check back soon.'}
              </p>
            </div>

            {packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <TourCard key={pkg._id} id={pkg._id} {...pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No packages available yet. Please check back soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Trust + SEO Footer Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-10">
              The Prestige Bali Difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  title: '500+ Accommodation Partners',
                  desc: 'Access to Bali\'s finest villas, boutique resorts, and luxury hotels — handpicked for quality and comfort.',
                },
                {
                  title: 'Fully Tailor-Made',
                  desc: 'No cookie-cutter holidays. Every itinerary is built from scratch around your dates, budget, and interests.',
                },
                {
                  title: 'End-to-End Support',
                  desc: 'From airport arrival to your final day, our team is available 24/7 to ensure everything runs perfectly.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-muted/40 rounded-2xl p-8">
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
