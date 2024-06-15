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


const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})

export const LoginForm = () => {
    const {setToken, token} = useAppContext();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
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
        } catch (error) {
        console.error('Error:', error);
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
                    <Button className='w-full mt-6 bg-blue-700' type='submit' >Log in</Button>
                </div>
            </form>
        </Form>
    )
}
