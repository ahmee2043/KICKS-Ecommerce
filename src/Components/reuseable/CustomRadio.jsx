import React from 'react';

const CustomRadio = ({ id, label, name, value, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer select-none">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />

      {/* Custom Circle */}
      <div className="h-5 w-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-500">
        {/* Inner Dot (only visible when selected) */}
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
      </div>

      <span className="text-sm text-gray-800 capitalize">{label}</span>
    </label>
  );
};

export default CustomRadio;
