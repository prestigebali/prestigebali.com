'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial loading is finished
    if (!isUserLoading) {
      // If there's no user, redirect to login
      if (!user) {
        router.push('/admin/login');
      }
    }
  }, [user, isUserLoading, router]);

  // While loading, or if there's no user (and the redirect is in progress), show a loading screen.
  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If the user is logged in, render the dashboard layout
  return (
    <SidebarProvider>
      <Sidebar>
        {/* Sidebar content will go here */}
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
