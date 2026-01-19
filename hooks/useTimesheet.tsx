"use client";

import { useMemo, useState } from "react";
import { useTimesheetContext } from "@/context/TimesheetContext";
import type { TimesheetWeek, TasksByDate } from "@/types/timesheet";

export function useTimesheet(timesheetId: string) {
  const { getTimesheet, addTask, updateTask, deleteTask } =
    useTimesheetContext();

  const currentTimesheet = getTimesheet(timesheetId);
  const tasks = currentTimesheet?.tasks || [];

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.date]) {
        acc[task.date] = [];
      }
      acc[task.date].push(task);
      return acc;
    }, {} as TasksByDate);
  }, [tasks]);

  const totalHours = useMemo(
    () => tasks.reduce((sum, task) => sum + task.hours, 0),
    [tasks]
  );

  const targetHours = 40; // 8 hours * 5 days
  const progressPercentage = Math.min((totalHours / targetHours) * 100, 100);

  const timesheetWeek = useMemo((): TimesheetWeek | null => {
    if (!currentTimesheet) return null;

    return {
      week: currentTimesheet.week,
      startDate: currentTimesheet.startDate,
      endDate: currentTimesheet.endDate,
      tasks,
      totalHours,
      targetHours,
    };
  }, [currentTimesheet, tasks, totalHours]);

  return {
    timesheetWeek,
    tasksByDate,
    addTask: (task: any) => addTask(timesheetId, task),
    updateTask: (taskId: string, updates: any) =>
      updateTask(timesheetId, taskId, updates),
    deleteTask: (taskId: string) => deleteTask(timesheetId, taskId),
    totalHours,
    targetHours,
    progressPercentage,
    currentTimesheet,
  };
}

export function useTimesheetsList() {
  const {
    timesheets,
    createTimesheet,
    updateTimesheetStatus,
    deleteTimesheet,
    calculateStatus,
  } = useTimesheetContext();

  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    return timesheets.filter((item) => {
      const statusMatch = status === "All Status" || item.status === status;
      return statusMatch;
    });
  }, [timesheets, status]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    timesheets,
    dateRange,
    setDateRange,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredData,
    paginatedData,
    totalPages,
    createTimesheet,
    updateTimesheetStatus,
    deleteTimesheet,
    calculateStatus,
  };
}
