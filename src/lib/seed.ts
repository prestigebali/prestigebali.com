import { collection, writeBatch, Firestore } from 'firebase/firestore';
import { allPackages as staticPackages } from './packages';

export async function seedPackages(db: Firestore) {
  const packagesCollection = collection(db, 'tour_packages');
  const batch = writeBatch(db);

  staticPackages.forEach((pkg) => {
    // In a real app, you'd want to use the package's own ID if it's meaningful,
    // or let Firestore auto-generate one. Here we use the static ID.
    const docRef = collection(db, 'tour_packages', pkg.id);
    batch.set(docRef, pkg);
  });

  try {
    await batch.commit();
    console.log('Successfully seeded packages!');
    alert('Successfully seeded packages!');
  } catch (error) {
    console.error('Error seeding packages:', error);
    alert('Error seeding packages. Check the console.');
  }
}
