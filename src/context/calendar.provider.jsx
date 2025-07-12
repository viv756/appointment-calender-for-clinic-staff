import { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  console.log(appointments);

  const addAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <CalendarContext.Provider
      value={{
        appointments,
        addAppointment,
      }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    console.log("calendar context error");
  }

  return context;
};
