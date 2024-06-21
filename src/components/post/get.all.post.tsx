'use client'
import React, { useState, useEffect } from 'react';
import CardPost from '../card/card.post';
import SkeletonPosts from '../skeletons/skeleton.posts';
import { PostType } from '@/types/type';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/app.provider';
const Posts = () => {
    const pathname = usePathname()
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAppContext();
    useEffect(() => {
        const handleGetPosts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        page: pathname,
                        userId: user?.id
                    }),
                });
                if (!res.ok) {
                    throw new Error('Error fetching posts');
                }

                const data = await res.json();
                setPosts(data.posts);
                
                console.log(data.posts); 
            } catch (err) {
                setLoading(true);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        handleGetPosts();
    }, []);
    
    if(loading) {
        return <SkeletonPosts />
    }   
    
    return (
        <div className=' space-y-6'>
            {posts.map((post: any, index: number) => (
                <div key={index}>
                    <CardPost
                        authorId={post.author?.id}
                        authorName={post.author?.username}
                        title={post?.title}
                        tags={post?.category}
                        time={post?.createdAt}
                        postId={post?.id}
                        countComments={post?.comments.length}
                        countVote={post?.votes.length}
                        bookmarks={post?.bookmarks}
                    />
                </div>
            ))}
        </div>
    );
};

export default Posts;
