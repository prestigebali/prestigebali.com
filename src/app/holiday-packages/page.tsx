import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourCard } from '@/components/tour-card';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Luxury Holiday Packages in Bali | Multi-Day Tours | Prestige Bali',
  description:
    'Tailor-made luxury holiday packages across Bali, Lombok, Labuan Bajo & Sumbawa. From romantic honeymoons to family adventures, 7+ days of unforgettable experiences.',
  keywords: [
    'Bali holiday packages',
    'multi-day tours Bali',
    'luxury holiday packages',
    'Bali honeymoon packages',
    'family holiday Bali',
    'Lombok packages',
    'Labuan Bajo tours',
    'Indonesia holiday packages',
  ],
  openGraph: {
    title: 'Luxury Holiday Packages | Prestige Bali',
    description:
      'Curated multi-day holiday packages across Indonesia. Romantic, adventurous, or relaxing — all designed for you.',
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

// Helper function to extract days from duration
function extractDays(duration: string | undefined): number | null {
  if (!duration) return null;
  const daysMatch = duration.match(/(\d+)\s*(?:days?|d)/i);
  return daysMatch ? parseInt(daysMatch[1], 10) : null;
}

// Check if package is a holiday package (7+ days)
function isHolidayPackage(duration: string | undefined): boolean {
  if (!duration) return false;
  const lowerDuration = duration.toLowerCase();

  // Check for explicit multiday patterns
  if (/\b\d+\s*days?\s*\d+\s*nights?\b/i.test(lowerDuration)) {
    const days = extractDays(duration);
    return days !== null && days >= 7;
  }

  if (/\b\d+d\/\d+n\b/i.test(lowerDuration)) {
    const days = extractDays(duration);
    return days !== null && days >= 7;
  }

  if (/\bmulti[-\s]?day\b/i.test(lowerDuration)) {
    return true;
  }

  // Check for explicit days
  const days = extractDays(duration);
  if (days !== null && days >= 7) {
    return true;
  }

  return false;
}

async function getHolidayPackages() {
  try {
    const allPackages = await client.fetch<SanityDocument[]>(
      `*[_type == "tourPackage" && isActive == true && mainCategory == "Holiday Package"]{
        _id,
        title,
        image,
        shortDescription,
        price,
        rating,
        "destination": destination->name,
        category,
        duration,
        slug
      } | order(_createdAt asc)`
    );

    // Ensure array and filter out null/undefined
    return (Array.isArray(allPackages) ? allPackages : []).filter((pkg: any) => pkg && pkg._id);
  } catch (error) {
    console.error('Error fetching holiday packages:', error);
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
              From romantic honeymoon retreats in Ubud&apos;s jungle to thrilling multi-island adventures across Lombok&apos;s pristine beaches and Labuan Bajo&apos;s Komodo dragons, Prestige Bali crafts unforgettable escapes.
            </p>
            <p className="text-lg text-muted-foreground">
              Our holiday packages start from 7 nights and can extend to 14+ days, including stays at Bali&apos;s most coveted villas and resorts, curated with over 500 accommodation partners. Whether you seek romance, adventure, or wellness, we have your perfect retreat.
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
                {packages && packages.length > 0 ? 'Browse Our Holiday Packages' : 'Packages Coming Soon'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {packages && packages.length > 0
                  ? `${packages.length} curated package${packages.length === 1 ? '' : 's'} ready to book`
                  : 'We are preparing exclusive holiday packages — check back soon.'}
              </p>
            </div>

            {packages && packages.length > 0 ? (
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

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Dream Holiday?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Let us create a bespoke holiday package tailored to your vision.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90"
            >
              <Link href="/how-to-book">Start Planning Your Holiday</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
