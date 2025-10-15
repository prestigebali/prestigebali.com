import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TourCard } from '@/components/tour-card';
import { ReviewCard } from '@/components/review-card';
import { Heart, Users, Mountain, Waves } from 'lucide-react';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const destinationImages = PlaceHolderImages.filter(p => p.description === 'destination').slice(0, 4);
const curatedTours = PlaceHolderImages.filter(p => p.description === 'tour');
const reviews = PlaceHolderImages.filter(p => p.description === 'avatar');

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
    image: curatedTours[0]
  },
  {
    id: "tour-2",
    title: "Lombok's Coastal Gems",
    description: "Explore pristine beaches and the majestic Mount Rinjani.",
    price: 1550,
    rating: 4.8,
    image: curatedTours[1]
  },
  {
    id: "tour-3",
    title: "Komodo & Labuan Bajo Adventure",
    description: "Sail through turquoise waters and meet the legendary Komodo dragons.",
    price: 2200,
    rating: 4.9,
    image: curatedTours[2]
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
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: "Romantic Honeymoons",
        description: "Create timeless memories with our exclusive romantic escapes."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Family Vacations",
        description: "Engaging and memorable adventures for the whole family."
    },
    {
        icon: <Mountain className="w-8 h-8 text-primary" />,
        title: "Cultural Adventures",
        description: "Immerse yourself in the rich traditions and heritage of the islands."
    },
    {
        icon: <Waves className="w-8 h-8 text-primary" />,
        title: "Wellness Retreats",
        description: "Restore your mind, body, and soul in serene, luxurious settings."
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
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[70dvh] md:h-[80dvh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.imageHint}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover brightness-[.6]"
          priority
        />
      )}
       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in-up shadow-black/50 text-shadow">
          Crafting Premium Leisures & Tours
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300 shadow-black/50 text-shadow-sm">
         Exclusive, tailor-made experiences across Bali, Lombok, Labuan Bajo, and Sumbawa. Your unforgettable journey awaits.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="#tours">Explore Packages</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          Explore Our Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div key={dest.name} className="relative group overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-5 transition-transform duration-300 hover:scale-105">
              <Image
                src={dest.image.imageUrl}
                alt={dest.name}
                data-ai-hint={dest.image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white shadow-black/50 text-shadow-sm">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToursSection() {
  return (
    <section id="tours" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          Exclusive Tour Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourData.map((tour) => (
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
    <section id="experiences" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
          Tailor-Made Experiences
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          From romantic escapes to company outings, we craft journeys that reflect your unique style and expectations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experienceTypes.map((exp) => (
            <Card key={exp.title} className="text-center bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-2">
                        {exp.icon}
                    </div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          Stories From Our Guests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewData.map((review) => (
            <ReviewCard
              key={review.id}
              avatar={review.avatar}
              name={review.name}
              handle={review.handle}
              review={review.review}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Add animation styles to globals.css if they don't exist
// This is a placeholder for custom animation utility classes.
// You can define them in globals.css or tailwind.config.js
const animationStyles = `
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-600 { animation-delay: 600ms; }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
    opacity: 0;
  }
`;

// To use these styles, you'd typically add a style tag or put them in your CSS file.
// For this case, we'll just acknowledge their conceptual presence.
// In a real app, these would be in globals.css or configured in Tailwind.
