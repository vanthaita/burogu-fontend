'use client'
import React from 'react'
import { Bookmark, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'

const NavbarPost = () => {
  return (
    <nav className='grid items-start gap-2 rounded-md right-0 sticky top-20'>
        <div className='flex flex-col space-y-2 '>
            <Button variant="outline" className='rounded-full w-12 h-12 bg-card hover:bg-gray-100'>
                <ChevronUp />
            </Button>
            <span className='ml-[15px]'>{"12"}</span>
            <Button variant="outline" className='rounded-full w-12 h-12 bg-card hover:bg-gray-100'>
                <ChevronDown />
            </Button>
        </div>
        {/* Bookmark */}
        <Button variant="outline" className='rounded-full w-12 h-12 bg-card hover:bg-gray-100'>
            <Bookmark />
        </Button>
    </nav>
  )
}

export default NavbarPost
