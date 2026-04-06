import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useFinance } from "../../context/financeContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, setRole, darkMode, setDarkMode } = useFinance();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="z-[999] sticky top-0 flex items-center justify-between px-4 py-3 md:px-8 md:py-4 border-b-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      {/* Brand */}
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <div className="w-11 h-11 md:w-13 md:h-13">
          <img src={logo} alt="FinDash Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl md:text-3xl text-sky-900 dark:text-sky-300 font-bold tracking-tight">
          FinDash
        </h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode((d) => !d)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors text-sky-800 dark:text-yellow-300"
        >
          {darkMode ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
        </button>

        {/* Role switcher */}
        <div
          className="flex items-center justify-between border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg px-3 py-2.5 min-w-[130px] md:min-w-[170px] relative cursor-pointer select-none"
          ref={dropdownRef}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p className="text-sm md:text-[15px] text-sky-900 dark:text-sky-300 font-medium">
            {role}
          </p>
          <FaChevronDown
            className={`ml-2 text-sky-900 dark:text-sky-300 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />

          {/* Dropdown */}
          <div
            className={`w-full border border-slate-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 absolute top-full left-0 mt-1 shadow-lg overflow-hidden transition-all duration-200 ease-in-out ${
              isOpen ? "max-h-48 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            {["Viewer", "Admin"].map((r) => (
              <p
                key={r}
                className="hover:bg-sky-700 hover:text-white px-4 py-2.5 text-sm text-sky-900 dark:text-sky-200 dark:hover:bg-sky-700 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setRole(r);
                  setIsOpen(false);
                }}
              >
                {r}
              </p>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
