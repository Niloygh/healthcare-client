"use client";

import { useMemo, useState } from "react";
import {
  Card,
  Button,
  Chip,
} from "@heroui/react";
import { Trash2 } from "lucide-react"; // Make sure to install lucide-react if not already

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const generateTimes = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(min);

      times.push(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimes();

const timeToMinutes = (time) => {
  const [clock, period] = time.split(" ");
  let [hour, minute] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
};

export default function ScheduleSelector() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [schedules, setSchedules] = useState({});

  const addSchedule = () => {
    if (!selectedDay || !selectedTime) return;

    const current = schedules[selectedDay] || [];
    if (current.includes(selectedTime)) return;

    const updated = [...current, selectedTime].sort(
      (a, b) => timeToMinutes(a) - timeToMinutes(b)
    );

    setSchedules((prev) => ({
      ...prev,
      [selectedDay]: updated,
    }));

    setSelectedTime("");
  };

  const removeTime = (day, time) => {
    setSchedules((prev) => {
      const updated = prev[day].filter((t) => t !== time);
      const next = { ...prev };

      if (updated.length === 0) {
        delete next[day];
      } else {
        next[day] = updated;
      }
      return next;
    });
  };

  // New function: Delete entire day
  const deleteDay = (day) => {
    setSchedules((prev) => {
      const next = { ...prev };
      delete next[day];
      return next;
    });
  };

  const hasSchedules = useMemo(
    () => Object.keys(schedules).length > 0,
    [schedules]
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-md">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Schedule Selector</h2>
          <p className="text-default-500 text-sm mt-1">
            Configure available appointment schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border rounded-lg px-3 py-3 w-full"
          >
            <option value="">Select Day</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border rounded-lg px-3 py-3 w-full"
          >
            <option value="">Select Time</option>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <Button
            color="primary"
            className="h-14 mt-auto"
            isDisabled={!selectedDay || !selectedTime}
            onPress={addSchedule}
          >
            Add Schedule
          </Button>
        </div>

        {!hasSchedules && (
          <div className="border-2 border-dashed rounded-xl py-10 text-center text-default-500">
            No schedules added yet.
          </div>
        )}

        {hasSchedules && (
          <div className="space-y-6">
            {DAYS.filter((day) => schedules[day]).map((day) => (
              <div key={day} className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{day}</h3>
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => deleteDay(day)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                    Delete Day
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {schedules[day].map((time) => (
                    <Chip
                      key={time}
                      color="primary"
                      variant="flat"
                      onClose={() => removeTime(day, time)}
                    >
                      {time}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}