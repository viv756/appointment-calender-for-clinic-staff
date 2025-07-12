import { useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { useCalendarContext } from "../context/calendar.provider";
import CreateAppointmentForm from "./CreateAppointmentForm";
import Modal from "./Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarToolbar from "./CalendarToolbar";

import "../styles/calendar.css"

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const { appointments } = useCalendarContext();

  const doctors = [...new Set(appointments.map((a) => a.doctorName))];
  const patients = [...new Set(appointments.map((a) => a.patientName))];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const doctorMatch = selectedDoctor ? appt.doctorName === selectedDoctor : true;
      const patientMatch = selectedPatient ? appt.patientName === selectedPatient : true;
      return doctorMatch && patientMatch;
    });
  }, [appointments, selectedDoctor, selectedPatient]);

  // Handler for dropdown changes
  const handleFilterChange = (type, value) => {
    if (type === "doctor") setSelectedDoctor(value);
    if (type === "patient") setSelectedPatient(value);
  };

  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const selectedDayAppointments = useMemo(() => {
    if (!selectedDate) return [];
    return appointments.filter((appt) => {
      const apptDate = new Date(appt.start);
      return (
        apptDate.getFullYear() === selectedDate.getFullYear() &&
        apptDate.getMonth() === selectedDate.getMonth() &&
        apptDate.getDate() === selectedDate.getDate()
      );
    });
  }, [appointments, selectedDate]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Calendar
        localizer={localizer}
        events={filteredAppointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "800px" }}
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        components={{
          toolbar: () => (
            <CalendarToolbar
              doctors={doctors}
              patients={patients}
              selectedDoctor={selectedDoctor}
              selectedPatient={selectedPatient}
              onFilterChange={handleFilterChange}
            />
          ),
        }}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={(event) => {
          setSelectedDate(new Date(event.start));
          setIsModalOpen(true);
        }}
      />

      <Modal
        isOpen={isModalOpen}
        dayAppointments={selectedDayAppointments}
        onClose={() => setIsModalOpen(false)}
        title={`Add Appointment – ${selectedDate?.toDateString()}`}>
        <CreateAppointmentForm selectedDate={selectedDate} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default MyCalendar;
