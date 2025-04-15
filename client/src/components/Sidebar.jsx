import React, { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun, FaPlus } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";



import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";

const Sidebar = ({ resetSearch, setMessage  }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowLoginMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <div className="fixed z-50 top-0 left-0 h-screen pt-4 w-20 m-0 flex flex-col transition-colors duration-200">
        <SidebarIcon icon={<GoHomeFill size="30" />} text="Accueil" link="/" />
        <div className="flex justify-center w-full py-4">
          <div className="w-1/2 border-t-2 border-white dark:border-blue-400"></div>
        </div>
        <SidebarIcon
          icon={<MdElectricBolt size="30" />}
          text="Appareils"
          link="/devices"
          onClick={resetSearch}
        />
        <SidebarIcon
          icon={<FaPlus size="30" />}
          text="Ajouter"
          link="/deviceCreate"
        />

        <div className="flex-grow"></div>

        {/* Login button with expandable menu */}
        <div className="relative z-50" ref={menuRef}>
          {showLoginMenu && (
            <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/6 flex flex-col items-center z-50">
              <SidebarIcon
                icon={<IoMdLogIn size="30" />}
                text="Log In"
                link="#"
                onClick={() => {
                  setShowLoginModal(true);
                  setShowLoginMenu(false);
                }}
              />
              <SidebarIcon
                icon={<IoPersonAdd size="30" />}
                text="Sign Up"
                link="#"
                onClick={() => {
                  setShowRegisterModal(true);
                  setShowLoginMenu(false); // ✅ close the menu, not the modal
                }}
              />
              <SidebarIcon
                icon={<FiHelpCircle size="30" />}
                text="Help Center"
                link="#"
                onClick={() => alert("Help Center clicked")}
              />
            </div>
          )}

          <button
            onClick={() => setShowLoginMenu((prev) => !prev)}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 h-12 w-12 bg-neutral-50 dark:bg-neutral-700 text-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-white rounded-3xl hover:rounded-xl transition duration-200 ease-linear flex items-center justify-center z-40"
          >
            <IoPerson className="text-2xl" />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-12 w-12 bg-amber-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-amber-500 hover:text-white rounded-3xl transition-all duration-200 ease-linear cursor-pointer"
        >
          <i className="text-2xl flex items-center justify-center">
            {darkMode
              ? hovered
                ? <FaSun />
                : <FaMoon />
              : hovered
                ? <FaMoon />
                : <FaSun />}
          </i>
        </button>
      </div>

      {/* Login and Register Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setMessage={setMessage}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          setMessage={setMessage}
        />
      )}
    </>
  );
};

const SidebarIcon = ({ icon, text, link, onClick }) => {
  return (
    <div className="sidebar-icon group relative">
      <Link to={link} onClick={onClick}>
        {icon}
      </Link>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
