import ImageGallery from '@/components/imageGallery/ImageGallery';

const GalleryPage = () => {

  return (
    <div className="container mx-auto py-8 mt-[70px] max-w-7xl">
      <h1 className="text-center text-4xl font-semibold text-gray-800 mb-8">
        Image Gallery
      </h1>
      <ImageGallery/>
    </div>
  );
};

export default GalleryPage;
