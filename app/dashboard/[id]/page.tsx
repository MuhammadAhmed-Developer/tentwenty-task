"use client";

import React, { useState, useMemo } from "react";
import { useTimesheet } from "@/hooks/useTimesheet";
import { TaskMenu } from "@/components/ui/TaskMenu";
import { AddEntryModal } from "@/components/common/TimesheetModal";
import { Navbar } from "@/components/common/Navbar";
import { useParams } from "next/navigation";
import type { Task } from "@/types/timesheet";
import Footer from "@/components/common/Footer";
import { generateWeekDates } from "@/utils/dateHelpers";

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
      updateTask(editingTask.id, {
        project: data.project,
        workType: data.workType,
        description: data.description,
        hours: data.hours,
      });
    } else {
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
    return generateWeekDates(currentTimesheet.startDate);
  }, [currentTimesheet]);

  if (!currentTimesheet) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
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
    <div className="min-h-screen">
      <Navbar />
      <main className="w-full lg:max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-[24px] font-bold mb-2">
                This week's timesheet
              </h1>
              <p className="text-sm sm:text-base">
                {currentTimesheet.dateRange}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-center gap-2">
              <div>
                <p className="text-xs sm:text-[14px] font-bold">
                  {totalHours}/{targetHours} hrs
                </p>
              </div>
              <div className="w-full md:w-50">
                <div className="flex items-end justify-between mb-2 gap-3">
                  <div className="text-xs sm:text-sm font-medium">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FF8A4C] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {weekDates.map(({ date, label }) => (
              <div
                key={date}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6"
              >
                <div className="w-full sm:w-20 shrink-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {label}
                  </h3>
                </div>

                {/* Tasks Column */}
                <div className="flex-1 space-y-2">
                  {tasksByDate[date]?.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition gap-3"
                    >
                      <div className="flex-1 w-full">
                        <p className="md:text-xl sm:text-sm text-heading  mt-1">
                          {task.workType}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-xs sm:text-sm font-medium">
                          {task.hours} hrs
                        </span>
                        <span className="text-primary hover:text-primary text-xs sm:text-sm font-medium bg-primary/10 px-3 py-1 rounded-md">
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
                    className="w-full p-3 sm:p-4 border-2 border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/10 transition flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                  >
                    <span>+</span> Add new task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

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
