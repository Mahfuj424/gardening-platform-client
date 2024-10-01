export default function MainFeed() {
  return (
    <div>
      {/* Post Box */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full px-4 py-2 border border-gray-300 rounded-full"
        />
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <div className="bg-white p-4 shadow-md rounded-lg">Post 1</div>
        <div className="bg-white p-4 shadow-md rounded-lg">Post 2</div>
        <div className="bg-white p-4 shadow-md rounded-lg">Post 3</div>
      </div>
    </div>
  );
}
