'use client';

import { PackageForm } from '@/components/admin/package-form';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

export default function EditPackagePage() {
  const params = useParams();
  const { id } = params;
  const firestore = useFirestore();

  const packageId = Array.isArray(id) ? id[0] : id;

  const packageDocRef = useMemoFirebase(() => {
    if (!firestore || !packageId) return null;
    return doc(firestore, 'tour_packages', packageId);
  }, [firestore, packageId]);

  const { data: packageData, isLoading } = useDoc(packageDocRef);

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Paket Wisata</h1>
        <p className="text-muted-foreground">Perbarui detail paket wisata di bawah ini.</p>
      </div>
      {isLoading && <p>Loading package data...</p>}
      {packageData && <PackageForm initialData={packageData} />}
    </main>
  );
}
