import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PortableText } from 'next-sanity';

// Types
interface AboutPageData {
  _id: string;
  title?: string;
  description?: any;
  heroImage?: any;
  [key: string]: any;
}

export const metadata: Metadata = {
  title: 'About Prestige Bali | Luxury Travel Experts',
  description: 'Learn about Prestige Bali - your premier luxury travel partner in Indonesia.',
};

export default async function AboutPage() {
  let aboutPageData: AboutPageData | null = null;
  let experienceTypes: SanityDocument[] = [];

  try {
    [aboutPageData, experienceTypes] = await Promise.all([
      client.fetch<AboutPageData | null>('*[_type == "aboutPage" && _id == "aboutPage"][0]'),
      client.fetch<SanityDocument[]>('*[_type == "experience"] | order(title asc)'),
    ]);
  } catch (err) {
    console.error('Failed to fetch Sanity data for /about:', err);
  }

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
  const backgroundImage = data?.heroImage
    ? `url("${data.heroImage.asset?.url}")`
    : 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))';

  return (
    <section
      className="relative h-[60vh] w-full flex items-center justify-center text-center text-white pt-20"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          {data?.title || 'About Prestige Bali'}
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
          Your premier luxury travel partner in Indonesia
        </p>
      </div>
    </section>
  );
}

function AboutContentSection({
  data,
  experienceTypes,
}: {
  data: AboutPageData | null;
  experienceTypes: SanityDocument[];
}) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {data?.description ? (
          <div className="prose prose-lg max-w-none">
            <PortableText value={data.description} />
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground">
              Prestige Bali is dedicated to crafting unforgettable luxury experiences across
              Indonesia&apos;s most breathtaking destinations. With years of expertise in luxury
              travel, we specialize in curating bespoke itineraries that combine cultural
              immersion, adventure, and relaxation in equal measure.
            </p>
          </div>
        )}

        {experienceTypes && experienceTypes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experienceTypes.map((exp) => (
                <div key={exp._id} className="border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
