'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react'
import Link from 'next/link'

interface NavItem {
  name: string
  href: string
}

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
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

const UserNav = ({ name, email, image }: { name: string, email: string, image: string }) => {
  if (!Array.isArray(navItems) || navItems.length === 0) {
    return null; // or handle empty case gracefully
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10 rounded-full'>
            <AvatarImage src={image} alt="" />
            <AvatarFallback>
              {name}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-50' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-sm leading-none text-muted-foreground'>{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link href={item.href} className='w-full flex justify-between items-center'>
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='w-full flex justify-between items-center'>
          <span>Logout</span>
          <span><DoorClosed className='w-4 h-4' /></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
