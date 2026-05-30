import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

const CATEGORY_HREFS: Record<string, string> = {
  'Day Tour': '/day-tours',
  'Day Tours': '/day-tours',
  'Luxury Day Tours': '/day-tours',
  'Holiday Package': '/holiday-packages',
  'Holiday Packages': '/holiday-packages',
};

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

    // Group packages by mainCategory (explicit field from Sanity)
    const grouped = packages.reduce((acc: Record<string, typeof packages>, pkg: any) => {
      const category = pkg.mainCategory || 'Holiday Package'; // Default to Holiday Package if not set

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(pkg);
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
