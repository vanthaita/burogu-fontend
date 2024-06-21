'use client'
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context/app.provider';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
    title: z.string().min(1),
    tags: z.string().min(1)
        .transform((val) => val.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0))
        .refine((tags) => tags.length <= 5, {
            message: "You can only have up to 5 tags",
        }),
});

type FormData = z.infer<typeof formSchema>;

export default function PostEditor() {
    const editorRef = useRef<any | null>(null);
    const { user, token } = useAppContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
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
                    title: data.title,
                    content: content,
                    authorId: user?.id,
                    category: data.tags
                })
            });

            if (!res.ok) {
                console.error('Failed to create post');
                toast.error("Error creating post");
                return;
            }

            toast.success("Post added successfully!");
            router.push('/');
        } catch (err) {
            toast.error("Error creating post");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const tagsArray = value.split(',').map(tag => tag.trim());
        setValue('tags', tagsArray);
    };

    return (
        <div className='space-y-2'>
            <div className='space-y-2'>
                <Input
                    placeholder='Title'
                    className='placeholder:text-primary'
                    {...register('title')}
                    required
                />
                {errors.title && <p className="error">{errors.title.message}</p>}

                
                {errors.tags && <p className="error">{errors.tags.message}</p>}

                <div className='flex gap-x-2'>
                    <input
                        placeholder='Tags your post (comma separated)'
                        className='flex h-10 rounded-md border bg-background px-3 py-2 text-sm w-full'
                        {...register('tags')}
                        onChange={handleTagChange}
                        required
                    />
                    <Button
                        variant='outline'
                        className="text-lg rounded-lg border-blue-700 hover:bg-blue-500 hover:text-white"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <span>Save post</span>
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        className="bg-[#000] text-white cursor-pointer border text-lg rounded-lg"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
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
    );
}
