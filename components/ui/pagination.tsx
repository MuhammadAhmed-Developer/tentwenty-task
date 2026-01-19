"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (
        let i = Math.max(3, currentPage - 1);
        i <= Math.min(totalPages - 2, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm text-gray-700"
        >
          <span>{itemsPerPage} per page</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10 min-w-max">
            {[5, 10, 25, 50].map((option) => (
              <button
                key={option}
                onClick={() => {
                  onItemsPerPageChange(option);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg"
              >
                {option} per page
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 border-r-0 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm text-gray-700"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {getVisiblePages().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page === "string"}
            className={`px-3 py-2 border border-l-0 border-r-0 border-gray-300 text-sm font-medium ${
              page === currentPage
                ? "bg-primary/10 border-blue-600"
                : typeof page === "number"
                ? "hover:bg-gray-50 text-gray-700"
                : "text-gray-500 cursor-default bg-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 border-l-0 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm text-gray-700"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
