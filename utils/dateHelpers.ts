export function getWeekStartDate(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getWeekDates(weekOffset: number = 0) {
  const today = new Date();
  const currentWeekStart = getWeekStartDate(today);

  const targetWeekStart = new Date(currentWeekStart);
  targetWeekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);

  const startDate = new Date(targetWeekStart);
  const endDate = new Date(targetWeekStart);
  endDate.setDate(startDate.getDate() + 4);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}, ${date.getFullYear()}`;
  };

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

export function generateWeekDates(startDateString: string) {
  const dates = [];

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
