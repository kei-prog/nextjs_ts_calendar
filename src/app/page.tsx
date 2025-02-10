"use client";

import { useState } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Modal from "./components/Modal";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSave = (title: string) => {
    if (selectedDate) {
      setEvents((prev) => {
        const existingIndex = prev.findIndex(
          (event) => event.date === selectedDate.toDateString(),
        );

        if (existingIndex !== -1) {
          return prev.map((event, index) =>
            index === existingIndex ? { ...event, title } : event,
          );
        } else {
          return [...prev, { date: selectedDate.toDateString(), title }];
        }
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20">
      <header className="flex items-center justify-between w-full max-w-lg">
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentMonth={currentMonth}
          currentWeek={currentWeek}
          setCurrentMonth={setCurrentMonth}
          setCurrentWeek={setCurrentWeek}
        />
      </header>
      <main className="flex flex-col items-center w-7/12">
        <Calendar
          viewMode={viewMode}
          currentMonth={currentMonth}
          currentWeek={currentWeek}
          events={events}
          handleDateClick={handleDateClick}
        />
      </main>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          date={selectedDate}
          initialValue={
            events.find((event) => event.date === selectedDate?.toDateString())
              ?.title || ""
          }
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
