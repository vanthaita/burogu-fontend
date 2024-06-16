'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { AwardIcon, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Post = () => {
    const router = useParams();
    const { id:postId } = router;
    const [post, setPost] = useState(null);
    console.log(postId);
    useEffect(() => {
        const handelGetPost = async () => {
            try {
                const res = await fetch('http://localhost:8080/get-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId }),
                });
                const data = await res.json();
                setPost(data.post);
            } catch (err) {
                console.log(err);
            }
        };
        
        if (postId) {
            handelGetPost();
        }
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const { author, createdAt,title, category, content, comments } = post;

    return (
        <Card className='relative w-[80%]'>
            <CardHeader className='flex flex-row space-x-2'>
                <div>
                    <Avatar className='h-10 w-10 rounded-full'>
                        <AvatarImage src={'https://github.com/shadcn.png'} alt="" />
                        <AvatarFallback>
                            {/* {authorName} */}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className='space-y-2'>
                    <div className='flex flex-col gap-y-1 text-sm'>
                        <span>{author.username || 'Unknown Author'}</span>
                        <span className='text-xs'>{ createdAt || 'Unknown Time'}</span>
                    </div>
                    <Link href={`/p/${postId}`}>
                        <CardTitle className='cursor-pointer hover:text-blue-500'>
                            {title || "Untitled Post"}
                        </CardTitle>
                    </Link>
                    <CardDescription>{category || "#untagged"}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Top Comments</h3>
                <ul className='space-y-2'>
                    {/* {comments.map((comment: any, index: number) => (
                        <li key={index} className='border-b pb-2'>
                            <div className='flex items-center space-x-2'>
                                <Avatar className='h-6 w-6 rounded-full'>
                                    <AvatarImage src={comment.avatar || 'https://github.com/shadcn.png'} alt="" />
                                    <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className='text-sm font-medium'>{comment.authorName}</span>
                            </div>
                            <p className='text-sm'>{comment.text}</p>
                        </li>
                    ))} */}
                </ul>
            </div>
        </Card>
    );
};

export default Post;
