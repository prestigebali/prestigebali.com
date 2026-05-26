import { client } from '@/lib/sanity';
import { HeaderClient, type ProgramCategory } from './header-client';

const CATEGORY_HREFS: Record<string, string> = {
  'Day Tour': '/day-tours',
  'Day Tours': '/day-tours',
  'Holiday Package': '/holiday-packages',
  'Holiday Packages': '/holiday-packages',
};

function categoryHref(category: string): string {
  return CATEGORY_HREFS[category] ?? `/packages?category=${encodeURIComponent(category)}`;
}

async function getNavPrograms(): Promise<ProgramCategory[]> {
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

  return Array.from(grouped.entries()).map(([category, items]) => ({
    category,
    href: categoryHref(category),
    items,
  }));
}

export async function Header() {
  let programCategories: ProgramCategory[] = [];
  try {
    programCategories = await getNavPrograms();
  } catch (err) {
    console.error('Failed to load nav programs:', err);
    programCategories = [
      { category: 'Day Tour', href: '/day-tours', items: [] },
      { category: 'Holiday Packages', href: '/holiday-packages', items: [] },
    ];
  }
  return <HeaderClient programCategories={programCategories} />;
}
