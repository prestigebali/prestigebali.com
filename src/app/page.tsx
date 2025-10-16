'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TourCard } from '@/components/tour-card';
import { ReviewCard } from '@/components/review-card';
import { Heart, Users, Mountain, Waves, Building } from 'lucide-react';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { allPackages, destinations as packageDestinations, experienceTypes as packageExperienceTypes, tourCategories } from '@/lib/packages';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const reviews = PlaceHolderImages.filter(p => p.description === 'avatar');

const reviewData = [
  {
    id: "review-1",
    name: "Emily Carter",
    handle: "@emilyc",
    review: "Our honeymoon in Bali was a dream, all thanks to Prestige Bali. Every detail was perfect, from the luxury villa to the private tours. Truly seamless service!",
    rating: 5,
    avatar: reviews[0]
  },
  {
    id: "review-2",
    name: "David Chen",
    handle: "@davidchen",
    review: "The family trip to Lombok and Labuan Bajo exceeded all expectations. The team was fantastic, and the experiences were unforgettable. Highly recommended for a premium holiday.",
    rating: 5,
    avatar: reviews[1]
  },
  {
    id: "review-3",
    name: "Sarah Williams",
    handle: "@sarahw",
    review: "A truly authentic and luxurious adventure in Sumbawa. Prestige Bali crafted a journey that felt both indulgent and connected to the local culture. Exceptional!",
    rating: 5,
    avatar: reviews[2]
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DestinationsSection />
        <ToursSection />
        <ExperiencesSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.imageHint}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover brightness-75"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up text-shadow-lg shadow-black/50">
          Crafting Premium Leisures & Tours
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300 text-shadow-md shadow-black/50">
         Exclusive, tailor-made experiences across Bali, Lombok, Labuan Bajo, and Sumbawa. Your unforgettable journey awaits.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            <Link href="/packages">Explore Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Our Destinations</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Explore Captivating Islands
            </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {packageDestinations.map((dest) => (
            <Link 
              key={dest.name} 
              href={`/packages?destination=${encodeURIComponent(dest.name)}`} 
              className="relative group aspect-[4/5] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block"
            >
              <Image
                src={dest.image.imageUrl}
                alt={dest.name}
                data-ai-hint={dest.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-3xl font-bold text-white text-shadow-md shadow-black/50">{dest.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToursSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTours = activeFilter === "All" 
    ? allPackages.slice(0, 6) 
    : allPackages.filter(tour => tour.category === activeFilter);

  return (
    <section id="tours" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Exclusive Packages</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Find Your Perfect Journey
            </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {["All", ...tourCategories].map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="rounded-full transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              rating={tour.rating}
              destination={tour.destination}
              category={tour.category}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/packages">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection() {
  return (
    <section id="experiences" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Tailor-Made</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Experiences for Every Traveler
            </h2>
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              From romantic escapes to company outings, we craft journeys that reflect your unique style and expectations.
            </p>
        </div>
        <Card className="p-8 md:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
            {packageExperienceTypes.map((exp) => (
              <Link 
                href={`/packages?category=${encodeURIComponent(exp.title)}`} 
                key={exp.title} 
                className="flex flex-col items-center group"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 transition-all duration-300 group-hover:bg-primary">
                  <exp.icon className="w-8 h-8 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">{exp.title}</h3>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
           <p className="text-sm font-semibold text-primary uppercase tracking-wider">Guest Stories</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Treasured Memories, Trusted Service
            </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviewData.map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <ReviewCard
                    avatar={review.avatar}
                    name={review.name}
                    handle={review.handle}
                    review={review.review}
                    rating={review.rating}
                    className="h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <CarouselPrevious className="static translate-y-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static translate-y-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
