import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {
  InboxArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navigationLinks = [
    { name: "HOME", path: "/" },
    { name: "GET NEW ORDER", path: "/get-new-order" },
    { name: "MY ORDERS", path: "/my-orders" },
    { name: "UPLOAD NEW DESIGN", path: "/upload-new-design" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white shadow-md font-medium sticky top-0 z-50">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu - Visible on mobile */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link to="/">
            <img
              src={assets.logo}
              className="w-32 md:w-36 cursor-pointer hover:opacity-90 transition-opacity"
              alt="Stitch & Style"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 text-sm text-gray-700">
          {navigationLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 hover:text-pink-600 transition-all duration-300
                ${isActive ? "text-pink-600" : ""}
              `}
            >
              {({ isActive }) => (
                <>
                  <p>{name}</p>
                  <hr
                    className={`w-4/5 border-none h-[2px] bg-pink-600 transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Header Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-pink-50 rounded-full transition-colors">
            <InboxArrowDownIcon
              width={20}
              height={20}
              className="text-pink-600 hover:text-pink-700 transition-colors"
            />
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={buttonRef}
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <FaRegUserCircle
                size={20}
                className="text-pink-600 hover:text-pink-700 transition-colors"
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
              absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200
              ${
                dropdownVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
            >
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                >
                  <FaUser className="mr-2" size={16} />
                  My Profile
                </Link>
                <Link
                  to="/portfolio"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                >
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  Portfolio
                </Link>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <FiLogOut className="mr-2" size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
        fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-50
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        <div
          className={`
          fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-xl transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-pink-600">Menu</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4">
                {navigationLinks.map(({ name, path }) => (
                  <NavLink
                    key={name}
                    to={path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 text-sm rounded-lg transition-colors mb-1
                      ${
                        isActive
                          ? "bg-pink-50 text-pink-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="border-t border-gray-200 p-4">
              <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <FiLogOut className="mr-2" size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
