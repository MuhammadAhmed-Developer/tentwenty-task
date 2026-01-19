"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
  };

  return (
    <nav className="shadow-xs bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-[24px] font-bold">
          ticktock
        </Link>
        <span className="text-heading">TimeStamp</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <span>{user?.name || "John Doe"}</span>
          <ChevronDown size={20} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
