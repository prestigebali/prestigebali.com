'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // When the initial user check is done...
    if (!isUserLoading) {
      // ...and there's no user...
      if (!user) {
        // ...redirect to login, but only if we are not already on the login page
        // to prevent a redirect loop.
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    }
  }, [user, isUserLoading, router, pathname]);

  // While checking for the user, show a global loading screen.
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is NOT logged in and we are ON the login page,
  // we should render the children, which is the LoginPage component.
  if (!user && pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If the user is NOT logged in and we are NOT on the login page,
  // show a loading/redirecting message while the useEffect redirects.
  if (!user) {
    return (
       <div className="flex items-center justify-center h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }
  
  // If we reach here, the user is authenticated, so render the full dashboard layout.
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
