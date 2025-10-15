import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TourCard } from '@/components/tour-card';
import { ReviewCard } from '@/components/review-card';
import { RecommendationEngine } from '@/components/recommendation-engine';
import { Separator } from '@/components/ui/separator';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const destinationImages = PlaceHolderImages.filter(p => p.description === 'destination');
const curatedTours = PlaceHolderImages.filter(p => p.description === 'tour');
const reviews = PlaceHolderImages.filter(p => p.description === 'avatar');

const tourData = [
  {
    id: "tour-1",
    title: "Mystical Bali Escape",
    description: "Explore ancient temples, lush rice paddies, and vibrant local culture.",
    price: 1250,
    rating: 4.8,
    image: curatedTours[0]
  },
  {
    id: "tour-2",
    title: "Tokyo Neon & Nature",
    description: "Experience the bustling city life and serene natural beauty of Japan.",
    price: 2100,
    rating: 4.9,
    image: curatedTours[1]
  },
  {
    id: "tour-3",
    title: "Roman Holiday Adventure",
    description: "Walk through history in the eternal city, from the Colosseum to the Vatican.",
    price: 1800,
    rating: 4.7,
    image: curatedTours[2]
  }
];

const reviewData = [
  {
    id: "review-1",
    name: "Alex Johnson",
    handle: "@alexj",
    review: "Voyage Zen made our Bali trip unforgettable! The itinerary was perfect and the AI recommendations for side trips were spot on.",
    rating: 5,
    avatar: reviews[0]
  },
  {
    id: "review-2",
    name: "Samantha Lee",
    handle: "@samlee",
    review: "Booking was a breeze and the tour in Tokyo was phenomenal. The blend of city and nature was just what I was looking for.",
    rating: 5,
    avatar: reviews[1]
  },
  {
    id: "review-3",
    name: "Michael Chen",
    handle: "@mikechen",
    review: "A fantastic experience in Rome. Everything was well-organized. The customer support was also very responsive. Highly recommend!",
    rating: 4.5,
    avatar: reviews[2]
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <DestinationsSection />
        <ToursSection />
        <RecommendationSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[60dvh] md:h-[70dvh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.imageHint}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover brightness-50"
          priority
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-fade-in-up">
          Craft Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
          Discover curated journeys and get personalized recommendations from our AI travel expert. Your dream trip awaits.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="#recommendations">Find a Tour</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationImages.map((dest, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-5">
              <Image
                src={dest.imageUrl}
                alt={dest.imageHint}
                data-ai-hint={dest.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{dest.imageHint.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
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
          Curated Tour Packages
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

function RecommendationSection() {
  return (
    <section id="recommendations" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <RecommendationEngine />
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          What Our Travelers Say
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
