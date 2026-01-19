"use client";

import React, { useState, useMemo } from "react";
import { useTimesheet } from "@/hooks/useTimesheet";
import { TaskMenu } from "@/components/ui/TaskMenu";
import { AddEntryModal } from "@/components/common/TimesheetModal";
import { Navbar } from "@/components/common/Navbar";
import { useParams } from "next/navigation";
import type { Task } from "@/types/timesheet";

// Helper function to generate 5 working days from start date string
function generateWeekDates(startDateString: string) {
  const dates = [];

  // Parse the date string like "20 January, 2026"
  const dateParts = startDateString.split(" ");
  const day = parseInt(dateParts[0]);
  const monthName = dateParts[1].replace(",", "");
  const year = parseInt(dateParts[2]);

  const monthMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const start = new Date(year, monthMap[monthName], day);

  for (let i = 0; i < 5; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dateStr = date.toISOString().split("T")[0];
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    dates.push({ date: dateStr, label });
  }

  return dates;
}

export default function TimesheetDetail() {
  const params = useParams();
  const timesheetId = params.id as string;

  const {
    currentTimesheet,
    tasksByDate,
    addTask,
    updateTask,
    deleteTask,
    totalHours,
    targetHours,
    progressPercentage,
  } = useTimesheet(timesheetId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (date: string) => {
    setEditingTask(null);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setSelectedDate(task.date);
    setIsModalOpen(true);
  };

  const handleSubmitEntry = (data: {
    project: string;
    workType: string;
    description: string;
    hours: number;
    date: string;
  }) => {
    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, {
        project: data.project,
        workType: data.workType,
        description: data.description,
        hours: data.hours,
      });
    } else {
      // Add new task
      addTask({
        date: data.date,
        project: data.project,
        workType: data.workType,
        description: data.description,
        hours: data.hours,
      });
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const weekDates = useMemo(() => {
    if (!currentTimesheet) return [];
    // Generate dates from timesheet start date
    return generateWeekDates(currentTimesheet.startDate);
  }, [currentTimesheet]);

  if (!currentTimesheet) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Timesheet Not Found</h1>
            <p className="text-gray-600">
              This timesheet doesn't exist or has been deleted.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[24px] font-bold  mb-2">
                This week's timesheet
              </h1>
              <p className="">{currentTimesheet.dateRange}</p>
            </div>
            <div className="mb-8 flex flex-col items-center gap-2">
              <div>
                <p className="text-[14px]  ">
                  {totalHours}/{targetHours} hrs
                </p>
              </div>
              <div className=" w-50">
                <div className="flex items-end justify-end etween mb-2 gap-3">
                  <div className="text-sm font-medium">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {weekDates.map(({ date, label }) => (
              <div key={date} className="flex gap-6">
                {/* Date Label - Fixed width on the left */}
                <div className="w-20 shrink-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {label}
                  </h3>
                </div>

                {/* Tasks Column */}
                <div className="flex-1 space-y-2">
                  {tasksByDate[date]?.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {task.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {task.workType}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">
                          {task.hours} hrs
                        </span>
                        <span className="text-primary hover:text-primary text-sm font-medium">
                          {task.project}
                        </span>
                        <TaskMenu
                          onEdit={() => handleEditTask(task)}
                          onDelete={() => deleteTask(task.id)}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddTask(date)}
                    className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg text-primary hover:bg-blue-50 transition flex items-center justify-center gap-2 font-medium"
                  >
                    <span>+</span> Add new task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-8  text-sm">
        © 2024 tentwenty. All rights reserved.
      </footer>

      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitEntry}
        selectedDate={selectedDate}
        editTask={editingTask}
      />
    </div>
  );
}
