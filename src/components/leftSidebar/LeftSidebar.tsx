import { FaUser, FaStore, FaUsers, FaVideo } from 'react-icons/fa';

export default function LeftSidebar() {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <ul>
        <li className="mb-4 flex items-center space-x-2">
          <FaUser size={20} />
          <span>Profile</span>
        </li>
        <li className="mb-4 flex items-center space-x-2">
          <FaStore size={20} />
          <span>Marketplace</span>
        </li>
        <li className="mb-4 flex items-center space-x-2">
          <FaUsers size={20} />
          <span>Groups</span>
        </li>
        <li className="mb-4 flex items-center space-x-2">
          <FaVideo size={20} />
          <span>Watch</span>
        </li>
      </ul>
    </div>
  );
}
