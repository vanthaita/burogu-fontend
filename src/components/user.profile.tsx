'use client';
import { useAppContext } from '@/context/app.provider';
import React, { useState } from 'react';
import { Button } from './ui/button';

const Profile = () => {
    const { token } = useAppContext();
    const [page, setPage] = useState('');

    const test = async () => {
        try {
            const res = await fetch('http://localhost:8080/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
                credentials: 'include' 
            });

            if (!res.ok) {
                throw new Error('Error');
            }
            const data = await res.text(); 
            setPage(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {page}
            <Button onClick={test}>Test</Button>
        </div>
    );
};

export default Profile;
