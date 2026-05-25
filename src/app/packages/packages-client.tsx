'use client';

  import { useState, useEffect, useMemo } from 'react';
  import { useSearchParams } from 'next/navigation';
  import type { SanityDocument } from 'next-sanity';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Checkbox } from '@/components/ui/checkbox';
  import { Label } from '@/components/ui/label';
  import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
  import { Slider } from '@/components/ui/slider';
  import { TourCard } from '@/components/tour-card';
  import { Filter } from 'lucide-react';

  interface PackagesClientProps {
      allPackages: SanityDocument[];
      experienceTypes: SanityDocument[];
      destinations: SanityDocument[];
  }

  export function PackagesClient({ allPackages, experienceTypes, destinations }: PackagesClientProps) {
      const searchParams = useSearchParams();
      
      const maxPrice = useMemo(() => {
          if (!allPackages || allPackages.length === 0) return 3000;
          return Math.ceil(Math.max(...allPackages.map(p => p.priceFrom ?? 0)));
      }, [allPackages]);

      const [filters, setFilters] = useState<{
          destinations: string[];
          categories: string[];
          price: number[];
      }>({
          destinations: [],
          categories: [],
          price: [0, maxPrice],
      });

      useEffect(() => {
          setFilters(prev => ({ ...prev, price: [0, maxPrice] }));
      }, [maxPrice]);
      
      useEffect(() => {
          const destinationParam = searchParams.get('destination');
          const categoryParam = searchParams.get('category');
          
          setFilters(prev => ({
              ...prev,
              destinations: destinationParam ? [destinationParam] : [],
              categories: categoryParam ? [categoryParam] : [],
          }));

      }, [searchParams]);

      const handleDestinationChange = (dest: string) => {
          setFilters(prev => ({
              ...prev,
              destinations: prev.destinations.includes(dest)
                  ? prev.destinations.filter(d => d !== dest)
                  : [...prev.destinations, dest]
          }));
      };

      const handleCategoryChange = (cat: string) => {
          setFilters(prev => ({
              ...prev,
              categories: prev.categories.includes(cat)
                  ? prev.categories.filter(c => c !== cat)
                  : [...prev.categories, cat]
          }));
      };

      const handlePriceChange = (value: number[]) => {
          setFilters(prev => ({
              ...prev,
              price: value,
          }));
      };
      
      const resetFilters = () => {
          setFilters({
              destinations: [],
              categories: [],
              price: [0, maxPrice],
          });
      }

      const filteredPackages = useMemo(() => {
          if (!allPackages) return [];
          return allPackages.filter(pkg => {
              const destMatch = filters.destinations.length === 0 || filters.destinations.includes(pkg.destination);
              // Match by mainCategory (nav dropdown) or by experienceType title (sidebar checkbox)
              const catMatch = filters.categories.length === 0 ||
                  filters.categories.includes(pkg.mainCategory) ||
                  filters.categories.includes(pkg.category);
              const price = pkg.priceFrom ?? 0;
              const priceMatch = price >= filters.price[0] && price <= filters.price[1];
              return destMatch && catMatch && priceMatch;
          });
      }, [allPackages, filters]);

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
                                          checked={filters.destinations.includes(dest.name)}
                                          onCheckedChange={() => handleDestinationChange(dest.name)}
                                      />
                                      <Label htmlFor={`dest-${dest.name}`}>{dest.name}</Label>
                                  </div>
                              ))}
                          </div>
                      </div>
                       <div>
                          <h4 className="font-semibold mb-3">Experience Type</h4>
                          <div className="space-y-2">
                              {experienceTypes.map(cat => (
                                  <div key={cat._id} className="flex items-center gap-2">
                                      <Checkbox
                                          id={`cat-${cat.title}`}
                                          checked={filters.categories.includes(cat.title)}
                                          onCheckedChange={() => handleCategoryChange(cat.title)}
                                      />
                                      <Label htmlFor={`cat-${cat.title}`}>{cat.title}</Label>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-3">Price Range</h4>
                          <Slider
                              min={0}
                              max={maxPrice}
                              step={100}
                              value={filters.price}
                              onValueChange={handlePriceChange}
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-2">
                              <span>${filters.price[0]}</span>
                              <span>${filters.price[1]}</span>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </aside>
      );

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
             
              <div className="flex-1">
                  {filteredPackages.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                          {filteredPackages.map(pkg => (
                              <TourCard key={pkg._id} id={pkg._id} {...pkg} />
                          ))}
                      </div>
                  ) : (
                      <div className="text-center py-16">
                          <h3 className="text-2xl font-semibold mb-2">No Packages Found</h3>
                          <p className="text-muted-foreground">Try adjusting your filters to find more packages.</p>
                      </div>
                  )}
              </div>
          </div>
      );
  }
  