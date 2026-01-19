"use client";

import React, { useState, useCallback } from "react";
import { MoreVertical } from "lucide-react";

interface TaskMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskMenu({ onEdit, onDelete }: TaskMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit();
    setIsOpen(false);
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete();
    setIsOpen(false);
  }, [onDelete]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
        aria-label="Task menu"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10 min-w-max">
          <button
            onClick={handleEdit}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 last:rounded-b-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
