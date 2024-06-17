import NavbarPost from '@/components/post/navbar.post'
import Post from '@/components/post/post'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col space-y-6 mt-6">
      <div className="container flex flex-col md:grid md:grid-cols-[70px_1fr] gap-6 md:gap-12 flex-1">
        <aside className="hidden md:flex w-[70px] flex-col">
          <NavbarPost />
        </aside>
        <main className="flex w-full flex-col md:flex-row gap-x-4 relative">
          <div className="flex-1">
            <Post />
          </div>
          <div className='w-[30%] h-full'>
            <div className="w-[30%] h-[40vh]  md:absolute md:right-0 md:top-0 hidden md:block">
              <div className='border rounded-md px-6 bg-white h-full'>
                Info
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default page
