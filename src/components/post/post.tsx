'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import CommentEditor from '../editor/comment.editor';
import { useAppContext } from '@/context/app.provider';
import SkeletonPost from '../skeletons/skeleton.post';
import { Comments, PostType } from '@/types/type';
import { Author } from '@/types/type';
import { calculatorTime } from '@/utils/calculator.time';
import parse from 'html-react-parser'

const Post = ({
    postId,
    post,
    setListComment,
    listComment
}: {postId: string, post: PostType, setListComment: any, listComment: any}) => {
    
    const { user } = useAppContext();

    
    const addComment = (newComment: Comments) => {
        setListComment((prevComments: any) => [...prevComments, newComment]);
    };
  
    

    if (!post) {
        return <SkeletonPost />;
    }

    const { author, createdAt, title, category, content } = post;
    const time = new Date(createdAt).toLocaleString();

    return (
        <Card className='relative mb-10 container max-w-full'>
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
                        <span className='text-xs'>{calculatorTime(time)}</span>
                    </div>
                </div>
                <CardTitle className='text-4xl'>
                    {title || "Untitled Post"}
                </CardTitle>
                <CardDescription>{category || "#untagged"}</CardDescription>
            </CardHeader>
            <CardContent className=' container'>
                <div className='prose prose-lg break-words overflow-hidden' >
                    {parse(post.content)}
                </div>
            </CardContent>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>Top Comments</h3>
                <div className='space-y-2 mt-4'>
                    {listComment.map((comment: any) => (
                        <div key={comment.id} className='gap-x-4 flex'>
                            <div>
                                <Avatar className='h-8 w-8 rounded-full'>
                                    <AvatarImage src={'https://github.com/shadcn.png'} alt="" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </div>
                            <div className='border w-full rounded-md px-6 py-4 break-words' style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                <span className='text-lg font-medium'>{comment?.author?.username}</span>
                                <div className="max-w-[50%]">
                                    {parse(comment.content)} 
                                </div>
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
