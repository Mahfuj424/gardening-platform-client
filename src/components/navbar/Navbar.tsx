import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";
import { LuLogOut } from "react-icons/lu";
import { RiMessengerLine } from "react-icons/ri";

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface UserInfo {
  profileImage?: string;
  name?: string;
  email?: string;
}

const NavBar: React.FC<NavBarProps> = ({  toggleDarkMode }) => {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    logoutUser(router);
    router.push('/auth/register');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current && 
        !filterDropdownRef.current.contains(event.target as Node) && 
        !profileDropdownRef.current?.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdownRef, profileDropdownRef]);





  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-darkCard shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="cursor-pointer flex" onClick={() => router.push("/")}>
          <img
            src="https://i.ibb.co/M5VKXRn/garden-Logo-removebg-preview.png"
            alt="GrowNest Logo"
            className="w-20 h-10 rounded-full"
          />
          <h1 className="text-3xl font-semibold bg-custom-gradient bg-clip-text text-transparent">
            GrowNest
          </h1>
        </div>

        

        <div className="flex gap-5 items-center relative">
          <div className="relative group">
            <div className="bg-gray-200 dark:bg-secondary text-green-500 rounded-full p-1.5">
              <MdOutlineNotificationsActive
                size={28}
                className="cursor-pointer"
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Notifications
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="bg-gray-200 dark:bg-secondary text-green-500 rounded-full p-1.5">
              <RiMessengerLine
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

          <div className="relative" ref={profileDropdownRef}>
            <img
              src={userInfo?.profileImage}
              alt={"profile"}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            />
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-darkModal rounded-lg shadow-lg z-50">
                <div className="flex items-center px-4 py-3">
                  <img
                    src={userInfo?.profileImage}
                    alt={"Profile"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3 dark:text-white">
                    <p className="text-sm font-semibold">{userInfo?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700" />
                <ul className="py-2">
                  <li
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LuLogOut className="inline mr-2" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="dark:hidden">
            <TiWeatherSunny
              size={30}
              className="cursor-pointer"
              onClick={toggleDarkMode}
            />
          </div>
          <div className="hidden dark:block">
            <BsMoonStarsFill
              size={30}
              className="cursor-pointer text-white"
              onClick={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
