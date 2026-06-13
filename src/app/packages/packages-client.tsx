'use client';

import { useState } from 'react';
import type { SanityDocument } from 'next-sanity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { TourCard } from '@/components/tour-card';
import { Filter, ChevronDown } from 'lucide-react';

interface PackagesClientProps {
  dayTours: SanityDocument[];
  holidayPackages: SanityDocument[];
  destinations: SanityDocument[];
}

export function PackagesClient({ dayTours, holidayPackages, destinations }: PackagesClientProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Day Tour');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const handleDestinationChange = (dest: string) => {
    setSelectedDestinations(prev =>
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const resetFilters = () => {
    setSelectedDestinations([]);
    setExpandedCategory('Day Tour');
  };

  // Group packages by destination
  const groupByDestination = (packages: SanityDocument[]) => {
    const grouped: { [key: string]: SanityDocument[] } = {};
   packages.forEach(pkg => {
  if (!pkg || !pkg._id) return; // Skip invalid packages
  const dest = pkg.destination || 'Other';
      if (!grouped[dest]) {
        grouped[dest] = [];
      }
      grouped[dest].push(pkg);
    });
    return grouped;
  };

  const dayToursGrouped = groupByDestination(dayTours);
  const holidayPackagesGrouped = groupByDestination(holidayPackages);

  // Filter by selected destinations
  const filterPackages = (grouped: { [key: string]: SanityDocument[] }) => {
    if (selectedDestinations.length === 0) return grouped;
    const filtered: { [key: string]: SanityDocument[] } = {};
    selectedDestinations.forEach(dest => {
      if (grouped[dest]) {
        filtered[dest] = grouped[dest];
      }
    });
    return filtered;
  };

  const filteredDayTours = filterPackages(dayToursGrouped);
  const filteredHolidayPackages = filterPackages(holidayPackagesGrouped);

  const FilterSidebar = () => (
    <aside className="lg:w-72 lg:flex-shrink-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Destination</h4>
            <div className="space-y-2">
              {destinations.map(dest => (
                <div key={dest._id} className="flex items-center gap-2">
                  <Checkbox
                    id={`dest-${dest.name}`}
                    checked={selectedDestinations.includes(dest.name)}
                    onCheckedChange={() => handleDestinationChange(dest.name)}
                  />
                  <Label htmlFor={`dest-${dest.name}`}>{dest.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );

  const CategorySection = ({
    title,
    groupedPackages,
    categoryKey
  }: {
    title: string;
    groupedPackages: { [key: string]: SanityDocument[] };
    categoryKey: string;
  }) => {
    const isExpanded = expandedCategory === categoryKey;
    const isEmpty = Object.keys(groupedPackages).length === 0;

    return (
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedCategory(isExpanded ? null : categoryKey)}
          className="w-full flex items-center justify-between p-6 bg-muted hover:bg-muted/80 transition-colors"
        >
          <h2 className="text-2xl font-bold">{title}</h2>
          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <div className="p-6 space-y-8">
            {isEmpty ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No packages available for selected destinations.</p>
              </div>
            ) : (
              Object.entries(groupedPackages).map(([destination, packages]) => (
                <div key={destination}>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{destination}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {packages.filter(pkg => pkg && pkg._id).map(pkg => (
  <TourCard key={pkg._id} id={pkg._id} {...pkg} />
))}
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block">
        <FilterSidebar />
      </div>

      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Filters</SheetTitle>
            </SheetHeader>
            <FilterSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 space-y-6">
        <CategorySection
          title="Day Tours"
          groupedPackages={filteredDayTours}
          categoryKey="Day Tour"
        />
        <CategorySection
          title="Holiday Packages"
          groupedPackages={filteredHolidayPackages}
          categoryKey="Holiday Package"
        />
      </div>
    </div>
  );
}
