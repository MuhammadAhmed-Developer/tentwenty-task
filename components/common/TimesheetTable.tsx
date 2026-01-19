"use client";

import { Dropdown } from "../ui/Dropdown";
import { Pagination } from "../ui/pagination";
import Footer from "./Footer";
import { useTimesheetsList } from "@/hooks/useTimesheet";
import Link from "next/link";

const statusColors: Record<string, string> = {
  COMPLETED: "bg-[#DEF7EC] text-[#03543F]",
  INCOMPLETE: "bg-[#FDF6B2] text-[#723B13]",
  MISSING: "bg-[#FCE8F3] text-[#99154B]",
};

export default function TimesheetsPage() {
  const {
    dateRange,
    setDateRange,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
    createTimesheet,
  } = useTimesheetsList();

  const handleCreateTimesheet = () => {
    createTimesheet();
  };

  return (
    <div className="min-h-screen">
      <div className="w-full lg:w-[90%] xl:w-[80%] mx-auto p-4 sm:p-6">
        <div className="rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Your Timesheets</h2>
            <button
              onClick={handleCreateTimesheet}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium text-sm sm:text-base"
            >
              + Create New Timesheet
            </button>
          </div>

          <div className="flex flex-row  gap-3 sm:gap-4 mb-6">
            <Dropdown
              label="Date Range"
              options={[
                "Last 30 Days",
                "Last 60 Days",
                "Last 90 Days",
                "This Year",
              ]}
              value={dateRange}
              onChange={setDateRange}
            />
            <Dropdown
              label="Status"
              options={["All Status", "COMPLETED", "INCOMPLETE", "MISSING"]}
              value={status}
              onChange={setStatus}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6 -mx-4 sm:mx-0">
            {paginatedData.length === 0 ? (
              <div className="text-center py-12 text-gray-500 px-4">
                <p className="text-base sm:text-lg mb-2">No timesheets yet</p>
                <p className="text-xs sm:text-sm">
                  Click "Create New Timesheet" to get started
                </p>
              </div>
            ) : (
              <table className="w-full min-w-160">
                <thead>
                  <tr className="border-b border-border bg-[#F9FAFB]">
                    <th className="text-left px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold">
                      WEEK #
                    </th>
                    <th className="text-left px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold">
                      DATE
                    </th>
                    <th className="text-left px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold">
                      STATUS
                    </th>
                    <th className="text-left px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-gray-50"
                    >
                      <td className="px-3 sm:px-4 py-3 sm:py-4 bg-[#F9FAFB] text-sm sm:text-base">
                        {item.week}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                        {item.dateRange}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <Link
                          href={`/dashboard/${item.id}`}
                          className="text-primary font-medium text-xs sm:text-sm hover:underline"
                        >
                          {item.status === "COMPLETED"
                            ? "View"
                            : item.status === "INCOMPLETE"
                            ? "Update"
                            : "Create"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {paginatedData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
