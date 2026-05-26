import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

const CATEGORY_HREFS: Record<string, string> = {
  'Day Tour': '/day-tours',
  'Day Tours': '/day-tours',
  'Holiday Package': '/holiday-packages',
  'Holiday Packages': '/holiday-packages',
};

export async function GET() {
  try {
    const packages = await client.fetch<
      { _id: string; title: string; slug: string; mainCategory: string }[]
    >(
      `*[_type == "tourPackage" && isActive == true] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        mainCategory
      }`
    );

    const grouped = new Map<string, { title: string; slug: string }[]>();
    for (const pkg of packages) {
      const cat = pkg.mainCategory || 'Other';
      if (!grouped.has(cat)) grouped.set(cat, []);
      grouped.get(cat)!.push({ title: pkg.title, slug: pkg.slug });
    }

    const categories = Array.from(grouped.entries()).map(([category, items]) => ({
      category,
      href: CATEGORY_HREFS[category] ?? `/packages?category=${encodeURIComponent(category)}`,
      items,
    }));

    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([]);
  }
}
