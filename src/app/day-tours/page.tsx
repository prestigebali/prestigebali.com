import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourCard } from '@/components/tour-card';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';

export const metadata: Metadata = {
  title: 'Luxury Day Tours in Bali | Private Guided Experiences | Prestige Bali',
  description:
    'Explore Bali with our exclusive luxury day tours. Private drivers, expert guides, and tailor-made itineraries to Ubud, Uluwatu, Seminyak, and beyond. Book your Bali day tour today.',
  keywords: [
    'Bali day tours',
    'luxury day tours Bali',
    'private tours Bali',
    'Bali guided tours',
    'Ubud day trip',
    'Uluwatu sunset tour',
    'Bali temple tour',
    'private driver Bali',
  ],
  openGraph: {
    title: 'Luxury Day Tours in Bali | Prestige Bali',
    description:
      'Discover the best of Bali in a single day. Private, premium, and fully personalised day tours with Prestige Bali.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Luxury Day Tours in Bali',
      },
    ],
  },
};

async function getDayTours() {
  try {
    return await client.fetch<SanityDocument[]>(
      `*[_type == "tourPackage" && mainCategory == "Day Tour" && isActive != false]{
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

export default async function DayToursPage() {
  const tours = await getDayTours();

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80"
            alt="Luxury Day Tours Bali"
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
              Luxury Day Tours
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
              Private, personalised, and perfectly curated — discover the very best of Bali in a single unforgettable day.
            </p>
          </div>
        </section>

        {/* SEO Intro */}
        <section className="py-14 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Bali&apos;s Premier Private Day Tour Experiences
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Whether you&apos;re chasing the sacred rice terraces of Ubud, the dramatic sea temples of Uluwatu, or the cultural heartbeat of Bali&apos;s ancient villages, our luxury day tours are crafted to go beyond the ordinary. Each tour is led by a professional English-speaking guide and includes a private air-conditioned vehicle, door-to-door hotel pick-up, and flexible itineraries tailored to your interests.
            </p>
            <p className="text-lg text-muted-foreground">
              From sunrise hikes at Mount Batur to sunset cocktails at Tanah Lot, Prestige Bali delivers premium one-day escapes across Bali&apos;s most breathtaking destinations — all without the stress of planning.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                {tours.length > 0 ? 'Browse Our Day Tours' : 'Day Tours Coming Soon'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tours.length > 0
                  ? `${tours.length} exclusive day tour${tours.length === 1 ? '' : 's'} available to book`
                  : 'We are preparing exclusive day tour packages — check back soon.'}
              </p>
            </div>

            {tours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <TourCard key={tour._id} id={tour._id} {...tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No day tours available yet. Please check back soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* SEO Trust Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-10">
              Why Choose Prestige Bali for Your Day Tour?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  title: 'Private & Exclusive',
                  desc: 'No shared buses. Every tour is fully private — just you, your guide, and your driver.',
                },
                {
                  title: 'Flexible Itineraries',
                  desc: 'Tell us what you love and we\'ll build the day around you. Every detail is customisable.',
                },
                {
                  title: 'Expert Local Guides',
                  desc: 'Our guides are certified, English-speaking, and passionate about sharing the real Bali.',
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
