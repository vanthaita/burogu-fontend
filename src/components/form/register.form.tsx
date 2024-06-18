'use client'
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitRegisterButton } from '../submit.button';
const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z.string().min(1, 'Username is required').min(5, 'Username must be at least 5 characters'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

export const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            username: '',
            password: ''
        },
    });

    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8080/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(value),
            });
            if (!res.ok) {
              throw new Error('Login failed');
            }
            const data = await res.json();
            console.log(data);
            toast.success("Register successfully!");
            return router.push('/login');
        } catch (error) {
            console.error('Error:', error);
            toast.error("Login failed!");
        } finally {
            setIsLoading(false);
        }
    }  

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' w-full'>
                <div className=' space-y-2'>
                    <FormField 
                        control={form.control}
                        name='username'
                        render ={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='user name' {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='email'
                        render ={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='mail@gmail.com' {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input
                                type='password'
                                placeholder='Enter your password'
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <SubmitRegisterButton isLoading={isLoading}/>
                    <div className=' flex items-center justify-center'>
                        <span>If you have an account? <Link href="/login"><span className='hover:underline text-blue-500'>Login!</span></Link></span>
                    </div>
                </div>
            </form>
        </Form>
    )
}
