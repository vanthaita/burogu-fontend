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
import { useAppContext } from '@/context/app.provider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SubmitLoginButton } from '../submit.button';
import { useState } from 'react';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

export const LoginForm = () => {
    const router = useRouter();
    const {setToken, token, setUser, user} = useAppContext();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:8080/login', {
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
            const resultFormNextServer = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!resultFormNextServer.ok) {
              throw new Error('Login failed');
            }
            const accessToken = await resultFormNextServer.json();
            setToken(accessToken.data.accessToken);
            setUser(data.user);
            toast.success("Login successfully!");
            return router.push('/');
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
                    <SubmitLoginButton isLoading={isLoading} />
                    <div className=' flex items-center justify-center'>
                        <span>Don&apos;t have an account? <Link href="/register"><span className='hover:underline text-blue-500'>Register!</span></Link></span>
                    </div>
                </div>
            </form>
        </Form>
    )
}
