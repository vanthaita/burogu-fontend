import CardPost from "@/components/card/card.post";
import HomeNavbar from "@/components/home.navbar";
import Posts from "@/components/post/get.all.post";
export default function Home() {
  return (
    <div className=" max-w-[120vh]">
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
