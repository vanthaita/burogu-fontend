'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context/app.provider';
import { useRouter } from 'next/navigation';

export default function PostEditor() {
    const editorRef = useRef<Editor | null>(null);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const {user} = useAppContext();
    const router = useRouter();
    // const content = editorRef.current?.getContent();
    const post_editor =  async () => {
        try {
            const content = editorRef.current?.getContent();
            const res = await fetch('http://localhost:8080/add-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: title,
                    content: content,
                    authorId: user?.id,
                    category: tags
                })
            })

            if(!res.ok) {
                console.error('Failed to create post');
            }
            console.log(res);
            toast.success("Post added successfully!");
            return router.push('/')
        } catch (err) {
            toast.error("Error creating comment");
            console.log(err);
        }
    }  


    return (
    <>
        
        <div className=' space-y-2'>
            <div className='space-y-2'>
                <Input 
                    placeholder='Title'
                    className='placeholder:text-black'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='flex gap-x-2'>
                    <Input 
                        placeholder='Tags your post' 
                        className='placeholder:text-black'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <Button variant='outline'
                    
                        className="text-lg rounded-lg border-blue-700 hover:bg-blue-500 hover:text-white" 
                    >
                        <span>Save post</span>
                    </Button>
                    <Button
                        onClick={post_editor}
                        className="bg-[#000] text-white cursor-pointer border text-lg rounded-lg"
                    >
                        <span>Post</span>
                    </Button>
                </div>
            </div>
            <Editor
                id='post-editor'
                apiKey='ap9npj8z6mta8536ou43n89sbp40jxsprx51ci5wntqvzl4n'
                onInit={(evt: any, editor: any) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: 500,
                menu: {
                    favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                },
                menubar: 'favs file edit view insert format tools table help',
                plugins: [
                    'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                    'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                    'media', 'table', 'emoticons', 'help'
                ],
                ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
                
            />
        </div>

    </>
  );
}
