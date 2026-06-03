'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';

interface TourPackage {
  _id: string;
  title: string;
  slug: string;
  category: {
    _id: string;
    title: string;
    displayOrder: number;
  };
  mainImage: any;
  price: number;
  shortDescription: string;
  destination: {
    name: string;
  };
}

interface Category {
  _id: string;
  title: string;
  displayOrder: number;
  color: string;
}

export default function TourPackageFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all active categories ordered by displayOrder
        const categoriesData = await client.fetch(`
          *[_type == "tourCategory" && isActive == true] | order(displayOrder asc) {
            _id,
            title,
            displayOrder,
            color
          }
        `);
        setCategories(categoriesData);

        // Fetch all active packages with full details
        const packagesData = await client.fetch(`
          *[_type == "tourPackage" && isActive == true] {
            _id,
            title,
            slug,
            price,
            shortDescription,
            mainImage,
            category->{
              _id,
              title,
              displayOrder
            },
            destination->{
              name
            }
          } | order(category->displayOrder asc, title asc)
        `);
        setPackages(packagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPackages = selectedCategory
    ? packages.filter(pkg => pkg.category._id === selectedCategory)
    : packages;

  if (loading) {
    return <div className="text-center py-12">Loading tour packages...</div>;
  }

  return (
    <div className="py-12 px-4">
      <h2 className="text-4xl font-bold mb-2 text-center">All Tour Packages</h2>
      <p className="text-center text-gray-600 mb-8">Filter by category to find your perfect adventure</p>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Packages ({packages.length})
        </button>
        {categories.map(category => {
          const count = packages.filter(pkg => pkg.category._id === category._id).length;
          return (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category._id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category._id ? category.color : undefined,
              }}
            >
              {category.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Tour Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => (
          <div
            key={pkg._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
          >
            {pkg.mainImage && (
              <div className="relative w-full h-48">
                <img
                  src={`${pkg.mainImage.asset.url}?w=400&h=250&fit=crop`}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                  {pkg.category.title}
                </p>
                {pkg.destination && (
                  <p className="text-xs text-gray-500">{pkg.destination.name}</p>
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {pkg.shortDescription}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-blue-600 font-bold text-xl">${pkg.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No packages found in this category.</p>
          <p className="text-sm">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
