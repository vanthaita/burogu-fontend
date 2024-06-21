'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/app.provider';

export default function CommentEditor({postId, authorId, addComment} : {postId: any, authorId: any, addComment: any}) {
    const editorRef = useRef<any | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const {token} = useAppContext();
    const post_comment =  async () => {
        setIsLoading(true)
        try {
            const content = editorRef.current?.getContent();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                    
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId,
                    authorId,
                    content
                })
            })

            if(!res.ok) {
                console.error('Failed to create post');
            }
            const data = await res.json();
            addComment(data.comment);
            toast.success("Post comment successfully!");
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }  


    return (
    <>
        <div className='flex space-x-4 mt-4'>
            <div className=''>
                <Avatar className='h-8 w-8 rounded-full'>
                    <AvatarImage src={ 'https://github.com/shadcn.png'} alt="" />
                    <AvatarFallback>{}</AvatarFallback>
                </Avatar>
            </div>
            <div className='w-full'>
                <Editor
                    id='post-editor'
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(evt: any, editor: any) => editorRef.current = editor}
                    init={{
                        height: 300,
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    
                />
                <div className='flex w-full justify-end mt-2'>
                    <Button variant='outline'
                        onClick={post_comment}
                        disabled={isLoading as boolean}
                        className="text-lg rounded-lg border-blue-700 hover:bg-blue-500 hover:text-white" 
                    >
                        {isLoading ? (
                            <>
                            <Loader2 className="w-4 h-4 animate-spin"/>
                            <span className='ml-4 '>Loading...</span>
                            </>
                        ) : (
                            <span>Post comment</span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    </>
  );
}
