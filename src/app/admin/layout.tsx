'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, Package, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    }
  }, [user, isUserLoading, router, pathname]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user && pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-4 flex items-center gap-3">
             <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image 
                src="https://res.cloudinary.com/dfinkfssq/image/upload/v1760581094/logo_th6oyh.png" 
                alt="Prestige Bali Logo"
                width={120}
                height={30}
                className={'w-auto h-7'}
              />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/admin/dashboard'}
              >
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/admin/packages')}
              >
                <Link href="/admin/packages">
                  <Package />
                  Kelola Paket
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 sticky top-0 bg-background z-30">
              <SidebarTrigger className="md:hidden"/>
              <div className="flex-1">
                 <h1 className="font-semibold text-lg">
                    Prestige Bali - Admin Panel
                 </h1>
              </div>
          </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
