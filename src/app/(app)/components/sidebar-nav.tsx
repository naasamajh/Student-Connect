'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  UserCircle2,
  Users,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Lightbulb,
  Network,
} from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  user: UserProfile;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/profile', label: 'Profile', icon: UserCircle2 },
  { href: '/groups', label: 'Groups', icon: Users },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export function SidebarNav({ user }: SidebarNavProps) {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Network className="h-8 w-8 text-sidebar-primary" />
          {sidebarState === 'expanded' && (
            <h1 className="text-xl font-semibold text-sidebar-foreground">Nexus</h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={sidebarState === 'collapsed' ? item.label : undefined}
                  className={cn(
                    "justify-start",
                    sidebarState === 'collapsed' && "justify-center"
                  )}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    {sidebarState === 'expanded' && <span>{item.label}</span>}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4">
        <Link href="/profile" passHref legacyBehavior>
          <Button variant="ghost" className={cn(
            "w-full justify-start gap-2 p-2 h-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            sidebarState === 'collapsed' && "justify-center aspect-square p-0"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {sidebarState === 'expanded' && (
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">{user.name}</span>
                <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
              </div>
            )}
          </Button>
        </Link>
         {sidebarState === 'expanded' && (
           <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground mt-2">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
         )}
         {sidebarState === 'collapsed' && (
           <Button variant="ghost" size="icon" className="w-full aspect-square text-sidebar-foreground/80 hover:text-sidebar-foreground mt-2">
            <LogOut className="h-5 w-5" />
          </Button>
         )}

      </SidebarFooter>
    </>
  );
}
