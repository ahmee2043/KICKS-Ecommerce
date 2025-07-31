import React from 'react';

const CustomCheckbox = ({ id, label, value, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className="h-5 w-5 flex items-center justify-center border border-gray-400 rounded">
        {checked && (
          <svg
            className="w-4 h-4 text-[#FFA52F]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-800 capitalize">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
