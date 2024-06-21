'use client'
import React, { useState } from 'react'
import {  ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import { useAppContext } from '@/context/app.provider'
import PostBookmark from './post.bookmark'
import { BookmarkPost } from '@/types/type'

const NavbarPost = ({
  postId,
  countVote,
  setCountVote,
  bookmarks,
}: {
  postId: string,
  countVote: number,
  setCountVote: React.Dispatch<React.SetStateAction<number>>,
  bookmarks: BookmarkPost[],
}) => {
  const [vote, setVote] = useState<number | null>(null);
  const { user, token } = useAppContext();

  const handleVote = async (voteType: number) => {
    if (vote === voteType) return; 
    setVote(voteType);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, userId: user?.id, voteType }),
      });
      const data = await res.json();
      setCountVote(data.countVote);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className='grid items-start gap-2 rounded-md right-0 sticky top-20'>
      <div className='flex flex-col space-y-2 items-center '>
        <Button variant="outline" className={`w-14 h-14 rounded-full border-none ${vote === 1 ? 'border-blue-500 bg-blue-100' : ''}`}
          disabled={vote === 1}
          onClick={() => handleVote(1)}
        >
          <ChevronUp />
        </Button>
            <span className='flex items-center'>{countVote}</span>
        <Button variant="outline" className={`w-14 h-14 rounded-full border-none ${vote === -1 ? 'border-blue-500 bg-blue-100' : ''}`}
          disabled={vote === -1}
          onClick={() => handleVote(-1)}
        >
          <ChevronDown />
        </Button>

        <PostBookmark postId={postId} bookmarks={bookmarks}/>

      </div>
      {/* Bookmark */}
     
    </nav>
  )
}

export default NavbarPost
