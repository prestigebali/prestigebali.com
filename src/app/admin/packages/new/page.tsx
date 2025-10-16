'use client';

import { PackageForm } from '@/components/admin/package-form';

export default function NewPackagePage() {
  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tambah Paket Wisata Baru</h1>
        <p className="text-muted-foreground">Isi detail paket wisata di bawah ini.</p>
      </div>
      <PackageForm />
    </main>
  );
}
