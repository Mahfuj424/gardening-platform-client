// components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // usePathname to correctly fetch current path
import { FaTachometerAlt, FaFileAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'; // React icons
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname(); // Getting current pathname
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  // Define the menu items with their corresponding icons
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Posts', href: '/dashboard/posts', icon: <FaFileAlt /> },
    { name: 'Users', href: '/dashboard/users', icon: <FaUsers /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  const closeSidebar = () => {
    setIsOpen(false); // Close the sidebar when a menu item is clicked
  };

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <button
        className="text-white text-2xl p-2 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-5 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 w-64 md:relative md:translate-x-0 md:w-64 lg:w-64`}
      >
        <h2 className="text-2xl font-bold mb-8 border-b">Dashboard</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} onClick={closeSidebar}>
                <h1
                  className={`flex items-center space-x-3 p-2 rounded ${
                    pathname === item.href
                      ? 'bg-red-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </h1>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
