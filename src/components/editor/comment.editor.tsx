'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function CommentEditor({postId, authorId, addComment} : {postId: any, authorId: any, addComment: any}) {
    const editorRef = useRef<Editor | null>(null);
    const post_comment =  async () => {
        try {
            const content = editorRef.current?.getContent();
            const res = await fetch('http://localhost:8080/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            console.log(res);
            const data = await res.json();
            addComment(data.comment);
            toast.success("Post comment successfully!");
        } catch (err) {
            console.log(err);
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
                    apiKey='ap9npj8z6mta8536ou43n89sbp40jxsprx51ci5wntqvzl4n'
                    onInit={(evt: any, editor: any) => editorRef.current = editor}
                    init={{
                        height: 300,
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    
                />
                <div className='flex w-full justify-end mt-2'>
                    <Button variant='outline'
                        onClick={post_comment}
                        className="text-lg rounded-lg border-blue-700 hover:bg-blue-500 hover:text-white" 
                    >
                        <span>Post comment</span>
                    </Button>
                </div>
            </div>
        </div>
    </>
  );
}
