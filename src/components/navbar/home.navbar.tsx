

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
interface NavItem {
    name: string
    href: string
  }
  
  export const navItems: NavItem[] = [
    {
      name: 'Newest',
      href: '/',
    },
    {
      name: 'Trending',
      href: '/trending',
    },
    {
      name: 'Followings',
      href: '/followings',
    }
  ];

const HomeNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className=' grid grid-flow-col items-start gap-2 rounded-md'>
        {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
                <span className={cn(
                    `group flex items-center rounded-md px-3 py-2 text-sm font-medium border-2 border-gray-500 shadow-md hover:underline hover:bg-white hover:text-blue-500
                      ${pathname === item.href? 'font-bold' : ''}
                    `, 
                )}>
                    {/* {item && <item.icon className='mr-2 h-4 w-4 text-primary'/>} */}
                    <span>{item.name}</span>
                </span>
            </Link>
        ))}
    </nav>
  )
}

export default HomeNavbar
