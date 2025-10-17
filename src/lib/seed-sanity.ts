'use server';

import { getSanityWriteClient } from './sanity-client';
import { allPackages } from './packages';
import { SanityClient } from 'sanity';

// Fungsi untuk mengunggah satu paket
async function uploadPackage(client: SanityClient, pkg: any) {
  const transaction = client.transaction();

  const sanityPackage = {
    _id: `migrated-${pkg.id}`, // Gunakan ID unik untuk menghindari konflik
    _type: 'tourPackage',
    title: pkg.title,
    slug: { _type: 'slug', current: pkg.title.toLowerCase().replace(/\s+/g, '-').slice(0, 95) },
    // Asumsi destination adalah referensi, ini mungkin perlu penyesuaian
    // Untuk saat ini, kita akan membuat destinasi placeholder jika belum ada
    destination: {
      _type: 'reference',
      _ref: `migrated-dest-${pkg.destination.toLowerCase().replace(/\s+/g, '-')}`,
    },
    description: pkg.description,
    price: pkg.price,
    rating: pkg.rating,
    category: pkg.category,
    // Kita tidak bisa mengunggah gambar dari URL secara langsung dengan mudah, jadi kita akan kosongkan ini
    // Anda perlu mengunggah gambar secara manual di Sanity Studio
    image: undefined, 
    duration: pkg.duration || `${Math.floor(Math.random() * 5) + 3} Days`, // Tambahkan durasi placeholder
  };

  const destinationDoc = {
      _id: `migrated-dest-${pkg.destination.toLowerCase().replace(/\s+/g, '-')}`,
      _type: 'destination',
      name: pkg.destination,
      slug: { _type: 'slug', current: pkg.destination.toLowerCase().replace(/\s+/g, '-') },
  };

  // Buat destinasi jika belum ada (createIfNotExists)
  transaction.createIfNotExists(destinationDoc);
  // Buat atau ganti paket tur
  transaction.createOrReplace(sanityPackage);
  
  await transaction.commit();
}

// Fungsi utama untuk migrasi
export async function migratePackagesToSanity() {
  const client = getSanityWriteClient();
  if (!client) {
    const message = 'Sanity write client is not configured. Missing SANITY_API_WRITE_TOKEN.';
    console.error(message);
    return { success: false, message };
  }

  try {
    console.log('Starting migration of packages to Sanity...');
    for (const pkg of allPackages) {
      await uploadPackage(client, pkg);
      console.log(`Successfully migrated package: ${pkg.title}`);
    }
    const successMsg = 'Migration completed successfully!';
    console.log(successMsg);
    return { success: true, message: successMsg };
  } catch (error: any) {
    const errorMsg = `Migration failed: ${error.message}`;
    console.error(errorMsg);
    return { success: false, message: errorMsg };
  }
}
