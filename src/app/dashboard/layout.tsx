import React, { Children, ReactNode } from 'react';
import ProfileNavbar from '@/components/navbar/profile.navbar';

const ProfilePage = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col mt-6 h-screen">
      <div className="container flex flex-col md:grid md:grid-cols-[70px_1fr] gap-6 md:gap-20 flex-1">
        <aside className="hidden md:flex w-[70px] flex-col">
          <ProfileNavbar />
        </aside>
        <main className="flex w-full flex-col md:flex-row gap-x-4 relative px-4 mb-6">
          {children}
        </main>
      </div>
    </div>  
  );
}

export default ProfilePage;
