'use client'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const SubmitLoginButton = ({isLoading} : { isLoading: any}) => {
    return (
        <Button type='submit' className='w-full mt-6 bg-blue-700' disabled={isLoading}>
            {isLoading ? (
                <div className="flex items-center justify-center gap-x-2">
                    <Loader2 className=" mr-2 w-4 h-4 animate-spin"/>
                    Logging in...
                </div>
            ) : (
                'Log in'
            )}
        </Button>
    );
}


export const SubmitRegisterButton = ({isLoading} : { isLoading: any}) => {
    return (
        <Button type='submit' className='w-full mt-6 bg-blue-700' disabled={isLoading}>
            {isLoading ? (
                <div className="flex items-center justify-center gap-x-2">
                    <Loader2 className=" mr-2 w-4 h-4 animate-spin"/>
                    Loading...
                </div>
            ) : (
                'Register'
            )}
        </Button>
    );
}

