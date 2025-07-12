import { createContext, useContext, useEffect, useState } from "react";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");

    if (stored) {
      const parsed = JSON.parse(stored);

      // Convert string dates back to Date objects
      const restored = parsed.map((appt) => ({
        ...appt,
        start: new Date(appt.start),
        end: new Date(appt.end),
      }));

      setAppointments(restored);
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      console.log("Saving appointments:", appointments);
      localStorage.setItem("appointments", JSON.stringify(appointments));
    }
  }, [appointments, hasLoaded]);

  const addAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{
        appointments,
        addAppointment,
         deleteAppointment, 
        showForm,
        setShowform,
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
