import { writeBatch, Firestore, doc } from 'firebase/firestore';
import { allPackages as staticPackages } from './packages';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export async function seedPackages(db: Firestore) {
  const batch = writeBatch(db);

  staticPackages.forEach((pkg) => {
    const docRef = doc(db, 'tour_packages', pkg.id);
    // For a batch write, we can't specify each individual doc, so we'll have to rely on a more generic path.
    // However, for the purpose of this seeding, we can assume the operation is 'write' on the collection.
    // The error will still be informative.
    batch.set(docRef, pkg);
  });

  // CRITICAL: Do NOT wrap batch.commit() in a try/catch.
  // Chain a .catch() to handle permission errors specifically.
  batch.commit()
    .then(() => {
      console.log('Successfully seeded packages!');
      alert('Successfully seeded packages!');
    })
    .catch((error) => {
      // This will now catch the permission error and create a detailed, contextual error.
      console.error("Seeding failed:", error);

      // We create a generic error for the whole batch operation.
      // A more granular approach might be needed for other use cases,
      // but this is sufficient for a seeding script.
      const permissionError = new FirestorePermissionError({
        path: 'tour_packages',
        operation: 'write', // Batch write can be considered a 'write' operation.
        requestResourceData: { note: 'This was a batch operation for multiple documents.' }
      });
      
      // Emit the specialized error to be caught by the global listener.
      errorEmitter.emit('permission-error', permissionError);
      
      // We can still alert the user, but the real error is in the dev overlay.
      alert('Error seeding packages. Check the Next.js error overlay for details.');
    });
}
