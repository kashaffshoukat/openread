"use client";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const TopNewestDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Top Match");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dropdownRef = useRef(null); // Reference for dropdown

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option.title);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 
        rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200"
      >
        {selectedOption}
        <FaChevronDown className="text-gray-600 transition-transform duration-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`block w-full px-4 py-3 text-left transition-all duration-200 
                ${index === 0 && hoveredIndex !== null ? "bg-white text-gray-900" : ""}
                ${index === 0 && hoveredIndex === null ? "bg-gray-900 text-white" : ""}
                ${hoveredIndex === index && index !== 0 ? "bg-gray-900 text-white" : ""}
                ${hoveredIndex !== index && index !== 0 ? "bg-white text-gray-900" : ""}
              `}
            >
              <span className="font-medium">{option.title}</span>
              <p className="text-sm">{option.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNewestDropdown;
