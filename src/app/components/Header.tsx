import { subMonths, addMonths, subWeeks, addWeeks } from "date-fns";

export default function Header({
  viewMode,
  setViewMode,
  currentMonth,
  currentWeek,
  setCurrentMonth,
  setCurrentWeek,
}: {
  viewMode: "month" | "week";
  setViewMode: (mode: "month" | "week") => void;
  currentMonth: Date;
  currentWeek: Date;
  setCurrentMonth: (date: Date) => void;
  setCurrentWeek: (date: Date) => void;
}) {
  return (
    <>
      <button
        onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
        className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-300"
      >
        {viewMode === "month" ? "週表示" : "月表示"}
      </button>
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            viewMode === "month"
              ? setCurrentMonth(subMonths(currentMonth, 1))
              : setCurrentWeek(subWeeks(currentWeek, 1))
          }
          className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-300"
        >
          ← {viewMode === "month" ? "前月" : "前週"}
        </button>
        <span className="text-lg font-bold">
          {viewMode === "month"
            ? currentMonth.toLocaleString("ja-JP", {
                year: "numeric",
                month: "long",
              })
            : currentWeek.toLocaleString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
        </span>
        <button
          onClick={() =>
            viewMode === "month"
              ? setCurrentMonth(addMonths(currentMonth, 1))
              : setCurrentWeek(addWeeks(currentWeek, 1))
          }
          className="px-4 py-2 border rounded bg-gray-800 hover:bg-gray-300"
        >
          {viewMode === "month" ? "次月" : "次週"} →
        </button>
      </div>
    </>
  );
}
