import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme.toggle'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'
import UserNav from './user.navbar'

const Navbar = () => {
    const loading = true;
    return (
        <nav className='border-b bg-background h-[8vh] flex items-center'>
        <div className='container flex items-center justify-between'>
            <Link href="/">
            <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Burogu<span className='text-blue-500'>.dev</span></h1>
            </Link>

            { !loading ? (
              <div className='flex items-center gap-x-2 md:gap-x-3 lg:gap-x-5'>
                <Button className='text-sm md:text-base lg:text-lg border-none hover:underline hover:text-blue-700' variant='outline'>Log in</Button>
                <Button variant='outline' className='border-blue-700 text-sm md:text-base lg:text-lg hover:underline hover:bg-blue-500 hover:text-white'>
                    Create account
                </Button>
              </div>  
            ) : (
                <div className='flex items-center gap-x-2 md:gap-x-3 lg:gap-x-5'>
                    <Button className=' text-sm md:text-base lg:text-lg hover:bg-blue-500 hover:text-white hover:underline border-blue-700 hidden md:flex' variant='outline'>Create Post</Button>
                    <Button variant='outline' className='border-none'>
                        <Bell className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
                    </Button>
                    <UserNav
                        name={''}
                        email={''}
                        image={'https://github.com/shadcn.png'}
                    />
                    <ThemeToggle />
                </div>
            )}
        </div>
        </nav>
    )
}

export default Navbar
