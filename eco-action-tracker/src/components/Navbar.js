"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { User, ShoppingBag, LogOut } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null); // حالة لتخزين بيانات المستخدم
  const [loading, setLoading] = useState(true); // حالة للتحميل

  async function fetchData() {
    setLoading(true); // ابدأ التحميل
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        withCredentials: true,
      });
      setUser(response.data); // تخزين البيانات في حالة
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // انتهى التحميل
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/logout', {}, {
        withCredentials: true,
      });
      setProfileDropdown(false) // تسجيل رسالة النجاح
      setUser(null); // تحديث حالة المستخدم لتصبح null بعد تسجيل الخروج
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data : error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [ProfileDropdown, setProfileDropdown] = useState(false);

  function ProfileServices() {
    setProfileDropdown(!ProfileDropdown);
  }

  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [pathname === "/"]);

  const isAuthPage = pathname === "/register" || pathname === "/login" ;

  if (isAuthPage) return null; // لا تعرض Navbar في صفحات التسجيل وتسجيل الدخول

  return (
    <nav className="bg-[#2D3134] fixed w-full z-20 top-0 start-0 border-b border-[#2D3134]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://cdn.discordapp.com/attachments/993570904544124972/1293862383730557021/Screenshot_2024-10-10_120627.png?ex=67102aff&is=670ed97f&hm=6be8176bccadbbb8ed58455a185dcc19275a9522c0fa9ce7666b4e163e81e9f1&"
            className="h-8 rounded-full"
            alt="Logo"
          />
                  <span className="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap text-[#FAF8ED]">
  Future Energy
</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className={` relative ${user ? null : "mt-2"}`}>
            {loading ? null : (
              <>
                {user ? (
                  <>
                    <div className="flex items-center space-x-4 ">
                      <img
                        className="h-9 w-9 bg-white cursor-pointer rounded-full shadow-lg transition-transform transform hover:scale-110"
                        src={
                          user.picture ||
                          "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                        }
                        alt="Profile"
                        onClick={ProfileServices}
                      />
                    </div>
                    {ProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-[#fdb713] rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
                        <ul className="divide-y divide-[#fdb713]">
                          <li>
                            <Link
                              href="/profile"
                              className="flex items-center justify-start px-4 py-3 text-[#2D3134] hover:bg-[#fdb713] hover:text-white transition duration-300"
                              onClick={() => setServicesDropdown(false)}
                            >
                              <User className="w-5 h-5 text-[#fdb713] mr-3" />
                              <span className="font-cairo">Profile</span>
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="flex items-center justify-start w-full px-4 py-3 text-red-600 hover:bg-red-50 transition duration-300"
                            >
                              <LogOut className="w-5 h-5 text-red-600 mr-3" />
                              <span className="font-cairo">Logout</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/register"
                    className="text-white bg-[#fdb713] hover:bg-[#ffce5b] focus:ring-1 focus:outline-none focus:ring-[#ffd77a] font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Sign Up
                  </Link>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#FAF8ED] rounded-lg md:hidden hover:bg-[#fdb713] focus:outline-none focus:ring-2 focus:ring-[#FAF8ED]"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-[#2D3134] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Store
              </Link>
            </li>
          {user ?   <li>
              <Link
                href="/challenges"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Challenges
              </Link>
            </li> : null}
          {user ?   <li>
              <Link
                href="/community-feed"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Community
              </Link>
            </li> : null}
          
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className="block py-2 px-3 text-[#FAF8ED] rounded hover:bg-[#fdb713] md:hover:bg-transparent md:hover:text-[#fdb713] md:p-0"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
