'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { TourCard } from '@/components/tour-card';
import { ReviewCard } from '@/components/review-card';
import { Footer } from '@/components/footer';
import { useState, useMemo, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { tourCategories, experienceTypes as staticExperienceTypes } from '@/lib/packages';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

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
  const [heroSettings, setHeroSettings] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      const query = `*[_type == "heroSettings" && _id == "heroSettings"][0]`;
      const data = await client.fetch(query);
      setHeroSettings(data);
    };
    fetchHeroSettings();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId;
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else {
      return null;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&rel=0`;
  };

  const youTubeEmbedUrl = heroSettings?.youtubeVideoUrl ? getYouTubeEmbedUrl(heroSettings.youtubeVideoUrl) : null;
  const backgroundVideoAssetUrl = heroSettings?.backgroundVideo?.asset?._ref ? urlFor(heroSettings.backgroundVideo.asset).url() : null;

  const brightnessClass = heroSettings?.imageBrightness || 'brightness-75';

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-primary-foreground overflow-hidden">
      {heroSettings?.backgroundType === 'Image' && heroSettings.backgroundImage && (
        <Image
          src={urlFor(heroSettings.backgroundImage).url()}
          alt={heroSettings.headline || 'Travel background'}
          fill
          className={cn("object-cover", brightnessClass)}
          priority
        />
      )}
      {heroSettings?.backgroundType === 'Video' && youTubeEmbedUrl && (
        <iframe
          src={youTubeEmbedUrl}
          className="absolute top-1/2 left-1/2 w-[110vw] h-[110vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
       {heroSettings?.backgroundType === 'Video' && !youTubeEmbedUrl && (backgroundVideoAssetUrl || heroSettings.backgroundVideoUrl) && (
         <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            key={backgroundVideoAssetUrl || heroSettings.backgroundVideoUrl}
         >
           <source src={backgroundVideoAssetUrl || heroSettings.backgroundVideoUrl} type="video/mp4" />
           Your browser does not support the video tag.
         </video>
      )}

      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up text-shadow-lg shadow-black/50">
          {heroSettings?.headline || "Crafting Premium Leisures & Tours"}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300 text-shadow-lg shadow-black/50">
         {heroSettings?.subheadline || "Exclusive, tailor-made experiences across Bali, Lombok, Labuan Bajo, and Sumbawa. Your unforgettable journey awaits."}
        </p>
        {heroSettings?.buttonText && heroSettings.buttonLink && (
          <div className="animate-fade-in-up animation-delay-600">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              <Link href={heroSettings.buttonLink}>{heroSettings.buttonText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function DestinationsSection() {
  const [destinations, setDestinations] = useState<SanityDocument[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const query = `*[_type == "destination"]{
        _id,
        name,
        slug,
        image
      }`;
      const data = await client.fetch(query);
      setDestinations(data);
    };
    fetchDestinations();
  }, []);

  return (
    <section id="destinations" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Our Destinations</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Explore Captivating Islands
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest) => (
            <Link 
              key={dest._id} 
              href={`/packages?destination=${encodeURIComponent(dest.name)}`} 
              className="relative group aspect-[1.7] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block"
            >
              {dest.image && (
                <Image
                  src={urlFor(dest.image).url()}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
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
  const [allPackages, setAllPackages] = useState<SanityDocument[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const query = `*[_type == "tourPackage"]{
        _id,
        title,
        description,
        price,
        rating,
        image,
        category,
        "destination": destination->name
      }`;
      const data = await client.fetch(query);
      setAllPackages(data);
    };
    fetchPackages();
  }, []);

  const filteredTours = useMemo(() => {
    if (!allPackages) return [];
    if (activeFilter === "All") {
      return allPackages.slice(0, 6);
    }
    return allPackages.filter(tour => tour.category === activeFilter);
  }, [allPackages, activeFilter]);

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
              key={tour._id}
              id={tour._id}
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
  // Keeping this section with static data for now as a schema for it doesn't exist yet.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticExperienceTypes.map((exp) => (
            <Link
              href={`/packages?category=${encodeURIComponent(exp.title)}`}
              key={exp.title}
              className="relative group aspect-[1/1.2] overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block"
            >
              <Image
                src={exp.image.imageUrl}
                alt={exp.title}
                data-ai-hint={exp.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold text-shadow-md shadow-black/50">{exp.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80 line-clamp-2">{exp.description}</p>
              </div>
            </Link>
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
