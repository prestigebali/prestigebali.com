'use client';

import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Heart, Mountain, Users, Waves } from 'lucide-react';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { useState, useEffect } from 'react';

const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Users,
  Mountain,
  Waves,
  Building,
};


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AboutHeroSection />
        <AboutContentSection />
      </main>
      <Footer />
    </div>
  );
}

function AboutHeroSection() {
  return (
    <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
      {aboutHeroImage && (
        <Image
          src={aboutHeroImage.imageUrl}
          alt={aboutHeroImage.imageHint}
          data-ai-hint={aboutHeroImage.imageHint}
          fill
          className="object-cover brightness-75"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg shadow-black/50">
          About Prestige Bali
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mt-4 text-shadow-md shadow-black/50">
          Redefining the art of travel with exclusive, tailor-made experiences.
        </p>
      </div>
    </section>
  );
}

function AboutContentSection() {
  const [experienceTypes, setExperienceTypes] = useState<SanityDocument[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const query = `*[_type == "experience"] | order(title asc)`;
      const data = await client.fetch(query);
      setExperienceTypes(data);
    };
    fetchExperiences();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <p className="text-lg font-semibold text-primary uppercase tracking-wider">Welcome to Prestige Bali</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-foreground">
              Crafting Premium Leisures and Tours
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At Prestige Bali, we redefine the art of travel through exclusive, tailor-made leisure and tour experiences across Bali, Lombok, Labuan Bajo, and Sumbawa. As specialists in premium holidays, we create journeys that blend luxury, comfort, and authenticity, offering you the finest way to explore Indonesia’s most captivating islands.
            </p>
            <p>
              Whether you’re planning a romantic honeymoon escape, a memorable family vacation, an immersive cultural adventure, a restorative wellness retreat, or a fun and engaging company outing, group tour, or team-building experience, our expert team ensures every detail is handled with care and precision.
            </p>
            <p>
              With over 500 accommodation partners and a dedicated ground operations team, we deliver seamless service and unforgettable experiences, from your arrival to your journey home.
            </p>
            <p>
              Choose from our exclusive range of premium to intimate leisure packages, each designed to reflect your unique travel style and expectations.
            </p>
            <p className="font-semibold text-foreground">
              At Prestige Bali, your holiday is more than a getaway — it’s a crafted experience designed to inspire, indulge, and connect you with the soul of Bali, Lombok, Labuan Bajo, and Sumbawa.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
              {experienceTypes.map((exp) => {
                const Icon = exp.icon && iconMap[exp.icon] ? iconMap[exp.icon] : 'div';
                return (
                  <Link
                    href={`/packages?category=${encodeURIComponent(exp.title)}`}
                    key={exp._id}
                    className="group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">{exp.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}