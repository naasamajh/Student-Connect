
"use client"; 

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './components/sidebar-nav';
import { AppHeader } from './components/header';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [currentUser, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading application...</p>
      </div>
    );
  }

  if (!currentUser && pathname !== '/login' && pathname !== '/signup') {
     // Still show loading or a minimal layout while redirecting
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-4 text-xl text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }
  
  // If user is not logged in but tries to access an app route, 
  // they are redirected. If they are on login/signup, this layout won't apply.
  // So, if we reach here and currentUser is null, it's an edge case during redirect.
  // Better to ensure currentUser is available for AppHeader/SidebarNav.
  // The useEffect handles the redirect, this is defensive.
  if (!currentUser) {
      // This should ideally not be reached if redirection logic is correct
      // but as a fallback, we can prevent rendering the main app layout.
      return null; 
  }


  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
        <SidebarNav user={currentUser} />
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <AppHeader user={currentUser} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
