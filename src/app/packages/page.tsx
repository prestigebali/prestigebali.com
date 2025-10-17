'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourCard } from '@/components/tour-card';
import { destinations as staticDestinations } from '@/lib/packages';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';

const PackagesContent = () => {
    const searchParams = useSearchParams();
    const [allPackages, setAllPackages] = useState<SanityDocument[]>([]);
    const [experienceTypes, setExperienceTypes] = useState<SanityDocument[]>([]);
    const [filters, setFilters] = useState<{
        destinations: string[];
        categories: string[];
        price: number[];
    }>({
        destinations: [],
        categories: [],
        price: [0, 3000],
    });

    useEffect(() => {
        const fetchPackages = async () => {
            const query = `*[_type == "tourPackage"]{
                _id,
                title,
                description,
                price,
                rating,
                image,
                category,
                "destination": destination->name
            }`;
            const data = await client.fetch(query);
            setAllPackages(data);
        };
        const fetchExperiences = async () => {
          const query = `*[_type == "experience"]{_id, title}`;
          const data = await client.fetch(query);
          setExperienceTypes(data);
        }
        fetchPackages();
        fetchExperiences();
    }, []);

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
            price: [0, 3000],
        });
    }

    const filteredPackages = useMemo(() => {
        if (!allPackages) return [];
        return allPackages.filter(pkg => {
            const destMatch = filters.destinations.length === 0 || filters.destinations.includes(pkg.destination);
            const catMatch = filters.categories.length === 0 || filters.categories.includes(pkg.category);
            const priceMatch = pkg.price >= filters.price[0] && pkg.price <= filters.price[1];
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
                            {staticDestinations.map(dest => (
                                <div key={dest.name} className="flex items-center gap-2">
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
                            max={3000}
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
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <section className="py-24 md:py-32 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Packages</h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                                Discover your next unforgettable journey. Filter by destination, experience, and price.
                            </p>
                        </div>
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
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default function PackagesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PackagesContent />
        </Suspense>
    )
}