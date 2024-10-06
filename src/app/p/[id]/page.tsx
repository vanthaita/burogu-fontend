'use client'
import NavbarPost from '@/components/navbar/navbar.post'
import Post from '@/components/post/post'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/app.provider';
import { BookmarkPost, PostType } from '@/types/type';
import { Comments } from '@/types/type';

const Page = () => {
  const router = useParams();
  const { id: postId } = router;
  const { user } = useAppContext();
  const [post, setPost] = useState<PostType | null>(null);
  const [listComment, setListComment] = useState<Comments[]>([]);
  const [countVote, setCountVote] = useState<number>(0);

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
        const data = await res.json();
        setPost(data.post);
        setListComment(data.post.comments);
        setCountVote(data.post.votes.length);
      } catch (err) {
        console.log(err);
      }
    };

    if (postId) {
      handleGetPost();
    }
  }, [postId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col space-y-6 mt-6">
      <div className="md:container flex flex-col md:grid md:grid-cols-[70px_1fr] gap-6 md:gap-12 flex-1">
        <aside className="hidden md:flex w-[70px] flex-col">
          <NavbarPost postId={postId as string} countVote={countVote} setCountVote={setCountVote} bookmarks={post?.bookmarks as BookmarkPost[]} />
        </aside>
        <main className="flex w-full flex-col md:flex-row gap-x-4 relative">
          <div className="flex-1">
            <Post postId={postId as string} post={post as PostType} listComment={listComment} setListComment={setListComment} />
          </div>
          <div className='w-[30%] h-full'>
            <div className="w-[30%] h-[40vh] md:absolute md:right-0 md:top-0 hidden md:block">
              <div className='border rounded-md px-6 h-full'>
                {/* Quang cao */}
              </div>
            </div>
          </div>
        </main>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 px-2 py-1 bg-black text-white rounded-full shadow-md hover:bg-gray-800"
        >
        <span className="block md:hidden">↑</span>
        <span className="hidden md:block">↑ {'Back to Top'}</span>
        </button>
    </div>
  )
}

export default Page;
