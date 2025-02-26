"use client";
import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiSearch, FiFileText } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";

const AnswerCard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const dropdownRef = useRef(null);

  const options = [
    {
      title: "Top Match",
      description: "Sort results based on relevance to your search criteria.",
    },
    {
      title: "Newest First",
      description:
        "Display papers in chronological order, starting with the newest publications.",
    },
    {
      title: "Oldest First",
      description:
        "Display papers in chronological order, starting with the earliest publications.",
    },
    {
      title: "Most Influential",
      description:
        "Sort papers by citation count, showing highly-cited works first.",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`p-6 rounded-2xl border shadow-lg transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer" />
            <input
              type="text"
              placeholder="How to write a literature review?"
              className={`w-full pl-12 pr-12 p-3 rounded-full border transition-all duration-300 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-200 text-gray-900 border-gray-300"} focus:outline-none focus:ring-2 focus:ring-gray-400`}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative" ref={dropdownRef}>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Top Match <FaAngleDown className="font-bold text-lg" />
            </button>
            {isDropdownOpen && (
              <div className={`absolute left-0 mt-2 w-64 border rounded-lg shadow-lg z-10 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left p-3 transition-all duration-300 ${hoveredIndex === index ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="font-medium">{option.title}</span>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`p-4 rounded-lg border transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
          <div className="flex flex-col items-center mb-4">
          
<h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-black"}`}>
  Answer by Oat <IoMdRefresh className="cursor-pointer hover:text-gray-700 text-gray-500 text-lg" />
</h2>

          </div>

          <p className="text-sm leading-relaxed">
            To write a literature review, you need to analyze scholarly research and identify key themes, theories, and findings.
            The structure typically includes an introduction, body, and conclusion. Cite sources properly and present information critically.
            {/* <BsCircleFill className="inline w-2 h-2 mx-1 text-gray-500" /> */}
            The concept of literature reviews involves structuring your research findings clearly.
            {/* <BsCircleFill className="inline w-2 h-2 mx-1 text-gray-500" /> */}
            You can use thematic analysis to categorize similar studies.
            {/* <BsCircleFill className="inline w-2 h-2 mx-1 text-gray-500" /> */}
            A well-written review should identify gaps in research and propose future directions.
            {/* <BsCircleFill className="inline w-2 h-2 mx-1 text-gray-500" /> */}
          </p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="hidden" />
  <div className="w-8 h-4 bg-gray-300 rounded-full relative">
    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300 ${isDarkMode ? "transform translate-x-4 bg-blue-500" : "bg-gray-500"}`}></div>
  </div>
</label>

              <FiGlobe className="text-md cursor-pointer text-blue-400 hover:text-gray-700 transition-colors duration-200" />
              <FiFileText className="text-md cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
            </div>
            <button className="text-sm text-black-300">Ask follow-up questions →</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
