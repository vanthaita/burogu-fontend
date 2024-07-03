'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Bookmark, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/app.provider';
import { BookmarkPost } from '@/types/type';

const PostBookmark = ({
  postId,
  bookmarks = [], 
}: { postId: string, bookmarks: BookmarkPost[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkBookmark, setCheckBookmark] = useState(false);
  const { user, token } = useAppContext();
  
  useEffect(() => {
    if (user?.id) {
      const userBookmarks = bookmarks.filter(bookmarkpost => bookmarkpost.userId === user.id);
      setCheckBookmark(userBookmarks.length > 0);
    } else {
      setCheckBookmark(false);
    }
  }, [bookmarks, user]);
  
  const handleBookmark = async () => {

    const action = checkBookmark ? 'remove' : 'add';
    setIsLoading(true);
    try {
      console.log(token);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, userId: user?.id, action }),
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      setCheckBookmark(action === 'add');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={`border-none bg-card hover:bg-gray-100 ${
        checkBookmark ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
      }`}
      onClick={handleBookmark}
      disabled={isLoading}
    >
      {isLoading ? 
        <Loader2 className=' w-4 h-4 animate-spin'/>
          : 
        <Bookmark />
      }
    </Button>
  );
};

export default PostBookmark;
