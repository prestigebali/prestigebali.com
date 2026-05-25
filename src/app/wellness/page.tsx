'use server';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { Clock, DollarSign } from 'lucide-react';

interface WellnessService extends SanityDocument {
  title: string;
  description?: string;
  duration?: string;
  priceFrom?: number;
  image?: any;
  isActive?: boolean;
}

async function getWellnessServices() {
  return client.fetch<WellnessService[]>(
    `*[_type == "wellnessService" && isActive != false] | order(order asc, _createdAt asc)`
  );
}

export default async function WellnessPage() {
  const services = await getWellnessServices();

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative h-[55vh] w-full flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
            alt="Wellness in Bali"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Prestige Bali
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Wellness Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Restore your body, calm your mind, and reconnect with yourself through Bali&apos;s finest wellness experiences.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our curated wellness journeys blend ancient Balinese healing traditions with modern luxury. From private spa retreats to guided meditation and yoga, every experience is tailored to your needs.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="pb-20 bg-background">
          <div className="container mx-auto px-4">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <WellnessCard key={service._id} service={service} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {defaultServices.map((service, i) => (
                  <DefaultCard key={i} service={service} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/40 border-t">
          <div className="container mx-auto px-4 text-center max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Unwind?</h2>
            <p className="text-muted-foreground mb-8">
              Contact us to build your personalised wellness retreat in Bali. Every detail handled for you.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/how-to-book">Book a Wellness Experience</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function WellnessCard({ service }: { service: WellnessService }) {
  const imageUrl = service.image
    ? urlFor(service.image).width(600).height(400).url()
    : 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80';

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
        {service.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {service.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          {service.duration && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {service.duration}
            </div>
          )}
          {service.priceFrom && (
            <div className="flex items-center gap-1 text-sm font-semibold text-primary">
              <DollarSign className="w-4 h-4" />
              From ${service.priceFrom.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultServices = [
  {
    title: 'Traditional Balinese Massage',
    description: 'A deep, relaxing full-body massage using warm coconut oil and time-honoured Balinese techniques to release tension and restore energy flow.',
    duration: '60 – 90 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    title: 'Private Yoga & Meditation',
    description: 'One-on-one sessions with expert instructors in a serene jungle or villa setting. Tailored to all levels, from beginners to advanced practitioners.',
    duration: '90 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80',
  },
  {
    title: 'Luxury Spa Retreat',
    description: 'A curated full-day spa experience including body scrub, floral bath, facial, and massage at Bali\'s finest resort spas, with private transfers included.',
    duration: 'Full Day',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  },
  {
    title: 'Sound Healing Ceremony',
    description: 'Immerse yourself in the ancient art of sound therapy with Tibetan bowls and sacred Balinese instruments led by a traditional healer.',
    duration: '75 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    title: 'Healing Waters – Hot Spring Journey',
    description: 'A guided journey to Bali\'s natural hot springs, combined with a traditional herbal drink ritual and guided breathwork.',
    duration: 'Half Day',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    title: 'Holistic Wellness Package',
    description: 'A multi-day bespoke wellness programme combining yoga, spa treatments, healthy cuisine, meditation, and cultural ceremonies.',
    duration: '3 – 7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
];

function DefaultCard({ service }: { service: typeof defaultServices[0] }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>
        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {service.duration}
        </div>
      </div>
    </div>
  );
}
