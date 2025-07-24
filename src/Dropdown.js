// Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ label, options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="block w-full p-2 border border-gray-300 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}: {value || 'Select'}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;