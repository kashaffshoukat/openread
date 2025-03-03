"use client";
import { useState, useEffect, useRef } from "react";
import { FiGlobe, FiSearch, FiFileText } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const AnswerCard = () => {
  const [isDarkMode, setIsDarkMode] = useState(null); // Initially null to handle hydration
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const options = [
    { title: "Top Match", description: "Sort results based on relevance to your search criteria." },
    { title: "Newest First", description: "Display papers in chronological order, starting with the newest publications." },
    { title: "Oldest First", description: "Display papers in chronological order, starting with the earliest publications." },
    { title: "Most Influential", description: "Sort papers by citation count, showing highly-cited works first." },
  ];

  // Ensure dark mode is checked once component is mounted (on client)
  useEffect(() => {
    setIsDarkMode(localStorage.getItem("isDarkMode") === "true" || false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Save the dark mode preference in localStorage for persistence
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  if (isDarkMode === null) return null; // Wait for the component to be mounted and state to be initialized

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${isDarkMode ? "bg-black-900 text-white" : "bg-black-100 text-white-900"}`}>
      <div className={`p-6 rounded-2xl border border-white-800 shadow-lg transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-w-900"}`}>
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white-500 text-lg cursor-pointer" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for answers..."
              className={`w-full pl-12 pr-4 p-3 rounded-full border border-gray-800 transition-all duration-300 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-gray-500`}
            />
          </div>
        </div>

       
       {/* Dropdown for sorting */}
<div className="flex justify-between items-center mb-8">
  <div className="relative" ref={dropdownRef}>
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-black-800 ${isDarkMode ? "bg-black-700 text-white hover:bg-black-600" : "bg-black-200 text-gray-900 hover:bg-black-300"}`}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      Top Match <FaAngleDown className="font-bold text-lg" />
    </button>
    {isDropdownOpen && (
      <div className={`absolute left-0 mt-2 w-64 border border-gray-800 rounded-lg shadow-lg z-10 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`block w-full text-left p-3 border-b border-gray-800 transition-all duration-300 hover:bg-black hover:text-white`}
          >
            <span className="font-medium">{option.title}</span>
            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
          </button>
        ))}
      </div>
    )}
  </div>
</div>


        {/* Resizable Cards */}
        <div className="flex flex-wrap gap-4">
          {/* Left Card - Answer by Oat */}
          <ResizableBox
            width={400}
            height={200}
            minConstraints={[250, 150]}
            maxConstraints={[600, 500]}
            className="relative border border-gray-700 rounded-lg overflow-hidden w-full sm:w-auto"
          >
            <div className={`p-4 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Answer by Oat <IoMdRefresh className="cursor-pointer hover:text-gray-700 text-gray-500 text-lg" />
              </h2>
              <p className="text-sm leading-relaxed mt-2">
                To write a literature review, analyze scholarly research and identify key themes, theories, and findings.
              </p>
              <div className="flex justify-between items-center mt-4">
                {/* Dark Mode Toggle and Icons */}
                <div className="flex items-center gap-4">
                  {/* Dark Mode Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="hidden" />
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300 ${isDarkMode ? "transform translate-x-4 bg-blue-500" : "bg-gray-500"}`}></div>
                    </div>
                  </label>

                  {/* Globe and File Text Icons */}
                  <FiGlobe className="text-md cursor-pointer text-blue-400 hover:text-gray-700 transition-colors duration-200" />
                  <FiFileText className="text-md cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                </div>

                <button className="text-sm text-black-300">Ask follow-up questions →</button>
              </div>
            </div>
          </ResizableBox>

          {/* Right Card - Links Box */}
          <ResizableBox
            width={300}
            height={200}
            minConstraints={[450, 150]}
            maxConstraints={[600, 500]}
            className="relative border border-gray-700 rounded-lg overflow-hidden w-full sm:w-auto"
          >
            <div className={`p-4 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
              <h3 className="text-sm font-semibold mb-1 text-gray-600">URLs:</h3>
              <ul className="text-sm">
                <li className="text-blue-500 text-sm">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Link 1
                  </a>
                </li>
                <li className="text-blue-500 text-sm">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Link 2
                  </a>
                </li>
              </ul>
            </div>
          </ResizableBox>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
