'use client'
import React, {useState, useEffect} from 'react'
import { getPosts, getPostDetails } from '@/services'
import { PostWidget, Categories, PostDetail, Author, CommentsForm, Comments } from '@/components' 
const PostDetails = ({params}) => {
  const [post, setPost] = useState({});
  
  useEffect(() => {
    getPostDetails(params.slug).then((result) => {
      setPost(result);
    });
  }, [params.slug]);

  
 return (
  <div className="container mx-auto px-10 mb-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div className="lg:col-span-8">
      <PostDetail post={post} />
      <Author author={post.author} />
      <CommentsForm slug={post.slug} />
      <Comments slug={post.slug} />
    </div>
    <div className="col-span-1 lg:col-span-4">
      <div className="relative lg:sticky top-8">
            <PostWidget
        slug={post.slug}
        categories={post.categories ? post.categories.map((category) => category.slug) : []}
      />
        <Categories />
      </div>
    </div>
  </div>
</div>
 )
};

export default PostDetails

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
} 


