'use client'
import CardPost from "@/components/card/card.post";
import HomeNavbar from "@/components/home.navbar";
import Posts from "@/components/post/get.all.post";
import { Button } from "@/components/ui/button";
import useAuth from "@/hook/useAuth";
export default function Home() {

  
  return (
    <div className=" max-w-[120vh] mb-10">
      <div className=" w-1/2">
        <HomeNavbar />
      </div>
      {/* Create list post unlimit scroll */}
      <div className="mt-4 w-full">
        <Posts />
      </div>
    </div>
  );
}
