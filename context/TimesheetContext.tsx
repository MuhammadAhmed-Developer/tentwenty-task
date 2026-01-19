"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { Task, TimesheetRecord } from "@/types/timesheet";

// Helper function to get the start of the week (Monday) for a given date
function getWeekStartDate(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

// Helper function to calculate week dates based on current date + offset
function getWeekDates(weekOffset: number = 0) {
  const today = new Date();
  const currentWeekStart = getWeekStartDate(today);

  // Add weeks offset
  const targetWeekStart = new Date(currentWeekStart);
  targetWeekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);

  const startDate = new Date(targetWeekStart);
  const endDate = new Date(targetWeekStart);
  endDate.setDate(startDate.getDate() + 4); // 5 working days (Mon-Fri)

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}, ${date.getFullYear()}`;
  };

  // Calculate week number of the year
  const oneJan = new Date(targetWeekStart.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (targetWeekStart.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    weekNumber,
    startDateObj: startDate,
    endDateObj: endDate,
  };
}

// LocalStorage key
const STORAGE_KEY = "tentwenty_timesheets";

interface TimesheetContextType {
  timesheets: TimesheetRecord[];
  createTimesheet: () => TimesheetRecord;
  updateTimesheetStatus: (
    id: string,
    status: TimesheetRecord["status"]
  ) => void;
  deleteTimesheet: (id: string) => void;
  getTimesheet: (id: string) => TimesheetRecord | undefined;
  addTask: (timesheetId: string, task: Omit<Task, "id">) => Task;
  updateTask: (
    timesheetId: string,
    taskId: string,
    updates: Partial<Task>
  ) => void;
  deleteTask: (timesheetId: string, taskId: string) => void;
  calculateStatus: (timesheetId: string) => TimesheetRecord["status"];
}

const TimesheetContext = createContext<TimesheetContextType | undefined>(
  undefined
);

export function TimesheetProvider({ children }: { children: React.ReactNode }) {
  const [timesheets, setTimesheets] = useState<TimesheetRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimesheets(parsed);
      }
    } catch (error) {
      console.error("Error loading timesheets from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever timesheets change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timesheets));
      } catch (error) {
        console.error("Error saving timesheets to localStorage:", error);
      }
    }
  }, [timesheets, isLoaded]);

  const createTimesheet = useCallback(() => {
    // Calculate the next week offset based on existing timesheets
    const weekOffset = timesheets.length;
    const dates = getWeekDates(weekOffset);

    const newTimesheet: TimesheetRecord = {
      id: Date.now().toString(),
      week: dates.weekNumber,
      dateRange: dates.dateRange,
      status: "MISSING",
      tasks: [],
      startDate: dates.startDate,
      endDate: dates.endDate,
    };

    setTimesheets((prev) => [...prev, newTimesheet]);
    return newTimesheet;
  }, [timesheets.length]);

  const updateTimesheetStatus = useCallback(
    (id: string, status: TimesheetRecord["status"]) => {
      setTimesheets((prev) =>
        prev.map((ts) => (ts.id === id ? { ...ts, status } : ts))
      );
    },
    []
  );

  const deleteTimesheet = useCallback((id: string) => {
    setTimesheets((prev) => prev.filter((ts) => ts.id !== id));
  }, []);

  const getTimesheet = useCallback(
    (id: string) => {
      return timesheets.find((ts) => ts.id === id);
    },
    [timesheets]
  );

  const addTask = useCallback((timesheetId: string, task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString() + Math.random(),
    };

    setTimesheets((prev) =>
      prev.map((ts) => {
        if (ts.id === timesheetId) {
          const updatedTasks = [...ts.tasks, newTask];
          const totalHours = updatedTasks.reduce((sum, t) => sum + t.hours, 0);
          const newStatus: TimesheetRecord["status"] =
            totalHours >= 40
              ? "COMPLETED"
              : totalHours > 0
              ? "INCOMPLETE"
              : "MISSING";

          return {
            ...ts,
            tasks: updatedTasks,
            status: newStatus,
          };
        }
        return ts;
      })
    );

    return newTask;
  }, []);

  const updateTask = useCallback(
    (timesheetId: string, taskId: string, updates: Partial<Task>) => {
      setTimesheets((prev) =>
        prev.map((ts) => {
          if (ts.id === timesheetId) {
            const updatedTasks = ts.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            );
            const totalHours = updatedTasks.reduce(
              (sum, t) => sum + t.hours,
              0
            );
            const newStatus: TimesheetRecord["status"] =
              totalHours >= 40
                ? "COMPLETED"
                : totalHours > 0
                ? "INCOMPLETE"
                : "MISSING";

            return {
              ...ts,
              tasks: updatedTasks,
              status: newStatus,
            };
          }
          return ts;
        })
      );
    },
    []
  );

  const deleteTask = useCallback((timesheetId: string, taskId: string) => {
    setTimesheets((prev) =>
      prev.map((ts) => {
        if (ts.id === timesheetId) {
          const updatedTasks = ts.tasks.filter((task) => task.id !== taskId);
          const totalHours = updatedTasks.reduce((sum, t) => sum + t.hours, 0);
          const newStatus: TimesheetRecord["status"] =
            totalHours >= 40
              ? "COMPLETED"
              : totalHours > 0
              ? "INCOMPLETE"
              : "MISSING";

          return {
            ...ts,
            tasks: updatedTasks,
            status: newStatus,
          };
        }
        return ts;
      })
    );
  }, []);

  const calculateStatus = useCallback(
    (timesheetId: string): TimesheetRecord["status"] => {
      const timesheet = timesheets.find((t) => t.id === timesheetId);
      if (!timesheet) return "MISSING";

      if (timesheet.tasks.length === 0) return "MISSING";

      const totalHours = timesheet.tasks.reduce(
        (sum, task) => sum + task.hours,
        0
      );
      if (totalHours >= 40) return "COMPLETED";

      return "INCOMPLETE";
    },
    [timesheets]
  );

  const value = useMemo(
    () => ({
      timesheets,
      createTimesheet,
      updateTimesheetStatus,
      deleteTimesheet,
      getTimesheet,
      addTask,
      updateTask,
      deleteTask,
      calculateStatus,
    }),
    [
      timesheets,
      createTimesheet,
      updateTimesheetStatus,
      deleteTimesheet,
      getTimesheet,
      addTask,
      updateTask,
      deleteTask,
      calculateStatus,
    ]
  );

  return (
    <TimesheetContext.Provider value={value}>
      {children}
    </TimesheetContext.Provider>
  );
}

export function useTimesheetContext() {
  const context = useContext(TimesheetContext);
  if (context === undefined) {
    throw new Error(
      "useTimesheetContext must be used within a TimesheetProvider"
    );
  }
  return context;
}
