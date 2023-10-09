import React from 'react'
import Image from 'next/image'
import { vtechImageLoader } from '@/utils'
const Author = ({author}) => {

  return (
        <>
        {author && author.photo && (
          <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-blue-700 bg-opacity-20">
          <div className="absolute left-0 right-0 -top-14">
            {/* Display the author's photo */}
            {author.photo && (
              <Image
                loader={vtechImageLoader}
                alt={author.name}
                unoptimized
                width={100}
                height={100}
                className="align-middle rounded-full w-[100px] h-[100px] "
                src={author.photo.url}
              />
            )}
          </div>

          <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-ls">{author.bio}</p>
        </div>
        )}
        </>
  )
}

export default Author