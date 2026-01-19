"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  fullWidth = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-40"}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700"
      >
        <span className="text-sm font-medium">{value || label}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
