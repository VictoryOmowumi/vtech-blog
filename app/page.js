'use client'
import { PostCard, PostWidget, Categories } from "@/components"
import { getPosts } from "@/services"
import { useEffect, useState } from "react"
export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchData();
  }, []);
  return (
    <main className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className='lg:col-span-8 col-span-1'>
        {posts.map((post) => ( <PostCard post={post} key={post.Id} /> )) }
        </div>
      <div className="lg:col-span-4 col-span-1">
         <div className="lg:sticky relative top-8">
        <PostWidget />
        <Categories />
         </div>
      </div>
      </div>
    </main>
  )
}
