'use client'
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts } from '@/services'
import { getSimilarPosts } from '@/services'
import Image from 'next/image'
import { vtechImageLoader } from '@/utils'
const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([])
   console.log(slug);
    useEffect(() => {
      if(slug) {
        getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result))

      } else {
        getRecentPosts().then((result) => setRelatedPosts(result))
      
      }
    } , [slug])
    
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
        <h3 className='text-center text-xl font-semibold mb-8 pb-4 border-b '>
        {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>

              {relatedPosts.map((post, index) => (
              <div key={index} className="flex items-center w-full mb-4">
                <div className="w-16 flex-none">
                  <Image
                    loader={vtechImageLoader}
                    alt={post.title}
                    height="60px"
                    width="60px"
                    unoptimized
                    className="align-middle rounded-full"
                    src={post.featuredImage.url}
                  />
                </div>
                <div className="flex-grow ml-4">
                  <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')} today</p>
                  <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
                </div>
        </div>
      ))}
          
      
   </div>
  )
}

export default PostWidget