export default async function AboutPage() {
  let aboutPageData: AboutPageData | null = null;
  let experienceTypes: SanityDocument[] = [];

  try {
    [aboutPageData, experienceTypes] = await Promise.all([
      client.fetch<AboutPageData | null>(
        `*[_type == "aboutPage" && _id == "aboutPage"][0] {
          _id,
          "title": heroHeadline,
          "description": contentBody,
          heroImage
        }`
      ),
      client.fetch<SanityDocument[]>('*[_type == "experience"] | order(title asc) { _id, title, description }'),
    ]);
  } catch (err) {
    console.error('Failed to fetch Sanity data for /about:', err);
  }
  // ... rest of the code
}
