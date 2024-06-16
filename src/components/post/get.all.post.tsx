'use client'
import React, { useState, useEffect } from 'react';
import CardPost from '../card/card.post';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const handleGetPosts = async () => {
            try {
                const res = await fetch('http://localhost:8080/get-all-post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Error fetching posts');
                }

                const data = await res.json();
                setPosts(data.posts);
                console.log(data.posts); 
            } catch (err) {
                console.error(err);
            }
        };

        handleGetPosts();
    }, []);

    return (
        <div className=' space-y-6'>
            {posts.map((post: any, index: number) => (
                <div key={index}>
                    <CardPost
                        authorId={post.author?.id}
                        authorName={post.author?.username}
                        title={post?.title}
                        tags={post?.category}
                        time={post?.createdAt}
                        postId={post?.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default Posts;
