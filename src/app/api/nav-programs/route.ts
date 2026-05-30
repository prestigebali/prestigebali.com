import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

const CATEGORY_HREFS: Record<string, string> = {
  'Day Tour': '/day-tours',
  'Day Tours': '/day-tours',
  'Luxury Day Tours': '/day-tours',
  'Holiday Package': '/holiday-packages',
  'Holiday Packages': '/holiday-packages',
};

// Helper function to extract hours from duration string
function extractHours(duration: string | undefined): number | null {
  if (!duration) return null;

  const lowerDuration = duration.toLowerCase();

  // Match patterns like "8 hours", "8hrs", "8 hr", "8-hour", "8hour"
  const hoursMatch = lowerDuration.match(/(\d+)\s*(?:hours?|hrs?|hour|hr)/i);
  if (hoursMatch) {
    return parseInt(hoursMatch[1], 10);
  }

  return null;
}

// Helper function to extract days from duration string
function extractDays(duration: string | undefined): number | null {
  if (!duration) return null;

  const lowerDuration = duration.toLowerCase();

  // Match patterns like "7 days", "7d", "3 days 2 nights", "3D/2N"
  const daysMatch = lowerDuration.match(/(\d+)\s*(?:days?|d)/i);
  if (daysMatch) {
    return parseInt(daysMatch[1], 10);
  }

  return null;
}

// Helper function to determine if a package is a day tour or multiday
function getDurationType(duration: string | undefined): 'Day Tour' | 'Holiday Package' {
  if (!duration) return 'Holiday Package'; // Default to Holiday Package if no duration

  const lowerDuration = duration.toLowerCase();

  // Check for explicit multiday indicators FIRST
  const multidayPatterns = [
    /\b\d+\s*days?\s*\d+\s*nights?\b/i,  // "3 days 2 nights" or "3d/2n"
    /\b\d+d\/\d+n\b/i,                    // "3D/2N"
    /\bmulti[-\s]?day\b/i,                // "multi-day" or "multiday"
  ];

  for (const pattern of multidayPatterns) {
    if (pattern.test(lowerDuration)) {
      // Check if it's at least 7 days
      const days = extractDays(duration);
      if (days !== null && days >= 7) {
        return 'Holiday Package';
      }
    }
  }

  // Check for day tour indicators with hour requirement (min 8 hours)
  const hoursMatch = extractHours(duration);
  if (hoursMatch !== null) {
    if (hoursMatch >= 8) {
      return 'Day Tour';
    }
  }

  // Check for explicit "full day" or "half day"
  if (/\bfull\s*day\b/i.test(lowerDuration)) {
    return 'Day Tour'; // Full day is at least 8 hours typically
  }

  if (/\bhalf\s*day\b/i.test(lowerDuration)) {
    return 'Day Tour'; // Half day can be included
  }

  // Check for single day pattern
  if (/\b1\s*day\b/i.test(lowerDuration) || /\bsingle\s*day\b/i.test(lowerDuration)) {
    return 'Day Tour';
  }

  // Check if it contains days and if >= 7 days
  const days = extractDays(duration);
  if (days !== null && days >= 7) {
    return 'Holiday Package';
  }

  // If it has days but less than 7, check if it qualifies as day tour
  if (days !== null && days === 1) {
    return 'Day Tour';
  }

  // If it has hours and >= 8, it's a day tour
  if (hoursMatch !== null && hoursMatch >= 8) {
    return 'Day Tour';
  }

  // If no clear indicator, default to Holiday Package
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

    // Group packages by duration type (auto-detected)
    const grouped = packages.reduce((acc: Record<string, typeof packages>, pkg: any) => {
      const durationType = getDurationType(pkg.duration);

      if (!acc[durationType]) {
        acc[durationType] = [];
      }
      acc[durationType].push(pkg);
      return acc;
    }, {});

    // Format for header dropdown with empty items
    const result = Object.entries(grouped).map(([category]) => ({
      category,
      href: CATEGORY_HREFS[category] || '/packages',
      items: [],
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
