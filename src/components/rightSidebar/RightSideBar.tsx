// components/RightSidebar.tsx


const RightSidebar = () => {
  const people = [
    { name: 'John Michael', following: '125k' },
    { name: 'Monroe Parker', following: '320k' },
    // Add more people
  ];


  return (
    <div className="dark:bg-darkCard bg-white shadow-md p-4 rounded-lg space-y-4 mt-4">
      {/* People You May Know */}
      <div>
        <h2 className="text-white font-semibold mb-3">People you may know</h2>
        {people.map((person, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <img
                src={`https://i.ibb.co.com/xm54tqk/profile-Image.jpg`} // Replace with real avatar paths
                alt={person.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="dark:text-white text-secondary">{person.name}</p>
                <p className="text-xs text-gray-400">{person.following} Following</p>
              </div>
            </div>
            <button className="bg-custom-gradient text-black font-semibold px-4 py-1 rounded-lg">
              Follow
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default RightSidebar;
