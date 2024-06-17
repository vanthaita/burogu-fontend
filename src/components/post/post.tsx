'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useParams } from 'next/navigation';
import CommentEditor from '../editor/comment.editor';
import { useAppContext } from '@/context/app.provider';
import SkeletonPost from '../skeleton.post';
import { PostType } from '@/types/type';
import { Comments } from '@/types/type';
import { Author } from '@/types/type';

const Post = () => {
    const router = useParams();
    const { id: postId } = router;
    const [post, setPost] = useState<PostType | null>(null);
    const { user } = useAppContext();
    const [listComment, setListComment] = useState<Comments[]>([]);

    useEffect(() => {
        const handleGetPost = async () => {
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
                setListComment(data.post.comments);
                console.log(data.post);
            } catch (err) {
                console.log(err);
            }
        };

        if (postId) {
            handleGetPost();
        }
    }, [postId]);

    const addComment = (newComment: Comments) => {
        setListComment((prevComments) => [...prevComments, newComment]);
    };

    if (!post) {
        return <SkeletonPost />;
    }

    const { author, createdAt, title, category, content } = post;
    const time = new Date(createdAt).toLocaleString();

    return (
        <Card className='relative mb-10 container'>
            <CardHeader className='flex flex-col space-x-2'>
                <div className='space-y-2 flex space-x-4 items-center'>
                    <Avatar className='h-10 w-10 rounded-full'>
                        <AvatarImage src={'https://github.com/shadcn.png'} alt="" />
                        <AvatarFallback>
                            {author.id}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-y-1 text-sm'>
                        <span className='font-bold text-2xl'>{author.username}</span>
                        <span className='text-xs'>{time}</span>
                    </div>
                </div>
                <CardTitle className='text-4xl'>
                    {title || "Untitled Post"}
                </CardTitle>
                <CardDescription>{category || "#untagged"}</CardDescription>
            </CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Top Comments</h3>
                <div className='space-y-2 mt-4'>
                    {listComment.map((comment, index) => (
                        <div key={index} className='gap-x-4 flex'>
                            <div>
                                <Avatar className='h-8 w-8 rounded-full'>
                                    <AvatarImage src={'https://github.com/shadcn.png'} alt="" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </div>
                            <div className='border w-full rounded-md px-6 py-4'>
                                <span className='text-lg font-medium'>{comment?.author?.username}</span>
                                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                            </div>
                        </div>
                    ))}
                </div>
                <CommentEditor addComment={addComment} postId={postId} authorId={user?.id} />
            </div>
        </Card>
    );
};

export default Post;
