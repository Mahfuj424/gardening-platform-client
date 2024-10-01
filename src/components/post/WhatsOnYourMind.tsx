// components/WhatsOnYourMind.tsx


const WhatsOnYourMind = () => {
  return (
    <div className="dark:bg-darkCard bg-white shadow-md p-4 rounded-lg mt-4 flex items-center space-x-3">
      <input
        type="text"
        placeholder="What do you have in mind?"
        className="flex-grow dark:bg-darkBg bg-gray-100 p-2 rounded-md dark:text-white text-black placeholder-gray-400 outline-none"
      />
      <div className="flex space-x-3">
        <button className="bg-pink-500 p-2 rounded-full">
          <i className="fas fa-image text-white"></i> {/* Image Icon */}
        </button>
        <button className="bg-blue-500 p-2 rounded-full">
          <i className="fas fa-video text-white"></i> {/* Video Icon */}
        </button>
      </div>
    </div>
  );
};

export default WhatsOnYourMind;
