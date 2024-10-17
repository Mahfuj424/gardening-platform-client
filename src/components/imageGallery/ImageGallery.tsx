/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useGetAllPostsQuery } from '@/redux/api/post';

const ImageGallery: React.FC = () => {
  const { data } = useGetAllPostsQuery({});
  const posts = data?.data;

  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      // Optional: additional logic or effects
    }
  }, []);

  // Flatten all images from all posts
  const allImages = posts?.flatMap((post: any) => post.images) || [];
  console.log(allImages)

  return (
    <div className="flex flex-wrap justify-center">
      <LightGallery
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {allImages.map((image: any, index: number) => (
          <a key={index} href={image} data-lg-size="1406-1390">
            <img
              className="w-full h-auto rounded-lg shadow-lg hover:opacity-75 transition-opacity duration-300"
              src={image}
              alt={image}
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
