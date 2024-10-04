
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";

export default function NavBar({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const userInfo = getUserInfo();
  const handleLogout=()=>{
    logoutUser(router)
    router.push('/auth/login')
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-darkCard shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="cursor-pointer flex" onClick={() => router.push("/")}>
          <img
            src="https://i.ibb.co.com/M5VKXRn/garden-Logo-removebg-preview.png"
            alt="GrowNest Logo"
            className="w-20 h-10 rounded-full"
          />
          <h1 className="text-3xl  font-semibold bg-custom-gradient bg-clip-text text-transparent">
            GrowNest
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-[45%] -ms-36">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearch className="text-gray-500 dark:text-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search Friends"
            className="pl-10 w-full px-4 py-2 rounded-md border dark:text-white dark:border-none bg-gray-100 border-gray-300 dark:bg-darkModal outline-none dark:focus:ring-0 focus:ring-2 focus:ring-[#00984b]"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-5 items-center relative">
          {/* Notification Icon */}
          <div className="relative group">
            <div className="bg-gray-200 dark:bg-secondary dark:text-white rounded-full p-1.5">
              <MdNotificationsActive
                size={28}
                className="cursor-pointer"
                onClick={() => router.push("/notifications")}
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Notifications
              </span>
            </div>
          </div>

          {/* Message Icon */}
          <div className="relative group">
            <div className="bg-gray-200  dark:bg-secondary dark:text-white rounded-full p-1.5">
              <BiSolidMessageDetail
                size={28}
                className="cursor-pointer"
                onClick={() => router.push("/messages")}
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Messages
              </span>
            </div>
          </div>

          {/* Profile Image with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={userInfo?.profileImage}
              alt={"profile"}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-darkModal rounded-lg shadow-lg z-50">
                <div className="flex items-center px-4 py-3">
                  <img
                    src={userInfo?.profileImage}
                    alt={"Stell Johnson"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3 dark:text-white">
                    <p className="text-sm font-semibold">{userInfo?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>
                <hr />
                <ul>
                  <li
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                  >
                    Upgrade To Premium
                  </li>
                  <li
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                  >
                    My Billing
                  </li>
                  <li
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                  >
                    Advatacing
                  </li>
                  <li
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                  >
                    My Account
                  </li>
                  <li
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                  >
                    <button
                      className="block w-full text-left py-2 "
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? (
                        <div className="flex text-primary items-center gap-1">
                          <TiWeatherSunny />
                          <h1>Light</h1>
                        </div>
                      ) : (
                        <div className="flex text-primary items-center gap-1">
                          <BsMoonStarsFill />
                          <h1>Dark</h1>
                        </div>
                      )}
                    </button>
                  </li>
                  <li onClick={handleLogout} className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer">
                    LogOut
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
