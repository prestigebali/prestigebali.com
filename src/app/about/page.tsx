'use server';

import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Building, Heart, Mountain, Users, Waves } from 'lucide-react';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PortableText } from '@/components/portable-text';

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Users,
  Mountain,
  Waves,
  Building,
};

interface AboutPageData extends SanityDocument {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: any;
  contentSubtitle: string;
  contentTitle: string;
  contentBody: any[];
}

export default async function AboutPage() {
  const aboutPageData = await client.fetch<AboutPageData | null>(`*[_type == "aboutPage" && _id == "aboutPage"][0]`);
  const experienceTypes = await client.fetch<SanityDocument[]>(`*[_type == "experience"] | order(title asc)`);
  
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AboutHeroSection data={aboutPageData} />
        <AboutContentSection data={aboutPageData} experienceTypes={experienceTypes} />
      </main>
      <Footer />
    </div>
  );
}

function AboutHeroSection({ data }: { data: AboutPageData | null }) {
  const headline = data?.heroHeadline || "About Prestige Bali";
  const subheadline = data?.heroSubheadline || "Redefining the art of travel with exclusive, tailor-made experiences.";
  const heroImage = data?.heroImage ? urlFor(data.heroImage).url() : "https://picsum.photos/seed/about-hero/1920/1080";

  return (
    <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage}
          alt={headline}
          fill
          className="object-cover brightness-75"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg shadow-black/50">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mt-4 text-shadow-md shadow-black/50">
          {subheadline}
        </p>
      </div>
    </section>
  );
}

function AboutContentSection({ data, experienceTypes }: { data: AboutPageData | null, experienceTypes: SanityDocument[] }) {
  const contentSubtitle = data?.contentSubtitle || "Welcome to Prestige Bali";
  const contentTitle = data?.contentTitle || "Crafting Premium Leisures and Tours";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <p className="text-lg font-semibold text-primary uppercase tracking-wider">{contentSubtitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 text-foreground">
              {contentTitle}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            {data?.contentBody ? (
              <PortableText value={data.contentBody} />
            ) : (
              <>
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
              </>
            )}
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
