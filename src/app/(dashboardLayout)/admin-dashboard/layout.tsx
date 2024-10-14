// components/Layout.tsx
'use client';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // usePathname to correctly fetch current path
import { FaTachometerAlt, FaFileAlt, FaUsers, FaBars, FaTimes, FaHome, FaSignOutAlt } from 'react-icons/fa'; // React icons
import { logoutUser } from '@/services/actions/logoutUser';

type LayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); // Getting current pathname
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  // Define the menu items with their corresponding icons
  const menuItems = [
    { name: 'Dashboard', href: '/admin-dashboard', icon: <FaTachometerAlt /> },
    { name: 'Posts', href: '/admin-dashboard/posts', icon: <FaFileAlt /> },
    { name: 'Users', href: '/admin-dashboard/users', icon: <FaUsers /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  const closeSidebar = () => {
    setIsOpen(false); // Close the sidebar when a menu item is clicked
  };
  const router = useRouter()
  const handleLogout = () => {
    logoutUser(router);
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Hamburger Icon for Mobile */}
      <button
        className="text-black text-2xl p-2 absolute top-1 left-0 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="hidden" /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen lg:dark:bg-darkCard bg-white text-white p-5 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 w-64 md:relative md:translate-x-0 md:w-64 lg:w-64 flex flex-col`}
      >
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white border-gray-500 border-b">Dashboard</h2>
        
        {/* Main Menu Items */}
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} onClick={closeSidebar}>
                <h1
                  className={`flex items-center space-x-3 p-2 rounded ${
                    pathname === item.href
                      ? 'bg-green-500'
                      : 'hover:bg-gray-200 text-black dark:text-white hover:duration-300 dark:hover:bg-darkModal'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </h1>
              </Link>
            </li>
          ))}
        </ul>

        {/* Spacer to push Home and Logout to the bottom */}
        <div className="mt-auto">
          {/* Home and Logout Items */}
          <ul className="space-y-4">
            <li>
              <Link href="/" onClick={closeSidebar}>
                <h1
                  className={`flex items-center space-x-3 p-2 rounded ${
                    pathname === '/'
                      ? 'bg-green-500'
                      : 'hover:bg-gray-200 hover:duration-300 text-black dark:text-white dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl"><FaHome /></span>
                  <span className="text-base">Home</span>
                </h1>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200 text-black dark:text-white dark:hover:bg-gray-700 w-full"
                onClick={handleLogout}
              >
                <span className="text-xl"><FaSignOutAlt /></span>
                <span className="text-base">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <main className="flex-1 p-8 dark:bg-darkBg bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
