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
