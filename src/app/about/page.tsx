import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { client, urlFor } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { PortableText } from '@/components/portable-text';

// Types
interface AboutPageData {
  _id: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: any;
  contentSubtitle?: string;
  contentTitle?: string;
  contentBody?: any;
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
      client.fetch<AboutPageData | null>(
        `*[_type == "aboutPage" && _id == "aboutPage"][0] {
          _id,
          heroHeadline,
          heroSubheadline,
          heroImage,
          contentSubtitle,
          contentTitle,
          contentBody
        }`
      ),
      client.fetch<SanityDocument[]>('*[_type == "experience"] | order(title asc) { _id, title, description }'),
    ]);
    console.log('About page data loaded:', { hasData: !!aboutPageData, hasContentBody: !!aboutPageData?.contentBody });
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
    ? `url("${urlFor(data.heroImage).url()}")`
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
          {data?.heroHeadline || 'About Prestige Bali'}
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
          {data?.heroSubheadline || 'Your premier luxury travel partner in Indonesia'}
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
        {/* Content Section Title */}
        {data?.contentSubtitle && (
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">
            {data.contentSubtitle}
          </p>
        )}
        {data?.contentTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {data.contentTitle}
          </h2>
        )}

        {/* Main Content Body */}
        {data?.contentBody && Array.isArray(data.contentBody) && data.contentBody.length > 0 ? (
          <div className="prose prose-lg max-w-none mb-16">
            <PortableText value={data.contentBody} />
          </div>
        ) : (
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-muted-foreground">
              Prestige Bali is dedicated to crafting unforgettable luxury experiences across
              Indonesia&apos;s most breathtaking destinations. With years of expertise in luxury
              travel, we specialize in curating bespoke itineraries that combine cultural
              immersion, adventure, and relaxation in equal measure.
            </p>
          </div>
        )}

        {/* Experiences Section */}
        {experienceTypes && experienceTypes.length > 0 && (
          <div className="mt-20 pt-16 border-t">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experienceTypes.map((exp) => (
                <div key={exp._id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.description || 'Premium experience'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
