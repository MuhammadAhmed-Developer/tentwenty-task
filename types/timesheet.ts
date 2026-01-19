export interface Task {
  id: string;
  date: string;
  project: string;
  workType: string;
  description: string;
  hours: number;
  status?: "completed" | "incomplete" | "pending";
}

export interface TimesheetWeek {
  week: number;
  startDate: string;
  endDate: string;
  tasks: Task[];
  totalHours: number;
  targetHours: number;
}

export interface TimesheetRecord {
  id: string;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  tasks: Task[];
  startDate: string;
  endDate: string;
}

export interface AddEntryFormData {
  project: string;
  workType: string;
  description: string;
  hours: number;
}

export interface TasksByDate {
  [date: string]: Task[];
}
