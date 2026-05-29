import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity-client';

const CATEGORY_HREFS: Record<string, string> = {
  'Day Tour': '/day-tours',
  'Day Tours': '/day-tours',
  'Luxury Day Tours': '/day-tours',
  'Holiday Package': '/holiday-packages',
  'Holiday Packages': '/holiday-packages',
};

// Helper function to determine if a package is a day tour or multiday
function getDurationType(duration: string | undefined): 'Day Tour' | 'Holiday Package' {
  if (!duration) return 'Day Tour';

  const lowerDuration = duration.toLowerCase();

  // Day tour indicators: contains "day" but NOT "days", "hour", "hrs", "full day", "half day"
  const dayTourPatterns = [
    /\b\d*\s*hour/i,
    /\b\d*\s*hr/i,
    /\bfull\s*day\b/i,
    /\bhalf\s*day\b/i,
    /\b1\s*day\b/i,
    /\bsingle\s*day\b/i,
  ];

  // Multiday indicators: contains "days", "nights", "d/n", "nights"
  const multidayPatterns = [
    /\b\d+\s*days?\b/i,
    /\b\d+\s*nights?\b/i,
    /\b\d+d\/\d+n\b/i,
    /\b\d+\s*days?\s*\d+\s*nights?\b/i,
    /\bmulti[-\s]?day\b/i,
  ];

  // Check if it's explicitly a multiday package
  for (const pattern of multidayPatterns) {
    if (pattern.test(lowerDuration)) return 'Holiday Package';
  }

  // Check if it's a day tour
  for (const pattern of dayTourPatterns) {
    if (pattern.test(lowerDuration)) return 'Day Tour';
  }

  // Default: if duration contains "day" but not matched above, check for plural
  if (/\bdays\b/i.test(lowerDuration)) return 'Holiday Package';
  if (/\bday\b/i.test(lowerDuration)) return 'Day Tour';

  // Fallback based on mainCategory if duration is ambiguous
  return 'Holiday Package';
}

export async function GET() {
  try {
    const packages = await client.fetch(`
      *[_type == "tourPackage" && isActive == true] | order(title asc) {
        title,
        "slug": slug.current,
        duration,
        mainCategory
      }
    `);

    // Group packages by duration type
    const grouped = packages.reduce((acc: Record<string, typeof packages>, pkg: any) => {
      const durationType = getDurationType(pkg.duration);

      if (!acc[durationType]) {
        acc[durationType] = [];
      }
      acc[durationType].push(pkg);
      return acc;
    }, {});

    // Format for header dropdown
    const result = Object.entries(grouped).map(([category, items]) => ({
      category,
      href: CATEGORY_HREFS[category] || '/packages',
      items: items.map((item: any) => ({
        title: item.title,
        slug: item.slug,
      })),
    }));

    // Sort: Day Tour first, then Holiday Package
    result.sort((a, b) => {
      if (a.category === 'Day Tour') return -1;
      if (b.category === 'Day Tour') return 1;
      return 0;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching nav programs:', error);
    // Return fallback structure
    return NextResponse.json([
      {
        category: 'Day Tour',
        href: '/day-tours',
        items: [],
      },
      {
        category: 'Holiday Packages',
        href: '/holiday-packages',
        items: [],
      },
    ]);
  }
}
