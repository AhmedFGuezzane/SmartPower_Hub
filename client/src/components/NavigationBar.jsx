import React from "react";
import { FiSearch } from "react-icons/fi";

const NavigationBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="fixed z-50 w-full border-0 h-20 px-6 flex items-center justify-center text-white ">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-md bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-50 placeholder-blue-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white"
          />
          <FiSearch className="absolute top-2.5 left-3 text-blue-400 dark:text-white text-xl" />
        </div>
      </div>
    );
  };

export default NavigationBar;
