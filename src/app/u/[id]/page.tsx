'use client'
import { useParams } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import CardPost from '@/components/card/card.post';
import SkeletonUser from '@/components/skeletons/skeleton.user';
import { Loader2, UserRoundPlus } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app.provider';

const Page = () => {
    const router = useParams();
    const { id: userId } = router;
    const [profile, setProfile] = useState<any>();
    const [checkFriend, setCheckFriend] = useState(false);
    const {user, token} = useAppContext()
    const [isLoading, setIsLoading] = useState<Boolean>(false);  
    useEffect(() => {
        const handleGetPost = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/u/get-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId  }),
            });
            const data = await res.json();
            console.log(data);
            setProfile(data.user);
            setCheckFriend(data.user.followers.includes(user?.id));
          } catch (err) {
            console.log(err);
          }
        };
        
        if (userId) {
          handleGetPost();
        }
    }, [user?.id, userId]);

    if(!profile) {
      return <SkeletonUser />
    }


    
    const handleFollow = async () => {
        const action = checkFriend ? 'remove' : 'add';
        setIsLoading(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/follow`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ followingId: profile.id, followerId: user?.id, action  }),
            credentials: 'include',
          });
          const data = await res.json();
          console.log(data);
          setCheckFriend(action === 'add');
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);  
        }
    }
    return (

        <div className='container mt-10 p-4 rounded-md bg-white dark:bg-transparent mb-10'>
            <div className='flex items-center space-x-4 justify-between mt-4'>
                <div className='flex items-center space-x-4'>
                    <Avatar className='h-20 w-20 rounded-full'>
                        <AvatarImage src={'https://github.com/shadcn.png'} alt="User Avatar" />
                        <AvatarFallback />
                    </Avatar>
                    <div>
                        <h1 className='text-3xl font-bold'>{profile?.username}</h1>
                        <p className='text-gray-600'>{profile?.email}</p>
                        <p className='text-gray-400'>{new Date(profile?.createdAt).toDateString() || ''}</p>
                    </div>
                </div>
                <Button className={`ml-auto  ${checkFriend ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500'} gap-x-4 text-primary px-4 py-2 rounded-md hover:bg-blue-600
                  ${ user?.id === userId && 'hidden'}
                `}
                  disabled={isLoading as boolean}
                  onClick={handleFollow}
                >
                  {isLoading ? (
                      <div className='flex items-center justify-center'>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin text-white" />
                        <span className='text-white'>
                          Loading...
                        </span>
                      </div>
                      ) : (
                      checkFriend ? (
                          <>
                            <UserCheck className='text-white w-6 h-6' />
                            <span className='text-white'>Unfollow</span>
                          </>
                        ) : (
                          <>
                            <UserRoundPlus className='text-white w-6 h-6' />
                            <span className='text-white'>Follow</span>
                          </>
                        )
                  )}
                </Button>
            </div>
            <div className='mt-10 space-y-6 mb-10 h-full'>
                <h2 className='text-xl font-bold'>Posts</h2>
                {profile?.posts.length > 0 ? profile?.posts.map((post: any) => (
                  <div key={post.id}>
                      <CardPost
                          authorId={post.author?.id}
                          authorName={post.author?.username}
                          title={post?.title}
                          tags={post?.category}
                          time={post?.createdAt}
                          postId={post?.id}
                          countComments={post?.comments.length}
                          countVote={post?.votes.length}
                      />
                    </div>
                  )) : (
                    <div className=' items-center justify-center flex min-h-[50vh]'>
                      <p className='text-center text-3xl'>No posts</p>
                    </div>
                  )}
            </div>
        </div>
    )
}

export default Page
