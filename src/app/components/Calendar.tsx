import {
  eachWeekOfInterval,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getDate,
  format,
} from "date-fns";

export default function Calendar({
  viewMode,
  currentMonth,
  currentWeek,
  events,
  handleDateClick,
}: {
  viewMode: "month" | "week";
  currentMonth: Date;
  currentWeek: Date;
  events: { date: string; title: string }[];
  handleDateClick: (date: Date) => void;
}) {
  const today = new Date().toDateString();

  const getCalendarArray = () => {
    if (viewMode === "month") {
      const sundays = eachWeekOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
      });

      return sundays.map((sunday) =>
        eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }),
      );
    } else {
      return [
        eachDayOfInterval({
          start: startOfWeek(currentWeek),
          end: endOfWeek(currentWeek),
        }),
      ];
    }
  };

  return (
    <>
      {viewMode === "month" ? (
        getCalendarArray().map((week, index) => (
          <div key={index} className="grid grid-cols-7 w-full">
            {week.map((day: Date, index) => {
              const isToday = day.toDateString() === today;
              const event = events.find(
                (event) => event.date === day.toDateString(),
              );

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className="border flex break-all flex-col items-center justify-center aspect-square min-w-0 cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      isToday ? "bg-blue-500 text-white font-bold" : ""
                    }`}
                  >
                    {getDate(day)}
                  </div>
                  {event && (
                    <div className="text-xs mt-1 text-blue-600">
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <div className="flex flex-1 border">
          {getCalendarArray()[0].map((day: Date) => {
            const isToday = day.toDateString() === today;
            const event = events.find(
              (event) => event.date === day.toDateString(),
            );

            return (
              <div
                key={day.toISOString()}
                className={`text-center break-all p-10 w-40 h-40 font-bold border-r ${
                  isToday ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "EEE d")}
                {event && (
                  <div className="text-xs text-blue-600">{event.title}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
