'use client'
import CardPost from '@/components/card/card.post'
import ProfileCardPost from '@/components/card/profile.post'
import { useAppContext } from '@/context/app.provider'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
    const { user, token } = useAppContext();
    const router = useParams();
    const { id: userId } = router;
    const [profile, setProfile] = useState<any>(null);
    const history = useRouter();
    useEffect(() => {
        const handleGetUserProfile = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/u/get-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ userId: user?.id }),
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to get user profile');
                }
                const data = await res.json();
                if(data.user.id !== userId) {
                    toast.error("Not authorized to view this profile");
                    return history.push('/');
                    
                }
                setProfile(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        handleGetUserProfile();
    }, [history, token, user?.id, userId]);

    const profileCards = useMemo(() => {
        if (profile && profile.posts) {
            return profile.posts.map((item: any) => (
                <ProfileCardPost key={item.id} postId={item.id} title={item.title} tags={item.category}/>
            ));
        }
        return null;
    }, [profile]);

    
    return (
        <div className="max-w-[120vh] mb-10">
            <div className='w-full space-y-6'>
                {profileCards}
            </div>
        </div>
    );
}

export default Page;
