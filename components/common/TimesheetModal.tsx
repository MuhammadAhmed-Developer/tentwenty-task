"use client";

import React, { useState, useCallback, useEffect } from "react";
import { X, Info } from "lucide-react";
import type { AddEntryFormData, Task } from "@/types/timesheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<AddEntryFormData, "hours"> & { hours: number; date: string }
  ) => void;
  selectedDate?: string;
  editTask?: Task | null;
}

export function AddEntryModal({
  isOpen,
  onClose,
  onSubmit,
  selectedDate = new Date().toISOString().split("T")[0],
  editTask = null,
}: AddEntryModalProps) {
  const [formData, setFormData] = useState<AddEntryFormData>({
    project: "",
    workType: "",
    description: "",
    hours: 1,
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editTask) {
      setFormData({
        project: editTask.project,
        workType: editTask.workType,
        description: editTask.description,
        hours: editTask.hours,
      });
    } else {
      setFormData({
        project: "",
        workType: "",
        description: "",
        hours: 1,
      });
    }
  }, [editTask, isOpen]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "hours" ? Math.max(1, Math.min(24, Number(value))) : value,
      }));
    },
    []
  );

  const handleHoursChange = useCallback((increment: number) => {
    setFormData((prev) => ({
      ...prev,
      hours: Math.max(1, Math.min(24, prev.hours + increment)),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.project && formData.workType && formData.description) {
        onSubmit({
          ...formData,
          date: selectedDate,
        });
        setFormData({
          project: "",
          workType: "",
          description: "",
          hours: 1,
        });
        onClose();
      }
    },
    [formData, onSubmit, onClose, selectedDate]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-heading">
            {editTask ? "Edit Entry" : "Add New Entry"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
              Project Name <span className="text-red-500">*</span>
              <Info size={16} className="text-gray-400" />
            </label>
            <Input
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
              Type of Work <span className="text-red-500">*</span>
              <Info size={16} className="text-gray-400" />
            </label>
            <Input
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              placeholder="e.g., Bug fixes, Development, Testing"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-heading mb-2">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write text here ..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-foreground"
            />
            <p className="text-xs text-gray-400 mt-2">A note for extra info</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-heading mb-2">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 border border-border rounded-lg w-max">
              <button
                type="button"
                onClick={() => handleHoursChange(-1)}
                className="w-12 h-12 border-r border-border  flex items-center justify-center bg-gray-50 transition text-heading font-medium text-xl"
              >
                −
              </button>
              <span className="text-xl font-semibold text-heading min-w-10 text-center">
                {formData.hours}
              </span>
              <button
                type="button"
                onClick={() => handleHoursChange(1)}
                className="w-12 h-12 border-l border-border flex items-center justify-center bg-gray-50 transition text-heading font-medium text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit" fullWidth className="py-3 text-base">
              {editTask ? "Update entry" : "Add entry"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              fullWidth
              className="bg-transparent! border text-heading! py-3"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
