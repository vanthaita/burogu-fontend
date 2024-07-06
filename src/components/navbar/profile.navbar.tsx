'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideHome, LucideUser, LucideSettings } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  {
    name: 'Posts',
    href: '/',
    icon: LucideHome,
  },
  {
    name: 'Bookmarks',
    href: '/profile',
    icon: LucideUser,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: LucideSettings,
  },
];

const ProfileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-4 rounded-md 2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              'flex items-center rounded-md px-3  border-2 border-gray-500 shadow-md  py-2 text-sm font-medium hover:underline hover:bg-accent hover:accent-foreground',
              { 'bg-accent text-accent-foreground': pathname === item.href }
            )}
          >
            <item.icon className="h-4 w-4 text-primary mr-2" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default ProfileNavbar;
