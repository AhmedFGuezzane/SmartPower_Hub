import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaPlus } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ resetSearch }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [hovered, setHovered] = useState(false); // Gère l’état de survol

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
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

      {/* Toggle avec icône dynamique */}
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
  );
};

const SidebarIcon = ({ icon, text, link, onClick }) => {
  return (
    <div className="sidebar-icon group">
      <Link to={link} onClick={onClick}>
        {icon}
      </Link>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
