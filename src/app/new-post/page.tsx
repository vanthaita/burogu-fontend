

import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import PostEditor from '@/components/editor/post.editor';
const Page = () => {
  return (
    <div className=" w-full flex">
        <div className=" w-full p-5 rounded-r-xl">
            {/* {Back arrow} */}
            <Link href={"/"} className="w-min flex text-lg items-center ">
                <span className='flex items-center space-x-2'><ArrowLeft />Exit</span>
            </Link>
            {/* {Post editor} */}
            <div className="my-2">
                <PostEditor />
            </div>
        </div>
    </div>
  )
}

export default Page
