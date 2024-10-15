// import React from 'react';
// import { PostType } from '@/types/type';
// interface BookmarksPageProps {
//   bookmarks: PostType[];
// }
// const sampleBookmarks: PostType[] = [
//   {
//     id: '1',
//     title: 'First Post',
//     content: 'This is the content of the first post.',
//     category: ['Category1', 'Category2'],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     author: { id: '1', username: 'Author1' },
//     comments: [],
//     bookmarks: [],
//     votes: []
//   },
//   // Add more sample posts as needed
// ];
// const Post: React.FC<{ post: PostType }> = ({ post }) => (
//   <div className="rounded-lg shadow-md border-2 border-gray-500 p-6 mb-6 w-full">
//     <h2 className="text-2xl font-semibold text-gray-700">{post.title}</h2>
//     <p className="text-gray-600">{post.content}</p>
//     <div className="text-gray-500 text-sm mt-4">
//       <span>Author: {post.author.username}</span>
//       <span className="ml-4">Category: {post.category.join(', ')}</span>
//       <span className="ml-4">Created At: {new Date(post.createdAt).toLocaleDateString()}</span>
//     </div>
//   </div>
// );

// const Page = ( ) => {
//   return (
//     <div className="flex flex-col items-center min-h-screen">
//       {bookmarks?.map((bookmark, index) => (
//         <Post key={index} post={bookmark} />
//       ))}
//     </div>
//   );
// };

// export default Page;
