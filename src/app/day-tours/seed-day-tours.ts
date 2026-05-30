/**
 * Sanity Data Seeding Script for Day Tours
 * 
 * Usage:
 * npx ts-node scripts/seed-day-tours.ts
 * 
 * This script populates your Sanity CMS with luxury day tour packages.
 * Make sure you have SANITY_API_WRITE_TOKEN environment variable set.
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || '',
  apiVersion: '2023-12-01',
});

// Day Tour Data
const dayToursData = [
  {
    title: 'Luxury Yacht Cruise Tour + Snorkeling',
    shortDescription: 'Experience pristine waters, vibrant marine life, and luxury aboard a private yacht.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Embark on an unforgettable luxury yacht cruise combined with world-class snorkeling. Discover hidden coves, pristine coral reefs, and encounter tropical fish in their natural habitat. Your day includes a gourmet lunch prepared onboard, professional snorkeling equipment, and personalized service from our expert crew.',
          },
        ],
      },
    ],
    priceFrom: 350,
    currency: 'USD',
    duration: '8 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Private yacht', 'Snorkeling equipment', 'Gourmet lunch', 'Professional guide', 'Drinks and snacks'],
    destination: 'Bali',
  },
  {
    title: 'Devdan Dance Performance + Balinese Lunch',
    shortDescription: 'Immerse yourself in Balinese culture with a spectacular fire dance and traditional meal.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the magic of Devdan Theatre\'s award-winning performances featuring acrobatics, fire dancing, and traditional Balinese dance. Followed by an authentic Balinese lunch at a local restaurant with a cultural guide explaining the traditions and customs of Bali.',
          },
        ],
      },
    ],
    priceFrom: 180,
    currency: 'USD',
    duration: '6 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Devdan show ticket', 'Balinese lunch', 'Hotel transfers', 'Cultural guide'],
    destination: 'Bali',
  },
  {
    title: 'Watersport Adventure + Luxury Spa',
    shortDescription: 'Combine thrilling water sports with a relaxing spa treatment at a luxury resort.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start your day with exciting watersports including surfing, jet skiing, or paddleboarding at Bali\'s best beaches. After lunch, unwind with a full spa treatment at a luxury wellness resort. Perfect for adventure seekers who also crave relaxation.',
          },
        ],
      },
    ],
    priceFrom: 280,
    currency: 'USD',
    duration: '10 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Watersport equipment', 'Instructor', 'Lunch', '90-minute spa treatment', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'ENTERTAINMENT & LIFESTYLE – Luxury Adventure',
    shortDescription: 'An all-day adventure combining entertainment, dining, and exclusive lifestyle experiences.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A curated day of luxury entertainment and lifestyle activities. Visit upscale venues, enjoy gourmet dining experiences, attend live performances, and explore Bali\'s most exclusive clubs and entertainment spots with VIP access.',
          },
        ],
      },
    ],
    priceFrom: 420,
    currency: 'USD',
    duration: '10 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['VIP venue access', 'Gourmet meals', 'Premium beverages', 'Entertainment', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'Uluwatu Sunset, Kecak Dance & Jimbaran Beach Dinner',
    shortDescription: 'Witness an iconic Balinese fire dance at sunset, followed by fresh seafood on the beach.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the legendary Kecak fire dance at the clifftop Uluwatu Temple as the sun sets over the Indian Ocean. Followed by a romantic beachfront dinner at Jimbaran Beach with fresh grilled seafood, soft sand, and ocean breezes.',
          },
        ],
      },
    ],
    priceFrom: 320,
    currency: 'USD',
    duration: '6 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Uluwatu Temple entry', 'Kecak show', 'Beachfront dinner', 'Beverages', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'Spa - Beach Sunset & Luxury Seafood',
    shortDescription: 'Rejuvenate with spa treatments, then enjoy sunset and fresh seafood on a pristine beach.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start with a luxurious spa session at a beachfront resort, then relax with sunset views over the ocean. Conclude with a gourmet seafood dinner featuring the day\'s fresh catch, paired with premium wines.',
          },
        ],
      },
    ],
    priceFrom: 290,
    currency: 'USD',
    duration: '8 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['90-minute spa treatment', 'Beach access', 'Sunset cocktails', 'Gourmet seafood dinner', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'Mount Batur Sunrise Jeep & Hot Springs',
    shortDescription: 'Witness an unforgettable sunrise from Mount Batur, then soak in natural hot springs.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start before dawn for a jeep ride to Mount Batur\'s summit. Watch the sunrise paint the sky while gazing over Bali\'s volcanic landscape. Descend for a relaxing soak in natural hot springs, followed by a traditional Balinese breakfast.',
          },
        ],
      },
    ],
    priceFrom: 220,
    currency: 'USD',
    duration: '7 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Jeep transportation', 'Mountain guide', 'Hot springs entry', 'Breakfast', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'Bali Swing & Waterfall Experience',
    shortDescription: 'Thrilling jungle swings and stunning waterfall hikes in Bali\'s lush rainforest.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience heart-pounding jungle swings suspended over valleys, combined with hikes to breathtaking waterfalls. Perfect photo opportunities and an authentic immersion in Bali\'s natural beauty. Includes lunch at a local restaurant.',
          },
        ],
      },
    ],
    priceFrom: 200,
    currency: 'USD',
    duration: '7 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Jungle swing access', 'Waterfall hiking', 'Professional guide', 'Lunch', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'White Water Rafting & Jungle Adventure',
    shortDescription: 'Navigate thrilling rapids and explore Bali\'s jungle with professional guides.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the adrenaline rush of white water rafting through Bali\'s pristine rivers. Navigate various difficulty levels with expert guides, then explore the surrounding jungle ecosystem. Includes all safety equipment and a hearty lunch.',
          },
        ],
      },
    ],
    priceFrom: 240,
    currency: 'USD',
    duration: '8 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Rafting equipment', 'Professional guide', 'Safety gear', 'Jungle exploration', 'Lunch', 'Hotel transfers'],
    destination: 'Bali',
  },
  {
    title: 'Traditional Villages & Balinese Crafts',
    shortDescription: 'Discover authentic Balinese villages and learn traditional crafts from local artisans.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Visit traditional villages off the beaten path, meet local artisans, and learn about traditional Balinese crafts including woodcarving, batik making, and silver smithing. Enjoy lunch with a local family and gain insight into authentic Balinese life.',
          },
        ],
      },
    ],
    priceFrom: 180,
    currency: 'USD',
    duration: '7 hours',
    mainCategory: 'Day Tour',
    experienceCategory: 'private-luxury-tours',
    inclusions: ['Village guide', 'Craft workshops', 'Family lunch', 'Artisan visits', 'Hotel transfers'],
    destination: 'Bali',
  },
];

async function seedDayTours() {
  try {
    console.log('🌴 Starting Prestige Bali Day Tours seeding...\n');

    // First, fetch all destinations to get their _id references
    const existingDestinations = await client.fetch('*[_type == "destination"]');
    const destinationMap: { [key: string]: string } = {};

    existingDestinations.forEach((dest: any) => {
      destinationMap[dest.name] = dest._id;
    });

    console.log('📍 Found destinations:', Object.keys(destinationMap));
    console.log('');

    // Process each tour
    for (const tour of dayToursData) {
      const destinationId = destinationMap[tour.destination];

      if (!destinationId) {
        console.warn(`⚠️  Skipping "${tour.title}" - Destination "${tour.destination}" not found`);
        continue;
      }

      const tourDoc = {
        _type: 'tourPackage',
        title: tour.title,
        slug: {
          _type: 'slug',
          current: tour.title
            .toLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .replace(/\s+/g, '-'),
        },
        shortDescription: tour.shortDescription,
        description: tour.description,
        priceFrom: tour.priceFrom,
        currency: tour.currency,
        duration: tour.duration,
        mainCategory: tour.mainCategory,
        experienceCategory: tour.experienceCategory,
        inclusions: tour.inclusions,
        destination: {
          _type: 'reference',
          _ref: destinationId,
        },
        isActive: true,
        _id: `tour-${tour.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      };

      try {
        const result = await client.createOrReplace(tourDoc);
        console.log(`✅ Created/Updated: ${result.title}`);
      } catch (error: any) {
        if (error.statusCode === 409) {
          // Document exists, update it
          await client.patch(tourDoc._id).set(tourDoc).commit();
          console.log(`✅ Updated: ${tour.title}`);
        } else {
          console.error(`❌ Error creating ${tour.title}:`, error.message);
        }
      }
    }

    console.log('\n✨ Day Tours seeding completed!\n');
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDayTours();
