import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
  {
    title: "Event 2",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(13),
  },
];

const MyCalendar = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "800px" }}
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        components={{
          toolbar: () => null,
        }}

      />
    </div>
  );
};

export default MyCalendar;
