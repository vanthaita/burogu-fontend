'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import PostEditor from '@/components/editor/post.editor';
import { useParams, useRouter } from 'next/navigation';
import { PostType } from '@/types/type';
import { useAppContext } from '@/context/app.provider';
import toast from 'react-hot-toast';

const Page = () => {
  const router = useParams();
  const { id: postId } = router;
  const { user } = useAppContext();
  const [post, setPost] = useState<PostType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(user?.id === postId ? false : true);
  const history = useRouter();
  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId }),
        });
        if (!res.ok) {
          throw new Error('Error fetching post');
        }
        const data = await res.json();
        if(data.post.author.id !== user?.id) {
          toast.error("Unauthorized access")
          return history.push('/');
        }
        setPost(data.post);
      } catch (err) {
        console.log(err);
      }
    };
    if (postId && user?.id !== postId) {
      handleGetPost();
    }
  }, [history, postId, user?.id]);
  // console.log(post);
  return (
    <div className="w-full flex">
      <div className="w-full p-5 rounded-r-xl">
        {/* {Back arrow} */}
        <Link href="/" className="w-min flex text-lg items-center">
          <span className='flex items-center space-x-2'><ArrowLeft />Exit</span>
        </Link>
        {/* {Post editor} */}
        <div className="my-2">
          <PostEditor
            postId={postId as string | undefined}
            title={post?.title}
            tags={post?.category}
            authorId={post?.author.id}
            content={post?.content}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
