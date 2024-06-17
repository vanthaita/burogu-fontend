import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { calculatorTime } from '@/utils/calculator.time';
const CardPost = ({authorName, time, title, tags, authorId, postId, countComments} : {
    authorName: string,
    time: string,
    title: string,
    tags: string,
    authorId: string,
    postId: string,
    countComments: number
}) => {
  return (
    <Card className='relative w-full'>
      <CardHeader className='flex flex-row space-x-2'>
        <div>
          <Avatar className='h-10 w-10 rounded-full'>
            <AvatarImage src={'https://github.com/shadcn.png'} alt="" />
            <AvatarFallback>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col gap-y-1 text-sm'>
            <span>{authorName || 'Ta Thai'}</span>
            <span className='text-xs'>{calculatorTime(time) || '10 Hours'}</span>
          </div>
            <Link href={`/p/${postId}`}>
                <CardTitle className=' cursor-pointer hover:text-blue-500'>{title || "Difference between Docker, Kubernetes, and Podman for System Design Interview?"}</CardTitle>
            </Link>

          <CardDescription>{tags || "#systemdesign #docker #kubernetes #softwaredevelopment"}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-between items-center'>
        <Button variant="outline" className='border-none bg-card hover:bg-gray-100 gap-x-4 flex'><MessageCircle className='h-4 w-4' /> {countComments} Comments</Button>
        <Button variant='outline' className='border-none bg-card hover:bg-gray-100'>
          <Bookmark />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardPost
