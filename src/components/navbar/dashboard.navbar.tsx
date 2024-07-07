'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LucideHome } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Home, List, Mic, Video, Tag, HelpCircle, Info, Mail, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

interface NavItem {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}
  

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Listings',
    href: '/listings',
    icon: List,
  },
  {
    name: 'Podcasts',
    href: '/podcasts',
    icon: Mic,
  },
  {
    name: 'Videos',
    href: '/videos',
    icon: Video,
  },
  {
    name: 'Tags',
    href: '/tags',
    icon: Tag,
   
  },
  {
    name: 'FAQ',
    href: '/faq',
    icon: HelpCircle,
  },
  {
    name: 'About',
    href: '/about',
    icon: Info,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];
const navbarSocial: NavItem[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: 'https://www.twitter.com',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://www.github.com',
    icon: Github,
  },
] 

const DashboardNavbar = () => {
  const pathname = usePathname()
  return (
    <nav className=' grid items-start gap-4 rounded-md'>
      {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
              <span className={cn(
                  `group flex items-center rounded-md px-3 py-2 text-sm border-2 border-gray-500 shadow-md font-medium hover:underline hover:bg-accent hover:accent-foreground 
                  `, { 'bg-accent text-accent-foreground': pathname.startsWith(item.href) }
              )}>
                  {/* {item && <item.icon className='mr-2 h-4 w-4 text-primary'/>} */}
                  <item.icon className='h-4 w-4 text-primary mr-2' />
                  <span>{item.name}</span>
              </span>
          </Link>
      ))}
       <div className='flex justify-around'>
        {navbarSocial.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className='flex items-center justify-center border-2 border-primary rounded-full w-8 h-8'>
              <item.icon className='h-4 w-4 text-primary' />
            </div>
          </Link>
        ))}
    </div>
    </nav>
  )
}

export default DashboardNavbar
