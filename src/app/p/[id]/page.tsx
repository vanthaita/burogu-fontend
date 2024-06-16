

import NavbarPost from '@/components/post/navbar.post'
import Post from '@/components/post/post'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col space-y-6 mt-6">
        <div className="container grid flex-1 gap-6 md:gap-12 md:grid-cols-[70px_1fr]">
            <aside className="hidden w-[100px] flex-col md:flex">
                <NavbarPost />
            </aside>
            <main className="w-full md:w-auto">
                <Post />
            </main>
        </div>
    </div>
  )
}

export default page
