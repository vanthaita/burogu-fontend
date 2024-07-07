import React from 'react';
import { Card,  CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';  
import toast from 'react-hot-toast';
const ProfileCardPost = ({ title, postId , tags} : {
    title: string,
    postId: string,
    tags: string[] 
}) => {
  const handleDeletePost = () => {
    // Add your own logic to delete the post here
    toast.success('Post deleted successfully');
  }
  return (
    <Card className='relative w-full md:w-[120vh] border-2 border-gray-500 shadow-md flex flex-col md:flex-row justify-between items-center px-2 py-4'>
      <CardHeader className='flex flex-col md:flex-row md:gap-x-2 w-full'>
        <div className='flex flex-col flex-grow gap-y-4'>
          <div className='gap-y-2 flex flex-col'>
            <Link href={`/p/${postId}`}>
              <CardTitle className='cursor-pointer hover:text-blue-500'>{title}</CardTitle>
            </Link>
          </div>
          <div className='gap-2 flex-grow flex flex-wrap'>
            {tags.map((category, index) => (
              <span key={index + 1} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <div className='flex gap-x-4 mt-4 md:mt-0'>
        <Link href={`/new-post/${postId}`}>
          <Button variant='outline' size="icon"> 
            <Edit className='w-4 h-4'/>
          </Button>
        </Link>
        <Button variant='outline' size="icon" onClick={handleDeletePost}>
          <Trash className='w-4 h-4'/>
        </Button>
      </div>
    </Card>
  )
}

export default ProfileCardPost;
