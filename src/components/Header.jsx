import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import {
  InboxArrowDownIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent body scrolling when sidebar is open
    if (sidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("no-scroll");
    };
  }, [sidebarOpen]);

  const navigationItems = [
    { name: "HOME", path: "/" },
    { name: "GET NEW ORDER", path: "/get-new-order" },
    { name: "MY ORDERS", path: "/my-orders" },
    { name: "UPLOAD NEW DESIGN", path: "/upload-new-design" },
  ];

  const userMenuItems = [
    { icon: <FaUser size={16} />, text: "My Profile", path: "/profile" },
    {
      icon: <DocumentTextIcon width={16} height={16} />,
      text: "My Portfolio",
      path: "/portfolio",
    },
    { icon: <FiLogOut size={16} />, text: "Logout", path: "/logout" },
  ];

  return (
    <div className="header-container">
      {/* Header Bar */}
      <div className="header-bar">
        {/* Logo */}
        <Link to="/" className="logo-container">
          <img src={assets.logo} className="logo" alt="Stitch & Style" />
        </Link>

        {/* Mobile Hamburger Menu */}
        <button
          className="hamburger-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <GiHamburgerMenu className="hamburger-icon" />
        </button>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <p>{item.name}</p>
                  <hr className="nav-link-underline" />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        <ul className="header-icons">
          <li className="header-icon-item">
            <Link to="/profile" className="user-icon-wrapper">
              <FaRegUserCircle className="user-icon" />
              <span className="user-name-label">Account</span>
            </Link>
          </li>
          <li className="header-icon-item">
            <Link to="/logout" className="logout-button">
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>

        {/* Icons Section */}
      </div>

      {/* Mobile Sidebar - Left Side */}
      {sidebarOpen && (
        <div className="sidebar-overlay">
          <div
            ref={sidebarRef}
            className="sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="sidebar-header">
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                <img src={assets.logo} className="logo" alt="Stitch & Style" />
              </Link>
              <button
                className="sidebar-close-button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="sidebar-close-icon" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="user-profile">
              <div className="user-profile-content">
                <div className="user-avatar">
                  <FaUser className="user-avatar-icon" />
                </div>
                <div>
                  <p className="user-name">User Name</p>
                  <p className="user-email">user@example.com</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="sidebar-nav">
              {navigationItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sidebar-nav-text">{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="sidebar-footer">
              <Link
                to="/logout"
                className="logout-link"
                onClick={() => setSidebarOpen(false)}
              >
                <FiLogOut className="logout-icon" />
                <span className="logout-text">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
