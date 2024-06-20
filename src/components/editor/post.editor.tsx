'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context/app.provider';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
export default function PostEditor() {
    const editorRef = useRef<Editor | null>(null);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const {user, token} = useAppContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const content = editorRef.current?.getContent();
    const post_editor =  async () => {
        setIsLoading(true);
        try {
            const content = editorRef.current?.getContent();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
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
        } finally {
            setIsLoading(false);
        }
    }  


    return (
    <>
        
        <div className=' space-y-2'>
            <div className='space-y-2'>
                <Input 
                    placeholder='Title'
                    className='placeholder:text-primary'
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='flex gap-x-2'>
                    <Input 
                        placeholder='Tags your post' 
                        className='placeholder:text-primary'
                        value={tags}
                        required
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <Button variant='outline'

                        className="text-lg rounded-lg border-blue-700 hover:bg-blue-500 hover:text-white" 
                    >
                        <span>Save post</span>
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={post_editor}
                        className="bg-[#000] text-white cursor-pointer border text-lg rounded-lg"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin"/>
                        ) : (
                            <span>Post</span>
                        )}
                    </Button>
                </div>
            </div>
            <Editor
                id='post-editor'
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                onInit={(evt: any, editor: any) => editorRef.current = editor}
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } .highlight {background-color: #fff877;',
            }}
            />

        </div>

    </>
  );
}
