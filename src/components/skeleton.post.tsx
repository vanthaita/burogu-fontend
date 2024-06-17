

import React from 'react';
import { Skeleton } from './ui/skeleton';
const SkeletonPost = () => {
    return (
        <Skeleton className="animate-pulse space-y-4">
            <Skeleton className="flex space-x-4 items-center">
                <Skeleton className="h-10 w-10 bg-gray-300 rounded-full"></Skeleton>
                <Skeleton className="flex-1 space-y-2 py-1">
                    <Skeleton className="h-4 bg-gray-300 rounded w-1/4"></Skeleton>
                    <Skeleton className="h-4 bg-gray-300 rounded w-1/6"></Skeleton>
                </Skeleton>
            </Skeleton>
            <Skeleton className="h-8 bg-gray-300 rounded w-1/2"></Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-3/4"></Skeleton>
            </Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-1/2"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
            </Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-3/4"></Skeleton>
            </Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-3/4"></Skeleton>
            </Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-3/4"></Skeleton>
            </Skeleton>
            <Skeleton className="space-y-2">
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-full"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded w-3/4"></Skeleton>
            </Skeleton>

        </Skeleton>
    );
};

export default SkeletonPost;
