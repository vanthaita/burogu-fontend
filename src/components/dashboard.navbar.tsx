'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
interface NavItem {
    name: string
    href: string
  }
  
  export const navItems: NavItem[] = [
    {
      name: 'Home',
      href: '/dashboard',
    },
    {
      name: 'Create Post',
      href: '/new-post',
    },
    {
      name: 'Setting',
      href: '/setting',
    }
  ];
  
const DashboardNavbar = () => {
  return (
    <nav className=' grid items-start gap-2 rounded-md'>
            {navItems.map((item, index) => (
                <Link key={index} href={item.href}>
                    <span className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:underline hover:bg-accent hover:accent-foreground ", 
                    )}>
                        {/* {item && <item.icon className='mr-2 h-4 w-4 text-primary'/>} */}
                        <span>{item.name}</span>
                    </span>
                </Link>
            ))}
        </nav>
  )
}

export default DashboardNavbar
