"use client";

import {
  MdOutlineContactPage,
  MdOutlineDashboardCustomize,
  MdOutlineNotificationsActive,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";
import { LuLogOut } from "react-icons/lu";
import { RiContactsBook3Line, RiMessengerLine } from "react-icons/ri";
import Link from "next/link";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetSingleProfileQuery } from "@/redux/api/userApi";

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface UserInfo {
  _id: string;
  profileImage?: string;
  name?: string;
  email?: string;
  role?: string;
  isVerified: boolean;
  premiumAccess: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ toggleDarkMode }) => {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const user: UserInfo = getUserInfo();
  const { data } = useGetSingleProfileQuery(user?._id);
  const userInfo = data?.data;
  console.log("user information=>", userInfo);

  const handleLogout = () => {
    logoutUser(router);
    router.push("/auth/login");
  };

  const [createPayment] = useCreatePaymentMutation();
  const handlePayment = async () => {
    const paymentObject = {
      totalAmount: 150.75,
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
    };
    try {
      const res = await createPayment(paymentObject).unwrap();
      if (typeof window !== undefined) {
        window.location.href = res?.data?.payment_url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-darkCard shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div
          className="cursor-pointer flex -ms-3"
          onClick={() => router.push("/")}
        >
          <img
            src="https://i.ibb.co/M5VKXRn/garden-Logo-removebg-preview.png"
            alt="GrowNest Logo"
            className="w-20 h-10 rounded-full"
          />
          <h1 className="text-3xl font-semibold bg-custom-gradient bg-clip-text text-transparent">
            GrowNest
          </h1>
        </div>

        <div className="flex gap-10 dark:text-gray-100">
          <Link href={`/contact-us`} className="flex items-center gap-1">
            <RiContactsBook3Line className="text-2xl" />
            <h1>Contact</h1>
          </Link>
          <Link href={`/about-us`} className="flex items-center">
            <MdOutlineContactPage className="text-2xl" />
            <h1>About</h1>
          </Link>
          <Link href={`/gallery`} className="flex items-center gap-1">
            <IoIosImages className="text-2xl" />
            <h1>Gallery</h1>
          </Link>
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
                  {userInfo?.isVerified ? (
                    ""
                  ) : (
                    <li
                      className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                      onClick={handlePayment}
                    >
                      <MdOutlineWorkspacePremium className="inline mr-2" />
                      upgrade to premium
                    </li>
                  )}
                  <li
                    className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                    onClick={() =>
                      router.push(
                        `${
                          userInfo?.role === "user"
                            ? "/dashboard"
                            : "admin-dashboard"
                        }`
                      )
                    }
                  >
                    <MdOutlineDashboardCustomize className="inline mr-2" />
                    Dashboard
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
            <BsMoonStarsFill
              size={25}
              className="cursor-pointer"
              onClick={toggleDarkMode}
            />
          </div>
          <div className="hidden dark:block">
            <TiWeatherSunny
              size={30}
              className="cursor-pointer text-gray-300"
              onClick={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
