import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { useCalendarContext } from "../context/calendar.provider";
import CreateAppointmentForm from "./CreateAppointmentForm";
import Modal from "./Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { appointments } = useCalendarContext();

  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "800px" }}
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        components={{
          toolbar: () => null,
        }}
        onSelectSlot={handleSlotSelect}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add Appointment – ${selectedDate?.toDateString()}`}>
        <CreateAppointmentForm selectedDate={selectedDate} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default MyCalendar;
