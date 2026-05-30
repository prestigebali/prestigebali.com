/**
 * Sanity Image Upload Script for Day Tours
 * 
 * Automatically uploads images from URLs to Sanity and associates them with tours.
 * 
 * SETUP:
 * 1. npm install @sanity/client node-fetch
 * 2. Set environment variables (same as seed-day-tours.ts)
 * 3. Run: npx ts-node scripts/seed-images.ts
 */

import { createClient } from '@sanity/client';
import fetch from 'node-fetch';
import { Readable } from 'stream';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || '',
  apiVersion: '2023-12-01',
});

const tourImagesConfig = [
  {
    tourId: 'tour-luxury-yacht-cruise-tour-snorkeling',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    altText: 'Luxury yacht sailing on turquoise waters',
  },
  {
    tourId: 'tour-devdan-dance-performance-balinese-lunch',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
    altText: 'Traditional performance with fire dancers',
  },
  {
    tourId: 'tour-watersport-adventure-luxury-spa',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    altText: 'Woman enjoying water sports in tropical ocean',
  },
  {
    tourId: 'tour-entertainment-lifestyle-luxury-adventure',
    imageUrl: 'https://images.unsplash.com/photo-1519671482677-abffc3a3f1fc?w=800&q=80',
    altText: 'Luxury lifestyle and entertainment venue',
  },
  {
    tourId: 'tour-uluwatu-sunset-kecak-dance-jimbaran-beach-dinner',
    imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
    altText: 'Clifftop temple at golden sunset',
  },
  {
    tourId: 'tour-spa-beach-sunset-luxury-seafood',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-81290573fba2?w=800&q=80',
    altText: 'Spa treatment with ocean sunset view',
  },
  {
    tourId: 'tour-mount-batur-sunrise-jeep-hot-springs',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    altText: 'Breathtaking sunrise over mountain landscape',
  },
  {
    tourId: 'tour-bali-swing-waterfall-experience',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    altText: 'Jungle swing with waterfall backdrop',
  },
  {
    tourId: 'tour-white-water-rafting-jungle-adventure',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    altText: 'Whitewater rafting on river rapids',
  },
  {
    tourId: 'tour-traditional-villages-balinese-crafts',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    altText: 'Traditional Balinese village and crafts',
  },
];

async function uploadImageFromUrl(imageUrl: string, altText: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = await response.buffer();
    const asset = await client.assets.upload('image', Readable.from([buffer as any]), {
      filename: `tour-image-${Date.now()}.jpg`,
    });

    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: altText,
      hotspot: {
        _type: 'sanity.imageHotspot',
        x: 0.5,
        y: 0.5,
        height: 0.8,
        width: 0.8,
      },
    };
  } catch (error: any) {
    console.error(`Failed to upload: ${error.message}`);
    return null;
  }
}

async function seedImages() {
  try {
    console.log('🖼️  Uploading images for day tours...\n');

    let success = 0, failure = 0;

    for (const tourImage of tourImagesConfig) {
      try {
        const imageData = await uploadImageFromUrl(tourImage.imageUrl, tourImage.altText);
        if (!imageData) { failure++; continue; }

        await client.patch(tourImage.tourId).set({ featuredImage: imageData }).commit();
        console.log(`✅ ${tourImage.tourId}`);
        success++;
      } catch (error: any) {
        console.error(`❌ ${tourImage.tourId}: ${error.message}`);
        failure++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✨ Image upload complete: ✅ ${success} | ❌ ${failure}`);
    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

seedImages();
