'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

export default function PackagesDashboardPage() {
  const firestore = useFirestore();
  
  const packagesCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tour_packages');
  }, [firestore]);

  const { data: packages, isLoading } = useCollection(packagesCollection);

  const handleDelete = async (packageId: string) => {
    if (firestore) {
      if (confirm('Are you sure you want to delete this package?')) {
        await deleteDoc(doc(firestore, 'tour_packages', packageId));
      }
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold">Kelola Paket Wisata</h1>
            <p className="text-muted-foreground">Tambah, edit, atau hapus paket wisata.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/packages/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah Paket Baru
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nama Paket</TableHead>
                <TableHead>Destinasi</TableHead>
                <TableHead className="hidden md:table-cell">Harga</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading packages...</TableCell>
                </TableRow>
              )}
              {!isLoading && packages?.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="hidden sm:table-cell">
                    {pkg.image?.imageUrl && (
                      <Image
                        alt={pkg.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={pkg.image.imageUrl}
                        width="64"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pkg.destination}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${pkg.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(pkg.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
