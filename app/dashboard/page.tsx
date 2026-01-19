import { Navbar } from "@/components/common/Navbar";
import TimesheetTable from "@/components/common/TimesheetTable";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <TimesheetTable />
    </main>
  );
}
