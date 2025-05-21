import type { PropsWithChildren } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './components/sidebar-nav';
import { AppHeader } from './components/header';
import { currentUser } from '@/lib/mock-data';

export default function AppLayout({ children }: PropsWithChildren) {
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
