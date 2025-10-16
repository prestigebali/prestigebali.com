'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { TourCard } from '@/components/tour-card';
import { ReviewCard } from '@/components/review-card';
import { Heart, Users, Mountain, Waves, Building } from 'lucide-react';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const destinationImages = PlaceHolderImages.filter(p => p.description === 'destination').slice(0, 4);
const curatedTours = PlaceHolderImages.filter(p => p.description === 'tour');
const reviews = PlaceHolderImages.filter(p => p.description === 'avatar');
const experienceImages = PlaceHolderImages.filter(p => p.description === 'experience');

const destinations = [
  { name: "Bali", image: destinationImages[0] },
  { name: "Lombok", image: destinationImages[1] },
  { name: "Labuan Bajo", image: destinationImages[2] },
  { name: "Sumbawa", image: destinationImages[3] },
];

const tourData = [
  {
    id: "tour-1",
    title: "Enchanting Bali Discovery",
    description: "Immerse yourself in the spiritual and cultural heart of Bali.",
    price: 1350,
    rating: 4.9,
    image: curatedTours[0],
    category: "Cultural Adventures"
  },
  {
    id: "tour-2",
    title: "Lombok's Coastal Gems",
    description: "Explore pristine beaches and the majestic Mount Rinjani.",
    price: 1550,
    rating: 4.8,
    image: curatedTours[1],
    category: "Wellness Retreats"
  },
  {
    id: "tour-3",
    title: "Komodo & Labuan Bajo Adventure",
    description: "Sail through turquoise waters and meet the legendary Komodo dragons.",
    price: 2200,
    rating: 4.9,
    image: curatedTours[2],
    category: "Cultural Adventures"
  },
  {
    id: "tour-4",
    title: "Bali Honeymoon Dream",
    description: "Private villas, romantic dinners, and breathtaking sunsets.",
    price: 1800,
    rating: 5.0,
    image: experienceImages.find(i => i.id === 'exp-1')!,
    category: "Romantic Honeymoons"
  },
  {
    id: "tour-5",
    title: "Lombok Family Fun",
    description: "Safe & engaging activities for all ages on a beautiful island.",
    price: 1650,
    rating: 4.8,
    image: experienceImages.find(i => i.id === 'exp-2')!,
    category: "Family Vacations"
  },
    {
    id: "tour-6",
    title: "Sumbawa Corporate Retreat",
    description: "Team building and strategy sessions in an inspiring, remote location.",
    price: 2500,
    rating: 4.9,
    image: experienceImages.find(i => i.id === 'exp-4')!,
    category: "Company Outings"
  }
];

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

const experienceTypes = [
    {
        icon: <Heart className="w-10 h-10 text-white" />,
        title: "Romantic Honeymoons",
        description: "Create timeless memories with our exclusive romantic escapes in breathtaking settings.",
        image: experienceImages.find(i => i.id === 'exp-1')!
    },
    {
        icon: <Users className="w-10 h-10 text-white" />,
        title: "Family Vacations",
        description: "Engaging, safe, and memorable adventures for the whole family to enjoy together.",
        image: experienceImages.find(i => i.id === 'exp-2')!
    },
    {
        icon: <Mountain className="w-10 h-10 text-white" />,
        title: "Cultural Adventures",
        description: "Immerse yourself in the rich traditions, arts, and heritage of the Indonesian islands.",
        image: experienceImages.find(i => i.id === 'exp-3')!
    },
    {
        icon: <Waves className="w-10 h-10 text-white" />,
        title: "Wellness Retreats",
        description: "Restore your mind, body, and soul in serene, luxurious settings with expert guidance.",
        image: experienceImages.find(i => i.id === 'exp-4')!
    },
    {
        icon: <Building className="w-10 h-10 text-white" />,
        title: "Company Outings",
        description: "Inspiring team-building and corporate retreats that foster collaboration and creativity.",
        image: experienceImages.find(i => i.id === 'exp-5')!
    }
]

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in-up text-shadow-lg shadow-black/50">
          Crafting Premium Leisures & Tours
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300 text-shadow-md shadow-black/50">
         Exclusive, tailor-made experiences across Bali, Lombok, Labuan Bajo, and Sumbawa. Your unforgettable journey awaits.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            <a href="#tours">Explore Packages</a>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
              Explore Captivating Islands
            </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div key={dest.name} className="relative group aspect-[4/5] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <Image
                src={dest.image.imageUrl}
                alt={dest.name}
                data-ai-hint={dest.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white text-shadow-md shadow-black/50">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToursSection() {
  const tourCategories = ["All", ...new Set(tourData.map(tour => tour.category))];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTours = activeFilter === "All" 
    ? tourData 
    : tourData.filter(tour => tour.category === activeFilter);

  return (
    <section id="tours" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Exclusive Packages</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
              Find Your Perfect Journey
            </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {tourCategories.map(category => (
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
              image={tour.image}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              rating={tour.rating}
            />
          ))}
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
              Experiences for Every Traveler
            </h2>
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              From romantic escapes to company outings, we craft journeys that reflect your unique style and expectations.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {experienceTypes.map((exp) => (
            <div key={exp.title} className="relative group aspect-[4/5] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
               <Image
                src={exp.image.imageUrl}
                alt={exp.title}
                data-ai-hint={exp.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
                <div className="mb-4">
                  {exp.icon}
                </div>
                <h3 className="text-xl font-bold text-shadow-md shadow-black/50 mb-2">{exp.title}</h3>
                <p className="text-sm text-primary-foreground/90 max-w-xs mx-auto text-shadow-sm shadow-black/50">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
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
