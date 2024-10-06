import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '../theme.toggle'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import UserNav from './user.navbar'
import { useAppContext } from '@/context/app.provider'

const Navbar = () => {
    const {user} = useAppContext();
    return (
        <nav className='border-b h-[8vh] flex items-center bg-card dark:bg-card-dark sticky top-0 z-10'>
            <div className='container flex items-center justify-between'>
                <Link href="/">
                <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Burogu<span className='text-blue-500'>.dev</span></h1>
                </Link>

                { user !== null ? (
                <div className='flex items-center gap-x-2 md:gap-x-3 lg:gap-x-5'>
                    <Link href={`/new-post/${user.id}`}>
                        <Button className=' text-sm md:text-base lg:text-lg hover:bg-blue-500 hover:text-white hover:underline border-blue-700 hidden md:flex bg-card dark:bg-card-dark ' variant='outline'>Create Post</Button>
                    </Link>
                    <Button variant='outline' className='border-none bg-card dark:bg-card-dark'>
                        <Bell className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
                    </Button>
                    <UserNav
                        name={user.username}
                        email={user.email}
                        image={'https://github.com/shadcn.png'}
                    />
                    {/* <ThemeToggle /> */}
                    </div>
                ) : (
                <div className='flex items-center gap-x-2 md:gap-x-3 lg:gap-x-5'>
                    <Link href='/login'>
                        <Button className='text-sm md:text-base lg:text-lg border-none hover:underline hover:text-blue-700' variant='outline'>Log in</Button>
                    </Link>
                    <Link href='/register'>
                        <Button variant='outline' className='border-blue-700 text-sm md:text-base lg:text-lg hover:underline hover:bg-blue-500 hover:text-white'>
                            Create account
                        </Button>
                    </Link>
                </div>  
                )}
            </div>
        </nav>
    )
}

export default Navbar
